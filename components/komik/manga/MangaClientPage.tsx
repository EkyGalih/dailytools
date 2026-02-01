'use client'

import { useState } from "react"
import KomikLatestCard from "@/components/komik/manga/KomikLatestCard"
import KomikPopularMiniCard from "@/components/komik/manga/KomikPopularMiniCard"
import KomikRecommendedCard from "@/components/komik/manga/KomikRecommendedCard"
import KomikSearchClient from "@/components/komik/manga/KomikSearchClient"
import SectionHeader from "@/components/komik/manga/SectionHeader"

export default function MangaClientPage({ initialRecommended, initialPopular, initialLatest }: any) {
    const [searchResults, setSearchResults] = useState<any[] | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <main className="min-h-screen bg-[#09090b] text-white pb-20">
            {/* HERO */}
            <header className="pt-28 pb-12 px-6 lg:px-20 border-b border-zinc-800/50 bg-[radial-gradient(circle_at_top_left,_rgba(249,115,22,0.05),_transparent)]">
                <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter italic">
                    Manga <span className="text-orange-500">Explorer</span>
                </h1>
            </header>

            {/* SEARCH SECTION */}
            <section className="px-6 lg:px-20 -mt-8 relative z-20">
                <KomikSearchClient
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
                                        Hasil: <span className="text-orange-500">{searchQuery}</span>
                                    </h2>
                                    <button
                                        onClick={() => { setSearchResults(null); setSearchQuery("") }}
                                        className="px-4 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-[10px] font-black uppercase text-orange-500 hover:bg-orange-600 hover:text-white transition-all shadow-lg"
                                    >
                                        Bersihkan X
                                    </button>
                                </div>

                                {searchResults && searchResults.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {searchResults.map((manga: any) => (
                                            <KomikRecommendedCard key={manga.manga_id} manga={manga} />
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
                                        title="🔥 Rekomendasi Manga"
                                        desc="Pilihan terbaik berdasarkan rating & popularitas."
                                        link="/komik/recommended"
                                    />
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {initialRecommended.slice(0, 8).map((manga: any) => (
                                            <KomikRecommendedCard key={manga.manga_id} manga={manga} />
                                        ))}
                                    </div>
                                </section>

                                {/* ⏳ TERBARU */}
                                <section>
                                    <SectionHeader
                                        title="⏳ Update Terbaru"
                                        desc="Manga dengan chapter terbaru setiap harinya."
                                        link="/komik/latest"
                                    />
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {initialLatest.slice(0, 8).map((manga: any) => (
                                            <KomikLatestCard key={manga.manga_id} manga={manga} />
                                        ))}
                                    </div>
                                </section>
                            </div>
                        )}
                    </div>

                    {/* SIDEBAR (TETAP MUNCUL) */}
                    <aside>
                        <div className="sticky top-28 space-y-8">
                            <div className="p-6 bg-zinc-900/30 border border-zinc-800/50 rounded-[2rem]">
                                <h2 className="text-lg font-black uppercase tracking-tight flex items-center gap-2">
                                    <span className="text-orange-500">⭐</span> Populer
                                </h2>
                                <p className="text-zinc-500 text-sm mt-1">Manga dengan rating tertinggi</p>
                                <div className="mt-8 space-y-4">
                                    {initialPopular.slice(0, 10).map((manga: any, i: number) => (
                                        <KomikPopularMiniCard key={manga.manga_id} manga={manga} rank={i + 1} />
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
            </section>
        </main>
    )
}