import Link from "next/link"
import Image from "next/image"
import { Clock, Eye, Zap, Star } from "lucide-react"

export default function ManhwaLatestCard({ manhwa }: { manhwa: any }) {
    // Parsing updated_at untuk memisahkan waktu
    const timeInfo = manhwa.updated_at?.split('|')[0].trim() || "Baru";
    const isColor = manhwa.updated_at?.toLowerCase().includes("berwarna");

    return (
        <Link
            href={`/komik/manga/detail/${manhwa.endpoint}`}
            title={`Baca ${manhwa.title} - ${manhwa.newest_chapter}`}
            className="group relative flex flex-col w-full overflow-hidden rounded-[2.2rem] bg-[#09090b] border border-white/[0.03] hover:border-cyan-500/40 transition-all duration-500 shadow-2xl h-full"
        >
            {/* 1. PORTRAIT IMAGE CONTAINER (Aspek Rasio Panjang) */}
            <div className="relative aspect-[3/4.2] overflow-hidden m-1.5 rounded-[1.8rem] bg-zinc-900">
                {/* Cyan Gradient Overlay - Lebih Gelap di Bawah */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-90" />

                <Image
                    src={manhwa.thumbnail}
                    alt={`Cover ${manhwa.title}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                />

                {/* Top Badges */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-cyan-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg shadow-cyan-600/20">
                        <Zap size={10} fill="currentColor" />
                        {manhwa.type}
                    </div>

                    {isColor && (
                        <div className="px-2 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/10 text-[8px] font-black text-white uppercase tracking-tighter">
                            Color
                        </div>
                    )}
                </div>

                {/* Chapter Info Overlay (Floating Glass) */}
                <div className="absolute bottom-4 left-3 right-3 z-20">
                    <div className="px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-cyan-500/20 flex justify-between items-center group-hover:border-cyan-500/50 transition-colors">
                        <span className="text-[11px] font-black text-cyan-400 uppercase tracking-tighter italic">
                            {manhwa.newest_chapter}
                        </span>
                        <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]"></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. INFO SECTION */}
            <div className="px-5 pb-6 pt-2 flex flex-col flex-grow">
                <h3 className="text-sm md:text-base font-black text-zinc-100 group-hover:text-cyan-400 transition-colors line-clamp-2 uppercase italic tracking-tighter leading-tight mb-4">
                    {manhwa.title}
                </h3>

                {/* Stats Row - Dibuat lebih rapi di bawah */}
                <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5">
                            <Clock size={12} className="text-cyan-600" />
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tight">
                                {timeInfo}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Eye size={12} className="text-cyan-600" />
                            <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tight">
                                {manhwa.views} Views
                            </span>
                        </div>
                    </div>

                    <div className="flex flex-col items-end">
                        <div className="flex items-center gap-1 mb-0.5">
                            <Star size={12} className="text-yellow-500" fill="currentColor" />
                            <span className="text-xs font-black text-zinc-200">9.2</span>
                        </div>
                        <span className="text-[8px] text-zinc-600 font-bold uppercase">Rating</span>
                    </div>
                </div>
            </div>

            {/* Subtle Hover Aura */}
            <div className="absolute inset-0 pointer-events-none border border-cyan-500/0 group-hover:border-cyan-500/10 rounded-[2.2rem] transition-all duration-500" />
        </Link>
    )
}