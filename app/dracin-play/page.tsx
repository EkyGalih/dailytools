"use client"

import { useEffect, useRef, useState, useCallback, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import Hls from "hls.js"
import { Maximize, RotateCw, Loader2 } from "lucide-react"

// Komponen Utama yang dibungkus Suspense
export default function DracinPlayPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="text-orange-500 animate-spin" size={40} />
            </div>
        }>
            <DracinPlayerContent />
        </Suspense>
    )
}

function DracinPlayerContent() {
    const searchParams = useSearchParams()
    const videoRef = useRef<HTMLVideoElement>(null)
    const hlsRef = useRef<Hls | null>(null) // Gunakan ref untuk Hls agar bisa dibersihkan

    const [episodes, setEpisodes] = useState<any[]>([])
    const [currentIndex, setCurrentIndex] = useState(Number(searchParams.get("epsIndex") || 0))
    const [loading, setLoading] = useState(true)
    const [isRotated, setIsRotated] = useState(false)

    const bookId = searchParams.get("tag")

    // 1. Fetching data
    useEffect(() => {
        if (!bookId) return;
        if (episodes.length > 0) return; // cegah double fetch

        async function loadEpisodes() {
            console.log("BOOK ID:", bookId)
            setLoading(true);
            try {
                const res = await fetch(
                    `https://api.sansekai.my.id/api/dramabox/allepisode?bookId=${bookId}`
                );

                if (!res.ok) {
                    console.log("STATUS:", res.status);
                    throw new Error("Failed to fetch episodes");
                }

                const data = await res.json();
                if (Array.isArray(data)) {
                    setEpisodes(data);
                }
            } catch (err) {
                console.error("🔥 Player Fetch Error:", err);
            } finally {
                setLoading(false);
            }
        }

        loadEpisodes();
    }, [bookId]);

    // 2. Setup Video & HLS
    useEffect(() => {
        if (episodes.length === 0 || !videoRef.current) return

        const currentEp = episodes[currentIndex]

        console.log("========= DEBUG PLAYER =========")
        console.log("Current Index:", currentIndex)
        console.log("Total Episodes:", episodes.length)
        console.log("Current EP:", currentEp)
        const cdn = currentEp.cdnList.find((c: any) => c.isDefault === 1) || currentEp.cdnList[0]
        const videoData = cdn.videoPathList.find((v: any) => v.quality === 720) || cdn.videoPathList[0]
        const videoSrc = videoData.videoPath

        const video = videoRef.current

        // Bersihkan Hls sebelumnya jika ada
        if (hlsRef.current) {
            hlsRef.current.destroy()
        }

        if (Hls.isSupported()) {
            const hls = new Hls()
            hls.loadSource(videoSrc)
            hls.attachMedia(video)
            hlsRef.current = hls
        } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
            video.src = videoSrc
        }

        return () => {
            if (hlsRef.current) {
                hlsRef.current.destroy()
            }
        }
    }, [currentIndex, episodes])

    const playNext = useCallback(() => {
        if (currentIndex < episodes.length - 1) {
            setCurrentIndex(prev => prev + 1)
        }
    }, [currentIndex, episodes.length])

    useEffect(() => {
        const video = videoRef.current
        if (!video) return
        const handleEnded = () => playNext()
        video.addEventListener("ended", handleEnded)
        return () => video.removeEventListener("ended", handleEnded)
    }, [playNext])

    if (loading) return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <Loader2 className="text-orange-500 animate-spin" size={40} />
        </div>
    )

    const currentEp = episodes[currentIndex]

    return (
        <main className={`min-h-screen bg-[#050507] flex flex-col items-center justify-center transition-all ${isRotated ? 'rotate-mode' : 'p-4'}`}>
            {!isRotated && currentEp && (
                <div className="w-full max-w-4xl mb-6">
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-[.3em]">Playing Episode</span>
                    <h1 className="text-2xl font-black text-white italic uppercase tracking-tighter">
                        {currentEp.chapterName} <span className="text-zinc-600">/</span> {episodes.length}
                    </h1>
                </div>
            )}

            <div className={`relative w-full max-w-4xl bg-black ${isRotated ? 'rotated-video' : 'rounded-[2rem] overflow-hidden border border-white/5'}`}>
                <video ref={videoRef} controls autoPlay playsInline className="w-full h-full object-contain aspect-[9/16] md:aspect-video" />
                {isRotated && (
                    <button onClick={() => setIsRotated(false)} className="absolute top-6 right-6 p-4 bg-black/50 rounded-full text-white"><RotateCw /></button>
                )}
            </div>

            {!isRotated && (
                <div className="w-full max-w-4xl mt-8 flex gap-3">
                    <button
                        disabled={currentIndex === 0}
                        onClick={() => setCurrentIndex(prev => prev - 1)}
                        className="flex-1 py-4 bg-zinc-900 rounded-2xl font-bold disabled:opacity-20 text-xs uppercase text-white"
                    >
                        Prev
                    </button>
                    <button
                        onClick={() => setIsRotated(true)}
                        className="p-4 bg-zinc-900 rounded-2xl text-white"
                    >
                        <Maximize size={20} />
                    </button>
                    <button
                        disabled={currentIndex === episodes.length - 1}
                        onClick={playNext}
                        className="flex-[2] py-4 bg-orange-600 rounded-2xl font-black text-xs uppercase shadow-xl shadow-orange-600/20 text-white"
                    >
                        Next Episode
                    </button>
                </div>
            )}

            <style jsx global>{`
                .rotate-mode { padding: 0; background: black; }
                .rotated-video {
                    position: fixed; top: 50%; left: 50%; width: 100vh; height: 100vw;
                    transform: translate(-50%, -50%) rotate(90deg); z-index: 9999;
                }
            `}</style>
        </main>
    )
}