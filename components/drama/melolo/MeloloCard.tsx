"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Flame, CheckCircle2, Star, Plus } from "lucide-react"

export default function MeloloCard({ theater }: { theater: any }) {
    const id = theater?.book_id
    const title = theater?.book_name || "Untitled Drama"
    const labels = theater?.stat_infos || []
    const isHot = theater?.is_hot === "1"
    const status = theater?.show_creation_status || "Ongoing"
    const totalEpisodes = theater?.serial_count || 0
    const rawCover = theater?.thumb_url;

    // ✅ Image Proxy & Format Fix
    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80`
        : null;

    return (
        <Link
            href={`/drama/china/channel/melolo/detail/${id}`}
            title={`Nonton Drama ${title} Sub Indo`} // SEO: Title attribute
            className="group relative flex flex-col w-full bg-white rounded-[2.2rem] md:rounded-[2.8rem] border border-zinc-100 hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] overflow-hidden active:scale-[0.97] lg:hover:-translate-y-2"
        >
            {/* --- 1. MEDIA CONTAINER --- */}
            <div className="relative aspect-[3/4.2] overflow-hidden m-2 md:m-3 rounded-[1.8rem] md:rounded-[2.2rem] bg-zinc-50 shadow-inner">
                {safeCover ? (
                    <Image
                        src={safeCover}
                        alt={`Poster Drama ${title}`} // SEO: Alt text informatif
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                        className="object-cover transition-transform duration-1000 ease-out lg:group-hover:scale-110"
                        unoptimized
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-zinc-100">
                        <div className="w-8 h-8 bg-zinc-200 rounded-full animate-pulse" />
                        <span className="text-[10px] font-black text-zinc-300 uppercase italic tracking-widest">No Visual</span>
                    </div>
                )}

                {/* SINEMATIK GRADIENT OVERLAY */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-500" />

                {/* BADGES (TOP) */}
                <div className="absolute top-3 left-3 md:top-4 md:left-4 flex flex-col gap-2 z-20">
                    {isHot && (
                        <div className="flex items-center gap-1.5 px-3 py-1 bg-rose-600 text-white text-[8px] md:text-[9px] font-black uppercase rounded-full shadow-[0_4px_12px_rgba(225,29,72,0.4)] animate-in fade-in slide-in-from-left-2">
                            <Flame size={10} fill="currentColor" />
                            <span>Trending</span>
                        </div>
                    )}
                    <div className="w-fit px-3 py-1 bg-white/10 backdrop-blur-md text-white text-[8px] md:text-[9px] font-black uppercase rounded-full border border-white/20">
                        {status}
                    </div>
                </div>

                {/* BOTTOM INFO OVERLAY (Rating & Eps) */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="flex items-center gap-1 text-[11px] font-black text-amber-400 italic">
                            <Star size={12} className="fill-current" />
                            <span>9.8</span>
                        </div>
                        <p className="text-[10px] font-bold text-zinc-200 uppercase tracking-tighter leading-none">
                            {totalEpisodes} Chapters
                        </p>
                    </div>

                    {/* Floating Play Button (Desktop Only) */}
                    <div className="hidden lg:flex w-10 h-10 bg-rose-600 rounded-2xl items-center justify-center text-white shadow-lg shadow-rose-600/30 group-hover:rotate-[360deg] transition-transform duration-700">
                        <Play fill="currentColor" size={16} className="ml-0.5" />
                    </div>
                </div>
            </div>

            {/* --- 2. CONTENT INFO --- */}
            <div className="px-5 pb-7 pt-2 md:px-7 md:pb-9 md:pt-3 space-y-4">
                {/* Judul: Brutalist Italic Style */}
                <h3 className="text-[14px] md:text-[16px] font-black uppercase italic tracking-tight text-zinc-900 line-clamp-2 min-h-[42px] md:min-h-[48px] leading-[1.2] group-hover:text-rose-600 transition-colors duration-300">
                    {title}
                </h3>

                {/* Tags: Minimalist & Spaced */}
                <div className="flex flex-wrap gap-2">
                    {labels.length > 0 ? labels.slice(0, 2).map((label: string, i: number) => (
                        <span
                            key={i}
                            className="text-[8px] md:text-[9px] font-extrabold text-zinc-400 bg-zinc-50 border border-zinc-100 px-3 py-1 rounded-full uppercase tracking-[0.1em]"
                        >
                            {label.split(',')[0].trim()}
                        </span>
                    )) : (
                        <span className="text-[8px] md:text-[9px] font-extrabold text-rose-300 bg-rose-50 px-3 py-1 rounded-full uppercase tracking-widest">Premium Choice</span>
                    )}
                </div>

                {/* Footer: Modern Verified Look */}
                <div className="pt-4 border-t border-zinc-50 flex justify-between items-center opacity-70 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-2">
                        <div className="relative">
                            <div className="w-1.5 h-1.5 bg-rose-500 rounded-full animate-ping absolute inset-0" />
                            <div className="w-1.5 h-1.5 bg-rose-600 rounded-full relative" />
                        </div>
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-widest">
                            Melolo <span className="text-zinc-300">Hub</span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1">
                        <span className="text-[8px] font-bold text-zinc-300 uppercase tracking-tighter">Verified</span>
                        <CheckCircle2 size={13} className="text-emerald-500" />
                    </div>
                </div>
            </div>
        </Link>
    )
}