import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Konverter File Online Gratis | My Tools',
    description:
        'Konverter file online gratis untuk gambar JPG, PNG, WebP. Konversi langsung di browser tanpa upload ke server, cepat dan aman.',
}

export default function KonverterPage() {
    return (
        <section className="space-y-14">
            {/* HERO */}
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Konverter File Online Gratis
                </h1>
                <p className="mt-3 text-gray-600">
                    My Tools menyediakan berbagai konverter file online yang dapat
                    digunakan langsung di browser. Tidak perlu instal aplikasi dan
                    file tidak dikirim ke server.
                </p>
            </header>

            {/* LIST TOOLS */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold">
                    Daftar Konverter yang Tersedia
                </h2>

                <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
                    <Link
                        href="/konverter/image"
                        className="group bg-white border rounded-xl p-6 hover:shadow-lg transition"
                    >
                        <h3 className="font-semibold text-lg group-hover:underline">
                            🖼 Konverter Gambar
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Konversi gambar JPG, PNG ke WebP atau format lain dengan
                            kualitas optimal langsung di browser.
                        </p>
                        <span className="inline-flex mt-4 text-sm font-medium text-black">
                            Buka konverter →
                        </span>
                    </Link>
                </div>
            </section>

            {/* SEO CONTENT */}
            <section className="max-w-3xl space-y-4 text-sm text-gray-700">
                <h2 className="text-lg font-semibold text-gray-900">
                    Kenapa Menggunakan Konverter File Online?
                </h2>

                <p>
                    Konverter file online membantu pengguna mengubah format file
                    dengan cepat tanpa perlu software tambahan. Tool ini sangat
                    berguna untuk kebutuhan desain, konten media sosial, dan
                    optimasi ukuran file.
                </p>

                <p>
                    Dengan konverter gambar online, kamu dapat mengubah JPG atau PNG
                    menjadi WebP agar ukuran file lebih kecil tanpa mengurangi
                    kualitas secara signifikan. Semua proses dilakukan di browser
                    sehingga lebih aman dan privat.
                </p>
            </section>

            {/* INTERNAL LINKING */}
            <p className="text-sm text-gray-600">
                Butuh mengecilkan ukuran file? Gunakan{' '}
                <Link href="/kompress" className="underline text-black">
                    tools kompres file
                </Link>{' '}
                di My Tools.
            </p>

            {/* STRUCTURED DATA */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'CollectionPage',
                        name: 'Konverter File Online',
                        description:
                            'Kumpulan konverter file online gratis untuk gambar dan format lainnya.',
                        url: 'https://mytools.web.id/konverter',
                        isPartOf: {
                            '@type': 'WebSite',
                            name: 'My Tools',
                            url: 'https://mytools.web.id',
                        },
                        hasPart: [
                            {
                                '@type': 'SoftwareApplication',
                                name: 'Konverter Gambar',
                                applicationCategory: 'MultimediaApplication',
                                operatingSystem: 'All',
                                url: 'https://mytools.web.id/konverter/image',
                                offers: {
                                    '@type': 'Offer',
                                    price: '0',
                                    priceCurrency: 'IDR',
                                },
                            },
                        ],
                    }),
                }}
            />
        </section>
    )
}