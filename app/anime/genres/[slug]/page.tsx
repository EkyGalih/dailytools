import { getAnimeAnimeByGenre, getAnimeGenres } from "@/libs/anime/anime";
import AnimeHero from "@/components/anime/AnimeHero";
import GenreSidebar from "@/components/anime/GenreSidebar";
import AnimeCardGenre from "@/components/anime/AnimeCardGenre";
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    
    // Format slug menjadi nama genre yang cantik (contoh: "slice-of-life" jadi "Slice Of Life")
    const genreTitle = slug
        ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
        : 'Populer';

    const siteName = 'Tamanto';
    const title = `Nonton Anime Genre ${genreTitle} Sub Indo`;
    const description = `Jelajahi koleksi anime genre ${genreTitle} terlengkap. Streaming episode terbaru dengan kualitas HD dan subtitle Indonesia gratis hanya di ${siteName}.`;

    return {
        title: `${title} | ${siteName}`,
        description: description,
        alternates: {
            canonical: `https://tamanto.web.id/anime/genre/${slug}`,
        },
        openGraph: {
            title: title,
            description: description,
            url: `https://tamanto.web.id/anime/genre/${slug}`,
            siteName: siteName,
            locale: 'id_ID',
            type: 'website',
            images: [
                {
                    url: '/og-anime.jpg', // Gambar banner anime global kamu
                    width: 1200,
                    height: 630,
                    alt: `Genre Anime ${genreTitle} di Tamanto`,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
        },
        robots: {
            index: true,
            follow: true,
        },
    };
}

// Next.js 15 mengharuskan params di-await
export default async function GenrePage({ params }: { params: Promise<{ slug: string }> }) {
    // 1. Await params terlebih dahulu
    const resolvedParams = await params;
    const slug = resolvedParams.slug;

    // 2. Fetch data secara parallel
    const [genreData, allGenres] = await Promise.all([
        getAnimeAnimeByGenre(slug),
        getAnimeGenres()
    ]);

    // 3. Safety Check: Pastikan slug ada sebelum manipulasi string
    const genreTitle = slug
        ? slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ')
        : 'Genre';

    if (!genreData) return <div className="text-white text-center py-20">Genre tidak ditemukan...</div>;

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
            <AnimeHero
                badgeText="GENRE EXPLORER"
                titlePrimary="GENRE"
                titleSecondary={genreTitle.toUpperCase()}
                description={`Menampilkan daftar anime dengan genre ${genreTitle}. Temukan tontonan favoritmu.`}
            />

            {/* Gunakan Padding Top (pt-12 atau mt-0) alih-alih margin negatif jika ingin rapi */}
            <section className="px-4 lg:px-20 pt-12 relative z-20 bg-[#09090b] mt-10">
                <div className="grid grid-cols-12 gap-8">

                    <div className="col-span-12 lg:col-span-9">
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-widest border-l-4 border-orange-600 pl-4">
                                Genre: {genreTitle}
                            </h2>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
                            {/* Pastikan akses .data karena model API kamu membungkusnya */}
                            {genreData.data?.anime_list.map((anime: any) => (
                                <AnimeCardGenre
                                    key={anime.endpoint}
                                    {...anime} // Ini akan otomatis memetakan title, thumbnail, endpoint, dll.
                                />
                            ))}
                        </div>

                        {genreData.data?.length === 0 && (
                            <div className="text-center py-20 bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
                                <p className="text-zinc-500">Belum ada anime di genre ini.</p>
                            </div>
                        )}
                    </div>

                    {/* Sidebar dengan status active */}
                    <GenreSidebar genres={allGenres} activeSlug={slug} />

                </div>
            </section>
        </main>
    );
}