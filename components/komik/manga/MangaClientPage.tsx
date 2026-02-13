'use client'

import { useState } from "react"
import KomikLatestCard from "@/components/komik/manga/KomikLatestCard"
import KomikRecommendedCard from "@/components/komik/manga/KomikRecommendedCard"
import KomikSearchClient from "@/components/komik/manga/KomikSearchClient"
import SectionHeader from "@/components/komik/manga/SectionHeader"
import MangaHero from "./MangaHero"
import GenreSideList from "./GenreSideList"
import KomikSearchCard from "./KomikSearchCard"

export default function MangaClientPage({ initialPopular, initialLatest, initialLatestMirror, genreData }: any) {
    const [searchResults, setSearchResults] = useState<any[] | null>(null)
    const [searchQuery, setSearchQuery] = useState("")
    const [activeType, setActiveType] = useState<"project" | "mirror">("project")

    // Ambil data genre dari props (pastikan Page.tsx mengirim genreData)
    const genres = genreData || []
    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-24 selection:bg-orange-500/30">
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-orange-600/5 blur-[120px] pointer-events-none z-0" />

            <div className="relative z-10">
                <MangaHero
                    title="Paviliun"
                    highlight="Manga"
                    desc="Masuki dunia tanpa batas, tempat setiap halaman membuka petualangan baru, dari isekai epik hingga romansa yang menyentuh jiwa."
                />

                <section className="px-6 lg:px-20 -mt-10 relative z-30">
                    <div className="max-w-5xl mx-auto">
                        <KomikSearchClient
                            externalQuery={searchQuery}
                            onSearchResult={(results, query) => {
                                setSearchResults(results)
                                setSearchQuery(query)
                            }}
                        />
                    </div>
                </section>

                <section className="px-6 lg:px-20 mt-20 max-w-[1600px] mx-auto">
                    {/* GRID LAYOUT: MAIN CONTENT VS SIDEBAR */}
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] xl:grid-cols-[1fr_340px] gap-12">

                        {/* AREA KIRI: KONTEN DINAMIS */}
                        <div className="min-h-[60vh]">
                            {searchQuery.trim().length > 0 ? (
                                /* 🔍 HASIL PENCARIAN */
                                <div className="animate-in fade-in slide-in-from-bottom-6 duration-700">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-8 border-b border-zinc-800/50">
                                        <div>
                                            <p className="text-orange-500 text-xs font-bold uppercase tracking-[0.2em] mb-2">Search Results</p>
                                            <h2 className="text-3xl md:text-4xl font-black italic tracking-tight uppercase">
                                                Menampilkan: <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">{searchQuery}</span>
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => { setSearchResults(null); setSearchQuery("") }}
                                            className="group flex items-center gap-2 px-6 py-3 bg-zinc-900/50 hover:bg-orange-600 border border-zinc-800 hover:border-orange-500 rounded-2xl text-xs font-bold uppercase transition-all duration-300 shadow-xl"
                                        >
                                            <span>Bersihkan</span>
                                            <span className="group-hover:rotate-90 transition-transform">✕</span>
                                        </button>
                                    </div>

                                    {searchResults && searchResults.length > 0 ? (
                                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6">
                                            {searchResults.map((manga: any) => (
                                                <KomikSearchCard key={manga.endpoint} manga={manga} />
                                            ))}
                                        </div>
                                    ) : (
                                        <div className="py-40 text-center bg-zinc-900/10 rounded-[3rem] border border-dashed border-zinc-800/60 backdrop-blur-sm">
                                            <p className="text-zinc-500 font-bold uppercase tracking-[0.3em]">Manga tidak ditemukan</p>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                /* 🏠 DEFAULT CONTENT */
                                <div className="space-y-32">
                                    <section>
                                        <SectionHeader
                                            title="🔥 Manga Populer"
                                            desc="Pilihan editor untuk kamu baca minggu ini."
                                            link="/komik/popular"
                                        />
                                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
                                            {initialPopular.slice(0, 8).map((manga: any) => (
                                                <KomikRecommendedCard key={manga.endpoint} manga={manga} />
                                            ))}
                                        </div>
                                    </section>

                                    <section className="relative">

                                        <div className="flex items-center justify-between">
                                            <SectionHeader
                                                title="⏳ Update Terbaru"
                                                desc="Jangan lewatkan chapter terbaru yang rilis hari ini."
                                                link="/komik/latest"
                                            />

                                            {/* TOGGLE */}
                                            <div className="flex items-center gap-2 bg-zinc-900 p-1 rounded-xl border border-zinc-800">
                                                <button
                                                    onClick={() => setActiveType("project")}
                                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${activeType === "project"
                                                        ? "bg-orange-600 text-white"
                                                        : "text-zinc-400 hover:text-white"
                                                        }`}
                                                >
                                                    Original
                                                </button>

                                                <button
                                                    onClick={() => setActiveType("mirror")}
                                                    className={`px-4 py-1.5 text-xs font-bold rounded-lg transition ${activeType === "mirror"
                                                        ? "bg-purple-600 text-white"
                                                        : "text-zinc-400 hover:text-white"
                                                        }`}
                                                >
                                                    Mirror
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 mt-1">
                                            {(activeType === "project"
                                                ? initialLatest
                                                : initialLatestMirror
                                            )
                                                .slice(0, 8)
                                                .map((manga: any) => (
                                                    <KomikLatestCard key={manga.manga_id} manga={manga} />
                                                ))}
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>

                        {/* AREA KANAN: SIDEBAR GENRE (Hidden on Mobile) */}
                        <div className="hidden lg:block">
                            <GenreSideList genres={genres} />
                        </div>

                    </div>
                </section>
            </div>
        </main>
    )
}