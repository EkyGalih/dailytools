'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Lock, Smartphone, Monitor, Calendar, Info, ChevronLeft, Star, ArrowLeft } from 'lucide-react'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'
import DramaShareIcons from '@/components/drama/dramabox/DramaShareIcon'

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
        <article className="bg-white rounded-[1.5rem] md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100 overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_380px] gap-0">

                {/* ========================================== */}
                {/* LEFT: PLAYER & INFO AREA */}
                {/* ========================================== */}
                <div className="p-4 md:p-10 border-r border-zinc-100 flex flex-col gap-6 md:gap-8">

                    {/* Breadcrumb - Ukuran lebih kecil di Mobile */}
                    <nav className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 overflow-hidden whitespace-nowrap">
                        <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                        <ChevronLeft className="w-2.5 h-2.5" />
                        <Link href="/drama/china/channel/dramabox" className="hover:text-purple-600 transition-colors">DramaBox</Link>
                        <ChevronLeft className="w-2.5 h-2.5" />
                        <span className="text-zinc-900 truncate">{detail.bookName}</span>
                    </nav>

                    {/* 1. THE PLAYER / PREVIEW */}
                    <div className="w-full">
                        {!isPlaying ? (
                            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-8 items-center">
                                <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] max-w-[200px] md:max-w-none mx-auto w-full overflow-hidden shadow-2xl ring-1 ring-black/5">
                                    <Image src={detail.coverWap} alt={detail.bookName} fill className="object-cover" />
                                </div>
                                <div className="space-y-4 md:space-y-6 text-center md:text-left">
                                    <h1 className="text-2xl md:text-4xl font-black text-zinc-900 italic uppercase tracking-tighter leading-tight md:leading-none">
                                        {detail.bookName}
                                    </h1>
                                    <button
                                        onClick={() => handleAction(0)}
                                        className="group flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-purple-600 text-white rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95 shadow-xl shadow-purple-500/20"
                                    >
                                        <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" /> Mulai Menonton
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className={`relative bg-black rounded-[1.2rem] md:rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 ${isVertical ? 'max-w-[320px] md:max-w-[360px] mx-auto aspect-[9/16]' : 'w-full aspect-video'}`}>
                                    <video ref={videoRef} src={videoUrl} controls onEnded={handleVideoEnded} className="w-full h-full object-contain" />

                                    {/* Overlays 3x Klik */}
                                    {(clickCount[currentIndex] || 0) < 3 && !isAdGap && (
                                        <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-30 bg-zinc-950/90 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                                                <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" />
                                            </div>
                                            <p className="text-white text-sm md:text-base font-black italic uppercase tracking-tighter leading-none">
                                                Klik Untuk Memulai
                                            </p>
                                        </div>
                                    )}

                                    {/* Overlays 10 Ep Gap */}
                                    {isAdGap && (
                                        <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-40 bg-purple-900/95 backdrop-blur-3xl flex flex-col items-center justify-center cursor-pointer text-center p-6">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white text-purple-600 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-2xl font-black text-xl md:text-2xl">10+</div>
                                            <h2 className="text-white text-lg md:text-2xl font-black italic uppercase tracking-tighter">Support & Lanjut</h2>
                                            <p className="text-purple-200 text-[10px] md:text-xs mt-2 font-bold uppercase tracking-widest">Klik untuk lanjut ke Episode {currentIndex + 1}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. DRAMA INFORMATION */}
                    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
                        <div className="flex flex-col gap-6 border-b border-zinc-50 pb-6 md:pb-8">
                            {/* BARIS 1: INFORMASI JUDUL & META */}
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-[8px] md:text-[9px] font-black uppercase rounded-md tracking-widest">
                                        Trending Now
                                    </span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-[10px] font-black text-zinc-900">4.9</span>
                                    </div>
                                </div>

                                <h4 className="text-2xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-tight md:leading-[0.9]">
                                    {detail.bookName}
                                </h4>

                                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5">
                                        <Play className="w-3 h-3 text-purple-500" /> {detail.chapterCount} Episodes
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3 text-purple-500" /> {detail.shelfTime?.slice(0, 4) || '2026'}
                                    </span>
                                </div>
                            </div>

                            {/* BARIS 2: TOMBOL AKSI */}
                            <div className="flex items-center justify-between gap-2 md:gap-3 pt-4 border-t border-zinc-50/50">
                                {/* TOMBOL SHARE: Sekarang di pojok kiri karena justify-between */}
                                <div className="p-2 md:p-2.5 bg-zinc-100 rounded-lg md:rounded-xl border border-zinc-200/50 shadow-sm flex-shrink-0">
                                    <DramaShareIcons title={detail.bookName} url={typeof window !== 'undefined' ? window.location.href : ''} />
                                </div>

                                {/* GROUP NAVIGASI: Didorong otomatis ke pojok kanan */}
                                <div className="flex items-center gap-2">
                                    <Link
                                        href="/drama/china/channel/dramabox"
                                        className="flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 bg-zinc-100 text-zinc-600 text-[9px] md:text-[10px] font-black uppercase rounded-lg md:rounded-xl hover:bg-zinc-200 transition-all border border-zinc-200/50 shadow-sm"
                                    >
                                        <ArrowLeft className="w-3 h-3 md:w-4 md:h-4" />
                                        <span className="hidden xs:inline">Daftar Drama</span>
                                        <span className="xs:hidden">Daftar Drama</span>
                                    </Link>

                                    <button
                                        onClick={() => setIsVertical(!isVertical)}
                                        className="flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 bg-zinc-100 text-zinc-600 text-[9px] md:text-[10px] font-black uppercase rounded-lg md:rounded-xl hover:bg-zinc-200 transition-all border border-zinc-200/50 shadow-sm"
                                    >
                                        {isVertical ? <Monitor className="w-3.5 h-3.5 md:w-4 md:h-4" /> : <Smartphone className="w-3.5 h-3.5 md:w-4 md:h-4" />}
                                        <span className="hidden xs:inline">{isVertical ? 'Mode TV' : 'Mode HP'}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                            <div className="md:col-span-2 space-y-3 md:space-y-4">
                                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <Info className="w-3.5 h-3.5" /> Sinopsis Cerita
                                </h3>
                                <p className="text-zinc-600 leading-relaxed font-medium text-sm md:text-lg italic">
                                    "{detail.introduction}"
                                </p>
                            </div>
                            <div className="space-y-3 md:space-y-4">
                                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400">Genre Terkait</h3>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {detail.tags?.map((t: string) => (
                                        <span key={t} className="px-2.5 py-1 md:px-3 md:py-1.5 bg-zinc-50 border border-zinc-100 text-zinc-500 text-[9px] md:text-[10px] font-black uppercase rounded-lg md:rounded-xl hover:text-purple-600 hover:border-purple-200 transition-all cursor-default">
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
                    <div className="p-5 md:p-8 border-b border-zinc-100 bg-zinc-50/80 backdrop-blur-sm sticky top-0 z-10">
                        <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> Playlist Episode
                        </h3>
                        <p className="text-[9px] md:text-[10px] text-zinc-400 font-bold mt-1">Pilih episode untuk memutar</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-2 gap-2 md:gap-3 pb-10">
                            {episodes.map((ep, i) => {
                                const isActive = i === currentIndex
                                const isWatched = (clickCount[i] || 0) >= 3
                                return (
                                    <button
                                        key={ep.chapterId}
                                        onClick={() => { setIsAdGap(false); handleAction(i) }}
                                        className={`relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300 ${isActive
                                            ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-500/30 scale-95'
                                            : 'bg-white border-zinc-200/60 text-zinc-400 hover:border-purple-300 hover:text-zinc-600'
                                            }`}
                                    >
                                        <span className="text-[8px] md:text-[9px] font-black uppercase opacity-60 leading-none">EP</span>
                                        <span className="text-lg md:text-2xl font-black italic tracking-tighter leading-none">{i + 1}</span>
                                        {isWatched && !isActive && <div className="absolute top-1 right-1 md:top-2 md:right-2 w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500 rounded-full shadow-md" />}
                                        {ep.chargeChapter && !isActive && <Lock className="absolute top-1 right-1 md:top-2 md:right-2 w-2.5 h-2.5 md:w-3 md:h-3 text-orange-400" />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </aside>

            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
            `}</style>
        </article>
    )
}