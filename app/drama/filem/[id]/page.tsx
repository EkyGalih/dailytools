import AffiliateMiniPopup from "@/components/drama/ads/AffiliateMiniPopup"
import AffiliateProductCard from "@/components/drama/ads/AffiliateProductCard"
import DramaHero from "@/components/drama/drakor/DramaHero"
import EpisodeList from "@/components/drama/drakor/EpisodeList"
import { getAffiliateProducts } from "@/libs/ads/getAffiliateProducts"
import { normalizeDramaInfo } from "@/libs/drama/drakor/normalizeDrama"


async function getDramaDetail(id: string) {
  try {
    const res = await fetch(
      `https://api.xyra.stream/v1/dramacool/info?api_key=key1&id=${id}`,
      {
        cache: "no-store",
        headers: {
          "User-Agent": "Mozilla/5.0",
          "Accept": "application/json"
        }
      }
    )

    if (!res.ok) {
      console.error("Fetch failed:", res.status, res.statusText)
      return null
    }

    return res.json()
  } catch (err) {
    console.error("Fetch exception:", err)
    return null
  }
}

export default async function DramaDetailPage(
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const raw = await getDramaDetail(id)

  if (!raw?.data) {
    return (
      <main className="p-6 max-w-3xl mx-auto">
        <h1 className="text-2xl font-bold mb-2">Drama detail unavailable</h1>
        <p className="text-zinc-400">
          Data sementara tidak dapat dimuat. Silakan refresh atau coba lagi nanti.
        </p>
      </main>
    )
  }

  const drama = normalizeDramaInfo(raw.data)

  return (
    <>
      <AffiliateMiniPopup />
      <DramaHero />
      <main className="p-6 max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Poster */}
          <img
            src={drama.thumbnail}
            alt={drama.title}
            className="rounded-xl"
          />

          {/* Info */}
          <div className="md:col-span-2 space-y-4">
            <h1 className="text-3xl font-bold">{drama.title}</h1>

            <div className="flex flex-wrap gap-2">
              {drama.genres.map((g: string) => (
                <span
                  key={g}
                  className="px-3 py-1 text-xs bg-rose-500/20 text-rose-400 rounded-full"
                >
                  {g}
                </span>
              ))}
            </div>

            <p className="text-zinc-300 leading-relaxed">
              {drama.synopsis}
            </p>

            <div className="text-sm text-zinc-400 space-y-1">
              <p><b>Country:</b> {drama.country}</p>
              <p><b>Status:</b> {drama.status}</p>
              <p><b>Release:</b> {drama.releaseYear}</p>
              {drama.otherName && (
                <p><b>Other name:</b> {drama.otherName}</p>
              )}
            </div>
          </div>
        </div>

        {/* Episodes */}
        <section className="mt-12">
          <h2 className="text-xl font-bold mb-4">Episodes</h2>
          <EpisodeList
            episodes={drama.episodes}
            watchBaseUrl={`/drama/filem/watch/${id}`}
            genres={drama.genres}
          />
        </section>
      </main>
    </>
  )
}