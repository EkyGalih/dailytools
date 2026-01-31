
import AnimeCard from "@/components/anime/AnimeCard";
import AnimeHero from "@/components/anime/AnimeHero";
import GenreSidebar from "@/components/anime/GenreSidebar";
import { getAnimeGenres, getAnimeHomePage } from "@/libs/anime/anime";


export default async function HomePage() {
    const data = await getAnimeHomePage();
    const genres = await getAnimeGenres();

    if (!data) return <div className="text-white text-center py-20">Gagal memuat data...</div>;

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
            <AnimeHero />
            {/* ANIME LIST SECTION */}
            <section className="px-4 lg:px-20 mt-10">
                <div className="grid grid-cols-12 gap-8">

                    <div className="col-span-12 lg:col-span-9">
                        <div className="flex items-center mt-5 justify-between mb-8">
                            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-widest border-l-4 border-orange-600 pl-4">
                                Update Terbaru
                            </h2>
                            <div className="h-[1px] flex-grow bg-zinc-800 mx-6 hidden md:block"></div>
                            <button className="text-xs font-bold text-zinc-500 hover:text-orange-500 uppercase">
                                Lihat Semua
                            </button>
                        </div>

                        {/* Grid System: Mobile 2 kolom, Desktop 5 kolom */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6">
                            {data?.data?.ongoing?.map((anime: any) => (
                                <AnimeCard key={anime.endpoint} {...anime} />
                            ))}
                        </div>

                        <div className="flex items-center mt-5 justify-between mb-8">
                            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-widest border-l-4 border-orange-600 pl-4">
                                Anime Selesai
                            </h2>
                            <div className="h-[1px] flex-grow bg-zinc-800 mx-6 hidden md:block"></div>
                            <button className="text-xs font-bold text-zinc-500 hover:text-orange-500 uppercase">
                                Lihat Semua
                            </button>
                        </div>

                        {/* Grid System: Mobile 2 kolom, Desktop 5 kolom */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-5 xl:grid-cols-5 gap-4 md:gap-6">
                            {data?.data?.complete?.map((item: any) => (
                                <AnimeCard key={item.endpoint} {...item} />
                            ))}
                        </div>
                    </div>

                    {/* RIGHT CONTENT: SIDEBAR GENRE */}
                    <GenreSidebar genres={genres} activeSlug=""/>

                </div>
            </section>
        </main >
    );
}