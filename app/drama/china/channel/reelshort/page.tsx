import DramaBookSkeleton from '@/components/common/DramaBoxSkleton'
import AffiliateChannelPopup from '@/components/drama/ads/AffiliateChannelPopup'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'
import DramaHero from '@/components/drama/reelshort/DramaHero'
import ReelShortCard from '@/components/drama/reelshort/ReelShortCard'
import ReelShortSearch from '@/components/drama/reelshort/ReelShortSearch'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'
import { getReelShortHomepage, searchReelShort } from '@/libs/drama/reelshort/reelshort'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Nonton Drama Pendek ReelShort Viral Sub Indo | My Tools',
  description: 'Kumpulan drama pendek viral dan terbaru dari ReelShort. Streaming drama singkat genre CEO, Romance, dan Revenge dengan kualitas terbaik.',
  keywords: ['reelshort', 'drama pendek', 'drama viral', 'nonton reelshort sub indo'],
}

export default async function ReelShortPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { q } = await searchParams
  const keyword = q?.trim()

  let items: any[] = []
  let sectionTitle = 'Populer'
  let sectionHighlight = 'Trending'

  if (keyword) {
    const res = await searchReelShort(keyword)
    items = res?.results ?? []
    sectionTitle = 'Hasil'
    sectionHighlight = `Pencarian "${keyword}"`
  } else {
    const home = await getReelShortHomepage()
    items = home?.data?.lists?.[0]?.banners?.map((b: any) => ({
      bookId: b.jump_param.book_id,
      title: b.jump_param.book_title,
      cover: b.pic,
      totalEpisodes: b.jump_param.chapter_count,
      description: '',
    })) ?? []
  }

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      <AffiliateMiniPopup />

      {/* HERO SECTION - Dark Mesh Design */}
      <DramaHero activeChannel="reelshort" />

      {/* MAIN CONTENT - Overlap Card Style */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-32 relative z-10">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-zinc-100">

          {/* SECTION HEADER */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-zinc-50 pb-8">
            <div className="space-y-2">
              <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-purple-100 text-purple-600 rounded-full">
                Discovery Mode
              </span>
              <h2 className="text-3xl md:text-5xl font-black tracking-tighter text-zinc-900 italic uppercase">
                {sectionTitle} <span className="text-purple-600">{sectionHighlight}</span>
              </h2>
              <p className="text-zinc-500 font-medium text-sm">
                {keyword ? `Menampilkan drama yang relevan dengan kata kunci Anda` : `Koleksi drama pendek paling banyak ditonton minggu ini`}
              </p>
            </div>

            {/* SEARCH COMPONENT */}
            <div className="w-full md:w-auto">
              <ReelShortSearch />
            </div>
          </div>

          {/* GRID CONTENT */}
          {items.length === 0 ? (
            <div className="py-10">
              <DramaBookSkeleton count={10} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8">
              {items.map((item: any) => (
                <ReelShortCard
                  key={item.bookId}
                  item={{
                    bookId: item.bookId,
                    title: item.title,
                    cover: item.cover,
                    totalEpisodes: item.chapterCount ?? item.totalEpisodes,
                  }}
                />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}