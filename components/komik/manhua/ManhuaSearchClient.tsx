"use client"

import { useEffect, useState } from "react"
import { searchKomik } from "@/libs/komik/komik"

interface Props {
    onSearchResult: (results: any[] | null, query: string) => void
    externalQuery: string
}

export default function ManhuaSearchClient({
    onSearchResult,
    externalQuery,
}: Props) {
    const [query, setQuery] = useState(externalQuery)
    const [loading, setLoading] = useState(false)

    // ✅ kalau externalQuery berubah, sync ke input
    useEffect(() => {
        setQuery(externalQuery)
    }, [externalQuery])

    // ✅ Search Effect (Debounce + No Infinite Loop)
    useEffect(() => {
        // kalau kosong → reset hasil
        if (!query.trim()) {
            onSearchResult(null, "")
            return
        }

        let active = true // guard supaya request lama gak update state

        const delay = setTimeout(async () => {
            setLoading(true)

            const data = await searchKomik(query)

            if (active) {
                onSearchResult(data, query)
                setLoading(false)
            }
        }, 600)

        return () => {
            active = false
            clearTimeout(delay)
        }
    }, [query]) // ✅ cuma query saja (ini kunci anti infinite loop)

    return (
        <div className="max-w-2xl w-full relative group mx-auto lg:mx-0">
            {/* Ambient Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-[2rem] blur opacity-0 group-focus-within:opacity-20 transition duration-1000" />

            <div className="relative flex items-center">
                {/* ICON SEARCH / LOADING */}
                <div className="absolute left-6 z-10 flex items-center justify-center pointer-events-none">
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-emerald-500/20 border-t-emerald-500 rounded-full animate-spin" />
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="22"
                            height="22"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2.5"
                            className="text-zinc-500 group-focus-within:text-emerald-400 transition-colors duration-300"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    )}
                </div>

                {/* INPUT */}
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari judul manhua, kultivasi, sistem..."
                    className="w-full pl-16 pr-10 py-5 rounded-[1.5rem]
          bg-[#050606]/60 backdrop-blur-2xl
          border border-emerald-500/10
          text-white placeholder:text-zinc-600
          focus:border-emerald-500/50
          focus:ring-4 focus:ring-emerald-500/5
          outline-none transition-all duration-300
          shadow-[0_10px_40px_rgba(0,0,0,0.6)]
          group-hover:border-emerald-500/20"
                />

                {/* Decorative Right */}
                <div className="absolute right-6 hidden md:flex items-center gap-2 pointer-events-none">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/40 animate-pulse" />
                    <span className="text-[9px] font-black text-emerald-500/40 uppercase tracking-[0.3em]">
                        Spirit Sense
                    </span>
                </div>
            </div>

            {/* Bottom Glow Line */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[85%] h-[1px] bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent opacity-0 group-focus-within:opacity-100 transition-opacity duration-500" />

            {/* Trending Suggestion */}
            <div className="mt-4 flex flex-wrap gap-3 px-2">
                <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest">
                    Trending:
                </span>

                {["Cultivation", "Martial Arts", "System", "Rebirth"].map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="text-[10px] font-bold text-zinc-500 hover:text-emerald-400 transition-colors uppercase tracking-wider"
                    >
                        #{tag}
                    </button>
                ))}
            </div>
        </div>
    )
}