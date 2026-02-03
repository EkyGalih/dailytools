import Link from 'next/link'
import { Home, Search } from 'lucide-react'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-6 py-24">
      <div className="text-center">
        {/* Visual 404 dengan nuansa Indigo */}
        <div className="relative">
          <h1 className="text-[12rem] md:text-[18rem] font-black leading-none text-zinc-50 select-none">
            404
          </h1>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter text-zinc-900">
              TAMAN<span className="text-indigo-600">TO.</span>
            </span>
            <p className="text-[10px] font-bold text-zinc-400 uppercase tracking-[0.3em] mt-2">
              Wah, Sepertinya Kamu Tersesat
            </p>
          </div>
        </div>

        {/* Pesan dalam Bahasa Sasak / Lokal */}
        <div className="max-w-md mx-auto mt-8">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">
            "Ndek araq ape-ape lite!"
          </h2>
          <p className="text-zinc-500 text-sm leading-relaxed mb-10">
            Halaman drama, anime, atau tools yang kamu cari tidak ditemukan.
            Mungkin link-nya sudah basi atau sedang dipindahkan ke tempat yang lebih keren.
          </p>

          {/* Navigasi Kembali */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-zinc-900 text-white text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-indigo-500/10"
            >
              <Home className="w-4 h-4" /> Balik ke Beranda
            </Link>
            <Link
              href="/anime"
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-600 text-sm font-black uppercase tracking-widest rounded-2xl hover:bg-zinc-200 transition-all active:scale-95"
            >
              <Search className="w-4 h-4" /> Cari Anime
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}