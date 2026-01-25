import type { Metadata } from 'next'
import Link from 'next/link'
import AutoClipper from '@/components/kreator/AutoClipper'

export const metadata: Metadata = {
    title: 'Auto Clipper Video Online | Potong Banyak Klip Sekaligus',
    description:
        'Upload video panjang lalu otomatis dipotong jadi banyak klip. Cocok untuk clipper TikTok, Reels, dan YouTube Shorts. Bisa download satu-satu atau semua (ZIP).',
}

export default function AutoClipperPage() {
    return (
        <section className="space-y-12">
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Auto Clipper Video Online
                </h1>
                <p className="mt-3 text-gray-600">
                    Upload video panjang, lalu tool ini akan otomatis memotong menjadi
                    banyak klip berdasarkan durasi yang kamu tentukan. Hasilnya ditampilkan
                    dalam daftar dan bisa kamu download satu per satu atau download semua
                    sekaligus.
                </p>
            </header>

            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <AutoClipper />
            </div>

            <section className="max-w-3xl space-y-3 text-sm text-gray-700">
                <h2 className="text-lg font-semibold text-gray-900">
                    Cocok untuk Clipper TikTok, Reels, dan Shorts
                </h2>
                <p>
                    Banyak kreator memotong video panjang (podcast, live, vlog) menjadi
                    klip-klip pendek untuk diunggah ke berbagai platform. Auto clipper ini
                    membantu memecah video panjang dengan cepat tanpa perlu editor video.
                </p>
                <p>
                    Tool terkait:{' '}
                    <Link href="/kreator/video-size" className="underline text-black">
                        estimasi ukuran video
                    </Link>{' '}
                    dan{' '}
                    <Link href="/kompress" className="underline text-black">
                        kompres file
                    </Link>
                    .
                </p>
            </section>

            {/* Structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Auto Clipper Video Online',
                        applicationCategory: 'MultimediaApplication',
                        operatingSystem: 'All',
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
                        url: 'https://mytools.web.id/kreator/auto-clipper',
                    }),
                }}
            />
        </section>
    )
}