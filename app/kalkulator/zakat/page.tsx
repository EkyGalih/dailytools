import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import ZakatCalculator from '@/components/ZakatCalculator'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'

export const metadata: Metadata = {
    title: 'Kalkulator Zakat Penghasilan Online',
    description:
        'Hitung zakat penghasilan berdasarkan gaji dan nisab emas sesuai ketentuan yang berlaku. Gratis dan mudah digunakan.',
    other: {
        'application/ld+json': JSON.stringify([
            {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Kalkulator Zakat Penghasilan',
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
                        name: 'Apakah zakat penghasilan dihitung per bulan?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Zakat penghasilan dapat dihitung secara bulanan atau tahunan, tergantung kebiasaan dan kebutuhan masing-masing.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Apakah pengeluaran dikurangkan dalam zakat penghasilan?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Pada perhitungan sederhana, zakat penghasilan biasanya dihitung dari penghasilan kotor tanpa mengurangkan pengeluaran.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Siapa yang wajib membayar zakat penghasilan?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Zakat penghasilan wajib ditunaikan oleh Muslim yang penghasilannya telah mencapai nisab.',
                        },
                    },
                ],
            },
        ]),
    },
}

export default function ZakatPage() {
    return (
        <section className="space-y-16">
            {/* HEADER */}
            <header className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator Zakat Penghasilan
                </h1>

                <p className="mt-3 text-gray-600">
                    Kalkulator zakat penghasilan online untuk menghitung zakat
                    berdasarkan pendapatan bulanan dan nisab emas sesuai ketentuan
                    yang berlaku di Indonesia.
                </p>
            </header>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* MAIN */}
                <div className="md:col-span-2 space-y-8">

                    {/* CALCULATOR */}
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <ZakatCalculator />
                    </div>

                    {/* INTERNAL LINKS */}
                    <div className="text-sm text-gray-600">
                        <p>
                            Perlu menghitung zakat lainnya?{' '}
                            <Link
                                href="/kalkulator/zakat-fitrah"
                                className="text-black underline"
                            >
                                Zakat Fitrah
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
                            Cara Menghitung Zakat Penghasilan
                        </h2>

                        <p>
                            Zakat penghasilan merupakan zakat yang wajib dikeluarkan dari
                            pendapatan seseorang apabila telah mencapai nisab. Nisab zakat
                            penghasilan setara dengan nilai <strong>85 gram emas</strong>
                            dalam satu tahun.
                        </p>

                        <p>
                            Jika penghasilan telah memenuhi nisab, maka zakat yang wajib
                            ditunaikan adalah sebesar <strong>2,5%</strong> dari total
                            penghasilan. Perhitungan dapat dilakukan secara bulanan atau
                            tahunan sesuai kebutuhan.
                        </p>

                        <p>
                            Kalkulator zakat penghasilan ini membantu memberikan estimasi
                            perhitungan zakat secara cepat dan mudah sebagai panduan awal
                            sebelum menunaikan kewajiban zakat.
                        </p>
                    </div>
                    {/* SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <MarketStockTrend />
                    </aside>
                </div>
            </section>

            {/* FAQ VISUAL */}
            <section className="space-y-4">
                <h3 className="font-semibold text-gray-900">
                    Pertanyaan yang Sering Diajukan
                </h3>

                <ul className="space-y-3 text-sm text-gray-600">
                    <li>
                        <strong>
                            Apakah zakat penghasilan dihitung per bulan?
                        </strong>
                        <p>
                            Bisa dihitung secara bulanan maupun tahunan, tergantung
                            kebiasaan masing-masing.
                        </p>
                    </li>

                    <li>
                        <strong>
                            Apakah pengeluaran dikurangkan dalam perhitungan zakat?
                        </strong>
                        <p>
                            Pada perhitungan sederhana, zakat biasanya dihitung dari
                            penghasilan kotor.
                        </p>
                    </li>

                    <li>
                        <strong>
                            Siapa yang wajib membayar zakat penghasilan?
                        </strong>
                        <p>
                            Muslim yang penghasilannya telah mencapai nisab zakat.
                        </p>
                    </li>
                </ul>
            </section>

            {/* DISCLAIMER */}
            <p className="text-xs text-gray-500">
                💡 Catatan: Hasil perhitungan bersifat estimasi dan mengikuti
                ketentuan umum yang berlaku.
            </p>
        </section>
    )
}