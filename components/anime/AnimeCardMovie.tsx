import Link from 'next/link'
import Image from 'next/image'
import { Ticket, Star, Zap, PlayCircle, Calendar } from 'lucide-react'

interface AnimeMovieProps {
    anime: {
        id: number;
        url: string;
        judul: string;
        cover: string;
        lastch?: string;
        lastup: string;
    }
}

export default function AnimeMovieCard({ anime }: AnimeMovieProps) {
    const { judul, cover, lastup, url } = anime;

    return (
        <Link
            href={`/anime/${url}`}
            className="group relative flex flex-col w-full bg-[#080809] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(249,115,22,0.2)] border border-white/5 h-full active:scale-[0.98]"
        >
            {/* 1. CINEMATIC POSTER SECTION (3:4.5 Ratio) */}
            <div className="relative aspect-[3/4.5] overflow-hidden m-1.5 md:m-2 rounded-t-[1.8rem] md:rounded-t-[2.2rem] rounded-b-none bg-zinc-900">
                <Image
                    src={cover}
                    alt={`Nonton ${judul} Sub Indo`}
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 640px) 100vw, 33vw"
                />

                {/* Cyber Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080809] via-transparent to-transparent z-10" />

                {/* TOP BADGE CONTAINER */}
                <div className="absolute top-3 md:top-4 left-3 md:left-4 right-3 md:right-4 flex items-start justify-between z-20">
                    {/* Status Badge */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 text-white shadow-[0_10px_20px_rgba(234,88,12,0.4)]">
                        <Zap size={10} fill="currentColor" className="animate-pulse" />
                        <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest">
                            {lastup}
                        </span>
                    </div>

                    {/* Movie Tag */}
                    <div className="p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-orange-500 shadow-2xl">
                        <Ticket size={14} />
                    </div>
                </div>

                {/* BOTTOM INFO (Floating on Poster) */}
                <div className="absolute bottom-4 left-4 right-4 z-20 space-y-3">
                    <div className="flex items-center gap-2">
                        <div className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-[9px] font-black text-white uppercase flex items-center gap-1.5">
                            <Star size={10} fill="currentColor" className="text-yellow-500" />
                            8.2 Rating
                        </div>
                        <div className="px-3 py-1 rounded-lg bg-orange-600/20 backdrop-blur-md border border-orange-500/30 text-[9px] font-black text-orange-400 uppercase">
                            Movie
                        </div>
                    </div>
                    
                    <h3 className="text-base md:text-xl font-black text-white leading-tight uppercase italic tracking-tighter line-clamp-2 drop-shadow-2xl group-hover:text-orange-400 transition-colors">
                        {judul}
                    </h3>
                </div>
            </div>

            {/* 2. FOOTER SECTION */}
            <div className="px-5 md:px-6 pb-6 pt-2 flex items-center justify-between relative z-20">
                <div className="flex flex-col">
                    <div className="flex items-center gap-1.5 text-zinc-500 mb-1">
                        <Calendar size={10} />
                        <span className="text-[8px] md:text-[9px] font-black uppercase tracking-widest">Release Date</span>
                    </div>
                    <span className="text-[10px] md:text-[11px] font-bold text-zinc-300 uppercase italic">Mar 03, 2023</span>
                </div>

                {/* Modern Play Trigger */}
                <div className="group/btn relative flex items-center justify-center">
                    <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-0 group-hover/btn:opacity-40 transition-opacity" />
                    <PlayCircle 
                        size={36} 
                        strokeWidth={1.5}
                        className="text-zinc-700 group-hover:text-orange-500 transition-all duration-500 relative z-10" 
                    />
                </div>
            </div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-orange-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </Link>
    )
}