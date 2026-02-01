'use client'

import { useState } from 'react'

export default function ManhuaReadingControls() {
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-1.5 p-2 bg-emerald-950/80 backdrop-blur-3xl border border-emerald-500/20 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            {/* Tombol Cycle Mode */}
            <button
                onClick={cycleMode}
                className="flex items-center gap-3 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-black transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] group"
            >
                <div className="relative w-4 h-4">
                    {viewMode === 'normal' && (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path d="M4 6h16M4 12h10M4 18h16" />
                        </svg>
                    )}
                    {viewMode === 'focus' && (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                    )}
                    {viewMode === 'ultra' && (
                        <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    )}
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">
                    {viewMode === 'normal' && "Focus"}
                    {viewMode === 'focus' && "Maximize"}
                    {viewMode === 'ultra' && "Exit"}
                </span>
            </button>

            {/* Indikator Status Mode (Spiritual Orbs) */}
            <div className="flex gap-2 px-3">
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_8px] ${viewMode === 'normal' ? 'bg-emerald-400 shadow-emerald-400 scale-125' : 'bg-emerald-900 shadow-transparent'}`} />
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_8px] ${viewMode === 'focus' ? 'bg-emerald-400 shadow-emerald-400 scale-125' : 'bg-emerald-900 shadow-transparent'}`} />
                <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 shadow-[0_0_8px] ${viewMode === 'ultra' ? 'bg-emerald-400 shadow-emerald-400 scale-125' : 'bg-emerald-900 shadow-transparent'}`} />
            </div>
        </div>
    )
}