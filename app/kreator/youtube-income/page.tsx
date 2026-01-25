import YoutubeIncomeCalculator from '@/components/kreator/YoutubeIncomeCalculator'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Kalkulator Penghasilan YouTube Online (RPM & CPM)',
    description:
        'Hitung estimasi penghasilan YouTube berdasarkan views dan RPM/CPM. Cocok untuk YouTuber Indonesia, gratis dan mudah digunakan.',
}

export default function YoutubeIncomePage() {
    return (
        <section className="space-y-12">
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kalkulator Penghasilan YouTube
                </h1>
                <p className="mt-3 text-gray-600">
                    Hitung estimasi pendapatan YouTube berdasarkan views dan RPM/CPM.
                    Cocok untuk kreator yang ingin mengukur potensi pendapatan per video,
                    per minggu, atau per bulan.
                </p>
            </header>

            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <YoutubeIncomeCalculator />
            </div>

            <div className="text-sm text-gray-600">
                <p>
                    Lanjut ke tool lain:{' '}
                    <Link href="/kreator/hashtag" className="underline text-black">
                        generator hashtag
                    </Link>{' '}
                    atau{' '}
                    <Link href="/kreator/caption" className="underline text-black">
                        generator caption
                    </Link>
                    .
                </p>
            </div>

            <section className="max-w-3xl text-sm text-gray-700 space-y-3">
                <h2 className="text-lg font-semibold text-gray-900">Catatan RPM vs CPM</h2>
                <p>
                    <strong>RPM</strong> (Revenue per Mille) adalah estimasi pendapatan yang kamu terima per 1.000 views.
                    <strong> CPM</strong> biasanya lebih tinggi karena biaya iklan per 1.000 impresi, sebelum pembagian.
                    Untuk estimasi yang lebih realistis, pakai RPM.
                </p>
            </section>

            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Pertanyaan yang Sering Diajukan
                </h2>

                <div>
                    <h3 className="font-medium">
                        Apakah kalkulator ini akurat?
                    </h3>
                    <p className="text-gray-600">
                        Hasil perhitungan bersifat estimasi. Pendapatan aktual YouTube
                        dipengaruhi niche konten, lokasi penonton, jenis iklan, dan performa channel.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Berapa RPM YouTube di Indonesia?
                    </h3>
                    <p className="text-gray-600">
                        RPM YouTube di Indonesia bervariasi, umumnya berkisar antara
                        Rp5.000–Rp50.000 per 1.000 views tergantung niche dan audiens.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Apakah CPM sama dengan penghasilan?
                    </h3>
                    <p className="text-gray-600">
                        Tidak. CPM adalah biaya iklan, sedangkan penghasilan kreator
                        dihitung menggunakan RPM setelah pembagian dengan YouTube.
                    </p>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Kalkulator Penghasilan YouTube',
                        applicationCategory: 'FinanceApplication',
                        operatingSystem: 'All',
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
                        url: 'https://mytools.web.id/kreator/youtube-income',
                    }),
                }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'FAQPage',
                        mainEntity: [
                            {
                                '@type': 'Question',
                                name: 'Apakah kalkulator penghasilan YouTube ini akurat?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Hasil perhitungan bersifat estimasi. Pendapatan aktual YouTube dipengaruhi niche konten, lokasi penonton, dan jenis iklan.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'Berapa RPM YouTube di Indonesia?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'RPM YouTube di Indonesia umumnya berkisar antara Rp5.000 hingga Rp50.000 per 1.000 views, tergantung niche dan audiens.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'Apakah CPM sama dengan penghasilan YouTuber?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Tidak. CPM adalah biaya iklan, sedangkan penghasilan kreator dihitung menggunakan RPM setelah pembagian dengan YouTube.',
                                },
                            },
                        ],
                    }),
                }}
            />
        </section>
    )
}