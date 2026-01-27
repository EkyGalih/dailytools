import type { Metadata } from 'next'
import DramaFilters from '@/components/drama/dramabox/DramaFilter'
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
      <AffiliateMiniPopup  />
      <DramaHero />

      <section className="max-w-6xl mx-auto px-4 space-y-6">
        {/* SEARCH + FILTER */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
          <DramaFilters />
        </div>

        <section className="max-w-6xl mx-auto px-4">
          <DramaExplorer initialItems={items} />
        </section>
      </section>

      {/* SEO text */}
      <section className="max-w-4xl mx-auto px-4 text-sm text-gray-700 space-y-3 pb-12">
        <h2 className="text-lg font-semibold text-gray-900">
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