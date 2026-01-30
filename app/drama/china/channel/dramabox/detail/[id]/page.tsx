import { notFound } from 'next/navigation'
import { getDramaDetail, getDramaEpisodes, getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import { Metadata } from 'next'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaBookGrid from '@/components/drama/dramabox/DramaBoxGrid'
import UnifiedDramaboxView from '@/components/drama/dramabox/UnifiedDramaboxView'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
  const { id } = await (params)
  const detail = await getDramaDetail(id)
  if (!detail) return {}
  const site = process.env.NEXT_PUBLIC_SITE_URL!

  return {
    title: `Nonton ${detail.bookName} Subtitle Indonesia | My Tools`,
    description: detail.introduction?.slice(0, 160),
    openGraph: {
      title: `${detail.bookName} - Drama China Viral`,
      images: [{ url: detail.coverWap || `${site}/og-fallback.jpg` }],
    },
  }
}

export default async function DramaChinaUnifiedPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params

  const [detail, episodes, related] = await Promise.all([
    getDramaDetail(id),
    getDramaEpisodes(id),
    getDramaByCategory('trending')
  ])

  if (!detail || episodes.length === 0) notFound()

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
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
        </section>
      </main>
    </div>
  )
}