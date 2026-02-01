
import ManhwaClientPage from "@/components/komik/manhwa/ManhwaClientPage"
import { getKomikLatest, getKomikPopular, getKomikRecommended } from "@/libs/komik/komik"


export const metadata = {
    title: "Manhwa - Baca Manhwa Terlengkap",
    description: "Temukan manhwa yang sedang viral, paling banyak dibaca, dan paling dicari."
}

export default async function ManhwaPage() {
    const [res, resPopular, resLatest] = await Promise.all([
        getKomikRecommended("manhwa"),
        getKomikPopular(),
        getKomikLatest("project")
    ])

    return (
        <ManhwaClientPage
            initialRecommended={res || []}
            initialPopular={resPopular || []}
            initialLatest={resLatest || []}
        />
    )
}