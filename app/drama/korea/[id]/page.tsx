import AffiliateMiniPopup from "@/components/drama/ads/AffiliateMiniPopup"
import DramaCard from "@/components/drama/drakor/DramaCard"
import DramaHero from "@/components/drama/drakor/DramaHero"
import EpisodePlayer from "@/components/drama/drakor/EpisodePlayer"
import RefreshButton from "@/components/drama/drakor/RefreshButton"
import { getDramaByGenre, getDramaDetail } from "@/libs/drama/drakor/drama"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, Star, Calendar, Globe, Film, ChevronRight, PlayCircle, User2, Download, MonitorPlay, ArrowLeft } from "lucide-react"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const raw = await getDramaDetail(id)
  if (!raw?.data) return { title: "Drama Tidak Ditemukan" }
  const drama = raw.data
  return {
    title: `Nonton ${drama.title} Sub Indo Full Episode | Hallyu Station`,
    description: `Streaming & Download ${drama.title} Subtitle Indonesia. ${drama.synopsis?.slice(0, 150)}...`,
    openGraph: {
      images: [drama.thumbnail]
    }
  }
}

export default async function DramaDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const raw = await getDramaDetail(id)

  if (!raw?.data) {
    return (
      <main className="min-h-screen flex items-center justify-center p-8 bg-[#FAFAFA]">
        <div className="bg-white p-12 rounded-[3.5rem] shadow-2xl border border-zinc-100 text-center space-y-6 max-w-lg">
          <div className="w-24 h-24 bg-rose-50 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto rotate-6 shadow-inner">
            <Sparkles size={48} />
          </div>
          <h1 className="text-3xl font-black text-zinc-900 uppercase italic tracking-tighter">Data Terputus</h1>
          <p className="text-zinc-500 font-medium italic">Server sedang mengalami gangguan atau drama telah dihapus.</p>
          <RefreshButton />
        </div>
      </main>
    )
  }

  const drama = raw.data
  const relatedAll = await Promise.all(drama.genres.map((g: string) => getDramaByGenre(g)))
  const merged = relatedAll
    .flatMap((r) => r?.datas ?? [])
    .filter((v, i, arr) => arr.findIndex(x => x.endpoint === v.endpoint) === i)

  return (
    <main className="bg-[#fafafa] min-h-screen pb-20">
      <AffiliateMiniPopup />
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">
        <DramaHero />

        <div className="max-w-7xl mx-auto px-4 md:px-10 relative z-10 -mt-8 md:-mt-4">

          {/* ✅ Breadcrumb: Dibuat lebih solid agar tidak 'transparan kotor' saat menindih hero */}
          <nav className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-2xl border border-zinc-100 shadow-lg text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 mb-8 ml-4 md:ml-8">
            <Link href="/" className="hover:text-rose-500 transition-colors">Home</Link>
            <ChevronRight size={12} className="text-zinc-300" />
            <Link href="/drama/korea" className="hover:text-rose-500 transition-colors">Drama</Link>
            <ChevronRight size={12} className="text-zinc-300" />
            <span className="text-zinc-900 truncate max-w-[100px] md:max-w-none">{drama.title}</span>
          </nav>


          {/* ✅ MAIN INFO SECTION (THE CINEMA CARD) */}
          <section className="bg-white rounded-[1.5rem] p-6 md:p-16 border border-zinc-100 shadow-[0_50px_100px_rgba(0,0,0,0.02)] relative overflow-hidden">
            {/* ✅ Tombol Kembali Atas */}
            <div className="flex justify-end md:mb-4 mb-4 w-full">
              <Link
                href="/drama/korea"
                className="flex items-center justify-center gap-2 w-full md:w-auto px-8 py-4 md:px-6 md:py-3 bg-pink-50 border border-pink-50 rounded-2xl text-[10px] font-black uppercase tracking-widest text-pink-600 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm group active:scale-[0.98]"
              >
                <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                <span className="tracking-[0.2em]">Semua Drama</span>
              </Link>
            </div>
            <div className="grid lg:grid-cols-12 gap-12 items-start">

              {/* Poster with Interactive Shadow */}
              <div className="lg:col-span-4 xl:col-span-3 sticky top-10">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-tr from-rose-400 to-indigo-400 rounded-[3rem] blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
                  <div className="relative aspect-[2/3] rounded-[2.8rem] overflow-hidden shadow-2xl border-[6px] border-white">
                    <Image
                      src={drama.thumbnail || "/placeholder.jpg"}
                      alt={drama.title}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Rating Tag */}
                    {drama.rating?.score && (
                      <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md w-14 h-14 rounded-2xl shadow-xl flex flex-col items-center justify-center border border-zinc-100">
                        <Star size={14} fill="#f43f5e" className="text-rose-500" />
                        <span className="text-sm font-black text-zinc-900">{drama.rating.score}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Typography & Details */}
              <div className="lg:col-span-8 xl:col-span-9 space-y-12">
                <div className="space-y-6">
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="px-4 py-1.5 rounded-full bg-rose-50 text-rose-600 text-[10px] font-black uppercase tracking-widest border border-rose-100 shadow-sm animate-pulse">
                      Live Update
                    </span>
                    <span className="px-4 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest border border-indigo-100">
                      {drama.info?.type || 'Series'}
                    </span>
                  </div>

                  <h1 className="text-2xl md:text-2xl font-black text-zinc-900 italic tracking-tighter leading-[0.9] uppercase">
                    {drama.title}
                  </h1>

                  {drama.title_alt && (
                    <p className="text-zinc-400 text-xl font-semibold italic border-l-[6px] border-rose-200 pl-8 py-1">
                      {drama.title_alt}
                    </p>
                  )}
                </div>

                {/* Enhanced Genre Buttons */}
                <div className="flex flex-wrap gap-3">
                  {drama.genres.map((g: string) => (
                    <Link key={g} href={`/drama/korea?genre=${g}`} className="px-8 py-3 bg-zinc-50 border border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 hover:shadow-lg hover:shadow-rose-100 transition-all duration-300">
                      {g}
                    </Link>
                  ))}
                </div>

                {/* Synopsis with better readability */}
                <div className="bg-zinc-50/50 rounded-[2.5rem] p-8 md:p-10 border border-zinc-100/50">
                  <h3 className="text-xs font-black uppercase tracking-[0.3em] text-rose-500 mb-6 flex items-center gap-2">
                    <Film size={14} /> Sinopsis
                  </h3>
                  <p className="text-zinc-600 text-lg md:text-xl font-medium leading-relaxed italic whitespace-pre-line">
                    {drama.synopsis}
                  </p>
                </div>

                {/* Info Grid with Icons */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-10 pt-4">
                  {[
                    { label: "Status", value: drama.info?.status, icon: Globe, color: "text-blue-500" },
                    { label: "Release", value: drama.info?.first_air_date, icon: Calendar, color: "text-orange-500" },
                    { label: "Episodes", value: drama.total_episode_available, icon: PlayCircle, color: "text-rose-500" },
                    { label: "Country", value: drama.info?.country, icon: Star, color: "text-amber-500" },
                  ].map((item, i) => (
                    <div key={i} className="space-y-2 group">
                      <div className={`p-3 w-fit rounded-xl bg-white border border-zinc-100 shadow-sm group-hover:scale-110 transition-transform ${item.color}`}>
                        <item.icon size={18} />
                      </div>
                      <div>
                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-400">{item.label}</p>
                        <p className="text-zinc-900 font-bold tracking-tight">{item.value || "-"}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* ✅ STREAMING SECTION */}
          <section className="mt-24 space-y-12">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-px h-16 bg-gradient-to-b from-transparent to-rose-500" />
              <h2 className="text-5xl md:text-7xl font-black text-zinc-900 italic tracking-tighter uppercase">
                Pusat <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-indigo-600">Streaming</span>
              </h2>

              <p className="text-zinc-400 font-black uppercase text-[10px] tracking-[0.4em]">
                Pengalaman Nonton Kualitas Ultra HD
              </p>
            </div>

            <div className="bg-zinc-900 rounded-[1.5rem] p-4 md:p-10 shadow-3xl shadow-rose-100 border-[8px] border-white overflow-hidden">
              <EpisodePlayer episodes={drama.episodes} />
            </div>
          </section>

          {/* ✅ RELATED SECTION */}
          {merged.length > 0 && (
            <section className="mt-32 space-y-16">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                {/* Sisi Kiri: Judul & Dekorasi */}
                <div className="space-y-1">
                  <h2 className="text-4xl md:text-5xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
                    Rekomendasi <span className="text-rose-500">Drama</span>
                  </h2>
                  <div className="w-20 h-1.5 bg-rose-500 rounded-full" />
                </div>

                {/* Sisi Kanan: Tombol (Akan pindah ke bawah judul di mobile) */}
                <div className="flex justify-start md:justify-end">
                  <Link
                    href={`/drama/korea?genre=${drama.genres[0]}`}
                    className="w-full md:w-auto text-center px-8 py-4 md:px-6 md:py-3 rounded-2xl bg-pink-50 border-pnk-50 text-[10px] font-black uppercase tracking-widest text-pink-600 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm active:scale-95"
                  >
                    Lihat Semua <span className="md:hidden">Genre {drama.genres[0]}</span> →
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-10">
                {merged
                  .filter((d: any) => d.endpoint !== id)
                  .slice(0, 10)
                  .map((item: any) => (
                    <div key={item.endpoint} className="group hover:-translate-y-4 transition-all duration-500">
                      <DramaCard drama={item} />
                    </div>
                  ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </main>
  )
}