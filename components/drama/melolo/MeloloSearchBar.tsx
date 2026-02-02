"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Search, X, Loader2 } from "lucide-react"

export default function MeloloSearchBar() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const [query, setQuery] = useState(searchParams.get("query") || "")
    const [isLoading, setIsLoading] = useState(false)

    // Sync state dengan URL jika user menekan tombol 'back' di browser
    useEffect(() => {
        setQuery(searchParams.get("query") || "")
        setIsLoading(false)
    }, [searchParams])

    function handleSearch(e: React.FormEvent) {
        e.preventDefault()
        const trimmedQuery = query.trim()

        setIsLoading(true)
        if (!trimmedQuery) {
            router.push("/drama/china/channel/melolo")
        } else {
            router.push(`/drama/china/channel/melolo?query=${encodeURIComponent(trimmedQuery)}`)
        }
    }

    function handleReset() {
        setQuery("")
        router.push("/drama/china/channel/melolo")
    }

    return (
        <section className="w-full max-w-3xl mx-auto mb-10 px-2">
            <form
                onSubmit={handleSearch}
                className="relative group transition-all duration-300"
                role="search"
            >
                {/* Background Glow Effect (Hover) */}
                <div className="absolute -inset-1 bg-gradient-to-r from-rose-400 to-orange-400 rounded-[2rem] blur opacity-10 group-focus-within:opacity-25 transition duration-500"></div>

                <div className="relative flex items-center bg-white border border-zinc-200/80 rounded-2xl md:rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-sm transition-all duration-300 group-focus-within:border-zinc-400 group-focus-within:shadow-[0_20px_40px_rgba(0,0,0,0.06)]">

                    {/* Icon Search */}
                    <div className="pl-5 md:pl-7 text-zinc-400">
                        {isLoading ? (
                            <Loader2 className="w-5 h-5 animate-spin text-rose-500" />
                        ) : (
                            <Search className="w-5 h-5 group-focus-within:text-zinc-900 transition-colors" />
                        )}
                    </div>

                    {/* Input Field */}
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari judul drama, aktor, atau genre..."
                        aria-label="Cari drama Melolo"
                        className="w-full bg-transparent border-none px-4 py-5 md:py-6 text-base md:text-lg text-zinc-800 placeholder:text-zinc-400 focus:ring-0 outline-none font-medium"
                    />

                    {/* Action Buttons */}
                    <div className="flex items-center gap-1 pr-3 md:pr-4">
                        {query && (
                            <button
                                type="button"
                                onClick={handleReset}
                                title="Reset pencarian"
                                className="p-2 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100 rounded-full transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        )}

                        <div className="w-[1px] h-6 bg-zinc-200 mx-1 hidden md:block"></div>

                        <button
                            type="submit"
                            className="bg-zinc-900 hover:bg-zinc-800 text-white px-5 md:px-8 py-2 md:py-3 rounded-xl md:rounded-[1.5rem] text-sm font-semibold transition-all active:scale-95 shadow-lg shadow-black/10"
                        >
                            <span className="hidden md:inline">Cari</span>
                            <Search className="w-4 h-4 md:hidden" />
                        </button>
                    </div>
                </div>

                {/* SEO Friendly Hint */}
                <p className="mt-3 text-center text-xs md:text-sm text-zinc-400 font-light">
                    Tekan <kbd className="font-sans px-1.5 py-0.5 rounded border border-zinc-200 bg-zinc-50">Enter</kbd> untuk mencari koleksi drama terbaru
                </p>
            </form>
        </section>
    )
}