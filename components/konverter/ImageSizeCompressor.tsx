'use client'

import { useState } from 'react'
import JSZip from 'jszip'
import { CloudUpload, ImageIcon, CheckCircle2, Download, Trash2, Zap, Loader2, Sparkles } from 'lucide-react'

type TargetMB = 1 | 2 | 5

export default function ImageSizeCompressor() {
  const [items, setItems] = useState<any[]>([])
  const [results, setResults] = useState<any[]>([])
  const [target, setTarget] = useState<TargetMB>(1)
  const [loading, setLoading] = useState(false)
  const [dragging, setDragging] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

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

  const formatSize = (bytes: number) => {
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB'
    return (bytes / (1024 * 1024)).toFixed(2) + ' MB'
  }

  const compressAll = async () => {
    if (!items.length) return
    setLoading(true)
    setResults([])
    const targetBytes = target * 1024 * 1024
    const compressed: any[] = []

    for (let i = 0; i < items.length; i++) {
      setCurrentIndex(i + 1)
      const item = items[i]

      // Delay kecil agar progress bar terlihat animasinya (UX)
      await new Promise(r => setTimeout(r, 100))

      const bitmap = await createImageBitmap(item.file)
      const canvas = document.createElement('canvas')
      canvas.width = bitmap.width
      canvas.height = bitmap.height
      const ctx = canvas.getContext('2d')
      if (!ctx) continue
      ctx.drawImage(bitmap, 0, 0)

      let minQ = 0.3, maxQ = 0.95, bestBlob: Blob | null = null
      for (let step = 0; step < 7; step++) {
        const q = (minQ + maxQ) / 2
        const blob = await new Promise<Blob | null>(res => canvas.toBlob(res, 'image/webp', q))
        if (!blob) break
        if (blob.size > targetBytes) maxQ = q
        else { bestBlob = blob; minQ = q }
      }

      if (bestBlob) {
        compressed.push({
          name: item.file.name.split('.')[0] + `-${target}mb.webp`,
          beforeUrl: item.preview,
          afterUrl: URL.createObjectURL(bestBlob),
          beforeSize: item.file.size,
          afterSize: bestBlob.size,
          blob: bestBlob,
        })
      }
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
    a.download = `mytools-compressed.zip`
    a.click()
  }

  const progressPercent = items.length > 0 ? Math.round((currentIndex / items.length) * 100) : 0

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700">
      {/* UPLOAD ZONE */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true) }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files) }}
        className={`relative border-2 border-dashed rounded-[2.5rem] p-10 text-center transition-all duration-500 ${dragging ? 'bg-indigo-50 border-indigo-400 scale-[0.98]' : 'bg-zinc-50/50 border-zinc-200 hover:border-zinc-300'
          }`}
      >
        <input type="file" multiple accept="image/*" id="files" className="hidden" onChange={(e) => e.target.files && handleFiles(e.target.files)} />
        <label htmlFor="files" className="cursor-pointer flex flex-col items-center gap-4">
          <div className={`p-5 rounded-2xl shadow-sm transition-all duration-500 ${dragging ? 'bg-indigo-500 text-white' : 'bg-white text-indigo-500'}`}>
            <CloudUpload className={`w-8 h-8 ${dragging ? 'animate-bounce' : ''}`} />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-black uppercase italic tracking-tighter text-zinc-900">Drag & Drop Assets</p>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">JPG, PNG, WebP (Max 20MB)</p>
          </div>
        </label>
      </div>

      {/* CONFIG & PROGRESS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="space-y-8">
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
              <Zap className="w-3 h-3 text-indigo-500" /> Target Configuration
            </label>
            <div className="flex flex-wrap gap-3">
              {[1, 2, 5].map((mb) => (
                <button
                  key={mb}
                  disabled={loading}
                  onClick={() => setTarget(mb as TargetMB)}
                  className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 ${target === mb ? 'bg-zinc-900 text-white shadow-xl translate-y-[-2px]' : 'bg-white border border-zinc-200 text-zinc-500 hover:border-indigo-400'
                    } disabled:opacity-50`}
                >
                  {mb} MB Target
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <button
              onClick={compressAll}
              disabled={!items.length || loading}
              className="w-full py-5 bg-indigo-600 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-zinc-900 transition-all active:scale-95 shadow-xl shadow-indigo-100 disabled:opacity-50 flex items-center justify-center gap-3 overflow-hidden relative"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Optimizing...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Start Compression</span>
                </>
              )}
            </button>

            {/* PROGRESS BAR HUB */}
            {loading && (
              <div className="p-6 bg-zinc-900 rounded-[2rem] border border-white/5 shadow-2xl space-y-4 animate-in zoom-in-95 duration-500">
                <div className="flex justify-between items-end">
                  <div className="space-y-1">
                    <p className="text-[9px] font-black uppercase tracking-widest text-indigo-400">Current Task</p>
                    <p className="text-xs font-bold text-white italic tracking-tight">Processing {currentIndex} of {items.length} Assets</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black italic tracking-tighter text-white leading-none">{progressPercent}%</span>
                  </div>
                </div>
                <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden p-0.5 border border-white/5">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-500 bg-[length:200%_100%] animate-shimmer rounded-full transition-all duration-500 ease-out shadow-[0_0_15px_rgba(99,102,241,0.4)]"
                    style={{ width: `${progressPercent}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* QUEUE VISUALIZER */}
        <div className="bg-zinc-50/50 rounded-[2.5rem] p-8 border border-zinc-100 relative">
          <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest mb-6 flex items-center gap-2">
            <ImageIcon className="w-3 h-3" /> Queue Status
          </p>
          <div className="grid grid-cols-4 gap-4 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
            {items.map((item, i) => (
              <div key={i} className={`relative group aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-500 ${i < currentIndex ? 'border-green-500 scale-95 opacity-50' : 'border-zinc-200'
                }`}>
                <img src={item.preview} className="w-full h-full object-cover" />
                {i < currentIndex && (
                  <div className="absolute inset-0 bg-green-500/20 flex items-center justify-center backdrop-blur-[1px]">
                    <CheckCircle2 className="w-6 h-6 text-white drop-shadow-md" />
                  </div>
                )}
              </div>
            ))}
            {items.length === 0 && (
              <div className="col-span-4 flex flex-col items-center justify-center py-10 opacity-10">
                <ImageIcon className="w-12 h-12 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest">Waiting for assets</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* RESULTS LIST (Grid Modern) */}
      {results.length > 0 && !loading && (
        <div className="pt-10 border-t border-zinc-100 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-100 rounded-lg text-green-600">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-black uppercase italic tracking-tighter text-zinc-900">Batch Optimization Complete</h3>
                <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest leading-none">All assets processed successfully</p>
              </div>
            </div>
            <button onClick={downloadZip} className="flex items-center justify-center gap-2 px-8 py-3 bg-zinc-900 text-white rounded-xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-zinc-200">
              <Download className="w-3.5 h-3.5" /> Download Bundle (ZIP)
            </button>
          </header>

          <div className="grid gap-4">
            {results.map((r, i) => (
              <div key={i} className="bg-white border border-zinc-100 rounded-[2rem] p-5 flex flex-col md:flex-row items-center gap-6 group hover:border-indigo-200 transition-all duration-500">
                <div className="w-full md:w-32 aspect-square rounded-2xl overflow-hidden bg-zinc-50 border border-zinc-100 shrink-0">
                  <img src={r.afterUrl} className="w-full h-full object-contain p-2" />
                </div>
                <div className="flex-1 grid grid-cols-2 md:grid-cols-3 gap-6 items-center">
                  <div className="space-y-1">
                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest leading-none">Before</p>
                    <p className="text-xs font-black text-zinc-300 italic line-through tracking-tighter">{formatSize(r.beforeSize)}</p>
                  </div>
                  <div className="space-y-1 border-l border-zinc-50 pl-6">
                    <p className="text-[8px] font-black text-indigo-400 uppercase tracking-widest leading-none">Optimized</p>
                    <p className="text-xl font-black italic tracking-tighter text-zinc-900 leading-none">{formatSize(r.afterSize)}</p>
                  </div>
                  <div className="col-span-2 md:col-span-1 flex justify-end">
                    <a href={r.afterUrl} download={r.name} className="flex items-center gap-2 px-5 py-2.5 bg-zinc-50 border border-zinc-100 rounded-xl text-[9px] font-black uppercase text-zinc-600 hover:bg-zinc-900 hover:text-white transition-all group-hover:shadow-sm">
                      <Download className="w-3 h-3" /> Save File
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .animate-shimmer {
          animation: shimmer 3s infinite linear;
        }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.05); border-radius: 10px; }
      `}</style>
    </div>
  )
}