"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Search, X, Loader2 } from "lucide-react"

export default function FreereelsSearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [query, setQuery] = useState(searchParams.get("query") || "")
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setQuery(searchParams.get("query") || "")
        setIsLoading(false)
    }, [searchParams])

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        const trimmedQuery = query.trim()
        if (!trimmedQuery) return handleReset()

        setIsLoading(true)
        // Arahkan ke halaman melolo dengan query
        router.push(`/drama/china/channel/freereels?query=${encodeURIComponent(trimmedQuery)}`)
    }

    function handleReset() {
        setQuery("")
        router.push("/drama/china/channel/freereels")
    }

    return (
        <section className="w-full max-w-3xl mx-auto mb-16 px-2">
            <form onSubmit={handleSearch} className="relative group transition-all duration-300" role="search">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-pink-500 rounded-[2rem] blur opacity-10 group-focus-within:opacity-25 transition duration-500"></div>
                <div className="relative flex items-center bg-white border border-zinc-200 rounded-2xl md:rounded-[2rem] shadow-sm backdrop-blur-sm transition-all group-focus-within:border-indigo-300 group-focus-within:shadow-xl">
                    <div className="pl-6 text-zinc-400">
                        {isLoading ? <Loader2 className="w-5 h-5 animate-spin text-indigo-500" /> : <Search className="w-5 h-5 group-focus-within:text-indigo-600" />}
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari drama Flickreels..."
                        className="w-full bg-transparent border-none px-4 py-5 md:py-6 text-base md:text-lg text-zinc-800 focus:ring-0 outline-none font-medium placeholder:text-zinc-300"
                    />
                    <div className="flex items-center gap-2 pr-4">
                        {query && (
                            <button type="button" onClick={handleReset} className="p-2 text-zinc-300 hover:text-zinc-600 transition-all">
                                <X size={20} />
                            </button>
                        )}
                        <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 md:px-8 py-2 md:py-3 rounded-xl md:rounded-[1.5rem] text-sm font-black uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-indigo-200">
                            <span className="hidden md:inline">Cari</span>
                            <Search className="w-4 h-4 md:hidden" />
                        </button>
                    </div>
                </div>
            </form>
        </section>
    )
}