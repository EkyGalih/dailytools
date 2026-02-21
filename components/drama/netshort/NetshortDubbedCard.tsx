"use client"

import Link from "next/link"
import Image from "next/image"
import { Play, Mic2, Headset, Star, Sparkles, Volume2 } from "lucide-react"

export default function NetshortDubbedCard({ theater }: { theater: any }) {
    const id = theater?.shortPlayId
    const title = theater?.shortPlayName || "Dubbed Series"
    const rawCover = theater?.shortPlayCover
    const score = theater?.heatScoreShow || "0.0"
    const labels = theater?.labelArray || []
    
    // SEO & Image Optimization
    const safeCover = rawCover
        ? `https://wsrv.nl/?url=${encodeURIComponent(rawCover)}&output=webp&q=80&w=400&h=540&fit=cover`
        : null

    if (!id) return null

    return (
        <Link
            href={`/drama/china/channel/netshort/detail/${id}`}
            title={`Nonton ${title} Sulih Suara Bahasa Indonesia`}
            className="group relative flex flex-col w-full active:scale-95 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
        >
            {/* --- MEDIA BOX (CINEMATIC) --- */}
            <div className="relative aspect-[3/4.2] overflow-hidden rounded-[2rem] md:rounded-[2.5rem] bg-zinc-950 shadow-lg border border-white/5">
                {safeCover ? (
                    <Image
                        src={safeCover}
                        alt={`${title} Dubbing Indonesia - Tamanto`}
                        fill
                        className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-90 group-hover:opacity-100"
                        unoptimized
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-[10px] font-black text-zinc-800">NO COVER</div>
                )}

                {/* GRADIENT OVERLAYS */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
                <div className="absolute inset-0 bg-gradient-to-tr from-indigo-600/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                {/* --- AUDIO BADGE (TOP LEFT) --- */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 bg-indigo-600/90 backdrop-blur-md rounded-2xl shadow-xl shadow-indigo-600/20 border border-indigo-400/50">
                        <Mic2 size={10} className="text-white fill-white" />
                        <span className="text-[9px] font-black text-white uppercase italic tracking-tighter">Dub Indo</span>
                    </div>
                </div>

                {/* --- RATING BADGE (TOP RIGHT) --- */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/40 backdrop-blur-md rounded-xl border border-white/10">
                        <Star size={10} className="text-amber-400 fill-amber-400" />
                        <span className="text-[10px] font-black text-white italic">{score}</span>
                    </div>
                </div>

                {/* --- HOVER SOUND WAVE ANIMATION --- */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <div className="relative flex items-center justify-center">
                        {/* Bulatan berdenyut ala suara */}
                        <div className="absolute w-20 h-20 bg-indigo-500/20 rounded-full animate-ping" />
                        <div className="w-14 h-14 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-2xl relative z-10">
                            <Volume2 size={24} className="animate-pulse" />
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM TAGS OVERLAY --- */}
                <div className="absolute bottom-4 left-4 right-4 z-20">
                    <div className="flex flex-wrap gap-1.5 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-500">
                        {labels.slice(0, 2).map((label: string) => (
                            <span key={label} className="px-2 py-0.5 bg-indigo-500/20 backdrop-blur-md text-indigo-200 text-[8px] font-black uppercase tracking-widest rounded-lg border border-indigo-500/30">
                                {label}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            {/* --- TEXTUAL INFO --- */}
            <div className="mt-4 px-3 space-y-2">
                <div className="flex items-center gap-2">
                    <Headset size={12} className="text-indigo-500" />
                    <span className="text-[9px] font-black text-indigo-500 uppercase tracking-[0.2em] italic">Audio Experience</span>
                </div>

                <h3 className="text-[15px] md:text-[16px] font-black leading-tight text-zinc-900 line-clamp-2 uppercase italic tracking-tighter group-hover:text-indigo-600 transition-colors">
                    {title}
                </h3>

                <div className="flex items-center justify-between pt-2 border-t border-zinc-100">
                    <div className="flex items-center gap-1.5">
                        <Sparkles size={10} className="text-indigo-400" />
                        <span className="text-[9px] font-bold text-zinc-400 uppercase">Premium Sulih Suara</span>
                    </div>
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(79,70,229,0.8)]" />
                </div>
            </div>
        </Link>
    )
}