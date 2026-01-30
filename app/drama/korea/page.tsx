import { Search, Play, Filter, History, Clapperboard, Flame, ListFilter, X, ChevronRight, ChevronLeft, Globe } from "lucide-react"
import DramaCard from "@/components/drama/drakor/DramaCard"
import DramaHero from "@/components/drama/drakor/DramaHero"
import DramaListCard from "@/components/drama/drakor/DramaLists"
import { searchDrama, getGenres, getDramaByGenre, getHomePage } from "@/libs/drama/drakor/drama"
import Link from "next/link"

function unwrap(res: any) {
  return res?.data ?? res
}

export default async function HomePage({ searchParams }: { searchParams?: Promise<{ q?: string; page?: string; genre?: string }> }) {
  const sp = await searchParams
  const query = sp?.q || ""
  const activeGenre = sp?.genre || ""
  const currentPage = Number(sp?.page || 1)

  const [searchResult, genreResult, homeRes, genreRes] = await Promise.all([
    query ? searchDrama(query, currentPage) : null,
    activeGenre ? getDramaByGenre(activeGenre, currentPage) : null,
    getHomePage(),
    getGenres()
  ])

  const h = unwrap(homeRes)
  const g = unwrap(genreRes)
  const isFilterMode = query.length > 0 || activeGenre.length > 0

  return (
    <main className="bg-[#fafafa] min-h-screen pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-12">

        <DramaHero />

        {/* TOOLBAR: SEARCH & FILTER INFO */}
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between bg-white rounded-3xl p-4 shadow-sm border border-zinc-100">
          <form action="/drama/korea" className="relative w-full md:max-w-xl group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-pink-500 transition-colors" size={18} />
            <input
              name="q"
              defaultValue={query}
              placeholder="Cari judul drama, aktor, atau genre..."
              className="w-full pl-14 pr-10 py-4 bg-zinc-50 border-none rounded-2xl text-sm font-bold placeholder:text-zinc-600 focus:ring-2 focus:ring-pink-500/20 transition-all shadow-sm"
            />
            {query && (
              <Link href="/drama/korea" className="absolute right-5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-red-500">
                <X size={16} />
              </Link>
            )}
          </form>

          {isFilterMode && (
            <Link href="/drama/korea" className="px-6 py-3 rounded-xl bg-red-50 text-red-500 text-[10px] font-black uppercase tracking-widest hover:bg-red-100 transition-all flex items-center gap-2">
              <X size={14} /> Reset Filter
            </Link>
          )}
        </div>

        <div className="grid grid-cols-12 gap-8 lg:gap-12">
          {/* LEFT SIDE: MAIN CONTENT */}
          <div className="col-span-12 lg:col-span-9 space-y-16">

            {isFilterMode ? (
              <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="flex items-center gap-3 mb-8 ml-2">
                  <div className="p-2 bg-pink-100 rounded-xl text-pink-600"><Filter size={20} /></div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900">
                    Results for <span className="text-pink-500">"{query || activeGenre}"</span>
                  </h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                  {(query ? searchResult?.datas : genreResult?.datas)?.map((item: any) => (
                    <DramaCard key={item.endpoint} drama={item} />
                  ))}
                </div>
                {/* Pagination UI Minimalis */}
                <Pagination info={query ? searchResult?.pagination_info : genreResult?.pagination_info} query={query} genre={activeGenre} />
              </section>
            ) : (
              <>
                <section>
                  <SectionHeader title="Series Terbaru" subtitle="Koleksi drama terbaru minggu ini" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6">
                    {h?.latest_series?.map((item: any) => <DramaCard key={item.endpoint} drama={item} />)}
                  </div>
                </section>

                <section>
                  <SectionHeader title="Film Terbaru" subtitle="Film Terbaru minggu ini" />
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {h?.latest_movies?.map((item: any) => <DramaCard key={item.endpoint} drama={item} />)}
                  </div>
                </section>
              </>
            )}
          </div>

          {/* RIGHT SIDE: SIDEBAR */}
          <aside className="col-span-12 lg:col-span-3 space-y-10">
            <div className="sticky top-24 space-y-10">
              {/* EPISODE UPDATES */}
              <section className="bg-white rounded-[2.5rem] p-8 border border-zinc-100 shadow-sm">
                <div className="flex items-center gap-2 mb-6">
                  <History className="text-pink-500" size={18} />
                  <h3 className="text-sm font-black italic uppercase tracking-widest text-zinc-900">Episode Terbaru</h3>
                </div>
                <div className="space-y-4">
                  {h?.latest_eps?.slice(0, 6).map((item: any) => (
                    <DramaListCard key={item.endpoint} drama={item} />
                  ))}
                </div>
              </section>

              {/* GENRE CLOUD */}
              <section className="bg-[#0c0c0c] rounded-[2.5rem] p-8 border border-white/5 shadow-2xl relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-purple-600/20 blur-3xl rounded-full" />
                <h3 className="text-xs font-black italic uppercase tracking-[0.2em] text-pink-400 mb-6 relative z-10">Pilih Sesuai Genre</h3>
                <div className="flex flex-wrap gap-2 relative z-10">
                  {g?.datas?.map((genre: any) => (
                    <Link
                      key={genre.title}
                      href={{ pathname: "/drama/korea", query: { genre: genre.title } }}
                      className={`px-3 py-1.5 rounded-xl text-[10px] font-bold uppercase tracking-tighter transition-all ${activeGenre === genre.title ? 'bg-pink-500 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white'}`}
                    >
                      {genre.title}
                    </Link>
                  ))}
                </div>
              </section>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

// Sub-components pendukung agar rapi
function SectionHeader({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-8 ml-2 space-y-1">
      <h2 className="text-3xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">{title}</h2>
      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">{subtitle}</p>
    </div>
  )
}

function Pagination({ info, query, genre }: any) {
  if (!info) return null
  return (
    <div className="flex items-center justify-center gap-4 mt-16 pt-10 border-t border-zinc-100">
      {info.has_prev && (
        <Link href={{ pathname: "/drama/korea", query: { page: info.prev_page, q: query, genre } }} className="px-6 py-3 rounded-2xl bg-white border border-zinc-200 text-xs font-black uppercase tracking-widest hover:border-pink-500 transition-all">
          ← Prev
        </Link>
      )}
      <span className="text-xs font-black italic text-zinc-400">Page {info.current_page}</span>
      {info.has_next && (
        <Link href={{ pathname: "/drama/korea", query: { page: info.next_page, q: query, genre } }} className="px-6 py-3 rounded-2xl bg-zinc-900 text-white text-xs font-black uppercase tracking-widest hover:bg-pink-600 transition-all">
          Next →
        </Link>
      )}
    </div>
  )
}