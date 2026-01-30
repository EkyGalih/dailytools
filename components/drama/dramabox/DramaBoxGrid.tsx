import { formatReleaseDate } from '@/libs/format'
import { DramaBookItem } from '@/types/dramabox'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Calendar, Flame, Tag } from 'lucide-react'

function compactTitle(s?: string) {
    if (!s) return ''
    return s.replace(/\s+/g, ' ').trim()
}

export default function DramaBookGrid({ items, limit }: { items: DramaBookItem[], limit?: number }) {
    const list = typeof limit === 'number' ? items.slice(0, limit) : items

    return (
        /* Gap 3 di mobile (12px), Gap 8 di desktop */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8">
            {list.map((b) => {
                const cover = b.coverWap || b.bookCover || b.cover || '/cover-fallback.jpg'
                const releaseDate = formatReleaseDate(b.shelfTime)
                const tags = b.tags?.slice(0, 2) || []

                return (
                    <Link
                        key={b.bookId}
                        href={`/drama/china/channel/dramabox/detail/${b.bookId}`}
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
                                src={cover}
                                alt={`Poster ${compactTitle(b.bookName)}`}
                                fill
                                className="object-cover transition-transform duration-700 scale-100 group-hover:scale-110"
                                sizes="(max-width: 640px) 50vw, 240px"
                            />

                            {/* Hover Play Overlay (Hidden on Mobile Touch) */}
                            <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:flex items-center justify-center">
                                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                    <Play className="w-4 h-4 text-purple-600 fill-current ml-0.5" />
                                </div>
                            </div>

                            {/* Hot Badge (Smaller on Mobile) */}
                            {b.rankVo?.hotCode && (
                                <div className="absolute top-2 left-2 md:top-3 md:left-3 flex items-center gap-1 rounded-full bg-white/90 backdrop-blur-md px-2 py-0.5 md:px-2.5 md:py-1 shadow-sm border border-white/20">
                                    <Flame className="w-2.5 h-2.5 md:w-3 md:h-3 text-orange-500 fill-current" />
                                    <span className="text-[8px] md:text-[10px] font-black text-zinc-900 tracking-tighter">
                                        {b.rankVo.hotCode}
                                    </span>
                                </div>
                            )}
                        </div>

                        {/* 2. INFO SECTION */}
                        <div className="p-3 pt-1 md:p-5 md:pt-2 flex flex-col flex-1">
                            <h3 className="font-black text-xs md:text-base leading-tight text-zinc-900 line-clamp-2 italic uppercase tracking-tighter group-hover:text-purple-600 transition-colors">
                                {compactTitle(b.bookName)}
                            </h3>

                            <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-4">
                                {b.chapterCount && (
                                    <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-zinc-400">
                                        <Play className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                        <span>{b.chapterCount} EP</span>
                                    </div>
                                )}
                                {releaseDate?.year && (
                                    <div className="flex items-center gap-1 text-[9px] md:text-[10px] font-bold text-zinc-400">
                                        <Calendar className="w-2.5 h-2.5 md:w-3 md:h-3" />
                                        <span>{releaseDate.year}</span>
                                    </div>
                                )}
                            </div>

                            {/* Sinopsis disembunyikan di Mobile untuk menghemat ruang */}
                            {b.introduction && (
                                <p className="mt-2 text-[10px] md:text-[11px] text-zinc-400 line-clamp-1 leading-relaxed font-medium hidden md:block opacity-80">
                                    {b.introduction.length > 60
                                        ? `${b.introduction.substring(0, 60)}...`
                                        : b.introduction}
                                </p>
                            )}

                            {/* TAGS (GENRE) */}
                            {tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-3">
                                    {tags.map((tag: string) => (
                                        <span key={tag} className="px-1.5 py-0.5 rounded-md bg-zinc-100 text-[8px] md:text-[9px] font-black text-zinc-400 uppercase tracking-widest group-hover:bg-purple-100 group-hover:text-purple-600 transition-colors">
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