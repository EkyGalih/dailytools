"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Star } from "lucide-react"

export default function FreereelsAnimeCard({ theater }: { theater: any }) {
    const id = theater?.key
    const title = theater?.title || "Premium Series"
    const episodes = theater?.episode_count || 0
    const rawCover = theater?.cover;

    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80`
        : null;

    if (!id) return null;

    return (
        <Link
            href={`/drama/china/channel/freereels/detail/${id}`}
            className="group relative flex flex-col w-full active:scale-95 transition-transform duration-500"
        >
            {/* THUMBNAIL BOX */}
            <div className="relative aspect-[3/4.5] overflow-hidden rounded-[1.5rem] bg-zinc-200 shadow-sm border border-zinc-100">
                {safeCover ? (
                    <Image
                        src={safeCover}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                        referrerPolicy="no-referrer"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-400">NO COVER</div>
                )}

                {/* EPISODE BADGE (BOTTOM LEFT) */}
                <div className="absolute bottom-3 left-3 z-20">
                    <div className="bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                        <p className="text-[9px] font-black text-white leading-none uppercase tracking-tighter">
                            {episodes} EPISODES
                        </p>
                    </div>
                </div>

                {/* HOVER PLAY ICON */}
                <div className="absolute inset-0 bg-rose-600/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="w-12 h-12 bg-rose-600 rounded-full flex items-center justify-center shadow-xl translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <Play size={20} fill="white" className="text-white ml-1" />
                    </div>
                </div>
            </div>

            {/* INFO AREA */}
            <div className="mt-3 px-1">
                <h3 className="text-[14px] font-black leading-[1.2] text-zinc-900 line-clamp-2 uppercase italic group-hover:text-rose-600 transition-colors">
                    {title}
                </h3>
                <div className="flex items-center gap-1 mt-1 opacity-60">
                    <Star size={10} className="text-amber-500 fill-amber-500" />
                    <span className="text-[10px] font-bold text-zinc-500 italic">Highly Recommended</span>
                </div>
            </div>
        </Link>
    )
}