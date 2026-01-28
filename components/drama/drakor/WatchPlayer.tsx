"use client"

import { useEffect, useRef, useState } from "react"
import "plyr/dist/plyr.css"
import Hls from "hls.js"
import { getAffiliateProducts } from "@/libs/ads/getAffiliateProducts"

export default function WatchPlayer({
    episodes,
    genres,
}: {
    episodes: any[]
    genres: string[]
}) {
    const videoRef = useRef<HTMLVideoElement | null>(null)
    const playerRef = useRef<any>(null)
    const hlsRef = useRef<Hls | null>(null)

    const [activeEpisode, setActiveEpisode] = useState(episodes[0])
    const [activeSource, setActiveSource] = useState(
        episodes[0]?.resolutions[0]
    )

    // ===============================
    // ✅ Sponsor Gate
    // ===============================
    const [clickCount, setClickCount] = useState(0)
    const [unlocked, setUnlocked] = useState(false)

    const affiliateProducts = getAffiliateProducts(genres)

    // ===============================
    // INIT PLAYER
    // ===============================
    useEffect(() => {
        async function initPlayer() {
            if (!videoRef.current) return

            const video = videoRef.current
            const Plyr = (await import("plyr")).default

            // Destroy old player + HLS instance
            if (playerRef.current) {
                playerRef.current.destroy()
                playerRef.current = null
            }

            if (hlsRef.current) {
                hlsRef.current.destroy()
                hlsRef.current = null
            }

            // Reset video element
            video.pause()
            video.removeAttribute("src")
            video.load()

            // Load Source (HLS safe)
            if (Hls.isSupported() && activeSource?.src?.includes(".m3u8")) {
                const hls = new Hls()

                hls.loadSource(activeSource.src)
                hls.attachMedia(video)

                // Ensure playback starts correctly after manifest is ready
                hls.on(Hls.Events.MANIFEST_PARSED, () => {
                    video.play().catch(() => {})
                })

                hlsRef.current = hls
            } else {
                video.src = activeSource.src
                video.load()
            }

            // Init Plyr
            playerRef.current = new Plyr(video, {
                autoplay: false,
                controls: [
                    "play-large",
                    "rewind",
                    "play",
                    "fast-forward",
                    "progress",
                    "current-time",
                    "mute",
                    "volume",
                    "settings",
                    "captions",
                    "download",
                    "fullscreen",
                ],
                seekTime: 10,
            })

            // Force repaint/load to avoid black screen issues
            video.load()
        }

        initPlayer()
    }, [activeSource])

    // ===============================
    // ✅ Sponsor Click Handler
    // ===============================
    function handleSponsorGate() {
        // Sponsor klik 2x dulu
        if (clickCount < 2) {
            const product = affiliateProducts[clickCount]

            if (product?.link) {
                window.open(product.link, "_blank")
            }

            setClickCount((prev) => prev + 1)
            return
        }

        // ✅ Unlock setelah 2 klik sponsor
        setUnlocked(true)

        // ✅ Auto play setelah video siap
        const video = videoRef.current

        if (video) {
            const tryPlay = async () => {
                try {
                    await playerRef.current?.play()
                } catch (err) {
                    console.warn("Autoplay blocked:", err)
                }
            }

            if (video.readyState >= 2) {
                tryPlay()
            } else {
                video.addEventListener("loadedmetadata", tryPlay, { once: true })
            }
        }
    }

    return (
        <div className="grid grid-cols-12 gap-8 mt-10">
            {/* =============================== */}
            {/* VIDEO PLAYER */}
            {/* =============================== */}
            <div className="col-span-12 md:col-span-8 space-y-5">
                {/* Info */}

                {/* PLAYER */}
                {/* PLAYER */}
                <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-xl bg-black">
                    <video
                        ref={videoRef}
                        className="w-full h-[460px] object-contain"
                    />

                    {/* ✅ Sponsor Gate Overlay (Clean Mode) */}
                    {!unlocked && (
                        <button
                            onClick={handleSponsorGate}
                            className="absolute inset-0 flex items-center justify-center bg-black/50 hover:bg-black/30 transition"
                        >
                            {/* Play Icon Only */}
                            <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center hover:scale-110 transition">
                                <span className="text-white text-5xl ml-1">▶</span>
                            </div>
                        </button>
                    )}
                </div>

                {/* Resolution */}
                <div className="flex gap-2 flex-wrap">
                    {activeEpisode.resolutions.map((r: any) => (
                        <button
                            key={r.resolution}
                            onClick={() => {
                                setActiveSource(r)

                                // Reset sponsor gate
                                setUnlocked(false)
                                setClickCount(0)

                                playerRef.current?.pause()
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-semibold transition
                ${activeSource.resolution === r.resolution
                                    ? "bg-purple-600 text-white"
                                    : "bg-zinc-900 text-white/70 hover:bg-zinc-800"
                                }`}
                        >
                            {r.resolution}
                        </button>
                    ))}
                </div>
            </div>

            {/* =============================== */}
            {/* EPISODE LIST */}
            {/* =============================== */}
            <aside className="col-span-12 md:col-span-4">
                <div className="rounded-3xl bg-zinc-950/70 border border-white/10 p-5 shadow-lg">
                    <h2 className="text-lg font-bold mb-4">
                        Episodes ({episodes.length})
                    </h2>

                    <div className="space-y-2 max-h-[520px] overflow-y-auto pr-2">
                        {episodes.map((ep: any, i: number) => {
                            const active =
                                activeEpisode.episode_id === ep.episode_id

                            return (
                                <button
                                    key={ep.episode_id}
                                    onClick={() => {
                                        setActiveEpisode(ep)
                                        setActiveSource(ep.resolutions[0])

                                        // Reset sponsor gate
                                        setUnlocked(false)
                                        setClickCount(0)

                                        playerRef.current?.pause()
                                    }}
                                    className={`w-full px-4 py-3 rounded-2xl text-left transition
                    ${active
                                            ? "bg-purple-600 text-white"
                                            : "bg-zinc-900 text-white/70 hover:bg-zinc-800"
                                        }`}
                                >
                                    {i + 1}. {ep.title}
                                </button>
                            )
                        })}
                    </div>
                </div>
            </aside>
        </div>
    )
}