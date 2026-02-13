import Link from 'next/link'
import Image from 'next/image'
import { Play, Star, Zap, Clock, Tv } from 'lucide-react'

interface AnimeCardProps {
    anime: {
        id: string;
        judul: string;
        cover: string;
        lastch: string;
        lastup: string;
        url: string;
        score: string;
        status: string;
        total_episode: number;
        studio: string;
    }
}

export default function AnimeCardRecomended({ anime }: AnimeCardProps) {
    const { judul, cover, lastch, lastup, url, score, status, total_episode, studio } = anime;

    return (
        <Link
            href={`/anime/${url}`}
            className="group relative flex flex-col w-full bg-[#080809] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_50px_rgba(249,115,22,0.15)] border border-white/5 h-full active:scale-[0.98]"
        >
            {/* 1. HERO IMAGE SECTION (Optimized Aspect for Mobile) */}
            <div className="relative aspect-[3/4.2] overflow-hidden m-1.5 md:m-2 rounded-t-[1.8rem] md:rounded-t-[2.2rem] rounded-b-none bg-zinc-900">
                <Image
                    src={cover}
                    alt={`Nonton ${judul} Sub Indo`}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110 md:group-hover:rotate-1"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    priority
                />

                {/* Overlay Gradient - Stronger on mobile for readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-[#080809]/20 to-transparent z-10" />

                {/* TOP BADGE CONTAINER */}
                <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 flex items-start justify-between z-20">
                    {/* KIRI: Status & Studio */}
                    <div className="flex flex-col gap-1 md:gap-1.5">
                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-orange-600 text-white shadow-lg w-fit">
                            <Zap size={10} fill="currentColor" className="shrink-0" />
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-tighter">
                                {lastup}
                            </span>
                        </div>
                        <div className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[9px] md:text-[10px] font-black text-white/70 uppercase w-fit tracking-tighter">
                            {studio}
                        </div>
                    </div>

                    {/* KANAN: Score */}
                    <div className="flex flex-col items-center gap-0.5 p-1.5 min-w-[32px] md:min-w-[36px] rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 shadow-2xl">
                        <Star size={12} className="text-orange-500 shrink-0" fill="currentColor" />
                        <span className="text-[10px] md:text-[11px] font-black text-white leading-none">{score}</span>
                    </div>
                </div>

                {/* Bottom Info Row (Floating over image) */}
                <div className="absolute bottom-3 md:bottom-4 left-3 md:left-4 right-3 md:right-4 z-20 flex flex-col gap-2">
                    <div className="flex items-center gap-2 flex-wrap">
                        <div className="px-2.5 py-1 rounded-lg bg-white text-black text-[9px] md:text-[10px] font-black uppercase italic flex items-center gap-1.5 shadow-xl">
                            <div className="w-1.5 h-1.5 rounded-full bg-orange-600 animate-pulse shrink-0" />
                            {lastch || `Ep ${total_episode}`}
                        </div>
                        <div className="px-2.5 py-1 rounded-lg bg-orange-600/20 backdrop-blur-md border border-orange-500/30 text-[9px] md:text-[10px] font-black text-orange-400 uppercase">
                            {status}
                        </div>
                    </div>

                    <h3 className="text-base md:text-xl font-black text-white leading-tight uppercase italic tracking-tighter line-clamp-2 drop-shadow-2xl group-hover:text-orange-400 transition-colors">
                        {judul}
                    </h3>
                </div>
            </div>

            {/* 2. FOOTER INFO (Optimized for small screens) */}
            <div className="px-4 md:px-6 pb-5 md:pb-6 pt-1 space-y-4 relative z-20">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="flex flex-col">
                            <span className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1 flex items-center gap-1">
                                <Tv size={9} /> Type
                            </span>
                            <span className="text-[10px] md:text-[11px] font-bold text-zinc-300 uppercase">Series</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[8px] md:text-[9px] font-black text-zinc-600 uppercase tracking-widest leading-none mb-1 flex items-center gap-1">
                                <Clock size={9} /> Rate
                            </span>
                            <span className="text-[10px] md:text-[11px] font-bold text-zinc-300 uppercase">13+</span>
                        </div>
                    </div>

                    {/* Action Icon - Larger on mobile for easier touch */}
                    <div className="w-11 h-11 md:w-10 md:h-10 rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-orange-600 group-hover:border-orange-500 transition-all duration-500 shadow-lg">
                        <Play size={20} fill="white" className="text-white ml-0.5" />
                    </div>
                </div>
            </div>

            {/* Indicator - Always visible on mobile if you want, or just hover on desktop */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </Link>
    )
}