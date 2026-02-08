import { getAnimeGenres, getAnimeHomePage } from "@/libs/anime/anime";
import HomePageClient from "./HomePage";
import { Metadata } from "next";
import ElegantMaintenancePage from "@/components/common/MaintenancePage";

// app/anime/page.tsx

export const metadata: Metadata = {
    title: 'Nonton Anime Sub Indo Terupdate & Terlengkap | Tamanto',
    description:
        'Streaming anime subtitle Indonesia kualitas HD gratis. Update episode terbaru setiap hari, koleksi Anime Ongoing, Movie, hingga seri klasik terbaik hanya di Tamanto.',
    keywords: [
        'Nonton Anime', 'Anime Sub Indo', 'Streaming Anime HD', 'Anime Ongoing Terbaru',
        'Tamanto Anime', 'Download Anime Sub Indo', 'Nonton Anime Movie'
    ],
    alternates: {
        canonical: 'https://tamanto.web.id/anime',
    },
    openGraph: {
        title: 'Tamanto Anime Hub – Komunitas Nonton Anime Terlengkap',
        description: 'Akses ribuan judul anime dari berbagai genre dengan streaming lancar dan kualitas visual jernih. Kita Nonton, Kita Terhibur!',
        url: 'https://tamanto.web.id/anime',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-anime.jpg', // Opsional: Berikan image bertema anime yang ikonik
                width: 1200,
                height: 630,
                alt: 'Tamanto Anime Universe',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Streaming Anime Sub Indo HD Terbaru',
        description: 'Pantau terus jadwal rilis anime favoritmu setiap hari di Tamanto Anime.',
        images: ['/og-anime.jpg'],
    },
}

export default async function HomePage() {
    const data = await getAnimeHomePage();
    const genres = await getAnimeGenres();
    console.log(data);

    if (!data) return <div className="text-white text-center py-20">Gagal memuat data...</div>;

    return <ElegantMaintenancePage />
    // return <HomePageClient initialData={data} genres={genres} />;
}