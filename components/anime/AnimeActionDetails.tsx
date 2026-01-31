'use client'

import { useState } from 'react'
import VideoPlayerModal from './VideoPlayerModal'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'

export default function AnimeActionDetails({ data }: { data: any }) {
    const [isEpListOpen, setIsEpListOpen] = useState(false)
    const [activeVideoSlug, setActiveVideoSlug] = useState<string | null>(null)
    const [clickCounts, setClickCounts] = useState<{ [key: string]: number }>({})
    const products = getAffiliateProducts()
    const random =
        products[Math.floor(Math.random() * products.length)]

    // Fungsi Logika 3x Klik
    const handleTripleClick = (endpoint: string) => {
        const currentCount = (clickCounts[endpoint] || 0) + 1

        if (currentCount >= 2) {
            setClickCounts({ ...clickCounts, [endpoint]: 0 })

            const slug = extractEpisodeSlug(endpoint)
            setActiveVideoSlug(slug)
        } else {
            setClickCounts({ ...clickCounts, [endpoint]: currentCount })
        }
    }

    return (
        <>
            <div className="space-y-6 mt-10">
                {/* QUICK ACTIONS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                    {/* LATEST / BATCH BUTTON (Direct Download) */}
                    <button
                        onClick={() => {
                            if (!clickCounts[data?.latest_eps.endpoint]) {
                                window.open(random.link, "_blank")
                            }

                            // lanjut logic klik ke-2
                            handleTripleClick(data?.latest_eps.endpoint)
                        }}
                        className="relative group overflow-hidden flex items-center justify-between p-5 bg-gradient-to-r from-orange-600 to-amber-500 rounded-3xl shadow-[0_10px_30px_rgba(249,115,22,0.3)] transition-all active:scale-95"
                    >
                        <div className="flex flex-col items-start text-left z-10">
                            <span className="text-[10px] font-black text-white/80 uppercase tracking-[0.2em] mb-1">
                                Download Batch
                            </span>
                            <h4 className="text-sm font-black text-white leading-tight">
                                {data.latest_eps.title.replace('Subtitle Indonesia', '')}
                            </h4>
                            {/* <p className="text-[9px] text-white/70 mt-2 italic font-bold">
                                {clickCounts[data.latest_eps.endpoint] || 0}/3 Klik untuk Download
                            </p> */}
                        </div>
                        <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 256 256"><path d="M224,144v64a8,8,0,0,1-8,8H40a8,8,0,0,1-8-8V144a8,8,0,0,1,16,0v56H208V144a8,8,0,0,1,16,0Zm-101.66,5.66a8,8,0,0,0,11.32,0l40-40a8,8,0,0,0-11.32-11.32L136,124.69V40a8,8,0,0,0-16,0v84.69L93.66,98.34a8,8,0,0,0-11.32,11.32Z"></path></svg>
                        </div>
                        {/* Progress Bar Background */}
                        <div
                            className="absolute bottom-0 left-0 h-1 bg-white/40 transition-all duration-300"
                            style={{ width: `${((clickCounts[data.latest_eps.endpoint] || 0) / 3) * 100}%` }}
                        />
                    </button>

                    {/* FIRST EPS / WATCH LIST BUTTON (Toggle Collapse) */}
                    <button
                        onClick={() => setIsEpListOpen(!isEpListOpen)}
                        className={`flex items-center justify-between p-5 rounded-3xl border-2 transition-all active:scale-95 ${isEpListOpen
                            ? "bg-zinc-800 border-zinc-700"
                            : "bg-zinc-900/50 border-zinc-800 hover:border-zinc-700"
                            }`}
                    >
                        <div className="flex flex-col items-start text-left">
                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.2em] mb-1">
                                Daftar Episode
                            </span>
                            <h4 className="text-sm font-black text-white leading-tight">
                                {data.first_eps.title.split(':')[1]?.trim() || "Daftar Episode"}
                            </h4>
                        </div>
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform duration-300 ${isEpListOpen ? 'rotate-180 bg-zinc-700' : 'bg-zinc-800'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 256 256"><path d="M213.66,101.66l-80,80a8,8,0,0,1-11.32,0l-80-80a8,8,0,0,1,11.32-11.32L128,164.69l74.34-74.35a8,8,0,0,1,11.32,11.32Z"></path></svg>
                        </div>
                    </button>
                </div>

                {/* COLLAPSIBLE EPISODE LIST */}
                {isEpListOpen && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 animate-in fade-in zoom-in-95 duration-300">
                        {data.episode_list
                            // FILTER: Buang episode yang endpoint-nya sama dengan first_eps atau latest_eps
                            .filter((ep: any) =>
                                ep.endpoint !== data.first_eps.endpoint &&
                                ep.endpoint !== data.latest_eps.endpoint
                            )
                            .map((ep: any, idx: number) => (
                                <div
                                    key={idx}
                                    onClick={() => {
                                        if (!clickCounts[ep.endpoint]) {
                                            window.open(random.link, "_blank")
                                        }

                                        // lanjut logic klik ke-2
                                        handleTripleClick(ep.endpoint)
                                    }}
                                    className="group cursor-pointer flex items-center justify-between p-4 bg-zinc-900/80 border border-zinc-800 hover:border-orange-500 rounded-2xl transition-all relative overflow-hidden"
                                >
                                    <div className="flex flex-col gap-1 z-10">
                                        <span className="text-xs font-bold text-zinc-100 group-hover:text-white transition-colors line-clamp-1">
                                            {ep.title}
                                        </span>
                                        {/* <span className="text-[9px] font-black text-zinc-500 group-hover:text-orange-300 uppercase">
                                            {clickCounts[ep.endpoint] || 0}/3 Click to Play
                                        </span> */}
                                    </div>

                                    {/* Icon Play */}
                                    <div className="w-8 h-8 rounded-full bg-zinc-800 group-hover:bg-orange-600 flex items-center justify-center transition-colors">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" viewBox="0 0 256 256">
                                            <path d="M240,128a15.84,15.84,0,0,1-7.73,13.7l-152,88a15.83,15.83,0,0,1-16.27,0A15.85,15.85,0,0,1,56,215.7V40.3a15.85,15.85,0,0,1,7.74-13.7,15.83,15.83,0,0,1,16.27,0l152,88A15.84,15.84,0,0,1,240,128Z"></path>
                                        </svg>
                                    </div>

                                    {/* Click Indicator Progress Bar */}
                                    <div
                                        className="absolute bottom-0 left-0 h-[3px] bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.8)] transition-all duration-300"
                                        style={{ width: `${((clickCounts[ep.endpoint] || 0) / 3) * 100}%` }}
                                    />
                                </div>
                            ))
                        }
                    </div>
                )}

                {data.episode_list
                    .filter((ep: any) => ep.endpoint !== data.latest_eps.endpoint)
                    .map((ep: any) => (
                        <div key={ep.endpoint} onClick={() => handleTripleClick(ep.endpoint)}>
                            {/* Card UI Episode kamu */}
                        </div>
                    ))
                }
            </div>
            {/* RENDER MODAL */}
            <VideoPlayerModal
                slug={activeVideoSlug}
                onClose={() => setActiveVideoSlug(null)}
            />
        </>
    )
}

function extractEpisodeSlug(url: string) {
    return url
        .replace("https://otakudesu.best/episode/", "")
        .replace("/episode/", "")
        .replaceAll("/", "")
        .trim()
}