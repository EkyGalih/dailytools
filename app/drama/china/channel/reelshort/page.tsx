import DramaBookSkeleton from '@/components/common/DramaBoxSkleton'
import AffiliateChannelPopup from '@/components/drama/ads/AffiliateChannelPopup'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'
import DramaHero from '@/components/drama/reelshort/DramaHero'
import ReelShortCard from '@/components/drama/reelshort/ReelShortCard'
import ReelShortSearch from '@/components/drama/reelshort/ReelShortSearch'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'
import {
  getReelShortHomepage,
  searchReelShort,
} from '@/libs/drama/reelshort/reelshort'

export const metadata = {
  title: 'ReelShort – Drama Pendek Viral',
  description: 'Kumpulan drama pendek populer & terbaru.',
}

export default async function ReelShortPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>
}) {
  /* ✅ WAJIB await */
  const { q } = await searchParams
  const keyword = q?.trim()

  let items: any[] = []
  let sectionTitle = '🔥 Populer'

  if (keyword) {
    const res = await searchReelShort(keyword)
    items = res?.results ?? []
    sectionTitle = `🔍 Hasil pencarian "${keyword}"`
  } else {
    const home = await getReelShortHomepage()
    items =
      home?.data?.lists?.[0]?.banners?.map((b: any) => ({
        bookId: b.jump_param.book_id,
        title: b.jump_param.book_title,
        cover: b.pic,
        totalEpisodes: b.jump_param.chapter_count,
        description: '',
      })) ?? []
  }
  const popupProduct = getAffiliatePopup()


  return (
    <section className="space-y-10">
      {popupProduct && <AffiliateChannelPopup product={popupProduct} />}
      <AffiliateMiniPopup />
      <DramaHero activeChannel="reelshort" />

      <div className="flex items-center justify-between gap-4 border-b pb-3 px-4">
        <h2 className="text-lg font-bold">
          {sectionTitle}
        </h2>

        <ReelShortSearch />
      </div>

      {items.length === 0 ? (
        <div className="px-4">
          <DramaBookSkeleton count={8} />
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 px-4">
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
    </section>
  )
}