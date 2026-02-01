import Link from "next/link"
import Image from "next/image"

export default function KomikRecommendedCard({ manga }: { manga: any }) {
    return (
        <Link
            href={`/komik/manga/${manga.manga_id}`}
            className="group relative overflow-hidden rounded-3xl border border-orange-500/30 bg-zinc-900 hover:border-orange-500 transition"
        >
            {/* Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-orange-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />

            {/* COVER */}
            <div className="relative aspect-[3/4]">
                <Image
                    src={manga.cover_image_url}
                    alt={manga.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-orange-600 text-[10px] font-black uppercase">
                    Recommended
                </div>
            </div>

            {/* INFO */}
            <div className="p-4">
                <h3 className="font-black text-sm group-hover:text-orange-400 truncate">
                    {manga.title}
                </h3>

                <p className="text-[11px] text-zinc-500 mt-2">
                    ⭐ {manga.user_rate} • 👁 {manga.view_count.toLocaleString()}
                </p>
            </div>
        </Link>
    )
}