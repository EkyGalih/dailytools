"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Lock, Flame, Monitor, Smartphone, PlayCircle, Star,
    CheckCircle2, LayoutGrid, ChevronRight, Activity,
    Share2, Info, Play, ListVideo, Sparkles, History
} from "lucide-react"
import PremiumModal from "@/components/premium/PremiumModal"
import DramaShareIcons from "@/components/drama/dramabox/DramaShareIcon"
import { usePremium } from "@/components/premium/usePremium"

export default function NetshortPlayerClient({ drama, episodes, initialEpIndex }: any) {
    const [isMounted, setIsMounted] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(initialEpIndex)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isVertical, setIsVertical] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const { premium, loading: premiumLoading } = usePremium()
    const [showPremiumModal, setShowPremiumModal] = useState(false)
    const FREE_LIMIT = 10

    const getProgressKey = (id: string | number) => `netshort_v1_progress_${id}`
    const activeEp = episodes[currentIndex]
    const safeCover = `https://wsrv.nl/?url=${encodeURIComponent(drama.cover)}&output=webp&q=80`
    const activeSub = activeEp?.subtitleList?.find((s: any) => s.subtitleLanguage === "id_ID") || activeEp?.subtitleList?.[0]

    useEffect(() => {
        setIsMounted(true)
        if (!drama?.id) return
        const saved = localStorage.getItem(getProgressKey(drama.id))
        if (saved !== null) {
            const lastIdx = parseInt(saved)
            if (!isNaN(lastIdx) && lastIdx >= 0 && lastIdx < episodes.length) {
                setCurrentIndex(lastIdx)
            }
        }
    }, [drama.id, episodes.length])

    useEffect(() => {
        if (!isMounted) return
        if (isPlaying) {
            localStorage.setItem(getProgressKey(drama.id), String(currentIndex))
            if (videoRef.current) {
                videoRef.current.load()
                videoRef.current.play().catch(() => { })
            }
        }
    }, [currentIndex, isPlaying, drama.id, isMounted])

    const playNextEpisode = () => {
        const nextIndex = currentIndex + 1
        if (nextIndex < episodes.length) {
            if (!premium && nextIndex >= FREE_LIMIT) {
                setIsPlaying(false)
                setShowPremiumModal(true)
                return
            }
            setCurrentIndex(nextIndex)
            setIsPlaying(true)
        }
    }

    const handleEpisodeClick = (index: number) => {
        if (premiumLoading) return
        if (premium || index < FREE_LIMIT) {
            setCurrentIndex(index)
            setIsPlaying(true)
            if (window.innerWidth < 1024) {
                document.getElementById("main-viewport")?.scrollIntoView({ behavior: "smooth" })
            }
            return
        }
        setShowPremiumModal(true)
    }

    if (!isMounted) return <div className="min-h-screen bg-[#fafafa]" />

    return (
        <article className="bg-white rounded-[1.5rem] md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100 overflow-hidden max-w-7xl mx-auto mb-5">
            <div className="grid lg:grid-cols-[1fr_320px] gap-0">

                {/* === LEFT COLUMN: PLAYER & INFO AREA === */}
                <div className="p-4 md:p-8 border-r border-zinc-100 flex flex-col gap-6">

                    {/* 1. THE PLAYER AREA */}
                    <div className="space-y-4">
                        <div id="main-viewport" className="w-full">
                            {!isPlaying ? (
                                <div className="relative aspect-video md:aspect-[21/9] rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-950 shadow-2xl">
                                    <Image src={safeCover} alt="bg" fill className="object-cover opacity-30 blur-xl scale-110" />
                                    <div className="absolute inset-0 bg-black/40" />
                                    <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                                        <div className="relative w-20 md:w-28 aspect-[3/4.5] rounded-2xl overflow-hidden shadow-2xl mb-4 border border-white/20">
                                            <Image src={safeCover} alt="poster" fill className="object-cover" unoptimized />
                                        </div>
                                        <button
                                            onClick={() => setIsPlaying(true)}
                                            className="flex items-center gap-3 px-8 py-3 bg-rose-600 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-rose-700 transition-all active:scale-95 shadow-xl shadow-rose-500/30"
                                        >
                                            <Play className="w-4 h-4 fill-current" /> Lanjutkan Episode {currentIndex + 1}
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <div className={`relative bg-black rounded-[1.2rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-700 ${isVertical ? 'max-w-[340px] mx-auto aspect-[9/16]' : 'w-full aspect-video'}`}>
                                    <video
                                        key={activeEp.id}
                                        ref={videoRef}
                                        src={activeEp.videoUrl}
                                        controls
                                        autoPlay
                                        onEnded={playNextEpisode}
                                        crossOrigin="anonymous"
                                        className="w-full h-full object-contain"
                                    >
                                        {activeSub && <track src={activeSub.url} kind="subtitles" srcLang="id" label="Indonesia" default />}
                                    </video>
                                </div>
                            )}
                        </div>

                        {/* MODE SWITCHER: ALWAYS BELOW PLAYER */}
                        <div className="flex items-center justify-center gap-2 p-1 bg-zinc-50 rounded-2xl border border-zinc-100 w-fit mx-auto">
                            <button onClick={() => setIsVertical(true)} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${isVertical ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-400 hover:bg-white'}`}>
                                <Smartphone size={14} />
                                <span className="text-[9px] font-black uppercase tracking-tighter">Mobile</span>
                            </button>
                            <button onClick={() => setIsVertical(false)} className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${!isVertical ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-400 hover:bg-white'}`}>
                                <Monitor size={14} />
                                <span className="text-[9px] font-black uppercase tracking-tighter">Wide</span>
                            </button>
                        </div>
                    </div>

                    {/* 2. SYNOPSIS & METADATA */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <History size={14} className="text-rose-600" />
                                <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                    History: Chapter {currentIndex + 1}
                                </span>
                            </div>
                            <h2 className="text-2xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-tight">
                                {drama.title}
                            </h2>
                        </div>

                        <div className="w-full space-y-6">
                            <div className="flex items-center gap-3">
                                <div className="px-3 py-1 bg-rose-50 text-rose-600 text-[10px] font-black rounded-lg uppercase italic border border-rose-100">
                                    HOT {drama.hotScore}
                                </div>
                                <div className="flex items-center gap-1 text-yellow-500">
                                    <Star className="w-3.5 h-3.5 fill-current" />
                                    <span className="text-xs font-black text-zinc-900">4.9 Rating</span>
                                </div>
                            </div>
                            <div className="space-y-3">
                                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <Info className="w-3.5 h-3.5" /> Storyline
                                </h3>
                                <p className="text-zinc-600 leading-relaxed font-medium text-sm md:text-lg italic max-w-none">
                                    "{drama.description}"
                                </p>
                            </div>

                            {/* Tags Lebar Penuh */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {drama.tags?.map((t: string) => (
                                    <span key={t} className="px-3 py-1 bg-zinc-50 border border-zinc-100 text-zinc-500 text-[10px] font-black uppercase rounded-xl">
                                        #{t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* === RIGHT COLUMN: COMPACT PLAYLIST SIDEBAR === */}
                <aside className="bg-zinc-50/30 flex flex-col h-full lg:max-h-[850px] border-l border-zinc-100">
                    <div className="p-6 border-b border-zinc-100 bg-white/80 backdrop-blur-sm sticky top-0 z-10 flex items-center justify-between">
                        <div>
                            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-900 flex items-center gap-2 leading-none">
                                <ListVideo className="w-4 h-4 text-rose-600" /> Episodes
                            </h3>
                        </div>
                        <span className="text-[9px] font-black text-zinc-400 bg-zinc-50 px-2 py-1 rounded-lg border border-zinc-100 uppercase">
                            {episodes.length} Total
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-white">
                        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-3 gap-1.5">
                            {episodes.map((ep, i) => {
                                const isActive = i === currentIndex
                                const isLocked = premium ? false : (i >= FREE_LIMIT)
                                return (
                                    <button
                                        key={ep.id}
                                        onClick={() => handleEpisodeClick(i)}
                                        className={`relative flex flex-col items-center justify-center aspect-square rounded-xl border transition-all duration-300 active:scale-90 ${isActive
                                            ? 'bg-rose-600 border-rose-600 text-white shadow-lg'
                                            : 'bg-white border-zinc-100 text-zinc-500 hover:border-rose-200'
                                            }`}
                                    >
                                        <span className="text-[14px] md:text-[15px] font-black italic tracking-tighter">{i + 1}</span>
                                        {isLocked && !isActive && (
                                            <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-amber-400 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                <Lock size={6} className="text-white" strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    {/* Premium Sidebar Promo (Hanya jika belum premium) */}
                    {!premium && (
                        <div className="p-6 bg-zinc-950 text-white relative overflow-hidden">
                            <div className="relative z-10 space-y-3">
                                <div className="flex items-center gap-2">
                                    <Sparkles size={12} className="text-rose-500 fill-rose-500" />
                                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Join VIP</p>
                                </div>
                                <h4 className="text-[10px] font-black uppercase italic tracking-tighter leading-tight">Unlock all {episodes.length} premium chapters.</h4>
                                <Link href="/pricing" className="flex items-center justify-center w-full bg-white text-zinc-900 py-2.5 rounded-xl font-black text-[9px] uppercase hover:bg-rose-600 hover:text-white transition-all shadow-md">
                                    Upgrade Now
                                </Link>
                            </div>
                            <div className="absolute -right-6 -bottom-6 w-24 h-24 bg-rose-600/10 blur-3xl rounded-full" />
                        </div>
                    )}

                    {/* Share Box AT SIDEBAR BOTTOM */}
                    <div className="p-6 bg-zinc-50 border-t border-zinc-100 space-y-4">
                        <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-400 text-center">Share This Series</h3>
                        <div className="flex justify-center scale-90 md:scale-100">
                            <DramaShareIcons title={drama.title} url={typeof window !== 'undefined' ? window.location.href : ''} />
                        </div>
                    </div>
                </aside>

            </div>

            <style jsx global>{`
                video::cue { background: rgba(0,0,0,0.7); color: white; font-weight: bold; font-size: 14px; text-shadow: 2px 2px 4px rgba(0,0,0,0.8); }
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #f43f5e; }
            `}</style>

            {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
        </article>
    )
}