import AffiliateChannelPopup from "@/components/drama/ads/AffiliateChannelPopup"
import AffiliateMiniPopup from "@/components/drama/ads/AffiliateMiniPopup"

import DramaCard from "@/components/drama/drakor/DramaCard"
import DramaHero from "@/components/drama/drakor/DramaHero"
import DramaListCard from "@/components/drama/drakor/DramaLists"

import { getAffiliatePopup } from "@/libs/ads/getAffiliatePopup"

import {
  getSeries,
  getMovies,
  searchDrama,
  getCompletedSeries,
  getGenres,
  getDramaByGenre,
} from "@/libs/drama/drakor/drama"
import Link from "next/link"

export default async function HomePage({
  searchParams,
}: {
  searchParams?: Promise<{ q?: string; page?: string; tab?: string; genre?: string }>
}) {
  // ✅ unwrap dulu
  const sp = await searchParams
  const activeGenre = sp?.genre || ""

  const query = sp?.q || ""
  const genre = sp?.genre || ""
  const currentPage = Number(sp?.page || 1)

  // SEARCH
  const searchResult = query
    ? await searchDrama(query, currentPage)
    : null

  // ============================
  // GENRE
  // ============================
  const genreResult = genre
    ? await getDramaByGenre(genre, currentPage)
    : null

  const isSearchMode = query.length > 0
  const isGenreMode = Boolean(activeGenre)
  const isFilterMode = isSearchMode || isGenreMode

  // SERIES + MOVIES
  const seriesRes = await getSeries(currentPage)
  const movieRes = await getMovies(currentPage)
  const completedRes = await getCompletedSeries(currentPage)
  const genreRes = await getGenres()

  const series = seriesRes?.datas ?? []
  const movies = movieRes?.datas ?? []
  const completed = completedRes?.datas ?? []
  const genres = genreRes?.datas ?? []

  const paginationSeries = seriesRes?.pagination_info
  const paginationMovies = movieRes?.pagination_info

  // tab switcher
  const activeTab = sp?.tab || "series"

  // const popupProduct = getAffiliatePopup()

  return (
    <main className="w-full">
      {/* POPUP */}
      {/* {popupProduct && <AffiliateChannelPopup product={popupProduct} />} */}
      {/* <AffiliateMiniPopup /> */}

      {/* HERO */}
      <DramaHero />

      {/* CONTENT */}
      <section className="space-y-10 py-8">
        <div className="grid grid-cols-12 gap-6 px-4">
          {/* ========================= */}
          {/* LEFT SIDE (SERIES) */}
          {/* ========================= */}
          <section className="col-span-12 md:col-span-9 space-y-10 lg:ml-20">
            {/* SEARCH */}
            <div>
              <form
                method="get"
                action="/drama/korea"
                className="flex flex-col gap-3"
              >
                <div className="flex items-center gap-2 relative">
                  {/* INPUT */}
                  <input
                    type="search"
                    name="q"
                    placeholder="Cari drama atau movie..."
                    defaultValue={query}
                    className="flex-1 rounded-xl bg-zinc-900 border border-white/10 px-4 py-3 text-sm
      placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/40"
                  />

                  {/* ❌ CLEAR BUTTON */}
                  {query && (
                    <Link
                      href="/drama/korea"
                      className="absolute right-[110px] text-white/40 hover:text-white text-lg"
                    >
                      ✕
                    </Link>
                  )}

                  {/* BUTTON SEARCH */}
                  <button
                    type="submit"
                    className="rounded-xl px-5 py-3 text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
                  >
                    Search
                  </button>
                </div>
              </form>

              {/* =============================== */}
              {/* FILTER RESULT (SEARCH / GENRE) */}
              {/* =============================== */}
              {isFilterMode && (
                <div className="mt-10">

                  <h2 className="text-xl font-bold mb-6">
                    {isSearchMode && (
                      <>
                        Hasil pencarian:{" "}
                        <span className="text-purple-400">"{query}"</span>
                      </>
                    )}

                    {isGenreMode && (
                      <div className="flex flex-col gap-2">
                        {/* Baris 1 */}
                        <div>
                          Genre:{" "}
                          <span className="text-purple-400 font-semibold">
                            {genre}
                          </span>
                        </div>

                        {/* Baris 2 (Clear kanan) */}
                        <div className="flex justify-end">
                          <Link
                            href="/drama/filem"
                            className="text-sm text-red-400 hover:underline"
                          >
                            ✖ Clear Filter
                          </Link>
                        </div>
                      </div>
                    )}
                  </h2>

                  {/* DATA */}
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                    {(isSearchMode
                      ? searchResult?.datas
                      : genreResult?.datas
                    )?.map((item: any) => (
                      <DramaCard key={item.endpoint} drama={item} />
                    ))}
                  </div>

                  {/* PAGINATION */}
                  {(isSearchMode
                    ? searchResult?.pagination_info
                    : genreResult?.pagination_info) && (
                      <div className="flex justify-center gap-3 mt-10">
                        {/* Prev */}
                        {(isSearchMode
                          ? searchResult.pagination_info.has_prev
                          : genreResult.pagination_info.has_prev) && (
                            <Link
                              href={{
                                pathname: "/drama/filem",
                                query: {
                                  page:
                                    isSearchMode
                                      ? searchResult.pagination_info.prev_page
                                      : genreResult.pagination_info.prev_page,
                                  ...(isSearchMode ? { q: query } : {}),
                                  ...(isGenreMode ? { genre } : {}),
                                },
                              }}
                              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                            >
                              ← Prev
                            </Link>
                          )}

                        <span className="text-sm text-zinc-400 flex items-center">
                          Page{" "}
                          {isSearchMode
                            ? searchResult.pagination_info.current_page
                            : genreResult.pagination_info.current_page}
                        </span>

                        {/* Next */}
                        {(isSearchMode
                          ? searchResult.pagination_info.has_next
                          : genreResult.pagination_info.has_next) && (
                            <Link
                              href={{
                                pathname: "/drama/filem",
                                query: {
                                  page:
                                    isSearchMode
                                      ? searchResult.pagination_info.next_page
                                      : genreResult.pagination_info.next_page,
                                  ...(isSearchMode ? { q: query } : {}),
                                  ...(isGenreMode ? { genre } : {}),
                                },
                              }}
                              className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700"
                            >
                              Next →
                            </Link>
                          )}
                      </div>
                    )}
                </div>
              )}
            </div>

            {/* TABS */}
            {!isFilterMode && (
              <div>
                <div className="flex gap-3 mb-6">
                  <Link
                    href={{
                      pathname: "/drama/filem",
                      query: { tab: "series", page: 1, ...(query ? { q: query } : {}) },
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "series"
                      ? "bg-white text-black"
                      : "bg-zinc-800 text-white hover:bg-zinc-700"
                      }`}
                  >
                    📺 Series
                  </Link>

                  <Link
                    href={{
                      pathname: "/drama/filem",
                      query: { tab: "movies", page: 1, ...(query ? { q: query } : {}) },
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition ${activeTab === "movies"
                      ? "bg-white text-black"
                      : "bg-zinc-800 text-white hover:bg-zinc-700"
                      }`}
                  >
                    🎬 Movies
                  </Link>
                </div>

                {/* SERIES TAB */}
                {activeTab === "series" && (
                  <>
                    <h2 className="text-2xl font-bold mb-4">Series Highlight</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                      {series.map((item: any) => (
                        <DramaCard key={item.endpoint} drama={item} />
                      ))}
                    </div>

                    {/* PAGINATION SERIES */}
                    {paginationSeries && (
                      <div className="flex items-center justify-center gap-3 mt-10">
                        {paginationSeries.has_prev ? (
                          <Link
                            href={{
                              pathname: "/drama/filem",
                              query: {
                                tab: "series",
                                page: paginationSeries.prev_page,
                                ...(query ? { q: query } : {}),
                              },
                            }}
                            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
                          >
                            ← Prev
                          </Link>
                        ) : (
                          <span className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-500 text-sm cursor-not-allowed">
                            ← Prev
                          </span>
                        )}

                        <span className="text-sm text-zinc-400">
                          Page {paginationSeries.current_page} of {paginationSeries.total_page}
                        </span>

                        {paginationSeries.has_next ? (
                          <Link
                            href={{
                              pathname: "/drama/filem",
                              query: {
                                tab: "series",
                                page: paginationSeries.next_page,
                                ...(query ? { q: query } : {}),
                              },
                            }}
                            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
                          >
                            Next →
                          </Link>
                        ) : (
                          <span className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-500 text-sm cursor-not-allowed">
                            Next →
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}

                {/* MOVIES TAB */}
                {activeTab === "movies" && (
                  <>
                    <h2 className="text-2xl font-bold mb-4">Movies Highlight</h2>

                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {movies.map((item: any) => (
                        <DramaCard key={item.endpoint} drama={item} />
                      ))}
                    </div>

                    {/* PAGINATION MOVIES */}
                    {paginationMovies && (
                      <div className="flex items-center justify-center gap-3 mt-10">
                        {paginationMovies.has_prev ? (
                          <Link
                            href={{
                              pathname: "/drama/filem",
                              query: {
                                tab: "movies",
                                page: paginationMovies.prev_page,
                                ...(query ? { q: query } : {}),
                              },
                            }}
                            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
                          >
                            ← Prev
                          </Link>
                        ) : (
                          <span className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-500 text-sm cursor-not-allowed">
                            ← Prev
                          </span>
                        )}

                        <span className="text-sm text-zinc-400">
                          Page {paginationMovies.current_page} of {paginationMovies.total_page}
                        </span>

                        {paginationMovies.has_next ? (
                          <Link
                            href={{
                              pathname: "/drama/filem",
                              query: {
                                tab: "movies",
                                page: paginationMovies.next_page,
                                ...(query ? { q: query } : {}),
                              },
                            }}
                            className="px-4 py-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-sm"
                          >
                            Next →
                          </Link>
                        ) : (
                          <span className="px-4 py-2 rounded-lg bg-zinc-900 text-zinc-500 text-sm cursor-not-allowed">
                            Next →
                          </span>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            )}
          </section>

          {/* ========================= */}
          {/* RIGHT SIDE (MOVIES) */}
          {/* ========================= */}
          <aside className="col-span-12 md:col-span-3 md:mt-37 md:mr-15">
            <h2 className="text-xl font-bold mb-4">
              Drama Selesai 🎬
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {completed.slice(0, 8).map((item: any) => (
                <DramaListCard
                  key={item.endpoint}
                  drama={item}
                />
              ))}
            </div>

            {/* GENRE FILTER */}
            <div className="bg-zinc-900/70 border border-white/10 rounded-2xl p-5 shadow-md md:mt-5">
              <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                🎭 Genre
              </h2>

              {/* UL GENRE */}
              <ul className="flex flex-wrap justify-center gap-2">
                {genres.map((g: any) => {
                  const isActive =
                    activeGenre.toLowerCase() === g.title.toLowerCase()

                  return (
                    <li key={g.endpoint} className="list-none">
                      <Link
                        href={{
                          pathname: "/drama/filem",
                          query: {
                            genre: g.title,
                            page: 1,
                          },
                        }}
                        className={`block px-4 py-2 rounded-lg text-xs font-semibold transition
              ${isActive
                            ? "bg-purple-600 text-white ring-2 ring-purple-400"
                            : "bg-zinc-800 text-white/80 hover:bg-purple-600 hover:text-white"
                          }
            `}
                      >
                        {g.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}