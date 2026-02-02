"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Flame, Star, Crown } from "lucide-react"

export default function FlickreelsRankCard({
    drama,
    index,
    badge
}: {
    drama: any,
    index: number,
    badge: "Hot" | "Trending" | "New"
}) {
    const id = drama?.playlet_id
    const title = drama?.title || "Premium Drama"
    const hotNum = drama?.hot_num || "0"
    const rankOrder = index + 1
    const rawCover = drama?.cover;

    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80`
        : null;

    // Warna aksen berdasarkan kategori
    const accentColor = badge === "Hot" ? "text-rose-500" : badge === "Trending" ? "text-indigo-500" : "text-emerald-500";

    return (
        <Link
            href={`/drama/china/channel/melolo/detail/${id}`}
            className="group relative flex items-center gap-4 w-full active:scale-[0.98] transition-all duration-300"
        >
            {/* 1. RANK NUMBER (The Signature) */}
            <div className="shrink-0 w-8 flex justify-center">
                <span className={`text-4xl font-black italic tracking-tighter opacity-20 group-hover:opacity-100 transition-opacity ${accentColor}`}>
                    {rankOrder}
                </span>
            </div>

            {/* 2. THUMBNAIL */}
            <div className="relative w-20 aspect-[3/4] overflow-hidden rounded-2xl bg-zinc-100 shadow-lg border border-white transition-transform group-hover:scale-105 duration-500">
                {safeCover && (
                    <Image src={safeCover} alt={title} fill className="object-cover" unoptimized referrerPolicy="no-referrer" />
                )}
                {/* Overlay Play on Hover */}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={16} fill="white" className="text-white ml-1" />
                </div>
            </div>

            {/* 3. INFO */}
            <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-black uppercase italic leading-tight text-zinc-900 tracking-tight line-clamp-2 group-hover:text-rose-600 transition-colors">
                    {title}
                </h4>
                <div className="flex items-center gap-3 mt-2">
                    <div className="flex items-center gap-1">
                        <Flame size={10} className={accentColor} fill="currentColor" />
                        <span className="text-[10px] font-black italic text-zinc-400">{hotNum}</span>
                    </div>
                    {rankOrder === 1 && (
                        <Crown size={10} className="text-amber-500" fill="currentColor" />
                    )}
                </div>
            </div>
        </Link>
    )
}