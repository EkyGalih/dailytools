import DramaHero from "@/components/drama/dramabox/DramaHero"
import FlickreelsCard from "@/components/drama/flickreels/FlickreelsCard"
import { getFlickreelsForYou, getFlickreelsHomepage, getFlickreelsLatest, searchFlickreels } from "@/libs/drama/flickreels/flickreels"
import FlickreelsSectionHeader from "@/components/drama/flickreels/SectionHeaderFlickreels"
import FlickreelsRankCard from "@/components/drama/flickreels/FlickreelsRankCard"
import FlickreelsSearchBar from "@/components/drama/flickreels/FlickreelsSearchBar"
import { Metadata } from "next"

// app/drama/china/channel/flickreels/page.tsx

export const metadata: Metadata = {
    title: 'Nonton Drama FlickReels Sub Indo HD | Tamanto',
    description: 'Nikmati koleksi drama pendek vertikal terbaru dari FlickReels. Streaming drama China viral genre Balas Dendam, CEO, dan Urban Subtitle Indonesia gratis.',
    keywords: [
        'FlickReels Indonesia', 'Nonton FlickReels Sub Indo', 'Drama Pendek FlickReels',
        'Short Drama China Viral', 'Tamanto FlickReels', 'Streaming Drama Vertikal'
    ],
    alternates: {
        canonical: 'https://tamanto.web.id/drama/china/channel/flickreels',
    },
    openGraph: {
        title: 'FlickReels Media Hub - Drama Pendek Viral Hari Ini',
        description: 'Akses ribuan episode drama pendek dari FlickReels dengan kualitas visual terbaik dan subtitle Indonesia.',
        url: 'https://tamanto.web.id/drama/china/channel/flickreels',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-flickreels.jpg', // Opsional: Gunakan image branding Flickreels
                width: 1200,
                height: 630,
                alt: 'Tamanto FlickReels Channel',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Streaming FlickReels Drama China Viral',
        description: 'Update harian drama pendek FlickReels hanya di Tamanto. Kita Nonton, Kita Terhibur!',
    },
}

export default async function FlickreelsPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const sp = await searchParams
    const query = sp?.query?.trim() || ""
    const isSearching = query.length > 0

    // Fetch data secara paralel
    const [rankings, searchResults, foryou, latest] = await Promise.all([
        getFlickreelsHomepage(),
        isSearching ? searchFlickreels(query) : Promise.resolve([]),
        !isSearching ? getFlickreelsForYou() : Promise.resolve([]),
        !isSearching ? getFlickreelsLatest() : Promise.resolve([])
    ])

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <DramaHero activeChannel="flickreels" />

            <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-32 relative z-30 pt-4 md:pt-0">
                <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-5 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">
                    <FlickreelsSearchBar />

                    {/* GRID SYSTEM: 2 Kolom Utama */}
                    <div className="flex flex-col lg:flex-row gap-12">
                        {/* LEFT CONTENT (70%) */}
                        <div className="flex-1 space-y-20">
                            {isSearching ? (
                                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <FlickreelsSectionHeader
                                        title="Hasil Pencarian"
                                        desc={searchResults.length > 0 ? `Ditemukan ${searchResults.length} drama untuk "${query}"` : `Tidak ada hasil untuk "${query}"`}
                                        badge="Search"
                                    />
                                    {searchResults.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                                            {searchResults.map((drama: any) => (
                                                <FlickreelsCard key={drama.playlet_id} theater={drama} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-20 text-center bg-zinc-50 rounded-[2rem] border border-dashed border-zinc-200">
                                            <p className="text-zinc-400 font-bold italic uppercase tracking-widest">Drama tidak ditemukan</p>
                                        </div>
                                    )}
                                </section>
                            ) : (
                                <>
                                    <section>
                                        <FlickreelsSectionHeader title="Kurasi Spesial" desc="Rangkaian drama pilihan untukmu hari ini." badge="For You" />
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                                            {foryou.slice(0, 6).map((book: any) => (
                                                <FlickreelsCard key={book.playlet_id} theater={book} />
                                            ))}
                                        </div>
                                    </section>

                                    <section>
                                        <FlickreelsSectionHeader title="Rilis Terbaru" desc="Jangan lewatkan episode terbaru minggu ini." badge="New Update" />
                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
                                            {latest.slice(0, 6).map((book: any) => (
                                                <FlickreelsCard key={book.playlet_id} theater={book} />
                                            ))}
                                        </div>
                                    </section>
                                </>
                            )}
                        </div>

                        {/* RIGHT SIDEBAR (30% - Rankings) */}
                        <aside className="w-full lg:w-[320px] space-y-12">
                            {/* 1. HOT RANKING */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-6 bg-rose-600 rounded-full" />
                                    <h3 className="text-sm font-black uppercase tracking-widest italic text-zinc-900">Serial Terpopuler</h3>
                                </div>
                                <div className="flex flex-col gap-8">
                                    {rankings?.hot.slice(0, 6).map((drama: any, index: number) => (
                                        <FlickreelsRankCard key={drama.playlet_id} drama={drama} index={index} badge="Hot" />
                                    ))}
                                </div>
                            </section>

                            {/* 2. TRENDING */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-6 bg-indigo-600 rounded-full" />
                                    <h3 className="text-sm font-black uppercase tracking-widest italic text-zinc-900">Sedang Trending</h3>
                                </div>
                                <div className="flex flex-col gap-8">
                                    {rankings?.trending.slice(0, 6).map((drama: any, index: number) => (
                                        <FlickreelsRankCard key={drama.playlet_id} drama={drama} index={index} badge="Trending" />
                                    ))}
                                </div>
                            </section>

                            {/* 3. NEW ARRIVALS */}
                            <section className="space-y-6">
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="w-1 h-6 bg-emerald-600 rounded-full" />
                                    <h3 className="text-sm font-black uppercase tracking-widest italic text-zinc-900">Koleksi Baru</h3>
                                </div>
                                <div className="flex flex-col gap-8">
                                    {rankings?.new.slice(0, 6).map((drama: any, index: number) => (
                                        <FlickreelsRankCard key={drama.playlet_id} drama={drama} index={index} badge="New" />
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