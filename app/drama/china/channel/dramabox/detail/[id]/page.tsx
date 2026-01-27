import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getDramaDetail, getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import DramaBookGrid from '@/components/drama/dramabox/DramaBoxGrid'
import Link from 'next/link'
import DramaShareIcons from '@/components/drama/dramabox/DramaShareIcon'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'
import AffiliateChannelPopup from '@/components/drama/ads/AffiliateChannelPopup'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'
import { Metadata } from 'next'

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const { id } = params

  const detail = await getDramaDetail(id)
  if (!detail) return {}

  const site = process.env.NEXT_PUBLIC_SITE_URL!

  return {
    title: detail.bookName,
    description: detail.introduction?.slice(0, 160),
    openGraph: {
      title: detail.bookName,
      description: detail.introduction?.slice(0, 160),
      url: `${site}/drama/china/channel/dramabox/detail/${id}`,
      type: 'article',
      images: [
        {
          url: detail.coverWap || `${site}/og-fallback.jpg`,
          width: 1200,
          height: 630,
        },
      ],
    },
  }
}

export default async function DramaChinaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const detail = await getDramaDetail(id)
  if (!detail) notFound()
  const site = process.env.NEXT_PUBLIC_SITE_URL!

  // related sederhana: ambil trending / random
  const related = await getDramaByCategory('trending')
  const popupProduct = getAffiliatePopup()

  return (
    <section className="space-y-10">
      {popupProduct && <AffiliateChannelPopup product={popupProduct} />}
      <AffiliateMiniPopup />

      {/* HERO */}
      <header className="relative overflow-hidden rounded-3xl">
        {/* Background */}
        <div className="absolute inset-0">
          <Image
            src={detail.coverWap}
            alt=""
            fill
            className="object-cover blur-xl scale-110"
            priority
          />
          <div className="absolute inset-0 bg-black/70" />
        </div>

        {/* Content */}
        <div className="relative z-10 p-8 md:p-12 text-white max-w-4xl">
          <p className="text-sm text-white/70">Drama China</p>

          <h1 className="mt-2 text-3xl md:text-4xl font-extrabold leading-tight">
            {detail.bookName}
          </h1>

          <p className="mt-3 text-sm text-white/80">
            {detail.chapterCount} Episode
            {detail.shelfTime && ` • ${detail.shelfTime.slice(0, 4)}`}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <Link
              href={`/drama/china/channel/dramabox/watch/${id}?ep=1`}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-7 py-3 text-sm font-semibold hover:bg-red-700 transition"
              aria-label={`Mulai menonton drama ${detail.bookName}`}
            >
              ▶ Mulai Tonton
            </Link>

            <DramaShareIcons
              title={detail.bookName}
              tags={detail.tags}
              url={`${site}/drama/china/channel/dramabox/detail/${id}`}
            />
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <section className="grid md:grid-cols-[240px_1fr] gap-8">
        {/* COVER */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow">
          <Image
            src={detail.coverWap}
            alt={`Poster drama China ${detail.bookName}`}
            fill
            className="object-cover"
          />
        </div>

        {/* INFO */}
        <div className="space-y-6">
          <div>
            <h2 className="text-lg font-semibold">Sinopsis</h2>
            <p
              className="mt-2 text-sm text-gray-700 leading-relaxed"
              itemProp="description"
            >
              {detail.introduction}
            </p>
          </div>

          {detail.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {detail.tags.map((t: string) => (
                <span
                  key={t}
                  className="rounded-full border bg-white px-3 py-1 text-xs text-gray-700"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RELATED */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold">Drama Terkait</h2>

          <Link
            href="/drama/china/channel/dramabox"
            aria-label="Kembali ke semua drama"
            className="inline-flex items-center gap-1 text-sm text-gray-600 hover:underline"
          >
            <span className="text-base">←</span>
            <span>Semua Drama</span>
          </Link>
        </div>

        <DramaBookGrid items={related.slice(0, 6)} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'TVSeries',
            name: detail.bookName,
            description: detail.introduction,
            image: detail.coverWap,
            numberOfEpisodes: detail.chapterCount,
            genre: detail.tags,
            inLanguage: 'id-ID',
            url: `${site}/drama/china/channel/dramabox/detail/${id}`,
          }),
        }}
      />
    </section>
  )
}