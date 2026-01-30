"use client"

import { useState, useRef } from "react"
import { getEpisodeResolutions } from "@/libs/drama/drakor/drama"
import { getAffiliateProducts } from "@/libs/ads/getAffiliateProducts"

export default function EpisodePlayer({ episodes }: { episodes: any[] }) {
    const [active, setActive] = useState<any>(null)
    const [loading, setLoading] = useState(false)
    const [selectedResolution, setSelectedResolution] = useState<any>(null)
    const [clickCount, setClickCount] = useState<Record<string, number>>({})
    const videoRef = useRef<HTMLVideoElement>(null)

    const openAd = () => {
        const products = getAffiliateProducts(["DEFAULT"])
        if (products?.length > 0) {
            const random = products[Math.floor(Math.random() * products.length)]
            if (random?.link) window.open(random.link, "_blank")
        }
    }

    async function handleEpisodeClick(ep: any) {
        const currentCount = (clickCount[ep.episode_id] || 0) + 1

        if (currentCount === 1) {
            setClickCount(prev => ({ ...prev, [ep.episode_id]: 1 }))
            openAd()
            if (active?.episode_id !== ep.episode_id) {
                setLoading(true)
                const data = await getEpisodeResolutions(ep.episode_id, ep.tag)
                if (data?.resolutions?.length > 0) {
                    setActive(data)
                    setSelectedResolution(data.resolutions[0])
                }
                setLoading(false)
            }
            return
        }

        if (currentCount === 2) {
            setClickCount(prev => ({ ...prev, [ep.episode_id]: 2 }))
            openAd()
            return
        }

        if (currentCount >= 3) {
            setClickCount(prev => ({ ...prev, [ep.episode_id]: 3 }))
            if (videoRef.current) {
                videoRef.current.play().catch(() => console.log("Play interrupted"))
            }
        }
    }

    return (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 bg-zinc-950/50 p-2 md:p-4 rounded-3xl border border-white/5">

            {/* ========================================== */}
            {/* LEFT: VIDEO PLAYER (Col Span 3) */}
            {/* ========================================== */}
            <div className="lg:col-span-3 space-y-4">
                <div className="relative aspect-video bg-black rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                    {active ? (
                        <>
                            <video
                                ref={videoRef}
                                controls
                                key={selectedResolution?.src}
                                className="w-full h-full"
                                src={selectedResolution?.src}
                            />

                            {/* Overlay 3x Click */}
                            {(clickCount[active.episode_id] || 0) < 3 && (
                                <div
                                    onClick={() => handleEpisodeClick(active)}
                                    className="absolute inset-0 bg-zinc-900/80 backdrop-blur-md flex flex-col items-center justify-center cursor-pointer z-20 transition-all hover:bg-zinc-900/70"
                                >
                                    <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(147,51,234,0.5)] mb-4 animate-pulse">
                                        <svg fill="white" viewBox="0 0 24 24" className="w-10 h-10 ml-1"><path d="M8 5v14l11-7z" /></svg>
                                    </div>
                                    <p className="text-white font-bold tracking-widest text-lg uppercase">
                                        Klik Untuk Memulai
                                    </p>
                                    <p className="text-zinc-400 text-[10px] md:text-sm mt-1 md:mt-2 font-medium leading-relaxed px-6">
                                        Support kami dengan{" "}
                                        <a
                                            href="https://trakteer.id/god_suru/showcase?menu=open"
                                            target="_blank"
                                            className="text-purple-400 hover:text-purple-300 underline decoration-purple-400/30 underline-offset-2 transition-colors"
                                        >
                                            traktir kopi
                                        </a>
                                        , agar server tetap hidup.
                                    </p>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-zinc-500 space-y-3">
                            <div className="w-16 h-16 rounded-2xl border-2 border-dashed border-zinc-700 flex items-center justify-center">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                            </div>
                            <p className="font-medium">Pilih episode untuk mulai menonton</p>
                        </div>
                    )}

                    {loading && (
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-30">
                            <div className="flex flex-col items-center space-y-3">
                                <div className="w-10 h-10 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                <p className="text-purple-400 font-bold text-sm tracking-widest animate-pulse">MEMUAT VIDEO...</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Controls Bar */}
                {active && (
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-zinc-900/80 border border-white/5 rounded-2xl backdrop-blur-xl">
                        <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-zinc-500 uppercase tracking-tighter">Resolusi:</span>
                            <div className="flex flex-wrap gap-2">
                                {active.resolutions.map((r: any) => (
                                    <button
                                        key={r.resolution}
                                        onClick={() => setSelectedResolution(r)}
                                        className={`px-3 py-1.5 rounded-lg text-[10px] font-black transition-all ${selectedResolution?.resolution === r.resolution
                                            ? "bg-purple-600 text-white ring-2 ring-purple-400/50 shadow-lg shadow-purple-500/40"
                                            : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"
                                            }`}
                                    >
                                        {r.resolution}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {selectedResolution?.src && (
                            <a
                                href={selectedResolution.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-2 rounded-xl bg-zinc-100 text-black text-xs font-black hover:bg-green-500 hover:text-white transition-all shadow-lg active:scale-95"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                                DOWNLOAD {selectedResolution.resolution}
                            </a>
                        )}
                    </div>
                )}
            </div>

            {/* ========================================== */}
            {/* RIGHT: EPISODE LIST (Col Span 1) */}
            {/* ========================================== */}
            <div className="lg:col-span-1 flex flex-col h-full max-h-[500px] lg:max-h-none">
                <div className="flex items-center justify-between mb-4 px-2">
                    <h3 className="text-sm font-black uppercase tracking-widest text-white flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-ping"></span>
                        Daftar Episode
                    </h3>
                    <span className="text-[10px] bg-zinc-800 px-2 py-1 rounded-md text-zinc-500 font-bold">{episodes.length} EP</span>
                </div>

                <div className="flex-1 overflow-y-auto space-y-2 pr-2 custom-scrollbar">
                    {episodes.map((ep) => {
                        const isActive = active?.episode_id === ep.episode_id;
                        const count = clickCount[ep.episode_id] || 0;

                        return (
                            <button
                                key={ep.episode_id}
                                onClick={() => handleEpisodeClick(ep)}
                                className={`w-full group flex items-center justify-between p-3 rounded-xl border transition-all duration-300 ${isActive
                                    ? "bg-purple-600/10 border-purple-500/50 shadow-[inset_0_0_20px_rgba(147,51,234,0.1)]"
                                    : "bg-zinc-900/40 border-white/5 hover:border-white/20 hover:bg-zinc-800/60"
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-black transition-colors ${isActive ? "bg-purple-600 text-white" : "bg-zinc-800 text-zinc-500 group-hover:bg-zinc-700"
                                        }`}>
                                        {ep.title}
                                    </div>
                                    <div className="text-left">
                                        <p className={`text-xs font-bold transition-colors ${isActive ? "text-purple-400" : "text-zinc-300 group-hover:text-white"}`}>
                                            Episode {ep.title}
                                        </p>
                                        <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-tighter">Subtitle Indonesia</p>
                                    </div>
                                </div>

                                {isActive && (
                                    <div className="flex gap-1">
                                        <span className="w-1 h-3 bg-purple-500 animate-[bounce_1s_infinite_100ms] rounded-full"></span>
                                        <span className="w-1 h-3 bg-purple-500 animate-[bounce_1s_infinite_300ms] rounded-full"></span>
                                        <span className="w-1 h-3 bg-purple-500 animate-[bounce_1s_infinite_500ms] rounded-full"></span>
                                    </div>
                                )}

                                {!isActive && count > 0 && count < 3 && (
                                    <span className="text-[9px] bg-zinc-700 text-zinc-300 px-1.5 py-0.5 rounded font-black">
                                        {count}/3
                                    </span>
                                )}
                            </button>
                        )
                    })}
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #27272a;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #3f3f46;
                }
            `}</style>
        </div>
    )
}