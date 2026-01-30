"use client"

import { useState } from "react"
import { getEpisodeResolutions } from "@/libs/drama/drakor/drama"

type EpisodeItem = {
    title: string
    episode_id: string
    tag: string
}

export default function EpisodePlayer({
    episodes,
}: {
    episodes: EpisodeItem[]
}) {
    const [activeEpisode, setActiveEpisode] = useState<EpisodeItem | null>(null)
    const [loading, setLoading] = useState(false)
    const [resolutions, setResolutions] = useState<any[]>([])

    async function handlePlay(ep: EpisodeItem) {
        setActiveEpisode(ep)
        setLoading(true)

        try {
            // ✅ Ambil resolusi pakai episode_id + tag dari episode itu sendiri
            const data = await getEpisodeResolutions(ep.episode_id, ep.tag)

            if (data?.resolutions) {
                setResolutions(data.resolutions)
            }
        } catch (err) {
            console.error("Episode load error:", err)
        }

        setLoading(false)
    }

    return (
        <div className="space-y-6">
            {/* ============================ */}
            {/* EPISODE LIST */}
            {/* ============================ */}
            <div className="flex flex-wrap gap-2">
                {episodes.map((ep) => (
                    <button
                        key={ep.episode_id}
                        onClick={() => handlePlay(ep)}
                        className={`px-4 py-2 rounded-lg text-sm font-semibold transition
              ${activeEpisode?.episode_id === ep.episode_id
                                ? "bg-purple-600 text-white"
                                : "bg-zinc-800 text-white/70 hover:bg-purple-700"
                            }
            `}
                    >
                        Episode {ep.title}
                    </button>
                ))}
            </div>

            {/* ============================ */}
            {/* LOADING */}
            {/* ============================ */}
            {loading && (
                <div className="text-sm text-purple-400 animate-pulse">
                    ⏳ Loading video...
                </div>
            )}

            {/* ============================ */}
            {/* VIDEO LINKS */}
            {/* ============================ */}
            {!loading && resolutions.length > 0 && (
                <div className="space-y-3">
                    <h3 className="text-lg font-bold">Pilih Resolusi:</h3>

                    <div className="flex flex-wrap gap-3">
                        {resolutions.map((r) => (
                            <a
                                key={r.resolution}
                                href={r.src}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10
                hover:bg-purple-600 transition text-sm"
                            >
                                {r.resolution}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )
}