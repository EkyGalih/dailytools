"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import {
    Lock,
    Flame,
    Info,
    Monitor,
    Smartphone,
    ArrowLeft,
    PlayCircle,
    Star,
    CheckCircle2,
    LayoutGrid,
    Zap,
    Play,
    ChevronRight,
    Activity
} from "lucide-react"

import DramaShareIcons from "@/components/drama/dramabox/DramaShareIcon"

export default function FlickreelsPlayerClient({
    drama,
    episodes,
    initialEpIndex,
}: {
    drama: any
    episodes: any[]
    initialEpIndex: number
}) {
    const [currentIndex, setCurrentIndex] = useState(initialEpIndex)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isVertical, setIsVertical] = useState(true)
    const [streamUrl, setStreamUrl] = useState<string | null>(null)
    const [loadingStream, setLoadingStream] = useState(false)
    const [shareUrl, setShareUrl] = useState("")

    const videoRef = useRef<HTMLVideoElement>(null)
    const activeEp = episodes[currentIndex]

    useEffect(() => {
        setShareUrl(window.location.href)
    }, [])

    const fetchStreamUrl = async (videoId: string) => {
        try {
            setLoadingStream(true)
            const res = await fetch(`/api/flickreels/stream?videoId=${videoId}`)
            const json = await res.json()
            setStreamUrl(json?.url || null)
        } catch (err) {
            setStreamUrl(null)
        } finally {
            setLoadingStream(false)
        }
    }

    useEffect(() => {
        if (isPlaying && activeEp?.raw?.videoUrl) {
            setStreamUrl(activeEp.raw.videoUrl)
        }
    }, [currentIndex, isPlaying, activeEp])

    const handleEpisodeClick = (index: number) => {
        setIsPlaying(true)
        setCurrentIndex(index)
        if (window.innerWidth < 1024) {
            const playerElem = document.getElementById('flickreels-viewport')
            playerElem?.scrollIntoView({ behavior: 'smooth' })
        }
    }

    const safeCover = drama.cover ? `https://wsrv.nl/?url=${encodeURIComponent(drama.cover)}&output=webp&q=80` : null

    return (
        <article className="max-w-[1400px] mx-auto animate-in fade-in duration-700">
            {/* --- MINIMAL BREADCRUMB --- */}
            <nav className="flex items-center gap-2 px-4 py-6 text-[9px] font-black uppercase tracking-widest text-zinc-50">
                <Link href="/drama/china/channel/flickreels" className="hover:text-zinc-100 transition-colors">Library</Link>
                <ChevronRight size={10} />
                <span className="text-zinc-100 truncate max-w-[150px] italic">{drama.title}</span>
            </nav>

            <div className="flex flex-col lg:flex-row gap-6 px-2 md:px-4 pb-20">

                {/* === LEFT CONTENT: PLAYER & INFO === */}
                <div className="flex-1 space-y-6">

                    {/* 1. PLAYER VIEWPORT (ADAPTIVE SIZE) */}
                    <div id="flickreels-viewport" className="relative group rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-black border border-zinc-100 shadow-2xl">
                        {!isPlaying ? (
                            <div className="relative aspect-[16/10] md:aspect-video lg:aspect-[21/9] flex items-center overflow-hidden">
                                <Image src={safeCover || ""} alt="BG" fill className="object-cover blur-xl opacity-30 scale-110" unoptimized />
                                <div className="relative z-10 w-full flex flex-col md:flex-row items-center gap-8 p-8 md:p-12">
                                    <div className="relative w-32 md:w-44 aspect-[3/4.5] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/20 rotate-[-1deg]">
                                        <Image src={safeCover || ""} alt={drama.title} fill className="object-cover" unoptimized referrerPolicy="no-referrer" />
                                    </div>
                                    <div className="flex-1 text-center md:text-left space-y-4">
                                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-600 text-[8px] font-black uppercase tracking-tighter rounded-full text-white">
                                            <Flame size={10} fill="currentColor" /> Trending Now
                                        </div>
                                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-white italic uppercase tracking-tighter leading-[0.9]">
                                            {drama.title}
                                        </h1>
                                        <button
                                            onClick={() => handleEpisodeClick(currentIndex)}
                                            className="inline-flex items-center gap-3 bg-white text-zinc-950 px-8 py-3.5 rounded-full font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl active:scale-95"
                                        >
                                            <PlayCircle size={18} /> Start Episode 1
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className={`relative mx-auto transition-all duration-700 ease-in-out ${isVertical ? "max-w-[380px] aspect-[9/16]" : "w-full aspect-video"}`}>
                                {loadingStream ? (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-zinc-950/90 backdrop-blur-md z-20">
                                        <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
                                        <span className="text-[8px] text-zinc-500 font-black uppercase tracking-[0.4em]">Buffering...</span>
                                    </div>
                                ) : activeEp?.unlock === false ? (
                                    <div className="absolute inset-0 z-30 bg-zinc-950/95 flex flex-col items-center justify-center text-center p-10">
                                        <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4 border border-white/10">
                                            <Lock size={24} className="text-indigo-400" />
                                        </div>
                                        <h3 className="text-white text-sm font-black uppercase tracking-widest italic">Premium Access Required</h3>
                                        <button className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-full text-[9px] font-black uppercase tracking-widest hover:bg-indigo-500 transition-all">Unlock Story</button>
                                    </div>
                                ) : (
                                    <video ref={videoRef} src={streamUrl || ""} controls className="w-full h-full object-contain" playsInline />
                                )}
                            </div>
                        )}
                    </div>

                    {/* 2. METADATA SECTION (COMPACT STYLE) */}
                    <div className="bg-white rounded-[2rem] p-6 md:p-10 border border-zinc-100 shadow-sm overflow-hidden relative">
                        <div className="flex flex-col gap-8">
                            {/* ROW 1: CORE INFO & TOGGLE */}
                            <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 pb-6 border-b border-zinc-50">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex items-center gap-1 px-2 py-0.5 bg-zinc-900 text-white text-[8px] font-black uppercase rounded-md italic">
                                            <Star size={8} fill="currentColor" className="text-amber-400" /> 4.9
                                        </div>
                                        <span className="text-zinc-300 text-[10px]">|</span>
                                        <span className="text-zinc-400 text-[9px] font-black uppercase tracking-widest">{drama.chapterCount} Episode</span>
                                    </div>
                                    <h2 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-950 leading-tight">
                                        {drama.title}
                                    </h2>
                                </div>
                                <button
                                    onClick={() => setIsVertical(!isVertical)}
                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-50 text-zinc-600 border border-zinc-200 rounded-full font-black uppercase text-[8px] tracking-widest hover:bg-white hover:border-indigo-400 transition-all"
                                >
                                    {isVertical ? <Monitor size={14} /> : <Smartphone size={14} />}
                                    {isVertical ? "Cinema" : "Mobile"}
                                </button>
                            </div>

                            {/* ROW 2: SYNOPSIS (FANCY TYPO) */}
                            <div className="space-y-3">
                                <h3 className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em] flex items-center gap-2">
                                    <Activity size={12} className="text-indigo-500" /> Sinopsis
                                </h3>
                                <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed italic border-l-2 border-indigo-50 pl-6 max-w-3xl">
                                    "{drama.description}"
                                </p>
                            </div>

                            {/* ROW 3: SHARE (MINIMAL) */}
                            <div className="pt-6 border-t border-zinc-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                                <div>
                                    <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest italic">{drama.source}</p>
                                </div>
                                <div className="p-2 bg-zinc-50 rounded-2xl border border-zinc-100 w-fit">
                                    <DramaShareIcons title={drama.title} url={shareUrl} />
                                </div>
                            </div>
                        </div>
                        {/* Decorative Background Accent */}
                        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-indigo-500/5 blur-[40px] rounded-full" />
                    </div>
                </div>

                {/* === RIGHT SIDEBAR: COMPACT CHAPTER LIST === */}
                <aside className="w-full lg:w-[350px] shrink-0">
                    <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-xl overflow-hidden sticky top-6">
                        <div className="p-6 border-b border-zinc-50 bg-zinc-50/30 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-zinc-950 text-white rounded-xl flex items-center justify-center shadow-lg">
                                    <LayoutGrid size={16} />
                                </div>
                                <h3 className="text-[10px] font-black uppercase tracking-widest italic">Episode</h3>
                            </div>
                            <div className="text-[8px] font-black text-white bg-indigo-600 px-2 py-1 rounded-md border border-zinc-100">
                                {episodes.length} EPISODE
                            </div>
                        </div>

                        <div className="p-4 max-h-[60vh] lg:max-h-[700px] overflow-y-auto custom-scrollbar bg-white">
                            <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-3 gap-2">
                                {episodes.map((ep: any, i: number) => {
                                    const isActive = i === currentIndex
                                    const isLocked = ep.unlock === false
                                    return (
                                        <button
                                            key={ep.id}
                                            onClick={() => handleEpisodeClick(i)}
                                            className={`group relative aspect-square flex flex-col items-center justify-center rounded-2xl border-2 transition-all duration-300 ${isActive
                                                ? "bg-indigo-600 border-indigo-600 text-white shadow-lg"
                                                : "bg-white border-zinc-50 text-zinc-400 hover:border-indigo-200 hover:text-indigo-600"
                                                }`}
                                        >
                                            <span className={`text-[7px] font-black mb-0.5 ${isActive ? "text-indigo-200" : "text-zinc-200"}`}>EP</span>
                                            <span className="text-lg font-black tracking-tighter">{i + 1}</span>

                                            {isLocked && !isActive && (
                                                <Lock size={8} className="absolute top-1.5 right-1.5 opacity-20" />
                                            )}

                                            {isActive && (
                                                <div className="absolute bottom-1 w-1 h-1 bg-white rounded-full animate-pulse" />
                                            )}
                                        </button>
                                    )
                                })}
                            </div>
                        </div>

                        <div className="p-6 bg-zinc-50/50 border-t border-zinc-100 flex items-center justify-center gap-3">
                            <CheckCircle2 size={14} className="text-emerald-500 shadow-sm" />
                            <span className="text-[8px] font-black uppercase tracking-widest text-zinc-400 italic">Verified Content</span>
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 3px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
            `}</style>
        </article>
    )
}