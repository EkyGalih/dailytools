import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang MyTools – Tools Online Gratis',
  description:
    'MyTools adalah platform tools online gratis untuk kebutuhan finansial dan teknis.',
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'MyTools',
      url: 'https://mytools.web.id',
    }),
  },
}

export default function AboutPage() {
  return (
    <section className="space-y-16">
      {/* HEADER */}
      <header className="max-w-3xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Tentang MyTools
        </h1>

        <p className="mt-4 text-gray-600">
          MyTools adalah platform penyedia berbagai tools online gratis
          yang dirancang untuk membantu kebutuhan harian masyarakat
          Indonesia, mulai dari perhitungan finansial hingga konversi
          dan kompresi file secara cepat, mudah, dan praktis.
        </p>
      </header>

      {/* MAIN CONTENT */}
      <section className="max-w-3xl space-y-6 text-gray-700">
        <p>
          Di MyTools, pengguna dapat menemukan berbagai alat bantu
          seperti{' '}
          <Link href="/kalkulator/thr" className="underline text-black">
            kalkulator THR
          </Link>
          ,{' '}
          <Link href="/kalkulator/zakat" className="underline text-black">
            zakat penghasilan
          </Link>{' '}
          dan{' '}
          <Link
            href="/kalkulator/zakat-fitrah"
            className="underline text-black"
          >
            zakat fitrah
          </Link>
          ,{' '}
          <Link href="/kalkulator/pph21" className="underline text-black">
            PPh 21
          </Link>
          ,{' '}
          <Link
            href="/kalkulator/take-home-pay"
            className="underline text-black"
          >
            gaji bersih (take home pay)
          </Link>
          , simulasi cicilan, serta tools non-finansial seperti{' '}
          <Link href="/kompress/gambar" className="underline text-black">
            kompres gambar
          </Link>{' '}
          dan{' '}
          <Link href="/kompress/pdf" className="underline text-black">
            kompres PDF
          </Link>
          .
        </p>

        <p>
          Seluruh tools di MyTools dapat digunakan langsung tanpa
          registrasi dan tanpa instalasi aplikasi tambahan. Kami
          berfokus pada kemudahan penggunaan, performa ringan, serta
          hasil yang mudah dipahami oleh pengguna.
        </p>

        <p>
          MyTools dikembangkan dengan pendekatan modern, responsif,
          dan mobile-friendly agar dapat diakses dengan nyaman di
          berbagai perangkat, baik desktop maupun ponsel.
        </p>
      </section>

      {/* VALUES */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl">
        <div className="border rounded-xl p-6 bg-white">
          <p className="text-lg font-semibold">Mudah Digunakan</p>
          <p className="text-sm text-gray-600 mt-2">
            Dirancang agar dapat digunakan oleh siapa saja tanpa
            keahlian teknis atau proses yang rumit.
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-lg font-semibold">
            Praktis & Transparan
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Menyajikan hasil perhitungan dengan logika yang jelas dan
            mudah dipahami.
          </p>
        </div>

        <div className="border rounded-xl p-6 bg-white">
          <p className="text-lg font-semibold">Gratis & Aksesibel</p>
          <p className="text-sm text-gray-600 mt-2">
            Semua tools dapat digunakan tanpa biaya, tanpa registrasi,
            dan dapat diakses kapan saja.
          </p>
        </div>
      </section>

      {/* DISCLAIMER */}
      <section className="max-w-3xl border rounded-xl p-6 bg-gray-50">
        <h2 className="text-lg font-semibold">
          Catatan Penting
        </h2>
        <p className="mt-3 text-sm text-gray-600">
          Seluruh perhitungan dan proses yang ditampilkan di MyTools
          bersifat estimasi dan tidak menggantikan perhitungan resmi
          dari instansi pemerintah, lembaga keuangan, lembaga zakat,
          atau kebijakan perusahaan. Untuk keputusan penting yang
          bersifat finansial, administratif, atau ibadah, disarankan
          untuk berkonsultasi dengan pihak yang berwenang.
        </p>
      </section>
    </section>
  )
}