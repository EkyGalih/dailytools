import type { Metadata } from 'next'
import Link from 'next/link'
import ToolGrid from '@/components/ToolsSearch'
import { getLiveMatches, getTodayFixtures } from '@/libs/bola/api'
import { getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import DramaBookGrid from '@/components/drama/dramabox/DramaBoxGrid'

export const metadata: Metadata = {
  title: 'My Tools – Kalkulator, Livescore & Drama China',
  description: 'Tools online gratis, livescore bola real-time, dan video drama China viral.',
}

export default async function Home() {
  // 1. Ambil semua data secara paralel agar cepat
  const [live, today, dramas] = await Promise.all([
    getLiveMatches(),
    getTodayFixtures(),
    getDramaByCategory('trending'),
  ])

  // 2. Gabung & Dedupe (Sesuai logika "benar" di halaman Bola kamu)
  const map = new Map<number, any>()
    ;[...(live?.response || []), ...(today?.response || [])].forEach((m) => {
      map.set(m.fixture.id, m)
    })

  // 3. Batasi hanya 6 pertandingan untuk tampilan Home
  const matches = Array.from(map.values()).slice(0, 6)

  return (
    <section className="space-y-16">
      {/* HERO */}
      <header className="rounded-5xl bg-gradient-to-br from-black to-sky-900 text-white px-6 py-14 md:py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold italic tracking-tighter">
          MY TOOLS
        </h1>
        <p className="mt-6 text-gray-400 text-lg max-w-2xl mx-auto">
          Satu tempat untuk kalkulator finansial, skor bola real-time, dan update drama China terbaru.
        </p>
      </header>

      {/* 🎬 DRAMA CHINA TERBARU */}
      <section className="max-w-7xl mx-auto px-4 space-y-8">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-black tracking-tight">
              🎬 Drama China Populer
            </h2>
            <p className="text-gray-500 text-sm">
              Drama viral & trending yang lagi ramai ditonton
            </p>
          </div>

          <Link
            href="/drama/china/channel/dramabox"
            className="inline-flex items-center gap-2 rounded-full 
             bg-gradient-to-r from-indigo-600 to-purple-600
             px-5 py-2 text-sm font-semibold text-white
             shadow-md shadow-indigo-500/20
             hover:from-indigo-700 hover:to-purple-700
             hover:shadow-lg transition-all"
          >
            Lihat Semua
            <span className="text-base">→</span>
          </Link>
        </div>

        <DramaBookGrid items={dramas} limit={6} />
      </section>

      {/* TOOLS SECTION */}
      <section className="max-w-5xl mx-auto px-4">
        <ToolGrid />
      </section>

      {/* ⚽ LIVESCORE BOLA - Tampilan Compact */}
      {matches.length > 0 && (
        <section className="max-w-6xl mx-auto px-4 space-y-8">
          <div className="flex items-end justify-between border-b pb-4">
            <div>
              <h2 className="text-3xl font-black uppercase tracking-tight">
                🔴 Livescore
              </h2>
              <p className="text-gray-500 text-sm">Pertandingan hari ini</p>
            </div>
            <Link
              href="/bola/livescore"
              className="text-indigo-600 font-semibold hover:text-indigo-800 transition-colors text-sm"
            >
              Lihat Jadwal Lengkap →
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {matches.map((m: any) => (
              <div
                key={m.fixture.id}
                className="group rounded-2xl border bg-white p-5 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-[10px] font-bold uppercase bg-gray-100 px-2 py-1 rounded text-gray-600 truncate max-w-[150px]">
                    {m.league.name}
                  </span>
                  <span className="text-red-600 text-[10px] font-bold animate-pulse">
                    {m.fixture.status.short === 'NS' ? 'COMING' : 'LIVE'}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-2">
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2">
                      <img src={m.teams.home.logo} alt={m.teams.home.name} className="w-5 h-5 object-contain" />
                      <p className="font-semibold text-sm line-clamp-1">{m.teams.home.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <img src={m.teams.away.logo} alt={m.teams.away.name} className="w-5 h-5 object-contain" />
                      <p className="font-semibold text-sm line-clamp-1">{m.teams.away.name}</p>
                    </div>
                  </div>

                  <div className="bg-gray-50 px-3 py-2 rounded-xl text-center min-w-[50px]">
                    <p className="font-black text-lg">
                      {m.goals.home ?? 0} : {m.goals.away ?? 0}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FOOTER SEO */}
      <footer className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-xl font-bold text-gray-800">Solusi All-in-One: My Tools</h2>
          <p className="text-gray-500 text-sm leading-relaxed">
            Kami menggabungkan kemudahan akses alat bantu harian dengan hiburan berkualitas.
            Mulai dari memantau skor pertandingan tim favorit Anda hingga menonton cuplikan drama China
            terbaru yang sedang viral di media sosial.
          </p>
        </div>
      </footer>
    </section>
  )
}