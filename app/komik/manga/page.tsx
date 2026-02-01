import MangaClientPage from "@/components/komik/manga/MangaClientPage"
import { getKomikLatest, getKomikPopular, getKomikRecommended } from "@/libs/komik/komik"


export const metadata = {
    title: "Manga Explorer - Baca Manga Terlengkap",
    description: "Daftar manga rekomendasi dan update terbaru hari ini.",
}

export default async function MangaPage() {
    const [res, resPopular, resLatest] = await Promise.all([
        getKomikRecommended("manga"),
        getKomikPopular(),
        getKomikLatest()
    ])

    return (
        <MangaClientPage
            initialRecommended={res || []}
            initialPopular={resPopular || []}
            initialLatest={resLatest || []}
        />
    )
}