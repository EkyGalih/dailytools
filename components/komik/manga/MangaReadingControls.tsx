'use client'

import { useState, useEffect } from 'react'
import { Layout, Maximize2, X, Zap, Target, ArrowUp } from 'lucide-react'

export default function MangaReadingControls({ accentColor }: { accentColor: string }) {
    const [viewMode, setViewMode] = useState('normal')
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 500)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    const cycleMode = () => {
        const aside = document.querySelector('aside')
        const header = document.querySelector('header')
        const mainGrid = document.querySelector('#main-grid')
        const readerContainer = document.querySelector('#reader-container')

        if (viewMode === 'normal') {
            aside?.classList.add('lg:hidden')
            mainGrid?.classList.replace('lg:grid-cols-[1fr_350px]', 'lg:grid-cols-1')
            setViewMode('focus')
        }
        else if (viewMode === 'focus') {
            header?.classList.add('hidden')
            readerContainer?.classList.replace('max-w-[950px]', 'max-w-none')
            document.documentElement.requestFullscreen?.()
            setViewMode('ultra')
        }
        else {
            aside?.classList.remove('lg:hidden')
            header?.classList.remove('hidden')
            mainGrid?.classList.replace('lg:grid-cols-1', 'lg:grid-cols-[1fr_350px]')
            readerContainer?.classList.replace('max-w-none', 'max-w-[950px]')
            if (document.fullscreenElement) document.exitFullscreen?.()
            setViewMode('normal')
        }
    }

    return (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 p-2 bg-black/40 backdrop-blur-3xl border border-white/5 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.6)]">
            
            {/* Scroll Top Button */}
            {scrolled && (
                <button 
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="p-4 rounded-full bg-zinc-900 border border-white/5 text-zinc-500 hover:text-white transition-all ml-1"
                >
                    <ArrowUp size={16} />
                </button>
            )}

            {/* Mode Switcher */}
            <button
                onClick={cycleMode}
                className={`group relative flex items-center gap-5 px-8 py-4 rounded-full ${accentColor} text-white transition-all duration-500 shadow-2xl active:scale-95 overflow-hidden`}
            >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shine_2s_infinite]" />

                <div className="relative z-10">
                    {viewMode === 'normal' && <Layout size={18} strokeWidth={3} />}
                    {viewMode === 'focus' && <Target size={18} strokeWidth={3} />}
                    {viewMode === 'ultra' && <X size={18} strokeWidth={3} />}
                </div>

                <span className="relative z-10 text-[10px] font-black uppercase italic tracking-[0.3em]">
                    {viewMode === 'normal' && "Focus Mode"}
                    {viewMode === 'focus' && "Ultra Fullscreen"}
                    {viewMode === 'ultra' && "Default View"}
                </span>

                <div className="relative z-10 p-1 bg-black/20 rounded-lg">
                    <Zap size={12} fill="currentColor" />
                </div>
            </button>

            <style jsx>{`
                @keyframes shine { 100% { transform: translateX(100%); } }
            `}</style>
        </div>
    )
}