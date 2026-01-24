'use client'

import { useState } from 'react'
import JSZip from 'jszip'

type TargetMB = 1 | 2 | 5

type Item = {
  file: File
  preview: string
}

type Result = {
  name: string
  beforeUrl: string
  afterUrl: string
  beforeSize: number
  afterSize: number
  blob: Blob
}

function formatSize(bytes: number) {
  if (bytes < 1024) return bytes + ' B'
  if (bytes < 1024 * 1024)
    return (bytes / 1024).toFixed(1) + ' KB'
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export default function ImageSizeBatchCompressor() {
  const [items, setItems] = useState<Item[]>([])
  const [results, setResults] = useState<Result[]>([])
  const [target, setTarget] = useState<TargetMB>(1)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)

  // 🔥 progress state
  const [currentIndex, setCurrentIndex] = useState(0)

  /* ========================
      HELPERS
  ======================== */

  const handleFiles = (files: FileList | File[]) => {
    const arr = Array.from(files)
      .filter((f) => f.type.startsWith('image/'))
      .map((file) => ({
        file,
        preview: URL.createObjectURL(file),
      }))

    setItems(arr)
    setResults([])
    setCurrentIndex(0)
  }

  const resetResultOnly = () => {
    setResults([])
    setCurrentIndex(0)
  }

  const resetAll = () => {
    items.forEach((i) => URL.revokeObjectURL(i.preview))
    results.forEach((r) => URL.revokeObjectURL(r.afterUrl))
    setItems([])
    setResults([])
    setCurrentIndex(0)
  }

  /* ========================
      COMPRESS LOGIC
  ======================== */

  const compressAll = async () => {
    if (!items.length) return
    setLoading(true)
    setResults([])
    setCurrentIndex(0)

    const targetBytes = target * 1024 * 1024
    const compressed: Result[] = []

    for (let i = 0; i < items.length; i++) {
      setCurrentIndex(i + 1)

      const item = items[i]
      const bitmap = await createImageBitmap(item.file)

      // resize safeguard
      const MAX_WIDTH = 4000
      let width = bitmap.width
      let height = bitmap.height

      if (width > MAX_WIDTH) {
        const scale = MAX_WIDTH / width
        width = Math.round(width * scale)
        height = Math.round(height * scale)
      }

      const canvas = document.createElement('canvas')
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d')
      if (!ctx) continue
      ctx.drawImage(bitmap, 0, 0, width, height)

      let minQ = 0.4
      let maxQ = 0.95
      let bestBlob: Blob | null = null

      for (let step = 0; step < 8; step++) {
        const q = (minQ + maxQ) / 2
        const blob = await new Promise<Blob | null>((resolve) =>
          canvas.toBlob(resolve, 'image/webp', q)
        )

        if (!blob) break

        if (blob.size > targetBytes) {
          maxQ = q
        } else {
          bestBlob = blob
          minQ = q
        }
      }

      if (!bestBlob) continue

      compressed.push({
        name:
          item.file.name.replace(/\.\w+$/, '') +
          `-${target}mb.webp`,
        beforeUrl: item.preview,
        afterUrl: URL.createObjectURL(bestBlob),
        beforeSize: item.file.size,
        afterSize: bestBlob.size,
        blob: bestBlob,
      })
    }

    setResults(compressed)
    setLoading(false)
  }

  const downloadZip = async () => {
    const zip = new JSZip()
    results.forEach((r) => zip.file(r.name, r.blob))
    const blob = await zip.generateAsync({ type: 'blob' })

    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `compressed-${target}mb.zip`
    a.click()
    URL.revokeObjectURL(url)
  }

  /* ========================
      UI
  ======================== */

  const progressPercent =
    items.length > 0
      ? Math.round((currentIndex / items.length) * 100)
      : 0

  return (
    <div className="space-y-8">
      {/* DRAG & DROP */}
      <div
        onDragOver={(e) => {
          e.preventDefault()
          setDragging(true)
        }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault()
          setDragging(false)
          handleFiles(e.dataTransfer.files)
        }}
        className={`border-2 border-dashed rounded-2xl p-6 text-center transition
          ${
            dragging
              ? 'bg-gray-100 border-black'
              : 'bg-gray-50'
          }`}
      >
        <input
          type="file"
          multiple
          accept="image/*"
          id="files"
          className="hidden"
          onChange={(e) =>
            e.target.files && handleFiles(e.target.files)
          }
        />

        <label htmlFor="files" className="cursor-pointer block">
          <p className="text-lg font-semibold">
            Drag & Drop atau Klik untuk Upload
          </p>
          <p className="text-sm text-gray-600">
            JPG, PNG, WebP
          </p>
        </label>
      </div>

      {/* PREVIEW UPLOAD */}
      {items.length > 0 && (
        <div>
          <p className="text-sm font-medium mb-2">
            Preview Asli
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {items.map((item, i) => (
              <img
                key={i}
                src={item.preview}
                className="h-28 w-full object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* TARGET */}
      <div>
        <label className="block text-sm font-medium mb-2">
          Target Ukuran File
        </label>
        <select
          value={target}
          onChange={(e) =>
            setTarget(Number(e.target.value) as TargetMB)
          }
          className="w-full border rounded-lg p-2 cursor-pointer"
        >
          <option value={1}>1 MB</option>
          <option value={2}>2 MB</option>
          <option value={5}>5 MB</option>
        </select>
      </div>

      {/* BUTTON */}
      <button
        onClick={compressAll}
        disabled={!items.length || loading}
        className={`w-full py-2.5 rounded-xl font-medium text-white transition
          ${
            !items.length || loading
              ? 'bg-black/60 cursor-not-allowed'
              : 'bg-black hover:bg-gray-900 cursor-pointer'
          }`}
      >
        {loading ? 'Mengompres...' : 'Compress Sekarang'}
      </button>

      {/* PROGRESS BAR */}
      {loading && (
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-600">
            <span>
              Mengompres {currentIndex} / {items.length}
            </span>
            <span>{progressPercent}%</span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-black transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      )}

      {/* RESULTS */}
      {results.length > 0 && (
        <div className="space-y-6">
          {/* HEADER */}
          <div className="flex justify-between items-center">
            <span className="inline-flex items-center gap-2 text-green-700 bg-green-100 px-3 py-1 rounded-full text-sm font-medium">
              Target tercapai ✅
            </span>

            <button
              onClick={downloadZip}
              className="text-sm underline font-medium cursor-pointer"
            >
              Download Semua (ZIP)
            </button>
          </div>

          {/* RESULT LIST */}
          {results.map((r, i) => (
            <div
              key={i}
              className="grid grid-cols-1 md:grid-cols-2 gap-4 border rounded-xl p-4 bg-gray-50"
            >
              {/* BEFORE */}
              <div className="text-center space-y-2">
                <p className="text-sm font-medium">
                  Sebelum
                </p>
                <img
                  src={r.beforeUrl}
                  className="max-h-48 mx-auto rounded-lg"
                />
                <p className="text-xs text-gray-500">
                  {formatSize(r.beforeSize)}
                </p>
              </div>

              {/* AFTER */}
              <div className="text-center space-y-2">
                <p className="text-sm font-medium">
                  Sesudah
                </p>
                <img
                  src={r.afterUrl}
                  className="max-h-48 mx-auto rounded-lg"
                />
                <p className="text-xs text-gray-500">
                  {formatSize(r.afterSize)}
                </p>

                <a
                  href={r.afterUrl}
                  download={r.name}
                  className="text-sm underline font-medium inline-block"
                >
                  Download
                </a>
              </div>
            </div>
          ))}

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={resetResultOnly}
              className="flex-1 py-2 rounded-xl border font-medium hover:bg-gray-100 transition cursor-pointer"
            >
              Compress lagi dengan target lain
            </button>

            <button
              onClick={resetAll}
              className="flex-1 py-2 rounded-xl border font-medium hover:bg-gray-100 transition cursor-pointer"
            >
              Upload gambar baru
            </button>
          </div>
        </div>
      )}
    </div>
  )
}