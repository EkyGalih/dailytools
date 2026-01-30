"use client"

import { useEffect, useRef, useState } from "react"
import "plyr/dist/plyr.css"
import Hls from "hls.js"
import { getAffiliateProducts } from "@/libs/ads/getAffiliateProducts"
import { getEpisodeResolutions } from "@/libs/drama/drakor/drama"

export default function WatchPlayer({
    episodes,
    genres,
}: {
    episodes: any[]
    genres: string
}) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const playerRef = useRef<any>(null)
    const hlsRef = useRef<Hls | null>(null)

    const [activeEpisode, setActiveEpisode] = useState(episodes[0])
    const [activeSource, setActiveSource] = useState(
        episodes[0]?.resolutions[0]
    )

    const [clickCount, setClickCount] = useState(0)
    const [unlocked, setUnlocked] = useState(false)

    const affiliateProducts = getAffiliateProducts([genres])

    // ===============================
    // CLEANUP FUNCTION
    // ===============================
    const cleanup = () => {
        if (playerRef.current) {
            playerRef.current.destroy()
            playerRef.current = null
        }

        if (hlsRef.current) {
            hlsRef.current.destroy()
            hlsRef.current = null
        }

        if (videoRef.current) {
            videoRef.current.pause()
            videoRef.current.removeAttribute("src")
            videoRef.current.load()
        }
    }

    useEffect(() => {
        if (episodes?.length > 0) {
            setActiveEpisode(episodes[0])
            setActiveSource(episodes[0]?.resolutions?.[0] ?? null)
        }
    }, [])

    // ===============================
    // INIT PLAYER ONLY WHEN UNLOCKED
    // ===============================
    useEffect(() => {
        const init = async () => {
            if (!unlocked || !videoRef.current || !activeSource?.src) return

            cleanup()

            const video = videoRef.current
            const Plyr = (await import("plyr")).default

            // ✅ Setup Source Only (NO autoplay here)
            if (Hls.isSupported() && activeSource.src.includes(".m3u8")) {
                const hls = new Hls({
                    enableWorker: true,
                    lowLatencyMode: true,
                })

                hls.loadSource(activeSource.src)
                hls.attachMedia(video)
                hlsRef.current = hls
            } else {
                video.src = activeSource.src
            }

            // ✅ Init Plyr (autoplay false!)
            playerRef.current = new Plyr(video, {
                autoplay: false,
                controls: [
                    "play-large",
                    "play",
                    "progress",
                    "current-time",
                    "mute",
                    "volume",
                    "settings",
                    "fullscreen",
                ],
            })
        }

        init()

        return () => cleanup()
    }, [unlocked, activeSource])

    // ===============================
    // SPONSOR CLICK HANDLER
    // ===============================
    const handleSponsorGate = async () => {
        // Klik 1–2 = affiliate popup
        if (clickCount < 2) {
            const product =
                affiliateProducts[clickCount % affiliateProducts.length]

            if (product?.link) window.open(product.link, "_blank")

            setClickCount((prev) => prev + 1)
            return
        }

        // ===============================
        // ✅ Klik ke-3 → Load Video
        // ===============================

        // Kalau episode belum punya resolutions → fetch dulu
        if (activeEpisode.resolutions.length === 0) {
            const res = await getEpisodeResolutions(
                activeEpisode.episode_id,
                activeEpisode.tag
            )

            if (res?.resolutions?.length > 0) {
                // inject resolutions ke activeEpisode
                const updatedEpisode = {
                    ...activeEpisode,
                    resolutions: res.resolutions,
                }

                setActiveEpisode(updatedEpisode)

                // set source pertama
                setActiveSource(res.resolutions[0])
            } else {
                alert("Video source gagal dimuat")
                return
            }
        }

        // ===============================
        // ✅ Unlock Player Setelah Source Ready
        // ===============================
        setUnlocked(true)

        // Play setelah Plyr siap
        setTimeout(() => {
            playerRef.current?.play().catch(() => { })
        }, 400)
    }

    // ===============================
    // CHANGE EPISODE
    // ===============================
    const changeEpisode = (ep: any) => {
        cleanup()

        setUnlocked(false)
        setClickCount(0)

        setActiveEpisode(ep)

        // ❌ Jangan setActiveSource kalau resolutions belum ada
        if (ep.resolutions.length > 0) {
            setActiveSource(ep.resolutions[0])
        } else {
            setActiveSource(null)
        }
    }

    return (
        <div className="grid grid-cols-12 gap-8 mt-10">
            {/* =============================== */}
            {/* VIDEO PLAYER */}
            {/* =============================== */}
            <div className="col-span-12 md:col-span-8 space-y-5">
                <div
                    key={activeSource.src}
                    className="relative rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-black aspect-video flex items-center justify-center"
                >
                    <video
                        ref={videoRef}
                        playsInline
                        className="w-full h-full"
                    />

                    {/* Sponsor Gate */}
                    {!unlocked && (
                        <div
                            className="absolute inset-0 z-[60] flex flex-col items-center justify-center bg-zinc-900/95 backdrop-blur-md cursor-pointer"
                            onClick={handleSponsorGate}
                        >
                            <div className="w-20 h-20 rounded-full bg-purple-600 flex items-center justify-center shadow-[0_0_50px_rgba(147,51,234,0.5)] hover:scale-110 transition-transform duration-300">
                                <span className="text-white text-4xl ml-1">▶</span>
                            </div>

                            <p className="mt-6 text-white font-bold text-lg tracking-wide">
                                {clickCount < 2
                                    ? "KLIK UNTUK MEMUTAR"
                                    : "KLIK UNTUK MEMULAI"}
                            </p>

                            <div className="flex gap-1 mt-3">
                                {[0, 1, 2].map((i) => (
                                    <div
                                        key={i}
                                        className={`h-1.5 w-8 rounded-full transition-colors ${i < clickCount ? "bg-purple-500" : "bg-zinc-700"
                                            }`}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Resolution Buttons */}
                {activeEpisode.resolutions.length > 0 && (
                    <div className="flex gap-2">
                        {activeEpisode.resolutions.map((r: any) => (
                            <button
                                key={r.resolution}
                                onClick={() => {
                                    if (activeSource.resolution === r.resolution) return

                                    cleanup()
                                    setUnlocked(false)
                                    setClickCount(0)
                                    setActiveSource(r)
                                }}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${activeSource.resolution === r.resolution
                                    ? "bg-purple-600 text-white shadow-lg shadow-purple-600/20"
                                    : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                                    }`}
                            >
                                {r.resolution}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* =============================== */}
            {/* EPISODE LIST */}
            {/* =============================== */}
            <aside className="col-span-12 md:col-span-4">
                <div className="rounded-3xl bg-zinc-900/50 border border-white/5 p-5">
                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-zinc-500 mb-6 flex items-center gap-2">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        Episode List
                    </h2>

                    <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2">
                        {episodes.map((ep: any, i: number) => {
                            const isSelected =
                                activeEpisode.episode_id === ep.episode_id

                            return (
                                <button
                                    key={ep.episode_id}
                                    onClick={() => changeEpisode(ep)}
                                    className={`w-full p-4 rounded-2xl text-left text-sm transition-all border ${isSelected
                                        ? "bg-purple-600/10 border-purple-500/50 text-purple-300"
                                        : "bg-zinc-800/30 border-transparent text-zinc-500 hover:border-zinc-700 hover:text-zinc-300"
                                        }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`text-xs font-bold ${isSelected
                                                ? "text-purple-400"
                                                : "text-zinc-600"
                                                }`}
                                        >
                                            {String(i + 1).padStart(2, "0")}
                                        </span>
                                        <span className="font-medium truncate">
                                            Episode {ep.title}
                                        </span>
                                    </div>
                                </button>
                            )
                        })}
                    </div>
                </div>
            </aside>
        </div>
    )
}