import type { Metadata } from 'next'
import ImageSizeCompressor from '@/components/konverter/ImageSizeCompressor'
import MarketInfo from '@/components/MarketInfo'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'

export const metadata: Metadata = {
  title: 'Kompres Gambar ke 1MB, 2MB, atau 5MB Online',
  description:
    'Kompres gambar JPG, PNG, atau WebP ke ukuran 1MB, 2MB, atau 5MB secara otomatis. Diproses langsung di browser tanpa upload ke server.',
  other: {
    'application/ld+json': JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'WebApplication',
      name: 'Kompres Gambar Online',
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

export default function ImageCompressPage() {
  return (
    <section className="space-y-16">
      {/* HEADER */}
      <header className="max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight">
          Kompres Gambar ke 1 MB, 2 MB, atau 5 MB
        </h1>

        <p className="mt-3 text-gray-600">
          Tools kompres gambar online untuk memperkecil ukuran file JPG,
          PNG, atau WebP ke target 1MB, 2MB, atau 5MB secara otomatis.
          Seluruh proses dilakukan langsung di browser tanpa mengunggah
          file ke server.
        </p>
      </header>

      {/* CONTENT */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* MAIN */}
        <div className="md:col-span-2 space-y-6">
          {/* TOOL CARD */}
          <div className="max-w-2xl bg-white border rounded-2xl p-6 shadow-sm">
            <ImageSizeCompressor />
          </div>

          {/* INTERNAL LINK */}
          <div className="text-sm text-gray-600 max-w-2xl">
            <p>
              Perlu mengubah format gambar? Gunakan{' '}
              <Link
                href="/konverter/image"
                className="text-black underline"
              >
                image converter
              </Link>{' '}
              untuk mengonversi PNG, JPG, atau WebP sebelum dikompres.
            </p>
          </div>

          {/* INFO */}
          <div className="max-w-2xl text-sm text-gray-500 space-y-2">
            <p>
              💡 Tips: Untuk foto, gunakan format WebP agar ukuran file
              lebih kecil dengan kualitas visual tetap baik.
            </p>
            <p>
              Catatan: Hasil kompresi mendekati target ukuran dan tidak
              selalu persis sama dengan angka yang dipilih.
            </p>
          </div>
        </div>

        {/* SIDEBAR */}
        <aside>
          <div className="mb-2">
            <MarketInfo />
          </div>
          <div className="mt-2">
            <MarketStockTrend />
          </div>
        </aside>
      </div>

      {/* SEO CONTENT */}
      <section className="max-w-3xl text-gray-700 text-sm space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Tentang Kompres Gambar Online
        </h2>

        <p>
          Kompres gambar adalah proses memperkecil ukuran file gambar
          tanpa mengurangi kualitas secara signifikan. Tools kompres
          gambar sering digunakan untuk kebutuhan upload dokumen,
          pendaftaran online, maupun optimasi website.
        </p>

        <p>
          Dengan kompres gambar berbasis browser, pengguna dapat
          memperkecil ukuran file JPG, PNG, atau WebP langsung tanpa
          instalasi aplikasi tambahan dan tanpa risiko kebocoran data,
          karena file tidak dikirim ke server.
        </p>

        <p>
          Tools ini mendukung kebutuhan umum seperti kompres gambar ke
          1MB, 2MB, atau 5MB yang sering dibutuhkan untuk upload formulir
          atau sistem online tertentu.
        </p>
      </section>

      {/* DISCLAIMER */}
      <p className="text-xs text-gray-500 max-w-3xl">
        💡 Catatan: Hasil kompresi dapat bervariasi tergantung ukuran,
        resolusi, dan kompleksitas gambar asli.
      </p>
    </section>
  )
}