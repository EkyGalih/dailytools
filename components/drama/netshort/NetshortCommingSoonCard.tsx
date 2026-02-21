"use client"

import Link from "next/link"
import Image from "next/image"
import { Calendar, Users, ChevronRight, Bell, Sparkles } from "lucide-react"

export default function NetshortCommingSoonCard({
    drama,
    index
}: {
    drama: any,
    index: number
}) {
    const id = drama?.shortPlayId
    const title = drama?.shortPlayName || "Upcoming Drama"
    const rawCover = drama?.shortPlayCover
    const reserveNum = drama?.totalReserveNum || "0"
    const labels = drama?.labelArray || []
    const isNew = drama?.isNewLabel

    // Konversi publishTime (timestamp) ke format yang lebih mewah
    const dateObj = drama?.publishTime ? new Date(drama.publishTime) : null
    const formattedDate = dateObj
        ? dateObj.toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })
        : "Coming Soon"

    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80&w=200&h=260&fit=cover`
        : null

    if (!id) return null

    return (
        <Link
            href={`/drama/china/channel/netshort/detail/${id}`}
            title={`Ingatkan saya untuk drama ${title}`}
            className="group relative flex items-center gap-4 p-2.5 rounded-[1.8rem] bg-white border border-zinc-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all duration-500 ease-out active:scale-[0.97]"
        >
            {/* --- 1. COMPACT THUMBNAIL WITH DATE OVERLAY --- */}
            <div className="relative shrink-0 w-20 aspect-[3/4] overflow-hidden rounded-[1.4rem] bg-zinc-100 shadow-sm border border-zinc-200/50">
                {safeCover ? (
                    <Image
                        src={safeCover}
                        alt={`Segera Tayang: ${title}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-zinc-300 italic">SOON</div>
                )}

                {/* Date Glass Badge on Image */}
                <div className="absolute top-1.5 left-1.5 z-10">
                    <div className="px-2 py-1 bg-black/60 backdrop-blur-md rounded-lg border border-white/10 flex flex-col items-center">
                        <span className="text-[7px] font-black text-emerald-400 uppercase leading-none tracking-tighter">FEB</span>
                        <span className="text-[10px] font-black text-white leading-none mt-0.5">{formattedDate.split(' ')[0]}</span>
                    </div>
                </div>

                {/* Animated Shine Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/20 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            </div>

            {/* --- 2. CONTENT INFO --- */}
            <div className="flex-1 min-w-0 space-y-2">
                <div className="space-y-0.5">
                    {isNew && (
                        <div className="flex items-center gap-1 text-[8px] font-black text-emerald-500 uppercase tracking-[0.1em]">
                            <Sparkles size={8} className="fill-emerald-500" />
                            New Release
                        </div>
                    )}
                    <h4 className="text-[13px] font-black leading-tight text-zinc-900 line-clamp-1 italic uppercase tracking-tighter group-hover:text-emerald-600 transition-colors">
                        {title}
                    </h4>
                </div>

                <div className="flex flex-col gap-1.5">
                    {/* Booking Stats with Progress Style */}
                    <div className="flex items-center justify-between pr-2">
                        <div className="flex items-center gap-1.5 text-zinc-500">
                            <Users size={12} className="text-emerald-500" />
                            <span className="text-[10px] font-bold tracking-tight">
                                <span className="text-zinc-900 font-black">{reserveNum}</span> Peminat
                            </span>
                        </div>
                    </div>

                    {/* Progress Bar Mini (Aesthetic Only) */}
                    <div className="h-1 w-full bg-zinc-100 rounded-full overflow-hidden">
                        <div className="h-full bg-emerald-500 w-[65%] rounded-full group-hover:w-[85%] transition-all duration-1000" />
                    </div>
                </div>

                {/* Micro Meta Tags */}
                <div className="flex items-center gap-2">
                    <div className="flex gap-1 overflow-hidden">
                        {labels.slice(0, 1).map((tag: string) => (
                            <span key={tag} className="text-[7px] font-black uppercase tracking-widest px-2 py-0.5 bg-zinc-100 text-zinc-400 rounded-md border border-zinc-200">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <span className="text-[8px] font-bold text-zinc-300 italic">Expected Soon</span>
                </div>
            </div>

            {/* --- 3. NOTIFICATION BUTTON (Right Side) --- */}
            <div className="shrink-0 flex flex-col items-center gap-1">
                <div className="w-10 h-10 rounded-2xl bg-zinc-50 group-hover:bg-emerald-500 flex items-center justify-center text-zinc-400 group-hover:text-white transition-all duration-300 shadow-sm group-hover:shadow-emerald-200 group-hover:-rotate-6">
                    <Bell size={16} strokeWidth={2.5} />
                </div>
                <span className="text-[7px] font-black text-zinc-300 group-hover:text-emerald-500 uppercase tracking-tighter transition-colors">Remind</span>
            </div>
        </Link>
    )
}