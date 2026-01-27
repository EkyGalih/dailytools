import type { Metadata } from 'next'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaExplorer from '@/components/drama/dramabox/DramaExplorer'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'
import AffiliateChannelPopup from '@/components/drama/ads/AffiliateChannelPopup'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Drama China Viral & Trending Hari Ini',
  description:
    'Nonton drama China viral dan trending hari ini. Update harian, episode lengkap, genre romance, CEO, revenge, dan drama pendek populer.',

  keywords: [
    'drama china',
    'drama china viral',
    'drama china terbaru',
    'drama china pendek',
    'dramabox',
    'drama CEO',
    'drama revenge',
    'nonton drama china',
  ],

  alternates: {
    canonical: '/drama/china/channel/dramabox',
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },

  openGraph: {
    type: 'website',
    title: 'Drama China Viral & Trending Hari Ini',
    description:
      'Update drama China viral & trending hari ini. Episode lengkap, genre populer, dan rekomendasi terbaik.',
    url: 'https://mytools.web.id/drama/china/channel/dramabox',
    siteName: 'My Tools',
    images: [
      {
        url: 'https://mytools.web.id/og-dramabox.jpg',
        width: 1200,
        height: 630,
        alt: 'Drama China Viral & Trending',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Drama China Viral & Trending Hari Ini',
    description:
      'Nonton drama China viral & trending. Episode lengkap dan update harian.',
    images: ['https://mytools.web.id/og-dramabox.jpg'],
  },
}

async function getTrendingDramaBox() {
  const res = await fetch(
    'https://dramabox.sansekai.my.id/api/dramabox/latest',
    { next: { revalidate: 3600 } }
  )
  return res.json()
}

export default async function DramaChinaPage() {
  const items = await getTrendingDramaBox()
  const popupProduct = getAffiliatePopup()

  return (
    <section className="space-y-10">
      {popupProduct && <AffiliateChannelPopup product={popupProduct} />}
      <AffiliateMiniPopup />

      {/* HERO – FULL WIDTH */}
      <DramaHero />

      {/* CONTENT – FULL WIDTH */}
      <section className="w-full px-4">
        <DramaExplorer initialItems={items} />
      </section>

      {/* SEO TEXT – SEMI WIDTH */}
      <section className="max-w-4xl mx-auto px-4 text-sm text-gray-400 space-y-3 pb-12">
        <h2 className="text-lg font-semibold text-white">
          Drama China yang Lagi Viral
        </h2>
        <p>
          Kami menyajikan <Link href="/drama/china/channel/dramabox" className="underline">drama China viral</Link>,
          termasuk genre <strong>CEO</strong>, <strong>romance</strong>, dan <strong>revenge</strong>
          dengan update harian.
        </p>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'ItemList',
            itemListElement: items.slice(0, 10).map((item: any, i: number) => ({
              '@type': 'ListItem',
              position: i + 1,
              url: `https://mytools.web.id/drama/china/channel/dramabox/detail/${item.bookId}`,
              name: item.bookName || item.title,
            })),
          }),
        }}
      />
    </section>
  )
}