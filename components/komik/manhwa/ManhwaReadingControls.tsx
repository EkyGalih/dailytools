'use client'

import { useState } from 'react'

export default function ManhwaReadingControls() {
    // Mode: 'normal' | 'focus' | 'ultra'
    const [viewMode, setViewMode] = useState('normal')

    const cycleMode = () => {
        const aside = document.querySelector('aside')
        const header = document.querySelector('header')
        const mainGrid = document.querySelector('#main-grid')
        const readerContainer = document.querySelector('#reader-container')

        if (viewMode === 'normal') {
            aside?.classList.add('lg:hidden')
            mainGrid?.classList.replace('lg:grid-cols-[1fr_320px]', 'lg:grid-cols-1')
            setViewMode('focus')
        }
        else if (viewMode === 'focus') {
            header?.classList.add('hidden')
            readerContainer?.classList.replace('max-w-[900px]', 'max-w-none')
            readerContainer?.classList.remove('rounded-3xl', 'border')
            document.documentElement.requestFullscreen?.()
            setViewMode('ultra')
        }
        else {
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1 p-1.5 bg-[#070708]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">

            {/* AMBIENT GLOW BEHIND */}
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 to-violet-500/5 rounded-full -z-10" />

            {/* BUTTON CYCLE MODE */}
            <button
                onClick={cycleMode}
                className="relative flex items-center gap-3 px-6 py-3 rounded-full bg-zinc-900 border border-white/5 hover:border-cyan-500/50 transition-all duration-300 group overflow-hidden"
            >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-600/10 to-violet-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="relative w-4 h-4 text-cyan-400 group-hover:scale-110 transition-transform">
                    {viewMode === 'normal' && (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16m-7 6h7" />
                        </svg>
                    )}
                    {viewMode === 'focus' && (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                    {viewMode === 'ultra' && (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>

                <span className="relative text-[10px] font-black uppercase tracking-[0.2em] text-zinc-300 group-hover:text-white transition-colors">
                    {viewMode === 'normal' && "Mode Fokus"}
                    {viewMode === 'focus' && "Fullscreen"}
                    {viewMode === 'ultra' && "Exit"}
                </span>
            </button>

            {/* MODE INDICATOR DOTS */}
            <div className="flex items-center gap-2 px-4 border-l border-white/10 ml-1">
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_8px] ${viewMode === 'normal' ? 'bg-cyan-500 shadow-cyan-500 scale-125' : 'bg-zinc-800 shadow-transparent'}`} />
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_8px] ${viewMode === 'focus' ? 'bg-cyan-500 shadow-cyan-500 scale-125' : 'bg-zinc-800 shadow-transparent'}`} />
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_8px] ${viewMode === 'ultra' ? 'bg-violet-500 shadow-violet-500 scale-125' : 'bg-zinc-800 shadow-transparent'}`} />
            </div>
        </div>
    )
}