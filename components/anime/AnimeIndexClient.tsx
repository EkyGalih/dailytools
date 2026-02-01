"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function AnimeIndexClient({
    grouped,
}: {
    grouped: Record<string, any[]>
}) {
    const alphabet = "#ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

    // ===============================
    // STATE
    // ===============================
    const [activeLetter, setActiveLetter] = useState("#")
    const [search, setSearch] = useState("")

    // ===============================
    // OBSERVER ACTIVE LETTER
    // ===============================
    useEffect(() => {
        const sections = alphabet.map((l) =>
            document.getElementById(`section-${l}`)
        )

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveLetter(entry.target.id.replace("section-", ""))
                    }
                })
            },
            {
                rootMargin: "-30% 0px -60% 0px",
            }
        )

        sections.forEach((sec) => sec && observer.observe(sec))

        return () => observer.disconnect()
    }, [])

    // ===============================
    // FILTER SEARCH
    // ===============================
    const filteredGrouped: Record<string, any[]> = {}

    alphabet.forEach((letter) => {
        const list = grouped[letter] || []

        filteredGrouped[letter] = list.filter((anime) =>
            anime.title.toLowerCase().includes(search.toLowerCase())
        )
    })

    return (
        <main className="min-h-screen bg-[#09090b] text-white pb-20">
            {/* HERO */}
            <section className="relative pt-28 pb-16 px-6 lg:px-20 border-b border-zinc-800/50 overflow-hidden bg-[#09090b]">
                {/* Dekorasi Latar Belakang (Ambient Glow) */}
                <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                    <div className="absolute -top-24 -left-24 w-96 h-96 bg-orange-600/10 blur-[120px] rounded-full" />
                    <div className="absolute top-1/2 -right-24 w-64 h-64 bg-zinc-800/20 blur-[100px] rounded-full" />
                </div>

                <div className="relative z-10">
                    {/* Label Kecil (Micro-copy) */}
                    <div className="flex items-center gap-2 mb-4 animate-fade-in">
                        <span className="w-8 h-[2px] bg-orange-600 rounded-full" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500">
                            Perpustakaan Anime
                        </span>
                    </div>

                    {/* Judul Utama */}
                    <h1 className="text-5xl md:text-6xl lg:text-6xl font-black uppercase tracking-tighter leading-[1.1] text-white italic py-2 pr-4">
                        Anime <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">Index</span>
                    </h1>

                    {/* Deskripsi */}
                    <p className="text-zinc-400 mt-6 text-sm md:text-base max-w-lg leading-relaxed font-medium">
                        Temukan koleksi lengkap dari database kami.
                        <span className="text-white"> Klik huruf</span> untuk navigasi instan atau gunakan fitur pencarian di bawah.
                    </p>

                    {/* SEARCH BOX - Modern & Interactive */}
                    <div className="mt-10 max-w-xl group">
                        <div className="relative transition-all duration-300 transform group-focus-within:scale-[1.02]">
                            <input
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Cari judul anime..."
                                className="w-full pl-14 pr-6 py-4 rounded-[2rem] bg-zinc-900/50 backdrop-blur-md border border-zinc-800 text-white placeholder:text-zinc-600 focus:border-orange-500/50 focus:ring-4 focus:ring-orange-500/10 outline-none transition-all shadow-2xl"
                            />

                            {/* Ikon Kaca Pembesar */}
                            <div className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-orange-500 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path>
                                </svg>
                            </div>

                            {/* Keyboard Shortcut Indicator (Desktop Only) */}
                            <div className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 items-center gap-1 px-2 py-1 rounded-lg bg-zinc-800 border border-zinc-700 text-[10px] font-black text-zinc-500 uppercase">
                                <span>⌘</span>
                                <span>K</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* ===============================
          ALPHABET NAV
      =============================== */}
            <section className="sticky top-16 z-50 bg-black/80 backdrop-blur border-b border-zinc-800 px-4 lg:px-20 py-4 overflow-x-auto no-scrollbar">
                <div className="flex gap-2 min-w-max">
                    {alphabet.map((char) => (
                        <a
                            key={char}
                            href={`#section-${char}`}
                            className={`w-10 h-10 flex items-center justify-center rounded-xl font-black text-sm transition-all border ${activeLetter === char
                                ? "bg-orange-600 border-orange-500 text-white scale-110"
                                : "bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-white"
                                }`}
                        >
                            {char}
                        </a>
                    ))}
                </div>
            </section>

            {/* ===============================
          GROUPED LIST
      =============================== */}
            <section className="px-6 lg:px-20 mt-12 space-y-20">
                <div className="mb-10 animate-fade-in flex justify-center md:justify-end">
                    <Link
                        href={`/anime`}
                        className="group relative flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-2xl font-black shadow-[0_10px_30px_rgba(234,88,12,0.3)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(234,88,12,0.4)] transition-all duration-300 overflow-hidden"
                    >
                        {/* Efek Shine (Kilauan) yang lewat saat di-hover */}
                        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />

                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20" height="20"
                            fill="bold"
                            viewBox="0 0 256 256"
                            className="group-hover:-translate-x-1 transition-transform duration-300"
                        >
                            <path d="M224,128a8,8,0,0,1-8,8H72.83l47.58,47.59a8,8,0,0,1-11.32,11.32l-61.26-61.26a8,8,0,0,1,0-11.32l61.26-61.26a8,8,0,0,1,11.32,11.32L72.83,120H200A8,8,0,0,1,208,128Z"></path>
                        </svg>

                        <span className="text-[11px] uppercase tracking-[0.2em] relative z-10">
                            Kembali ke Beranda
                        </span>
                    </Link>
                </div>
                {alphabet.map((char) => {
                    const list = filteredGrouped[char]

                    if (!list || list.length === 0) return null

                    return (
                        <div
                            key={char}
                            id={`section-${char}`}
                            className="scroll-mt-32"
                        >
                            {/* LETTER HEADER */}
                            <h2 className="text-4xl font-black text-orange-500 mb-6">
                                {char}
                            </h2>

                            {/* LIST */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-10">
                                {list.slice(0, 60).map((anime) => (
                                    <Link
                                        key={anime.endpoint}
                                        href={`/anime/${anime.endpoint}`}
                                        className="py-2 border-b border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500 transition"
                                    >
                                        {anime.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )
                })}
            </section>
        </main>
    )
}