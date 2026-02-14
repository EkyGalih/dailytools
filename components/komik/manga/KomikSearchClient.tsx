"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState, useRef } from "react"
import { Search, Loader2, Command, X } from "lucide-react"

export default function KomikSearchClient() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const inputRef = useRef<HTMLInputElement>(null)

    const urlQuery = searchParams.get("q") || ""
    const [query, setQuery] = useState(urlQuery)
    const [isFocused, setIsFocused] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Update state kalau URL berubah (misal tombol reset ditekan di parent)
    useEffect(() => {
        setQuery(urlQuery)
    }, [urlQuery])

    // Fungsi Utama Pencarian
    const handleSearch = (e?: React.FormEvent) => {
        if (e) e.preventDefault()

        if (!query.trim()) {
            router.replace("/komik/manga")
            return
        }

        setIsLoading(true)
        router.replace(`/komik/manga?q=${encodeURIComponent(query.trim())}`)

        // Simulasi loading selesai setelah navigasi (atau sesuaikan dengan kebutuhan)
        setTimeout(() => setIsLoading(false), 500)
    }

    // Shortcut Keyboard (Tekan '/' untuk fokus)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "/" && !isFocused) {
                e.preventDefault()
                inputRef.current?.focus()
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isFocused])

    return (
        <form
            onSubmit={handleSearch}
            className="relative w-full max-w-4xl mx-auto group"
        >
            {/* 🌈 DYNAMIC OUTER GLOW */}
            <div className={`absolute -inset-1 bg-gradient-to-r from-orange-600 via-amber-500 to-orange-400 rounded-[2.2rem] blur-xl opacity-0 transition-opacity duration-500 ${isFocused ? 'opacity-20' : 'group-hover:opacity-10'}`} />

            <div className={`relative flex items-center bg-[#0c0c0e]/90 backdrop-blur-2xl rounded-[1.8rem] border transition-all duration-500 p-1.5 ${isFocused ? 'border-orange-500/50 shadow-2xl' : 'border-white/5'}`}>

                {/* ICON SEARCH (Decorative) */}
                <div className="pl-5 pr-2 hidden md:block">
                    <Search className={`w-5 h-5 transition-colors ${isFocused ? 'text-orange-500' : 'text-zinc-600'}`} />
                </div>

                {/* INPUT FIELD */}
                <input
                    ref={inputRef}
                    value={query}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Eksplorasi Mahakarya..."
                    className="flex-1 px-4 md:px-2 py-4 md:py-5 bg-transparent text-white outline-none placeholder:text-zinc-700 font-bold text-sm md:text-base tracking-wide"
                />

                {/* CLEAR BUTTON */}
                {query.length > 0 && (
                    <button
                        type="button"
                        onClick={() => { setQuery(""); router.replace("/komik/manga"); }}
                        className="p-2 mr-2 rounded-xl hover:bg-white/5 text-zinc-500 transition-colors"
                    >
                        <X size={18} />
                    </button>
                )}

                {/* SEARCH BUTTON (THE ACTION) */}
                <button
                    type="submit"
                    disabled={isLoading}
                    className="flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 bg-orange-600 hover:bg-orange-500 text-white rounded-[1.4rem] font-black uppercase tracking-widest text-[10px] md:text-[12px] transition-all active:scale-95 shadow-lg shadow-orange-600/20"
                >
                    {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <>
                            <span className="hidden md:inline">Search</span>
                            <Search className="w-4 h-4 md:hidden" />
                        </>
                    )}
                </button>
            </div>

            {/* HINT SHORTCUT */}
            {!isFocused && !query && (
                <div className="absolute right-36 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/[0.03] pointer-events-none">
                    <Command size={10} className="text-zinc-600" />
                    <span className="text-[10px] font-black text-zinc-600">/</span>
                </div>
            )}
        </form>
    )
}