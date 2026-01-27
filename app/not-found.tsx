import Link from 'next/link'

export default function NotFound() {
  return (
    <section className="min-h-[70vh] flex flex-col items-center justify-center text-center space-y-4">
      <h1 className="text-4xl font-black text-white">404</h1>
      <p className="text-gray-400">
        Halaman yang kamu cari tidak ditemukan.
      </p>

      <Link
        href="/"
        className="mt-4 rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white hover:bg-indigo-700 transition"
      >
        ⬅ Kembali ke Beranda
      </Link>
    </section>
  )
}