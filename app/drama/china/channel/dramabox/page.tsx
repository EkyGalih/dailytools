import type { Metadata } from 'next'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaExplorer from '@/components/drama/dramabox/DramaExplorer'
import { SectionHeader } from '@/components/ui/SectionHeader' // Pastikan ini reusable

export const metadata: Metadata = {
  title: 'Drama China Viral & Trending Hari Ini | My Tools',
  description: 'Nonton drama China viral dan trending hari ini. Update harian, episode lengkap, genre romance, CEO, dan drama pendek populer.',
  // ... metadata lainnya tetap sama
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
      <main className="min-h-[60vh] flex flex-col items-center justify-center p-10 text-center">
        <div className="w-20 h-20 bg-zinc-900 rounded-3xl flex items-center justify-center mb-6 border border-white/5">
          <span className="text-3xl animate-pulse">⚙️</span>
        </div>
        <h1 className="text-2xl font-black text-white italic tracking-tighter">PROVIDER MAINTENANCE</h1>
        <p className="text-zinc-500 mt-2 max-w-xs mx-auto text-sm">
          Data sedang diperbarui oleh provider Dramabox. Silakan kembali beberapa saat lagi.
        </p>
      </main>
    )
  }

  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      <DramaHero activeChannel="dramabox" />

      <main className="max-w-7xl mx-auto px-6 -mt-10 relative z-10">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-zinc-100">
          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tighter text-zinc-900 italic uppercase">
              Explore <span className="text-purple-600">Library</span>
            </h2>
            <p className="text-zinc-500 font-medium text-sm">Temukan ribuan judul drama pendek terbaik</p>
          </div>

          <DramaExplorer initialItems={safeItems} />
        </div>
      </main>

      {/* JSON-LD Tetap Sama */}
    </div>
  )
}