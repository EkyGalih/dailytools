'use client'

import { useState } from 'react'
import { Layout, Maximize2, X, Zap, Target } from 'lucide-react'

export default function MangaReadingControls() {
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
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 p-2.5 bg-[#09090b]/80 backdrop-blur-3xl border border-white/5 rounded-full shadow-[0_25px_50px_rgba(0,0,0,0.8)]">

            {/* Status Indicator (Vertical Orbs) */}
            <div className="flex flex-col gap-1.5 px-3 border-r border-white/10 mr-1">
                <div className={`w-1 h-1 rounded-full transition-all duration-500 ${viewMode === 'normal' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] scale-150' : 'bg-zinc-800'}`} />
                <div className={`w-1 h-1 rounded-full transition-all duration-500 ${viewMode === 'focus' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] scale-150' : 'bg-zinc-800'}`} />
                <div className={`w-1 h-1 rounded-full transition-all duration-500 ${viewMode === 'ultra' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(249,115,22,0.8)] scale-150' : 'bg-zinc-800'}`} />
            </div>

            {/* Action Button */}
            <button
                onClick={cycleMode}
                className="group relative flex items-center gap-4 px-8 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-500 text-black transition-all duration-500 shadow-[0_10px_30px_rgba(234,88,12,0.4)] overflow-hidden"
            >
                {/* Shine Effect Animation */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shine_1.5s_ease-in-out_infinite]" />

                <div className="relative z-10 transition-transform duration-500 group-hover:rotate-12">
                    {viewMode === 'normal' && <Layout size={18} strokeWidth={3} />}
                    {viewMode === 'focus' && <Target size={18} strokeWidth={3} />}
                    {viewMode === 'ultra' && <X size={18} strokeWidth={3} />}
                </div>

                <span className="relative z-10 text-[10px] font-black uppercase italic tracking-[0.25em]">
                    {viewMode === 'normal' && "Mode Fokus"}
                    {viewMode === 'focus' && "Fullscreen"}
                    {viewMode === 'ultra' && "Keluar"}
                </span>

                <div className="relative z-10 p-1 bg-black/10 rounded-lg">
                    <Zap size={12} fill="currentColor" />
                </div>
            </button>

            {/* Micro-Interaction Button (Quick Exit) */}
            {viewMode !== 'normal' && (
                <button
                    onClick={() => {
                        // Logic reset manual
                        setViewMode('normal');
                        window.location.reload(); // Quick reset
                    }}
                    className="p-3.5 rounded-full bg-zinc-900 border border-white/5 text-zinc-400 hover:text-emerald-500 hover:bg-zinc-800 transition-all shadow-xl"
                >
                    <Maximize2 size={18} />
                </button>
            )}

            <style jsx>{`
                @keyframes shine {
                    100% { transform: translateX(100%); }
                }
            `}</style>
        </div>
    )
}