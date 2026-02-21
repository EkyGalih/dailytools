import DramaHero from "@/components/drama/dramabox/DramaHero"
import NetshortPopularCard from "@/components/drama/netshort/NetshorPopularCard"
import NetshortCard from "@/components/drama/netshort/NetshortCard"
import NetshortCommingSoonCard from "@/components/drama/netshort/NetshortCommingSoonCard"
import NetshortDubbedCard from "@/components/drama/netshort/NetshortDubbedCard"
import NetshortForYouGridCard from "@/components/drama/netshort/NetshortForyouCard"
import NetshortForYouCard from "@/components/drama/netshort/NetshortForyouCard"
import NetshortForYouList from "@/components/drama/netshort/NetshortForYouList"
import NetshortRankCard from "@/components/drama/netshort/NetshortRankCard"
import NetshortSearchBar from "@/components/drama/netshort/NetshortSearchBar"
import NetshortTheatersCard from "@/components/drama/netshort/NetshortTheatersCard"
import NetshortTopRankCard from "@/components/drama/netshort/NetshortTopRankCard"
import NetshortSectionHeader from "@/components/drama/netshort/SectionHeaderNetshort"
import { getNetshortForYou, getNetshortTheaters, searchNetshort } from "@/libs/drama/netshort/netshort"
import { ChevronRight, Sparkles } from "lucide-react"
import { Metadata } from "next"
import Link from "next/link"

// app/drama/china/channel/Netshort/page.tsx

export const metadata: Metadata = {
    title: 'Nonton Drama Netshort Sub Indo HD | Tamanto',
    description: 'Nikmati koleksi drama pendek vertikal terbaru dari Netshort. Streaming drama China viral genre Balas Dendam, CEO, dan Urban Subtitle Indonesia gratis.',
    keywords: [
        'Netshort Indonesia', 'Nonton Netshort Sub Indo', 'Drama Pendek Netshort',
        'Short Drama China Viral', 'Tamanto Netshort', 'Streaming Drama Vertikal'
    ],
    alternates: {
        canonical: 'https://tamanto.web.id/drama/china/channel/Netshort',
    },
    openGraph: {
        title: 'Netshort Media Hub - Drama Pendek Viral Hari Ini',
        description: 'Akses ribuan episode drama pendek dari Netshort dengan kualitas visual terbaik dan subtitle Indonesia.',
        url: 'https://tamanto.web.id/drama/china/channel/Netshort',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-Netshort.jpg', // Opsional: Gunakan image branding Netshort
                width: 1200,
                height: 630,
                alt: 'Tamanto Netshort Channel',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Streaming Netshort Drama China Viral',
        description: 'Update harian drama pendek Netshort hanya di Tamanto. Kita Nonton, Kita Terhibur!',
    },
}

