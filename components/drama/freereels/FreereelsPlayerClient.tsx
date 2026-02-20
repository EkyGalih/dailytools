"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Lock, Flame, Monitor, Smartphone, PlayCircle, Star,
    CheckCircle2, LayoutGrid, ChevronRight, Activity,
    Share2, Info, Play
} from "lucide-react"
import PremiumModal from "@/components/premium/PremiumModal"
import DramaShareIcons from "@/components/drama/dramabox/DramaShareIcon"
import { usePremium } from "@/components/premium/usePremium"

export default function FreereelsPlayerClient({ drama, episodes, initialEpIndex }: any) {
    const [currentIndex, setCurrentIndex] = useState(initialEpIndex)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isVertical, setIsVertical] = useState(true)
    const videoRef = useRef<HTMLVideoElement>(null)

    const { premium, loading: premiumLoading } = usePremium()
    const [showPremiumModal, setShowPremiumModal] = useState(false)
    const FREE_LIMIT = 10

    const activeEp = episodes[currentIndex]
    const safeCover = `https://wsrv.nl/?url=${encodeURIComponent(drama.cover)}&output=webp&q=80`

    const handleEpisodeClick = (index: number) => {
        if (premiumLoading) return;

        if (!premium && index >= FREE_LIMIT) {
            setShowPremiumModal(true)
            return
        }
        setCurrentIndex(index)
        setIsPlaying(true)
        if (window.innerWidth < 1024) {
            document.getElementById("main-viewport")?.scrollIntoView({ behavior: "smooth" })
        }
    }

    return (
        <div className="relative min-h-screen">
            {/* --- DYNAMIC BACKGROUND (BLURRED) --- */}
            <div className="absolute inset-0 h-[500px] overflow-hidden -z-10">
                <Image src={safeCover} alt="bg" fill className="object-cover blur-[100px] opacity-20 scale-150" unoptimized />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#fafafa] to-[#fafafa]" />
            </div>

            <div className="flex flex-col lg:flex-row gap-10">

                {/* === LEFT: MAIN PLAYER AREA === */}
                <div className="flex-1 space-y-8">

                    {/* 1. THE PLAYER CARD */}
                    {/* 1. THE PLAYER CARD */}
                    <div id="main-viewport" className="relative group rounded-[2.5rem] overflow-hidden bg-zinc-950 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] border border-white/10">
                        {!isPlaying ? (
                            <div className="relative w-full aspect-video md:aspect-[21/9] flex items-center justify-center overflow-hidden">
                                {/* Background Blur Halus (Hanya untuk nuansa warna) */}
                                <Image
                                    src={safeCover}
                                    alt="bg-blur"
                                    fill
                                    className="object-cover opacity-20 blur-3xl scale-125"
                                    unoptimized
                                />

                                {/* Gradient Overlay biar teks kebaca */}
                                <div className="absolute inset-0 bg-black/40" />

                                <div className="relative z-10 w-full max-w-4xl px-8 flex flex-col md:flex-row items-center justify-center gap-10">
                                    {/* POSTER UTAMA (Kecil & Proporsional) */}
                                    <div className="relative w-32 md:w-40 aspect-[3/4.5] rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/20 transform -rotate-2 group-hover:rotate-0 transition-transform duration-500">
                                        <Image
                                            src={safeCover}
                                            alt={drama.title}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                            referrerPolicy="no-referrer"
                                        />
                                    </div>

                                    {/* INFO SINGKAT & TOMBOL PLAY */}
                                    <div className="flex flex-col items-center md:items-start text-center md:text-left space-y-4">
                                        <div className="space-y-1">
                                            <h1 className="text-2xl md:text-4xl font-black text-white italic uppercase tracking-tighter leading-tight line-clamp-2">
                                                {drama.title}
                                            </h1>
                                            <div className="flex items-center justify-center md:justify-start gap-3">
                                                <p className="text-rose-500 text-[10px] font-black uppercase tracking-[0.2em] italic">
                                                    Episode {currentIndex + 1}
                                                </p>
                                                <span className="w-1 h-1 bg-zinc-600 rounded-full" />
                                                <p className="text-zinc-400 text-[10px] font-bold uppercase tracking-widest">
                                                    {drama.chapterCount} Total Chapters
                                                </p>
                                            </div>
                                        </div>

                                        <button
                                            onClick={() => setIsPlaying(true)}
                                            className="group/btn relative inline-flex items-center gap-3 bg-white text-black px-8 py-3 rounded-full font-black uppercase text-[10px] tracking-widest hover:bg-rose-600 hover:text-white transition-all active:scale-95 shadow-2xl"
                                        >
                                            <PlayCircle size={20} className="group-hover/btn:scale-110 transition-transform" />
                                            Mulai Menonton
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`mx-auto transition-all duration-700 ${isVertical ? "max-w-[420px] aspect-[9/16]" : "w-full aspect-video"}`}>
                                <video
                                    ref={videoRef}
                                    src={activeEp.videoUrl}
                                    controls
                                    autoPlay
                                    className="w-full h-full object-contain"
                                />
                            </div>
                        )}

                        {/* Floating Controls tetap sama */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2 p-1.5 bg-black/40 backdrop-blur-2xl rounded-2xl border border-white/10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => setIsVertical(true)} className={`p-3 rounded-xl transition-all ${isVertical ? 'bg-white text-black shadow-xl' : 'text-white hover:bg-white/10'}`}>
                                <Smartphone size={18} />
                            </button>
                            <button onClick={() => setIsVertical(false)} className={`p-3 rounded-xl transition-all ${!isVertical ? 'bg-white text-black shadow-xl' : 'text-white hover:bg-white/10'}`}>
                                <Monitor size={18} />
                            </button>
                        </div>
                    </div>

                    {/* 2. SYNOPSIS & INFO CARD */}
                    <div className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] p-8 md:p-12 shadow-sm border border-zinc-100 relative overflow-hidden">
                        <div className="relative z-10 space-y-8">
                            <div className="flex flex-wrap items-center gap-4">
                                <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 text-white text-[10px] font-black rounded-lg uppercase tracking-tighter">
                                    <Star size={10} fill="#fbbf24" className="text-amber-400" /> 4.9 Rating
                                </div>
                                {drama.tags?.map((tag: string) => (
                                    <span key={tag} className="text-[10px] font-bold text-zinc-400 border border-zinc-200 px-3 py-1 rounded-lg uppercase tracking-widest">{tag}</span>
                                ))}
                            </div>

                            <div className="space-y-4">
                                <h2 className="flex items-center gap-3 text-sm font-black uppercase tracking-widest text-zinc-900">
                                    <Info size={16} className="text-rose-600" /> Storyline
                                </h2>
                                <p className="text-zinc-500 text-base md:text-lg leading-relaxed font-medium">
                                    {drama.description}
                                </p>
                            </div>

                            <div className="pt-8 border-t border-zinc-100 flex flex-col sm:flex-row items-center justify-between gap-6">
                                <div className="flex items-center gap-4">
                                    <div className="flex -space-x-3">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-zinc-200 overflow-hidden relative">
                                                <Image src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="user" fill />
                                            </div>
                                        ))}
                                    </div>
                                    <p className="text-xs text-zinc-400 font-bold tracking-tight">
                                        <span className="text-zinc-900 font-black">{drama.hotScore}</span> orang sudah menonton
                                    </p>
                                </div>
                                <div className="flex items-center gap-4">
                                    <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">Share</p>
                                    <div className="h-10 w-[1px] bg-zinc-100" />
                                    <DramaShareIcons title={drama.title} url={window.location.href} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* === RIGHT: SMART SIDEBAR === */}
                <aside className="w-full lg:w-[380px] shrink-0">
                    <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-2xl shadow-zinc-200/50 overflow-hidden sticky top-8">
                        <div className="p-8 border-b border-zinc-50 bg-gradient-to-br from-zinc-50 to-white flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-600/30">
                                    <LayoutGrid size={20} />
                                </div>
                                <div>
                                    <h3 className="font-black uppercase italic text-sm tracking-tighter text-zinc-900 leading-none">Episodes</h3>
                                    <p className="text-[9px] font-bold text-zinc-400 uppercase mt-1">Playlist Full HD</p>
                                </div>
                            </div>
                            <div className="px-3 py-1 bg-zinc-100 rounded-full text-[10px] font-black text-zinc-500">
                                {episodes.length} Total
                            </div>
                        </div>

                        <div className="p-6 max-h-[65vh] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-4 gap-3">
                                {episodes.map((ep: any, i: number) => {
                                    const isActive = i === currentIndex
                                    const isLocked = !premium && i >= FREE_LIMIT
                                    return (
                                        <button
                                            key={ep.id}
                                            onClick={() => handleEpisodeClick(i)}
                                            className={`aspect-square rounded-2xl font-black text-sm relative flex items-center justify-center border-2 transition-all duration-300 ${isActive
                                                ? "bg-rose-600 border-rose-600 text-white shadow-xl shadow-rose-600/20 scale-105 z-10"
                                                : "bg-white border-zinc-100 text-zinc-400 hover:border-rose-200 hover:text-rose-600 active:scale-90"
                                                }`}
                                        >
                                            {isActive ? (
                                                <Activity size={16} className="animate-pulse" />
                                            ) : isLocked ? (
                                                <Lock size={14} className="opacity-30" />
                                            ) : (
                                                i + 1
                                            )}

                                            {isLocked && !isActive && (
                                                <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-amber-400 rounded-full" />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* --- SIDEBAR FOOTER: DYNAMIC BASED ON STATUS --- */}
                        {!premium ? (
                            // TAMPILAN JUALAN (Kalo belum Premium)
                            <div className="p-8 bg-zinc-950 text-white relative overflow-hidden transition-all duration-500">
                                <div className="relative z-10 space-y-3">
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-500 italic">Tamanto Premium</p>
                                    <h4 className="text-xl font-black leading-tight uppercase italic tracking-tighter">Buka Semua Episode HD Tanpa Batas!</h4>
                                    <Link href="/pricing" className="inline-flex items-center gap-2 text-[10px] font-black uppercase bg-white text-black px-5 py-2.5 rounded-xl hover:bg-rose-600 hover:text-white transition-all shadow-lg">
                                        Upgrade Now <ChevronRight size={14} />
                                    </Link>
                                </div>
                                {/* Decorative Blur */}
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-rose-600/20 blur-3xl rounded-full" />
                            </div>
                        ) : (
                            // TAMPILAN STATUS (Kalo udah Premium)
                            <div className="p-8 bg-emerald-950 text-white relative overflow-hidden transition-all duration-500 border-t border-emerald-500/20">
                                <div className="relative z-10 space-y-2">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 italic">Premium Active</p>
                                    </div>
                                    <h4 className="text-lg font-black leading-tight uppercase italic tracking-tighter">Selamat Menikmati Akses VIP Tanpa Batas!</h4>
                                    <p className="text-[9px] text-emerald-100/60 font-medium italic">Token lu berhasil di-lock ke device ini.</p>
                                </div>
                                {/* Decorative Blur Hijau */}
                                <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-emerald-500/20 blur-3xl rounded-full" />
                            </div>
                        )}
                    </div>
                </aside>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #f43f5e; border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            `}</style>

            {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
        </div>
    )
}