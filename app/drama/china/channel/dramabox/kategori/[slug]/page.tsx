// app/drama/china/channel/dramabox/kategori/[slug]/page.tsx

import { notFound } from 'next/navigation'
import { DRAMA_CATEGORIES } from '@/libs/drama/dramabox/categories'
import { getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaExplorer from '@/components/drama/dramabox/DramaExplorer'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'
import { Metadata } from 'next'

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

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      <AffiliateMiniPopup />

      {/* HERO - Menggunakan desain Mesh Gradient Gelap dari komponen DramaHero */}
      <DramaHero activeChannel="dramabox" />

      {/* CONTENT - Kontainer Putih yang menumpuk ke atas Hero */}
      <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-zinc-100">

          {/* HEADER KATEGORI */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-50 pb-8">
            <div className="space-y-2">
              <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-purple-100 text-purple-600 rounded-full">
                Genre Category
              </span>
              <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 italic uppercase">
                Drama <span className="text-purple-600">{cat.name}</span>
              </h1>
              <p className="text-zinc-500 font-medium text-sm md:text-base">
                Menampilkan koleksi terbaik untuk kategori {cat.name}
              </p>
            </div>

            {/* TOGGLE POPULER/TERBARU (Optional Enhancement) */}
            <div className="flex bg-zinc-100 p-1.5 rounded-2xl">
              <a
                href={`?classify=terbaru`}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'terbaru' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                Terbaru
              </a>
              <a
                href={`?classify=terpopuler`}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${mode === 'terpopuler' ? 'bg-white text-black shadow-sm' : 'text-zinc-400 hover:text-zinc-600'}`}
              >
                Terpopuler
              </a>
            </div>
          </div>

          {/* LIST DRAMA */}
          <DramaExplorer initialItems={items} />
        </div>
      </main>
    </div>
  )
}