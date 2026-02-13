'use client'

import { useEffect, useState } from 'react'
import { searchAnime } from '@/libs/anime/anime'

interface Props {
    onSearchResult: (data: any | null, query: string) => void;
    externalQuery?: string; // Tambahkan ini
}
export default function AnimeSearch({ onSearchResult, externalQuery }: Props) {
    const [query, setQuery] = useState('')
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setQuery(externalQuery ?? "")
    }, [externalQuery])

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!query.trim()) {
            onSearchResult(null, '')
            return
        }

        try {
            setLoading(true)

            const res = await fetch(
                `https://api.sansekai.my.id/api/anime/search?query=${encodeURIComponent(query)}`
            )

            if (!res.ok) throw new Error("Fetch gagal")

            const data = await res.json()

            const result = data?.data?.[0]?.result || []

            onSearchResult(result, query)
        } catch (err) {
            console.error("Search error:", err)
            onSearchResult([], query)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mb-8">
            <form onSubmit={handleSearch} className="relative group">
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari anime favorit..."
                    className="w-full bg-zinc-900/50 border border-zinc-800 text-white text-sm px-5 py-4 rounded-2xl focus:outline-none focus:border-orange-600 focus:ring-1 focus:ring-orange-600 transition-all placeholder:text-zinc-600 shadow-xl"
                />
                <button
                    type="submit"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-orange-600 hover:bg-orange-500 text-white rounded-xl transition-all active:scale-90"
                >
                    {loading ? (
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
                    )}
                </button>
            </form>
        </div>
    )
}