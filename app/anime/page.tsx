import { getAnimeGenres, getAnimeHomePage } from "@/libs/anime/anime";
import HomePageClient from "./HomePage";

export default async function HomePage() {
    const data = await getAnimeHomePage();
    const genres = await getAnimeGenres();

    if (!data) return <div className="text-white text-center py-20">Gagal memuat data...</div>;

    return <HomePageClient initialData={data} genres={genres} />;
}