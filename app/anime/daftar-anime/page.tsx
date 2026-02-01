import AnimeIndexClient from "@/components/anime/AnimeIndexClient"
import { getAnimeList } from "@/libs/anime/anime"

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