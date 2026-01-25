import CaptionGenerator from '@/components/kreator/CaptionGenerator'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Generator Caption Konten Kreator (Instagram, TikTok, Facebook)',
    description:
        'Generator caption untuk konten kreator Instagram, TikTok, Facebook Reels, dan YouTube Shorts. Buat caption menarik dengan berbagai gaya dan CTA secara gratis.',
}

export default function CaptionPage() {
    return (
        <section className="space-y-14">
            {/* HEADER */}
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Generator Caption Konten Kreator
                </h1>
                <p className="mt-3 text-gray-600">
                    Buat caption otomatis untuk{' '}
                    <strong>Instagram Reels</strong>, <strong>TikTok</strong>,{' '}
                    <strong>Facebook Reels</strong>, dan <strong>YouTube Shorts</strong>.
                    Pilih platform, gaya bahasa, CTA, dan emoji sesuai kebutuhan kontenmu.
                </p>
            </header>

            {/* TOOL */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm">
                <CaptionGenerator />
            </div>

            {/* INTERNAL LINK */}
            <p className="text-sm text-gray-600">
                Optimalkan jangkauan konten dengan{' '}
                <Link href="/kreator/hashtag" className="underline text-black">
                    generator hashtag
                </Link>{' '}
                atau hitung potensi cuan pakai{' '}
                <Link href="/kreator/creator-income" className="underline text-black">
                    kalkulator penghasilan kreator
                </Link>.
            </p>

            {/* SEO CONTENT */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Kenapa Caption Penting untuk Konten Kreator?
                </h2>

                <p>
                    Caption membantu algoritma platform memahami konteks konten sekaligus
                    mendorong audiens untuk berinteraksi. Caption yang baik biasanya memiliki
                    <strong> hook awal</strong>, isi yang relevan, dan
                    <strong> call to action (CTA)</strong>.
                </p>

                <p>
                    Generator caption ini dirancang untuk kreator Indonesia agar bisa
                    menghasilkan caption cepat, variatif, dan siap pakai tanpa perlu AI berbayar.
                </p>
            </section>

            {/* FAQ */}
            <section className="max-w-3xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Pertanyaan yang Sering Diajukan
                </h2>

                <div>
                    <h3 className="font-medium">
                        Apakah caption bisa langsung dipakai?
                    </h3>
                    <p className="text-gray-600">
                        Bisa. Namun disarankan menyesuaikan sedikit dengan gaya personal atau brand.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Apakah cocok untuk semua platform?
                    </h3>
                    <p className="text-gray-600">
                        Ya. Caption disesuaikan dengan karakter Instagram, TikTok, Facebook Reels,
                        dan YouTube Shorts.
                    </p>
                </div>

                <div>
                    <h3 className="font-medium">
                        Apakah generator caption ini gratis?
                    </h3>
                    <p className="text-gray-600">
                        Ya. Semua tools MyTools bisa digunakan gratis tanpa login.
                    </p>
                </div>
            </section>

            {/* SCHEMA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Generator Caption Konten Kreator',
                        applicationCategory: 'SocialMediaApplication',
                        operatingSystem: 'All',
                        offers: { '@type': 'Offer', price: '0', priceCurrency: 'IDR' },
                        url: 'https://mytools.web.id/kreator/caption',
                    }),
                }}
            />
        </section>
    )
}