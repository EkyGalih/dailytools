import type { Metadata } from 'next'
import ToolGrid from '@/components/ToolsSearch'
import Link from 'next/link'
import { getLiveMatches } from '@/libs/bola/api'

export const metadata: Metadata = {
  title: 'My Tools – Kalkulator & Tools Online Gratis',
  description:
    'Kumpulan kalkulator dan tools online gratis: THR, zakat, PPh 21, KPR, gaji bersih, kompres PDF & gambar.',
}

export default async function Home() {
  const live = await getLiveMatches()
  return (
    <section className="space-y-24">
      {/* HERO */}
      <header className="rounded-3xl bg-gradient-to-br from-black to-sky-900 text-white px-6 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold">
          My Tools
        </h1>
        <p className="mt-6 text-gray-300 text-lg max-w-3xl mx-auto">
          Tools online gratis yang cepat, akurat, dan mudah digunakan.
        </p>
      </header>

      {/* SEO CONTENT */}
      <section className="max-w-5xl mx-auto space-y-12">
        <div className="grid md:grid-cols-2 gap-6">
          {/* FINANCIAL */}
          <Link
            href="/kreator"
            className="block bg-white border rounded-2xl p-6
             hover:shadow-lg hover:-translate-y-1
             transition-all duration-200"
          >
            <h3 className="text-lg font-semibold mb-2">
              🎥 Tools untuk Konten Kreator
            </h3>

            <p className="text-gray-600 text-sm">
              Kumpulan tools gratis untuk kreator seperti{' '}
              <span className="font-medium">kalkulator penghasilan YouTube</span>,{' '}
              <span className="font-medium">generator hashtag</span>,{' '}
              <span className="font-medium">generator caption</span>, dan{' '}
              <span className="font-medium">estimasi ukuran video</span>{' '}
              untuk Instagram, TikTok, dan YouTube.
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-black">
              Lihat semua tools kreator
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>

          <Link
            href="/kalkulator"
            className="group block bg-white border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:underline">
              📊 Kalkulator Finansial
            </h3>

            <p className="text-gray-600 text-sm">
              Hitung{' '}
              <span className="font-medium underline">THR</span>,{' '}
              <span className="font-medium underline">zakat penghasilan</span>,{' '}
              <span className="font-medium underline">PPh 21</span>, hingga{' '}
              <span className="font-medium underline">gaji bersih</span>{' '}
              berdasarkan rumus dan ketentuan yang umum digunakan di Indonesia.
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-black">
              Lihat semua kalkulator{' '}
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>

          <Link
            href="/konverter"
            className="group block bg-white border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:underline">
              🔄 Konverter File
            </h3>

            <p className="text-gray-600 text-sm">
              Konversi file langsung di browser seperti{' '}
              <span className="font-medium underline">gambar (JPG, PNG, WebP)</span>{' '}
              tanpa instal aplikasi tambahan.
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-black">
              Lihat semua konverter <span className="group-hover:translate-x-1 transition">→</span>
            </span>
          </Link>

          <Link
            href="/kompress"
            className="group block bg-white border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <h3 className="text-lg font-semibold mb-2 group-hover:underline">
              🗜 Kompres File
            </h3>

            <p className="text-gray-600 text-sm">
              Perkecil ukuran{' '}
              <span className="font-medium underline">gambar</span> dan{' '}
              <span className="font-medium underline">PDF</span>{' '}
              tanpa mengurangi kualitas secara signifikan.
            </p>

            <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-black">
              Lihat semua tool kompres <span className="group-hover:translate-x-1 transition">→</span>
            </span>
          </Link>
        </div>
      </section>

      {/* TOOLS GRID */}
      <ToolGrid />

      {/* FAQ (SEO BOOSTER) */}
      <section className="max-w-4xl mx-auto space-y-6">
        {/* WHY */}
        <div className="bg-gray-50 border rounded-2xl p-8">
          <h3 className="text-lg font-semibold mb-4">
            Mengapa Menggunakan My Tools?
          </h3>
          <ul className="grid sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <li>⚡ Gratis dan tanpa registrasi</li>
            <li>🎯 Hasil cepat dan mudah digunakan</li>
            <li>🇮🇩 Fokus pada kebutuhan pengguna Indonesia</li>
            <li>📱 Mobile-friendly dan ringan</li>
          </ul>
        </div>
        <section className="max-w-5xl mx-auto border-t pt-12 mt-24">
          <h2 className="text-lg font-semibold">
            Kalkulator & Tools Online Gratis
          </h2>

          <p className="mt-4 text-sm text-gray-600 max-w-3xl leading-relaxed">
            Temukan berbagai kalkulator online gratis seperti kalkulator THR,
            kalkulator zakat penghasilan, kalkulator PPh 21, kalkulator gaji bersih,
            serta simulasi cicilan dan KPR. My Tools juga menyediakan tools online
            lainnya seperti kompres PDF, kompres gambar, dan konverter gambar yang
            dapat digunakan langsung dari browser.
          </p>

          <p className="mt-3 text-sm text-gray-600 max-w-3xl leading-relaxed">
            Dengan desain yang sederhana dan performa yang ringan, My Tools
            membantu pengguna menyelesaikan perhitungan dan pekerjaan teknis
            secara cepat dan efisien.
          </p>
        </section>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            {
              '@context': 'https://schema.org',
              '@type': 'WebSite',
              name: 'My Tools',
              url: 'https://mytools.web.id',
              description:
                'Kumpulan kalkulator dan tools online gratis untuk kebutuhan finansial dan teknis.',
            },
            {
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'My Tools',
              url: 'https://mytools.web.id',
            },
          ]),
        }}
      />
    </section>
  )
}