"use client"

import { useEffect, useRef, useState, Suspense } from "react" // Tambahkan Suspense
import { useSearchParams, useRouter } from "next/navigation"
import Hls from "hls.js"
import { Maximize, ChevronLeft, ChevronRight, Zap, RotateCw } from "lucide-react"

// 1. Pindahkan seluruh logika utama ke komponen ini
function PlayerContent() {
    const videoRef = useRef<HTMLVideoElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)
    const router = useRouter()

    const searchParams = useSearchParams()
    const videoUrl = searchParams.get("video")
    const title = searchParams.get("title")
    const episode = searchParams.get("episode")
    const tag = searchParams.get("tag")

    const prevId = searchParams.get("prev")
    const nextId = searchParams.get("next")

    const [isRotated, setIsRotated] = useState(false)

    useEffect(() => {
        if (!videoUrl || !videoRef.current) return
        const video = videoRef.current

        if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = videoUrl
        } else if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(videoUrl)
            hls.attachMedia(video)
        }

        return () => { video.pause() }
    }, [videoUrl])

    const handleFullscreen = async () => {
        const container = containerRef.current
        if (!container) return
        try {
            if (container.requestFullscreen) {
                await container.requestFullscreen()
            } else if ((container as any).webkitRequestFullscreen) {
                await (container as any).webkitRequestFullscreen()
            } else {
                toggleRotate()
            }
        } catch (err) {
            toggleRotate()
        }
    }

    const toggleRotate = () => {
        setIsRotated(!isRotated)
        document.body.style.overflow = !isRotated ? "hidden" : "auto"
    }

    return (
        <main
            ref={containerRef}
            className={`min-h-screen bg-[#050507] flex flex-col items-center justify-center p-4 md:p-10 transition-all duration-500 ${isRotated ? 'rotate-mode' : ''}`}
        >
            {/* ... SISA KODE UI ANDA SAMA SEPERTI SEBELUMNYA ... */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-orange-600/5 blur-[120px] rounded-full" />
            </div>

            {!isRotated && (
                <div className="relative z-10 w-full max-w-5xl mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Zap size={14} className="text-orange-500" fill="currentColor" />
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500">TAMANTO Mini Player</span>
                        </div>
                        <h1 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-white leading-none">
                            Epiosde {title || "Untitled"}
                        </h1>
                    </div>
                </div>
            )}

            <div className={`relative z-50 w-full max-w-5xl group shadow-[0_30px_100px_rgba(0,0,0,0.8)] transition-all duration-500 ${isRotated ? 'rotated-video' : 'rounded-[2rem] overflow-hidden border border-white/5 bg-black'}`}>
                <video ref={videoRef} controls autoPlay playsInline className="w-full h-full object-contain" />

                {isRotated && (
                    <button onClick={toggleRotate} className="absolute top-4 right-4 z-[60] p-3 bg-black/50 backdrop-blur-md rounded-full text-white border border-white/10">
                        <RotateCw size={20} />
                    </button>
                )}
            </div>

            {!isRotated && (
                <div className="relative z-10 w-full max-w-5xl mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex gap-3">
                        <button
                            disabled={!prevId}
                            onClick={() => router.push(`/play?video=URL_BARU&episode=${Number(episode) - 1}&tag=${tag}&title=${title}&prev=...&next=...`)}
                            className={`flex-1 group flex items-center justify-center gap-3 px-6 py-4 bg-[#0c0c0e] border border-white/5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${!prevId ? 'opacity-20 cursor-not-allowed' : 'hover:border-white/20 active:scale-95'}`}
                        >
                            <ChevronLeft size={16} /> Prev
                        </button>

                        <button
                            disabled={!nextId}
                            onClick={() => router.push(`/play?video=URL_BARU&episode=${Number(episode) + 1}&tag=${tag}&title=${title}&prev=...&next=...`)}
                            className={`flex-1 group flex items-center justify-center gap-3 px-6 py-4 bg-orange-600 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all ${!nextId ? 'opacity-20 cursor-not-allowed' : 'hover:bg-orange-500 shadow-xl active:scale-95'}`}
                        >
                            Next <ChevronRight size={16} />
                        </button>
                    </div>

                    <button
                        onClick={handleFullscreen}
                        className="group flex items-center justify-center gap-4 px-8 py-4 bg-white/5 border border-white/10 rounded-2xl text-[11px] font-black uppercase tracking-widest text-zinc-300 hover:text-white transition-all active:scale-95"
                    >
                        <Maximize size={18} />
                        Theater Mode
                    </button>
                </div>
            )}

            <style jsx global>{`
                .rotate-mode { padding: 0 !important; background: black !important; }
                .rotated-video {
                    position: fixed !important; top: 50% !important; left: 50% !important;
                    width: 100vh !important; height: 100vw !important;
                    transform: translate(-50%, -50%) rotate(90deg) !important;
                    z-index: 9999 !important; background: black !important; border-radius: 0 !important;
                }
                @media (orientation: landscape) {
                    .rotated-video { transform: translate(-50%, -50%) rotate(0deg) !important; width: 100vw !important; height: 100vh !important; }
                }
            `}</style>
        </main>
    )
}

// 2. Export default hanya berisi Suspense
export default function PlayerPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-[#050507] flex items-center justify-center">
                <p className="text-white font-black tracking-widest animate-pulse">LOADING PLAYER...</p>
            </div>
        }>
            <PlayerContent />
        </Suspense>
    )
}