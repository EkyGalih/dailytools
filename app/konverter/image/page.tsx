import type { Metadata } from 'next'
import ImageConverter from '@/components/konverter/ImageConverter'
import MarketInfo from '@/components/MarketInfo'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'

export const metadata: Metadata = {
    title: 'Image Converter Online – JPG, PNG ke WebP',
    description:
        'Konversi gambar JPG, PNG ke WebP dan format lainnya langsung di browser. Aman, cepat, tanpa upload ke server.',
    other: {
        'application/ld+json': JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Image Converter Online',
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

export default function ImageConverterPage() {
    return (
        <section className="space-y-16">
            {/* HEADER */}
            <header className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Image Converter Online
                </h1>
                <p className="mt-3 text-gray-600">
                    Image converter online untuk mengonversi gambar JPG, PNG ke WebP
                    atau format lainnya langsung di browser. Proses cepat, aman,
                    dan tanpa mengunggah file ke server.
                </p>
            </header>

            {/* CONTENT */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* MAIN */}
                <div className="md:col-span-2 space-y-6">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-2xl">
                        <ImageConverter />
                    </div>

                    {/* INTERNAL LINK */}
                    <div className="text-sm text-gray-600 max-w-2xl">
                        <p>
                            Ingin memperkecil ukuran file? Gunakan{' '}
                            <Link
                                href="/kompress/gambar"
                                className="text-black underline"
                            >
                                kompres gambar
                            </Link>{' '}
                            untuk kebutuhan 1MB, 2MB, atau 5MB.
                        </p>
                    </div>

                    {/* NOTE */}
                    <p className="text-xs text-gray-500 max-w-2xl">
                        💡 Catatan: File diproses sepenuhnya di browser Anda dan tidak
                        dikirim ke server, sehingga privasi tetap terjaga.
                    </p>
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
                    Tentang Image Converter Online
                </h2>

                <p>
                    Image converter adalah tools online yang digunakan untuk
                    mengubah format gambar dari satu jenis ke jenis lainnya, seperti
                    JPG ke WebP atau PNG ke WebP. Format WebP umumnya menghasilkan
                    ukuran file yang lebih kecil dengan kualitas visual yang tetap
                    baik.
                </p>

                <p>
                    Dengan image converter berbasis browser, proses konversi dapat
                    dilakukan secara langsung tanpa perlu menginstal aplikasi
                    tambahan. Hal ini memudahkan pengguna untuk mengonversi gambar
                    dengan cepat dan aman.
                </p>

                <p>
                    Tools ini cocok digunakan untuk kebutuhan optimasi website,
                    upload dokumen, maupun penghematan ukuran file gambar.
                </p>
            </section>

            {/* DISCLAIMER */}
            <p className="text-xs text-gray-500 max-w-3xl">
                💡 Catatan: Hasil konversi dapat berbeda tergantung format dan
                kualitas gambar asli.
            </p>
        </section>
    )
}