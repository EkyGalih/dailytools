import Link from "next/link"
import Image from "next/image"
import { Eye, Flame } from "lucide-react"

type MangaItem = {
  type: string
  title: string
  viewers: number
  endpoint: string
  thumbnail: string
  newest_chapter: string
}

export default function KomikRecommendedCard({
  manga,
}: {
  manga: MangaItem
}) {
  return (
    <Link
      href={`/komik/manga/${manga.endpoint}`}
      className="group relative block overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-orange-500/60 transition-all duration-300"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* COVER */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={manga.thumbnail}
          alt={`Cover ${manga.title}`}
          fill
          sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
          className="object-cover group-hover:scale-110 transition duration-500"
          priority={false}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        {/* Top Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 rounded-full bg-orange-600 text-[10px] font-semibold uppercase shadow-md">
          <Flame size={12} />
          Recommended
        </div>

        {/* Bottom Chapter */}
        <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[11px] font-medium">
          {manga.newest_chapter}
        </div>
      </div>

      {/* INFO */}
      <div className="p-4 space-y-2">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-orange-400 transition">
          {manga.title}
        </h3>

        <div className="flex items-center justify-between text-xs text-zinc-400">
          <span className="flex items-center gap-1">
            <Eye size={14} className="text-orange-400" />
            {(manga.viewers ?? 0).toLocaleString("id-ID")}
          </span>

          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 uppercase">
            {manga.type}
          </span>
        </div>
      </div>
    </Link>
  )
}