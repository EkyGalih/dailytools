'use client'

import { useState } from "react"
import SectionHeader from "@/components/komik/manga/SectionHeader"
import ManhwaHero from "./ManhwaHero"
import ManhwaRecommendedCard from "./ManhwaRecommendedCard"
import ManhwaSearchClient from "./ManhwaSearchClient"
import ManhwaLatestCard from "./ManhuaLaterstCard"
import ManhwaGenreSideList from "./ManhwaGenreSideList"

export default function ManhwaClientPage({ initialPopular, initialLatest, genreData }: any) {
    const [searchResults, setSearchResults] = useState<any[] | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    const genres = genreData || []

    return (
        <main className="min-h-screen bg-[#09090b] text-white pb-20">
            {/* HERO */}
            <ManhwaHero
                title="Manhwa"
                highlight="Trending"
                desc="Temukan manhwa yang sedang viral, paling banyak dibaca, dan paling dicari."
            />

            {/* SEARCH SECTION */}
            <section className="px-6 lg:px-20 -mt-8 relative z-20">
                <ManhwaSearchClient
                    externalQuery={searchQuery}
                    onSearchResult={(results, query) => {
                        setSearchResults(results)
                        setSearchQuery(query)
                    }}
                />
            </section>

            <section className="px-6 lg:px-20 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 lg:gap-20">

                    {/* AREA KONTEN DINAMIS (REPLACEABLE) */}
                    <div className="min-h-[60vh]">
                        {searchQuery.trim().length > 0 ? (
                            /* 🔍 MODE: HASIL PENCARIAN */
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-10 border-b border-zinc-800 pb-6">
                                    <h2 className="text-2xl font-black uppercase italic border-l-4 border-orange-600 pl-4 tracking-tight">
                                        Hasil: <span className="text-cyan-500">{searchQuery}</span>
                                    </h2>
                                    <button
                                        onClick={() => { setSearchResults(null); setSearchQuery("") }}
                                        className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black uppercase text-cyan-500 hover:bg-cyan-600 hover:text-white transition-all shadow-lg"
                                    >
                                        Bersihkan X
                                    </button>
                                </div>

                                {searchResults && searchResults.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {searchResults.map((manga: any) => (
                                            <ManhwaRecommendedCard key={manga.manga_id} manhwa={manga} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-32 text-center bg-zinc-900/20 rounded-[2.5rem] border border-dashed border-zinc-800">
                                        <p className="text-zinc-600 font-black uppercase tracking-widest italic">Manga tidak ditemukan</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* 🏠 MODE: DEFAULT (REKOMENDASI & LATEST) */
                            <div className="space-y-24 animate-in fade-in duration-700">
                                {/* 🔥 RECOMMENDED */}
                                <section>
                                    <SectionHeader
                                        title="🔥 Wajib Baca"
                                        desc="Manhwa yang wajib dibaca: rekomendasi teratas berdasar rating dan popularitas."
                                        link="/komik/recommended"
                                    />
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {initialPopular.slice(0, 8).map((manhwa: any) => (
                                            <ManhwaRecommendedCard key={manhwa.endpoint} manhwa={manhwa} />
                                        ))}
                                    </div>
                                </section>

                                {/* ⏳ TERBARU */}
                                <section>
                                    <SectionHeader
                                        title="⏳ Manhwa Terbaru"
                                        desc="Update chapter terbaru setiap hari, langsung dari seri favoritmu."
                                        link="/komik/latest"
                                    />
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {initialLatest.slice(0, 8).map((manhwa: any) => (
                                            <ManhwaLatestCard key={manhwa.endpoint} manhwa={manhwa} />
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR (TETAP MUNCUL) */}
                    <div className="hidden lg:block">
                        <ManhwaGenreSideList genres={genres} />
                    </div>
                </div>
            </section>
        </main>
    )
}