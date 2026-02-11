import Link from "next/link"
import Image from "next/image"
import { Eye } from "lucide-react"

type MangaItem = {
    type: string
    title: string
    views: number
    endpoint: string
    thumbnail: string
    updated_at: string
    newest_chapter: string
}

export default function KomikLatestCard({
    manga,
}: {
    manga: MangaItem
}) {
    return (
        <Link
            href={`/komik/manga/${manga.endpoint}`}
            title={`Baca Manga ${manga.title}`}
            className="group relative flex flex-col overflow-hidden rounded-2xl bg-[#121212] border border-zinc-800 hover:border-orange-500/50 transition-all duration-300"
        >
            {/* Thumbnail Container */}
            <div className="relative aspect-[3/4] w-full overflow-hidden">
                <Image
                    src={manga.thumbnail}
                    alt={`Sampul Manga ${manga.title}`}
                    fill
                    sizes="(max-width:768px) 50vw, 20vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />

                {/* Badge Type (Orange) */}
                <div className="absolute top-2 left-2 px-2.5 py-1 rounded-lg bg-orange-600 text-white text-[10px] font-black uppercase tracking-tighter shadow-xl">
                    {manga.type}
                </div>

                {/* Badge Chapter (Dark Glass) */}
                <div className="absolute bottom-2 right-2 px-2 py-1 rounded-md bg-black/80 backdrop-blur-md text-orange-400 text-[10px] font-bold border border-white/10">
                    Ch. {manga.newest_chapter.replace(/[^0-9.]/g, '')}
                </div>
            </div>

            {/* Content Details (Dark Background) */}
            <div className="p-3 bg-[#18181b] flex-grow border-t border-zinc-800">
                <h3 className="font-bold text-zinc-100 text-sm leading-tight line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {manga.title}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                    {/* Views with Icon */}
                    <div className="flex items-center gap-1 text-[11px] text-zinc-500 mt-2">
                        <Eye size={14} className="text-purple-400" />
                        <span>{(manga.views).toLocaleString("id-ID")}</span>
                    </div>

                    {/* Time Update */}
                    <div className="flex items-center text-[10px] text-zinc-500 font-medium bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">
                        {manga.updated_at}
                    </div>
                </div>
            </div>
        </Link>
    )
}