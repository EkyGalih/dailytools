import GenreCard from "@/components/komik/manga/GenreCard"
import GenreSideList from "@/components/komik/manga/GenreSideList"
import MangaHero from "@/components/komik/manga/MangaHero"
import { getKomikGenres, getKomikGenresDetail } from "@/libs/komik/komik"

export default async function GenreDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const genreData = await getKomikGenresDetail(slug, "manga")
    const genres = await getKomikGenres()

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 px-6 lg:px-20 py-20">
            {/* Header Section dengan Efek Gradient Maskulin */}
            <MangaHero
                title="Genre"
                highlight={`${slug.replace(/-/g, ' ')}`}
                desc={`Temukan manga berdasarkan genre ${slug.replace(/-/g, ' ')} dengan koleksi lengkap dan terbaru.`}
            />
            <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">

                {/* Grid Genre */}
                <div className="space-y-12">
                    <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-8">
                        {genreData.map((genre: any) => (
                            <GenreCard key={genre.endpoint} genre={genre} />
                        ))}
                    </div>
                </div>

                <div className="hidden lg:block">
                    <GenreSideList genres={genres} currentGenre={slug} />
                </div>
            </div>
        </main>
    )
}