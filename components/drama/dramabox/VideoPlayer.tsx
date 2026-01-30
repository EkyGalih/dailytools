"use client"

import { useState, useRef, useEffect } from "react"
import { Play, Lock, Smartphone, Monitor, ChevronRight, Share2, Info } from "lucide-react"
import { getAffiliateProducts } from "@/libs/ads/getAffiliateProducts"
import DramaShareIcons from '@/components/drama/dramabox/DramaShareIcon'

export default function DramaboxPlayer({
    detail,
    episodes,
    initialIndex
}: {
    detail: any,
    episodes: any[],
    initialIndex: number
}) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex)
    const [clickCount, setClickCount] = useState<Record<number, number>>({})
    const [isVertical, setIsVertical] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const currentEpisode = episodes[currentIndex]

    // Fungsi pilih URL Video
    const videoUrl = (() => {
        const cdn = currentEpisode?.cdnList?.find((c: any) => c.isDefault) || currentEpisode?.cdnList?.[0]
        const video = cdn?.videoPathList?.find((v: any) => v.isDefault) || cdn?.videoPathList?.[0]
        return video?.videoPath || ''
    })()

    const openAd = () => {
        const products = getAffiliateProducts(detail.tags || ["DEFAULT"])
        if (products?.length > 0) {
            const random = products[Math.floor(Math.random() * products.length)]
            if (random?.link) window.open(random.link, "_blank")
        }
    }

    const handleAction = (index: number) => {
        const count = (clickCount[index] || 0) + 1
        setClickCount(prev => ({ ...prev, [index]: count }))

        if (count === 1) {
            openAd()
            setCurrentIndex(index)
            return
        }
        if (count === 2) {
            openAd()
            return
        }
        if (count >= 3) {
            if (videoRef.current) videoRef.current.play()
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-zinc-950 p-2 md:p-6 rounded-[2.5rem] border border-white/5 shadow-2xl">

            {/* LEFT: PLAYER AREA (Col 3) */}
            <div className="lg:col-span-3 space-y-6">
                <div className={`relative bg-black rounded-[2rem] overflow-hidden ring-1 ring-white/10 shadow-2xl transition-all duration-500 ${isVertical ? 'max-w-[400px] mx-auto aspect-[9/16]' : 'w-full aspect-video'
                    }`}>
                    <video
                        ref={videoRef}
                        src={videoUrl}
                        controls
                        key={videoUrl}
                        className="w-full h-full object-contain"
                        poster={detail.coverWap}
                    />

                    {/* Overlay 3x Click */}
                    {(clickCount[currentIndex] || 0) < 3 && (
                        <div
                            onClick={() => handleAction(currentIndex)}
                            className="absolute inset-0 z-30 bg-zinc-900/90 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer group"
                        >
                            <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_40px_rgba(147,51,234,0.6)] mb-6 group-hover:scale-110 transition-transform">
                                <Play className="w-10 h-10 text-white fill-current ml-1" />
                            </div>
                            <p className="text-white text-xl font-black italic tracking-tighter uppercase">
                                Klik {(3 - (clickCount[currentIndex] || 0))}x Lagi Untuk Play
                            </p>
                            <p className="text-zinc-500 text-xs mt-2 font-bold tracking-widest uppercase">Dukung kami untuk menonton gratis</p>
                        </div>
                    )}
                </div>

                {/* Info Bar */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-4 p-5 bg-zinc-900/50 rounded-[1.5rem] border border-white/5">
                    <div className="space-y-1 text-center md:text-left">
                        <h1 className="text-white font-black italic uppercase tracking-tighter text-xl">
                            {detail.bookName} <span className="text-purple-500">— EP {currentIndex + 1}</span>
                        </h1>
                        <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">
                            {currentEpisode.chapterName || 'Subtitle Indonesia'}
                        </p>
                    </div>

                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => setIsVertical(!isVertical)}
                            className="flex items-center gap-2 px-4 py-2 bg-zinc-800 text-white text-[10px] font-black uppercase rounded-xl hover:bg-zinc-700 transition-all"
                        >
                            {isVertical ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                            {isVertical ? 'Mode TV' : 'Mode HP'}
                        </button>
                        <div className="p-2 bg-white rounded-xl">
                            <DramaShareIcons title={detail.bookName} url={typeof window !== 'undefined' ? window.location.href : ''} />
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT: EPISODE LIST (Col 1) */}
            <div className="lg:col-span-1 flex flex-col min-h-[400px]">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        Playlist Episode
                    </h3>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar max-h-[600px] lg:max-h-none">
                    {episodes.map((ep, i) => {
                        const isActive = i === currentIndex
                        const isLocked = ep.chargeChapter

                        return (
                            <button
                                key={ep.chapterId}
                                onClick={() => handleAction(i)}
                                className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${isActive
                                        ? 'bg-purple-600/10 border-purple-500/50'
                                        : 'bg-zinc-900/50 border-white/5 hover:bg-zinc-800'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xs font-black ${isActive ? 'bg-purple-600 text-white' : 'bg-zinc-800 text-zinc-500'
                                        }`}>
                                        {i + 1}
                                    </div>
                                    <p className={`text-[13px] font-bold ${isActive ? 'text-purple-400' : 'text-zinc-400'}`}>
                                        Episode {i + 1}
                                    </p>
                                </div>
                                {isLocked && <Lock className="w-3.5 h-3.5 text-orange-500" />}
                            </button>
                        )
                    })}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #27272a; border-radius: 10px; }
            `}</style>
        </div>
    )
}