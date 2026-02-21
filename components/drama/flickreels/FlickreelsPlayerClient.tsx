"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import dynamic from "next/dynamic"

// Import CSS langsung dari path core plyr biar build Turbopack lancar
import "plyr/dist/plyr.css"

import {
    Lock, Monitor, Smartphone, Star,
    ChevronRight, PlayCircle, ListVideo, History
} from "lucide-react"
import PremiumModal from "@/components/premium/PremiumModal"
import DramaShareIcons from "@/components/drama/dramabox/DramaShareIcon"
import { usePremium } from "@/components/premium/usePremium"

// --- FIX UTAMA: Ambil properti .default secara manual ---
const Plyr = dynamic(
    () =>
        import("plyr-react").then((mod) => mod.Plyr),
    {
        ssr: false,
        loading: () => (
            <div className="aspect-[9/16] max-w-[340px] mx-auto bg-zinc-900 animate-pulse rounded-[2.5rem] flex items-center justify-center">
                <div className="w-10 h-10 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin" />
            </div>
        ),
    }
)

export default function FlickreelsPlayerClient({ drama, episodes = [], initialEpIndex, dramaIdFromParams }: any) {
    const [isMounted, setIsMounted] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(initialEpIndex || 0)
    const [isPlaying, setIsPlaying] = useState(false)
    const [isVertical, setIsVertical] = useState(true)
    const playerRef = useRef<any>(null)

    const { premium, loading: premiumLoading } = usePremium()
    const [showPremiumModal, setShowPremiumModal] = useState(false)
    const FREE_LIMIT = 25

    // --- GUARD CLAUSE: Anti-crash ---
    if (!drama || !episodes || episodes.length === 0) {
        return (
            <div className="min-h-[600px] flex items-center justify-center bg-white rounded-[2.5rem] border border-zinc-100 font-black italic text-zinc-300 uppercase tracking-widest">
                Loading Series Data...
            </div>
        )
    }

    const dramaId = dramaIdFromParams || drama?.title?.replace(/\s+/g, '-').toLowerCase() || 'global'
    const STORAGE_KEY = `flick_v11_plyr_${dramaId}`
    const activeEp = episodes[currentIndex] || episodes[0]
    const videoUrl = activeEp?.raw?.videoUrl || activeEp?.videoUrl || ""
    const safeCover = drama?.cover ? `https://wsrv.nl/?url=${encodeURIComponent(drama.cover)}&output=webp&q=80` : ""

    // 1. Restore Progress & Mount State
    useEffect(() => {
        setIsMounted(true)
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved !== null) {
            const idx = parseInt(saved)
            if (!isNaN(idx) && idx >= 0 && idx < episodes.length) setCurrentIndex(idx)
        }
    }, [STORAGE_KEY, episodes.length])

    // 2. Save Progress
    useEffect(() => {
        if (isMounted && isPlaying) {
            localStorage.setItem(STORAGE_KEY, String(currentIndex))
        }
    }, [currentIndex, isPlaying, isMounted, STORAGE_KEY])

    // --- CONFIG PLYR (ANTI BLOKIR) ---
    const plyrVideoSource: any = {
        type: "video",
        sources: [
            {
                src: videoUrl,
                type: "video/mp4",
                size: 720,
            },
        ],
    }

    useEffect(() => {
        return () => {
            if (playerRef.current?.plyr) {
                playerRef.current.plyr.destroy()
            }
        }
    }, [])

    const plyrOptions = {
        autoplay: true,
        controls: [
            "play-large", "play", "progress", "current-time", "mute", "volume", "fullscreen"
        ],
        ratio: isVertical ? "9:16" : "16:9",
        clickToPlay: true,
        keyboard: { focused: true, global: true },
    }

    // --- HANDLERS ---
    const playNextEpisode = () => {
        const next = currentIndex + 1
        if (next < episodes.length) {
            if (!premium && next >= FREE_LIMIT) {
                setIsPlaying(false)
                setShowPremiumModal(true)
            } else {
                setCurrentIndex(next)
                setIsPlaying(true)
            }
        }
    }

    useEffect(() => {
        if (!isPlaying) return

        const interval = setInterval(() => {
            const player = playerRef.current?.plyr
            if (player) {
                const handleEnded = () => {
                    playNextEpisode()
                }

                player.on("ended", handleEnded)

                clearInterval(interval)
            }
        }, 100)

        return () => clearInterval(interval)
    }, [isPlaying, currentIndex])

    const handleEpisodeClick = (index: number) => {
        if (premiumLoading) return
        if (premium || index < FREE_LIMIT) {
            setCurrentIndex(index)
            setIsPlaying(true)
            if (window.innerWidth < 1024) {
                document.getElementById("flickreels-viewport")?.scrollIntoView({ behavior: "smooth" })
            }
        } else {
            setShowPremiumModal(true)
        }
    }

    if (!isMounted) return null

    return (
        <article className="bg-white rounded-[1.5rem] md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.08)] border border-zinc-100 overflow-hidden max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-[1fr_320px] gap-0">

                {/* --- LEFT: PLAYER AREA --- */}
                <div className="p-4 md:p-8 border-r border-zinc-100 flex flex-col gap-8 text-left">
                    <div id="flickreels-viewport" className="w-full space-y-4">
                        {!isPlaying ? (
                            /* PREVIEW CARD */
                            <div className="relative aspect-video md:aspect-[21/9] rounded-[2rem] overflow-hidden bg-zinc-950 shadow-2xl group">
                                <Image src={safeCover} alt="BG" fill className="object-cover opacity-30 blur-2xl scale-110" />
                                <div className="absolute inset-0 bg-black/40" />
                                <div className="relative z-10 h-full flex flex-col items-center justify-center p-6 text-center">
                                    <div className="relative w-24 md:w-32 aspect-[3/4.5] rounded-2xl overflow-hidden shadow-2xl mb-6 border border-white/20 transform -rotate-2 group-hover:rotate-0 transition-transform">
                                        <Image src={safeCover} alt="poster" fill className="object-cover" unoptimized />
                                    </div>
                                    <button
                                        onClick={() => setIsPlaying(true)}
                                        className="flex items-center gap-3 px-10 py-4 bg-indigo-600 text-white rounded-full text-[11px] font-black uppercase tracking-widest hover:bg-indigo-700 transition-all shadow-xl active:scale-95"
                                    >
                                        <PlayCircle size={18} /> Play Episode {currentIndex + 1}
                                    </button>
                                </div>
                            </div>
                        ) : (
                            /* VIDEO PLAYER WRAPPER */
                            <div className="flex flex-col items-center w-full">
                                <div
                                    className={`relative bg-black rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden shadow-2xl transition-all duration-500 w-full ${isVertical ? 'max-w-[340px]' : ''}`}
                                    // FORCE NO-REFERRER DI LEVEL CONTAINER UNTUK BYPASS BLOKIR CDN
                                    onLoadCapture={(e: any) => {
                                        const videoTag = e.currentTarget.querySelector('video');
                                        if (videoTag) {
                                            videoTag.setAttribute('referrerpolicy', 'no-referrer');
                                        }
                                    }}
                                >
                                    <Plyr
                                        ref={playerRef}
                                        source={plyrVideoSource}
                                        options={plyrOptions}
                                    />
                                </div>
                            </div>
                        )}

                        {/* MODE SWITCHER */}
                        <div className="flex items-center justify-center gap-2 p-1 bg-zinc-50 rounded-2xl border border-zinc-100 w-fit mx-auto relative z-20">
                            <button onClick={() => setIsVertical(true)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${isVertical ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-400 hover:bg-white'}`}>
                                <Smartphone size={14} /> <span className="text-[9px] font-black uppercase">Mobile</span>
                            </button>
                            <button onClick={() => setIsVertical(false)} className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${!isVertical ? 'bg-zinc-900 text-white shadow-md' : 'text-zinc-400 hover:bg-white'}`}>
                                <Monitor size={14} /> <span className="text-[9px] font-black uppercase">Cinema</span>
                            </button>
                        </div>
                    </div>

                    {/* METADATA */}
                    <div className="space-y-6">
                        <div className="space-y-2">
                            <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest italic">
                                <History size={14} /> <span>Now Playing: Eps {currentIndex + 1}</span>
                            </div>
                            <h2 className="text-3xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-none">{drama.title}</h2>
                        </div>
                        <p className="text-zinc-600 leading-relaxed font-medium text-sm md:text-lg italic max-w-4xl border-l-4 border-indigo-100 pl-6">"{drama.description}"</p>
                    </div>
                </div>

                {/* --- RIGHT: PLAYLIST SIDEBAR --- */}
                <aside className="bg-zinc-50/30 flex flex-col h-full lg:max-h-[850px] border-l border-zinc-100">
                    <div className="p-6 border-b border-zinc-100 bg-white/80 backdrop-blur-sm sticky top-0 z-40 flex items-center justify-between text-left">
                        <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2 italic">
                            <ListVideo className="w-4 h-4 text-indigo-600" /> Playlist
                        </h3>
                        <span className="text-[9px] font-black text-zinc-400 uppercase">{episodes.length} Eps</span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 custom-scrollbar bg-white relative z-10">
                        <div className="grid grid-cols-5 sm:grid-cols-8 lg:grid-cols-3 gap-1.5">
                            {episodes.map((ep: any, i: number) => {
                                const isActive = i === currentIndex
                                const isLocked = !premium && i >= FREE_LIMIT
                                return (
                                    <button
                                        key={`ep-plyr-${ep.id}-${i}`}
                                        onClick={() => handleEpisodeClick(i)}
                                        className={`relative flex flex-col items-center justify-center aspect-square rounded-2xl border-2 transition-all duration-300 active:scale-90 ${isActive
                                            ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg z-20 scale-105'
                                            : 'bg-white border-zinc-100 text-zinc-500 hover:border-indigo-300'}`}
                                    >
                                        <span className="text-[14px] font-black italic">{i + 1}</span>
                                        {isLocked && !isActive && (
                                            <div className="absolute top-1 right-1 w-3 h-3 bg-amber-400 rounded-full flex items-center justify-center border-2 border-white shadow-sm">
                                                <Lock size={6} className="text-white" strokeWidth={3} />
                                            </div>
                                        )}
                                    </button>
                                )
                            })}
                        </div>
                    </div>

                    <div className="mt-auto border-t border-zinc-100 p-6 space-y-6 bg-white">
                        {!premium && (
                            <Link href="/pricing" className="flex items-center justify-between w-full bg-zinc-950 text-white px-4 py-3 rounded-xl font-black text-[9px] uppercase hover:bg-indigo-600 transition-all shadow-xl group">
                                JOIN VIP NOW <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        )}
                        <div className="flex justify-center scale-90">
                            <DramaShareIcons title={drama.title} url={typeof window !== 'undefined' ? window.location.href : ''} />
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx global>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #6366f1; }
                .plyr { --plyr-color-main: #6366f1; border-radius: 1.5rem; overflow: hidden; }
                @media (min-width: 768px) { .plyr { border-radius: 2.5rem; } }
            `}</style>

            {showPremiumModal && <PremiumModal onClose={() => setShowPremiumModal(false)} />}
        </article>
    )
}