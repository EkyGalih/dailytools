'use client'

import { useState } from 'react'
import VideoPlayerModal from './VideoPlayerModal'
import { Play, List, ChevronDown } from 'lucide-react'

export default function AnimeActionDetails({ data }: { data: any }) {
    const [isEpListOpen, setIsEpListOpen] = useState(false)
    const [activeVideoSlug, setActiveVideoSlug] = useState<string | null>(null)

    return (
        <>
            <div className="space-y-4 mt-8 px-4 md:px-0">
                {/* TOGGLE BUTTON */}
                <button
                    onClick={() => setIsEpListOpen(!isEpListOpen)}
                    className={`w-full flex items-center justify-between p-5 rounded-[2rem] border-2 transition-all active:scale-[0.98] ${isEpListOpen
                            ? "bg-orange-600/10 border-orange-500/50 shadow-[0_0_30px_rgba(234,88,12,0.1)]"
                            : "bg-[#0c0c0e] border-white/5 hover:border-orange-500/20"
                        }`}
                >
                    <div className="flex items-center gap-4">
                        <div className={`p-3 rounded-2xl ${isEpListOpen ? 'bg-orange-600 text-white' : 'bg-zinc-900 text-zinc-500'}`}>
                            <List size={20} />
                        </div>
                        <div className="text-left">
                            <p className={`text-[10px] font-black uppercase tracking-[0.2em] mb-0.5 ${isEpListOpen ? 'text-orange-500' : 'text-zinc-500'}`}>
                                Database Chapters
                            </p>
                            <h4 className="text-sm font-black text-white uppercase italic">
                                {data.chapter?.length || 0} Episodes Available
                            </h4>
                        </div>
                    </div>
                    <ChevronDown size={20} className={`text-zinc-600 transition-transform duration-500 ${isEpListOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* EPISODE GRID */}
                {isEpListOpen && (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 animate-in slide-in-from-top-4 fade-in duration-500">
                        {data.chapter?.map((ep: any) => (
                            <button
                                key={ep.id}
                                onClick={() => setActiveVideoSlug(extractEpisodeSlug(ep.url))}
                                className="group flex flex-col items-center justify-center p-4 bg-zinc-900/40 border border-white/5 rounded-2xl hover:border-orange-500/50 hover:bg-orange-600/5 transition-all active:scale-95"
                            >
                                <Play size={16} className="text-orange-500 mb-2 group-hover:scale-125 transition-transform" fill="currentColor" />
                                <span className="text-[10px] font-black text-zinc-400 group-hover:text-white uppercase tracking-tighter">
                                    EP {ep.ch}
                                </span>
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <VideoPlayerModal
                slug={activeVideoSlug}
                onClose={() => setActiveVideoSlug(null)}
            />
        </>
    )
}

function extractEpisodeSlug(url: string) {
    if (!url) return null
    return url.split('/').filter(Boolean).pop()?.trim() || null
}