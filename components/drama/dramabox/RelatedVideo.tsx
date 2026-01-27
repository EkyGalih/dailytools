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
    variant = 'list', // list | grid
}: {
    items: DramaBookItem[]
    limit?: number
    variant?: 'list' | 'grid'
}) {
    const list = typeof limit === 'number' ? items.slice(0, limit) : items

    return (
        <div
          className={
            variant === 'grid'
              ? 'grid grid-cols-4 gap-3'
              : 'space-y-4'
          }
        >
            {list.map((b) => (
                <Link
                    key={b.bookId}
                    href={`/drama/china/channel/dramabox/detail/${b.bookId}`}
                    aria-label={`Baca detail drama ${compactTitle(b.bookName)}`}
                    itemScope
                    itemType="https://schema.org/TVSeries"
                    className={`group rounded-2xl border bg-gradient-to-br from-purple-950 via-indigo-950 to-black transition hover:shadow-md
                      ${variant === 'grid'
                        ? 'overflow-hidden'
                        : 'flex gap-4 p-3'}
                    `}
                >
                    {/* COVER */}
                    <div
                      className={
                        variant === 'grid'
                          ? 'relative aspect-[3/4] w-full overflow-hidden bg-gray-100'
                          : 'relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100'
                      }
                    >
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
                    <div className={`flex flex-col justify-between min-w-0 ${variant === 'grid' ? 'p-2' : ''}`}>
                        <div className="space-y-1">
                            <h3
                                className="font-semibold text-sm leading-snug line-clamp-2 group-hover:underline"
                                itemProp="name"
                            >
                                {compactTitle(b.bookName)}
                            </h3>

                            {/* META */}
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-100">
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

                            {variant !== 'grid' && (
                              <p className="text-xs text-gray-600 line-clamp-2" itemProp="description">
                                {b.introduction}
                              </p>
                            )}
                        </div>

                        {/* TAGS */}
                        {b.tags?.length > 0 && (
                            <div className="mt-1 flex flex-wrap gap-1">
                                {b.tags.slice(0, 3).map((t) => (
                                    <span
                                        key={t}
                                        className="rounded-full bg-gray-100 px-2 py-0.5 text-[10px] text-indigo-950"
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