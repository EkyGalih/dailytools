'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
    Play, Smartphone, Monitor, Star, Calendar,
    ArrowLeft, ChevronLeft, Info
} from 'lucide-react'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'
import DramaShareIcons from '@/components/drama/dramabox/DramaShareIcon'
import { getReelShortEpisode, pickReelShortVideoUrl } from '@/libs/drama/reelshort/reelshort'

export default function UnifiedReelshortView({ detail, id }: { detail: any, id: string }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [clickCount, setClickCount] = useState<Record<number, number>>({})
    const [isVertical, setIsVertical] = useState(true)
    const [isAdGap, setIsAdGap] = useState(false)
    const [videoUrl, setVideoUrl] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    const fetchEpisode = async (epNum: number) => {
        setLoading(true)
        setVideoUrl(null)

        try {
            const episodeData = await getReelShortEpisode(id, epNum)
            if (episodeData) {
                const url = pickReelShortVideoUrl(episodeData)
                setVideoUrl(url || null)
            }
        } catch (err) {
            console.error("Gagal load episode", err)
        } finally {
            setLoading(false)
        }
    }

    const openAd = () => {
        const products = getAffiliateProducts(["DEFAULT"])
        if (products?.length > 0) {
            const random = products[Math.floor(Math.random() * products.length)]
            if (random?.link) window.open(random.link, "_blank")
        }
    }

    const handleAction = async (index: number) => {
        const epNum = index + 1
        if (!isPlaying) setIsPlaying(true)

        if (isAdGap) {
            openAd(); setIsAdGap(false)
            setTimeout(() => videoRef.current?.play(), 500)
            return
        }

        const count = (clickCount[index] || 0) + 1
        setClickCount(prev => ({ ...prev, [index]: count }))

        if (count === 1) {
            openAd()
            setCurrentIndex(index)
            await fetchEpisode(epNum)
            return
        }
        if (count === 2) {
            openAd()
            return
        }
        if (count >= 3 && videoRef.current) {
            videoRef.current.play()
        }
    }

    const handleVideoEnded = () => {
        const nextIndex = currentIndex + 1
        if (nextIndex < detail.totalEpisodes) {
            if ((nextIndex + 1) % 10 === 0) {
                setIsAdGap(true); setCurrentIndex(nextIndex); fetchEpisode(nextIndex + 1)
                setClickCount(prev => ({ ...prev, [nextIndex]: 3 }))
            } else {
                setCurrentIndex(nextIndex); fetchEpisode(nextIndex + 1)
                setClickCount(prev => ({ ...prev, [nextIndex]: 3 }))
            }
        }
    }

    return (
        <article className="bg-white rounded-[2rem] md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100 overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-0">

                {/* LEFT: PLAYER & INFO AREA */}
                <div className="p-5 md:p-10 lg:border-r border-zinc-100 flex flex-col gap-6 md:gap-8">

                    {/* Breadcrumb - Center di mobile */}
                    <nav className="flex items-center justify-center md:justify-start gap-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2">
                        <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                        <ChevronLeft className="w-2.5 h-2.5 flex-shrink-0" />
                        <Link href="/drama/china/channel/reelshort" className="hover:text-purple-600 transition-colors">Reelshort</Link>
                        <ChevronLeft className="w-2.5 h-2.5 flex-shrink-0" />
                        <span className="text-zinc-900 truncate max-w-[120px] md:max-w-[200px]">{detail.title}</span>
                    </nav>

                    {/* 1. PLAYER SECTION */}
                    <div className="w-full">
                        {!isPlaying ? (
                            <div className="grid grid-cols-1 md:grid-cols-[220px_1fr] lg:grid-cols-[250px_1fr] gap-6 md:gap-10 items-center text-center md:text-left">
                                <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] max-w-[200px] md:max-w-none mx-auto w-full overflow-hidden shadow-2xl ring-1 ring-black/5">
                                    <Image src={detail.cover} alt={detail.title} fill className="object-cover" priority />
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                    <h1 className="text-2xl md:text-5xl lg:text-6xl font-black text-zinc-900 italic uppercase tracking-tighter leading-tight md:leading-none">
                                        {detail.title}
                                    </h1>
                                    <button
                                        onClick={() => handleAction(0)}
                                        className="group flex items-center justify-center gap-3 w-full md:w-auto px-8 py-4 md:px-10 md:py-5 bg-purple-600 text-white rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest hover:bg-purple-700 active:scale-95 transition-all shadow-xl shadow-purple-500/20"
                                    >
                                        <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" /> Mulai Menonton
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4 animate-in fade-in duration-500">
                                <div className={`relative bg-black rounded-[1.2rem] md:rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 ${isVertical ? 'max-w-[320px] md:max-w-[360px] mx-auto aspect-[9/16]' : 'w-full aspect-video'}`}>

                                    {loading ? (
                                        <div className="absolute inset-0 flex items-center justify-center text-white font-black uppercase text-[10px] tracking-widest animate-pulse">Loading Source...</div>
                                    ) : videoUrl ? (
                                        <video ref={videoRef} src={videoUrl} controls onEnded={handleVideoEnded} className="w-full h-full object-contain" autoPlay={(clickCount[currentIndex] || 0) >= 3} />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center text-zinc-500 text-[10px] font-black uppercase tracking-widest text-center px-4">
                                            Video Tidak Tersedia atau Sedang Maintenance
                                        </div>
                                    )}

                                    {/* Overlay 3x Klik */}
                                    {(clickCount[currentIndex] || 0) < 3 && !isAdGap && !loading && (
                                        <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-30 bg-zinc-950/90 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                                            <div className="w-14 h-14 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                                                <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" />
                                            </div>
                                            <p className="text-white text-sm md:text-base font-black italic uppercase tracking-tighter leading-none">
                                                Klik untuk Memulai
                                            </p>
                                        </div>
                                    )}

                                    {/* Overlay Ad Gap */}
                                    {isAdGap && (
                                        <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-40 bg-purple-900/95 backdrop-blur-3xl flex flex-col items-center justify-center cursor-pointer text-center p-6">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white text-purple-600 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-2xl font-black text-xl md:text-2xl">10+</div>
                                            <h2 className="text-white text-lg md:text-2xl font-black italic uppercase tracking-tighter leading-tight">Support & Lanjut</h2>
                                            <p className="text-purple-200 text-[10px] md:text-xs mt-2 font-bold uppercase tracking-widest leading-none">Klik untuk Lanjut Episode {currentIndex + 1}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. INFO & ACTIONS */}
                    <div className="space-y-6 md:space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="flex flex-col gap-6 border-b border-zinc-50 pb-6 md:pb-8">
                            {/* Baris 1: Judul & Meta */}
                            <div className="space-y-2 md:space-y-3 text-center md:text-left">
                                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-[8px] md:text-[9px] font-black uppercase rounded-md tracking-widest italic">Popular Reelshort</span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-[10px] font-black text-zinc-900">4.8</span>
                                    </div>
                                </div>
                                <h2 className="text-2xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-tight md:leading-[0.9]">
                                    {detail.title}
                                </h2>
                                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 md:gap-4 text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest font-bold">
                                    <span className="flex items-center gap-1.5"><Play className="w-3 h-3 text-purple-500" /> {detail.totalEpisodes} Episodes</span>
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3 text-purple-500" /> 2026 Updated</span>
                                </div>
                            </div>

                            {/* Baris 2: Actions - Responsive Layout */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-3 pt-5 border-t border-zinc-50/50">

                                {/* GROUP NAVIGASI: Baris 1 di Mobile, Pojok Kanan di Desktop */}
                                <div className="flex items-center gap-2 w-full md:w-auto order-1 md:order-2">
                                    <Link
                                        href="/drama/china/channel/reelshort"
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3.5 md:px-5 md:py-2.5 bg-zinc-100 text-zinc-700 text-[10px] md:text-[11px] font-black uppercase rounded-xl md:rounded-2xl border border-zinc-200/50 shadow-sm active:scale-95 transition-all"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5 text-purple-600" />
                                        <span>Daftar Drama</span>
                                    </Link>

                                    <button
                                        onClick={() => setIsVertical(!isVertical)}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3.5 md:px-5 md:py-2.5 bg-zinc-100 text-zinc-700 text-[10px] md:text-[11px] font-black uppercase rounded-xl md:rounded-2xl border border-zinc-200/50 shadow-sm active:scale-95 transition-all"
                                    >
                                        {isVertical ? <Monitor className="w-3.5 h-3.5 text-purple-600" /> : <Smartphone className="w-3.5 h-3.5 text-purple-600" />}
                                        <span>{isVertical ? 'Mode TV' : 'Mode HP'}</span>
                                    </button>
                                </div>

                                {/* TOMBOL SHARE: Baris 2 di Mobile (Center), Pojok Kiri di Desktop */}
                                <div className="w-full md:w-auto flex justify-center md:justify-start p-2.5 md:p-3 bg-zinc-100 rounded-xl md:rounded-2xl border border-zinc-200/50 shadow-sm order-2 md:order-1 active:scale-[0.98] transition-all">
                                    <DramaShareIcons
                                        title={detail.title}
                                        url={typeof window !== 'undefined' ? window.location.href : ''}
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Sinopsis Justify */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
                            <div className="md:col-span-2 space-y-3 md:space-y-4 text-center md:text-left">
                                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center justify-center md:justify-start gap-2">
                                    <Info className="w-3.5 h-3.5" /> Sinopsis
                                </h3>
                                <p className="text-zinc-600 leading-relaxed font-medium italic text-sm md:text-lg text-justify">
                                    "{detail.description}"
                                </p>
                            </div>
                            <div className="space-y-3 md:space-y-4">
                                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 text-center md:text-left">Genre</h3>
                                <div className="flex flex-wrap justify-center md:justify-start gap-2">
                                    <span className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 text-zinc-400 text-[9px] md:text-[10px] font-black uppercase rounded-lg md:rounded-xl shadow-sm italic font-bold">#ShortDrama</span>
                                    <span className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 text-zinc-400 text-[9px] md:text-[10px] font-black uppercase rounded-lg md:rounded-xl shadow-sm italic font-bold">#Viral</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT/BOTTOM: SCROLLABLE PLAYLIST */}
                <aside className="bg-zinc-50/50 flex flex-col h-full lg:max-h-[900px] border-t lg:border-t-0 lg:border-l border-zinc-100">
                    <div className="p-5 md:p-8 border-b border-zinc-100 bg-zinc-50/80 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between">
                        <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> Playlist Episode
                        </h3>
                        <span className="text-[8px] md:text-[10px] font-black text-zinc-400 italic">{detail.totalEpisodes} EP</span>
                    </div>
                    <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar max-h-[400px] lg:max-h-none">
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-2 gap-2 md:gap-3 pb-10">
                            {Array.from({ length: detail.totalEpisodes }).map((_, i) => {
                                const isActive = i === currentIndex
                                return (
                                    <button
                                        key={i}
                                        onClick={() => { setIsAdGap(false); handleAction(i) }}
                                        className={`relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300 ${isActive
                                            ? 'bg-purple-600 border-purple-600 text-white shadow-lg scale-95 shadow-purple-500/30'
                                            : 'bg-white border-zinc-200/60 text-zinc-400 hover:border-purple-300 active:bg-zinc-50'
                                            }`}
                                    >
                                        <span className="text-[8px] md:text-[9px] font-black uppercase opacity-60 leading-none">EP</span>
                                        <span className="text-lg md:text-2xl font-black italic tracking-tighter leading-none">{i + 1}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </article>
    )
}