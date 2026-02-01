"use client"

import { useEffect, useState } from "react"
import { searchKomik } from "@/libs/komik/komik"

interface Props {
    onSearchResult: (results: any[] | null, query: string) => void
    externalQuery: string
}

export default function ManhwaSearchClient({
    onSearchResult,
    externalQuery,
}: Props) {
    const [query, setQuery] = useState(externalQuery)
    const [loading, setLoading] = useState(false)

    // Sync query dari luar
    useEffect(() => {
        setQuery(externalQuery)
    }, [externalQuery])

    // ✅ Search debounce (NO infinite)
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
    }, [query]) // ✅ ONLY query

    return (
        <div className="max-w-2xl w-full relative group">
            {/* 1. DIGITAL AURA */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-cyan-500 rounded-2xl blur opacity-10 group-focus-within:opacity-40 transition-opacity duration-700 animate-gradient-x" />

            <div className="relative flex items-center">
                {/* 2. ICON / LOADING */}
                <div className="absolute left-6 z-20 flex items-center justify-center">
                    {loading ? (
                        <div className="relative w-6 h-6">
                            <div className="absolute inset-0 border-2 border-cyan-500/20 rounded-full" />
                            <div className="absolute inset-0 border-2 border-t-cyan-400 rounded-full animate-spin" />
                        </div>
                    ) : (
                        <div className="relative group-focus-within:scale-110 transition-transform">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="3"
                                className="text-zinc-500 group-focus-within:text-cyan-400 transition-colors"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                />
                            </svg>

                            {/* Crosshair */}
                            <div className="absolute -inset-1 border border-cyan-500/0 group-focus-within:border-cyan-500/40 transition-all rounded-sm scale-150 opacity-0 group-focus-within:opacity-100" />
                        </div>
                    )}
                </div>

                {/* 3. INPUT */}
                <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Input Search Query..."
                    className="w-full pl-16 pr-32 py-5 rounded-xl bg-[#070708] border border-white/[0.08] text-white placeholder:text-zinc-600 focus:border-cyan-500/60 outline-none transition-all duration-300 shadow-[inset_0_0_20px_rgba(0,0,0,1)] uppercase text-xs font-black tracking-widest"
                />

                {/* 4. HUD RIGHT */}
                <div className="absolute right-4 hidden md:flex items-center gap-3 pointer-events-none select-none">
                    <div className="flex flex-col items-end">
                        <span className="text-[7px] font-black text-cyan-500/50 uppercase tracking-[0.3em] leading-none">
                            Status
                        </span>
                        <span className="text-[9px] font-black text-white group-focus-within:text-cyan-400 transition-colors">
                            {loading ? "SEARCHING..." : "READY"}
                        </span>
                    </div>

                    <div className="w-[1px] h-8 bg-white/10 group-focus-within:bg-cyan-500/40 transition-colors" />
                </div>
            </div>

            {/* 5. FOCUS BAR */}
            <div className="absolute -bottom-1 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent scale-x-0 group-focus-within:scale-x-100 transition-transform duration-500" />

            {/* 6. FOOTER HUD */}
            <div className="mt-3 flex justify-between px-2">
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em] group-focus-within:text-zinc-400">
                    System Interface v4.0
                </span>
                <span className="text-[8px] font-black text-zinc-600 uppercase tracking-[0.2em]">
                    Ready to Sync
                </span>
            </div>
        </div>
    )
}