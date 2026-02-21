"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Flame, Star, Zap, BookmarkPlus } from "lucide-react"

export default function NetshortCard({ theater }: { theater: any }) {
    // MAPPING DATA SESUAI JSON FREEREELS BARU
    const id = theater?.key
    const title = theater?.title || "Untitled Drama"
    const tags = theater?.series_tag || []
    const followCount = theater?.follow_count || "0"
    const totalEpisodes = theater?.episode_count || 0
    const rawCover = theater?.cover;

    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80`
        : null;

    if (!id) return null;

    return (
        <Link
            href={`/drama/china/channel/freereels/detail/${id}`}
            title={`Nonton Drama ${title} Sub Indo`}
            className="group relative flex flex-col w-full bg-white rounded-[2.5rem] md:rounded-[3rem] p-3 border border-zinc-100 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_40px_80px_-20px_rgba(244,63,94,0.15)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-95"
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

                <div className="absolute inset-0 bg-gradient-to-t from-rose-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />

                <button className="absolute top-4 right-4 z-20 w-10 h-10 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center text-white hover:bg-white hover:text-rose-600 transition-all border border-white/30">
                    <BookmarkPlus size={18} />
                </button>

                <div className="absolute bottom-5 left-5 right-5 z-20 flex items-center justify-between">
                    <div className="bg-black/20 backdrop-blur-xl px-3 py-1.5 rounded-xl border border-white/20">
                        <div className="flex items-center gap-1.5 text-white">
                            <Flame size={12} className="text-orange-400 fill-orange-400" />
                            <span className="text-[10px] font-black italic">{Number(followCount).toLocaleString('id-ID')}</span>
                        </div>
                    </div>

                    <div className="w-10 h-10 bg-rose-600 text-white rounded-2xl flex items-center justify-center shadow-lg shadow-rose-600/40 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                        <Play size={16} fill="currentColor" className="ml-0.5" />
                    </div>
                </div>
            </div>

            {/* --- 2. INFORMATION AREA --- */}
            <div className="px-4 pt-5 pb-6 space-y-4">
                <div className="space-y-1">
                    {/* TITLE: Sekarang line-clamp-2 dan min-height 2 baris */}
                    <div className="min-h-[2.2rem] md:min-h-[2.6rem]">
                        <h3 className="text-[14px] md:text-[16px] font-black uppercase italic leading-[1.1] text-zinc-900 tracking-tighter line-clamp-2 group-hover:text-rose-600 transition-colors">
                            {title}
                        </h3>
                    </div>
                    <div className="flex items-center gap-2 text-zinc-400 mt-1">
                        <Zap size={10} className="fill-rose-500 text-rose-500" />
                        <span className="text-[9px] font-bold uppercase tracking-widest">{totalEpisodes} Episodes</span>
                    </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5">
                    {/* Tambahkan tipe data string pada variabel t */}
                    {tags.filter((t: string) => t).slice(0, 2).map((tag: string, i: number) => (
                        <span
                            key={i}
                            className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1 bg-rose-50 text-rose-500 rounded-lg border border-rose-100"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <div className="pt-4 border-t border-dotted border-zinc-200 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                        <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest italic">Freereels Org</span>
                    </div>
                    <Star size={12} className="text-amber-400 fill-amber-400" />
                </div>
            </div>
        </Link>
    )
}