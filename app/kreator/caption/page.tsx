import CaptionGenerator from '@/components/kreator/CaptionGenerator'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Generator Caption Instagram & TikTok Gratis',
    description:
        'Generator caption Instagram dan TikTok untuk konten kreator. Buat caption menarik dengan gaya santai, profesional, edukatif, atau jualan secara gratis.',
}

export default function CaptionPage() {
    return (
        <section className="space-y-14">
            {/* HEADER */}
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Generator Caption Instagram & TikTok
                </h1>
                <p className="mt-3 text-gray-600">
                    Buat caption secara instan untuk Instagram Reels, TikTok, dan konten
                    jualan. Pilih gaya penulisan, panjang caption, CTA, dan emoji sesuai
                    kebutuhan kontenmu.
                </p>
            </header>

            {/* TOOL */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <CaptionGenerator />
            </div>

            {/* INTERNAL LINK */}
            <div className="text-sm text-gray-600">
                <p>
                    Butuh optimasi konten lainnya? Coba{' '}
                    <Link href="/kreator/hashtag" className="underline text-black">
                        generator hashtag
                    </Link>{' '}
                    atau{' '}
                    <Link href="/kreator/youtube-income" className="underline text-black">
                        kalkulator penghasilan YouTube
                    </Link>
                    .
                </p>
            </div>

            {/* SEO CONTENT */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Cara Membuat Caption yang Menarik
                </h2>

                <p>
                    Caption berperan penting dalam meningkatkan engagement konten di
                    Instagram dan TikTok. Caption yang jelas, relevan, dan memiliki call
                    to action (CTA) yang tepat dapat mendorong audiens untuk berinteraksi
                    melalui like, komentar, atau share.
                </p>

                <p>
                    Generator caption ini dirancang untuk membantu konten kreator
                    menghasilkan ide caption dengan cepat, baik untuk konten hiburan,
                    edukasi, personal branding, maupun promosi produk.
                </p>
            </section>

            {/* FAQ CONTENT */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Pertanyaan yang Sering Diajukan
                </h2>

                <div>
                    <h3 className="font-medium">
                        Apakah caption ini cocok untuk Instagram dan TikTok?
                    </h3>
                    <p className="text-gray-600">
                        Ya. Caption dapat digunakan untuk Instagram Reels, TikTok, maupun
                        postingan feed dengan penyesuaian gaya dan panjang.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Apakah caption bisa langsung dipakai?
                    </h3>
                    <p className="text-gray-600">
                        Bisa. Namun disarankan untuk menyesuaikan sedikit dengan karakter
                        brand atau gaya personal agar lebih natural.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Apakah generator caption ini gratis?
                    </h3>
                    <p className="text-gray-600">
                        Ya. Generator caption di My Tools dapat digunakan gratis tanpa
                        registrasi.
                    </p>
                </div>
            </section>

            {/* SCHEMA: WEB APP */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Generator Caption Instagram & TikTok',
                        applicationCategory: 'SocialMediaApplication',
                        operatingSystem: 'All',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'IDR',
                        },
                        url: 'https://mytools.web.id/kreator/caption',
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
                                name: 'Apakah caption ini cocok untuk Instagram dan TikTok?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Ya. Caption dapat digunakan untuk Instagram Reels, TikTok, maupun postingan feed.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'Apakah caption bisa langsung dipakai?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Bisa. Namun sebaiknya disesuaikan dengan karakter brand atau gaya personal.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'Apakah generator caption ini gratis?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Ya. Generator caption My Tools dapat digunakan gratis tanpa registrasi.',
                                },
                            },
                        ],
                    }),
                }}
            />
        </section>
    )
}