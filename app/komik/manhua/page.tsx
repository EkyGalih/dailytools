import ManhuaClientPage from "@/components/komik/manhua/ManhuaClientPage"
import { getKomikLatest, getKomikPopular, getKomikRecommended } from "@/libs/komik/komik"


export const metadata = {
    title: "Manhua Explorer - Baca Manhua Terbaik",
    description: "Temukan manhua terbaru, terpopuler, dan rekomendasi terbaik hari ini.",
}

export default async function MangaPage() {
    const [res, resPopular, resLatest] = await Promise.all([
        getKomikRecommended("manhua"),
        getKomikPopular(),
        getKomikLatest()
    ])

    return (
        <ManhuaClientPage
            initialRecommended={res || []}
            initialPopular={resPopular || []}
            initialLatest={resLatest || []}
        />
    )
}