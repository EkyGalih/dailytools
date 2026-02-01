"use client"

import { useEffect, useState } from "react"
import { searchKomik } from "@/libs/komik/komik"

interface Props {
    onSearchResult: (results: any[] | null, query: string) => void;
    externalQuery: string;
}

export default function KomikSearchClient({ onSearchResult, externalQuery }: Props) {
    const [query, setQuery] = useState(externalQuery)
    const [loading, setLoading] = useState(false)

    // Sinkronisasi dengan tombol "Bersihkan" dari Parent
    useEffect(() => {
        setQuery(externalQuery)
    }, [externalQuery])

    // ===============================
    // SEARCH LOGIC (Debounce)
    // ===============================
    useEffect(() => {
        if (!query.trim()) {
            onSearchResult(null, "")
            return
        }

        const delay = setTimeout(async () => {
            setLoading(true)
            const data = await searchKomik(query)

            // Kirim data ke Parent (MangaClientPage)
            onSearchResult(data, query)
            setLoading(false)
        }, 600)

        return () => clearTimeout(delay)
    }, [query])

    return (
        <div className="max-w-xl relative group">
            {/* SEARCH INPUT */}
            <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Cari manga favorit..."
                className="w-full px-14 py-4 rounded-[2rem] bg-zinc-900/50 backdrop-blur-md border border-zinc-800 text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-2xl"
            />

            {/* IKON SEARCH */}
            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors">
                {loading ? (
                    <div className="w-5 h-5 border-2 border-zinc-500 border-t-orange-500 rounded-full animate-spin" />
                ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                        <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                    </svg>
                )}
            </div>
        </div>
    )
}