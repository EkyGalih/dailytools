import SchemaMarkup from "@/components/SchemaMarkup";
import { notFound } from 'next/navigation'
import { getDramaDetail, getDramaEpisodes, getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import { Metadata } from 'next'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaBookGrid from '@/components/drama/dramabox/DramaBoxGrid'
import UnifiedDramaboxView from '@/components/drama/dramabox/UnifiedDramaboxView'
import AffiliateShelf from '@/components/drama/ads/AffiliateShelf'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { id } = await params
  const detail = await getDramaDetail(id)

  if (!detail) {
    return {
      title: 'Drama Tidak Ditemukan | Tamanto',
    }
  }

  const site = 'https://tamanto.web.id' // Gunakan domain baru Anda
  const dramaTitle = detail.bookName || 'Drama China'
  const dramaDescription = detail.introduction?.slice(0, 160) || `Nonton drama ${dramaTitle} subtitle Indonesia terbaru.`

  return {
    // Format: Nonton Judul Drama Sub Indo | Tamanto
    title: `Nonton ${dramaTitle} Subtitle Indonesia`,
    description: dramaDescription,

    // Alternates untuk SEO agar tidak dianggap duplikat
    alternates: {
      canonical: `${site}/drama/china/detail/${id}`,
    },

    // OpenGraph (Penting untuk WhatsApp/FB)
    openGraph: {
      title: `${dramaTitle} - Streaming Drama China Viral`,
      description: dramaDescription,
      url: `${site}/drama/china/detail/${id}`,
      siteName: 'Tamanto',
      type: 'video.tv_show',
      images: [
        {
          url: detail.coverWap || detail.cover || `${site}/og-fallback.jpg`,
          width: 800,
          height: 1200,
          alt: `Poster ${dramaTitle}`,
        },
      ],
      locale: 'id_ID',
    },

    // Twitter Card
    twitter: {
      card: 'summary_large_image',
      title: `${dramaTitle} | Sub Indo HD`,
      description: dramaDescription,
      images: [detail.coverWap || detail.cover || `${site}/og-fallback.jpg`],
    },

    // Tambahan robot agar cepat terindeks
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function DramaChinaUnifiedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const produk = getAffiliateProducts()

  const [detail, episodes, related] = await Promise.all([
    getDramaDetail(id),
    getDramaEpisodes(id),
    getDramaByCategory('trending')
  ])

  if (!detail || episodes.length === 0) notFound()

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      <SchemaMarkup data={detail} category="reelshort" type="TVSeries" />
      {/* HERO SECTION - Sudah mobile friendly di komponen internalnya */}
      <DramaHero activeChannel="dramabox" />

      {/* MAIN UNIFIED VIEW */}
      <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 -mt-10 md:-mt-20 relative z-20">
        <UnifiedDramaboxView detail={detail} episodes={episodes} />

        {/* RELATED SECTION */}
        <section className="mt-12 md:mt-20 space-y-6 md:space-y-10 px-2 md:px-0">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-1 md:space-y-2">
              <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-900 uppercase italic leading-none">
                Drama <span className="text-purple-600">Terpopuler</span>
              </h2>
              <p className="text-zinc-400 font-bold text-[10px] md:text-sm uppercase tracking-wide">Rekomendasi trending untuk Anda</p>
            </div>
          </div>
          {/* Grid drama biasanya sudah responsif */}
          <DramaBookGrid items={related.slice(0, 10)} />
          <AffiliateShelf products={produk} />
        </section>
      </main>
    </div>
  )
}