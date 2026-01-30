import DramaBookSkeleton from '@/components/common/DramaBoxSkleton'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'
import DramaHero from '@/components/drama/reelshort/DramaHero'
import ReelShortCard from '@/components/drama/reelshort/ReelShortCard'
import ReelShortSearch from '@/components/drama/reelshort/ReelShortSearch'
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
      <DramaHero activeChannel="reelshort" />

      {/* Kontainer Utama: px-4 di mobile, px-6 di desktop */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-32 relative z-10">
        {/* Card Putih: Rounded lebih kecil di mobile (2rem), besar di desktop (40px) */}
        <div className="bg-white rounded-[2rem] md:rounded-[40px] p-5 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-zinc-100">

          {/* SECTION HEADER: Center di mobile, Left di desktop */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 md:mb-12 border-b border-zinc-50 pb-6 md:pb-8">
            <div className="space-y-1 md:space-y-2 text-center md:text-left">
              <span className="px-2.5 py-0.5 text-[9px] font-black uppercase tracking-widest bg-purple-100 text-purple-600 rounded-md">
                Discovery Mode
              </span>
              <h2 className="text-2xl md:text-5xl font-black tracking-tighter text-zinc-900 italic uppercase leading-none">
                {sectionTitle} <span className="text-purple-600">{sectionHighlight}</span>
              </h2>
              <p className="text-zinc-400 font-bold text-[10px] md:text-sm uppercase tracking-wide">
                {keyword ? `Pencarian Relevan untuk Anda` : `Koleksi drama pendek paling populer`}
              </p>
            </div>

            <div className="w-full md:w-auto">
              <ReelShortSearch />
            </div>
          </div>

          {/* GRID CONTENT: Gap lebih kecil di mobile */}
          {items.length === 0 ? (
            <div className="py-10">
              <DramaBookSkeleton count={10} />
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8">
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