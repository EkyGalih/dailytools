import ElegantMaintenancePage from "@/components/common/MaintenancePage"
import MangaClientPage from "@/components/komik/manga/MangaClientPage"
import { getKomikPopular, getKomikRecomended, getKomikUpdated, searchKomik } from "@/libs/komik/komik"
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
        description: 'Masuki dunia tanpa batas, tempat setiap halaman membuka petualangan baru, dari isekai epik hingga romansa yang menyentuh jiwa!',
        url: 'https://tamanto.web.id/manga',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-manga.jpg',
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
        description: 'Masuki dunia tanpa batas, tempat setiap halaman membuka petualangan baru, dari isekai epik hingga romansa yang menyentuh jiwa.',
        images: ['/og-manga.jpg'],
    },
}

export default async function MangaPage({
    searchParams,
}: {
    searchParams: Promise<{ q?: string }>
}) {
    const resolvedSearchParams = await searchParams
    const query = resolvedSearchParams?.q || ""

    const [
        resPopularManga,
        resPopularManhwa,
        resPopularManhua,
        resLatest,
        resLatestMirror,
        resPopularKomik,
        resSearch
    ] = await Promise.all([
        getKomikRecomended("manga"),
        getKomikRecomended("manhwa"),
        getKomikRecomended("manhua"),
        getKomikUpdated("project"),
        getKomikUpdated("mirror"),
        getKomikPopular(1),
        query ? searchKomik(query) : []
    ])

    return (
        <MangaClientPage
            initialSearchQuery={query}
            initialSearchResults={resSearch || []}
            initialPopularManga={resPopularManga || []}
            initialPopulaManhwa={resPopularManhwa || []}
            initialPopulaManhua={resPopularManhua || []}
            initialLatest={resLatest || []}
            initialLatestMirror={resLatestMirror || []}
            initialPopularKomik={resPopularKomik?.data || []}
            initialPopularMeta={resPopularKomik?.meta || null}
        />
    )
}