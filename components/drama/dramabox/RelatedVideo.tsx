import { formatReleaseDate } from '@/libs/format'
import { DramaBookItem } from '@/types/dramabox'
import Image from 'next/image'
import Link from 'next/link'

function compactTitle(s?: string) {
    if (!s) return ''
    return s.replace(/\s+/g, ' ').trim()
}

export default function DramaBookList({
    items,
    limit,
}: {
    items: DramaBookItem[]
    limit?: number
}) {
    const list = typeof limit === 'number' ? items.slice(0, limit) : items

    return (
        <div className="space-y-4">
            {list.map((b) => (
                <Link
                    key={b.bookId}
                    href={`/drama/china/channel/dramabox/detail/${b.bookId}`}
                    aria-label={`Baca detail drama ${compactTitle(b.bookName)}`}
                    itemScope
                    itemType="https://schema.org/TVSeries"
                    className="group flex gap-4 rounded-2xl border bg-white p-3 hover:shadow-md transition"
                >
                    {/* COVER */}
                    <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                        {b.coverWap && (
                            <Image
                                src={b.coverWap}
                                alt={`Poster drama China ${compactTitle(b.bookName)}`}
                                fill
                                className="object-cover"
                                itemProp="image"
                                sizes="80px"
                            />
                        )}
                    </div>

                    {/* INFO */}
                    <div className="flex flex-col justify-between min-w-0">
                        <div className="space-y-1">
                            <h3
                                className="font-semibold text-sm leading-snug line-clamp-2 group-hover:underline"
                                itemProp="name"
                            >
                                {compactTitle(b.bookName)}
                            </h3>

                            {/* META */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-500">
                                {formatReleaseDate(b.shelfTime) && (
                                    <span itemProp="datePublished">
                                        📅 {formatReleaseDate(b.shelfTime)?.year}
                                    </span>
                                )}

                                {b.chapterCount && (
                                    <span itemProp="numberOfEpisodes">
                                        🎬 {b.chapterCount} Ep
                                    </span>
                                )}

                                {b.rankVo?.hotCode && (
                                    <span className="text-red-600 font-medium">
                                        🔥 {b.rankVo.hotCode}
                                    </span>
                                )}
                            </div>

                            <p
                                className="text-xs text-gray-600 line-clamp-2"
                                itemProp="description"
                            >
                                {b.introduction}
                            </p>
                        </div>

                        {/* TAGS */}
                        {b.tags?.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
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
            ))}
        </div>
    )
}