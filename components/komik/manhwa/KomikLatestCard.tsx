import Link from "next/link"
import Image from "next/image"

export default function KomikLatestCard({ manga }: { manga: any }) {
    return (
        <Link
            href={`/komik/${manga.manga_id}`}
            className="group relative overflow-hidden rounded-3xl bg-zinc-900 border border-zinc-800 hover:border-purple-500 transition"
        >
            {/* Neon Border */}
            <div className="absolute inset-0 border border-purple-500/30 rounded-3xl opacity-0 group-hover:opacity-100 transition" />

            <div className="relative aspect-[3/4]">
                <Image
                    src={manga.cover_image_url}
                    alt={manga.title}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-500"
                />

                <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-purple-600 text-[10px] font-black uppercase">
                    Latest
                </div>
            </div>

            <div className="p-4">
                <h3 className="font-black text-sm truncate group-hover:text-purple-400">
                    {manga.title}
                </h3>

                <p className="text-[11px] text-zinc-500 mt-2">
                    Chapter {manga.latest_chapter_number}
                </p>
            </div>
        </Link>
    )
}