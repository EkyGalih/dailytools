import type { Metadata } from 'next'
import PdfCompressor from '@/components/konverter/PdfCompressor'
import MarketInfo from '@/components/MarketInfo'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'

export const metadata: Metadata = {
  title: 'Kompres PDF Online – Perkecil Ukuran File PDF',
  description:
    'Kompres PDF online untuk memperkecil ukuran file dengan aman langsung di browser. Cocok untuk upload dokumen dan formulir.',
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Kompres PDF Online',
      applicationCategory: 'UtilitiesApplication',
      operatingSystem: 'All',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'IDR',
      },
    }),
  },
}

export default function PdfCompressPage() {
  return (
    <section className="space-y-16">
      {/* HEADER */}
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Kompres PDF Online
        </h1>
        <p className="mt-3 text-gray-600">
          Tools kompres PDF online untuk memperkecil ukuran file PDF
          secara cepat dan aman langsung di browser. Cocok untuk upload
          formulir, dokumen administrasi, dan kebutuhan sehari-hari.
        </p>
      </header>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* MAIN */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-2xl">
            <PdfCompressor />
          </div>

          {/* INTERNAL LINK */}
          <div className="text-sm text-gray-600 max-w-2xl">
            <p>
              Perlu memperkecil file lain? Gunakan{' '}
              <Link
                href="/kompress/gambar"
                className="text-black underline"
              >
                kompres gambar
              </Link>{' '}
              atau{' '}
              <Link
                href="/konverter/image"
                className="text-black underline"
              >
                image converter
              </Link>{' '}
              untuk kebutuhan format gambar.
            </p>
          </div>

          {/* NOTE */}
          <p className="text-xs text-gray-500 max-w-2xl">
            💡 Catatan: Proses kompresi dilakukan langsung di browser
            Anda dan file tidak dikirim ke server, sehingga privasi
            dokumen tetap terjaga.
          </p>
        </div>

        {/* SIDEBAR */}
        <aside>
          <MarketInfo />
        </aside>
      </div>

      {/* SEO CONTENT */}
      <section className="max-w-5xl space-y-6 text-gray-700 text-sm">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* KONTEN UTAMA */}
          <div className="lg:col-span-2 space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              Tentang Kompres PDF Online
            </h2>

            <p>
              Kompres PDF adalah proses memperkecil ukuran file PDF agar lebih
              mudah diunggah dan dibagikan. File PDF dengan ukuran besar sering
              menjadi kendala saat upload ke sistem pendaftaran, email, atau
              portal administrasi.
            </p>

            <p>
              Dengan tools kompres PDF berbasis browser, pengguna dapat
              memperkecil ukuran file PDF tanpa perlu menginstal aplikasi
              tambahan. Proses dilakukan secara lokal sehingga lebih aman
              dan cepat.
            </p>

            <p>
              Tools ini cocok digunakan untuk mahasiswa, pekerja, maupun
              pengguna umum yang membutuhkan file PDF dengan ukuran lebih
              kecil tanpa mengurangi keterbacaan dokumen.
            </p>
          </div>

          {/* SIDEBAR */}
          <aside className="lg:col-span-1">
            <MarketStockTrend />
          </aside>
        </div>
      </section>

      {/* DISCLAIMER */}
      <p className="text-xs text-gray-500 max-w-3xl">
        💡 Catatan: Hasil kompresi dapat berbeda tergantung struktur,
        jumlah halaman, dan isi file PDF asli.
      </p>
    </section>
  )
}