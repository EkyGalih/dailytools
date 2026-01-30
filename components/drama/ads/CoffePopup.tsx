'use client'

import { useState, useEffect } from 'react'

export default function CoffeePopupTop() {
    const [mounted, setMounted] = useState(false)
    const [isVisible, setIsVisible] = useState(true)
    const TRAKTEER_URL = 'https://trakteer.id/god_suru/showcase?menu=open' // Ganti dengan URL kamu

    useEffect(() => {
        // Langsung set mounted ke true agar muncul seketika di browser
        setMounted(true)
    }, [])

    // Cegah render di server-side untuk menghindari hydration mismatch
    if (!mounted || !isVisible) return null

    return (
        <div className="fixed top-6 right-6 z-[1000] animate-in fade-in slide-in-from-top-4 duration-500">
            <div className="relative group">

                {/* Tombol Close */}
                <button
                    onClick={(e) => {
                        e.preventDefault()
                        setIsVisible(false)
                    }}
                    className="absolute -top-2 -right-2 z-10 bg-white shadow-md border border-zinc-100 text-zinc-400 rounded-full w-6 h-6 flex items-center justify-center hover:text-rose-500 transition-all hover:scale-110"
                    title="Tutup"
                >
                    <span className="text-xs">✕</span>
                </button>

                {/* Area Klik Utama */}
                <a
                    href={TRAKTEER_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-zinc-100 transition-all active:scale-95 group-hover:border-orange-200 group-hover:shadow-orange-100/50"
                >
                    {/* Ikon Kopi */}
                    <div className="relative w-11 h-11 bg-gradient-to-br from-orange-100 to-amber-50 rounded-xl flex items-center justify-center shrink-0 group-hover:rotate-12 transition-transform">
                        <span className="text-2xl" role="img" aria-label="Coffee">☕</span>
                    </div>

                    {/* Teks */}
                    <div className="flex flex-col mr-1">
                        <span className="text-[9px] font-black text-orange-600 uppercase tracking-[0.15em] leading-none mb-1">
                            Support Creator
                        </span>
                        <h4 className="text-sm font-bold text-zinc-800 tracking-tight group-hover:text-orange-600 transition-colors">
                            Ngopi yuk!
                        </h4>
                    </div>

                    {/* Panah Indikator */}
                    <div className="ml-1 text-orange-500 transform group-hover:translate-x-1 transition-transform">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M181.66,133.66l-80,80a8,8,0,0,1-11.32-11.32L164.69,128,90.34,53.66a8,8,0,0,1,11.32-11.32l80,80A8,8,0,0,1,181.66,133.66Z"></path>
                        </svg>
                    </div>
                </a>
            </div>
        </div>
    )
}