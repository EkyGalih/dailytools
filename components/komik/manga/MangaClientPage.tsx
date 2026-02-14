'use client'

import { useState } from "react"
import KomikRecommendedCard from "@/components/komik/manga/KomikRecommendedCard"
import KomikSearchClient from "@/components/komik/manga/KomikSearchClient"
import MangaHero from "./MangaHero"
import KomikSearchCard from "./KomikSearchCard"
import KomikPopularCard from "./KomikPopularCard"
import KomikLatestMiniCard from "@/components/komik/manga/KomikLatestMiniCard"
import { useRouter } from "next/navigation"
import { Zap, Sparkles, LayoutGrid } from "lucide-react"

export default function MangaClientPage({
    initialSearchResults,
    initialSearchQuery,
    initialPopularManga,
    initialPopulaManhwa,
    initialPopulaManhua,
    initialLatest,
    initialLatestMirror,
    initialPopularKomik,
    initialPopularMeta
}: any) {
    const router = useRouter()

    // --- TETAP MENJAGA STATE LAMA ---
    const [activeType, setActiveType] = useState<"project" | "mirror">("project")
    const [popularType, setPopularType] = useState<"manga" | "manhwa" | "manhua">("manga")
    const [popularData, setPopularData] = useState<any[]>(initialPopularKomik || [])
    const [popularPage, setPopularPage] = useState(initialPopularMeta?.page || 1)
    const [totalPopularPage, setTotalPopularPage] = useState<number | null>(
        initialPopularMeta?.total_page || null
    )
    const [loadingPopular, setLoadingPopular] = useState(false)

    // --- TETAP MENJAGA LOGIKA FETCHING LAMA ---
    async function loadMorePopular() {
        if (loadingPopular) return
        if (totalPopularPage && popularPage >= totalPopularPage) return
        setLoadingPopular(true)
        try {
            const nextPage = popularPage + 1
            const res = await fetch(`https://api.sansekai.my.id/api/komik/popular?page=${nextPage}`)
            if (!res.ok) throw new Error("Fetch failed")
            const json = await res.json()
            if (Array.isArray(json?.data)) {
                setPopularData(prev => [...prev, ...json.data])
                setPopularPage(nextPage)
            }
            if (json?.meta?.total_page) {
                setTotalPopularPage(json.meta.total_page)
            }
        } catch (err) {
            console.error("Load More Error:", err)
        }
        setLoadingPopular(false)
    }

    return (
        <main className="min-h-screen bg-[#050507] text-zinc-100 pb-24 selection:bg-orange-500/30">
            {/* 🌈 AMBIENT FUSION BACKGROUND */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-orange-600/5 via-transparent to-transparent" />
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[10%] left-[-10%] w-[50%] h-[50%] bg-red-600/5 blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            <div className="relative z-10">
                <MangaHero
                    title="Paviliun"
                    highlight="Omniverse"
                    badge="Across Three Borders"
                    desc="Satu cakrawala untuk tiga mahakarya: Keindahan monokrom Jepang, dinamika neon Korea, dan kemegahan legenda China."
                />

                {/* SEARCH BAR SECTION */}
                <section className="px-4 lg:px-20 -mt-12 relative z-30 max-w-5xl mx-auto">
                    <KomikSearchClient />
                </section>

                <section className="px-4 lg:px-20 mt-24 max-w-[1600px] mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-12 xl:gap-20">

                        {/* KONTEN UTAMA */}
                        <div className="min-h-[60vh]">
                            {initialSearchQuery ? (
                                /* 🔍 SEARCH VIEW */
                                <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
                                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-10">
                                        <div className="space-y-2">
                                            <p className="text-orange-500 text-[10px] font-black uppercase tracking-[0.4em]">Scan Results</p>
                                            <h2 className="text-3xl md:text-5xl font-black italic tracking-tighter uppercase text-white leading-none">
                                                Query: <span className="text-orange-400">{initialSearchQuery}</span>
                                            </h2>
                                        </div>
                                        <button
                                            onClick={() => router.replace("/komik/manga")}
                                            className="px-8 py-4 bg-zinc-900/80 hover:bg-orange-600 border border-white/10 hover:border-orange-500 rounded-[2rem] text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-2xl"
                                        >
                                            Clear X
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                        {initialSearchResults?.map((manga: any) => (
                                            <KomikSearchCard key={manga.manga_id} manga={manga} />
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                /* 🏠 HOME VIEW */
                                <div className="space-y-32">

                                    {/* SECTION: TRENDING SELECTION */}
                                    <section className="space-y-12">
                                        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                                            <div className="space-y-3">
                                                <div className="flex items-center gap-2">
                                                    <div className="h-1 w-10 bg-orange-600 rounded-full" />
                                                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">Universal Hub</span>
                                                </div>
                                                <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
                                                    🔥 Populer <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-cyan-400 to-emerald-400 uppercase">Selection</span>
                                                </h2>
                                            </div>

                                            {/* DYNAMIC TOGGLE */}
                                            <div className="flex items-center p-1.5 bg-zinc-950 rounded-[2rem] border border-white/5 overflow-x-auto no-scrollbar shadow-2xl">
                                                {[
                                                    { id: 'manga', label: 'Manga', color: 'bg-red-600' },
                                                    { id: 'manhwa', label: 'Manhwa', color: 'bg-cyan-600' },
                                                    { id: 'manhua', label: 'Manhua', color: 'bg-emerald-600' }
                                                ].map((type) => (
                                                    <button
                                                        key={type.id}
                                                        onClick={() => setPopularType(type.id as any)}
                                                        className={`whitespace-nowrap px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] rounded-[1.5rem] transition-all duration-500 ${popularType === type.id
                                                                ? `${type.color} text-white shadow-xl`
                                                                : "text-zinc-600 hover:text-white"
                                                            }`}
                                                    >
                                                        {type.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12 animate-in fade-in duration-1000">
                                            {(popularType === "manga"
                                                ? initialPopularManga
                                                : popularType === "manhwa"
                                                    ? initialPopulaManhwa
                                                    : initialPopulaManhua
                                            ).map((manga: any) => (
                                                <KomikRecommendedCard
                                                    key={manga.manga_id}
                                                    manga={manga}
                                                    activeType={popularType}
                                                />
                                            ))}
                                        </div>
                                    </section>

                                    {/* SECTION: MOST READ */}
                                    <section className="space-y-12">
                                        <div className="space-y-4">
                                            <div className="flex items-center gap-3">
                                                <Sparkles size={18} className="text-orange-500" />
                                                <span className="text-[10px] font-black uppercase tracking-[0.5em] text-zinc-500">Hall of Fame</span>
                                            </div>
                                            <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter text-white leading-[0.85]">
                                                ⭐ Komik <span className="text-orange-600">Popular</span>
                                            </h2>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-10">
                                            {popularData?.map((manga: any) => (
                                                <KomikPopularCard key={manga.manga_id} manga={manga} />
                                            ))}
                                        </div>

                                        <div className="flex justify-center">
                                            <button
                                                onClick={loadMorePopular}
                                                disabled={loadingPopular || (totalPopularPage !== null && popularPage >= totalPopularPage)}
                                                className="group relative px-12 py-5 rounded-[2.5rem] bg-zinc-900 border border-white/10 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-white hover:border-orange-500/50 transition-all active:scale-95 disabled:opacity-50"
                                            >
                                                <span className="relative z-10">{loadingPopular ? "Fetching..." : "Load More Experience"}</span>
                                            </button>
                                        </div>
                                    </section>
                                </div>
                            )}
                        </div>

                        {/* SIDEBAR */}
                        <aside className="hidden lg:block">
                            <div className="sticky top-32 space-y-12">
                                <div className="space-y-8">
                                    <div className="flex items-center justify-between border-b border-white/5 pb-6">
                                        <h3 className="text-sm font-black uppercase italic tracking-[0.2em] text-white flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-orange-600 animate-ping" />
                                            Live Feed
                                        </h3>
                                        <div className="flex items-center p-1 bg-zinc-950 rounded-2xl border border-white/5">
                                            {[
                                                { id: 'project', label: 'Orig', color: 'bg-orange-600' },
                                                { id: 'mirror', label: 'Mirr', color: 'bg-purple-600' }
                                            ].map((t) => (
                                                <button
                                                    key={t.id}
                                                    onClick={() => setActiveType(t.id as any)}
                                                    className={`px-4 py-2 text-[9px] font-black uppercase tracking-widest rounded-xl transition-all ${activeType === t.id ? `${t.color} text-white` : "text-zinc-600"
                                                        }`}
                                                >
                                                    {t.label}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-4">
                                        {(activeType === "project" ? initialLatest : initialLatestMirror)
                                            .slice(0, 8)
                                            .map((manga: any) => (
                                                <KomikLatestMiniCard key={manga.manga_id} manga={manga} />
                                            ))}
                                    </div>
                                </div>
                            </div>
                        </aside>

                    </div>
                </section>
            </div>
        </main>
    )
}