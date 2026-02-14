
import ElegantMaintenancePage from "@/components/common/MaintenancePage"
import ManhwaClientPage from "@/components/komik/manhwa/ManhwaClientPage"
import { getKomikRecomended, getKomikUpdated } from "@/libs/komik/komik"

export const metadata = {
    title: "Manhwa Explorer – Baca Manhwa Sub Indo Terlengkap | Tamanto",
    description: "Temukan koleksi Manhwa (Komik Korea) subtitle Indonesia terbaru yang sedang viral dan paling banyak dibaca. Update chapter harian hanya di Tamanto.",
    keywords: [
        'Manhwa Sub Indo', 'Baca Manhwa Korea', 'Manhwa Terpopuler',
        'Manhwa Viral', 'Tamanto Manhwa', 'Komik Korea Online'
    ],
    alternates: {
        canonical: 'https://tamanto.web.id/komik/manhwa',
    },
    openGraph: {
        title: 'Manhwa Explorer - Database Komik Korea Terlengkap | Tamanto',
        description: 'Streaming literasi visual Manhwa terbaik dengan pengalaman baca modern di Tamanto.',
        url: 'https://tamanto.web.id/komik/manhwa',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-manhwa.jpg',
                width: 1200,
                height: 630,
                alt: 'Katalog Manhwa Tamanto',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Baca Manhwa Korea Sub Indo Update Setiap Hari',
        description: 'Jelajahi ribuan judul Manhwa viral dalam satu genggaman di Tamanto.',
        images: ['/og-manhwa.jpg'],
    },
}

export default async function ManhwaPage() {
    const [resPopular, resLatest] = await Promise.all([
        getKomikRecomended("manhua"),
        getKomikUpdated(),
    ])

    // return <ElegantMaintenancePage />

    return (
        <ManhwaClientPage
             initialPopular={resPopular || []}
            initialLatest={resLatest || []}
        />
    )
}