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

export default function ReelShortCard({ item }: { item: ReelShortItem }) {

    return (
        <Link
            href={`/drama/china/channel/reelshort/detail/${item.bookId}`}
            className="group bg-gradient-to-br from-purple-950 via-indigo-950 to-black border rounded-2xl overflow-hidden
                 hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
            {/* COVER */}
            <div className="relative aspect-[3/4] bg-gray-100">
                <Image
                    src={item.cover}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 240px"
                    className="object-cover group-hover:scale-105 transition-transform"
                />

                {/* HOT */}
                {item.hot && (
                    <span className="absolute top-3 right-3 rounded-full
                           bg-red-600 px-2 py-0.5 text-xs text-white">
                        🔥 {Math.floor(item.hot / 1000)}K
                    </span>
                )}

                {/* EP */}
                {item.totalEpisodes && (
                    <span className="absolute top-3 left-3 rounded-full
                           bg-black/70 px-2 py-0.5 text-xs text-white backdrop-blur">
                        🎬 {item.totalEpisodes} Ep
                    </span>
                )}
            </div>

            {/* INFO */}
            <div className="p-4 space-y-2">
                <h3 className="font-semibold leading-snug line-clamp-2">
                    {item.title}
                </h3>

                {/* SINOPSIS TEASER */}
                <p className="text-xs text-gray-200 line-clamp-3">
                    Drama pendek populer dengan tema{' '}
                    {item.themes?.slice(0, 2).join(', ') || 'romantis & konflik emosional'}.
                </p>

                {/* TAG */}
                {item.themes && (
                    <div className="flex flex-wrap gap-1 pt-1">
                        {item.themes.slice(0, 3).map((t) => (
                            <span
                                key={t}
                                className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full"
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