// app/drama/china/channel/dramabox/kategori/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { DRAMA_CATEGORIES } from '@/libs/drama/dramabox/categories'
import { getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaExplorer from '@/components/drama/dramabox/DramaExplorer'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'

export default async function DramaCategoryPage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>
  searchParams: Promise<{ classify?: 'terbaru' | 'terpopuler' }>
}) {
  const { slug } = await params
  const { classify } = await searchParams

  const cat = DRAMA_CATEGORIES.find((c) => c.slug === slug)
  if (!cat) notFound()

  const mode = classify === 'terpopuler' ? 'terpopuler' : 'terbaru'

  const items = await getDramaByCategory(cat.slug, {
    classify: mode,
  })

  return (
    <section className="space-y-10">
      <AffiliateMiniPopup />
      <DramaHero activeChannel="dramabox" />

      <section className="w-full px-4">
        <DramaExplorer initialItems={items} />
      </section>
    </section>
  )
}