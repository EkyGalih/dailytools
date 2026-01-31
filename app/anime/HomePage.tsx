'use client'

import { useState } from 'react'
import AnimeCard from "@/components/anime/AnimeCard";
import AnimeHero from "@/components/anime/AnimeHero";
import GenreSidebar from "@/components/anime/GenreSidebar";
import AnimeSearch from "@/components/anime/AnimeSearch";

export default function HomePageClient({ initialData, genres }: { initialData: any, genres: any }) {
    const [searchResults, setSearchResults] = useState<any[] | null>(null)
    const [searchQuery, setSearchQuery] = useState('')

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
            <AnimeHero />

            <section id="content" className="px-4 lg:px-20 mt-10">
                <div className="grid grid-cols-12 gap-8">

                    <div className="col-span-12 lg:col-span-9">
                        {/* JIKA SEDANG MENCARI */}
                        {searchQuery ? (
                            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                                <div className="flex items-center justify-between mb-8">
                                    <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-widest border-l-4 border-orange-600 pl-4">
                                        Hasil Pencarian: <span className="text-orange-500">{searchQuery}</span>
                                    </h2>
                                    <AnimeSearch onSearchResult={(data, query) => {
                                        setSearchResults(data)
                                        setSearchQuery(query)
                                    }} />
                                </div>

                                {searchResults && searchResults.length > 0 ? (
                                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
                                        {searchResults?.map((anime: any) => (
                                            <AnimeCard
                                                key={anime.endpoint}
                                                title={anime.title}
                                                thumbnail={anime.thumbnail}
                                                endpoint={anime.endpoint}
                                                episode={anime.status}
                                                info={anime.rating !== "-" ? `⭐ ${anime.rating}` : "N/A"}
                                                update={anime.genres?.[0] || ""}
                                                link=""
                                            />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="py-20 text-center bg-zinc-900/20 rounded-3xl border border-dashed border-zinc-800">
                                        <p className="text-zinc-500 font-bold uppercase tracking-widest">Anime tidak ditemukan</p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            /* KONTEN DEFAULT (UPDATE & COMPLETE) */
                            <div className="animate-in fade-in duration-500">
                                {/* Update Terbaru */}
                                <div className="flex items-center mt-5 justify-between mb-8">
                                    <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-widest border-l-4 border-orange-600 pl-4">
                                        Update Terbaru
                                    </h2>
                                    <div className="h-[1px] flex-grow bg-zinc-800 mx-6 hidden md:block"></div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6 mb-16">
                                    {initialData?.data?.ongoing?.map((anime: any) => (
                                        <AnimeCard key={anime.endpoint} {...anime} />
                                    ))}
                                </div>

                                {/* Anime Selesai */}
                                <div className="flex items-center mt-5 justify-between mb-8">
                                    <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-widest border-l-4 border-orange-600 pl-4">
                                        Anime Selesai
                                    </h2>
                                    <div className="h-[1px] flex-grow bg-zinc-800 mx-6 hidden md:block"></div>
                                </div>
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
                                    {initialData?.data?.complete?.map((item: any) => (
                                        <AnimeCard key={item.endpoint} {...item} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* RIGHT CONTENT: SEARCH & SIDEBAR */}
                    <div className="col-span-12 lg:col-span-3">
                        <GenreSidebar genres={genres} activeSlug="" />
                    </div>

                </div>
            </section>
        </main>
    );
}