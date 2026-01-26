// app/drama-china/[id]/page.tsx
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import DramaRelated from '@/components/drama/DramaRelated'
import { getRelatedVideos, getVideoDetail } from '@/libs/drama/youtube'

export const dynamic = 'force-dynamic'

function isValidYtId(id: string) {
  // videoId YouTube umumnya 11 char, tapi kita longgar aja
  return Boolean(id) && id.length >= 8 && id.length <= 20
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  if (!isValidYtId(id)) return { title: 'Video Drama China' }

  const detail = await getVideoDetail(id)
  const title = detail?.snippet?.title || 'Video Drama China'
  const desc = detail?.snippet?.description?.slice(0, 160) || 'Tonton trailer / cuplikan drama China viral.'

  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  return {
    title,
    description: desc,
    alternates: { canonical: `${site}/drama-china/${id}` },
    openGraph: {
      title,
      description: desc,
      type: 'video.other',
      url: `${site}/drama-china/${id}`,
      images: detail?.snippet?.thumbnails?.high?.url ? [detail.snippet.thumbnails.high.url] : [],
    },
  }
}

export default async function DramaChinaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  if (!isValidYtId(id)) notFound()

  const [detail, related] = await Promise.all([
    getVideoDetail(id),
    getRelatedVideos(id, 9),
  ])

  if (!detail?.id) notFound()

  const title = detail.snippet?.title ?? 'Video Drama China'
  const desc = detail.snippet?.description ?? ''
  const publishedAt = detail.snippet?.publishedAt ?? new Date().toISOString()
  const thumb = detail.snippet?.thumbnails?.high?.url ?? ''

  const site = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const pageUrl = `${site}/drama-china/${id}`

  return (
    <section className="space-y-10">
      {/* HERO */}
      <header className="rounded-3xl bg-gradient-to-br from-black via-indigo-950 to-fuchsia-950 text-white p-8">
        <p className="text-white/70 text-sm">Drama China • Video</p>
        <h1 className="mt-2 text-2xl md:text-3xl font-extrabold leading-snug">
          {title}
        </h1>
        <p className="mt-2 text-white/70 text-sm">
          {new Date(publishedAt).toLocaleString('id-ID')}
        </p>
      </header>

      {/* EMBED */}
      <div className="bg-white border rounded-3xl p-4 md:p-6 shadow-sm">
        <div className="relative aspect-video overflow-hidden rounded-2xl bg-black">
          <iframe
            className="absolute inset-0 h-full w-full"
            src={`https://www.youtube.com/embed/${encodeURIComponent(id)}?rel=0&modestbranding=1`}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        </div>

        {desc ? (
          <div className="mt-5">
            <h2 className="text-lg font-semibold">Deskripsi</h2>
            <p className="mt-2 text-sm text-gray-700 whitespace-pre-line leading-relaxed">
              {desc}
            </p>
          </div>
        ) : null}
      </div>

      {/* RELATED */}
      <DramaRelated items={related} />

      {/* SEO: VideoObject */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'VideoObject',
            name: title,
            description: desc?.slice(0, 200) || 'Video drama China viral dan trending.',
            thumbnailUrl: thumb ? [thumb] : undefined,
            uploadDate: publishedAt,
            embedUrl: `https://www.youtube.com/embed/${id}`,
            contentUrl: `https://www.youtube.com/watch?v=${id}`,
            url: pageUrl,
          }),
        }}
      />
    </section>
  )
}