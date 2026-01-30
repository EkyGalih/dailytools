import Image from 'next/image'
import Link from 'next/link'
import { Play, Flame} from 'lucide-react'

export type ReelShortItem = {
    bookId: string
    title: string
    cover: string
    totalEpisodes?: number
    themes?: string[]
    hot?: number
}

export default function ReelShortCard({ item }: { item: ReelShortItem }) {
    const tags = item.themes?.slice(0, 2) || []

    return (
        <Link
            href={`/drama/china/channel/reelshort/detail/${item.bookId}`}
            className="
                group relative flex flex-col bg-white 
                rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden transition-all duration-500
                border border-zinc-100 
                hover:border-purple-200 
                hover:shadow-[0_20px_40px_-10px_rgba(147,51,234,0.12)]
            "
        >
            {/* 1. POSTER WRAPPER */}
            <div className="relative aspect-[3/4] overflow-hidden m-1.5 md:m-2.5 rounded-[1.2rem] md:rounded-[2rem] bg-zinc-50">
                <Image
                    src={item.cover}
                    alt={`Nonton ${item.title}`}
                    fill
                    sizes="(max-width: 640px) 50vw, 240px"
                    className="object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
                />

                {/* Hide Play Overlay on Mobile (Touch) */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl">
                        <Play className="w-4 h-4 text-purple-600 fill-current ml-1" />
                    </div>
                </div>

                {/* Hot Badge (Smaller on Mobile) */}
                {item.hot && (
                    <div className="absolute top-2 left-2 md:top-3 md:left-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-1.5 py-0.5 md:px-2.5 md:py-1 shadow-sm border border-white/20">
                        <Flame className="w-2.5 h-2.5 md:w-3 md:h-3 text-orange-500 fill-current" />
                        <span className="text-[8px] md:text-[10px] font-black text-zinc-900 tracking-tighter">
                            {item.hot > 1000 ? `${Math.floor(item.hot / 1000)}K` : item.hot}
                        </span>
                    </div>
                )}
            </div>

            {/* 2. INFO SECTION */}
            <div className="p-3 pt-1 md:p-5 md:pt-2 flex flex-col flex-1">
                <h3 className="font-black text-xs md:text-base leading-tight text-zinc-900 line-clamp-2 italic uppercase tracking-tighter group-hover:text-purple-600 transition-colors">
                    {item.title}
                </h3>

                {/* SINOPSIS: Hide on mobile to save vertical space */}
                <p className="mt-2 text-[10px] md:text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-medium hidden md:block">
                    Drama viral bertema {item.themes?.join(', ') || 'romansa & konflik'}.
                </p>

                {/* TAGS (GENRE) */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                        {tags.map((t) => (
                            <span key={t} className="px-1.5 py-0.5 rounded-md bg-zinc-100 text-[8px] md:text-[9px] font-black text-zinc-400 uppercase tracking-widest group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                                #{t}
                            </span>
                        ))}
                    </div>
                )}

                <div className="mt-auto pt-3 flex items-center justify-between border-t border-zinc-50 md:border-none">
                    <span className="text-[9px] font-black text-purple-500 uppercase tracking-widest">{item.totalEpisodes || 'Full'} EP</span>
                    <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                        <Play className="w-2 md:w-2.5 h-2 md:h-2.5 text-zinc-400 group-hover:text-white fill-current" />
                    </div>
                </div>
            </div>
        </Link>
    )
}