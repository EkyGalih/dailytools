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
        <div
            className="
      grid
      grid-cols-2
      sm:grid-cols-3
      md:grid-cols-4
      xl:grid-cols-5
      gap-4
    "
        >
            {list.map((b) => {
                const cover =
                    b.coverWap || b.bookCover || b.cover || '/cover-fallback.jpg'

                return (
                    <Link
                        key={b.bookId}
                        href={`/drama/china/channel/dramabox/detail/${b.bookId}`}
                        className="group bg-gradient-to-br from-purple-950 via-indigo-950 to-black border border-indigo-950 rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all"
                    >
                        {/* COVER */}
                        <div className="relative aspect-[3/4] bg-gray-100">
                            <Image
                                src={cover}
                                alt={`Poster drama China ${compactTitle(b.bookName)}`}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 50vw, 240px"
                            />

                            {b.rankVo?.hotCode && (
                                <span className="absolute top-2 left-2 rounded-full bg-red-600 px-2 py-0.5 text-[10px] text-white">
                                    🔥 {b.rankVo.hotCode}
                                </span>
                            )}
                        </div>

                        {/* INFO */}
                        <div className="p-3 space-y-1.5">
                            <h3 className="font-bold text-lg leading-snug line-clamp-2">
                                {compactTitle(b.bookName)}
                            </h3>

                            <div className="flex gap-2 text-[11px] text-white">
                                {b.chapterCount && <span>🎬 {b.chapterCount} Ep</span>}
                                {formatReleaseDate(b.shelfTime)?.year && (
                                    <span>📅 {formatReleaseDate(b.shelfTime)!.year}</span>
                                )}
                            </div>

                            <p className="text-[12px] text-white line-clamp-2">
                                {b.introduction}
                            </p>
                        </div>
                    </Link>
                )
            })}
        </div>
    )
}