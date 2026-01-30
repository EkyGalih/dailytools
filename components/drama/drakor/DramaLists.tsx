import Image from "next/image"
import Link from "next/link"
import { Star, PlayCircle, Layers } from "lucide-react"

export default function DramaListCard({ drama }: { drama: any }) {
  const title = drama.title
  const eps = drama.eps
  const rating = drama.rating
  const thumbnail = drama.thumbnail

  // EPS format: "E4/16" → "4/16"
  const epsText = eps ? eps.replace(/^E/i, "") : null

  return (
    <Link href={`/drama/korea/detail/${drama.endpoint}`}>
      <div className="group flex items-center gap-4 p-3 rounded-[1.5rem] bg-white border border-zinc-100 hover:border-pink-200 hover:shadow-[0_20px_40px_rgba(236,72,153,0.05)] transition-all duration-500">

        {/* THUMBNAIL AREA */}
        <div className="relative w-[60px] h-[80px] flex-shrink-0 overflow-hidden rounded-2xl bg-zinc-100 shadow-sm">
          <Image
            src={thumbnail || "/placeholder.jpg"}
            alt={title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
          {/* Subtle Overlay on hover */}
          <div className="absolute inset-0 bg-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <PlayCircle size={16} className="text-white drop-shadow-md" />
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="flex flex-col flex-1 min-w-0 space-y-1.5">
          {/* Badge & Rating Row */}
          <div className="flex items-center gap-2">
            {rating && (
              <div className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-md bg-amber-50 text-amber-600 border border-amber-100">
                <Star size={10} fill="currentColor" />
                <span className="text-[10px] font-black leading-none">{rating}</span>
              </div>
            )}
            {epsText && (
              <div className="flex items-center gap-1 px-1.5 py-0.5 rounded-md bg-purple-50 text-purple-600 border border-purple-100">
                <Layers size={10} />
                <span className="text-[10px] font-black leading-none uppercase tracking-tighter">{epsText} EPS</span>
              </div>
            )}
          </div>

          {/* Title - Consistent with brand typography */}
          <h3 className="text-xs font-black italic uppercase tracking-tighter text-zinc-800 group-hover:text-pink-600 transition-colors line-clamp-2 leading-tight">
            {title}
          </h3>

          {/* Call to action text */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-bold text-zinc-400 uppercase tracking-widest group-hover:text-zinc-600 transition-colors">
              Tonton
            </span>
            <div className="h-0.5 w-0 group-hover:w-8 bg-pink-400 transition-all duration-500 rounded-full" />
          </div>
        </div>
      </div>
    </Link>
  )
}