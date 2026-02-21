"use client"

import { useState, useRef, FormEvent } from "react"
import { useRouter } from "next/navigation"
import { Search, X, Sparkles, Command, ArrowRight } from "lucide-react"

export default function NetshortSearchBar({ query }: { query: string }) {
    const router = useRouter()
    const [text, setText] = useState(query)
    const [isFocused, setIsFocused] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)

    // Handler Pencarian (Dijalankan saat Enter atau klik tombol Search)
    const handleSearch = (e?: FormEvent) => {
        if (e) e.preventDefault() // Stop page reload

        const trimmedText = text.trim()
        if (trimmedText) {
            router.push(`?query=${encodeURIComponent(trimmedText)}`)
        } else {
            router.push(`?`)
        }
    }

    const handleClear = () => {
        setText("")
        router.push("?")
        inputRef.current?.focus()
    }

    return (
        <div className="relative w-full max-w-3xl mx-auto mb-16 px-4 md:px-0 group">
            {/* Ambient Background Glow (Hanya saat fokus) */}
            <div className={`absolute -inset-4 bg-gradient-to-r from-rose-500/10 via-indigo-500/10 to-emerald-500/10 rounded-[3rem] blur-3xl transition-opacity duration-700 ${isFocused ? 'opacity-100' : 'opacity-0'}`} />

            <div className="relative">
                {/* FORM WRAPPER: Biar Enter otomatis jalan */}
                <form
                    onSubmit={handleSearch}
                    className={`relative flex items-center gap-2 bg-white/80 backdrop-blur-xl border transition-all duration-500 p-2 md:p-2 ${isFocused
                            ? 'rounded-[2rem] border-rose-200 shadow-[0_20px_50px_rgba(225,29,72,0.1)] scale-[1.01]'
                            : 'rounded-[2.5rem] border-zinc-100 shadow-[0_10px_30px_rgba(0,0,0,0.03)]'
                        }`}>

                    {/* Icon Section */}
                    <div className="pl-4 flex items-center text-zinc-400">
                        <Search size={20} strokeWidth={2.5} className={isFocused ? 'text-rose-500' : ''} />
                    </div>

                    {/* Input Field */}
                    <input
                        ref={inputRef}
                        type="text"
                        value={text}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Cari drama..."
                        className="flex-1 bg-transparent border-none focus:ring-0 text-base font-bold text-zinc-800 placeholder:text-zinc-300 placeholder:font-bold italic outline-none tracking-tight py-3"
                    />

                    {/* Clear Button (Muncul kalau ada teks) */}
                    {text && (
                        <button
                            type="button"
                            onClick={handleClear}
                            className="p-2 hover:bg-zinc-100 rounded-2xl text-zinc-400 hover:text-rose-500 transition-all active:scale-90"
                        >
                            <X size={20} strokeWidth={3} />
                        </button>
                    )}

                    {/* Desktop Command Hint */}
                    {!text && (
                        <div className="hidden md:flex items-center gap-1 px-3 py-2 bg-zinc-50 border border-zinc-100 rounded-xl text-zinc-300 mr-2">
                            <Command size={10} />
                            <span className="text-[9px] font-black uppercase">Enter</span>
                        </div>
                    )}

                    {/* MAIN SEARCH BUTTON */}
                    <button
                        type="submit"
                        className="flex items-center gap-2 px-6 py-3.5 bg-zinc-900 text-white rounded-[1.6rem] text-[11px] font-black uppercase tracking-[0.1em] hover:bg-rose-600 transition-all hover:shadow-lg active:scale-95 group/btn shadow-xl shadow-zinc-200"
                    >
                        <span className="hidden sm:inline">Cari</span>
                        <ArrowRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                </form>

                {/* --- TRENDING TAGS (Klik langsung cari) --- */}
                <div className={`mt-6 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 transition-all duration-500 ${isFocused ? 'opacity-100 translate-y-0' : 'opacity-60'}`}>
                    <div className="flex items-center gap-2">
                        <Sparkles size={12} className="text-amber-500 fill-amber-500" />
                        <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest italic">Populer:</span>
                    </div>

                    <div className="flex flex-wrap justify-center gap-4">
                        {['Pewaris', 'CEO', 'Balas Dendam'].map((tag) => (
                            <button
                                key={tag}
                                type="button"
                                onClick={() => {
                                    setText(tag);
                                    // Langsung push router karena ini klik tag
                                    router.push(`?query=${encodeURIComponent(tag)}`);
                                }}
                                className="text-[11px] font-black text-zinc-500 hover:text-rose-600 transition-colors uppercase italic tracking-tighter"
                            >
                                #{tag}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}