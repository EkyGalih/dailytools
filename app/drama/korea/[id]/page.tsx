import AffiliateMiniPopup from "@/components/drama/ads/AffiliateMiniPopup"
import DramaCard from "@/components/drama/drakor/DramaCard"
import DramaHero from "@/components/drama/drakor/DramaHero"
import EpisodePlayer from "@/components/drama/drakor/EpisodePlayer"
import RefreshButton from "@/components/drama/drakor/RefreshButton"

import { getDramaByGenre, getDramaDetail } from "@/libs/drama/drakor/drama"
import Image from "next/image"
import Link from "next/link"

/* ======================================== */
/* ✅ SEO METADATA */
/* ======================================== */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const raw = await getDramaDetail(id)

  if (!raw?.data) {
    return {
      title: "Drama Tidak Ditemukan",
      description: "Drama detail tidak tersedia.",
    }
  }

  const drama = raw.data

  return {
    title: `${drama.title} | Nonton Drama Subtitle Indonesia`,
    description: drama.synopsis?.slice(0, 150),

    openGraph: {
      title: drama.title,
      description: drama.synopsis?.slice(0, 160),
      images: [drama.thumbnail],
    },

    keywords: drama.genres?.join(", "),
  }
}

/* ======================================== */
/* ✅ PAGE */
/* ======================================== */
export default async function DramaDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const raw = await getDramaDetail(id)
  console.log(raw)

  if (!raw?.data) {
    return (
      <main className="p-6 max-w-3xl mx-auto space-y-4">
        <h1 className="text-2xl font-bold">
          Drama detail unavailable
        </h1>

        <p className="text-zinc-400">
          Data tidak bisa dimuat untuk endpoint:
          <span className="text-purple-400 font-semibold"> {id}</span>
        </p>

        <p className="text-zinc-500 text-sm">
          Kemungkinan provider sedang down atau endpoint salah.
          Silakan refresh atau coba lagi nanti.
        </p>

        <RefreshButton />

        <Link
          href="/drama/korea"
          className="inline-block text-sm text-purple-400 hover:underline"
        >
          ← Kembali ke daftar drama
        </Link>
      </main>
    )
  }

  const drama = raw.data
  // ===============================
  // ✅ RELATED DRAMA (GENRE)
  // ===============================
  const relatedAll = await Promise.all(
    drama.genres.map((g: string) => getDramaByGenre(g))
  )

  const merged = relatedAll
    .flatMap((r) => r?.datas ?? [])
    .filter((v, i, arr) => arr.findIndex(x => x.endpoint === v.endpoint) === i)

  return (
    <>
      <AffiliateMiniPopup />
      <DramaHero />

      <main className="p-6 max-w-6xl mx-auto space-y-14">
        {/* ================================= */}
        {/* ✅ BREADCRUMB */}
        {/* ================================= */}
        <nav className="text-sm text-zinc-400 flex gap-2">
          <Link href="/" className="hover:text-white">
            Home
          </Link>
          <span>/</span>
          <Link href="/drama/korea" className="hover:text-white">
            Drama
          </Link>
          <span>/</span>
          <span className="text-white font-semibold line-clamp-1">
            {drama.title}
          </span>
        </nav>

        {/* ================================= */}
        {/* ✅ HEADER INFO */}
        {/* ================================= */}
        <section className="grid md:grid-cols-3 gap-10">
          {/* Poster */}
          <div className="relative">
            <Image
              src={drama.thumbnail || "/placeholder.jpg"}
              alt={drama.title}
              width={500}
              height={750}
              className="rounded-2xl w-full object-cover shadow-xl"
              priority
            />

            {/* Rating Badge */}
            {drama.rating?.score && (
              <div className="absolute top-3 left-3 bg-black/70 px-3 py-1 rounded-full text-sm text-yellow-300 font-semibold">
                ⭐ {drama.rating.score}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="md:col-span-2 space-y-5">
            <h1 className="text-4xl font-extrabold leading-snug">
              {drama.title}
            </h1>

            {/* Alt Title */}
            {drama.title_alt && (
              <p className="text-zinc-400 italic">
                {drama.title_alt}
              </p>
            )}

            {/* Genres */}
            {drama.genres?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {drama.genres.map((g: string) => (
                  <Link
                    key={g}
                    href={`/drama/korea?genre=${g}`}
                    className="px-3 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 hover:bg-purple-600 hover:text-white transition"
                  >
                    {g}
                  </Link>
                ))}
              </div>
            )}

            {/* Synopsis */}
            <p className="text-zinc-300 leading-relaxed whitespace-pre-line">
              {drama.synopsis}
            </p>

            {/* Detail Info + Cast */}
            <div className="pt-6 border-t border-white/10">

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* ========================= */}
                {/* LEFT SIDE (INFO) */}
                {/* ========================= */}
                <div className="space-y-3 text-sm text-zinc-400">
                  <h3 className="font-semibold text-white mb-3 flex items-center gap-2">
                    🎬 Details & Info
                  </h3>
                  <p>
                    <b>Status:</b> {drama.info?.status}
                  </p>

                  <p>
                    <b>Type:</b> {drama.info?.type}
                  </p>

                  <p>
                    <b>Country:</b> {drama.info?.country}
                  </p>

                  <p>
                    <b>Total Episode:</b> {drama.total_episode_available}
                  </p>

                  <p>
                    <b>Director:</b> {drama.info?.director}
                  </p>

                  <p>
                    <b>Release:</b> {drama.info?.first_air_date}
                  </p>
                </div>

                {/* ========================= */}
                {/* RIGHT SIDE (CAST) */}
                {/* ========================= */}
                {drama.stars?.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-white mb-3">
                      🎭 Aktor
                    </h3>

                    <ul className="space-y-2 text-sm text-zinc-400">
                      {drama.stars.slice(0, 8).map((s: any) => (
                        <li
                          key={s.name}
                          className="flex items-start gap-2"
                        >
                          <span className="text-purple-400">•</span>
                          <span className="leading-snug">
                            {s.name}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ================================= */}
        {/* ✅ WATCH SECTION */}
        {/* ================================= */}
        <section>
          <div className="flex flex-col gap-4 mb-8 sm:flex-row sm:items-center sm:justify-between border-b border-white/5 pb-6">
            {/* Sisi Kiri: Judul dengan Aksen */}
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-8 bg-purple-600 rounded-full shadow-[0_0_15px_rgba(147,51,234,0.5)]" />
              <div className="flex flex-col">
                <h2 className="text-xl md:text-2xl font-black tracking-tight text-white flex items-center gap-2">
                  🎬 Tonton Sekarang
                </h2>
                <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-500 font-bold ml-1">
                  Streaming Kualitas Terbaik
                </p>
              </div>
            </div>

            {/* Sisi Kanan: Tombol Kembali yang Responsif */}
            <Link
              href="/drama/korea"
              className="group flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl 
               bg-zinc-900/50 border border-white/10 text-white/70 
               hover:bg-purple-600 hover:text-white hover:border-purple-500
               transition-all duration-300 active:scale-95 text-xs font-bold"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 transition-transform group-hover:-translate-x-1"
                fill="none" viewBox="0 0 24 24" stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="hidden sm:inline">Kembali ke Daftar Drama</span>
              <span className="sm:hidden">Lihat Drama Lain</span>
            </Link>
          </div>

          <EpisodePlayer episodes={drama.episodes} />
        </section>

        {/* ================================= */}
        {/* ✅ RELATED DRAMA */}
        {/* ================================= */}
        {merged.length > 0 && (
          <section className="mt-14">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              🔥 Drama Serupa Berdasarkan Genre
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-5">
              {merged
                .filter((d: any) => d.endpoint !== id)
                .slice(0, 10)
                .map((item: any) => (
                  <DramaCard key={item.endpoint} drama={item} />
                ))}
            </div>

            {/* Button Explore */}
            <div className="flex justify-end mt-6">
              <Link
                href={`/drama/korea?genre=${drama.genres[0]}`}
                className="text-sm text-purple-400 hover:underline"
              >
                Lihat semua drama genre {drama.genres[0]} →
              </Link>
            </div>
          </section>
        )}
      </main>
    </>
  )
}