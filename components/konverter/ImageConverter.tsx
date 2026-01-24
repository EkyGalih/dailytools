'use client'

import { useState } from 'react'
import JSZip from 'jszip'

type OutputFormat = 'image/webp' | 'image/jpeg' | 'image/png'

type Result = {
  name: string
  url: string
  blob: Blob
  beforeSize: number
  afterSize: number
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024)
    return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export default function ImageConverter() {
  const [files, setFiles] = useState<File[]>([])
  const [previews, setPreviews] = useState<string[]>([])
  const [output, setOutput] = useState<OutputFormat>('image/webp')
  const [quality, setQuality] = useState(70)
  const [maxWidth, setMaxWidth] = useState(1920)
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<Result[]>([])

  const onFiles = (list: FileList | null) => {
    if (!list) return
    const arr = Array.from(list)
    setFiles(arr)
    setResults([])
    setPreviews(arr.map((f) => URL.createObjectURL(f)))
  }

  const convertAll = async () => {
    if (!files.length) return
    setLoading(true)
    setResults([])

    const converted: Result[] = []

    for (const file of files) {
      const bitmap = await createImageBitmap(file)

      // resize (anti file bengkak)
      const scale =
        bitmap.width > maxWidth
          ? maxWidth / bitmap.width
          : 1

      const width = Math.round(bitmap.width * scale)
      const height = Math.round(bitmap.height * scale)

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) continue
      ctx.drawImage(bitmap, 0, 0, width, height)

      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(
          resolve,
          output,
          output === 'image/png'
            ? undefined
            : quality / 100
        )
      )

      if (!blob) continue

      const url = URL.createObjectURL(blob)

      converted.push({
        name:
          file.name.replace(/\.\w+$/, '') +
          '.' +
          output.split('/')[1],
        url,
        blob,
        beforeSize: file.size,
        afterSize: blob.size,
      })
    }

    setResults(converted)
    setLoading(false)
  }

  const downloadZip = async () => {
    const zip = new JSZip()

    results.forEach((r) => {
      zip.file(r.name, r.blob)
    })

    const zipBlob = await zip.generateAsync({
      type: 'blob',
    })

    const url = URL.createObjectURL(zipBlob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted-images.zip'
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="space-y-6">
      {/* UPLOAD */}
      <div className="border-2 border-dashed rounded-2xl p-6 text-center bg-gray-50">
        <input
          type="file"
          multiple
          accept="image/*"
          id="files"
          className="hidden"
          onChange={(e) => onFiles(e.target.files)}
        />
        <label htmlFor="files" className="cursor-pointer block">
          <p className="text-lg font-semibold">
            Upload Gambar
          </p>
          <p className="text-sm text-gray-600 mt-1">
            JPG, PNG, WEBP — bisa banyak file
          </p>
        </label>
      </div>

      {/* PREVIEW ASLI */}
      {previews.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">
            Preview Asli
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {previews.map((src, i) => (
              <img
                key={i}
                src={src}
                className="h-28 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* FORMAT */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Format Output
        </label>
        <select
          className="w-full border rounded-lg p-2 cursor-pointer"
          value={output}
          onChange={(e) =>
            setOutput(e.target.value as OutputFormat)
          }
        >
          <option value="image/webp">
            WebP (recommended)
          </option>
          <option value="image/jpeg">JPG</option>
          <option value="image/png">
            PNG (logo / grafik)
          </option>
        </select>
      </div>

      {/* QUALITY */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Kualitas: {quality}%
        </label>
        <input
          type="range"
          min={40}
          max={100}
          value={quality}
          onChange={(e) =>
            setQuality(Number(e.target.value))
          }
          className="w-full cursor-pointer"
        />
        <p className="text-xs text-gray-500 mt-1">
          Berlaku untuk JPG & WebP
        </p>
      </div>

      {/* RESIZE */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Maksimal Lebar (px)
        </label>
        <input
          type="number"
          value={maxWidth}
          onChange={(e) =>
            setMaxWidth(Number(e.target.value))
          }
          className="w-full border rounded-lg p-2"
        />
        <p className="text-xs text-gray-500 mt-1">
          Disarankan 1920 untuk foto web
        </p>
      </div>

      {/* BUTTON */}
      <button
        onClick={convertAll}
        disabled={!files.length || loading}
        className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl
          bg-black text-white font-medium transition
          ${
            !files.length || loading
              ? 'opacity-60 cursor-not-allowed'
              : 'cursor-pointer hover:bg-gray-900'
          }
        `}
      >
        {loading && (
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {loading ? 'Mengonversi...' : 'Convert Images'}
      </button>

      {/* RESULT */}
      {results.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm font-medium">
              Hasil Konversi
            </p>
            <button
              onClick={downloadZip}
              className="text-sm font-medium underline cursor-pointer"
            >
              Download Semua (ZIP)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="border rounded-xl p-4 bg-gray-50 space-y-2"
              >
                <img
                  src={r.url}
                  className="h-32 w-full object-cover rounded-lg"
                />

                <p className="text-xs text-gray-600">
                  Asli: {formatSize(r.beforeSize)} <br />
                  Hasil: {formatSize(r.afterSize)}
                </p>

                <a
                  href={r.url}
                  download={r.name}
                  className="block text-center text-sm font-medium underline"
                >
                  Download
                </a>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}