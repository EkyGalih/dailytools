import CreatorIncomeCalculator from '@/components/kreator/CreatorIncomeCalculator'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title:
        'Kalkulator Penghasilan Konten Kreator (YouTube, Facebook, TikTok, Instagram)',
    description:
        'Hitung estimasi penghasilan konten kreator dari YouTube, Facebook Reels, Instagram Reels, dan TikTok berdasarkan jumlah views dan RPM.',
}

export default function CreatorIncomePage() {
    return (
        <section className="space-y-14">
            {/* HEADER */}
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator Penghasilan Konten Kreator
                </h1>
                <p className="mt-3 text-gray-600">
                    Hitung estimasi pendapatan kreator dari berbagai platform seperti
                    <strong> YouTube</strong>, <strong>Facebook Reels</strong>,
                    <strong> Instagram Reels</strong>, dan <strong>TikTok</strong>.
                    Cukup masukkan jumlah views dan RPM untuk mengetahui potensi
                    penghasilan per video, mingguan, atau bulanan.
                </p>
            </header>

            {/* CALCULATOR */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <CreatorIncomeCalculator />
            </div>

            {/* INTERNAL LINKS */}
            <div className="text-sm text-gray-600">
                <p>
                    Tools kreator lainnya:{' '}
                    <Link href="/kreator/hashtag" className="underline text-black">
                        generator hashtag
                    </Link>
                    ,{' '}
                    <Link href="/kreator/caption" className="underline text-black">
                        generator caption
                    </Link>
                    , atau{' '}
                    <Link href="/kreator/video-size" className="underline text-black">
                        estimasi ukuran video
                    </Link>
                    .
                </p>
            </div>

            {/* SEO CONTENT */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Cara Menghitung Penghasilan Konten Kreator
                </h2>

                <p>
                    Penghasilan konten kreator umumnya dihitung berdasarkan jumlah views
                    dan nilai <strong>RPM (Revenue per Mille)</strong>, yaitu pendapatan
                    bersih per 1.000 views. Setiap platform memiliki karakteristik RPM
                    yang berbeda, tergantung jenis konten, lokasi audiens, dan metode
                    monetisasi.
                </p>

                <p>
                    Kalkulator ini memberikan estimasi sederhana untuk membantu kreator
                    membandingkan potensi pendapatan antar platform sebelum fokus
                    produksi konten.
                </p>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Pertanyaan yang Sering Diajukan
                </h2>

                <div>
                    <h3 className="font-medium">
                        Apakah kalkulator ini akurat?
                    </h3>
                    <p className="text-gray-600">
                        Hasil perhitungan bersifat estimasi. Penghasilan aktual dapat
                        berbeda tergantung niche konten, negara penonton, format iklan,
                        dan kebijakan platform.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Platform mana yang paling besar penghasilannya?
                    </h3>
                    <p className="text-gray-600">
                        YouTube umumnya memiliki RPM tertinggi untuk konten long-form,
                        sementara TikTok dan Instagram lebih sering mengandalkan sponsor
                        dan brand deal.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Apa beda RPM dan CPM?
                    </h3>
                    <p className="text-gray-600">
                        CPM adalah biaya iklan per 1.000 impresi, sedangkan RPM adalah
                        pendapatan bersih yang diterima kreator setelah pembagian.
                    </p>
                </div>
            </section>

            {/* SCHEMA: APP */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Kalkulator Penghasilan Konten Kreator',
                        applicationCategory: 'FinanceApplication',
                        operatingSystem: 'All',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'IDR',
                        },
                        url: 'https://mytools.web.id/kreator/income',
                    }),
                }}
            />

            {/* SCHEMA: FAQ */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name:
                                    'Apakah kalkulator penghasilan kreator ini akurat?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Kalkulator ini memberikan estimasi. Penghasilan aktual tergantung niche, audiens, dan kebijakan platform.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name:
                                    'Apakah kalkulator ini bisa untuk TikTok dan Instagram?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Ya. Kalkulator ini mendukung YouTube, Facebook Reels, Instagram Reels, dan TikTok.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name:
                                    'Apa perbedaan RPM dan CPM?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'RPM adalah pendapatan bersih kreator per 1.000 views, sedangkan CPM adalah biaya iklan sebelum pembagian.',
                                },
                            },
                        ],
                    }),
                }}
            />
        </section>
    )
}