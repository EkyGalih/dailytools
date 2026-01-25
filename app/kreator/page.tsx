import type { Metadata } from 'next'
import CreatorToolsGrid from '@/components/kreator/CreatorToolsGrid'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Tools Konten Kreator – My Tools',
    description:
        'Tools gratis untuk konten kreator: kalkulator penghasilan YouTube, generator hashtag, generator caption, dan estimasi ukuran video.',
}

export default function CreatorHubPage() {
    return (
        <section className="space-y-12">
            {/* HERO */}
            <header className="bg-white border rounded-2xl p-8">
                <h1 className="text-3xl font-bold tracking-tight">
                    Tools untuk Konten Kreator
                </h1>
                <p className="mt-3 text-gray-600 max-w-3xl">
                    Kumpulan tools online gratis untuk membantu konten kreator
                    meningkatkan performa konten, mulai dari estimasi penghasilan
                    YouTube, riset hashtag, pembuatan caption, hingga perhitungan
                    ukuran video sebelum upload.
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
                    Kenapa Konten Kreator Membutuhkan Tools Ini?
                </h2>

                <p>
                    Dalam dunia konten digital, kreator dituntut untuk membuat
                    keputusan cepat dan berbasis data. Tools seperti{' '}
                    <Link
                        href="/kreator/youtube-income"
                        className="underline text-black"
                    >
                        kalkulator penghasilan YouTube
                    </Link>{' '}
                    membantu memperkirakan potensi pendapatan, sementara{' '}
                    <Link
                        href="/kreator/hashtag"
                        className="underline text-black"
                    >
                        generator hashtag
                    </Link>{' '}
                    mempermudah menjangkau audiens yang lebih luas.
                </p>

                <p>
                    Selain itu, caption yang menarik dan ukuran video yang optimal
                    sangat berpengaruh pada performa konten. Karena itu, My Tools
                    menyediakan{' '}
                    <Link
                        href="/kreator/caption"
                        className="underline text-black"
                    >
                        generator caption
                    </Link>{' '}
                    dan{' '}
                    <Link
                        href="/kreator/video-size"
                        className="underline text-black"
                    >
                        estimasi ukuran video
                    </Link>{' '}
                    agar workflow kreator menjadi lebih efisien.
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
                            'Kumpulan tools online gratis untuk membantu konten kreator.',
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