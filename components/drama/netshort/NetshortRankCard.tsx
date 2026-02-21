"use client"

import Link from "next/link"
import Image from "next/image"
import { Sparkles, Play, Star, ShieldCheck } from "lucide-react"

export default function NetshortRankCard({ theater }: { theater: any }) {
    // MAPPING DATA SESUAI JSON NETSHORT
    const id = theater?.shortPlayId
    const title = theater?.shortPlayName || "Special Recommendation"
    const rawCover = theater?.shortPlayCover || theater?.groupShortPlayCover
    const score = theater?.heatScoreShow || "9.8"
    const labels = theater?.labelArray || []

    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80&w=200&h=260&fit=cover`
        : null

    if (!id) return null

    return (
        <Link
            href={`/drama/china/channel/netshort/detail/${id}`}
            title={`Rekomendasi untukmu: ${title}`}
            className="group relative flex items-center gap-4 p-2 rounded-[1.8rem] bg-white border border-zinc-100 hover:border-emerald-200 hover:shadow-[0_15px_30px_-10px_rgba(16,185,129,0.12)] transition-all duration-500 active:scale-[0.98]"
        >
            {/* --- 1. THUMBNAIL WITH SOFT GLOW --- */}
            <div className="relative shrink-0 w-16 h-20 overflow-hidden rounded-2xl bg-zinc-50 border border-zinc-50 shadow-sm">
                {safeCover ? (
                    <Image
                        src={safeCover}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-zinc-200">VIP</div>
                )}
                
                {/* Micro Tag Overlay */}
                <div className="absolute top-1 left-1 z-10">
                    <div className="bg-emerald-500 text-white rounded-md p-0.5 shadow-lg">
                        <Sparkles size={8} fill="currentColor" />
                    </div>
                </div>

                {/* Subtle Shine Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>

            {/* --- 2. CONTENT INFO --- */}
            <div className="flex-1 min-w-0 space-y-2">
                <div className="space-y-0.5">
                    <div className="flex items-center gap-1.5 text-[8px] font-black text-emerald-600 uppercase tracking-widest italic">
                        <ShieldCheck size={10} />
                        Top Pick
                    </div>
                    <h3 className="text-[13px] font-black leading-tight text-zinc-900 line-clamp-1 italic uppercase tracking-tighter group-hover:text-emerald-600 transition-colors">
                        {title}
                    </h3>
                </div>
                
                <div className="flex items-center gap-3">
                    {/* Rating Mini */}
                    <div className="flex items-center gap-1 px-1.5 py-0.5 bg-emerald-50 rounded-lg border border-emerald-100">
                        <Star size={10} fill="#10b981" className="text-emerald-500" />
                        <span className="text-[10px] font-black text-emerald-700 italic leading-none">{score}</span>
                    </div>

                    <div className="flex items-center gap-1 opacity-30 group-hover:opacity-100 transition-all">
                        <div className="w-1 h-1 bg-zinc-400 rounded-full animate-pulse" />
                        <span className="text-[8px] font-bold text-zinc-500 uppercase">Recommended</span>
                    </div>
                </div>

                {/* Micro Labels */}
                <div className="flex gap-1 overflow-hidden">
                    {labels.slice(0, 1).map((tag: string) => (
                        <span key={tag} className="text-[7px] font-black uppercase tracking-[0.1em] px-2 py-0.5 bg-zinc-50 text-zinc-400 rounded-md">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* --- 3. CIRCULAR PLAY BUTTON --- */}
            <div className="shrink-0 pr-1">
                <div className="w-8 h-8 rounded-full border border-zinc-100 flex items-center justify-center text-zinc-300 group-hover:bg-emerald-500 group-hover:text-white group-hover:border-emerald-500 transition-all duration-500 group-hover:rotate-[360deg]">
                    <Play size={12} fill="currentColor" className="ml-0.5" />
                </div>
            </div>
        </Link>
    )
}