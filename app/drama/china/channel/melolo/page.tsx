import DramaHero from "@/components/drama/dramabox/DramaHero"
import MeloloCard from "@/components/drama/melolo/MeloloCard"
import {
    getMeloloTrending,
    getMeloloLatest,
    searchMelolo,
} from "@/libs/drama/melolo/melolo"
import MeloloSearchBar from "@/components/drama/melolo/MeloloSearchBar"
import MeloloSectionHeader from "@/components/drama/melolo/SectionHeaderMelolo"

export default async function MeloloPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const sp = await searchParams
    const query = sp?.query?.trim() || ""
    const isSearching = query.length > 0

    const [latestBooks, trendingBooks] = await Promise.all([
        getMeloloLatest(),
        getMeloloTrending(),
    ])
    const searchResults = isSearching ? await searchMelolo(query) : []

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* Pastikan activeChannel dikirim dengan benar */}
            <DramaHero activeChannel="melolo" />

            {/* Tambahkan pt-4 di mobile agar tidak terlalu mepet dengan channel list di Hero */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-32 relative z-30 pt-4 md:pt-0">
                <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-5 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">

                    {/* Layout Grid System */}
                    <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                        {/* LEFT CONTENT */}
                        <div className="flex-1 space-y-16 order-2 lg:order-1">
                            {/* SEARCH BAR */}
                            <MeloloSearchBar />

                            {/* ... (Konten Search & Normal tetap sama) */}
                            {/* Tips: Pastikan MeloloCard dipassing prop yang benar */}
                            {isSearching ? (
                                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <MeloloSectionHeader title="Hasil Pencarian" desc={`Menampilkan "${query}"`} badge="Search" />
                                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 mt-10">
                                        {searchResults.map((book: any) => (
                                            <MeloloCard key={book.book_id} theater={book} />
                                        ))}
                                    </div>
                                </section>
                            ) : (
                                <>
                                    <section>
                                        <MeloloSectionHeader title="Rilis Terbaru" desc="Koleksi terbaru minggu ini" badge="New" />
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 mt-10">
                                            {latestBooks.slice(0, 9).map((book: any) => (
                                                <MeloloCard key={book.book_id} theater={book} />
                                            ))}
                                        </div>
                                    </section>
                                    <section>
                                        <MeloloSectionHeader title="Trending Hari Ini" desc="Koleksi terpopuler minggu ini" badge="Trending" />
                                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 md:gap-8 mt-10">
                                            {trendingBooks.slice(0, 9).map((book: any) => (
                                                <MeloloCard key={book.book_id} theater={book} />
                                            ))}
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}