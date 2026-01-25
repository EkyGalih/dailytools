import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import ZakatFitrahCalculator from '@/components/ZakatFitrahCalculator'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'

export const metadata: Metadata = {
    title: 'Kalkulator Zakat Fitrah Online',
    description:
        'Hitung zakat fitrah berdasarkan jumlah jiwa dan harga beras sesuai ketentuan di Indonesia. Gratis dan mudah digunakan.',
    other: {
        'application/ld+json': JSON.stringify([
            {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Kalkulator Zakat Fitrah',
                applicationCategory: 'FinanceApplication',
                operatingSystem: 'All',
                offers: {
                    '@type': 'Offer',
                    price: '0',
                    priceCurrency: 'IDR',
                },
            },
            {
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                    {
                        '@type': 'Question',
                        name: 'Berapa zakat fitrah per orang?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Zakat fitrah sebesar 2,5 kg beras atau nilai uang yang setara dengan harga beras yang dikonsumsi.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Apakah zakat fitrah boleh dibayar dengan uang?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Ya, zakat fitrah boleh dibayarkan dengan uang selama nilainya setara dengan harga beras.',
                        },
                    },
                ],
            },
        ]),
    },
}

export default function ZakatFitrahPage() {
    return (
        <section className="space-y-16">
            {/* HEADER */}
            <header className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator Zakat Fitrah
                </h1>

                <p className="mt-3 text-gray-600">
                    Kalkulator zakat fitrah online untuk menghitung zakat berdasarkan
                    jumlah jiwa dan harga beras per kilogram sesuai ketentuan umum
                    yang berlaku di Indonesia.
                </p>
            </header>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CALCULATOR */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <ZakatFitrahCalculator />
                    </div>

                    {/* INTERNAL LINKS */}
                    <div className="text-sm text-gray-600">
                        <p>
                            Perlu menghitung zakat lainnya?{' '}
                            <Link
                                href="/kalkulator/zakat"
                                className="text-black underline"
                            >
                                Zakat Penghasilan
                            </Link>{' '}
                            atau{' '}
                            <Link
                                href="/kalkulator/fidya"
                                className="text-black underline"
                            >
                                Fidya Puasa
                            </Link>
                            .
                        </p>
                    </div>
                </div>

                {/* MARKET INFO */}
                <aside className="lg:col-span-1">
                    <MarketInfo />
                </aside>
            </div>

            {/* SEO CONTENT */}
            <section className="max-w-5xl space-y-6 text-gray-700 text-sm">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* KONTEN UTAMA */}
                    <div className="lg:col-span-2 space-y-4">
                        <h2 className="text-lg font-semibold text-gray-900">
                            Tentang Zakat Fitrah
                        </h2>

                        <p>
                            Zakat fitrah merupakan zakat yang wajib ditunaikan oleh setiap
                            Muslim menjelang Idul Fitri. Di Indonesia, besaran zakat fitrah
                            umumnya setara dengan <strong>2,5 kg atau 3,5 liter beras</strong>
                            per jiwa.
                        </p>

                        <p>
                            Zakat fitrah dapat ditunaikan dalam bentuk beras atau uang yang
                            nilainya disesuaikan dengan harga beras yang dikonsumsi
                            sehari-hari. Pembayaran zakat fitrah bertujuan untuk menyucikan
                            jiwa dan menyempurnakan ibadah puasa Ramadhan.
                        </p>
                    </div>

                    {/* SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <MarketStockTrend />
                    </aside>
                </div>
            </section>

            {/* FAQ VISUAL */}
            <section className="space-y-4 max-w-3xl">
                <h3 className="font-semibold text-gray-900">
                    Pertanyaan yang Sering Diajukan
                </h3>

                <ul className="space-y-3 text-sm text-gray-600">
                    <li>
                        <strong>
                            Berapa zakat fitrah per orang?
                        </strong>
                        <p>
                            Sebesar 2,5 kg beras atau nilai uang yang setara dengan harga
                            beras.
                        </p>
                    </li>

                    <li>
                        <strong>
                            Apakah zakat fitrah bisa dibayar dengan uang?
                        </strong>
                        <p>
                            Ya, selama nilai uang tersebut setara dengan harga beras yang
                            dikonsumsi.
                        </p>
                    </li>
                </ul>
            </section>

            {/* DISCLAIMER */}
            <p className="text-xs text-gray-500 max-w-3xl">
                💡 Catatan: Hasil perhitungan bersifat estimasi dan mengikuti
                ketentuan umum zakat fitrah yang berlaku.
            </p>
        </section >
    )
}