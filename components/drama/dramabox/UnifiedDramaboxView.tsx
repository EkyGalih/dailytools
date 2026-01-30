'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Lock, Smartphone, Monitor, Calendar, Info, ChevronLeft } from 'lucide-react'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'
import DramaShareIcons from '@/components/drama/dramabox/DramaShareIcon'
import Link from 'next/link'

export default function UnifiedDramaboxView({ detail, episodes }: { detail: any, episodes: any[] }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [clickCount, setClickCount] = useState<Record<number, number>>({})
    const [isVertical, setIsVertical] = useState(false)
    const [isAdGap, setIsAdGap] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const currentEpisode = episodes[currentIndex]

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
        if (!isPlaying) setIsPlaying(true)
        if (isAdGap) {
            openAd(); setIsAdGap(false)
            setTimeout(() => videoRef.current?.play(), 500)
            return
        }
        const count = (clickCount[index] || 0) + 1
        setClickCount(prev => ({ ...prev, [index]: count }))
        if (count === 1) { openAd(); setCurrentIndex(index); return }
        if (count === 2) { openAd(); return }
        if (count >= 3 && videoRef.current) videoRef.current.play()
    }

    const handleVideoEnded = () => {
        const nextIndex = currentIndex + 1
        if (nextIndex < episodes.length) {
            if ((nextIndex + 1) % 10 === 0) {
                setIsAdGap(true); setCurrentIndex(nextIndex)
                setClickCount(prev => ({ ...prev, [nextIndex]: 3 }))
            } else {
                setCurrentIndex(nextIndex)
                setClickCount(prev => ({ ...prev, [nextIndex]: 3 }))
            }
        }
    }

    useEffect(() => {
        if (isPlaying && !isAdGap && (clickCount[currentIndex] || 0) >= 3) {
            const timer = setTimeout(() => {
                videoRef.current?.play().catch(() => console.log("Autoplay blocked"))
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [currentIndex, isAdGap])

    return (
        <article className="bg-white rounded-[2.5rem] md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100 overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_380px] gap-0">

                {/* ========================================== */}
                {/* LEFT: PLAYER & INFO AREA */}
                {/* ========================================== */}
                <div className="p-4 md:p-10 border-r border-zinc-100 flex flex-col gap-8">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        <Link href="/dramabox" className="hover:text-purple-600 transition-colors">Home</Link>
                        <ChevronLeft className="w-3 h-3" />
                        <Link href="/drama/china/channel/dramabox" className="hover:text-purple-600 transition-colors">DramaBox</Link>
                        <ChevronLeft className="w-3 h-3" />
                        <span className="text-zinc-900 truncate max-w-[150px]">{detail.bookName}</span>
                    </nav>

                    {/* 1. THE PLAYER / PREVIEW */}
                    <div className="w-full">
                        {!isPlaying ? (
                            <div className="grid md:grid-cols-[250px_1fr] gap-8 items-center">
                                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
                                    <Image src={detail.coverWap} alt={detail.bookName} fill className="object-cover" />
                                </div>
                                <div className="space-y-6 text-center md:text-left">
                                    <h1 className="text-4xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-none">{detail.bookName}</h1>
                                    <button
                                        onClick={() => handleAction(0)}
                                        className="group flex items-center justify-center gap-4 px-10 py-5 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95 shadow-xl shadow-purple-500/20"
                                    >
                                        <Play className="w-6 h-6 fill-current group-hover:scale-110 transition-transform" /> Mulai Menonton
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div className={`relative bg-black rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 ${isVertical ? 'max-w-[360px] mx-auto aspect-[9/16]' : 'w-full aspect-video'}`}>
                                    <video ref={videoRef} src={videoUrl} controls onEnded={handleVideoEnded} className="w-full h-full object-contain" />

                                    {/* Overlays */}
                                    {(clickCount[currentIndex] || 0) < 3 && !isAdGap && (
                                        <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-30 bg-zinc-950/90 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer">
                                            <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50"><Play className="w-8 h-8 text-white fill-current ml-1" /></div>
                                            <p className="text-white font-black italic uppercase tracking-tighter">Klik Untuk Play</p>
                                        </div>
                                    )}
                                    {isAdGap && (
                                        <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-40 bg-purple-900/90 backdrop-blur-3xl flex flex-col items-center justify-center cursor-pointer text-center p-6">
                                            <div className="w-20 h-20 bg-white text-purple-600 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-2xl font-black text-2xl">10+</div>
                                            <h2 className="text-white text-2xl font-black italic uppercase tracking-tighter">Support & Lanjut Menonton</h2>
                                            <p className="text-purple-200 text-xs mt-2 font-bold uppercase tracking-widest">Klik untuk lanjut ke Episode {currentIndex + 1}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. DRAMA INFORMATION (Always Visible or below player) */}
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-8">
                            <div className="space-y-3 flex-1">
                                <h2 className="text-3xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-none">
                                    {detail.bookName}
                                </h2>
                                <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5"><Play className="w-3 h-3" /> {detail.chapterCount} Episodes</span>
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {detail.shelfTime?.slice(0, 4) || '2026'}</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <button onClick={() => setIsVertical(!isVertical)} className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase rounded-xl hover:bg-zinc-200 transition-all">
                                    {isVertical ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                    {isVertical ? 'Mode TV' : 'Mode HP'}
                                </button>
                                <div className="p-2 bg-zinc-100 rounded-xl">
                                    <DramaShareIcons title={detail.bookName} url={typeof window !== 'undefined' ? window.location.href : ''} />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <Info className="w-4 h-4" /> Sinopsis Cerita
                                </h3>
                                <p className="text-zinc-600 leading-relaxed font-medium text-lg italic italic">
                                    "{detail.introduction}"
                                </p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Genre Terkait</h3>
                                <div className="flex flex-wrap gap-2">
                                    {detail.tags?.map((t: string) => (
                                        <span key={t} className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 text-zinc-500 text-[10px] font-black uppercase rounded-xl hover:text-purple-600 hover:border-purple-200 transition-all cursor-default">
                                            #{t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================== */}
                {/* RIGHT: SCROLLABLE EPISODE LIST */}
                {/* ========================================== */}
                <aside className="bg-zinc-50/50 flex flex-col h-full lg:max-h-[900px]">
                    <div className="p-6 md:p-8 border-b border-zinc-100 bg-zinc-50/80 backdrop-blur-sm sticky top-0 z-10">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> Playlist Episode
                        </h3>
                        <p className="text-[10px] text-zinc-400 font-bold mt-1">Pilih episode untuk memutar</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                        <div className="grid grid-cols-4 lg:grid-cols-2 gap-3 pb-10">
                            {episodes.map((ep, i) => {
                                const isActive = i === currentIndex
                                const isWatched = (clickCount[i] || 0) >= 3
                                return (
                                    <button
                                        key={ep.chapterId}
                                        onClick={() => { setIsAdGap(false); handleAction(i) }}
                                        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${isActive
                                            ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-500/30 scale-95'
                                            : 'bg-white border-zinc-200/60 text-zinc-400 hover:border-purple-300 hover:text-zinc-600'
                                            }`}
                                    >
                                        <span className="text-[9px] font-black uppercase opacity-60">EP</span>
                                        <span className="text-2xl font-black italic tracking-tighter leading-none">{i + 1}</span>
                                        {isWatched && !isActive && <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-green-500 rounded-full shadow-[0_0_8px_rgba(34,197,94,0.6)]" />}
                                        {ep.chargeChapter && !isActive && <Lock className="absolute top-2 right-2 w-3 h-3 text-orange-400" />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </aside>

            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #d4d4d8; }
      `}</style>
        </article>
    )
}