"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Flame, Star, Zap } from "lucide-react"

export default function NetshortTheatersCard({ theater }: { theater: any }) {
    // MAPPING DATA SESUAI JSON NETSHORT
    const id = theater?.shortPlayId
    const title = theater?.shortPlayName || "Premium Drama"
    const rawCover = theater?.shortPlayCover;
    const score = theater?.heatScoreShow || "0.0"
    const labels = theater?.labelArray || []

    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80`
        : null;

    if (!id) return null;

    return (
        <Link
            href={`/drama/china/channel/freereels/detail/${id}`}
            className="group relative flex flex-col w-full active:scale-95 transition-all duration-500"
        >
            {/* --- MEDIA BOX --- */}
            <div className="relative aspect-[3/4.2] overflow-hidden rounded-[1.8rem] md:rounded-[2.2rem] bg-zinc-900 shadow-xl border border-white/5">
                {safeCover ? (
                    <Image
                        src={safeCover}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                        unoptimized
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-700">NO POSTER</div>
                )}

                {/* GRADIENT OVERLAYS */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80" />

                {/* TOP BADGE: HEAT SCORE */}
                <div className="absolute top-3 right-3 z-20">
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                        <Flame size={10} className="text-orange-500 fill-orange-500" />
                        <span className="text-[10px] font-black text-white italic">{score}</span>
                    </div>
                </div>

                {/* BOTTOM INFO: LABELS (Only 1 for clean UI) */}
                <div className="absolute bottom-4 left-4 z-20 space-y-2">
                    {labels[0] && (
                        <span className="inline-block px-2 py-0.5 bg-rose-600 text-white text-[8px] font-black uppercase tracking-widest rounded-md italic">
                            {labels[0]}
                        </span>
                    )}
                </div>

                {/* HOVER PLAY OVERLAY */}
                <div className="absolute inset-0 flex items-center justify-center bg-rose-600/10 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="w-12 h-12 bg-white text-rose-600 rounded-full flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500">
                        <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                </div>
            </div>

            {/* --- TEXT INFO --- */}
            <div className="mt-4 px-2 space-y-1">
                <h3 className="text-[14px] md:text-[15px] font-black leading-[1.2] text-zinc-900 line-clamp-2 uppercase italic tracking-tighter group-hover:text-rose-600 transition-colors">
                    {title}
                </h3>
                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1 opacity-50">
                        <Star size={10} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-bold text-zinc-500 italic">Editor's Choice</span>
                    </div>
                </div>
            </div>
        </Link>
    )
}