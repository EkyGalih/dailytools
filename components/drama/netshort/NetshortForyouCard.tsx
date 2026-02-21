"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Flame, Star, Bookmark, MessageCircle, Zap, ShieldCheck } from "lucide-react"

export default function NetshortForYouGridCard({ drama }: { drama: any }) {
    // Mapping data tambahan dari JSON Netshort yang tadi lu kasih
    const id = drama?.id
    const title = drama?.title || "Premium Short Drama"
    const score = drama?.score || "0.0"
    const tags = drama?.tags || []
    const comments = drama?.commentCount || Math.floor(Math.random() * 100) + 10 // Fallback data
    const isFinished = drama?.finishStatus === 2 // Berdasarkan JSON lu

    const safeCover = `https://wsrv.nl/?url=${encodeURIComponent(drama.cover)}&output=webp&q=80&w=400&h=540&fit=cover`

    if (!id) return null

    return (
        <Link
            href={`/drama/china/channel/netshort/detail/${id}`}
            title={`Nonton Drama ${title} Sub Indo Full Episode`} // SEO: Title attribute untuk accessibility
            className="group relative flex flex-col w-full bg-white rounded-[2rem] md:rounded-[2.5rem] p-2.5 border border-zinc-100 shadow-sm hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.12)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.97]"
        >
            {/* --- 1. MEDIA BOX (Visual Utama) --- */}
            <div className="relative aspect-[3/4.1] overflow-hidden rounded-[1.7rem] md:rounded-[2.2rem] bg-zinc-50">
                <Image
                    src={safeCover}
                    alt={`Poster Drama ${title} Subtitle Indonesia - Tamanto`} // SEO: Alt text yang deskriptif
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    unoptimized
                />

                {/* --- FLOATING TOP BADGES --- */}
                <div className="absolute top-3 left-3 right-3 z-10 flex justify-between items-start">
                    {/* Heat/Popularity Badge */}
                    <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-black/40 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
                        <Flame size={12} className="text-orange-400 fill-orange-400" />
                        <span className="text-[10px] font-black text-white italic tracking-tight">{score}</span>
                    </div>

                    {/* Bookmark Button */}
                    <button className="w-9 h-9 flex items-center justify-center bg-white/10 backdrop-blur-xl rounded-2xl text-white hover:bg-rose-600 hover:scale-110 transition-all border border-white/20">
                        <Bookmark size={16} />
                    </button>
                </div>

                {/* --- CENTER PLAY OVERLAY --- */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 bg-black/20">
                    <div className="w-14 h-14 bg-white/95 text-rose-600 rounded-[1.5rem] flex items-center justify-center shadow-2xl scale-75 group-hover:scale-100 transition-transform duration-500 rotate-12 group-hover:rotate-0">
                        <Play size={28} fill="currentColor" className="ml-1" />
                    </div>
                </div>

                {/* --- BOTTOM OVERLAY INFO --- */}
                <div className="absolute bottom-3 left-3 right-3 z-20 flex flex-col gap-2">
                    {/* Status Badge */}
                    <div className="flex gap-1.5">
                        <span className={`px-2.5 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest border backdrop-blur-md ${isFinished
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30"
                                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            }`}>
                            {isFinished ? "TAMAT" : "ON GOING"}
                        </span>

                        <div className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-xl border border-white/10 text-white flex items-center gap-1">
                            <MessageCircle size={10} className="text-zinc-300" />
                            <span className="text-[9px] font-bold">{comments}</span>
                        </div>
                    </div>
                </div>

                {/* Subtle Gradient Shadow */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
            </div>

            {/* --- 2. TEXTUAL INFO --- */}
            <div className="px-3 pt-4 pb-5 space-y-4">
                <div className="space-y-1.5">
                    {/* SEO: H3 untuk hirarki konten */}
                    <h3 className="text-[15px] md:text-[16px] font-black uppercase italic leading-[1.15] text-zinc-900 tracking-tighter line-clamp-2 min-h-[2.5rem] group-hover:text-rose-600 transition-colors">
                        {title}
                    </h3>

                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1 px-1.5 py-0.5 bg-rose-50 rounded-lg">
                            <Zap size={10} className="text-rose-600 fill-rose-600" />
                            <span className="text-[9px] font-black text-rose-600 uppercase tracking-tight">VIP Access</span>
                        </div>
                        <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                        <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest italic">Melolo Premium</span>
                    </div>
                </div>

                {/* Tags Area */}
                <div className="flex flex-wrap gap-1.5">
                    {tags.filter((t: string) => t).slice(0, 2).map((tag: string, i: number) => (
                        <span
                            key={i}
                            className="text-[8px] font-black uppercase tracking-widest px-2.5 py-1.5 bg-zinc-50 text-zinc-500 rounded-xl border border-zinc-100 group-hover:bg-rose-50 group-hover:text-rose-600 group-hover:border-rose-100 transition-colors"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {/* Card Footer (Trust Element) */}
                <div className="pt-4 border-t border-dotted border-zinc-200 flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                        <ShieldCheck size={12} className="text-emerald-500" />
                        <span className="text-[9px] font-black uppercase text-zinc-400 tracking-widest italic">Verified HD</span>
                    </div>
                    <Star size={12} className="text-amber-400 fill-amber-400 shadow-sm" />
                </div>
            </div>
        </Link>
    )
}