"use client"

import { useState } from "react"
import { getEpisodeResolutions } from "@/libs/drama/drakor/drama"

export default function EpisodePlayer({
    episodes,
}: {
    episodes: any[]
}) {
    const [active, setActive] = useState<any>(null)
    const [loading, setLoading] = useState(false)

    async function handlePlay(ep: any) {
        setLoading(true)

        try {
            // ✅ fetch episode resolutions
            const res = await getEpisodeResolutions(ep.episode_id, ep.tag)

            if (res) {
                setActive(res)
            }
        } catch (err) {
            console.error("Episode load error:", err)
        }

        setLoading(false)
    }

    return (
        <div className="space-y-6">
            {/* ======================= */}
            {/* Episode Buttons */}
            {/* ======================= */}
            <div className="flex flex-wrap gap-2">
                {episodes.map((ep) => (
                    <button
                        key={ep.episode_id}
                        onClick={() => handlePlay(ep)}
                        className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-purple-600 transition"
                    >
                        Episode {ep.title}
                    </button>
                ))}
            </div>

            {/* ======================= */}
            {/* Loading Indicator */}
            {/* ======================= */}
            {loading && (
                <p className="text-sm text-zinc-400 animate-pulse">
                    Loading episode...
                </p>
            )}

            {/* ======================= */}
            {/* Resolutions */}
            {/* ======================= */}
            {active?.resolutions?.length > 0 && (
                <div className="space-y-3">
                    <h3 className="font-semibold text-white">
                        🎥 Pilih Resolusi:
                    </h3>

                    {active.resolutions.map((r: any) => (
                        <a
                            key={r.resolution}
                            href={r.src}
                            target="_blank"
                            className="block px-4 py-2 rounded-lg bg-zinc-900 hover:bg-purple-700 transition"
                        >
                            ▶ Play {r.resolution}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}