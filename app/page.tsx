import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import ToolGrid from '@/components/ToolsSearch'
import { getLiveMatches, getTodayFixtures } from '@/libs/bola/api'
import { getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import { getHomePage as getKoreaDramaHome } from '@/libs/drama/drakor/drama' // Import Drama Korea
import DramaBookGrid from '@/components/drama/dramabox/DramaBoxGrid'
import DramaCard from '@/components/drama/drakor/DramaCard' // Gunakan card Korea Drama

export const metadata: Metadata = {
  title: 'My Tools – Digital Hub: Kalkulator, Livescore & Drama Streaming',
  description: 'Akses gratis kalkulator finansial, skor bola real-time liga top dunia, dan streaming drama Korea serta China terbaru dengan kualitas terbaik.',
}

export default async function Home() {
  // 1. Fetch data secara paralel (Optimasi Performance)
  const [live, today, chinaDramas, koreaHome] = await Promise.all([
    getLiveMatches(),
    getTodayFixtures(),
    getDramaByCategory('trending'),
    getKoreaDramaHome(), // Fetch Drama Korea
  ])

  // 2. Logic Livescore
  const map = new Map<number, any>()
    ;[...(live?.response || []), ...(today?.response || [])].forEach((m) => {
      map.set(m.fixture.id, m)
    })
  const matches = Array.from(map.values()).slice(0, 6)

  // 3. Extract Korea Drama Data
  const koreaSeries = koreaHome?.data?.latest_series?.slice(0, 5) || []

  return (
    <div className="space-y-24 pb-20 bg-[#fafafa]">

      {/* ========================================== */}
      {/* 🚀 HERO SECTION (Modern Mesh Gradient) */}
      {/* ========================================== */}
      <header className="relative overflow-hidden bg-[#050505] pt-20 pb-24 md:pt-32 md:pb-36">
        {/* Dekorasi Background */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-40">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-purple-900/30 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-sky-900/30 blur-[120px] rounded-full" />
        </div>

        <div className="relative max-w-5xl mx-auto px-6 text-center">
          <span className="inline-block px-4 py-1.5 mb-6 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-purple-400 rounded-full backdrop-blur-md">
            The Digital Ecosystem
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white italic tracking-tighter leading-[0.9]">
            MY <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-sky-400">TOOLS.</span>
          </h1>
          <p className="mt-8 text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto font-medium leading-relaxed">
            Platform all-in-one untuk produktivitas finansial, update skor sepak bola, dan hiburan drama Asia terpopuler.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Link href="#tools" className="px-8 py-4 bg-white text-black font-bold rounded-2xl hover:bg-zinc-200 transition-all active:scale-95">Mulai Eksplorasi</Link>
          </div>
        </div>
      </header>

      {/* ========================================== */}
      {/* 🎬 SECTION: DRAMA CHINA (Dramabox) */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="China Drama"
          subtitle="Viral & Trending"
          href="/drama/china/channel/dramabox"
          badge="Dramabox"
        />
        <div className="mt-10">
          <DramaBookGrid items={chinaDramas} limit={10} />
        </div>
      </section>

      {/* ========================================== */}
      {/* 🇰🇷 SECTION: DRAMA KOREA (NEW) */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-6">
        <SectionHeader
          title="Korean Drama"
          subtitle="Update Setiap Hari"
          href="/drama/korea"
          badge="K-Series"
        />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {koreaSeries.map((item: any) => (
            <DramaCard key={item.endpoint} drama={item} />
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 🛠️ SECTION: TOOLS (Financial & Productivity) */}
      {/* ========================================== */}
      <section id="tools" className="max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="bg-white rounded-[40px] p-8 md:p-12 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-zinc-100">
          <SectionHeader
            title="Smart Tools"
            subtitle="Hitung Segalanya Dengan Mudah"
            href="/tools"
          />
          <div className="mt-10">
            <ToolGrid />
          </div>
        </div>
      </section>

      {/* ========================================== */}
      {/* ⚽ SECTION: LIVESCORE (Elegant Dark Mode) */}
      {/* ========================================== */}
      {matches.length > 0 && (
        <section className="max-w-7xl mx-auto px-6">
          <SectionHeader
            title="Live Score"
            subtitle="Real-time Football Update"
            href="/bola/livescore"
          />

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((m: any) => (
              <div
                key={m.fixture.id}
                className="group relative bg-white rounded-3xl p-6 border border-zinc-100 hover:border-purple-200 hover:shadow-[0_20px_40px_rgba(147,51,234,0.05)] transition-all duration-500"
              >
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
                    <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">
                      {m.league.name}
                    </span>
                  </div>
                  <span className={`text-[10px] font-bold px-2 py-1 rounded-md ${m.fixture.status.short === 'NS' ? 'bg-zinc-100 text-zinc-500' : 'bg-red-50 text-red-600'}`}>
                    {m.fixture.status.short === 'NS' ? 'PRE-MATCH' : m.fixture.status.elapsed + "'"}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1 space-y-4">
                    <div className="flex items-center gap-3">
                      <img src={m.teams.home.logo} alt="" className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all" />
                      <p className="font-bold text-sm text-zinc-800">{m.teams.home.name}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <img src={m.teams.away.logo} alt="" className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all" />
                      <p className="font-bold text-sm text-zinc-800">{m.teams.away.name}</p>
                    </div>
                  </div>

                  <div className="flex flex-col items-center justify-center bg-zinc-950 text-white rounded-2xl w-14 h-20 shadow-xl">
                    <span className="text-xl font-black">{m.goals.home ?? 0}</span>
                    <div className="w-4 h-[1px] bg-zinc-700 my-1" />
                    <span className="text-xl font-black">{m.goals.away ?? 0}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ========================================== */}
      {/* 🏛️ SEO FOOTER */}
      {/* ========================================== */}
      <footer className="border-t border-zinc-100 pt-20">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-8">
          <h2 className="text-2xl font-black text-zinc-900 tracking-tight">Pusat Navigasi Digital Anda</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-zinc-500">
            <p><b>Produktivitas:</b> Kalkulator finansial cerdas untuk membantu pengelolaan keuangan harian Anda.</p>
            <p><b>Olahraga:</b> Pantau livescore liga besar dunia seperti Premier League, La Liga, hingga BRI Liga 1.</p>
            <p><b>Hiburan:</b> Update drama China viral dan drama Korea subtitle Indonesia setiap hari.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sub-component untuk Header Section agar konsisten & SEO Friendly
function SectionHeader({ title, subtitle, href, badge }: { title: string; subtitle: string; href: string; badge?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        {badge && (
          <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-purple-100 text-purple-600 rounded-full">
            {badge}
          </span>
        )}
        <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-zinc-900">
          {title}
        </h2>
        <p className="text-zinc-500 font-medium text-sm md:text-base">
          {subtitle}
        </p>
      </div>
      <Link
        href={href}
        className="group flex items-center gap-2 text-sm font-bold text-zinc-900 hover:text-purple-600 transition-all"
      >
        Lihat Selengkapnya
        <span className="w-8 h-8 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white transition-all">
          →
        </span>
      </Link>
    </div>
  )
}