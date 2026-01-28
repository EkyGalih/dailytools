import AffiliateChannelPopup from "@/components/drama/ads/AffiliateChannelPopup"
import AffiliateMiniPopup from "@/components/drama/ads/AffiliateMiniPopup"
import DramaCard from "@/components/drama/drakor/DramaCard"
import DramaHero from "@/components/drama/drakor/DramaHero"
import DramaListCard from "@/components/drama/drakor/DramaLists"
import { getAffiliatePopup } from "@/libs/ads/getAffiliatePopup"
import { getDIscover, getDramaInfo, getHomeData, getPopular, searchDrama } from "@/libs/drama/drakor/drama"

async function enrichDrama(drama: any) {
  const info = await getDramaInfo(drama.id)
  return {
    ...drama,
    country: info?.data?.country
      ?.replace(/(.+)\1/, "$1"),
    status: info?.data?.status
      ?.replace(/(.+)\1/, "$1"),
    releaseYear: info?.data?.release_year
      ?.replace(/(.+)\1/, "$1"),
    genres: Array.from(
      new Set(info?.data?.genres || [])
    ),
  }
}
export default async function HomePage({
  searchParams,
}: {
  searchParams?: { q?: string; country?: string } | Promise<{ q?: string; country?: string }>
}) {
  const sp = await Promise.resolve(searchParams ?? {})

  const query = sp.q
  const searchResult = query
    ? await searchDrama(query, 1)
    : null

  // Some endpoints return data directly, others wrap it again.
  // Normalize search results to always be an array.
  const searchedDramas =
    Array.isArray(searchResult?.data)
      ? searchResult.data
      : Array.isArray(searchResult?.data?.data)
        ? searchResult.data.data
        : []
  const home = await getHomeData()
  const dramas = home?.data?.recently_added ?? []
  const populars = await getPopular(1)
  const popular = populars?.data ?? []
  const discovers = await getDIscover(1)
  const discover = discovers?.data ?? []

  const countryFilter = sp.country

  const searchHighlight = await Promise.all(
    searchedDramas.slice(0, 12).map(async (d: any) => {
      try {
        return await enrichDrama(d)
      } catch {
        // fallback to raw search data if /info fails
        return d
      }
    })
  )

  const filteredDramas = countryFilter
    ? dramas.filter((d: any) =>
      d.country?.toLowerCase().includes(countryFilter.toLowerCase())
    )
    : dramas

  const highlight = await Promise.all(
    filteredDramas.slice(0, 12).map(enrichDrama)
  )

  const latestHighlight = await Promise.all(
    filteredDramas.slice(0, 12).map((drama: any) =>
      enrichDrama({
        ...drama,
        id: drama.id
          .replace("https://dramacool.sh/", "")
          .replace("/", ""),
      })
    )
  )

  const popularHighlight = await Promise.all(
    popular.slice(0, 12).map((drama: any) =>
      enrichDrama({
        ...drama,
        // normalisasi ID kalau perlu
        id: drama.id
          ?.replace("https://dramacool.sh/", "")
          ?.replace("/", ""),
      })
    )
  )

  const discoverHighlight = await Promise.all(
    discover.slice(0, 12).map((drama: any) =>
      enrichDrama({
        ...drama,
        // normalisasi ID kalau perlu
        id: drama.id
          ?.replace("https://dramacool.sh/", "")
          ?.replace("/", ""),
      })
    )
  )
  const popupProduct = getAffiliatePopup()

  return (
    <main className="w-full">
      {popupProduct && <AffiliateChannelPopup product={popupProduct} />}
      <AffiliateMiniPopup />
      <DramaHero />
      <section className="space-y-10 py-8">
        <div className="grid grid-cols-12 gap-6 px-4 md:px-8">
          <section className="col-span-12 md:col-span-10 md:me-20 md:ml-4">
            {/* SEARCH */}
            <div className="mb-8">
              <form
                method="get"
                action="/drama/filem"
                className="flex flex-col gap-3"
              >
                {/* keep existing filters in URL when searching */}
                {sp.country ? (
                  <input type="hidden" name="country" value={sp.country} />
                ) : null}

                <div className="flex items-stretch gap-2">
                  <div className="relative flex-1">
                    <input
                      type="search"
                      name="q"
                      placeholder="Cari drama, judul, tahun..."
                      defaultValue={sp.q || ""}
                      className="w-full rounded-xl bg-zinc-900 border border-white/10 px-4 py-3 pr-10
  text-sm placeholder:text-white/40 focus:outline-none
  focus:ring-2 focus:ring-purple-500/40
  [&::-webkit-search-cancel-button]:appearance-none"
                    />
                    {sp.q ? (
                      <a
                        href={sp.country ? `/drama/filem?country=${encodeURIComponent(sp.country)}` : "/drama/filem"}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 text-sm"
                        aria-label="Clear search"
                        title="Clear"
                      >
                        ✕
                      </a>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl px-4 py-3 text-sm font-semibold bg-white text-black hover:bg-white/90 transition"
                  >
                    Search
                  </button>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-white/60">
                  <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1">
                    Tips: coba “kdrama”, “2025”, “romance”
                  </span>
                  {sp.country ? (
                    <span className="rounded-full bg-white/5 border border-white/10 px-3 py-1">
                      Filter country: <span className="text-white/80">{sp.country}</span>
                    </span>
                  ) : null}
                </div>
              </form>

              {query ? (
                <div className="mt-6">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <h2 className="text-xl md:text-2xl font-bold">
                      Hasil pencarian: <span className="text-white/80">“{query}”</span>
                    </h2>
                    <span className="text-sm text-white/50">
                      {searchedDramas.length} hasil
                    </span>
                  </div>

                  {searchHighlight.length === 0 ? (
                    <p className="text-white/60">
                      Tidak ditemukan drama untuk kata kunci ini.
                    </p>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
                      {searchHighlight.map((drama: any) => (
                        <DramaCard key={drama.id} drama={drama} />
                      ))}
                    </div>
                  )}

                  <div className="relative my-10">
                    <div className="h-px bg-white/10" />
                    <div className="absolute inset-0 h-px blur-sm bg-purple-500/30" />
                  </div>
                </div>
              ) : null}
            </div>
            <h2 className="text-2xl font-bold mb-4">Highlight</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {highlight.map((drama: any) => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>

            <div className="relative my-12">
              <div className="h-px bg-white/10" />
              <div className="absolute inset-0 h-px blur-sm bg-purple-500/30" />
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              Popular
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {popularHighlight.map((drama: any) => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>

            <div className="relative my-12">
              <div className="h-px bg-white/10" />
              <div className="absolute inset-0 h-px blur-sm bg-purple-500/30" />
            </div>

            <h2 className="text-2xl font-bold mb-4 mt-8">
              Discover
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
              {discoverHighlight.map((drama: any) => (
                <DramaCard key={drama.id} drama={drama} />
              ))}
            </div>
          </section>

          <section className="col-span-12 md:col-span-2 md:me-4">
            <h2 className="text-2xl font-bold mb-4">Latest Updates</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 gap-3">
              {latestHighlight.map((drama: any) => (
                <DramaListCard
                  key={drama.original_id || drama.id}
                  drama={drama}
                />
              ))}
            </div>
          </section>
        </div>
      </section>
    </main>
  )
}