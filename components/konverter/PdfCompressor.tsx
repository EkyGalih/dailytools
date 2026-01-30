'use client'

import { useState } from 'react'
import { PDFDocument } from 'pdf-lib'
import { CloudUpload, CheckCircle2, Download, FileText, Loader2, Sparkles, Trash2, Info } from 'lucide-react'

export default function PdfCompressor() {
    const [file, setFile] = useState<File | null>(null)
    const [result, setResult] = useState<{ url: string; size: number } | null>(null)
    const [loading, setLoading] = useState(false)
    const [dragging, setDragging] = useState(false)
    const [progress, setProgress] = useState(0)

    const formatSize = (bytes: number) => {
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
        return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
    }

    const compressPdf = async () => {
        if (!file) return
        setLoading(true)
        setResult(null)
        setProgress(20)

        try {
            const arrayBuffer = await file.arrayBuffer()
            setProgress(40)

            const pdfDoc = await PDFDocument.load(arrayBuffer, { updateMetadata: false })
            setProgress(60)

            // Strip Metadata for optimization
            pdfDoc.setTitle('')
            pdfDoc.setAuthor('')
            pdfDoc.setProducer('')
            pdfDoc.setCreator('')

            setProgress(80)
            const compressedBytes = await pdfDoc.save({ useObjectStreams: true })

            const blob = new Blob([new Uint8Array(compressedBytes).buffer], { type: 'application/pdf' })
            const url = URL.createObjectURL(blob)

            setResult({ url, size: blob.size })
            setProgress(100)
        } catch (error) {
            console.error(error)
            alert("Gagal memproses PDF. Pastikan file tidak terenkripsi.")
        } finally {
            setTimeout(() => setLoading(false), 500)
        }
    }

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault()
        setDragging(false)
        const f = e.dataTransfer.files?.[0]
        if (f?.type === 'application/pdf') {
            setFile(f)
            setResult(null)
        }
    }

    return (
        <div className="w-full space-y-10 animate-in fade-in duration-700">
            {/* DROP ZONE */}
            <div
                onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
                onDragLeave={() => setDragging(false)}
                onDrop={handleDrop}
                className={`relative border-2 border-dashed rounded-[2.5rem] p-10 text-center transition-all duration-500 ${dragging ? 'bg-indigo-50 border-indigo-400 scale-[0.98]' : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-300'
                    }`}
            >
                <input type="file" accept="application/pdf" id="pdf" className="hidden" onChange={(e) => {
                    const f = e.target.files?.[0] || null
                    setFile(f); setResult(null);
                }} />
                <label htmlFor="pdf" className="cursor-pointer flex flex-col items-center gap-4">
                    <div className={`p-5 rounded-2xl shadow-sm transition-all duration-500 ${dragging ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`}>
                        <CloudUpload className={`w-8 h-8 ${dragging ? 'animate-bounce' : ''}`} />
                    </div>
                    <div className="space-y-1">
                        <p className="text-sm font-black uppercase italic tracking-tighter text-zinc-900">Drag & Drop Document</p>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">PDF Files Only</p>
                    </div>
                </label>
            </div>

            {/* FILE INFO & ACTION */}
            {file && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end">
                    <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 flex items-center gap-4">
                        <div className="p-3 bg-white rounded-xl text-indigo-500 shadow-sm">
                            <FileText size={24} />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-xs font-black text-zinc-900 truncate uppercase tracking-tight">{file.name}</p>
                            <p className="text-[10px] font-bold text-zinc-400 uppercase">{formatSize(file.size)}</p>
                        </div>
                        <button onClick={() => { setFile(null); setResult(null) }} className="p-2 hover:bg-red-50 hover:text-red-500 rounded-lg transition-colors text-zinc-300">
                            <Trash2 size={16} />
                        </button>
                    </div>

                    <div className="space-y-4">
                        <button
                            onClick={compressPdf}
                            disabled={loading}
                            className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-900 transition-all active:scale-95 shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden relative"
                        >
                            {loading ? <><Loader2 className="w-4 h-4 animate-spin" /><span>Optimizing...</span></> : <><Sparkles className="w-4 h-4" /><span>Start Compression</span></>}
                        </button>

                        {/* PROGRESS HUB */}
                        {loading && (
                            <div className="p-6 bg-zinc-900 rounded-[2rem] border border-white/5 shadow-2xl space-y-4 animate-in zoom-in-95">
                                <div className="flex justify-between items-end">
                                    <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Processing Stream</p>
                                    <span className="text-2xl font-black italic tracking-tighter text-white leading-none">{progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                                    <div
                                        className="h-full bg-gradient-to-r from-indigo-500 via-blue-500 to-indigo-500 bg-[length:200%_100%] animate-shimmer rounded-full transition-all duration-500"
                                        style={{ width: `${progress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* RESULTS */}
            {result && !loading && (
                <div className="pt-10 border-t border-zinc-100 space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="flex items-center gap-2 text-green-600 font-black text-[10px] uppercase tracking-[0.2em] ml-2">
                        <CheckCircle2 className="w-4 h-4" /> Document Optimized Successfully
                    </div>

                    <div className="bg-[#0c0c0c] rounded-[2.5rem] p-8 md:p-12 overflow-hidden border border-white/5 shadow-2xl relative">
                        <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full" />

                        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10">
                            <div className="flex-1 grid grid-cols-2 gap-10 w-full">
                                <div className="space-y-1">
                                    <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1">Original Size</p>
                                    <p className="text-2xl font-black italic tracking-tighter text-zinc-600 line-through leading-none">{formatSize(file!.size)}</p>
                                </div>
                                <div className="space-y-1 border-l border-white/5 pl-10">
                                    <p className="text-[9px] font-black text-indigo-400 uppercase tracking-widest mb-1 leading-none italic">New Size</p>
                                    <p className="text-4xl md:text-6xl font-black italic tracking-tighter text-white leading-none transition-all">{formatSize(result.size)}</p>
                                </div>
                            </div>
                            <a
                                href={result.url}
                                download={`optimized-${file!.name}`}
                                className="w-full md:w-auto flex items-center justify-center gap-3 px-10 py-5 bg-white text-zinc-900 rounded-[1.5rem] font-black uppercase tracking-[0.2em] text-[10px] hover:bg-indigo-400 hover:text-white transition-all active:scale-95 shadow-xl"
                            >
                                <Download className="w-4 h-4" /> Download PDF
                            </a>
                        </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
                        <Info className="w-4 h-4 text-indigo-500 mt-0.5" />
                        <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                            <strong>Note:</strong> Kompresi ini menghilangkan metadata dan mengoptimalkan stream objek. Untuk PDF hasil scan resolusi tinggi, hasil mungkin bervariasi tergantung struktur file asli.
                        </p>
                    </div>
                </div>
            )}

            <style jsx>{`
                @keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }
                .animate-shimmer { animation: shimmer 3s infinite linear; }
            `}</style>
        </div>
    )
}