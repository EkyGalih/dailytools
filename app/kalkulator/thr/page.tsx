import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import ThrCalculator from '@/components/ThrCalculator'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'

export const metadata: Metadata = {
    title: 'Kalkulator THR Online – Hitung Tunjangan Hari Raya',
    description:
        'Hitung THR karyawan berdasarkan gaji dan masa kerja sesuai ketentuan di Indonesia. Gratis dan mudah digunakan.',
    other: {
        // WebApplication + FAQ schema
        'application/ld+json': JSON.stringify([
            {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Kalkulator THR',
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
                        name: 'Apakah karyawan kontrak berhak menerima THR?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Ya, karyawan kontrak berhak menerima THR selama telah bekerja minimal satu bulan secara terus menerus.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Apakah THR dihitung dari gaji pokok?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'THR umumnya dihitung berdasarkan gaji pokok dan tunjangan tetap.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Kapan THR harus dibayarkan?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'THR wajib dibayarkan paling lambat 7 hari sebelum hari raya keagamaan.',
                        },
                    },
                ],
            },
        ]),
    },
}

export default function ThrPage() {
    return (
        <section className="space-y-16">
            {/* MAIN */}
            {/* HEADER */}
            <header className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator THR
                </h1>

                <p className="mt-3 text-gray-600">
                    Kalkulator THR online untuk menghitung Tunjangan Hari Raya
                    berdasarkan gaji bulanan dan masa kerja sesuai ketentuan umum
                    yang berlaku di Indonesia.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                <div className="md:col-span-2 space-y-6">
                    {/* CALCULATOR */}
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <ThrCalculator />
                    </div>

                    {/* INTERNAL LINKS */}
                    <div className="text-sm text-gray-600">
                        <p>
                            Perlu menghitung{' '}
                            <Link
                                href="/kalkulator/take-home-pay"
                                className="text-black underline"
                            >
                                gaji bersih (take home pay)
                            </Link>{' '}
                            atau{' '}
                            <Link
                                href="/kalkulator/zakat"
                                className="text-black underline"
                            >
                                zakat penghasilan
                            </Link>
                            ? Gunakan kalkulator lainnya di My Tools.
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
                            Cara Menghitung THR
                        </h2>

                        <p>
                            Tunjangan Hari Raya (THR) merupakan hak karyawan yang telah
                            bekerja minimal satu bulan secara terus menerus. Besaran THR
                            dihitung berdasarkan gaji bulanan dan lama masa kerja.
                        </p>

                        <p>
                            Karyawan dengan masa kerja 12 bulan atau lebih berhak menerima
                            THR sebesar satu bulan gaji. Sedangkan karyawan dengan masa
                            kerja kurang dari 12 bulan akan menerima THR secara
                            proporsional sesuai masa kerjanya.
                        </p>

                        <p>
                            Kalkulator THR ini membantu memberikan estimasi perhitungan THR
                            dengan cepat dan mudah sebelum hari raya tiba.
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
                            Apakah karyawan kontrak dapat THR?
                        </strong>
                        <p>
                            Ya, selama telah bekerja minimal satu bulan secara terus
                            menerus.
                        </p>
                    </li>

                    <li>
                        <strong>
                            Apakah THR dihitung dari gaji pokok?
                        </strong>
                        <p>
                            Umumnya dihitung dari gaji pokok dan tunjangan tetap.
                        </p>
                    </li>

                    <li>
                        <strong>
                            Kapan THR harus dibayarkan?
                        </strong>
                        <p>
                            Paling lambat 7 hari sebelum hari raya keagamaan.
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