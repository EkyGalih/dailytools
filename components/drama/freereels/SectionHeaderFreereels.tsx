"use client"

import Link from "next/link"
import { ArrowRight, Sparkles, Zap } from "lucide-react"

interface NetshortHeaderProps {
    title: string
    desc?: string
    link?: string
    badge?: string
}

export default function FreereelsSectionHeader({
    title,
    desc,
    link,
    badge = "Trending",
}: NetshortHeaderProps) {
    return (
        <div className="relative group flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16 px-2">

            {/* 1. CONTENT AREA */}
            <div className="relative z-10 space-y-6 max-w-3xl">

                {/* Micro Badge: Flickreels Style */}
                <div className="flex items-center gap-3">
                    <div className="flex items-center gap-2 px-3 py-1 bg-zinc-900 rounded-full shadow-lg shadow-zinc-200">
                        <Zap size={10} className="text-amber-400 fill-amber-400" />
                        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white">
                            {badge}
                        </span>
                    </div>
                    <div className="h-[1px] w-12 bg-zinc-100 hidden md:block" />
                </div>

                {/* Main Title Section */}
                <div className="relative space-y-2">
                    {/* Shadow Title Overlay */}
                    <span className="absolute -top-6 left-0 text-6xl md:text-8xl font-black text-zinc-50/80 uppercase italic tracking-tighter select-none -z-10 group-hover:-translate-y-2 transition-transform duration-700">
                        {title.split(' ')[0]}
                    </span>

                    <h2 className="text-4xl md:text-4xl font-black uppercase italic tracking-tighter leading-none text-zinc-900 drop-shadow-sm">
                        {title}
                    </h2>

                    {/* Dynamic Underline */}
                    <div className="h-1.5 w-20 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-full group-hover:w-32 transition-all duration-500" />
                </div>

                {/* Description Text */}
                {desc && (
                    <p className="text-zinc-500 text-sm md:text-lg font-medium leading-relaxed max-w-xl border-l-2 border-zinc-100 pl-5">
                        {desc}
                    </p>
                )}
            </div>

            {/* 2. ACTION BUTTON: FLICKREELS PREMIUM BOX */}
            {link && (
                <div className="relative shrink-0 md:pb-1">
                    <Link
                        href={link}
                        className="group/btn relative flex items-center gap-4 pl-6 pr-1.5 py-1.5 rounded-2xl bg-white border border-zinc-200 overflow-hidden transition-all duration-300 hover:border-indigo-500 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.2)] active:scale-95"
                    >
                        <span className="text-[11px] font-black uppercase tracking-widest text-zinc-400 group-hover/btn:text-indigo-600 transition-colors">
                            View All
                        </span>

                        <div className="w-10 h-10 rounded-xl bg-zinc-950 flex items-center justify-center text-white group-hover/btn:bg-indigo-600 transition-all duration-300 shadow-lg shadow-zinc-200">
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            )}

            {/* 3. BACKGROUND ACCENT */}
            <div className="absolute top-0 right-0 -z-10 opacity-30 blur-3xl pointer-events-none">
                <div className="w-32 h-32 bg-indigo-200 rounded-full animate-pulse" />
            </div>
        </div>
    )
}