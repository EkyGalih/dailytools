"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Star, Zap, ChevronRight } from "lucide-react"

export default function FlickreelsRelatedDramas({ dramas, currentId }: { dramas: any[], currentId: string }) {
    // Filter drama yang sedang ditonton
    const filtered = dramas.filter(d => (d.shortPlayId || d.id) !== currentId).slice(0, 6)
    const cleanTitle = (title: string) => title?.replace(/<\/?[^>]+(>|$)/g, "") || "";

    if (filtered.length === 0) return null

    return (
        <section className="space-y-10 py-12">
            {/* --- HEADER: REELS STYLE --- */}
            <div className="flex items-center justify-between px-2 md:px-0">
                <div className="flex items-center gap-4">
                    <div className="h-10 w-1.5 bg-indigo-600 rounded-full shadow-[0_0_15px_rgba(79,70,229,0.5)]" />
                    <div>
                        <h3 className="text-3xl md:text-5xl font-black text-zinc-950 italic uppercase tracking-tighter leading-none">
                            Next <span className="text-indigo-600">Reels</span>
                        </h3>
                        <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mt-1 ml-0.5">
                            Discover More Stories
                        </p>
                    </div>
                </div>
                <Link href="/drama/china/channel/flickreels" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-indigo-600 transition-all bg-zinc-50 px-4 py-2 rounded-full border border-zinc-100">
                    Explore <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* --- GRID: MODERN REELS CARD --- */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
                {filtered.map((item, index) => {
                    // Gabungkan id dengan index untuk menjamin keunikan key
                    const uniqueKey = item.playlet_id || item.id || `flick-${index}`;
                    const id = item.playlet_id || item.id;
                    const name = item.shortPlayName || item.title;
                    const cover = item.shortPlayCover || item.cover;

                    return (
                        <Link
                            key={uniqueKey} // Pake uniqueKey di sini
                            href={`/drama/china/channel/flickreels/detail/${id}`}
                            className="group relative flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-3 duration-500"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            {/* POSTER: FLICK STYLE */}
                            <div className="relative aspect-[3/4.5] rounded-[1.8rem] md:rounded-[2.2rem] overflow-hidden bg-zinc-900 shadow-lg transition-all duration-500 group-hover:shadow-indigo-500/20 group-hover:-translate-y-2 group-hover:ring-2 ring-indigo-500/50 ring-offset-2 ring-offset-white">
                                <Image
                                    src={cover}
                                    alt={cleanTitle(name)}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                    unoptimized
                                />

                                {/* Overlay: Dark Gradient */}
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                                {/* Play Button: Bottom Left Style */}
                                <div className="absolute bottom-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center shadow-xl">
                                        <Play size={18} fill="white" className="text-white ml-0.5" />
                                    </div>
                                </div>

                                {/* Badge: Zap/Energy Style */}
                                <div className="absolute top-3 right-3 px-2 py-1 bg-white/10 backdrop-blur-md rounded-lg border border-white/20">
                                    <div className="flex items-center gap-1">
                                        <Zap size={10} className="text-indigo-400 fill-indigo-400" />
                                        <span className="text-[8px] font-black text-white uppercase tracking-tighter">HD</span>
                                    </div>
                                </div>
                            </div>

                            {/* INFO: CLEAN & BOLD */}
                            <div className="px-1 space-y-1.5">
                                <h4 className="text-xs md:text-sm font-black text-zinc-900 leading-tight line-clamp-2 uppercase italic tracking-tighter group-hover:text-indigo-600 transition-colors">
                                    {cleanTitle(name)}
                                </h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                        <Star size={10} fill="#fbbf24" className="text-amber-400" />
                                        <span className="text-[10px] font-black text-zinc-400">4.8</span>
                                    </div>
                                    <span className="text-[8px] font-black text-zinc-300 uppercase tracking-widest bg-zinc-50 px-1.5 py-0.5 rounded border border-zinc-100">
                                        Short Play
                                    </span>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}