import Link from "next/link"

export default function DramaListCard({
  drama,
}: {
  drama: any
}) {
  // Data dari API drakorkita
  const title = drama.title
  const year = drama.year
  const eps = drama.eps
  const rating = drama.rating
  const thumbnail = drama.thumbnail
  console.log(drama)

  // Convert rating angka (0-10) ke bintang (0-5)
  const starCount = rating ? Math.round(Number(rating) / 2) : 0

  // EPS format: "E4/16" → "4/16"
  const epsText = eps ? eps.replace(/^E/i, "") : null

  return (
    <Link href={`/drama/filem/${drama.id}`}>
      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-900/40 hover:bg-zinc-800/60 transition">
        {/* Poster kecil */}
        <div className="w-[48px] h-[70px] flex-shrink-0 overflow-hidden rounded-md bg-zinc-800">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 min-w-0">
          {/* Title */}
          <h3 className="text-sm font-semibold text-white truncate">
            {title} {year && <span className="text-white/70">({year})</span>}
          </h3>

          {/* Stars */}
          {rating && (
            <div className="flex items-center gap-[2px] text-yellow-400 text-xs mt-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i}>{i < starCount ? "★" : "☆"}</span>
              ))}
            </div>
          )}

          {/* Rating + EPS */}
          <p className="text-[11px] text-zinc-400 mt-1 flex items-center gap-2">
            {rating ? (
              <span>⭐ {rating}</span>
            ) : null}

            {rating && epsText ? <span>|</span> : null}

            {epsText ? (
              <span>{epsText} EPS</span>
            ) : null}
          </p>
        </div>
      </div>
    </Link>
  )
}