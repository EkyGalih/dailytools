"use client"

import Image from "next/image"
import Link from "next/link"
import { Play, Star, Flame, ChevronRight, Sparkles } from "lucide-react"

export default function NetshortRelatedDramas({ dramas, currentId }: { dramas: any[], currentId: string }) {
    // Filter drama yang sedang ditonton agar tidak duplikat
    const filtered = dramas.filter(d => d.shortPlayId !== currentId).slice(0, 6)

    if (filtered.length === 0) return null

    return (
        <section className="space-y-10 py-10 border-t border-zinc-100">
            <div className="flex items-end justify-between px-2 md:px-0">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 text-rose-600">
                        <Sparkles size={16} fill="currentColor" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em]">Rekomendasi</span>
                    </div>
                    <h3 className="text-3xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-none">
                        Drama Serupa
                    </h3>
                </div>
                <Link href="/drama/china/channel/netshort" className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-rose-600 transition-all">
                    Lihat Semua <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
            </div>

            {/* Grid System */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-5 md:gap-8">
                {filtered.map((item) => (
                    <Link 
                        key={item.shortPlayId} 
                        href={`/drama/china/channel/netshort/detail/${item.shortPlayId}`}
                        className="group flex flex-col gap-4"
                    >
                        {/* Poster Card with Advanced Hover */}
                        <div className="relative aspect-[3/4.2] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden bg-zinc-100 border border-zinc-100 shadow-sm transition-all duration-500 group-hover:shadow-[0_30px_60px_-15px_rgba(225,29,72,0.3)] group-hover:-translate-y-3">
                            <Image
                                src={item.shortPlayCover}
                                alt={item.shortPlayName}
                                fill
                                className="object-cover transition-transform duration-1000 group-hover:scale-110"
                                unoptimized
                            />
                            
                            {/* Cinematic Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                            
                            {/* Play Button Center */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 scale-75 group-hover:scale-100">
                                <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-2xl">
                                    <Play size={24} fill="white" className="text-white ml-1" />
                                </div>
                            </div>

                            {/* HOT Badge (Top Left) */}
                            <div className="absolute top-4 left-4 px-2.5 py-1 bg-rose-600 backdrop-blur-md rounded-xl flex items-center gap-1 shadow-lg shadow-rose-600/30">
                                <Flame size={12} fill="white" className="text-white animate-pulse" />
                                <span className="text-[9px] font-black text-white uppercase italic">HOT</span>
                            </div>
                            
                            {/* Popularity Info (Bottom Center - Only Hover) */}
                            <div className="absolute bottom-4 left-0 right-0 px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                                <p className="text-[8px] font-black text-white/80 uppercase tracking-widest leading-none">
                                    {item.starMessage || 'Trending Now'}
                                </p>
                            </div>
                        </div>

                        {/* Text Info - Premium Typography */}
                        <div className="px-2 space-y-1.5">
                            <h4 className="text-sm md:text-base font-black text-zinc-900 leading-tight line-clamp-2 uppercase italic tracking-tighter group-hover:text-rose-600 transition-colors">
                                {item.shortPlayName}
                            </h4>
                            <div className="flex items-center gap-2 text-zinc-400">
                                <div className="flex items-center gap-1">
                                    <Star size={10} fill="#fbbf24" className="text-amber-400" />
                                    <span className="text-[10px] font-black text-zinc-700">4.9</span>
                                </div>
                                <span className="w-1 h-1 bg-zinc-200 rounded-full" />
                                <span className="text-[9px] font-bold uppercase tracking-tighter">
                                    {item.formatHeatScore || '10K'} Heat
                                </span>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </section>
    )
}