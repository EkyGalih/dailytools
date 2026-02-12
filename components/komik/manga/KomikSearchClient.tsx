"use client"

import { useEffect, useState } from "react"
import { searchKomik } from "@/libs/komik/komik"

interface Props {
    onSearchResult: (results: any[] | null, query: string) => void
    externalQuery: string
}

export default function KomikSearchClient({
    onSearchResult,
    externalQuery,
}: Props) {
    const [query, setQuery] = useState(externalQuery)
    const [loading, setLoading] = useState(false)

    // Sync external query
    useEffect(() => {
        setQuery(externalQuery)
    }, [externalQuery])

    // ✅ Search Effect (No Infinite)
    useEffect(() => {
        if (!query.trim()) {
            onSearchResult(null, "")
            return
        }

        let active = true

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
    }, [query]) // ✅ ONLY QUERY


    return (
        <div className="max-w-2xl w-full relative group">
            {/* EFFECT */}
            <div className="absolute -inset-2 bg-gradient-to-r from-orange-500/20 via-transparent to-orange-500/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-700 blur-xl pointer-events-none" />

            <div className="relative flex items-center">
                {/* ICON */}
                <div className="absolute left-6 z-10">
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-orange-500/20 border-t-orange-500 rounded-full animate-spin" />
                    ) : (
                        <svg
                            viewBox="0 0 24 24"
                            className="w-5 h-5 text-zinc-500 group-focus-within:text-orange-500 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
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
                    placeholder="Cari judul manga (e.g. One Piece, Jujutsu)..."
                    className="w-full pl-16 pr-24 py-5 rounded-xl bg-zinc-950 border-2 border-zinc-800 text-white placeholder:text-zinc-600 focus:border-orange-500 outline-none transition-all duration-300 shadow-[8px_8px_0px_rgba(249,115,22,0.1)] focus:shadow-[4px_4px_0px_rgba(249,115,22,1)]"
                />

                {/* DECOR */}
                <div className="absolute right-4 pointer-events-none select-none">
                    <span className="text-[10px] font-black text-zinc-700 group-focus-within:text-orange-500/50 uppercase italic tracking-tighter">
                        探す (Search)
                    </span>
                </div>
            </div>

            {/* QUICK TAGS */}
            <div className="mt-4 flex flex-wrap gap-2 px-1">
                {["Shonen", "Seinen", "Action", "Romance"].map((tag) => (
                    <button
                        key={tag}
                        onClick={() => setQuery(tag)}
                        className="px-3 py-1 rounded-md bg-zinc-900 border border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all"
                    >
                        {tag}
                    </button>
                ))}
            </div>
        </div>
    )
}