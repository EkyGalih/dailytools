"use client"

import { useState } from "react"
import { AFFILIATE_BY_TAG } from "@/libs/ads/affiliate-map"

export default function NextEpisodeButton({
    dramaId,
    currentEpisode,
    totalEpisodes,
}: {
    dramaId: string
    currentEpisode: number
    totalEpisodes: number
}) {
    const [clicked, setClicked] = useState(false)
    
    // ambil random affiliate dari DEFAULT
    const affiliateList = AFFILIATE_BY_TAG.DEFAULT
    const randomAffiliate =
    affiliateList[Math.floor(Math.random() * affiliateList.length)].link
    
    const nextEpisodeId = `${dramaId}-episode-${currentEpisode + 1}`
    
    // target url episode selanjutnya
    const nextWatchUrl = `/drama/filem/watch/${dramaId}/${nextEpisodeId}`
    const hasNext = currentEpisode < totalEpisodes

    return (
        <a
            href={clicked ? nextWatchUrl : randomAffiliate}
            onClick={(e) => {
                if (!hasNext) {
                    e.preventDefault()
                    return
                }

                if (!clicked) {
                    e.preventDefault()
                    window.open(randomAffiliate, "_blank", "noopener,noreferrer")
                    setClicked(true)
                }
            }}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition
      ${hasNext
                    ? "bg-purple-500 text-white hover:bg-purple-400 cursor-pointer"
                    : "bg-zinc-700 text-zinc-400 cursor-not-allowed pointer-events-none"
                }
    `}
        >
            {hasNext ? "▶ Next Episode" : "All Episodes Watched"}
        </a>
    )
}