import Link from "next/link"
import Image from "next/image"
import { Eye, Star } from "lucide-react"

type MangaItem = {
    manga_id: string
    title: string
    cover_portrait_url: string
    cover_image_url: string
    view_count: number
    latest_chapter_number: number
    latest_chapter_time: string
    user_rate: number
    is_recommended: boolean
    taxonomy?: {
        Format?: { name: string; slug: string }[]
    }
}

export default function KomikLatestCard({
    manga,
}: {
    manga: MangaItem
}) {
    const format =
        manga.taxonomy?.Format?.[0]?.slug ?? "manhwa"

    const formatName =
        manga.taxonomy?.Format?.[0]?.name ?? "Komik"

    return (
        <Link
            href={`/komik/${format}/${manga.manga_id}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#121212] border border-zinc-800 hover:border-orange-500/50 transition-all duration-300"
        >
            {/* THUMBNAIL */}
            <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                    src={manga.cover_portrait_url || manga.cover_image_url}
                    alt={manga.title}
                    fill
                    sizes="(max-width:768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* FORMAT BADGE */}
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-orange-600 text-white text-[10px] font-black uppercase shadow-xl">
                    {formatName}
                </div>

                {/* RECOMMENDED BADGE */}
                {manga.is_recommended && (
                    <div className="absolute top-2 right-2 px-2 py-1 rounded-lg bg-emerald-500 text-white text-[9px] font-bold uppercase">
                        Recommended
                    </div>
                )}

                {/* CHAPTER BADGE */}
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md text-orange-400 text-[10px] font-bold border border-white/10">
                    Ch. {manga.latest_chapter_number}
                </div>
            </div>

            {/* CONTENT */}
            <div className="p-3 bg-[#18181b] flex-grow border-t border-zinc-800">
                <h3 className="font-bold text-zinc-100 text-sm leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {manga.title}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                    {/* Views */}
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500">
                        <Eye size={14} className="text-purple-400" />
                        <span>
                            {(manga.view_count ?? 0).toLocaleString("id-ID")}
                        </span>
                    </div>

                    {/* Rating */}
                    {manga.user_rate > 0 && (
                        <div className="flex items-center gap-1 text-[11px] text-yellow-400 font-semibold">
                            <Star size={13} />
                            {manga.user_rate}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}