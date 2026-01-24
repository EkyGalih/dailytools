'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'

function formatSize(bytes: number) {
    if (bytes < 1024) return bytes + ' B'
    if (bytes < 1024 * 1024)
        return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
}

export default function PdfCompressor() {
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState<{
        url: string
        size: number
    } | null>(null)
    const [loading, setLoading] = useState(false)

    const compressPdf = async () => {
        if (!file) return
        setLoading(true)
        setResult(null)

        const arrayBuffer = await file.arrayBuffer()

        const pdfDoc = await PDFDocument.load(arrayBuffer, {
            updateMetadata: false,
        })

        // remove metadata (safe & effective)
        pdfDoc.setTitle('')
        pdfDoc.setAuthor('')
        pdfDoc.setSubject('')
        pdfDoc.setKeywords([])
        pdfDoc.setProducer('')
        pdfDoc.setCreator('')

        const compressedBytes = await pdfDoc.save({
            useObjectStreams: true,
            addDefaultPage: false,
        })

        const blob = new Blob(
            [new Uint8Array(compressedBytes).buffer],
            { type: 'application/pdf' }
        )

        const url = URL.createObjectURL(blob)
        setResult({ url, size: blob.size })
        setLoading(false)
    }

    return (
        <div className="space-y-6">
            {/* UPLOAD */}
            <div className="border-2 border-dashed rounded-2xl p-6 text-center bg-gray-50">
                <input
                    type="file"
                    accept="application/pdf"
                    id="pdf"
                    className="hidden"
                    onChange={(e) => {
                        const f = e.target.files?.[0] || null
                        setFile(f)
                        setResult(null)
                    }}
                />

                <label htmlFor="pdf" className="cursor-pointer block">
                    <p className="text-lg font-semibold">
                        Upload File PDF
                    </p>
                    <p className="text-sm text-gray-600">
                        PDF dokumen / formulir / scan ringan
                    </p>
                </label>
            </div>

            {/* INFO */}
            {file && (
                <div className="text-sm text-gray-600 space-y-1">
                    <p>
                        <strong>Nama:</strong> {file.name}
                    </p>
                    <p>
                        <strong>Ukuran asli:</strong>{' '}
                        {formatSize(file.size)}
                    </p>
                </div>
            )}

            {/* BUTTON */}
            <button
                onClick={compressPdf}
                disabled={!file || loading}
                className={`w-full py-2.5 rounded-xl font-medium text-white transition
          ${!file || loading
                        ? 'bg-black/60 cursor-not-allowed'
                        : 'bg-black hover:bg-gray-900 cursor-pointer'
                    }`}
            >
                {loading ? 'Mengompres PDF...' : 'Compress PDF'}
            </button>

            {/* RESULT */}
            {result && (
                <div className="border rounded-2xl p-5 bg-gray-50 space-y-3 text-center">
                    <p className="font-medium">
                        Hasil Kompresi
                    </p>

                    <p className="text-sm text-gray-600">
                        Ukuran hasil:{' '}
                        <strong>{formatSize(result.size)}</strong>
                    </p>

                    <a
                        href={result.url}
                        download={`compressed-${file!.name}`}
                        className="inline-block text-sm font-medium underline"
                    >
                        Download PDF
                    </a>
                </div>
            )}

            <p className="text-xs text-gray-500">
                Catatan: Kompresi PDF client-side bersifat ringan.
                Untuk PDF scan besar, hasil tergantung isi file.
            </p>
        </div>
    )
}