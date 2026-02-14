import Image from "next/image"
import Link from "next/link"
import { Star, Eye, Zap } from "lucide-react"

export default function KomikLatestMiniCard({ manga }: any) {
    const format = manga.taxonomy?.Format?.[0]?.name ?? "Komik"
    
    // Logic warna aksen berdasarkan format
    const accentColor = format.toLowerCase() === 'manhwa' 
        ? 'text-cyan-400' 
        : format.toLowerCase() === 'manhua' 
        ? 'text-emerald-400' 
        : 'text-red-500';

    return (
        <Link
            href={`/komik/${manga.manga_id}`}
            className="group relative flex gap-4 bg-[#0c0c0e]/50 hover:bg-[#121214] transition-all duration-300 p-2.5 rounded-[1.5rem] border border-white/5 hover:border-orange-500/30 shadow-sm"
        >
            {/* 1. COVER (Small Square-ish Portrait) */}
            <div className="relative w-16 h-20 shrink-0 overflow-hidden rounded-[1.1rem] bg-zinc-900 shadow-lg">
                <Image
                    src={manga.cover_image_url}
                    alt={manga.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="64px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                
                {/* Micro Rating on Image */}
                <div className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded-md bg-black/60 backdrop-blur-md text-[8px] font-black text-yellow-500 flex items-center gap-0.5">
                    <Star size={8} fill="currentColor" />
                    {manga.user_rate || '0'}
                </div>
            </div>

            {/* 2. CONTENT */}
            <div className="flex flex-col justify-between flex-1 min-w-0 py-1">
                <div>
                    <h4 className="text-[11px] font-black uppercase italic tracking-tighter leading-tight line-clamp-2 text-zinc-200 group-hover:text-orange-500 transition-colors">
                        {manga.title}
                    </h4>

                    <div className="flex items-center gap-2 mt-1.5">
                        <span className={`text-[8px] font-black uppercase tracking-widest ${accentColor}`}>
                            {format}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-zinc-700" />
                        <span className="text-[9px] font-bold text-zinc-500 italic">
                            {manga.country_id || 'Global'}
                        </span>
                    </div>
                </div>

                {/* BOTTOM INFO */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="px-2 py-0.5 rounded-lg bg-orange-600/10 border border-orange-500/20 text-[9px] font-black text-orange-500 italic uppercase shadow-sm">
                        CH. {manga.latest_chapter_number}
                    </div>

                    <div className="flex items-center gap-2 text-zinc-600">
                        <Eye size={10} />
                        <span className="text-[9px] font-bold tracking-tighter uppercase">
                            {manga.view_count > 1000000
                                ? (manga.view_count / 1000000).toFixed(1) + "M"
                                : (manga.view_count ?? 0).toLocaleString("id-ID")}
                        </span>
                    </div>
                </div>
            </div>

            {/* Hover Accent Line */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[2px] h-0 group-hover:h-1/2 bg-orange-600 transition-all duration-300 rounded-full" />
        </Link>
    )
}