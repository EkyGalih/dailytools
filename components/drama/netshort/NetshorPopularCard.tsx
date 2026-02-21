"use client"

import Link from "next/link"
import Image from "next/image"
import { Flame, Play, TrendingUp, Star } from "lucide-react"

export default function NetshortPopularCard({ 
    theater, 
    index 
}: { 
    theater: any, 
    index: number 
}) {
    // MAPPING DATA SESUAI JSON NETSHORT
    const id = theater?.shortPlayId
    const title = theater?.shortPlayName || "Trending Series"
    const rawCover = theater?.shortPlayCover || theater?.groupShortPlayCover
    const score = theater?.heatScoreShow || "0.0"
    const labels = theater?.labelArray || []
    const rank = index + 1

    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80&w=200&h=260&fit=cover`
        : null

    if (!id) return null

    return (
        <Link
            href={`/drama/china/channel/netshort/detail/${id}`}
            title={`Trending #${rank}: ${title}`}
            className="group relative flex items-center gap-4 p-2.5 rounded-[1.8rem] transition-all duration-500 hover:bg-zinc-900 hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.2)] active:scale-[0.97]"
        >
            {/* --- 1. THUMBNAIL AREA WITH RANK BADGE --- */}
            <div className="relative shrink-0 w-16 h-20 overflow-hidden rounded-[1.2rem] bg-zinc-100 shadow-sm border border-zinc-100 group-hover:border-zinc-700 transition-colors">
                {safeCover ? (
                    <Image
                        src={safeCover}
                        alt={`Trending ${title}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-100 group-hover:opacity-70"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-zinc-300">TRND</div>
                )}
                
                {/* Micro Play Overlay */}
                <div className="absolute inset-0 bg-indigo-600/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-500 scale-150 group-hover:scale-100">
                    <Play size={14} fill="white" className="text-white ml-0.5" />
                </div>
            </div>

            {/* --- 2. CONTENT INFO --- */}
            <div className="flex-1 min-w-0 space-y-1.5">
                <div className="flex items-center gap-2">
                    {/* Unique Rank Badge per Color */}
                    <span className={`text-[10px] font-black italic tracking-tighter ${
                        rank === 1 ? 'text-rose-500' : rank === 2 ? 'text-indigo-400' : 'text-zinc-400'
                    }`}>
                        #{rank}
                    </span>
                    <TrendingUp size={10} className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <h3 className="text-[13px] font-black leading-tight text-zinc-900 group-hover:text-white line-clamp-1 italic uppercase tracking-tighter transition-colors">
                        {title}
                    </h3>
                </div>
                
                <div className="flex items-center gap-2">
                    {/* Glass Stats Badge */}
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-zinc-100 group-hover:bg-white/10 rounded-lg border border-transparent group-hover:border-white/10 transition-all">
                        <Flame size={10} className="text-rose-500 fill-rose-500 group-hover:animate-bounce" />
                        <span className="text-[10px] font-black text-zinc-600 group-hover:text-rose-400 italic leading-none">
                            {score}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                        <span className="text-[9px] font-bold text-zinc-400 group-hover:text-zinc-500">POPULAR</span>
                    </div>
                </div>

                {/* Secondary Tags/Labels */}
                <p className="text-[9px] font-medium text-zinc-400 group-hover:text-zinc-500 truncate italic tracking-tight">
                    {labels.slice(0, 2).join(" • ") || "Top Trending Story"}
                </p>
            </div>

            {/* --- 3. INTERACTIVE GLOW (Desktop Only Effect) --- */}
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-rose-500 rounded-[2rem] opacity-0 group-hover:opacity-10 blur-xl transition-opacity duration-700 pointer-events-none" />
        </Link>
    )
}