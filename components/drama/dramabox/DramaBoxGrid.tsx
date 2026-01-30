import { formatReleaseDate } from '@/libs/format'
import { DramaBookItem } from '@/types/dramabox'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Calendar, Flame, Tag } from 'lucide-react'

function compactTitle(s?: string) {
    if (!s) return ''
    return s.replace(/\s+/g, ' ').trim()
}

export default function DramaBookGrid({
    items,
    limit,
}: {
    items: DramaBookItem[]
    limit?: number
}) {
    const list = typeof limit === 'number' ? items.slice(0, limit) : items

    return (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
            {list.map((b) => {
                const cover = b.coverWap || b.bookCover || b.cover || '/cover-fallback.jpg'
                const releaseDate = formatReleaseDate(b.shelfTime)
                // Ambil tags (biasanya b.tags adalah array string)
                const tags = b.tags?.slice(0, 2) || []

                return (
                    <Link
                        key={b.bookId}
                        href={`/drama/china/channel/dramabox/detail/${b.bookId}`}
                        className="
                            group relative flex flex-col bg-white 
                            rounded-[2.5rem] overflow-hidden transition-all duration-500
                            border border-zinc-100 
                            hover:border-purple-200 
                            hover:shadow-[0_30px_60px_-15px_rgba(147,51,234,0.15)]
                        "
                    >
                        {/* 1. POSTER WRAPPER */}
                        <div className="relative aspect-[3/4] overflow-hidden m-2.5 rounded-[2rem] bg-zinc-50">
                            <Image
                                src={cover}
                                alt={`Poster ${compactTitle(b.bookName)}`}
                                fill
                                className="object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
                                sizes="(max-width: 768px) 50vw, 240px"
                            />

                            {/* Hover Play Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center">
                                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                    <Play className="w-5 h-5 text-purple-600 fill-current ml-1" />
                                </div>
                            </div>

                            {/* Hot Badge */}
                            {b.rankVo?.hotCode && (
                                <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-white/90 backdrop-blur-md px-2.5 py-1 shadow-sm border border-white/20">
                                    <Flame className="w-3 h-3 text-orange-500 fill-current" />
                                    <span className="text-[10px] font-black text-zinc-900 tracking-tighter">
                                        {b.rankVo.hotCode}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* 2. INFO SECTION */}
                        <div className="p-5 pt-2 flex flex-col flex-1">
                            <h3 className="font-black text-sm md:text-base leading-tight text-zinc-900 line-clamp-2 italic uppercase tracking-tighter group-hover:text-purple-600 transition-colors">
                                {compactTitle(b.bookName)}
                            </h3>

                            <div className="flex items-center gap-3 mt-4">
                                {b.chapterCount && (
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                                        <Play className="w-3 h-3" />
                                        <span>{b.chapterCount} EP</span>
                                    </div>
                                )}
                                {releaseDate?.year && (
                                    <div className="flex items-center gap-1 text-[10px] font-bold text-zinc-400">
                                        <Calendar className="w-3 h-3" />
                                        <span>{releaseDate.year}</span>
                                    </div>
                                )}
                            </div>

                            {b.introduction && (
                                <p className="mt-4 text-[11px] text-zinc-400 line-clamp-2 leading-relaxed font-medium">
                                    {b.introduction}
                                </p>
                            )}

                            {/* TAGS (GENRE) - Ini yang tadi hilang */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 mt-4">
                                    {tags.map((tag: string) => (
                                        <span key={tag} className="px-2 py-0.5 rounded-md bg-zinc-100 text-[9px] font-black text-zinc-400 uppercase tracking-widest group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}