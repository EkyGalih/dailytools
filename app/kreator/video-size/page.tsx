import VideoSizeEstimator from '@/components/kreator/VideoSizeEstimator'
import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
    title: 'Estimasi Ukuran Video Online – TikTok, Reels & YouTube',
    description:
        'Perkirakan ukuran file video berdasarkan durasi dan bitrate. Cocok untuk upload TikTok, Instagram Reels, dan YouTube tanpa kena batas ukuran.',
}

export default function VideoSizePage() {
    return (
        <section className="space-y-14">
            {/* ================= HEADER ================= */}
            <header className="max-w-3xl">
                <h1 className="text-3xl font-bold tracking-tight">
                    Estimasi Ukuran Video Online
                </h1>
                <p className="mt-3 text-gray-600">
                    Tool gratis untuk memperkirakan ukuran file video berdasarkan durasi
                    dan bitrate. Membantu konten kreator menyiapkan video sebelum upload
                    ke TikTok, Instagram Reels, atau YouTube.
                </p>
            </header>

            {/* ================= TOOL ================= */}
            <div className="bg-white border rounded-2xl p-6 shadow-sm max-w-3xl">
                <VideoSizeEstimator />
            </div>

            {/* ================= INTERNAL LINK ================= */}
            <p className="text-sm text-gray-600 max-w-3xl">
                Setelah mengetahui ukuran video, kamu bisa mengecilkan file visual
                menggunakan{' '}
                <Link href="/kompress/gambar" className="underline text-black">
                    kompres gambar
                </Link>{' '}
                atau tools lainnya di My Tools.
            </p>

            {/* ================= SEO CONTENT ================= */}
            <section className="max-w-3xl space-y-6 text-sm text-gray-700">
                <h2 className="text-xl font-semibold text-gray-900">
                    Cara Menghitung Ukuran File Video
                </h2>

                <p>
                    Ukuran file video ditentukan oleh beberapa faktor utama, seperti durasi
                    video, bitrate (kbps atau Mbps), resolusi, serta codec yang digunakan.
                    Dengan mengetahui bitrate dan durasi, kamu bisa memperkirakan ukuran
                    akhir file video sebelum proses render atau upload.
                </p>

                <p>
                    Tool estimasi ukuran video ini menggunakan rumus sederhana berbasis
                    bitrate rata-rata. Hasilnya membantu kreator menghindari gagal upload
                    akibat batas ukuran file di platform seperti TikTok, Instagram Reels,
                    dan YouTube.
                </p>

                <h3 className="font-semibold">
                    Kenapa Estimasi Ukuran Video Itu Penting?
                </h3>

                <ul className="list-disc pl-5 space-y-2">
                    <li>Mencegah video ditolak karena melebihi batas ukuran</li>
                    <li>Membantu menentukan bitrate optimal sebelum render</li>
                    <li>Menghemat waktu kompresi dan upload</li>
                    <li>Cocok untuk workflow konten kreator dan editor video</li>
                </ul>

                <p className="text-xs text-gray-500">
                    Catatan: Hasil perhitungan bersifat estimasi. Ukuran akhir dapat
                    berbeda tergantung codec, audio bitrate, dan pengaturan ekspor video.
                </p>
            </section>

            {/* ================= STRUCTURED DATA ================= */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify({
                        '@context': 'https://schema.org',
                        '@type': 'WebApplication',
                        name: 'Estimasi Ukuran Video',
                        applicationCategory: 'VideoApplication',
                        operatingSystem: 'All',
                        offers: {
                            '@type': 'Offer',
                            price: '0',
                            priceCurrency: 'IDR',
                        },
                        url: 'https://mytools.web.id/kreator/video-size',
                    }),
                }}
            />
        </section>
    )
}