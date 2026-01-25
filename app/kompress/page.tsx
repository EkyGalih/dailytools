import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Kompres File Online Gratis | My Tools',
    description:
        'Kompres file online gratis untuk gambar dan PDF. Perkecil ukuran file langsung di browser tanpa upload ke server.',
}

export default function KompressPage() {
    return (
        <section className="space-y-14">
            {/* HERO */}
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Kompres File Online Gratis
                </h1>
                <p className="mt-3 text-gray-600">
                    My Tools menyediakan berbagai tools kompres file online untuk
                    membantu memperkecil ukuran gambar dan dokumen PDF secara cepat,
                    aman, dan tanpa instalasi aplikasi tambahan.
                </p>
            </header>

            {/* LIST TOOLS */}
            <section className="space-y-6">
                <h2 className="text-xl font-semibold">
                    Daftar Tools Kompres File
                </h2>

                <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
                    <Link
                        href="/kompress/gambar"
                        className="group bg-white border rounded-xl p-6 hover:shadow-lg transition"
                    >
                        <h3 className="font-semibold text-lg group-hover:underline">
                            🖼 Kompres Gambar
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Kompres gambar JPG, PNG, dan WebP ke ukuran target seperti
                            1 MB, 2 MB, atau 5 MB dengan kualitas tetap optimal.
                        </p>
                        <span className="inline-flex mt-4 text-sm font-medium text-black">
                            Buka tool →
                        </span>
                    </Link>

                    <Link
                        href="/kompress/pdf"
                        className="group bg-white border rounded-xl p-6 hover:shadow-lg transition"
                    >
                        <h3 className="font-semibold text-lg group-hover:underline">
                            📄 Kompres PDF
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Perkecil ukuran file PDF untuk keperluan upload dokumen,
                            formulir administrasi, dan arsip digital.
                        </p>
                        <span className="inline-flex mt-4 text-sm font-medium text-black">
                            Buka tool →
                        </span>
                    </Link>
                </div>
            </section>

            {/* SEO CONTENT */}
            <section className="max-w-3xl space-y-4 text-sm text-gray-700">
                <h2 className="text-lg font-semibold text-gray-900">
                    Kenapa Perlu Mengompres File?
                </h2>

                <p>
                    Kompres file sangat penting untuk mengurangi ukuran dokumen dan
                    media tanpa harus mengorbankan kualitas secara signifikan.
                    File yang lebih kecil akan lebih cepat diunggah, mudah dibagikan,
                    dan tidak melampaui batas ukuran platform.
                </p>

                <p>
                    Dengan tools kompres online dari My Tools, semua proses dilakukan
                    langsung di browser. File kamu tidak disimpan atau dikirim ke
                    server, sehingga lebih aman dan menjaga privasi.
                </p>
            </section>

            {/* INTERNAL LINKING */}
            <p className="text-sm text-gray-600">
                Ingin mengubah format file? Gunakan{' '}
                <Link href="/konverter" className="underline text-black">
                    konverter file online
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
                        name: 'Kompres File Online',
                        description:
                            'Kumpulan tools kompres file online gratis untuk gambar dan PDF.',
                        url: 'https://mytools.web.id/kompress',
                        isPartOf: {
                            '@type': 'WebSite',
                            name: 'My Tools',
                            url: 'https://mytools.web.id',
                        },
                        hasPart: [
                            {
                                '@type': 'SoftwareApplication',
                                name: 'Kompres Gambar',
                                applicationCategory: 'MultimediaApplication',
                                operatingSystem: 'All',
                                url: 'https://mytools.web.id/kompress/gambar',
                                offers: {
                                    '@type': 'Offer',
                                    price: '0',
                                    priceCurrency: 'IDR',
                                },
                            },
                            {
                                '@type': 'SoftwareApplication',
                                name: 'Kompres PDF',
                                applicationCategory: 'UtilityApplication',
                                operatingSystem: 'All',
                                url: 'https://mytools.web.id/kompress/pdf',
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