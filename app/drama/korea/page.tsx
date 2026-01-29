import AffiliateChannelPopup from "@/components/drama/ads/AffiliateChannelPopup"
import AffiliateMiniPopup from "@/components/drama/ads/AffiliateMiniPopup"

import DramaCard from "@/components/drama/drakor/DramaCard"
import DramaHero from "@/components/drama/drakor/DramaHero"
import DramaListCard from "@/components/drama/drakor/DramaLists"

import { getAffiliatePopup } from "@/libs/ads/getAffiliatePopup"

import {
  searchDrama,
  getGenres,
  getDramaByGenre,
  getHomePage,
} from "@/libs/drama/drakor/drama"
import { DramaCardItem, GenreItem } from "@/libs/types/drakor"
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
  const homeRes = await getHomePage();
  console.log(homeRes);
  const latestEps = homeRes?.data?.latest_eps
  const seriesRes = homeRes?.data?.latest_series
  const movieRes = homeRes?.data?.latest_movies
  const genreRes = await getGenres()

  const series = seriesRes ?? []
  const movies = movieRes ?? []
  const episode = latestEps ?? []
  const genres = genreRes?.datas ?? []

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
                            href="/drama/korea"
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
                    )?.map((item: DramaCardItem) => (
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
                                pathname: "/drama/korea",
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
                                pathname: "/drama/korea",
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
                {/* SERIES TAB */}

                <h2 className="text-2xl font-bold mb-4">Series Terbaru</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                  {series.map((item: DramaCardItem) => (
                    <DramaCard key={item.endpoint} drama={item} />
                  ))}
                </div>


                <h2 className="text-2xl font-bold mb-4 md:mt-5">Movies Terbaru</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                  {movies.map((item: DramaCardItem) => (
                    <DramaCard key={item.endpoint} drama={item} />
                  ))}
                </div>
              </div>
            )}
          </section>

          {/* ========================= */}
          {/* RIGHT SIDE (MOVIES) */}
          {/* ========================= */}
          <aside className="col-span-12 md:col-span-3 md:mt-37 md:mr-15">
            <h2 className="text-xl font-bold mb-4">
              Episode Terbaru 🎬
            </h2>

            <div className="grid grid-cols-1 gap-3">
              {episode.slice(0, 8).map((item: DramaCardItem) => (
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
                {genres.map((g: GenreItem) => {
                  const isActive =
                    activeGenre.toLowerCase() === g.title.toLowerCase()

                  return (
                    <li key={g.title} className="list-none">
                      <Link
                        href={{
                          pathname: "/drama/korea",
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