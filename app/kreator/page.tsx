import type { Metadata } from 'next'
import CreatorToolsGrid from '@/components/kreator/CreatorToolsGrid'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Tools Konten Kreator Online Gratis (YouTube, TikTok, Instagram, Facebook)',
    description:
        'Kumpulan tools gratis untuk konten kreator multi platform: kalkulator penghasilan kreator, generator hashtag, generator caption, estimasi ukuran video, dan tools pendukung lainnya.',
}

export default function CreatorHubPage() {
    return (
        <section className="space-y-14">
            {/* HERO */}
            <header className="bg-white border rounded-2xl p-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Tools untuk Konten Kreator
                </h1>
                <p className="mt-3 text-gray-600 max-w-3xl">
                    Kumpulan tools online gratis untuk konten kreator di berbagai platform
                    seperti YouTube, TikTok, Instagram, dan Facebook. Dirancang untuk membantu
                    kreator mengoptimalkan performa konten, meningkatkan engagement, dan
                    mengambil keputusan berbasis data.
                </p>
            </header>

            {/* TOOLS GRID */}
            <section aria-labelledby="creator-tools">
                <h2 id="creator-tools" className="sr-only">
                    Daftar Tools Konten Kreator
                </h2>
                <CreatorToolsGrid />
            </section>

            {/* SEO CONTENT */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Tools Konten Kreator Multi Platform
                </h2>

                <p>
                    Menjadi konten kreator saat ini tidak hanya soal konsistensi upload,
                    tetapi juga soal strategi. Kreator perlu memahami potensi penghasilan,
                    memilih hashtag yang tepat, menulis caption yang menarik, serta memastikan
                    ukuran video sesuai dengan standar platform.
                </p>

                <p>
                    My Tools menyediakan berbagai alat bantu seperti{' '}
                    <Link
                        href="/kreator/income"
                        className="underline text-black"
                    >
                        kalkulator penghasilan konten kreator
                    </Link>
                    ,{' '}
                    <Link
                        href="/kreator/hashtag"
                        className="underline text-black"
                    >
                        generator hashtag multi platform
                    </Link>
                    ,{' '}
                    <Link
                        href="/kreator/caption"
                        className="underline text-black"
                    >
                        generator caption
                    </Link>
                    , serta{' '}
                    <Link
                        href="/kreator/video-size"
                        className="underline text-black"
                    >
                        estimasi ukuran video
                    </Link>{' '}
                    yang dapat digunakan langsung tanpa registrasi.
                </p>

                <p>
                    Semua tools dirancang ringan, mobile-friendly, dan dapat digunakan oleh
                    kreator pemula maupun profesional untuk mempercepat workflow pembuatan
                    konten.
                </p>
            </section>

            {/* SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'Tools Konten Kreator',
                        description:
                            'Kumpulan tools online gratis untuk konten kreator multi platform.',
                        url: 'https://mytools.web.id/kreator',
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