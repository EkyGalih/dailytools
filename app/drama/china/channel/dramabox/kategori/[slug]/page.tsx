// app/drama/china/kategori/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { DRAMA_CATEGORIES } from '@/libs/drama/dramabox/categories'
import { getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import DramaFilters from '@/components/drama/dramabox/DramaFilter'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DubIndoSubFilter from '@/components/drama/dramabox/DubIndoSubFilter'
import DramaExplorer from '@/components/drama/dramabox/DramaExplorer'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'
import AffiliateChannelPopup from '@/components/drama/ads/AffiliateChannelPopup'

export default async function DramaCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  // ✅ WAJIB unwrap params
  const { slug } = await params

  const cat = DRAMA_CATEGORIES.find((c) => c.slug === slug)
  if (!cat) notFound()

  const items = await getDramaByCategory(cat.slug)
  const popupProduct = getAffiliatePopup()

  return (
    <section className="space-y-8">
      {popupProduct && <AffiliateChannelPopup product={popupProduct} />}
      <DramaHero activeChannel="dramabox" />

      {/* CATEGORY FILTER (SOURCE OF TRUTH) */}
      <DramaFilters active={cat.slug} />

      {/* SUB FILTER KHUSUS DUB INDO */}
      {slug === 'dubindo' && <DubIndoSubFilter />}

      {/* CONTENT */}
      <section className="max-w-6xl mx-auto px-4">
        <DramaExplorer initialItems={items} />
      </section>
    </section>
  )
}