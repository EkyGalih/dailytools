import Link from 'next/link'
import Image from 'next/image'
import { Zap, Play } from 'lucide-react'

interface AnimeCardProps {
    anime: {
        id: string;
        judul: string;
        cover: string;
        lastch: string;
        lastup: string;
        url: string;
        studio?: string;
    }
}

export default function AnimeCard({ anime }: AnimeCardProps) {
    const { judul, cover, lastch, lastup, url } = anime;

    return (
        <Link
            href={`/anime/${url}`}
            title={`Nonton ${judul}`}
            className="group relative flex items-center gap-3 p-2 rounded-2xl bg-zinc-900/30 border border-white/[0.03] hover:border-orange-500/30 hover:bg-zinc-900/60 transition-all duration-300 shadow-sm"
        >
            {/* 1. SMALL THUMBNAIL (LEFT) */}
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                <Image
                    src={cover}
                    alt={judul}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="64px"
                />

                {/* Overlay Play on Hover */}
                <div className="absolute inset-0 bg-orange-600/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play size={12} fill="white" className="text-white" />
                </div>
            </div>

            {/* 2. INFO CONTENT (RIGHT) */}
            <div className="flex flex-col flex-grow min-w-0 pr-2">
                {/* Badge Status - Ultra Small */}
                <div className="flex items-center gap-1.5 mb-1">
                    <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-orange-600 text-white text-[7px] font-black uppercase tracking-tighter shadow-sm">
                        <Zap size={8} fill="currentColor" />
                        {lastup === "Baru di Upload" ? "New" : lastup}
                    </div>
                    <span className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest truncate">
                        {lastch || "Episode Baru"}
                    </span>
                </div>

                {/* Title - Slimmer & Sharp */}
                <h3 className="text-[11px] md:text-[12px] font-black text-zinc-300 group-hover:text-orange-500 transition-colors line-clamp-1 leading-tight uppercase tracking-tight italic">
                    {judul}
                </h3>

                {/* Sub-info */}
                <p className="text-[9px] text-zinc-600 font-bold mt-1 truncate">
                    Tap to Stream Experience →
                </p>
            </div>

            {/* Subtle Indicator */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-zinc-800 group-hover:bg-orange-500 transition-colors" />
        </Link>
    )
}