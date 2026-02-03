import type { Metadata } from 'next'
import Link from 'next/link'
import ToolGrid from '@/components/ToolsSearch'
import { getLiveMatches, getTodayFixtures } from '@/libs/bola/api'
import { getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import { getHomePage as getKoreaDramaHome } from '@/libs/drama/drakor/drama'
import DramaBookGrid from '@/components/drama/dramabox/DramaBoxGrid'
import DramaCard from '@/components/drama/drakor/DramaCard'
import { Sparkles, Minimize2, Wallet, ArrowUpRight, LayoutGrid } from 'lucide-react'
import { getAnimeHomePage } from '@/libs/anime/anime'
import AnimeCard from '@/components/anime/AnimeCard'

export const metadata: Metadata = {
  title: 'Tamanto – Streaming Drama Asia, Anime & Manga Terlengkap',
  description: 'Nonton Drama China viral (Dramabox), Drama Korea terbaru, Anime Ongoing, hingga baca Manga & Manhwa sub Indo kualitas HD.',
  keywords: [
    'Tamanto', 'Nonton Drama China', 'Drama Korea Sub Indo', 'Streaming Anime',
    'Baca Manga', 'Manhwa Indonesia', 'Dramabox Free', 'Hiburan Asia'
  ],
  authors: [{ name: 'Tamanto Team' }],
  openGraph: {
    title: 'Tamanto – Hiburan Tanpa Batas, Kita Nonton Bareng!',
    description: 'Platform streaming Drama Asia, Anime, dan koleksi Manga terlengkap dengan update setiap hari.',
    url: 'https://tamanto.web.id',
    siteName: 'Tamanto',
    locale: 'id_ID',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tamanto – Kita Nonton, Kita Terhibur',
    description: 'Streaming Drama China, Korea, Anime, dan Manga terbaru dalam satu genggaman.',
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-icon.png',
    other: {
      rel: 'icon',
      url: '/logo.png',
      sizes: '512x512',
      type: 'image/png',
    },
    }
}

export default async function Home() {
  const [live, today, chinaDramas, koreaHome, animeHome] = await Promise.all([
    getLiveMatches(),
    getTodayFixtures(),
    getDramaByCategory('trending'),
    getKoreaDramaHome(),
    getAnimeHomePage()
  ])

  const map = new Map<number, any>()
    ;[...(live?.response || []), ...(today?.response || [])].forEach((m) => {
      map.set(m.fixture.id, m)
    })
  const matches = Array.from(map.values()).slice(0, 6)
  const koreaSeries = koreaHome?.data?.latest_series?.slice(0, 5) || []
  const animeList = animeHome?.data || []
  console.log(animeList)

  return (
    <div className="space-y-24 pb-20 bg-[#fafafa]">
      {/* 🚀 HERO SECTION */}
      <header className="relative overflow-hidden bg-[#020202] pt-24 pb-28 md:pt-40 md:pb-52">
        {/* Layer 1: Animasi Mesh Gradient yang lebih elegan */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] left-[-15%] w-[60%] h-[70%] bg-indigo-600/20 blur-[140px] rounded-full animate-pulse" />
          <div className="absolute bottom-[-10%] right-[-15%] w-[60%] h-[70%] bg-rose-600/20 blur-[140px] rounded-full animate-pulse" style={{ animationDelay: '2s' }} />
          {/* Texture overlay agar tidak terlalu flat */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 text-center">
          {/* Badge dengan Glitch/Glow Effect */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[11px] font-black tracking-[0.2em] uppercase bg-white/[0.03] border border-white/10 text-indigo-400 rounded-full backdrop-blur-xl shadow-2xl shadow-indigo-500/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
            </span>
            Pokok Ite Demen Manto TV
          </div>

          {/* H1 dengan Brutalist Typography & Gradient */}
          <h1 className="text-6xl md:text-[10rem] font-black text-white italic tracking-tighter leading-[0.8] uppercase">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500 drop-shadow-[0_0_30px_rgba(99,102,241,0.3)]">TA</span>MANTO.
          </h1>

          {/* Slogan & Deskripsi (Mobile Friendly) */}
          <div className="mt-10 space-y-4">
            <h2 className="text-xl md:text-3xl font-bold text-zinc-100 tracking-tight">
              Kita Nonton, Kita Terhibur.
            </h2>
            <p className="max-w-xl mx-auto text-zinc-400 text-sm md:text-lg font-medium leading-relaxed italic border-l-2 border-indigo-500/30 pl-4 md:border-l-0 md:pl-0">
              Destinasi premium untuk streaming <span className="text-zinc-200">Drama China, Korea, Anime,</span> hingga koleksi <span className="text-zinc-200">Manga</span> terbaik dalam genggaman Anda.
            </p>
          </div>

          {/* Floating Action (Updated) */}
          <div className="mt-12 flex flex-wrap justify-center gap-4 animate-in fade-in slide-in-from-bottom-5 duration-1000">
            {/* Tombol Drama */}
            <Link
              href="#drama"
              className="px-8 py-3 bg-white text-black font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-indigo-500 hover:text-white transition-all duration-300 active:scale-95 shadow-xl shadow-white/5 flex items-center gap-2"
            >
              Mulai Nonton
            </Link>

            {/* Tombol Anime */}
            <Link
              href="#anime"
              className="px-8 py-3 bg-transparent text-white border border-white/20 font-black uppercase text-xs tracking-widest rounded-2xl backdrop-blur-md hover:bg-white/5 transition-all flex items-center gap-2"
            >
              Jelajahi Anime
            </Link>

            {/* Tombol Manga (New) */}
            <Link
              href="#manga"
              className="px-8 py-3 bg-transparent text-zinc-400 border border-zinc-800 font-black uppercase text-xs tracking-widest rounded-2xl hover:text-rose-400 hover:border-rose-400/50 transition-all flex items-center gap-2"
            >
              Baca Manga
            </Link>
          </div>
        </div>

        {/* Decorative Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#020202] to-transparent" />
      </header>

      {/* ========================================== */}
      {/* 📂 SECTION: CATEGORY HUB (NEW) */}
      {/* ========================================== */}
      <section className="max-w-7xl mx-auto px-6 -mt-32 md:-mt-40 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {/* CATEGORY: KREATOR */}
          <Link href="/kreator" className="group relative bg-white border border-zinc-100 rounded-[2.5rem] p-8 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-purple-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
            <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-purple-100 text-purple-600 rounded-[1.25rem] group-hover:bg-purple-600 group-hover:text-white transition-colors duration-500">
                <Sparkles size={28} />
              </div>
              <ArrowUpRight className="text-zinc-200 group-hover:text-purple-600 transition-colors" />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Creator<br />Suite</h3>
            <p className="mt-4 text-sm text-zinc-500 font-medium">Optimasi IG, TikTok & YT dengan generator caption dan hashtag.</p>
          </Link>

          {/* CATEGORY: KOMPRESS */}
          <Link href="/kompress" className="group relative bg-white border border-zinc-100 rounded-[2.5rem] p-8 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-blue-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
            <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-blue-100 text-blue-600 rounded-[1.25rem] group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                <Minimize2 size={28} />
              </div>
              <ArrowUpRight className="text-zinc-200 group-hover:text-blue-600 transition-colors" />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">File<br />Optimizer</h3>
            <p className="mt-4 text-sm text-zinc-500 font-medium">Kompres Gambar & PDF secara lokal. 100% Aman & Tanpa Upload.</p>
          </Link>

          {/* CATEGORY: KALKULATOR */}
          <Link href="/kalkulator" className="group relative bg-white border border-zinc-100 rounded-[2.5rem] p-8 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 overflow-hidden">
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />
            <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-emerald-100 text-emerald-600 rounded-[1.25rem] group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                <Wallet size={28} />
              </div>
              <ArrowUpRight className="text-zinc-200 group-hover:text-emerald-600 transition-colors" />
            </div>
            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Finance<br />Suite</h3>
            <p className="mt-4 text-sm text-zinc-500 font-medium">Simulasi KPR, Cicilan, THR, hingga perhitungan Pajak PPh 21.</p>
          </Link>
        </div>
      </section>

      {/* 🎬 SECTION: DRAMA CHINA */}
      <section id="drama" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <SectionHeader title="China Drama" subtitle="Viral & Trending" href="/drama/china/channel/dramabox" badge="Dramabox" />
        <div className="mb-8 md:mb-10"><DramaBookGrid items={chinaDramas} limit={10} /></div>

        <SectionHeader title="Korean Drama" subtitle="Update Setiap Hari" href="/drama/korea" badge="K-Series" />
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {koreaSeries.map((item: any) => (
            <DramaCard key={item.endpoint} drama={item} />
          ))}
        </div>
      </section>

      {/*  SECTION: ANIME */}
      <section id="anime" className="max-w-7xl mx-auto px-6 scroll-mt-24">
        <SectionHeader
          title="ANIME"
          subtitle="Update Setiap Hari"
          href="/anime"
          badge="Anime"
        />

        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {animeList?.ongoing?.slice(0, 5).map((item: any) => (
            <AnimeCard
              key={item.endpoint}
              endpoint={item.endpoint}
              title={item.title}
              thumbnail={item.thumbnail}
              episode={`${item.episode || "?"}`}
              info={item.info}
              update={item.update}
              link=''
            />
          ))}
        </div>
      </section>

      {/* ========================================== */}
      {/* 📚 SECTION: KOMIK UNIVERSE */}
      {/* ========================================== */}
      <section id="manga" className="max-w-7xl mx-auto px-6 mt-20 scroll-mt-24">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-900">
              Komik <span className="text-purple-600">Universe</span>
            </h2>
            <p className="text-zinc-500 italic mt-2 text-sm md:text-base">
              Jelajahi manga Jepang, manhwa Korea, hingga manhua China terbaru.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">

          {/* ✅ MANGA */}
          <Link
            href="/komik/manga"
            className="group relative bg-white border border-zinc-100 rounded-[2.5rem] p-8 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-orange-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />

            <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-orange-100 text-orange-600 rounded-[1.25rem] group-hover:bg-orange-600 group-hover:text-white transition-colors duration-500">
                <LayoutGrid size={28} />
              </div>
              <ArrowUpRight className="text-zinc-200 group-hover:text-orange-600 transition-colors" />
            </div>

            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              Manga<br />Japan
            </h3>
            <p className="mt-4 text-sm text-zinc-500 font-medium">
              Koleksi manga terbaik dengan update chapter terbaru setiap hari.
            </p>
          </Link>

          {/* ✅ MANHUA */}
          <Link
            href="/komik/manhua"
            className="group relative bg-white border border-zinc-100 rounded-[2.5rem] p-8 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />

            <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-emerald-100 text-emerald-600 rounded-[1.25rem] group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-500">
                <Sparkles size={28} />
              </div>
              <ArrowUpRight className="text-zinc-200 group-hover:text-emerald-600 transition-colors" />
            </div>

            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              Manhua<br />China
            </h3>
            <p className="mt-4 text-sm text-zinc-500 font-medium">
              Dunia kultivasi, sistem, rebirth, dan action fantasy terbaik.
            </p>
          </Link>

          {/* ✅ MANHWA */}
          <Link
            href="/komik/manhwa"
            className="group relative bg-white border border-zinc-100 rounded-[2.5rem] p-8 hover:shadow-[0_40px_80px_rgba(0,0,0,0.06)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-cyan-50 rounded-full group-hover:scale-150 transition-transform duration-700 -z-10" />

            <div className="flex justify-between items-start mb-10">
              <div className="p-4 bg-cyan-100 text-cyan-600 rounded-[1.25rem] group-hover:bg-cyan-600 group-hover:text-white transition-colors duration-500">
                <Minimize2 size={28} />
              </div>
              <ArrowUpRight className="text-zinc-200 group-hover:text-cyan-600 transition-colors" />
            </div>

            <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
              Manhwa<br />Korea
            </h3>
            <p className="mt-4 text-sm text-zinc-500 font-medium">
              Webtoon Korea populer: action, romance, dungeon, hingga regression.
            </p>
          </Link>

        </div>
      </section>

      {/* 🛠️ SECTION: TOOLS (Search Grid) */}
      <section id="tools" className="max-w-7xl mx-auto px-6 scroll-mt-20">
        <div className="bg-white rounded-[40px] p-8 md:p-16 shadow-[0_30px_100px_rgba(0,0,0,0.04)] border border-zinc-100">
          <SectionHeader title="Smart Search" subtitle="Temukan tool spesifik yang Anda butuhkan" href="/tools" />
          <div className="mt-12"><ToolGrid /></div>
        </div>
      </section>

      {/* ⚽ SECTION: LIVESCORE - Diperbaiki logic mapping-nya */}
      <section className="max-w-7xl mx-auto px-6">
        <SectionHeader title="Live Score" subtitle="Real-time Football Update" href="/bola/livescore" />

        {matches.length > 0 ? (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((m: any) => (
              <LiveMatchCard key={m.fixture.id} match={m} />
            ))}
          </div>
        ) : (
          <div className="mt-10 p-12 border-2 border-dashed border-zinc-200 rounded-[2rem] text-center">
            <p className="text-zinc-400 font-medium italic">Tidak ada pertandingan berlangsung saat ini.</p>
          </div>
        )}
      </section>

      {/* 🏛️ SEO FOOTER INFO */}
      <footer className="border-t border-zinc-100 pt-20">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12 text-sm text-zinc-500">
          <div className="space-y-4">
            <h4 className="font-black text-zinc-900 uppercase italic tracking-widest">Productivity</h4>
            <p>Kumpulan tools cerdas untuk membantu pengelolaan finansial, pajak, dan optimasi file harian Anda tanpa perlu registrasi.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-zinc-900 uppercase italic tracking-widest">Entertainment</h4>
            <p>Update streaming drama China (Dramabox) dan Korea subtitle Indonesia tercepat dengan kualitas visual terbaik.</p>
          </div>
          <div className="space-y-4">
            <h4 className="font-black text-zinc-900 uppercase italic tracking-widest">Sports</h4>
            <p>Pantau hasil pertandingan sepak bola dari liga-liga elit dunia secara real-time lengkap dengan data statistik mendalam.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Sub-komponen untuk Card Livescore agar kode lebih bersih
function LiveMatchCard({ match }: { match: any }) {
  return (
    <div className="group relative bg-white rounded-3xl p-6 border border-zinc-100 hover:border-purple-200 hover:shadow-[0_20px_40px_rgba(147,51,234,0.05)] transition-all duration-500">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 bg-red-500 rounded-full animate-ping" />
          <span className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{match.league.name}</span>
        </div>
        <span className={`text-[9px] font-black px-2 py-1 rounded-md uppercase tracking-tighter ${match.fixture.status.short === 'NS' ? 'bg-zinc-100 text-zinc-500' : 'bg-red-50 text-red-600'}`}>
          {match.fixture.status.short === 'NS' ? 'PRE-MATCH' : `${match.fixture.status.elapsed}'`}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex-1 space-y-4">
          {[match.teams.home, match.teams.away].map((team, idx) => (
            <div key={idx} className="flex items-center gap-3">
              <img src={team.logo} alt="" className="w-6 h-6 object-contain grayscale group-hover:grayscale-0 transition-all" />
              <p className="font-bold text-sm text-zinc-800 tracking-tight">{team.name}</p>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-center justify-center bg-zinc-950 text-white rounded-2xl w-14 h-20 shadow-xl">
          <span className="text-xl font-black">{match.goals.home ?? 0}</span>
          <div className="w-4 h-[1px] bg-zinc-700 my-1 opacity-30" />
          <span className="text-xl font-black">{match.goals.away ?? 0}</span>
        </div>
      </div>
    </div>
  )
}

function SectionHeader({ title, subtitle, href, badge }: { title: string; subtitle: string; href: string; badge?: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
      <div className="space-y-2">
        {badge && <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-purple-100 text-purple-600 rounded-full">{badge}</span>}
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-zinc-900 leading-none italic uppercase">{title}</h2>
        <p className="text-zinc-500 font-medium text-sm md:text-base italic">{subtitle}</p>
      </div>
      <Link href={href} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-900 hover:text-purple-600 transition-all">
        Explore More <span className="w-10 h-10 rounded-full border border-zinc-200 flex items-center justify-center group-hover:bg-purple-600 group-hover:border-purple-600 group-hover:text-white transition-all">→</span>
      </Link>
    </div>
  )
}