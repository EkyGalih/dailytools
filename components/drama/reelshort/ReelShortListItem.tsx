import Image from 'next/image'
import Link from 'next/link'

export type ReelShortItem = {
    bookId: string
    title: string
    cover: string
    totalEpisodes?: number
    themes?: string[]
    hot?: number
}

export default function ReelShortListItem({
    item,
}: {
    item: ReelShortItem
}) {
    return (
        <Link
            href={`/drama/china/channel/reelshort/detail/${item.bookId}`}
            className="
        group flex gap-4 rounded-2xl border bg-white p-3
        hover:shadow-md transition
      "
        >
            {/* COVER */}
            <div className="relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
                {item.cover && (
                    <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        sizes="80px"
                        className="object-cover group-hover:scale-105 transition-transform"
                    />
                )}

                {/* EP */}
                {item.totalEpisodes && (
                    <span className="absolute bottom-1 left-1 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-white backdrop-blur">
                        {item.totalEpisodes} Ep
                    </span>
                )}
            </div>

            {/* INFO */}
            <div className="flex min-w-0 flex-col justify-between">
                <div className="space-y-1">
                    <h3 className="text-sm font-semibold leading-snug line-clamp-2">
                        {item.title}
                    </h3>

                    {/* META */}
                    <div className="flex flex-wrap items-center gap-2 text-[11px] text-gray-500">
                        <span>🎬 Drama Pendek</span>

                        {item.hot && (
                            <span className="font-medium text-red-600">
                                🔥 {Math.floor(item.hot / 1000)}K
                            </span>
                        )}
                    </div>

                    {/* SINOPSIS */}
                    <p className="text-xs text-gray-600 line-clamp-2">
                        Drama pendek populer dengan tema{' '}
                        {item.themes?.slice(0, 2).join(', ') ||
                            'romantis & konflik emosional'}
                        .
                    </p>
                </div>

                {/* TAGS */}
                {item.themes && item.themes.length > 0 && (
                    <div className="mt-1 flex flex-wrap gap-1">
                        {item.themes.slice(0, 3).map((t) => (
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
}