"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Flame, Star, Trophy, Zap } from "lucide-react"

export default function NetshortTopRankCard({ theater, index }: { theater: any, index: number }) {
    // MAPPING DATA SESUAI JSON NETSHORT TERBARU
    const id = theater?.shortPlayId
    const title = theater?.shortPlayName || "Premium Drama"
    const rawCover = theater?.shortPlayCover;
    const scoreShow = theater?.heatScoreShow || "0.0"
    const labels = theater?.labelArray || []
    const scriptName = theater?.scriptName // Contoh: "Populer" atau "Sulih Suara"
    const isNew = theater?.isNewLabel

    const rank = index + 1

    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80&w=500`
        : null;

    if (!id) return null;

    return (
        <Link
            href={`/drama/china/channel/netshort/detail/${id}`}
            title={`Nonton ${title} Sub Indo - Peringkat ${rank}`}
            className="group relative flex flex-col w-full active:scale-95 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
            {/* --- 1. MEDIA BOX (The "Grand" Stage) --- */}
            <div className="relative aspect-[3/4.2] overflow-hidden rounded-[2.5rem] md:rounded-[3rem] bg-zinc-950 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.4)] border border-white/10">

                {/* BIG AESTHETIC RANK NUMBER */}
                <div className="absolute top-0 -left-4 z-10 select-none pointer-events-none">
                    <span className="text-[140px] font-black leading-none text-white/5 italic -tracking-[0.1em] block outline-text">
                        {rank}
                    </span>
                </div>

                {safeCover ? (
                    <Image
                        src={safeCover}
                        alt={`Nonton ${title} Sub Indo - Tamanto Premium`}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-800">NO POSTER</div>
                )}

                {/* DYNAMIC GRADIENTS */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-90" />
                <div className="absolute inset-0 bg-gradient-to-tr from-rose-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* --- TOP BADGES --- */}
                <div className="absolute top-5 left-5 right-5 z-20 flex justify-between items-center">
                    <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 rounded-2xl shadow-xl shadow-rose-600/40 border border-rose-500">
                            <Trophy size={10} className="text-white fill-white" />
                            <span className="text-[10px] font-black text-white uppercase italic">TOP {rank}</span>
                        </div>
                        {scriptName && (
                            <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded-xl border border-white/10 w-fit">
                                <span className="text-[8px] font-black text-white uppercase tracking-widest">{scriptName}</span>
                            </div>
                        )}
                    </div>

                    {isNew && (
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center shadow-lg shadow-emerald-500/30 border-2 border-white animate-bounce">
                            <span className="text-[8px] font-black text-white uppercase">NEW</span>
                        </div>
                    )}
                </div>

                {/* --- FLOATING INFO PANEL (Glassmorphism) --- */}
                <div className="absolute bottom-5 left-5 right-5 z-20">
                    <div className="p-4 bg-black/40 backdrop-blur-2xl rounded-[2rem] border border-white/10 space-y-3 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        {/* Tags Preview */}
                        <div className="flex flex-wrap gap-1.5">
                            {labels.slice(0, 2).map((label: string) => (
                                <span key={label} className="text-[7px] font-black text-rose-400 border border-rose-400/30 px-2 py-0.5 rounded-lg uppercase tracking-tighter">
                                    {label}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5">
                                <div className="p-1 bg-orange-500/20 rounded-lg">
                                    <Flame size={14} className="text-orange-500 fill-orange-500" />
                                </div>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[12px] font-black text-white italic">{scoreShow}</span>
                                    <span className="text-[7px] font-bold text-zinc-400 uppercase tracking-widest">Heat Score</span>
                                </div>
                            </div>
                            <div className="w-10 h-10 bg-white text-rose-600 rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 transition-transform">
                                <Play size={18} fill="currentColor" className="ml-0.5" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* --- EXTERNAL INFO AREA --- */}
            <div className="mt-5 px-4 space-y-2">
                <div className="flex items-center gap-2">
                    <Zap size={12} className="text-rose-600 fill-rose-600" />
                    <span className="text-[9px] font-black text-rose-600 uppercase tracking-[0.2em] italic">Must Watch Now</span>
                </div>

                <h3 className="text-[16px] md:text-[18px] font-black leading-tight text-zinc-900 line-clamp-1 uppercase italic tracking-tighter group-hover:text-rose-600 transition-colors">
                    {title}
                </h3>

                <div className="flex items-center justify-between pt-1 border-t border-zinc-100">
                    <div className="flex items-center gap-1.5 opacity-60">
                        <Star size={10} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold text-zinc-500 italic uppercase">Global Popularity</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-tighter">Ultra HD</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}