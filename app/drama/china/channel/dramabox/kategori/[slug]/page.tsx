// app/drama/china/channel/dramabox/kategori/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { DRAMA_CATEGORIES } from '@/libs/drama/dramabox/categories'
import { getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaExplorer from '@/components/drama/dramabox/DramaExplorer'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'
import { Metadata } from 'next'
import AffiliateShelf from '@/components/drama/ads/AffiliateShelf'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const cat = DRAMA_CATEGORIES.find((c) => c.slug === slug)

  return {
    title: `Drama China Genre ${cat?.name || 'Populer'} | My Tools`,
    description: `Nonton koleksi drama China genre ${cat?.name} terbaru. Update harian dengan kualitas terbaik dan subtitle Indonesia.`
  }
}

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
  const items = await getDramaByCategory(cat.slug, { classify: mode })
  const products = getAffiliateProducts()


  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* <AffiliateMiniPopup /> */}

      {/* HERO - Desain Mesh Gradient Gelap */}
      <DramaHero activeChannel="dramabox" />

      {/* CONTENT - Overlap Card Style */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-20 relative z-10">
        <div className="bg-white rounded-[2rem] md:rounded-[40px] p-5 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-zinc-100">

          {/* HEADER KATEGORI */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 md:mb-12 border-b border-zinc-50 pb-6 md:pb-8">
            <div className="space-y-1 md:space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                <span className="w-6 h-[2px] bg-purple-600 rounded-full hidden md:block" />
                <span className="px-2 py-0.5 text-[9px] md:text-[10px] font-black uppercase tracking-widest bg-purple-100 text-purple-600 rounded-md">
                  Genre Category
                </span>
              </div>

              <h1 className="text-2xl md:text-5xl font-black tracking-tighter text-zinc-900 italic uppercase leading-none">
                Drama <span className="text-purple-600">{cat.name}</span>
              </h1>

              <p className="text-zinc-400 font-bold text-[10px] md:text-base uppercase tracking-wide">
                Koleksi Terbaik Kategori {cat.name}
              </p>
            </div>

            {/* TOGGLE FILTER (Touch-Friendly) */}
            <div className="flex bg-zinc-100 p-1 md:p-1.5 rounded-xl md:rounded-2xl w-full md:w-auto">
              <a
                href={`?classify=terbaru`}
                className={`flex-1 md:flex-none text-center px-4 py-2 md:px-6 rounded-lg md:rounded-xl text-[11px] md:text-xs font-black uppercase tracking-wider transition-all ${mode === 'terbaru'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600'
                  }`}
              >
                Terbaru
              </a>
              <a
                href={`?classify=terpopuler`}
                className={`flex-1 md:flex-none text-center px-4 py-2 md:px-6 rounded-lg md:rounded-xl text-[11px] md:text-xs font-black uppercase tracking-wider transition-all ${mode === 'terpopuler'
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600'
                  }`}
              >
                Terpopuler
              </a>
            </div>
          </div>

          {/* LIST DRAMA - Pastikan DramaExplorer menggunakan grid yang responsif */}
          <div className="min-h-[400px]">
            <DramaExplorer initialItems={items} />
            <AffiliateShelf products={products} />
          </div>
        </div>
      </main>
    </div>
  )
}