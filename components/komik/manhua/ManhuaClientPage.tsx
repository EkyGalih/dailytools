'use client'

import { useState } from "react"
import ManhuaHero from "./ManhuaHero"
import ManhuaRecommendedCard from "./ManhuaRecommendedCard"
import ManhuaLatestCard from "./ManhuaLatestCard"
import ManhuaPopularMiniCard from "./ManhuaPopularMiniCard"
import ManhuaSectionHeader from "./ManhuaSectionHeader"
import ManhuaSearchClient from "./ManhuaSearchClient"

export default function ManhuaClientPage({ initialRecommended, initialPopular, initialLatest }: any) {
    const [searchResults, setSearchResults] = useState<any[] | null>(null)
    const [searchQuery, setSearchQuery] = useState("")

    return (
        <main className="min-h-screen bg-[#09090b] text-white pb-20">
            {/* HERO */}

            <ManhuaHero
                title="Manhua"
                highlight="Explorer"
                desc="Baca manhua trending dengan update chapter terbaru setiap hari."
            />

            {/* SEARCH SECTION */}
            <section className="px-6 lg:px-20 -mt-8 relative z-20">
                <ManhuaSearchClient
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
                                        {searchResults.map((manhua: any) => (
                                            <ManhuaRecommendedCard key={manhua.manga_id} manhua={manhua} />
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
                                    <ManhuaSectionHeader
                                        title="🔥 Manhua Pilihan"
                                        desc="Koleksi manhua terbaik berdasarkan rating dan tren populer."
                                        link="/komik/manhua/recommended"
                                    />
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {initialRecommended.slice(0, 8).map((manhua: any) => (
                                            <ManhuaRecommendedCard key={manhua.manga_id} manhua={manhua} />
                                        ))}
                                    </div>
                                </section>

                                {/* ⏳ TERBARU */}
                                <section>
                                    <ManhuaSectionHeader
                                        title="⏳ Update Terbaru"
                                        desc="Manhua cultivation dan aksi yang baru saja rilis chapter terbaru."
                                        link="/komik/manhua/latest"
                                    />
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                                        {initialLatest.slice(0, 8).map((manhua: any) => (
                                            <ManhuaLatestCard key={manhua.manga_id} manhua={manhua} />
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
                                    <span className="text-violet-400 drop-shadow-[0_0_10px_rgba(167,139,250,0.7)]">
                                        ⚡
                                    </span>
                                    Top Manhua
                                </h2>

                                <p className="text-zinc-500 text-[11px] mt-1">
                                    Ranking manhua terkuat di dunia cultivation
                                </p>
                                <div className="mt-8 space-y-4">
                                    {initialPopular.slice(0, 10).map((manhua: any, i: number) => (
                                        <ManhuaPopularMiniCard key={manhua.manga_id} manhua={manhua} rank={i + 1} />
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