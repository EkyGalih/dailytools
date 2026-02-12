import ManhuaGenreCard from "@/components/komik/manhua/ManhuaGenreCard"
import ManhuaGenreSideList from "@/components/komik/manhua/ManhuaGenreSideList"
import ManhuaHero from "@/components/komik/manhua/ManhuaHero"
import { getKomikGenres, getKomikGenresDetail } from "@/libs/komik/komik"

export default async function GenreDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>
}) {
    const { slug } = await params

    const genreData = await getKomikGenresDetail(slug, "manhua")
    const genres = await getKomikGenres()

    return (
        <main className="min-h-screen bg-[#09090b] text-white pb-20">
            {/* Header Section dengan Efek Gradient Maskulin */}
            <ManhuaHero
                title="Genre"
                highlight={`${slug.replace(/-/g, ' ')}`}
                desc={`Temukan manhua berdasarkan genre ${slug.replace(/-/g, ' ')} dengan koleksi lengkap dan terbaru.`}
            />

            <section className="px-6 lg:px-20 mt-16">
                <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_340px] gap-12">

                    {/* Grid Genre */}
                    <div className="space-y-12">
                        <div className="grid grid-cols-1 sm:grid-cols-1 xl:grid-cols-3 gap-8">
                            {genreData.map((genre: any) => (
                                <ManhuaGenreCard key={genre.endpoint} genre={genre} />
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block">
                        <ManhuaGenreSideList genres={genres} currentGenre={slug} />
                    </div>
                </div>
            </section>
        </main>
    )
}