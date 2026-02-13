import Link from "next/link"
import Image from "next/image"
import { Eye, Flame, Star, Bookmark } from "lucide-react"

type MangaItem = {
  manga_id: string
  title: string
  cover_image_url: string
  view_count: number
  latest_chapter_number: number
  latest_chapter_time?: string
  bookmark_count?: number
  user_rate?: number
  release_year?: string
  country_id?: string
  taxonomy?: {
    Format?: { name: string; slug: string }[]
    Genre?: { name: string; slug: string }[]
  }
}

export default function KomikRecommendedCard({
  manga,
}: {
  manga: MangaItem
}) {
  const format =
    manga.taxonomy?.Format?.[0]?.name ?? "Komik"

  const genres =
    manga.taxonomy?.Genre?.slice(0, 2) ?? []

  const isNewUpdate = (() => {
    if (!manga.latest_chapter_time) return false
    const updated = new Date(manga.latest_chapter_time)
    const diff =
      (Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24)
    return diff <= 3
  })()

  const countryFlag =
    manga.country_id?.toLowerCase() === "jp"
      ? "🇯🇵"
      : manga.country_id?.toLowerCase() === "kr"
        ? "🇰🇷"
        : manga.country_id?.toLowerCase() === "cn"
          ? "🇨🇳"
          : "🌍"

  return (
    <Link
      href={`/komik/${format.toLowerCase()}/${manga.manga_id}`}
      className="group relative block overflow-hidden rounded-2xl bg-zinc-950 border border-zinc-800 hover:border-orange-500/60 transition-all duration-300"
    >
      {/* Hover Glow */}
      <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition duration-500" />

      {/* COVER */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={manga.cover_image_url}
          alt={`Cover ${manga.title}`}
          fill
          sizes="(max-width:768px) 50vw, (max-width:1200px) 25vw, 20vw"
          className="object-cover group-hover:scale-110 transition duration-500"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />

        {/* TOP BADGES */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">

          <div className="flex items-center gap-1 px-3 py-1 rounded-full bg-orange-600 text-[10px] font-semibold uppercase shadow-md">
            <Flame size={12} />
            Recommended
          </div>

          {isNewUpdate && (
            <div className="px-3 py-1 rounded-full bg-emerald-600 text-[10px] font-semibold uppercase shadow-md">
              New Update
            </div>
          )}
        </div>

        {/* RATING */}
        {manga.user_rate && manga.user_rate > 0 && (
          <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-black/70 text-[11px] font-semibold backdrop-blur-sm">
            <Star size={12} className="text-yellow-400" />
            {manga.user_rate}
          </div>
        )}

        {/* BOTTOM INFO */}
        <div className="absolute bottom-3 left-3 flex items-center gap-2 flex-wrap">
          <div className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[11px] font-medium">
            Ch. {manga.latest_chapter_number}
          </div>

          <div className="px-2 py-1 rounded-full bg-black/60 backdrop-blur-sm text-[10px]">
            {countryFlag}
          </div>
        </div>
      </div>

      {/* INFO */}
      <div className="p-4 space-y-3">
        <h3 className="font-semibold text-sm leading-tight line-clamp-2 group-hover:text-orange-400 transition">
          {manga.title}
        </h3>

        {/* GENRES */}
        {genres.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {genres.map((g) => (
              <span
                key={g.slug}
                className="text-[9px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-400"
              >
                {g.name}
              </span>
            ))}
          </div>
        )}

        {/* STATS */}
        <div className="flex items-center justify-between text-xs text-zinc-400 pt-1">
          <span className="flex items-center gap-1">
            <Eye size={14} className="text-orange-400" />
            {(manga.view_count ?? 0).toLocaleString("id-ID")}
          </span>

          <span className="flex items-center gap-1">
            <Bookmark size={14} className="text-orange-400" />
            {(manga.bookmark_count ?? 0).toLocaleString("id-ID")}
          </span>

          <span className="text-[10px] px-2 py-0.5 rounded-full bg-zinc-800 text-zinc-300 uppercase">
            {format}
          </span>
        </div>

        {/* YEAR */}
        {manga.release_year && (
          <div className="text-[10px] text-zinc-500">
            Rilis {manga.release_year}
          </div>
        )}
      </div>
    </Link>
  )
}