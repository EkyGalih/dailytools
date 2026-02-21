"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Star, Flame, ChevronRight, Sparkles } from "lucide-react"

export default function NetshortRelatedDramas({ dramas, currentId }: { dramas: any[], currentId: string }) {
    // Filter drama yang sedang ditonton agar tidak duplikat
    const filtered = dramas.filter(d => d.shortPlayId !== currentId).slice(0, 6)

    // Cleaner function untuk HTML tags (em, b, dll)
    const cleanTitle = (title: string) => title?.replace(/<\/?[^>]+(>|$)/g, "") || "";

    if (filtered.length === 0) return null

    return (
        <section className="relative mt-4 space-y-10 py-12 md:py-16 border-t border-zinc-100/50">
            {/* --- HEADER SECTION --- */}
            <div className="flex items-end justify-between px-2 md:px-0">
                <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                        <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-rose-600 shadow-lg shadow-rose-500/20">
                            <Sparkles size={14} className="text-white fill-white" />
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600">
                           Rekomendasi
                        </span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-none">
                        Drama <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-900 via-zinc-500 to-zinc-400">Serupa</span>
                    </h3>
                </div>

                <Link
                    href="/drama/china/channel/netshort"
                    className="group flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-zinc-50 border border-zinc-100 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-zinc-900 hover:text-white hover:border-zinc-900 transition-all duration-500 shadow-sm"
                >
                    Lihat Semua
                    <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* --- GRID SYSTEM --- */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-x-4 gap-y-8 md:gap-x-8 md:gap-y-12">
                {filtered.map((item, index) => (
                    <Link
                        key={item.shortPlayId}
                        href={`/drama/china/channel/netshort/detail/${item.shortPlayId}`}
                        className="group relative flex flex-col gap-5 animate-in fade-in slide-in-from-bottom-4 duration-700"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        {/* --- POSTER CARD --- */}
                        <div className="relative aspect-[3/4.2] rounded-[2.2rem] md:rounded-[2.8rem] overflow-hidden bg-zinc-50 border border-zinc-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.2)] group-hover:-translate-y-4">
                            <Image
                                src={item.shortPlayCover}
                                alt={cleanTitle(item.shortPlayName)}
                                fill
                                className="object-cover transition-transform duration-1000 scale-[1.01] group-hover:scale-110"
                                unoptimized
                            />

                            {/* Cinematic Premium Overlays */}
                            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                            {/* Glass Play Button */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-8 group-hover:translate-y-0 scale-75 group-hover:scale-100">
                                <div className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center border border-white/20 shadow-2xl overflow-hidden group/btn">
                                    <div className="absolute inset-0 bg-white opacity-0 group-hover/btn:opacity-10 transition-opacity" />
                                    <Play size={24} fill="white" className="text-white ml-1.5" />
                                </div>
                            </div>

                            {/* HOT Badge (Floating Style) */}
                            <div className="absolute top-4 left-4 flex items-center gap-1.5 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-2xl shadow-xl transition-transform duration-500 group-hover:scale-110 border border-white/50">
                                <Flame size={12} fill="#f43f5e" className="text-rose-500 animate-pulse" />
                                <span className="text-[10px] font-black text-zinc-900 uppercase italic leading-none">{item.formatHeatScore || '10K'}</span>
                            </div>

                            {/* Hover Popularity Message */}
                            <div className="absolute bottom-6 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0 text-center">
                                <p className="text-[9px] font-black text-white uppercase tracking-[0.2em] leading-none drop-shadow-md">
                                    {item.starMessage || 'Recommended'}
                                </p>
                            </div>
                        </div>

                        {/* --- TEXT INFO --- */}
                        <div className="px-2 space-y-2">
                            <h4 className="text-sm md:text-lg font-black text-zinc-900 leading-[1.3] line-clamp-2 uppercase italic tracking-tighter transition-colors duration-300 group-hover:text-rose-600">
                                {cleanTitle(item.shortPlayName)}
                            </h4>
                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-lg border border-amber-100/50">
                                    <Star size={10} fill="#fbbf24" className="text-amber-500" />
                                    <span className="text-[10px] font-black text-amber-700">4.9</span>
                                </div>
                                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest opacity-60">
                                    Full Series
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}