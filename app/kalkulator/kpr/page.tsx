import type { Metadata } from 'next'
import KprCalculator from '@/components/kalkulator/KprClculator'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Kalkulator KPR Rumah & Simulasi Cicilan Online',
    description:
        'Simulasi KPR rumah untuk menghitung cicilan berdasarkan harga rumah, DP, tenor, bunga fixed dan floating. Gratis dan mudah.',
    other: {
        'application/ld+json': JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Kalkulator KPR Rumah',
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

export default function KprPage() {
    return (
        <section className="space-y-16 max-w-4xl">
            {/* HERO */}
            <header>
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator KPR Rumah
                </h1>
                <p className="mt-3 text-gray-600 max-w-2xl">
                    Kalkulator KPR online untuk simulasi cicilan Kredit Pemilikan Rumah
                    berdasarkan harga rumah, uang muka (DP), tenor, serta bunga fixed dan
                    floating sesuai praktik perbankan di Indonesia.
                </p>
            </header>

            {/* CALCULATOR */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <KprCalculator />
            </div>

            {/* INTERNAL LINKS */}
            <div className="text-sm text-gray-600">
                <p>
                    Ingin membandingkan dengan{' '}
                    <Link
                        href="/kalkulator/cicilan"
                        className="text-black underline"
                    >
                        kalkulator cicilan
                    </Link>{' '}
                    atau menghitung{' '}
                    <Link
                        href="/kalkulator/take-home-pay"
                        className="text-black underline"
                    >
                        gaji bersih
                    </Link>{' '}
                    sebelum mengajukan KPR? Gunakan tools lainnya di My Tools.
                </p>
            </div>

            {/* SEO CONTENT */}
            <section className="space-y-4 text-sm text-gray-600 max-w-2xl">
                <h2 className="text-lg font-semibold text-gray-900">
                    Cara Menghitung Cicilan KPR
                </h2>

                <p>
                    Perhitungan cicilan KPR dipengaruhi oleh beberapa faktor utama, yaitu
                    harga rumah, persentase uang muka (DP), tenor pinjaman dalam tahun,
                    serta suku bunga yang ditetapkan oleh bank. Dengan memasukkan data
                    tersebut, simulasi KPR dapat memberikan estimasi cicilan bulanan yang
                    harus dibayarkan.
                </p>

                <p>
                    Umumnya, bank menawarkan skema bunga <strong>fixed</strong> pada
                    beberapa tahun pertama, kemudian dilanjutkan dengan bunga{' '}
                    <strong>floating</strong> yang mengikuti kondisi pasar. Perbedaan
                    skema ini akan memengaruhi besar cicilan dan total pembayaran KPR.
                </p>

                <p>
                    Kalkulator KPR ini membantu memberikan gambaran awal sebelum Anda
                    mengajukan kredit ke bank, sehingga perencanaan keuangan dapat
                    dilakukan dengan lebih matang.
                </p>
            </section>

            {/* DISCLAIMER */}
            <p className="text-xs text-gray-500">
                💡 Catatan: Hasil simulasi bersifat estimasi dan dapat berbeda dengan
                perhitungan resmi dari pihak bank atau lembaga keuangan.
            </p>
        </section>
    )
}