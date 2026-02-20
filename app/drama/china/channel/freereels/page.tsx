import DramaHero from "@/components/drama/dramabox/DramaHero"
import { Metadata } from "next"
import { getAnimeFreereelsHomepage, getFreereelsForYou, getFreereelsHomepage, searchFreereels } from "@/libs/drama/Freereels/freereels"
import FreereelsSectionHeader from "@/components/drama/freereels/SectionHeaderFreereels"
import FreereelsCard from "@/components/drama/freereels/FreereelsCard"
import FreereelsRankCard from "@/components/drama/freereels/FreereelsRankCard"
import FreereelsAnimeCard from "@/components/drama/freereels/FreereelsAnimeCard"
import FreereelsSearchBar from "@/components/drama/freereels/FreereelsSearchBar"

// app/drama/china/channel/Freereels/page.tsx

export const metadata: Metadata = {
    title: 'Nonton Drama Freereels Sub Indo HD | Tamanto',
    description: 'Nikmati koleksi drama pendek vertikal terbaru dari Freereels. Streaming drama China viral genre Balas Dendam, CEO, dan Urban Subtitle Indonesia gratis.',
    keywords: [
        'Freereels Indonesia', 'Nonton Freereels Sub Indo', 'Drama Pendek Freereels',
        'Short Drama China Viral', 'Tamanto Freereels', 'Streaming Drama Vertikal'
    ],
    alternates: {
        canonical: 'https://tamanto.web.id/drama/china/channel/Freereels',
    },
    openGraph: {
        title: 'Freereels Media Hub - Drama Pendek Viral Hari Ini',
        description: 'Akses ribuan episode drama pendek dari Freereels dengan kualitas visual terbaik dan subtitle Indonesia.',
        url: 'https://tamanto.web.id/drama/china/channel/Freereels',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-Freereels.jpg', // Opsional: Gunakan image branding Freereels
                width: 1200,
                height: 630,
                alt: 'Tamanto Freereels Channel',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Streaming Freereels Drama China Viral',
        description: 'Update harian drama pendek Freereels hanya di Tamanto. Kita Nonton, Kita Terhibur!',
    },
}

export default async function FreereelsPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const sp = await searchParams
    const query = sp?.query?.trim() || ""
    const isSearching = query.length > 0

    // Fetch data paralel
    const [homepage, searchResults, foryou, latest] = await Promise.all([
        getFreereelsHomepage(),
        isSearching ? searchFreereels(query) : Promise.resolve([]),
        !isSearching ? getFreereelsForYou() : Promise.resolve([]),
        !isSearching ? getAnimeFreereelsHomepage() : Promise.resolve([])
    ])

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <DramaHero activeChannel="freereels" />

            <main className="max-w-7xl mx-auto px-3 md:px-6 -mt-10 md:-mt-32 relative z-30 pt-4 md:pt-0">
                <div className="bg-white rounded-[2rem] md:rounded-[40px] p-4 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-zinc-100">

                    {/* SEARCH BAR: Margin bawah di HP diperkecil */}
                    {/* <div className="mb-8 md:mb-12">
                        <FreereelsSearchBar query={query} />
                    </div> */}

                    <div className="flex flex-col lg:flex-row gap-10 md:gap-16">

                        {/* LEFT CONTENT (70%) */}
                        <div className="flex-1 space-y-12 md:space-y-20">
                            {isSearching ? (
                                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <FreereelsSectionHeader
                                        title="Hasil Pencarian"
                                        desc={searchResults.length > 0 ? `Ditemukan ${searchResults.length} drama` : `Tidak ada hasil untuk "${query}"`}
                                        badge="Search"
                                    />
                                    {/* GRID HP: 2 KOLOM (Paling pas buat HP) */}
                                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-10">
                                        {searchResults.map((drama: any) => (
                                            <FreereelsCard key={drama.key} theater={drama} />
                                        ))}
                                    </div>
                                </section>
                            ) : (
                                <>
                                    {/* SECTION FOR YOU */}
                                    <section>
                                        <FreereelsSectionHeader title="Kurasi Spesial" desc="Pilihan terbaik untukmu." badge="For You" />
                                        {/* GRID HP: 2 KOLOM */}
                                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 md:gap-6 mt-6 md:mt-10">
                                            {foryou.slice(0, 6).map((book: any) => (
                                                <FreereelsCard key={book.key || book.playlet_id} theater={book} />
                                            ))}
                                        </div>
                                    </section>

                                    {/* SECTION ANIME: 2 KOLOM di HP, 5 di DESKTOP */}
                                    <section>
                                        <FreereelsSectionHeader
                                            title="Dunia Anime"
                                            desc="Kisah fantasi seru minggu ini."
                                            badge="Hot Anime"
                                        />
                                        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-6 mt-6 md:mt-10">
                                            {latest.slice(0, 10).map((book: any) => (
                                                <FreereelsAnimeCard key={book.key} theater={book} />
                                            ))}
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>

                        {/* RIGHT SIDEBAR (Ranking) */}
                        {/* Di Mobile, section ini akan turun ke bawah secara otomatis */}
                        <aside className="w-full lg:w-[320px] space-y-12 pt-10 lg:pt-0 border-t lg:border-t-0 border-zinc-50">

                            {/* 1. HOT RANKING */}
                            <section>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-6 bg-rose-600 rounded-full" />
                                        <h3 className="text-sm font-black uppercase italic text-zinc-900 tracking-tight">Populer</h3>
                                    </div>
                                    <span className="text-[10px] font-bold text-zinc-400 uppercase">Top 5</span>
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                    {homepage?.popular?.slice(0, 5).map((drama: any, index: number) => (
                                        <FreereelsRankCard key={drama.key} drama={drama} index={index} badge="Hot" />
                                    ))}
                                </div>
                            </section>

                            {/* 2. TRENDING */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-6 bg-indigo-600 rounded-full" />
                                    <h3 className="text-sm font-black uppercase italic text-zinc-900 tracking-tight">Trending</h3>
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                    {homepage?.topDaily?.slice(0, 5).map((drama: any, index: number) => (
                                        <FreereelsRankCard key={drama.key} drama={drama} index={index} badge="Trending" />
                                    ))}
                                </div>
                            </section>

                            {/* 3. COMING SOON */}
                            <section>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-6 bg-emerald-600 rounded-full" />
                                    <h3 className="text-sm font-black uppercase italic text-zinc-900 tracking-tight">Segera Hadir</h3>
                                </div>
                                <div className="space-y-4 md:space-y-6">
                                    {homepage?.comingSoon?.slice(0, 5).map((drama: any, index: number) => (
                                        <FreereelsRankCard key={drama.key} drama={drama} index={index} badge="New" />
                                    ))}
                                </div>
                            </section>
                        </aside>

                    </div>
                </div>
            </main>
        </div>
    )
}