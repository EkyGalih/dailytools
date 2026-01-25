import type { Metadata } from 'next'
import ToolGrid from '@/components/ToolsSearch'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'My Tools – Kalkulator & Tools Online Gratis',
  description:
    'Kumpulan kalkulator dan tools online gratis: THR, zakat, PPh 21, KPR, gaji bersih, kompres PDF & gambar.',
}

export default function Home() {
  return (
    <section className="space-y-24">
      {/* HERO */}
      <header className="rounded-3xl bg-gradient-to-br from-black to-gray-800 text-white px-6 py-20 text-center">
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
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">
              📊 Kalkulator Finansial
            </h3>
            <p className="text-gray-600 text-sm">
              Hitung{' '}
              <Link href="/kalkulator/thr" className="font-medium underline">
                THR
              </Link>
              ,{' '}
              <Link href="/kalkulator/zakat" className="font-medium underline">
                zakat penghasilan
              </Link>
              ,{' '}
              <Link href="/kalkulator/pph21" className="font-medium underline">
                PPh 21
              </Link>
              , hingga{' '}
              <Link href="/kalkulator/take-home-pay" className="font-medium underline">
                gaji bersih
              </Link>{' '}
              berdasarkan rumus dan ketentuan yang umum digunakan di Indonesia.
            </p>
          </div>

          {/* TECH */}
          <div className="bg-white border rounded-2xl p-6">
            <h3 className="text-lg font-semibold mb-2">
              🛠 Tools Teknis
            </h3>
            <p className="text-gray-600 text-sm">
              Gunakan tools seperti{' '}
              <Link href="/kompress/pdf" className="font-medium underline">
                kompres PDF
              </Link>
              ,{' '}
              <Link href="/kompress/gambar" className="font-medium underline">
                kompres gambar
              </Link>
              , dan{' '}
              <Link href="/konverter/image" className="font-medium underline">
                konverter gambar
              </Link>{' '}
              langsung dari browser tanpa perlu instal aplikasi tambahan.
            </p>
          </div>
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
    </section>
  )
}