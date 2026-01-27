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
import DramaHero from '@/components/drama/dramabox/DramaHero'

export const dynamic = 'force-dynamic'

export async function generateMetadata(
  { params }: { params: { id: string } }
): Promise<Metadata> {
  const { id } = await params

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

      <DramaHero />

      {/* CONTENT */}
      <section className="grid md:grid-cols-[240px_1fr] px-8 gap-8 items-start">
        {/* LEFT — COVER */}
        <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow">
          <Image
            src={detail.coverWap}
            alt={`Poster drama China ${detail.bookName}`}
            fill
            className="object-cover"
          />
        </div>

        {/* RIGHT — INFO (SATU KOLOM) */}
        <div className="space-y-6">
          {/* TITLE */}
          <div>
            <p className="text-sm text-white">Drama China</p>

            <h1 className="mt-1 text-2xl md:text-3xl font-extrabold leading-tight">
              {detail.bookName}
            </h1>

            <p className="mt-2 text-sm text-white">
              {detail.chapterCount} Episode
              {detail.shelfTime && ` • ${detail.shelfTime.slice(0, 4)}`}
            </p>
          </div>

          {/* ACTION */}
          <div className="flex flex-wrap items-center gap-4">
            <Link
              href={`/drama/china/channel/dramabox/watch/${id}?ep=1`}
              className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
            >
              ▶ Mulai Tonton
            </Link>
          </div>

          {/* SINOPSIS */}
          <div>
            <h2 className="text-sm font-semibold text-white">Sinopsis</h2>
            <p
              className="mt-2 text-sm text-gray-200 leading-relaxed"
              itemProp="description"
            >
              {detail.introduction}
            </p>
          </div>

          {/* TAGS */}
          {detail.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {detail.tags.map((t: string) => (
                <span
                  key={t}
                  className="rounded-full bg-gray-100 px-3 py-1 text-xs text-indigo-950"
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* RELATED */}
      <section className="space-y-4 px-8">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h2 className="text-xl font-bold">Drama Terkait</h2>

          <Link
            href="/drama/china/channel/dramabox"
            className="inline-flex items-center gap-2 rounded-full 
             bg-gradient-to-r from-indigo-600 to-purple-600
             px-5 py-2 text-sm font-semibold text-white
             shadow-md shadow-indigo-500/20
             hover:from-indigo-700 hover:to-purple-700
             hover:shadow-lg transition-all"
          >
            <span className="text-base">←</span>
            Lihat Semua
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