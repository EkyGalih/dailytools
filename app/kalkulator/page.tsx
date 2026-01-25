import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Kalkulator Finansial Online Gratis',
    description:
        'Kumpulan kalkulator finansial online gratis: THR, zakat, PPh 21, gaji bersih, cicilan, dan simulasi KPR. Mudah, cepat, dan tanpa login.',
}

const calculators = [
    {
        title: 'Kalkulator THR',
        desc: 'Hitung Tunjangan Hari Raya berdasarkan gaji dan masa kerja.',
        href: '/kalkulator/thr',
        tag: 'Gaji',
        emoji: '🎁',
    },
    {
        title: 'Kalkulator Zakat Penghasilan',
        desc: 'Hitung zakat penghasilan bulanan sesuai nisab.',
        href: '/kalkulator/zakat',
        tag: 'Zakat',
        emoji: '🕌',
    },
    {
        title: 'Kalkulator Zakat Fitrah',
        desc: 'Hitung zakat fitrah berdasarkan jumlah jiwa dan harga beras.',
        href: '/kalkulator/zakat-fitrah',
        tag: 'Zakat',
        emoji: '🌙',
    },
    {
        title: 'Kalkulator PPh 21',
        desc: 'Estimasi pajak penghasilan karyawan berdasarkan PTKP.',
        href: '/kalkulator/pph21',
        tag: 'Pajak',
        emoji: '🧾',
    },
    {
        title: 'Kalkulator Gaji Bersih',
        desc: 'Hitung take home pay setelah pajak dan BPJS.',
        href: '/kalkulator/take-home-pay',
        tag: 'Gaji',
        emoji: '💰',
    },
    {
        title: 'Kalkulator Cicilan',
        desc: 'Simulasi cicilan motor, mobil, atau barang lainnya.',
        href: '/kalkulator/cicilan',
        tag: 'Kredit',
        emoji: '📊',
    },
    {
        title: 'Simulasi KPR',
        desc: 'Simulasi cicilan KPR dengan bunga fixed & floating.',
        href: '/kalkulator/kpr',
        tag: 'Properti',
        emoji: '🏠',
    },
]

export default function FinancialCalculatorPage() {
    return (
        <section className="space-y-16">
            {/* HERO */}
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kumpulan Kalkulator Finansial
                </h1>
                <p className="mt-4 text-gray-600">
                    Gunakan berbagai kalkulator finansial online gratis untuk membantu
                    perhitungan gaji, pajak, zakat, cicilan, hingga KPR. Semua tools dapat
                    digunakan langsung tanpa login.
                </p>
            </header>

            {/* GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
                {calculators.map((it) => (
                    <Link
                        key={it.href}
                        href={it.href}
                        className="group bg-white border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
                    >
                        <div className="flex items-start justify-between">
                            <div className="text-3xl">{it.emoji}</div>
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                {it.tag}
                            </span>
                        </div>

                        <h2 className="mt-4 text-lg font-semibold group-hover:text-black">
                            {it.title}
                        </h2>

                        <p className="mt-2 text-sm text-gray-600">
                            {it.desc}
                        </p>

                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-black">
                            Buka Kalkulator{' '}
                            <span className="transition group-hover:translate-x-1">→</span>
                        </span>
                    </Link>
                ))}
            </div>

            {/* SEO CONTENT */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">
                    Kalkulator Finansial untuk Kebutuhan Sehari-hari
                </h2>
                <p>
                    Kalkulator finansial membantu memperkirakan berbagai kebutuhan penting
                    seperti gaji bersih, pajak penghasilan, zakat, cicilan kredit, dan KPR.
                    Dengan perhitungan cepat dan transparan, kamu bisa membuat keputusan
                    finansial dengan lebih percaya diri.
                </p>
                <p>
                    Semua kalkulator di My Tools bersifat gratis, ringan, dan dibuat
                    berdasarkan ketentuan umum yang berlaku di Indonesia.
                </p>
            </section>

            {/* STRUCTURED DATA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'Kumpulan Kalkulator Finansial',
                        url: 'https://mytools.web.id/kalkulator',
                        isPartOf: {
                            '@type': 'WebSite',
                            name: 'My Tools',
                            url: 'https://mytools.web.id',
                        },
                    }),
                }}
            />
        </section>
    )
}