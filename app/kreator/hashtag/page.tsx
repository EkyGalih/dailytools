import HashtagGenerator from '@/components/kreator/HashTagGenerator'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Generator Hashtag Instagram & TikTok Gratis',
    description:
        'Generator hashtag Instagram dan TikTok untuk konten kreator. Buat hashtag relevan sesuai topik, cepat, gratis, dan mudah digunakan.',
}

export default function HashtagPage() {
    return (
        <section className="space-y-12">
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Generator Hashtag
                </h1>
                <p className="mt-3 text-gray-600">
                    Masukkan topik konten, pilih platform, lalu dapatkan hashtag yang relevan.
                    Kamu bisa copy hasilnya sekali klik.
                </p>
            </header>

            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <HashtagGenerator />
            </div>

            <div className="text-sm text-gray-600">
                <p>
                    Butuh ide caption?{' '}
                    <Link href="/kreator/caption" className="underline text-black">
                        Generator caption
                    </Link>
                    .
                </p>
            </div>

            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Cara Menggunakan Generator Hashtag
                </h2>

                <p>
                    Hashtag membantu konten kamu lebih mudah ditemukan di Instagram dan TikTok.
                    Dengan menggunakan hashtag yang relevan sesuai topik, peluang menjangkau
                    audiens yang tepat akan lebih besar.
                </p>

                <p>
                    Generator hashtag ini dirancang untuk konten kreator Indonesia. Kamu cukup
                    memasukkan topik konten, memilih platform, lalu menyalin hashtag yang
                    dihasilkan dan langsung digunakan pada caption.
                </p>
            </section>

            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Pertanyaan yang Sering Diajukan
                </h2>

                <div>
                    <h3 className="font-medium">
                        Apakah hashtag ini cocok untuk Instagram dan TikTok?
                    </h3>
                    <p className="text-gray-600">
                        Ya. Hashtag disesuaikan agar relevan untuk Instagram Reels maupun TikTok.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Berapa jumlah hashtag yang ideal?
                    </h3>
                    <p className="text-gray-600">
                        Untuk Instagram biasanya 5–15 hashtag, sedangkan TikTok cukup 3–5 hashtag
                        yang relevan.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Apakah hashtag ini menjamin viral?
                    </h3>
                    <p className="text-gray-600">
                        Tidak ada jaminan viral. Hashtag membantu distribusi, namun kualitas konten
                        dan engagement tetap faktor utama.
                    </p>
                </div>
            </section>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Generator Hashtag Instagram & TikTok',
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
        </section>
    )
}