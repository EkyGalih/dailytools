"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Flame, Crown, Calendar } from "lucide-react"

export default function FreereelsRankCard({
    drama,
    index,
    badge
}: {
    drama: any,
    index: number,
    badge: "Hot" | "Trending" | "New"
}) {
    const id = drama?.key
    const title = drama?.title || "Untitled Drama"
    const stats = drama?.follow_count || drama?.booking_count || drama?.hot_score || "0"
    const rankOrder = index + 1
    const rawCover = drama?.cover;

    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80`
        : null;

    const accentColor =
        badge === "Hot" ? "text-rose-500" :
            badge === "Trending" ? "text-indigo-500" :
                "text-emerald-500";

    if (!id) return null;

    return (
        <Link
            href={`/drama/china/channel/freereels/detail/${id}`}
            className="group relative flex items-center gap-4 w-full active:scale-[0.98] transition-all duration-300 py-2"
        >
            {/* 1. RANK NUMBER */}
            <div className="shrink-0 w-8 flex justify-center">
                <span className={`text-3xl font-black italic tracking-tighter opacity-30 group-hover:opacity-100 transition-opacity ${accentColor}`}>
                    {rankOrder.toString().padStart(2, '0')}
                </span>
            </div>

            {/* 2. THUMBNAIL */}
            <div className="relative w-16 aspect-[3/4] overflow-hidden rounded-xl bg-zinc-100 shadow-md border border-white/10 transition-transform group-hover:scale-105 duration-500">
                {safeCover && (
                    <Image
                        src={safeCover}
                        alt={title}
                        fill
                        className="object-cover"
                        unoptimized
                        referrerPolicy="no-referrer"
                    />
                )}
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={14} fill="white" className="text-white ml-0.5" />
                </div>
            </div>

            {/* 3. INFO */}
            <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold leading-tight text-zinc-900 line-clamp-2 group-hover:text-rose-600 transition-colors">
                    {title}
                </h4>

                <div className="flex items-center gap-2 mt-1.5">
                    {badge === "New" ? (
                        <div className="flex items-center gap-1">
                            <Calendar size={10} className="text-emerald-500" />
                            <span className="text-[10px] font-bold text-zinc-400">Soon</span>
                        </div>
                    ) : (
                        <div className="flex items-center gap-1">
                            <Flame size={10} className={accentColor} fill="currentColor" />
                            <span className="text-[10px] font-bold text-zinc-400">
                                {Number(stats).toLocaleString('id-ID')}
                            </span>
                        </div>
                    )}

                    {rankOrder === 1 && (
                        <Crown size={10} className="text-amber-500" fill="currentColor" />
                    )}
                </div>
            </div>
        </Link>
    );
}