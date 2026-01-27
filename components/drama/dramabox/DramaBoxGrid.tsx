import { formatReleaseDate } from '@/libs/format'
import { DramaBookItem } from '@/types/dramabox'
import Image from 'next/image'
import Link from 'next/link'

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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {list.map((b) => {
                // ✅ FIX UTAMA: pastikan STRING, bukan undefined
                const cover =
                    b.coverWap || b.bookCover || b.cover || '/cover-fallback.jpg'

                return (
                    <Link
                        key={b.bookId}
                        href={`/drama/china/channel/dramabox/detail/${b.bookId}`}
                        aria-label={`Baca detail drama ${compactTitle(b.bookName)}`}
                        itemScope
                        itemType="https://schema.org/TVSeries"
                        className="group bg-white border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        {/* COVER */}
                        <div className="relative aspect-[3/4] bg-gray-100">
                            <Image
                                src={cover}
                                alt={`Poster drama China ${compactTitle(b.bookName)}`}
                                fill
                                className="object-cover"
                                itemProp="image"
                                sizes="(max-width: 1024px) 100vw, 33vw"
                            />

                            {/* HOT BADGE */}
                            {b.rankVo?.hotCode && (
                                <span className="absolute top-3 left-3 rounded-full bg-red-600 px-2 py-0.5 text-xs text-white">
                                    🔥 {b.rankVo.hotCode}
                                </span>
                            )}
                        </div>

                        {/* INFO */}
                        <div className="p-4 space-y-2">
                            <h3
                                className="font-semibold leading-snug line-clamp-2 group-hover:underline"
                                itemProp="name"
                            >
                                {compactTitle(b.bookName)}
                            </h3>

                            {/* META */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                {formatReleaseDate(b.shelfTime)?.year && (
                                    <span itemProp="datePublished">
                                        📅 {formatReleaseDate(b.shelfTime)!.year}
                                    </span>
                                )}

                                {b.chapterCount && (
                                    <span itemProp="numberOfEpisodes">
                                        🎬 {b.chapterCount} Ep
                                    </span>
                                )}
                            </div>

                            <p
                                className="text-xs text-gray-600 line-clamp-3"
                                itemProp="description"
                            >
                                {b.introduction}
                            </p>

                            {/* TAGS */}
                            {b.tags?.length > 0 && (
                                <div className="flex flex-wrap gap-1">
                                    {b.tags.slice(0, 3).map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-gray-700"
                                        >
                                            #{t}
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