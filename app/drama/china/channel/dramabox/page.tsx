import type { Metadata } from 'next'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaExplorer from '@/components/drama/dramabox/DramaExplorer'

export const metadata: Metadata = {
  title: 'Drama China Viral & Trending Hari Ini | My Tools',
  description: 'Nonton drama China viral dan trending hari ini. Update harian, episode lengkap, genre romance, CEO, dan drama pendek populer.',
  alternates: {
    canonical: '/drama/china/channel/dramabox',
  }
}

export const dynamic = "force-dynamic"

async function getTrendingDramaBox() {
  try {
    const res = await fetch("https://dramabox.sansekai.my.id/api/dramabox/latest", {
      next: { revalidate: 3600 },
    })
    if (!res.ok) return []
    return res.json()
  } catch (err) {
    return []
  }
}

export default async function DramaChinaPage() {
  const items = await getTrendingDramaBox()
  const safeItems = Array.isArray(items) ? items : []

  if (safeItems.length === 0) {
    return (
      <main className="min-h-[70vh] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 md:w-20 md:h-20 bg-zinc-900 rounded-2xl md:rounded-3xl flex items-center justify-center mb-6 border border-white/5 shadow-xl">
          <span className="text-2xl md:text-3xl animate-pulse">⚙️</span>
        </div>
        <h1 className="text-xl md:text-2xl font-black text-white italic tracking-tighter uppercase">PROVIDER MAINTENANCE</h1>
        <p className="text-zinc-500 mt-2 max-w-[280px] md:max-w-xs mx-auto text-xs md:text-sm font-medium">
          Data sedang diperbarui oleh provider. Silakan kembali beberapa saat lagi.
        </p>
      </main>
    )
  }

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* Hero biasanya sudah memiliki padding-bottom besar untuk overlap */}
      <DramaHero activeChannel="dramabox" />

      {/* Kontainer Utama: px-4 di mobile, px-6 di desktop */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-20 relative z-10">

        {/* Card Putih: Rounded lebih kecil di mobile (2rem), besar di desktop (40px) */}
        <div className="bg-white rounded-[2rem] md:rounded-[40px] p-5 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-zinc-100">

          {/* Header Section: Margin bottom lebih kecil di mobile */}
          <div className="mb-8 md:mb-12">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-8 h-[2px] bg-purple-600 rounded-full" />
              <span className="text-[10px] font-black uppercase tracking-widest text-purple-600">Premium Content</span>
            </div>

            <h2 className="text-2xl md:text-4xl font-black tracking-tighter text-zinc-900 italic uppercase leading-none">
              Explore <span className="text-purple-600">Library</span>
            </h2>
            <p className="text-zinc-400 font-bold text-[11px] md:text-sm mt-2 uppercase tracking-wide">
              Temukan ribuan judul drama pendek terbaik
            </p>
          </div>

          {/* Grid Drama (DramaExplorer biasanya sudah menangani grid-cols internal) */}
          <DramaExplorer initialItems={safeItems} />
        </div>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "ItemList",
            itemListElement: safeItems.slice(0, 10).map((item: any, i: number) => ({
              "@type": "ListItem",
              position: i + 1,
              url: `https://mytools.web.id/drama/china/channel/dramabox/detail/${item.bookId}`,
              name: item.bookName || item.title,
            })),
          }),
        }}
      />
    </div>
  )
}