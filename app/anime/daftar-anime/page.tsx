import AnimeIndexClient from "@/components/anime/AnimeIndexClient"
import { getAnimeList } from "@/libs/anime/anime"
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Daftar Anime Terlengkap A-Z | Tamanto',
    description:
        'Cari anime favoritmu di katalog alfabetis Tamanto. Indeks lengkap anime subtitle Indonesia mulai dari huruf A sampai Z, seri terbaru hingga anime klasik.',
    keywords: [
        'Daftar Anime', 'Katalog Anime', 'Anime A-Z', 'Indeks Anime Sub Indo',
        'Semua Anime Tamanto', 'Cari Anime Terbaru', 'Perpustakaan Anime'
    ],
    alternates: {
        canonical: 'https://tamanto.web.id/anime/list',
    },
    openGraph: {
        title: 'Katalog Anime Terlengkap - Tamanto Universe',
        description: 'Temukan ribuan judul anime dengan mudah melalui indeks alfabetis kami. Kita Nonton, Kita Terhibur!',
        url: 'https://tamanto.web.id/anime/list',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-anime-list.jpg', // Gunakan gambar bertema perpustakaan anime atau grid poster
                width: 1200,
                height: 630,
                alt: 'Katalog Anime A-Z Tamanto',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Cari Anime Favoritmu di Tamanto',
        description: 'Indeks lengkap anime sub Indo, update harian dan koleksi terlengkap.',
        images: ['/og-anime-list.jpg'],
    },
}

export default async function AnimeListPage() {
    const res = await getAnimeList()
    const animeList = res?.data?.anime_list || []

    // ===============================
    // GROUPING BY LETTER
    // ===============================
    const grouped: Record<string, any[]> = {}
    const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

    alphabet.forEach((l) => (grouped[l] = []))

    animeList.forEach((anime: any) => {
        const first = anime.title?.[0]?.toUpperCase() || "#"
        const key = first >= "A" && first <= "Z" ? first : "#"
        grouped[key].push(anime)
    })

    return <AnimeIndexClient grouped={grouped} />
}