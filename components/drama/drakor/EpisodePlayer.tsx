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

        const data = await getEpisodeResolutions(
            ep.episode_id,
            ep.tag // ✅ tag dari episode itu sendiri
        )

        setActive(data)
        setLoading(false)
    }

    return (
        <div className="space-y-4">
            {/* Episode Buttons */}
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

            {/* Loading */}
            {loading && (
                <p className="text-sm text-zinc-400 animate-pulse">
                    Loading episode...
                </p>
            )}

            {/* Resolutions */}
            {active?.resolutions && (
                <div className="space-y-2">
                    {active.resolutions.map((r: any) => (
                        <a
                            key={r.resolution}
                            href={r.src}
                            target="_blank"
                            className="block px-4 py-2 rounded-lg bg-zinc-900 hover:bg-purple-700"
                        >
                            ▶ {r.resolution}
                        </a>
                    ))}
                </div>
            )}
        </div>
    )
}