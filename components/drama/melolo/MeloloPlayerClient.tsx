"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Play,
    ChevronLeft,
    Lock,
    Flame,
    Info,
    Monitor,
    Smartphone,
    Calendar,
    ArrowLeft,
    PlayCircle,
    Star,
    CheckCircle2,
    Share2,
    LayoutGrid
} from "lucide-react"

import DramaShareIcons from "@/components/drama/dramabox/DramaShareIcon"

export default function MeloloPlayerClient({
    drama,
    initialEpIndex,
}: {
    drama: any
    initialEpIndex: number
}) {
    const [currentIndex, setCurrentIndex] = useState(initialEpIndex)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isVertical, setIsVertical] = useState(true)
    const [streamUrl, setStreamUrl] = useState<string | null>(null)
    const [loadingStream, setLoadingStream] = useState(false)
    const [shareUrl, setShareUrl] = useState("")

    const videoRef = useRef<HTMLVideoElement>(null)
    const episodes = drama.video_list || []
    const activeEp = episodes[currentIndex]

    // Sinkronisasi URL untuk Share
    useEffect(() => {
        setShareUrl(window.location.href)
    }, [])

    const fetchStreamUrl = async (videoId: string) => {
        try {
            setLoadingStream(true)
            const res = await fetch(`/api/melolo/stream?videoId=${videoId}`)
            if (!res.ok) throw new Error("Gagal mengambil stream")
            const json = await res.json()
            setStreamUrl(json?.url || null)
        } catch (err) {
            console.error("Stream error:", err)
            setStreamUrl(null)
        } finally {
            setLoadingStream(false)
        }
    }

    useEffect(() => {
        if (isPlaying && activeEp?.vid) {
            fetchStreamUrl(activeEp.vid)
        }
    }, [currentIndex, isPlaying])

    useEffect(() => {
        if (videoRef.current && streamUrl) {
            videoRef.current.load()
            videoRef.current.play().catch(() => { })
        }
    }, [streamUrl])

    const handleEpisodeClick = (index: number) => {
        if (!isPlaying) setIsPlaying(true)
        setCurrentIndex(index)
        if (window.innerWidth < 1024) {
            window.scrollTo({ top: 0, behavior: "smooth" })
        }
    }

    const rawCover = drama.series_cover || drama.cover_series;
    const safeCover = rawCover ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80` : null;

    return (
        <article className="max-w-[1600px] mx-auto overflow-hidden">
            {/* --- TOP NAVIGATION BREADCRUMB --- */}
            <nav className="flex items-center gap-3 px-6 py-6 text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                <Link href="/drama/china/channel/melolo" className="hover:text-rose-600 transition-colors flex items-center gap-2">
                    <ArrowLeft size={14} /> Melolo Library
                </Link>
                <span className="text-zinc-200">/</span>
                <span className="text-zinc-100 truncate max-w-[200px]">{drama.series_title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-8 px-4 md:px-6 pb-20">

                {/* === MAIN SECTION (Player & Info) === */}
                <div className="flex-1 space-y-8">

                    {/* 1. PLAYER VIEWPORT */}
                    <div className="relative group shadow-2xl shadow-rose-500/5 rounded-[2.5rem] overflow-hidden bg-zinc-950 border border-zinc-100">
                        {!isPlaying ? (
                            /* Hero Preview Mode */
                            <div className="relative aspect-video lg:aspect-[21/9] flex items-center overflow-hidden">
                                <Image
                                    src={safeCover || ""}
                                    alt="Background"
                                    fill
                                    className="object-cover blur-2xl opacity-30 scale-110"
                                    referrerPolicy="no-referrer"
                                />
                                <div className="relative z-10 w-full grid grid-cols-1 md:grid-cols-[200px_1fr] gap-8 p-8 md:p-16 items-center">
                                    <div className="relative aspect-[3/4] rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/20 hidden md:block">
                                        <Image src={safeCover || ""} alt={drama.series_title} fill className="object-cover" referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="space-y-6">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-500 text-white text-[9px] font-black uppercase tracking-tighter rounded-md italic">
                                            <Flame size={10} fill="currentColor" /> Trending Series
                                        </div>
                                        <h1 className="text-4xl md:text-7xl font-black text-white italic uppercase tracking-tighter leading-[0.85] drop-shadow-lg">
                                            {drama.series_title}
                                        </h1>
                                        <button
                                            onClick={() => handleEpisodeClick(currentIndex)}
                                            className="group flex items-center gap-4 bg-white text-zinc-900 px-8 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-rose-600 hover:text-white transition-all duration-500 shadow-xl"
                                        >
                                            <PlayCircle className="w-6 h-6" /> Mulai Menonton
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* Active Player View */
                            <div className={`relative transition-all duration-1000 ease-in-out ${isVertical ? "max-w-[400px] mx-auto aspect-[9/16]" : "w-full aspect-video"}`}>
                                {loadingStream ? (
                                    <div className="absolute inset-0 flex items-center justify-center bg-zinc-950/80 backdrop-blur-xl z-20">
                                        <div className="flex flex-col items-center gap-4">
                                            <div className="w-10 h-10 border-2 border-rose-500 border-t-transparent rounded-full animate-spin" />
                                            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">Loading Stream</span>
                                        </div>
                                    </div>
                                ) : activeEp?.disable_play ? (
                                    <div className="absolute inset-0 z-30 bg-zinc-950 flex flex-col items-center justify-center text-center p-10">
                                        <Lock size={40} className="text-rose-500 mb-4 opacity-50" />
                                        <h3 className="text-white text-lg font-black italic uppercase">Episode Terkunci</h3>
                                        <button className="mt-6 px-6 py-3 bg-zinc-800 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-zinc-700 transition-all">Unlock Premium</button>
                                    </div>
                                ) : (
                                    <video ref={videoRef} src={streamUrl || ""} controls className="w-full h-full object-contain" />
                                )}
                            </div>
                        )}
                    </div>

                    {/* 2. METADATA & ACTIONS */}
                    <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-zinc-100 shadow-sm transition-all duration-500">
                        <div className="flex flex-col gap-10">

                            {/* BARIS 1: JUDUL & MODE TOGGLE */}
                            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-zinc-50">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="flex items-center gap-1.5 px-3 py-1 bg-zinc-900 text-white text-[9px] font-black uppercase rounded-lg italic">
                                            <Star size={10} fill="currentColor" className="text-amber-400" /> 4.9 Rating
                                        </span>
                                        <span className="text-zinc-300 font-bold">|</span>
                                        <span className="text-zinc-400 text-[10px] font-black uppercase tracking-widest italic">{drama.episode_cnt} Full Chapters</span>
                                    </div>
                                    <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-zinc-900 leading-[0.85]">
                                        {drama.series_title}
                                    </h2>
                                </div>

                                <button
                                    onClick={() => setIsVertical(!isVertical)}
                                    className="flex items-center justify-center gap-3 px-8 py-4 bg-zinc-50 text-zinc-900 border border-zinc-200 rounded-2xl font-black uppercase text-[10px] tracking-widest hover:border-rose-300 hover:bg-white transition-all shadow-sm active:scale-95"
                                >
                                    {isVertical ? <Monitor size={16} className="text-rose-500" /> : <Smartphone size={16} className="text-rose-500" />}
                                    {isVertical ? "Cinema View" : "Vertical View"}
                                </button>
                            </div>

                            {/* BARIS 2: SYNOPSIS (FULL WIDTH) */}
                            <div className="space-y-4">
                                <h3 className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.2em] flex items-center gap-2">
                                    <Info size={14} className="text-rose-500" /> Sinopsis Cerita
                                </h3>
                                <p className="text-zinc-500 text-base md:text-xl font-medium leading-relaxed italic max-w-none border-l-4 border-rose-50 pl-6 text-justify">
                                    "{drama.series_intro}"
                                </p>
                            </div>

                            {/* BARIS 3: SHARE & SOCIAL (FULL WIDTH) */}
                            <div className="pt-8 border-t border-zinc-50">
                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-black text-zinc-900 uppercase tracking-widest">Bagikan Drama Ini</p>
                                        <p className="text-[9px] font-bold text-zinc-400 uppercase italic">Ajak temanmu menonton keseruan ini</p>
                                    </div>
                                    <div className="flex justify-center md:justify-end bg-zinc-50/50 p-4 rounded-2xl border border-zinc-100">
                                        <DramaShareIcons title={drama.series_title} url={shareUrl} />
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* === SIDEBAR (Episode List) === */}
                <aside className="w-full lg:w-[400px]">
                    <div className="bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm overflow-hidden sticky top-8">
                        <div className="p-8 border-b border-zinc-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <LayoutGrid size={18} className="text-rose-500" />
                                <h3 className="text-xs font-black uppercase tracking-widest italic text-zinc-900">Chapters</h3>
                            </div>
                            <span className="text-[10px] font-black text-zinc-300 italic uppercase">Season 1</span>
                        </div>

                        <div className="p-6 max-h-[800px] overflow-y-auto custom-scrollbar">
                            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-3 gap-3">
                                {episodes.map((ep: any, i: number) => {
                                    const isActive = i === currentIndex
                                    return (
                                        <button
                                            key={ep.vid}
                                            onClick={() => handleEpisodeClick(i)}
                                            className={`group relative aspect-square flex flex-col items-center justify-center rounded-2xl border transition-all duration-500 ${isActive
                                                ? "bg-zinc-900 border-zinc-900 text-white shadow-xl shadow-zinc-200 scale-95"
                                                : "bg-white border-zinc-100 text-zinc-400 hover:border-rose-400 hover:text-rose-600"
                                                }`}
                                        >
                                            <span className={`text-[8px] font-black uppercase mb-0.5 ${isActive ? "text-zinc-500" : "text-zinc-200"}`}>CH</span>
                                            <span className="text-xl font-black italic tracking-tighter">{ep.vid_index}</span>
                                            {ep.disable_play && !isActive && <Lock size={10} className="absolute top-2 right-2 opacity-30" />}
                                            {isActive && <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full border-2 border-white animate-pulse" />}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        {/* Status Footer Sidebar */}
                        <div className="p-8 bg-zinc-50 border-t border-zinc-100">
                            <div className="flex items-center gap-3 text-zinc-400">
                                <CheckCircle2 size={16} className="text-emerald-500" />
                                <span className="text-[9px] font-black uppercase tracking-widest italic">Konten Terverifikasi</span>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 20px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            `}</style>
        </article>
    )
}