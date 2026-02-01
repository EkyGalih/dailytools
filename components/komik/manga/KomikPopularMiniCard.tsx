import Link from "next/link"
import Image from "next/image"

export default function KomikPopularMiniCard({
    manga,
    rank,
}: {
    manga: any
    rank: number
}) {
    return (
        <Link
            href={`/komik/${manga.manga_id}`}
            className="flex items-center gap-3 p-2 rounded-xl bg-zinc-900/40 border border-zinc-800 hover:border-orange-500 transition group"
        >
            {/* Rank */}
            <div className="text-orange-500 font-black text-sm w-4">
                {rank}
            </div>

            {/* Thumbnail */}
            <div className="relative w-10 h-12 rounded-lg overflow-hidden shrink-0">
                <Image
                    src={manga.cover_image_url}
                    alt={manga.title}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-[12px] font-bold truncate group-hover:text-orange-400">
                    {manga.title}
                </h3>

                <p className="text-[10px] text-zinc-500">
                    ⭐ {manga.user_rate} • 👁 {manga.view_count.toLocaleString()}
                </p>
            </div>
        </Link>
    )
}