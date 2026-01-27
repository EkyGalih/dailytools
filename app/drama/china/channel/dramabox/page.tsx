import type { Metadata } from 'next'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaExplorer from '@/components/drama/dramabox/DramaExplorer'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'
import AffiliateChannelPopup from '@/components/drama/ads/AffiliateChannelPopup'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'

export const metadata: Metadata = {
  title: 'Drama China Viral & Trending Hari Ini',
  description:
    'Daftar drama China viral dan trending update harian. Lengkap kategori dan rekomendasi.',
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
          Halaman ini menampilkan drama China yang sedang populer berdasarkan
          data terbaru Dramabox, termasuk genre revenge, CEO, dan romance.
        </p>
      </section>
    </section>
  )
}