import Image from 'next/image'
import Link from 'next/link'
import { Play, Flame, BookOpen, Tag } from 'lucide-react'

export type ReelShortItem = {
    bookId: string
    title: string
    cover: string
    totalEpisodes?: number
    themes?: string[]
    hot?: number
}

export default function ReelShortCard({ item }: { item: ReelShortItem }) {
    // Ambil maksimal 2 tema untuk menjaga kebersihan visual
    const tags = item.themes?.slice(0, 2) || []

    return (
        <Link
            href={`/drama/china/channel/reelshort/detail/${item.bookId}`}
            className="
                group relative flex flex-col bg-white 
                rounded-[2.5rem] overflow-hidden transition-all duration-500
                border border-zinc-100 
                hover:border-purple-200 
                hover:shadow-[0_30px_60px_-15px_rgba(147,51,234,0.15)]
            "
        >
            {/* 1. POSTER WRAPPER (Dengan Frame m-2.5) */}
            <div className="relative aspect-[3/4] overflow-hidden m-2.5 rounded-[2rem] bg-zinc-50">
                <Image
                    src={item.cover}
                    alt={`Nonton drama ${item.title} subtitle Indonesia`}
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
                />

                {/* Play Overlay on Hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        <Play className="w-5 h-5 text-purple-600 fill-current ml-1" />
                    </div>
                </div>

                {/* BADGE: HOT (Glassmorphism) */}
                {item.hot && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 shadow-sm border border-white/20">
                        <Flame className="w-3 h-3 text-orange-500 fill-current" />
                        <span className="text-[10px] font-black text-zinc-900 tracking-tighter">
                            {item.hot > 1000 ? `${Math.floor(item.hot / 1000)}K` : item.hot}
                        </span>
                    </div>
                )}

                {/* BADGE: EPISODE (Glassmorphism) */}
                {item.totalEpisodes && (
                    <div className="absolute bottom-3 left-3 flex items-center gap-1.5 rounded-full bg-black/40 backdrop-blur-md px-2.5 py-1 border border-white/10">
                        <Play className="w-2.5 h-2.5 text-white fill-current" />
                        <span className="text-[9px] font-black text-white tracking-widest uppercase">
                            {item.totalEpisodes} EP
                        </span>
                    </div>
                )}
            </div>

            {/* 2. INFO SECTION */}
            <div className="p-5 pt-2 flex flex-col flex-1">
                
                {/* TAGS / GENRES */}
                {tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {tags.map((t) => (
                            <span 
                                key={t} 
                                className="px-2 py-0.5 rounded-md bg-zinc-100 text-[9px] font-black text-zinc-400 uppercase tracking-widest group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors"
                            >
                                #{t}
                            </span>
                        ))}
                    </div>
                )}

                {/* TITLE - Modern Bold Italic Style */}
                <h3 className="font-black text-sm md:text-base leading-tight text-zinc-900 line-clamp-2 italic uppercase tracking-tighter group-hover:text-purple-600 transition-colors">
                    {item.title}
                </h3>

                {/* SINOPSIS TEASER */}
                <p className="mt-3 text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-medium">
                    Drama pendek ReelShort viral dengan alur cerita menarik bertema{' '}
                    {item.themes?.join(', ') || 'konflik emosional dan romansa'}.
                </p>

                {/* FOOTER CARD */}
                <div className="mt-auto pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[10px] font-black text-purple-500 uppercase tracking-widest">
                        <BookOpen className="w-3 h-3" />
                        <span>Detail</span>
                    </div>
                    <div className="w-6 h-6 rounded-full bg-zinc-100 flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                        <Play className="w-2.5 h-2.5 text-zinc-400 group-hover:text-white fill-current" />
                    </div>
                </div>
            </div>
        </Link>
    )
}