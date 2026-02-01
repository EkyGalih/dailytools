'use client'

import { useState } from 'react'

export default function ReadingControls() {
    // Mode: 'normal' | 'focus' | 'ultra'
    const [viewMode, setViewMode] = useState('normal')

    const cycleMode = () => {
        const aside = document.querySelector('aside')
        const header = document.querySelector('header')
        const mainGrid = document.querySelector('#main-grid')
        const readerContainer = document.querySelector('#reader-container')

        if (viewMode === 'normal') {
            // KE FOCUS MODE (Sembunyikan Sidebar)
            aside?.classList.add('lg:hidden')
            mainGrid?.classList.replace('lg:grid-cols-[1fr_320px]', 'lg:grid-cols-1')
            setViewMode('focus')
        }
        else if (viewMode === 'focus') {
            // KE ULTRA FULLSCREEN (Sembunyikan Header & Lebarkan Gambar)
            header?.classList.add('hidden')
            readerContainer?.classList.replace('max-w-[900px]', 'max-w-none')
            readerContainer?.classList.remove('rounded-3xl', 'border')
            document.documentElement.requestFullscreen?.()
            setViewMode('ultra')
        }
        else {
            // KEMBALI KE NORMAL
            aside?.classList.remove('lg:hidden')
            header?.classList.remove('hidden')
            mainGrid?.classList.replace('lg:grid-cols-1', 'lg:grid-cols-[1fr_320px]')
            readerContainer?.classList.replace('max-w-none', 'max-w-[900px]')
            readerContainer?.classList.add('rounded-3xl', 'border')
            if (document.fullscreenElement) document.exitFullscreen?.()
            setViewMode('normal')
        }
    }

    return (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 p-2 bg-[#09090b]/90 backdrop-blur-3xl border border-white/10 rounded-[2rem] shadow-2xl">
            {/* Tombol Cycle Mode */}
            <button
                onClick={cycleMode}
                className="flex items-center gap-3 px-6 py-3 rounded-[1.5rem] bg-orange-600 hover:bg-orange-500 text-white transition-all shadow-lg shadow-orange-600/20 group"
            >
                <div className="relative w-5 h-5">
                    {viewMode === 'normal' && (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path d="M4 6h16M4 12h10M4 18h16" />
                        </svg>
                    )}
                    {viewMode === 'focus' && (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                    {viewMode === 'ultra' && (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
                        </svg>
                    )}
                </div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em]">
                    {viewMode === 'normal' && "Focus Mode"}
                    {viewMode === 'focus' && "Ultra Fullscreen"}
                    {viewMode === 'ultra' && "Exit Fullscreen"}
                </span>
            </button>

            {/* Indikator Status Mode */}
            <div className="flex gap-1.5 px-3">
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${viewMode === 'normal' ? 'bg-orange-500 scale-125' : 'bg-zinc-700'}`} />
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${viewMode === 'focus' ? 'bg-orange-500 scale-125' : 'bg-zinc-700'}`} />
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 ${viewMode === 'ultra' ? 'bg-orange-500 scale-125' : 'bg-zinc-700'}`} />
            </div>
        </div>
    )
}