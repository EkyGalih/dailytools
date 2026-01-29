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

export const dynamic = "force-dynamic"

async function getTrendingDramaBox() {
  try {
    const res = await fetch(
      "https://dramabox.sansekai.my.id/api/dramabox/latest",
      {
        next: { revalidate: 3600 },
      }
    )

    if (!res.ok) {
      console.error("Dramabox API Error:", res.status)
      return []
    }

    const contentType = res.headers.get("content-type")

    if (!contentType?.includes("application/json")) {
      console.error("Invalid JSON Response:", contentType)
      return []
    }

    return res.json()
  } catch (err) {
    console.error("Fetch Dramabox Failed:", err)
    return []
  }
}

export default async function DramaChinaPage() {
  const items = await getTrendingDramaBox()
  const safeItems = Array.isArray(items) ? items : []

  if (safeItems.length === 0) {
    return (
      <main className="p-10 text-center text-white">
        <h1 className="text-2xl font-bold">DramaBox sedang maintenance</h1>
        <p className="text-zinc-400">
          Data belum bisa dimuat, silakan coba beberapa saat lagi.
        </p>
      </main>
    )
  }

  return (
    <section className="space-y-10">
      <DramaHero />

      <section className="w-full px-4">
        <DramaExplorer initialItems={safeItems} />
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: safeItems.slice(0, 10).map((item: any, i: number) => ({
              "@type": "ListItem",
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