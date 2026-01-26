import Image from 'next/image'
import Link from 'next/link'

export type VideoCardItem = {
  __videoId: string
  __thumb: string
  snippet: {
    title: string
    channelTitle: string
    publishedAt: string
  }
}

function compactTitle(s: string) {
  return s.replace(/\s+/g, ' ').trim()
}

export default function DramaVideoGrid({
  items,
  limit,
}: {
  items: VideoCardItem[]
  limit?: number
}) {
  const list = typeof limit === 'number' ? items.slice(0, limit) : items

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {list.map((v) => (
        <Link
          key={v.__videoId}
          href={`/drama/china/detail/${v.__videoId}`}
          className="group bg-white border rounded-2xl overflow-hidden hover:shadow-xl hover:-translate-y-0.5 transition-all"
        >
          <div className="relative aspect-video bg-gray-100">
            {v.__thumb ? (
              <Image
                src={v.__thumb}
                alt={v.snippet.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            ) : null}

            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0 opacity-100" />
            <div className="absolute bottom-3 left-3 flex items-center gap-2">
              <span className="inline-flex items-center gap-2 rounded-full bg-white/15 backdrop-blur border border-white/20 px-3 py-1 text-xs text-white">
                ▶ Watch
              </span>
            </div>
          </div>

          <div className="p-4">
            <h3 className="font-semibold leading-snug line-clamp-2 group-hover:underline">
              {compactTitle(v.snippet.title)}
            </h3>
            <p className="mt-1 text-xs text-gray-500">
              {v.snippet.channelTitle} •{' '}
              {new Date(v.snippet.publishedAt).toLocaleDateString('id-ID')}
            </p>
          </div>
        </Link>
      ))}
    </div>
  )
}