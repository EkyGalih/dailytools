import Link from "next/link"
import Image from "next/image"
import { Sparkles, Eye, Zap, ArrowUpRight } from "lucide-react"

export default function ManhwaRecommendedCard({ manhwa }: { manhwa: any }) {
    // Helper untuk format viewers (4.700.000 -> 4.7M)
    const formatViewers = (num: number) => {
        if (!num) return "0";
        return num >= 1000000
            ? (num / 1000000).toFixed(1) + 'M'
            : num.toLocaleString('id-ID');
    };

    return (
        <Link
            href={`/komik/manhwa/detail/${manhwa.endpoint}`}
            title={`Baca Manhwa ${manhwa.title} Sub Indo`}
            className="group relative flex flex-col w-full overflow-hidden rounded-[2.5rem] bg-[#070708] border border-white/5 hover:border-cyan-500/50 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.8)] h-full"
        >
            {/* ✨ Neon Portal Glow Hover (Top-Down) */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.15),transparent_70%)] pointer-events-none" />

            {/* 1. COVER IMAGE SECTION (Webtoon Ratio) */}
            <div className="relative aspect-[3/4.5] overflow-hidden m-2 rounded-[2rem]">
                <Image
                    src={manhwa.thumbnail}
                    alt={`Cover Manhwa ${manhwa.title}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1"
                />

                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-transparent to-transparent opacity-90" />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />

                {/* Badge: Manhwa Pick (Top Left) */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-950/40 backdrop-blur-xl border border-cyan-400/30 shadow-lg shadow-cyan-900/20">
                        <Sparkles size={10} className="text-cyan-400 animate-pulse" fill="currentColor" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-cyan-300">
                            Manhwa Pick
                        </span>
                    </div>
                </div>

                {/* Badge: Chapter (Bottom Right) */}
                <div className="absolute bottom-4 right-4 z-20">
                    <div className="px-3 py-1.5 rounded-xl bg-zinc-950/80 backdrop-blur-md border border-white/10 flex items-center gap-2 group-hover:border-cyan-500/50 transition-all">
                        <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]" />
                        <span className="text-[10px] font-black text-white uppercase italic tracking-tighter">
                            {manhwa.newest_chapter}
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. INFO CONTENT AREA */}
            <div className="px-5 pb-6 pt-2 space-y-4">
                {/* Title dengan Webtoon Style Typography */}
                <h3 className="text-sm md:text-base font-black uppercase italic tracking-tighter text-zinc-100 group-hover:text-cyan-300 transition-colors line-clamp-1">
                    {manhwa.title}
                </h3>

                {/* Meta Row: Views & Action */}
                <div className="flex items-center justify-between pt-4 border-t border-white/5">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20">
                            <Eye size={14} className="text-cyan-400" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[11px] font-black text-white tracking-tight leading-none">
                                {formatViewers(manhwa.viewers)}
                            </span>
                            <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest">
                                Readers
                            </span>
                        </div>
                    </div>

                    {/* Futuristic Action Button */}
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cyan-600/20 to-purple-600/10 border border-white/10 flex items-center justify-center group-hover:scale-110 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-500">
                        <ArrowUpRight size={18} className="text-cyan-400 group-hover:text-white transition-transform group-hover:rotate-12" />
                    </div>
                </div>
            </div>

            {/* 3. Bottom Neon Line Accent */}
            <div className="absolute bottom-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            {/* SEO Optimization: Text Deskripsi Tersembunyi */}
            <span className="sr-only">Baca Manhwa {manhwa.title} terbaru secara gratis.</span>
        </Link>
    )
}