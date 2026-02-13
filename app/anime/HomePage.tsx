'use client'

import { useState } from 'react'
import AnimeCard from "@/components/anime/AnimeCard";
import AnimeHero from "@/components/anime/AnimeHero";
import AnimeCardRecomended from '@/components/anime/AnimeCardRecomended';
import { Zap, LayoutGrid, Clock } from 'lucide-react';
import AnimeSearch from '@/components/anime/AnimeSearch';

export default function HomePageClient({ initialLatest, initialRecomended, initialMovie }: { initialLatest: any, initialRecomended: any, initialMovie: any }) {
    const [searchResults, setSearchResults] = useState<any[] | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const handleSearchResult = (data: any[] | null, query: string) => {
        setSearchResults(data)
        setSearchQuery(query)
    }

    const [recommended, setRecommended] = useState(initialRecomended || [])
    const [recPage, setRecPage] = useState(1)
    const [loadingRec, setLoadingRec] = useState(false)

    const loadMoreRecommended = async () => {
        try {
            setLoadingRec(true)
            const nextPage = recPage + 1
            const res = await fetch(`https://api.sansekai.my.id/api/anime/recommended?page=${nextPage}`)
            const data = await res.json()
            if (data) {
                setRecommended((prev: any) => [...prev, ...data])
                setRecPage(nextPage)
            }
        } catch (err) {
            console.error("Load more recommended error:", err)
        } finally {
            setLoadingRec(false)
        }
    }

    const handleClearSearch = () => {
        setSearchResults(null)
        setSearchQuery('')
    }

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 selection:bg-orange-500/30">
            <AnimeHero />

            <section id="content" className="px-4 lg:px-20 mt-12">
                {/* GRID SYSTEM: 2 KOLOM (Left: Main, Right: Sidebar) */}
                <div className="grid grid-cols-12 gap-8 lg:gap-12">

                    {/* --- KOLOM KIRI: RECOMMENDED (UKURAN LEBIH LEBAR) --- */}
                    <div className="col-span-12 lg:col-span-8 xl:col-span-9 space-y-10">
                        <AnimeSearch
                            onSearchResult={handleSearchResult}
                            externalQuery={searchQuery}
                        />
                        {searchQuery ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                                        <span className="w-2 h-8 bg-orange-600 rounded-full" />
                                        Hasil Pencarian untuk: <span className="text-orange-500">{searchQuery}</span>
                                    </h2>
                                    <button onClick={handleClearSearch} className="px-5 py-2.5 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase text-orange-500 hover:bg-orange-600 hover:text-white transition-all">
                                        Bersihkan X
                                    </button>
                                </div>
                                {searchResults && searchResults.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-5">
                                        {searchResults.map((anime: any) => (
                                            <AnimeCardRecomended key={anime.endpoint} anime={anime} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center bg-zinc-900/40 rounded-[3rem] border border-dashed border-white/5">
                                        <p className="text-zinc-500 font-bold uppercase tracking-[0.3em]">No Soul Found</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="animate-in fade-in duration-700">
                                <div className="flex items-center justify-between mb-8">
                                    <div className="space-y-1">
                                        <h2 className="text-2xl md:text-4xl font-black italic uppercase tracking-tighter flex items-center gap-3">
                                            Rekomendasi <span className="text-orange-600">Terbaik</span>
                                        </h2>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em] ml-2">Editor's Choice for You</p>
                                    </div>
                                    <LayoutGrid size={24} className="text-zinc-800" />
                                </div>

                                <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
                                    {recommended?.map((item: any) => (
                                        <AnimeCardRecomended key={`${item.id}-${item.url}`} anime={item} />
                                    ))}
                                </div>

                                <div className="flex justify-center mt-16">
                                    <button
                                        onClick={loadMoreRecommended}
                                        disabled={loadingRec}
                                        className="group relative px-10 py-4 rounded-[2rem] bg-zinc-900 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-white hover:border-orange-500/50 transition-all active:scale-95 disabled:opacity-50"
                                    >
                                        <span className="relative z-10">{loadingRec ? "Syncing..." : "Load More Experience"}</span>
                                        <div className="absolute inset-0 rounded-[2rem] bg-orange-600/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* --- KOLOM KANAN: UPDATE TERBARU (LIST KE BAWAH) --- */}
                    <aside className="col-span-12 lg:col-span-4 xl:col-span-3">
                        <div className="sticky top-28 space-y-8">
                            <div className="flex items-center justify-between mb-6 px-2">
                                <h2 className="text-lg font-black uppercase italic tracking-tighter flex items-center gap-2">
                                    <Clock size={18} className="text-orange-500" />
                                    Update <span className="text-zinc-500">Terbaru</span>
                                </h2>
                                <span className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
                            </div>

                            {/* LIST CARD KE BAWAH */}
                            <div className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] pr-2 custom-scrollbar">
                                {initialLatest?.map((anime: any) => (
                                    <div key={anime.id} className="transition-all duration-300 hover:translate-x-2">
                                        <AnimeCard anime={anime} />
                                    </div>
                                ))}
                            </div>

                            {/* BANNER DECOR */}
                            <div className="p-6 rounded-[2.5rem] bg-gradient-to-br from-orange-600 to-amber-600 shadow-2xl shadow-orange-900/20 relative overflow-hidden group">
                                <Zap className="absolute -right-4 -bottom-4 text-white/20 w-32 h-32 rotate-12 transition-transform group-hover:scale-110" />
                                <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/80 mb-1">Weekly Quest</p>
                                <h3 className="text-xl font-black uppercase italic text-white leading-tight">Mulai Petualangan Barumu Hari Ini!</h3>
                            </div>
                        </div>
                    </aside>

                </div>
            </section>
        </main>
    );
}