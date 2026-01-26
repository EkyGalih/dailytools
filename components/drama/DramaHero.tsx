// components/drama/DramaHero.tsx
import Link from 'next/link'

export default function DramaHero() {
  return (
    <header className="rounded-3xl bg-gradient-to-br from-fuchsia-700 via-purple-700 to-indigo-800 text-white p-8 md:p-10">
      <div className="max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
          Drama China Viral & Trending
        </h1>
        <p className="mt-3 text-white/80 leading-relaxed">
          Update harian video drama China yang lagi viral (short/reel style), lengkap dengan kategori,
          embed trailer, dan rekomendasi video terkait.
        </p>

        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/drama/kategori/romance"
            className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm"
          >
            Romance
          </Link>
          <Link
            href="/drama/kategori/ceo"
            className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm"
          >
            CEO / Boss
          </Link>
          <Link
            href="/drama/kategori/revenge"
            className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm"
          >
            Revenge
          </Link>
          <Link
            href="/drama/kategori/timetravel"
            className="bg-white/10 hover:bg-white/15 border border-white/20 rounded-full px-4 py-2 text-sm"
          >
            Time Travel
          </Link>
        </div>
      </div>
    </header>
  )
}