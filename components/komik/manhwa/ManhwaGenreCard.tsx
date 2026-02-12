// components/komik/manhua/ManhwaGenreCard.tsx
import Link from "next/link"
import { Eye, Zap, ChevronRight, Sparkles } from "lucide-react"
import Image from "next/image";

export default function ManhwaGenreCard({ genre }: { genre: any }) {
    if (!genre) return null;
    const views = genre.views_info?.split(' • ')[0] || "0";

    return (
        <Link
            href={`/komik/manhwa/detail/${genre.endpoint}`}
            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-[#020202] border border-white/10 hover:border-cyan-400 transition-all duration-700 shadow-2xl h-full"
        >
            {/* 🌌 Background Neon Aura */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1/2 bg-cyan-500/10 blur-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="relative aspect-[3/4.5] overflow-hidden m-2 rounded-[2.2rem] bg-zinc-900 border border-white/5">
                <Image
                    src={genre.thumbnail}
                    alt={genre.title}
                    fill
                    className="object-cover object-top transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 768px) 100vw, 33vw"
                />

                {/* Cyber Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-black/20 z-10" />

                {/* Neon Scanline Effect */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,255,255,0.05)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] pointer-events-none z-20" />

                {/* Top Badges: Neon Glass */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-30">
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-500 text-black text-[10px] font-black uppercase tracking-widest shadow-[0_0_20px_rgba(6,182,212,0.6)]">
                        <Zap size={12} fill="currentColor" />
                        {genre.type}
                    </div>

                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-cyan-400/50 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.2)]">
                        <Sparkles size={12} className="animate-pulse" />
                        <span className="text-[10px] font-black uppercase tracking-widest">
                            {genre.latest_chapter?.title || 'NEW'}
                        </span>
                    </div>
                </div>

                {/* Bottom Title: Floating Neon */}
                <div className="absolute bottom-6 left-6 right-6 z-30">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="h-[2px] w-8 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full"></div>
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]">
                            {genre.genre}
                        </span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-black text-white leading-none uppercase italic tracking-tighter group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-purple-300 transition-all duration-500">
                        {genre.title}
                    </h3>
                </div>
            </div>

            {/* AREA KONTEN BAWAH: Ultra Clean */}
            <div className="px-7 pb-8 pt-2 flex flex-col flex-grow relative z-30">
                <p className="text-[12px] text-zinc-500 line-clamp-2 mb-6 font-bold leading-relaxed tracking-wide">
                    {genre.description}
                </p>

                <div className="mt-auto flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col">
                            <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest">Readers</span>
                            <div className="flex items-center gap-1.5">
                                <Eye size={14} className="text-cyan-500" />
                                <span className="text-xs font-black text-zinc-200 uppercase tracking-tighter">{views}</span>
                            </div>
                        </div>
                    </div>

                    {/* Neon Action Button */}
                    <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center group-hover:bg-cyan-500 group-hover:border-cyan-400 group-hover:shadow-[0_0_30px_rgba(6,182,212,0.5)] transition-all duration-500 group-hover:-rotate-12">
                        <ChevronRight size={24} className="text-zinc-600 group-hover:text-black transition-colors" />
                    </div>
                </div>
            </div>

            {/* Bottom Neon Strip */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500 group-hover:animate-[shimmer_2s_infinite_linear]"></div>
        </Link>
    )
}