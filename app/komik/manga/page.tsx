import ElegantMaintenancePage from "@/components/common/MaintenancePage"
import MangaClientPage from "@/components/komik/manga/MangaClientPage"
import { getKomikGenres, getKomikPopular, getKomikUpdated } from "@/libs/komik/komik"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Baca Manga, Manhwa & Manhua Sub Indo Terlengkap | Tamanto',
    description:
        'Eksplorasi ribuan judul Manga, Manhwa, dan Manhua populer dengan subtitle Indonesia. Update harian, koleksi genre terlengkap dari Action hingga Romance, baca lancar tanpa iklan mengganggu hanya di Tamanto.',
    keywords: [
        'Baca Manga', 'Manhwa Indonesia', 'Manhua Sub Indo', 'Komik Online Gratis',
        'Tamanto Manga', 'Manga Update Hari Ini', 'Baca Komik Berwarna', 'Manhwa CEO'
    ],
    alternates: {
        canonical: 'https://tamanto.web.id/manga',
    },
    openGraph: {
        title: 'Tamanto Manga Explorer – Destinasi Baca Komik Terpopuler',
        description: 'Update harian Manga dan Manhwa terbaru. Pengalaman baca komik digital terbaik dengan kualitas gambar jernih. Kita Baca, Kita Terhibur!',
        url: 'https://tamanto.web.id/manga',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-manga.jpg', // Opsional: Gunakan gambar grid karakter manga/manhwa
                width: 1200,
                height: 630,
                alt: 'Tamanto Manga Explorer Hub',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Baca Manhwa & Manga Sub Indo Update Setiap Hari',
        description: 'Koleksi komik digital terlengkap dari berbagai genre tersedia di Tamanto Manga.',
        images: ['/og-manga.jpg'],
    },
}

export default async function MangaPage() {
    const [resPopular, resLatest, genres] = await Promise.all([
        getKomikPopular("manga"),
        getKomikUpdated("manga"),
        getKomikGenres(),
    ])
    console.log("Genres Manga:", genres);
    console.log("Popular Manga:", resPopular);
    console.log("Latest Manga:", resLatest);
        // return <ElegantMaintenancePage />
    
    return (
        <MangaClientPage
            initialPopular={resPopular || []}
            initialLatest={resLatest || []}
            genreData={genres || []}
        />
    )
}