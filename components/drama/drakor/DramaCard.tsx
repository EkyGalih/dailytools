import { DramaCardItem } from "@/libs/types/drakor"
import Image from "next/image"
import Link from "next/link"

export default function DramaCard({
  drama,
}: {
  drama: DramaCardItem
}) {
  return (
    <Link href={`/drama/korea/${drama.endpoint}`}>
      <div
        className="group relative rounded-2xl overflow-hidden bg-zinc-900/80 border border-white/5
        hover:border-white/15 hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-500/10
        transition-all duration-300 flex flex-col h-[400px]"
      >
        {/* THUMBNAIL */}
        <div className="relative w-full h-[280px] bg-black flex-shrink-0">
          <Image
            src={drama.thumbnail ?? "/placeholder.jpg"}
            alt={drama.title}
            fill
            className="object-cover"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* TITLE Overlay */}
          <div className="absolute bottom-3 left-3 right-3">
            <h3 className="text-sm font-semibold leading-snug line-clamp-2 text-white drop-shadow-md group-hover:text-purple-200 transition">
              {drama.title}
            </h3>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {drama.rating && (
              <span className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/70 text-white backdrop-blur">
                ⭐ {drama.rating}
              </span>
            )}

            {drama.eps && (
              <span className="px-2.5 py-1 rounded-full text-[10px] bg-purple-500/20 text-purple-200 backdrop-blur">
                {drama.eps}
              </span>
            )}
          </div>

          {drama.year && (
            <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-black/70 text-white backdrop-blur">
              {drama.year}
            </span>
          )}

          {/* Hover Play Icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
            <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
              <span className="text-white text-xl">▶</span>
            </div>
          </div>
        </div>

        {/* INFO */}
        <div className="p-3 space-y-2 flex-1 flex flex-col justify-start">
          {/* META */}
          <div className="flex flex-wrap gap-2 text-[10px] text-zinc-400">
            {drama.time && (
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/5">
                ⏱ {drama.time}
              </span>
            )}

            {drama.resolution && (
              <span className="px-2 py-1 rounded-full bg-white/5 border border-white/5">
                🎞 {drama.resolution}
              </span>
            )}
          </div>

          {/* UPDATED */}
          {drama.updated_at && (
            <p className="text-[10px] text-zinc-500">
              Updated {drama.updated_at}
            </p>
          )}
        </div>
      </div>
    </Link>
  )
}