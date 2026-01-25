import type { Metadata } from 'next'
import InstallmentCalculator from '@/components/kalkulator/InstallmentCalculator'
import MarketInfo from '@/components/MarketInfo'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'

export const metadata: Metadata = {
    title: 'Kalkulator Cicilan Motor & Mobil Online',
    description:
        'Hitung cicilan motor, mobil, dan barang lainnya berdasarkan harga, DP, tenor, dan bunga. Gratis dan mudah digunakan.',
    other: {
        'application/ld+json': JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Kalkulator Cicilan Motor & Mobil',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'All',
            offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'IDR',
            },
        }),
    },
}

export default function CicilanPage() {
    return (
        <section className="space-y-16">
            {/* HERO */}
            <header>
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator Cicilan Motor & Mobil
                </h1>
                <p className="mt-3 text-gray-600 max-w-2xl">
                    Kalkulator cicilan online untuk menghitung estimasi cicilan motor,
                    mobil, atau barang lainnya berdasarkan harga, uang muka (DP), tenor,
                    dan bunga. Cocok untuk perhitungan leasing maupun kredit bank.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {/* MAIN */}
                <div className="md:col-span-2 space-y-8">
                    {/* CALCULATOR */}
                    <div className="bg-white border rounded-2xl p-6 shadow-sm">
                        <InstallmentCalculator />
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
                            atau estimasi{' '}
                            <Link
                                href="/kalkulator/pph21"
                                className="text-black underline"
                            >
                                pajak PPh 21
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
                            Cara Menghitung Cicilan Kredit
                        </h2>

                        <p>
                            Perhitungan cicilan kredit umumnya dipengaruhi oleh beberapa
                            faktor utama seperti harga kendaraan atau barang, besar uang
                            muka (DP), tenor cicilan dalam bulan, serta suku bunga per tahun.
                            Dengan memasukkan data tersebut, kalkulator cicilan dapat
                            memberikan gambaran estimasi cicilan bulanan.
                        </p>

                        <p>
                            Pada praktiknya, terdapat dua metode perhitungan yang umum
                            digunakan, yaitu metode flat yang banyak diterapkan oleh leasing
                            dan metode anuitas yang biasa digunakan oleh bank. Masing-masing
                            metode memiliki karakteristik dan total pembayaran yang berbeda.
                        </p>
                    </div>

                    {/* SIDEBAR */}
                    <aside className="lg:col-span-1">
                        <MarketStockTrend />
                    </aside>
                </div>
            </section>

            {/* DISCLAIMER */}
            <p className="text-xs text-gray-500">
                💡 Catatan: Hasil perhitungan bersifat estimasi dan dapat berbeda
                dengan simulasi resmi dari pihak leasing atau bank.
            </p>
        </section >
    )
}
