import ElegantMaintenancePage from "@/components/common/MaintenancePage"
import ManhuaClientPage from "@/components/komik/manhua/ManhuaClientPage"
import { getKomikGenres, getKomikRecomended, getKomikUpdated } from "@/libs/komik/komik"


export const metadata = {
    title: "Manhua Explorer – Baca Manhua Sub Indo Terlengkap | Tamanto",
    description: "Jelajahi koleksi Manhua (Komik China) subtitle Indonesia terbaru dan terpopuler. Dari genre Kultivasi hingga Action, semua ada di Tamanto.",
    keywords: [
        'Manhua Sub Indo', 'Baca Manhua China', 'Manhua Terpopuler',
        'Komik Kultivasi', 'Tamanto Manhua', 'Manhua Online HD'
    ],
    alternates: {
        canonical: 'https://tamanto.web.id/komik/manhua',
    },
    openGraph: {
        title: 'Manhua Explorer - Koleksi Komik China Terbaik | Tamanto',
        description: 'Temukan rekomendasi Manhua terbaik dengan update setiap hari hanya di Tamanto.',
        url: 'https://tamanto.web.id/komik/manhua',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-manhua.jpg',
                width: 1200,
                height: 630,
                alt: 'Eksplorasi Manhua Tamanto',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Baca Manhua Sub Indo Update Setiap Hari',
        description: 'Jelajahi ribuan judul Manhua seru dalam satu genggaman di Tamanto.',
        images: ['/og-manhua.jpg'],
    },
}

export default async function MangaPage() {
    const [genres, resPopular, resLatest] = await Promise.all([
        getKomikGenres(),
        getKomikRecomended("manhua"),
        getKomikUpdated("manhua"),
    ])

    return (
        <ManhuaClientPage
            initialGenres={genres || []}
            initialPopular={resPopular || []}
            initialLatest={resLatest || []}
        />
    )
}