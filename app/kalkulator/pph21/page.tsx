import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import Pph21Calculator from '@/components/Pph21Calculator'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'

export const metadata: Metadata = {
    title: 'Kalkulator PPh 21 Online – Hitung Pajak Penghasilan',
    description:
        'Hitung estimasi PPh 21 karyawan berdasarkan gaji dan status PTKP. Gratis, mudah digunakan, dan sesuai ketentuan umum di Indonesia.',
    other: {
        'application/ld+json': JSON.stringify([
            {
                '@context': 'https://schema.org',
                '@type': 'WebApplication',
                name: 'Kalkulator PPh 21',
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
                        name: 'Apakah hasil kalkulator PPh 21 pasti sama dengan slip gaji?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Tidak selalu. Hasil perhitungan bersifat estimasi karena kebijakan perusahaan, komponen gaji, dan potongan dapat memengaruhi pajak.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Apakah PPh 21 dihitung per bulan atau per tahun?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'PPh 21 umumnya dihitung berdasarkan penghasilan tahunan, lalu dibagi untuk mendapatkan estimasi potongan pajak bulanan.',
                        },
                    },
                    {
                        '@type': 'Question',
                        name: 'Status PTKP apa saja yang digunakan?',
                        acceptedAnswer: {
                            '@type': 'Answer',
                            text:
                                'Status PTKP mengikuti ketentuan umum seperti TK/0 hingga K/3 yang umum digunakan dalam perhitungan pajak karyawan.',
                        },
                    },
                ],
            },
        ]),
    },
}

export default function Pph21Page() {
    return (
        <section className="space-y-16">
            {/* HEADER */}
            <header className="max-w-2xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator PPh 21
                </h1>

                <p className="mt-3 text-gray-600">
                    Kalkulator PPh 21 online untuk menghitung estimasi pajak
                    penghasilan karyawan berdasarkan gaji bulanan dan status PTKP.
                    Hasil bersifat perkiraan dan dapat berbeda sesuai kebijakan
                    perusahaan dan komponen gaji.
                </p>
            </header>

            {/* CONTENT */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* CALCULATOR */}
                <div className="lg:col-span-2 space-y-6">
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <Pph21Calculator />
                    </div>

                    {/* INTERNAL LINKS */}
                    <div className="text-sm text-gray-600">
                        <p>
                            Ingin mengetahui{' '}
                            <Link
                                href="/kalkulator/take-home-pay"
                                className="text-black underline"
                            >
                                gaji bersih (take home pay)
                            </Link>{' '}
                            setelah pajak atau menghitung{' '}
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
                            Cara Menghitung PPh 21
                        </h2>

                        <p>
                            PPh 21 merupakan pajak penghasilan atas penghasilan berupa gaji,
                            upah, honorarium, tunjangan, dan pembayaran lain sehubungan
                            dengan pekerjaan. Perhitungan PPh 21 umumnya menggunakan
                            penghasilan tahunan sebagai dasar pengenaan pajak.
                        </p>

                        <p>
                            Setelah dikurangi pengurang seperti biaya jabatan dan PTKP,
                            penghasilan kena pajak akan dikenakan tarif pajak progresif
                            sesuai ketentuan yang berlaku. Nilai pajak tahunan kemudian
                            dibagi untuk mendapatkan estimasi potongan pajak bulanan.
                        </p>

                        <p>
                            Kalkulator PPh 21 ini membantu memberikan gambaran awal besaran
                            pajak yang harus dibayarkan, sehingga karyawan dapat merencanakan
                            keuangan dengan lebih baik.
                        </p>
                    </div>

                    {/* SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <MarketStockTrend />
                    </aside>
                </div>
            </section>

            {/* FAQ VISUAL */}
            <section className="max-w-3xl space-y-4">
                <h3 className="font-semibold text-gray-900">
                    Pertanyaan yang Sering Diajukan
                </h3>

                <ul className="space-y-3 text-sm text-gray-600">
                    <li>
                        <strong>
                            Apakah hasil kalkulator ini sama dengan slip gaji?
                        </strong>
                        <p>
                            Tidak selalu. Perhitungan bersifat estimasi dan dapat berbeda
                            tergantung kebijakan perusahaan dan komponen gaji.
                        </p>
                    </li>

                    <li>
                        <strong>
                            Apakah PPh 21 dihitung per bulan atau per tahun?
                        </strong>
                        <p>
                            Umumnya dihitung tahunan lalu dibagi untuk estimasi pajak
                            bulanan.
                        </p>
                    </li>

                    <li>
                        <strong>
                            Status PTKP apa saja yang digunakan?
                        </strong>
                        <p>
                            Mengacu pada status umum seperti TK/0 hingga K/3 sesuai
                            ketentuan perpajakan.
                        </p>
                    </li>
                </ul>
            </section>

            {/* DISCLAIMER */}
            <p className="text-xs text-gray-500 max-w-3xl">
                💡 Catatan: Hasil perhitungan bersifat estimasi dan tidak
                menggantikan perhitungan resmi dari pihak perusahaan atau DJP.
            </p>
        </section>
    )
}