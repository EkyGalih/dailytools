import HashtagGenerator from '@/components/kreator/HashTagGenerator'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Generator Hashtag Konten Kreator (Instagram, TikTok, Facebook)',
    description:
        'Generator hashtag untuk konten kreator Instagram, TikTok, Facebook Reels, dan YouTube Shorts. Buat hashtag relevan berdasarkan topik konten secara gratis.',
}

export default function HashtagPage() {
    return (
        <section className="space-y-12">
            {/* HEADER */}
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Generator Hashtag Konten Kreator
                </h1>
                <p className="mt-3 text-gray-600">
                    Buat hashtag relevan dan siap pakai untuk{' '}
                    <strong>Instagram Reels</strong>, <strong>TikTok</strong>,{' '}
                    <strong>Facebook Reels</strong>, dan <strong>YouTube Shorts</strong>{' '}
                    berdasarkan topik konten kamu.
                </p>
            </header>

            {/* TOOL */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <HashtagGenerator />
            </div>

            {/* INTERNAL LINK */}
            <p className="text-sm text-gray-600">
                Ingin lengkapi caption postingan?
                <Link href="/kreator/caption" className="underline text-black ml-1">
                    Generator caption konten kreator
                </Link>
            </p>

            {/* SEO CONTENT */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Kenapa Hashtag Penting untuk Konten Kreator?
                </h2>

                <p>
                    Hashtag membantu algoritma platform memahami topik konten kamu.
                    Dengan hashtag yang relevan, peluang konten muncul di halaman
                    rekomendasi seperti <em>Explore</em>, <em>FYP</em>, atau <em>Reels</em>
                    menjadi lebih besar.
                </p>

                <p>
                    Generator hashtag ini dirancang khusus untuk konten kreator Indonesia
                    agar hasilnya tetap relevan, tidak terlalu generik, dan bisa langsung
                    digunakan tanpa perlu riset manual.
                </p>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Pertanyaan yang Sering Diajukan
                </h2>

                <div>
                    <h3 className="font-medium">
                        Apakah generator hashtag ini gratis?
                    </h3>
                    <p className="text-gray-600">
                        Ya. Semua tools di MyTools dapat digunakan gratis tanpa registrasi.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Berapa jumlah hashtag yang ideal?
                    </h3>
                    <p className="text-gray-600">
                        Instagram: 5–15 hashtag. TikTok: 3–7 hashtag. Facebook Reels: 3–5 hashtag.
                        Gunakan yang relevan, bukan sebanyak-banyaknya.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Apakah hashtag bisa menjamin konten viral?
                    </h3>
                    <p className="text-gray-600">
                        Tidak ada jaminan viral. Hashtag membantu distribusi, namun kualitas konten,
                        hook awal, dan engagement tetap faktor utama.
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
                        name: 'Generator Hashtag Konten Kreator',
                        applicationCategory: 'SocialMediaApplication',
                        operatingSystem: 'All',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'IDR',
                        },
                        url: 'https://mytools.web.id/kreator/hashtag',
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
                                name: 'Apakah generator hashtag ini gratis?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Ya. Generator hashtag MyTools dapat digunakan gratis tanpa registrasi.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'Berapa jumlah hashtag yang ideal untuk Instagram dan TikTok?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Instagram idealnya 5–15 hashtag, TikTok 3–7 hashtag, dan Facebook Reels 3–5 hashtag.',
                                },
                            },
                            {
                                '@type': 'Question',
                                name: 'Apakah hashtag bisa menjamin konten viral?',
                                acceptedAnswer: {
                                    '@type': 'Answer',
                                    text:
                                        'Tidak. Hashtag membantu distribusi konten, namun viral tetap dipengaruhi kualitas konten dan engagement.',
                                },
                            },
                        ],
                    }),
                }}
            />
        </section>
    )
}