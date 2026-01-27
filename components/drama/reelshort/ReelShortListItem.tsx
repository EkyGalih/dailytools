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
    variant = 'list', // list | grid (grid columns handled by parent)
}: {
    item: ReelShortItem
    variant?: 'list' | 'grid'
}) {
    return (
        <Link
            href={`/drama/china/channel/reelshort/detail/${item.bookId}`}
            className={`group rounded-2xl border bg-gradient-to-br from-purple-950 via-indigo-950 to-black transition hover:shadow-md
        ${variant === 'grid' ? 'overflow-hidden' : 'flex gap-4 p-3'}
      `}
        >
            {/* COVER */}
            <div
                className={
                    variant === 'grid'
                        ? 'relative aspect-[3/4] w-full overflow-hidden bg-gray-900'
                        : 'relative h-28 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-gray-900'
                }
            >
                {item.cover && (
                    <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        sizes={variant === 'grid' ? '(max-width: 768px) 50vw, 240px' : '80px'}
                        className="object-cover group-hover:scale-105 transition-transform"
                    />
                )}

                {/* BADGES */}
                {(item.totalEpisodes || item.hot) && (
                    <div className="absolute inset-x-0 top-2 flex items-center justify-between px-2">
                        {item.totalEpisodes ? (
                            <span className="rounded-full bg-black/70 px-2 py-0.5 text-[10px] text-white backdrop-blur">
                                🎬 {item.totalEpisodes} Ep
                            </span>
                        ) : (
                            <span />
                        )}

                        {item.hot ? (
                            <span className="rounded-full bg-red-600/90 px-2 py-0.5 text-[10px] font-semibold text-white">
                                🔥 {Math.floor(item.hot / 1000)}K
                            </span>
                        ) : null}
                    </div>
                )}
            </div>

            {/* INFO */}
            <div
                className={`min-w-0 ${
                    variant === 'grid'
                        ? 'p-3 space-y-2'
                        : 'flex flex-col justify-between min-w-0'
                }`}
            >
                <div className={variant === 'grid' ? 'space-y-1' : 'space-y-1'}>
                    <h3
                        className={`font-semibold leading-snug line-clamp-2 text-white group-hover:underline
              ${variant === 'grid' ? 'text-sm' : 'text-sm'}
            `}
                    >
                        {item.title}
                    </h3>

                    {/* META */}
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-gray-100">
                        <span>🎬 Drama Pendek</span>
                    </div>

                    {/* SINOPSIS */}
                    <p
                        className={`text-xs leading-relaxed text-gray-300
              ${variant === 'grid' ? 'line-clamp-2' : 'line-clamp-2'}
            `}
                    >
                        Drama pendek populer dengan tema{' '}
                        {item.themes?.slice(0, 2).join(', ') ||
                            'romantis & konflik emosional'}
                        .
                    </p>
                </div>

                {/* TAGS */}
                {item.themes && item.themes.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                        {item.themes.slice(0, 3).map((t) => (
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
    )
}