export default async function NetshortPage({ searchParams }: { searchParams: Promise<{ query?: string }> }) {
    const sp = await searchParams
    const query = sp?.query?.trim() || ""
    const isSearching = query.length > 0

    // Fetch data paralel
    const [foryouData, searchResults, theaters] = await Promise.all([
        getNetshortForYou(),
        isSearching ? searchNetshort(query) : Promise.resolve([]),
        !isSearching ? getNetshortTheaters() : Promise.resolve([]),
    ])

    const popular = (theaters && 'popular' in theaters) ? theaters.popular : [];
    const topDramas = (theaters && 'topDramas' in theaters) ? theaters.topDramas : [];
    const dubbed = (theaters && 'dubbed' in theaters) ? theaters.dubbed : [];
    const comingSoon = (theaters && 'comingSoon' in theaters) ? theaters.comingSoon : [];
    const rankings = (theaters && 'rankings' in theaters) ? theaters.rankings : [];

    console.log(theaters)

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <DramaHero activeChannel="netshort" />

            <main className="max-w-7xl mx-auto px-3 md:px-6 -mt-10 md:-mt-32 relative z-30 pt-4 md:pt-0">
                <div className="bg-white rounded-[2rem] md:rounded-[40px] p-4 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-zinc-100">

                    {/* SEARCH BAR: Margin bawah di HP diperkecil */}
                    <div className="mb-8 md:mb-12">
                        <NetshortSearchBar query={query} />
                    </div>

                    <div className="flex flex-col lg:flex-row gap-10 md:gap-16">

                        {/* LEFT CONTENT (70%) */}
                        <div className="flex-1 space-y-12 md:space-y-20">
                            {isSearching ? (
                                <section className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                                    <div className="flex items-center justify-between">
                                        <NetshortSectionHeader
                                            title="Hasil Pencarian"
                                            desc={searchResults.length > 0 ? `Ditemukan ${searchResults.length} drama untuk "${query}"` : `Tidak ada hasil untuk "${query}"`}
                                            badge="Search"
                                        />
                                    </div>

                                    {/* GRID HASIL PENCARIAN (Pake NetshortForYouGridCard karena layoutnya pas buat list banyak) */}
                                    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mt-10">
                                        {searchResults.map((drama: any) => (
                                            <NetshortForYouGridCard key={drama.id} drama={drama} />
                                        ))}
                                    </div>
                                </section>
                            ) : (
                                <>
                                    {/* SEKSI SEMUA SERIAL (Hanya 6 Item) */}
                                    <section>
                                        <NetshortSectionHeader
                                            title="Semua Serial"
                                            desc="Eksplorasi ribuan drama pilihan terbaru."
                                            badge="All Series"
                                        />

                                        {/* Tampilkan 6 data pertama saja secara statis */}
                                        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mt-10">
                                            {foryouData.slice(0, 6).map((drama: any) => (
                                                <NetshortForYouGridCard key={drama.id} drama={drama} />
                                            ))}
                                        </div>

                                        {/* Tombol ke Halaman Khusus */}
                                        <div className="mt-12 flex justify-center">
                                            <Link
                                                href="/drama/china/channel/netshort/foryou"
                                                className="group flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] hover:bg-rose-600 transition-all active:scale-95 shadow-xl shadow-zinc-200"
                                            >
                                                Lihat Selengkapnya
                                                <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </Link>
                                        </div>
                                    </section>

                                    {/* SECTION TOP DRAMAS (RANKING) *: 2 KOLOM di HP, 5 di DESKTOP */}
                                    <section className="animate-in fade-in duration-1000">
                                        <NetshortSectionHeader
                                            title="Peringkat Teratas"
                                            desc="Drama paling viral dengan rating tertinggi minggu ini."
                                            badge="Top Trending"
                                        />

                                        {/* GRID SYSTEM: 2 Kolom di Mobile, 5 Kolom di MacBook */}
                                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-8 mt-8">
                                            {topDramas?.map((book: any, index: number) => (
                                                <NetshortTopRankCard
                                                    key={book.shortPlayId}
                                                    theater={book}
                                                    index={index}
                                                />
                                            ))}
                                        </div>
                                    </section>

                                    <section className="animate-in fade-in duration-1000">
                                        <NetshortSectionHeader
                                            title="Sulih Suara Indonesia"
                                            desc="Nikmati drama favorit dengan dubbing bahasa Indonesia terbaik."
                                            badge="Dubbed Indo"
                                        />

                                        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-6 md:gap-8 mt-8">
                                            {dubbed?.map((book: any) => (
                                                <NetshortDubbedCard
                                                    key={book.shortPlayId}
                                                    theater={book}
                                                />
                                            ))}
                                        </div>
                                    </section>
                                    {/* Decorative Premium Banner Minimalist */}
                                    <div className="mt-8 p-6 rounded-[2rem] bg-gradient-to-br from-emerald-600 to-teal-700 text-white relative overflow-hidden group/banner">
                                        <div className="relative z-10">
                                            <p className="text-[8px] font-black uppercase tracking-widest opacity-80 mb-1">New Experience</p>
                                            <h4 className="text-sm font-black uppercase italic leading-tight mb-3">Tonton tanpa gangguan iklan sekarang!</h4>
                                            <Link href="/pricing" className="text-[9px] font-black uppercase bg-white text-emerald-700 px-4 py-2 rounded-xl inline-block hover:scale-105 transition-transform">
                                                Cek Paket VIP
                                            </Link>
                                        </div>
                                        <Sparkles className="absolute -right-2 -bottom-2 w-16 h-16 opacity-10 group-hover/banner:scale-110 transition-transform duration-700" />
                                    </div>
                                </>
                            )}
                        </div>

                        {/* RIGHT SIDEBAR (Ranking) */}
                        {/* Di Mobile, section ini akan turun ke bawah secara otomatis */}
                        <aside className="w-full lg:w-[320px] space-y-12 pt-10 lg:pt-0 border-t lg:border-t-0 border-zinc-50">

                            {/* 3. FOR YOU / SEGERA HADIR SECTION */}
                            <section className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-300">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        {/* Emerald Aksen */}
                                        <div className="w-1 h-6 bg-emerald-600 rounded-full shadow-[0_0_12px_rgba(16,185,129,0.5)]" />
                                        <h3 className="text-sm font-black uppercase italic text-zinc-900 tracking-tight">Top Drama</h3>
                                    </div>
                                    <div className="flex -space-x-2">
                                        {[1, 2].map((i) => (
                                            <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-zinc-100 shadow-sm" />
                                        ))}
                                    </div>
                                </div>

                                <div className="flex flex-col gap-3">
                                    {/* Gunakan data Rankings atau Popular yang sudah difilter */}
                                    {rankings?.map((drama: any) => (
                                        <NetshortRankCard
                                            key={drama.shortPlayId}
                                            theater={drama}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* 2. TRENDING SECTION */}
                            <section className="animate-in fade-in slide-in-from-right-4 duration-1000 delay-200">
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-6 bg-indigo-600 rounded-full shadow-[0_0_12px_rgba(79,70,229,0.5)]" />
                                        <h3 className="text-sm font-black uppercase italic text-zinc-900 tracking-tight">Trending</h3>
                                    </div>
                                    <span className="text-[10px] font-black text-zinc-300 tracking-widest">WEEKLY</span>
                                </div>

                                <div className="space-y-3">
                                    {/* Pastikan menggunakan 'topDramas' atau property yang sesuai dari fetcher lu */}
                                    {popular?.map((drama: any, index: number) => (
                                        <NetshortPopularCard
                                            key={drama.shortPlayId}
                                            theater={drama}
                                            index={index}
                                        />
                                    ))}
                                </div>
                            </section>

                            {/* 1. HOT RANKING */}
                            <section className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-1 h-6 bg-emerald-500 rounded-full" />
                                        <h3 className="text-sm font-black uppercase tracking-widest italic text-zinc-900">Segera Tayang</h3>
                                    </div>
                                    <span className="text-[10px] font-black text-emerald-500 animate-pulse">COMING SOON</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    {comingSoon?.map((drama: any, index: number) => (
                                        <NetshortCommingSoonCard
                                            key={drama.shortPlayId}
                                            drama={drama}
                                            index={index}
                                        />
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