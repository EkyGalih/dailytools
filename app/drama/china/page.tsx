import type { Metadata } from 'next'
import DramaHero from '@/components/drama/DramaHero'
import DramaVideoGrid from '@/components/drama/DramaVideoGrid'
import { getTrendingDramaChina } from '@/libs/drama/youtube'
import DramaFilters from '@/components/drama/DramaFilter'

export const metadata: Metadata = {
  title: 'Drama China Viral & Trending Hari Ini',
  description:
    'Daftar drama China viral dan trending (short/reel) update harian. Lengkap kategori, embed video, dan rekomendasi terkait.',
}

export default async function DramaChinaPage() {
  const items = await getTrendingDramaChina({
    q: 'chinese drama short reelshort episode',
    maxResults: 18,
    days: 7,
  })

  return (
    <section className="space-y-10">
      <DramaHero />

      <div className="space-y-4">
        <DramaFilters />
        <DramaVideoGrid items={items} />
      </div>

      {/* SEO text */}
      <section className="max-w-4xl text-sm text-gray-700 space-y-3">
        <h2 className="text-lg font-semibold text-gray-900">
          Drama China yang Lagi Viral
        </h2>
        <p>
          Halaman ini menampilkan video drama China yang sedang populer berdasarkan hasil pencarian dan
          performa penayangan terbaru. Kamu bisa pilih kategori seperti romance, CEO/boss, revenge,
          dan time travel.
        </p>
      </section>
    </section>
  )
}