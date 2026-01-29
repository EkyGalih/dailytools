import AffiliateProductCard from "@/components/drama/ads/AffiliateProductCard"
import NextEpisodeButton from "@/components/drama/drakor/NextEpisodeButton"
import RefreshButton from "@/components/drama/drakor/RefreshButton"
import { getAffiliateProducts } from "@/libs/ads/getAffiliateProducts"
import Link from "next/link"

async function getStreamData(episodeId: string) {
  const cleanId = episodeId
    .replace("https://dramacool.sh/", "")
    .replaceAll("/", "")
    .trim()

  if (!cleanId) {
    console.warn("Stream fetch failed: episodeId kosong")
    return null
  }

  const url = `${"https://api.xyra.stream/v1/dramacool/stream"
    }?api_key=key1&episode_id=${encodeURIComponent(cleanId)}`

  const res = await fetch(url, {
    next: { revalidate: 300 },
    headers: {
      Accept: "application/json",
      "User-Agent": "Mozilla/5.0",
    },
  })

  const data = await res.json().catch(() => null)

  if (!res.ok) {
    console.warn("Stream API warning:", data?.error)
    return data // ✅ tetap return supaya server_url bisa dipakai
  }

  return data
}

async function getDramaDetail(dramaId: string) {
  const res = await fetch(
    `https://api.xyra.stream/v1/dramacool/info?api_key=key1&id=${dramaId}`,
    {
      next: { revalidate: 600 },
    }
  )

  if (!res.ok) return null
  return res.json()
}

export default async function WatchPage({
  params,
  searchParams,
}: {
  params: Promise<{ dramaId: string; episodeId: string }>
  searchParams: Promise<{ server?: string }>
}) {
  const { dramaId, episodeId } = await params
  const { server } = await searchParams
  // ✅ UI Formatter
  const cleanEpisodeId = episodeId
    .replace("https://dramacool.sh/", "")
    .replaceAll("/", "")
    .trim()

  const episodeNumber =
    cleanEpisodeId.match(/episode-(\d+)/)?.[1] || ""

  const dramaTitle = dramaId
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase())

  const stream = await getStreamData(episodeId)
  const products = getAffiliateProducts()
  const dramaDetail = await getDramaDetail(dramaId)
  const totalEpisodes = dramaDetail?.data?.episodes?.length || 0

  const fallbackServerUrl = stream?.server_url

  // ✅ dianggap valid juga kalau hanya punya server_url
  const hasAnyServer =
    stream?.embed_iframe_url ||
    stream?.data?.iframe_only?.embeded_link ||
    fallbackServerUrl

  if (!hasAnyServer) {
    return (
      <main className="p-8 text-center">
        <h1 className="text-2xl font-bold">Video Tidak Bisa Dimuat</h1>
        <p className="text-zinc-400 mt-2">
          Stream server tidak stabil, coba refresh untuk memuat ulang.
        </p>

        <RefreshButton />
      </main>
    )
  }

  const servers = [
    {
      name: "Server 1",
      url: stream?.embed_iframe_url,
    },
    {
      name: "Server 2",
      url: stream?.data?.iframe_only?.embeded_link,
    },
    // ✅ fallback kalau iframe tidak ada
    {
      name: "Server Original",
      url: fallbackServerUrl,
    },
  ].filter((s) => s.url)

  // Server aktif sesuai query param
  const activeServer =
    servers.find((s) => s.url === server) ||
    servers[0]

  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      {/* HEADER */}
      <header className="flex items-center justify-between gap-4">
        {/* KIRI: Judul */}
        <h1 className="text-lg font-bold">
          {dramaTitle} Episode: {episodeNumber}
        </h1>

        {/* KANAN: Tombol-tombol */}
        <div className="flex items-center gap-3">
          <Link
            href={`/drama/korea/${dramaId}`}
            className="text-sm text-zinc-400 hover:text-white transition"
          >
            ← Lihat Episode Lain
          </Link>

          {episodeNumber && (
            <NextEpisodeButton
              dramaId={dramaId}
              currentEpisode={Number(episodeNumber)}
              totalEpisodes={totalEpisodes}
            />
          )}
        </div>
      </header>

      {/* PLAYER */}
      <div className="aspect-video w-full rounded-xl overflow-hidden bg-black border border-zinc-800">
        <iframe
          src={activeServer.url}
          allowFullScreen
          className="w-full h-full"
        />
      </div>

      {/* SERVER BUTTONS */}
      <section className="flex flex-wrap gap-3">
        {servers.map((s) => (
          <Link
            key={s.name}
            href={`?server=${encodeURIComponent(s.url)}`}
            className={`px-4 py-2 rounded-full text-sm transition ${activeServer.url === s.url
              ? "bg-emerald-500 text-black"
              : "bg-zinc-800 hover:bg-zinc-700"
              }`}
          >
            {s.name}
          </Link>
        ))}
      </section>

      {/* INFO */}
      <p className="text-xs text-zinc-500">
        Jika video tidak muncul, coba pindah server lain.
      </p>

      {/* Related Drama */}
      <section className="mt-8 space-y-3">
        <h3 className="text-sm font-semibold">
          Rekomendasi Produk yang Cocok Buat Kamu 🎁
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {products.map((p) => (
            <AffiliateProductCard key={p.link} product={p} />
          ))}
        </div>
      </section>
    </main>
  )
}