"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Flame, Star, Zap, Crown, BookmarkPlus } from "lucide-react"

export default function FlickreelsCard({ theater }: { theater: any }) {
    // Mapping data sesuai respon API terbaru
    const id = theater?.playlet_id
    const title = theater?.title || "Premium Drama"
    const tags = theater?.playlet_tag_name || []
    const hotNum = theater?.hot_num || "0"
    const totalEpisodes = theater?.upload_num || 0
    const rankTag = theater?.rank_tag || ""
    const rawCover = theater?.cover;

    // Image Proxy untuk performa & bypass referer
    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80`
        : null;

    return (
        <Link
            href={`/drama/china/channel/flickreels/detail/${id}`}
            title={`Nonton Drama ${title} Sub Indo`}
            className="group relative flex flex-col w-full bg-white rounded-[2.5rem] md:rounded-[3rem] p-3 border border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(124,58,237,0.15)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95"
        >
            {/* --- 1. MEDIA VISUAL --- */}
            <div className="relative aspect-[3/4.2] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-slate-50">
                {safeCover ? (
                    <Image
                        src={safeCover}
                        alt={`Poster Drama ${title}`}
                        fill
                        sizes="(max-width: 640px) 50vw, 33vw"
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                        unoptimized
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-zinc-50 font-black text-zinc-200 italic uppercase">No Cover</div>
                )}

                {/* VIBRANT GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-indigo-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                {/* HOT RANKING BADGE (TOP LEFT) */}
                {rankTag && (
                    <div className="absolute top-4 left-4 z-20 animate-in fade-in slide-in-from-top-2 duration-500">
                        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl">
                            <Crown size={12} className="text-amber-500 fill-amber-500" />
                            <span className="text-[9px] font-black uppercase tracking-tight text-zinc-900 italic">
                                {rankTag}
                            </span>
                        </div>
                    </div>
                )}

                {/* SAVE BUTTON (TOP RIGHT) */}
                <button className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-indigo-600 transition-all border border-white/30">
                    <BookmarkPlus size={18} />
                </button>

                {/* BOTTOM FLOATING INFO */}
                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between">
                    <div className="bg-black/20 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-white/20">
                        <div className="flex items-center gap-1.5 text-white">
                            <Flame size={12} className="text-orange-400 fill-orange-400" />
                            <span className="text-[10px] font-black italic">{hotNum}</span>
                        </div>
                    </div>
                    
                    <div className="w-10 h-10 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-600/40 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                    </div>
                </div>
            </div>

            {/* --- 2. INFORMATION AREA --- */}
            <div className="px-4 pt-5 pb-6 space-y-4">
                {/* Title Section */}
                <div className="space-y-1">
                    <h3 className="text-[15px] md:text-[17px] font-black uppercase italic leading-[1.1] text-zinc-900 tracking-tighter line-clamp-1 group-hover:text-indigo-600 transition-colors">
                        {title}
                    </h3>
                    <div className="flex items-center gap-2 text-zinc-400">
                        <Zap size={10} className="fill-indigo-500 text-indigo-500" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">{totalEpisodes} Full Episodes</span>
                    </div>
                </div>

                {/* Vibrant Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {tags.slice(0, 2).map((tag: string, i: number) => (
                        <span
                            key={i}
                            className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 bg-indigo-50 text-indigo-500 rounded-lg border border-indigo-100"
                        >
                            {tag}
                        </span>
                    ))}
                    {tags.length > 2 && (
                        <span className="text-[8px] font-black text-zinc-300 px-1 py-1 italic">+{tags.length - 2}</span>
                    )}
                </div>

                {/* Trust Footer */}
                <div className="pt-4 border-t border-dotted border-zinc-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                        <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest italic">Melolo Premium</span>
                    </div>
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                </div>
            </div>
        </Link>
    )
}