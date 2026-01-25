export const dynamic = 'force-dynamic'

import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import TakeHomePayCalculator from '@/components/TakeHomePayCalculator'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'

export const metadata: Metadata = {
    title: 'Kalkulator Gaji Bersih (Take Home Pay) Online',
    description:
        'Hitung gaji bersih (take home pay) setelah potongan PPh 21 dan BPJS. Gratis, cepat, dan mudah digunakan.',
    other: {
        'application/ld+json': JSON.stringify([
            {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Kalkulator Gaji Bersih (Take Home Pay)',
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
                        name: 'Apa itu take home pay?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Take home pay adalah gaji bersih yang diterima karyawan setelah dipotong pajak dan iuran seperti PPh 21 dan BPJS.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Apakah hasil kalkulator take home pay selalu sama dengan slip gaji?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Tidak selalu. Hasil perhitungan bersifat estimasi dan dapat berbeda tergantung kebijakan perusahaan dan komponen gaji.',
                        },
                    },
                ],
            },
        ]),
    },
}

export default function TakeHomePayPage() {
    return (
        <section className="space-y-16">
            {/* HEADER */}
            <header className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator Gaji Bersih (Take Home Pay)
                </h1>
                <p className="mt-3 text-gray-600">
                    Kalkulator take home pay online untuk menghitung estimasi gaji
                    bersih setelah potongan PPh 21 dan BPJS. Hasil bersifat
                    perkiraan dan dapat berbeda sesuai kebijakan perusahaan.
                </p>
            </header>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CALCULATOR */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <TakeHomePayCalculator />
                    </div>

                    {/* INTERNAL LINKS */}
                    <div className="text-sm text-gray-600">
                        <p>
                            Ingin menghitung{' '}
                            <Link
                                href="/kalkulator/thr"
                                className="text-black underline"
                            >
                                THR
                            </Link>{' '}
                            atau estimasi{' '}
                            <Link
                                href="/kalkulator/pph21"
                                className="text-black underline"
                            >
                                PPh 21
                            </Link>
                            ? Gunakan kalkulator lainnya di My Tools.
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
                            Cara Menghitung Gaji Bersih (Take Home Pay)
                        </h2>

                        <p>
                            Take home pay adalah jumlah gaji bersih yang diterima karyawan
                            setelah dikurangi berbagai potongan seperti pajak penghasilan
                            (PPh 21) dan iuran BPJS. Besarnya potongan dapat berbeda
                            tergantung gaji, status PTKP, serta kebijakan perusahaan.
                        </p>

                        <p>
                            Pada perhitungan sederhana, gaji kotor akan dikurangi pajak
                            PPh 21, iuran BPJS Kesehatan, dan BPJS Ketenagakerjaan untuk
                            mendapatkan estimasi gaji bersih yang diterima setiap bulan.
                        </p>

                        <p>
                            Kalkulator gaji bersih ini membantu memberikan gambaran awal
                            agar karyawan dapat merencanakan keuangan dengan lebih baik.
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
                💡 Catatan: Perhitungan ini menggunakan asumsi umum potongan
                karyawan. Jika perusahaan memiliki komponen lain seperti
                tunjangan atau iuran tambahan, hasil perhitungan dapat berbeda.
            </p>
        </section >
    )
}