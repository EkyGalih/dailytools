"use client"

import { AFFILIATE_BY_TAG } from "@/libs/ads/affiliate-map"
import { useRef, useState } from "react"
import { useRouter } from "next/navigation"

export default function EpisodeList({
    episodes,
    watchBaseUrl,
    genres = [],
}: {
    episodes: any[]
    watchBaseUrl: string
    genres?: string[]
}) {
    const router = useRouter()
    const [clicked, setClicked] = useState<Record<string, boolean>>({})

    // Simpan affiliate link per episode biar stabil (nggak random ulang tiap render)
    const affiliateByEpisodeRef = useRef<Record<string, string>>({})

    function pickRandomAffiliateLink() {
        const tag = genres.find((g) => AFFILIATE_BY_TAG[g]) || "DEFAULT"
        const list = AFFILIATE_BY_TAG[tag] || AFFILIATE_BY_TAG.DEFAULT
        const random = list[Math.floor(Math.random() * list.length)]
        return random.link
    }

    function getAffiliateLinkForEpisode(episodeId: string) {
        if (!affiliateByEpisodeRef.current[episodeId]) {
            affiliateByEpisodeRef.current[episodeId] = pickRandomAffiliateLink()
        }
        return affiliateByEpisodeRef.current[episodeId]
    }

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {episodes.map((ep) => {
                const episodeId = ep.episode_id
                const firstClick = !clicked[episodeId]
                const affiliateLink = getAffiliateLinkForEpisode(episodeId)
                const watchUrl = `${watchBaseUrl}/${episodeId}`

                return (
                    <button
                        key={episodeId}
                        type="button"
                        onClick={() => {
                            if (firstClick) {
                                // klik pertama -> affiliate (tab baru), tetap di halaman detail
                                window.open(affiliateLink, "_blank", "noopener,noreferrer")
                                setClicked((prev) => ({ ...prev, [episodeId]: true }))
                            } else {
                                // klik kedua -> ke halaman nonton
                                router.push(watchUrl)
                            }
                        }}
                        className={`text-left block w-full p-4 rounded-xl bg-zinc-900 hover:bg-zinc-800 transition ${
                            firstClick ? "cursor-pointer" : "cursor-pointer"
                        }`}
                    >
                        <p className="text-sm font-semibold line-clamp-2">{ep.title}</p>
                        <p className="text-xs text-zinc-400 mt-1">{ep.time}</p>

                        <span
                            className="mt-2 inline-block text-[10px] px-2 py-1 rounded bg-emerald-500/20 text-emerald-300"
                        >
                            Tonton
                        </span>
                    </button>
                )
            })}
        </div>
    )
}