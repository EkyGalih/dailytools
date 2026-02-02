import Link from "next/link"
import { ChevronRight, ArrowRight } from "lucide-react"

interface NetshortHeaderProps {
    title: string
    desc?: string
    link?: string
    badge?: string
}

export default function MeloloSectionHeader({
    title,
    desc,
    link,
    badge = "Trending Drama",
}: NetshortHeaderProps) {
    return (
        <div className="relative group flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">

            {/* 1. TEXT CONTENT SECTION */}
            <div className="relative z-10 space-y-4 max-w-2xl">

                {/* Visual Anchor: Vertical Line & Badge */}
                <div className="flex items-center gap-4">
                    <div className="h-4 w-[3px] bg-rose-600 rounded-full" />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-rose-600/80 bg-rose-50 px-3 py-1 rounded-md border border-rose-100">
                        {badge}
                    </span>
                </div>

                {/* Main Title with Animated Shadow Effect */}
                <div className="relative">
                    {/* Ghost Title (Watermark Behind) */}
                    <span className="absolute -top-8 -left-1 text-6xl md:text-8xl font-black text-zinc-100/80 uppercase tracking-tighter italic select-none -z-10 group-hover:translate-x-2 transition-transform duration-700">
                        {title.split(' ')[0]}
                    </span>

                    <h2 className="text-4xl md:text-6xl font-black uppercase italic tracking-tighter text-zinc-900 leading-[0.85] drop-shadow-sm">
                        {title}
                    </h2>
                </div>

                {/* Description with Decorative Elements */}
                {desc && (
                    <div className="flex items-start gap-4 pl-1">
                        <div className="mt-2 h-px w-8 bg-zinc-200 hidden md:block" />
                        <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed max-w-lg">
                            {desc}
                        </p>
                    </div>
                )}
            </div>

            {/* 2. ACTION SECTION: MODERN PILL BUTTON */}
            {link && (
                <div className="relative shrink-0 md:mb-1">
                    <Link
                        href={link}
                        className="relative flex items-center gap-6 pl-8 pr-2 py-2 rounded-full bg-zinc-900 group/btn overflow-hidden transition-all duration-500 hover:bg-rose-600 hover:shadow-[0_20px_40px_rgba(225,29,72,0.2)]"
                    >
                        {/* Shimmer Effect */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />

                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-100">
                            Explore All
                        </span>

                        <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white group-hover/btn:bg-white group-hover/btn:text-rose-600 transition-all duration-300">
                            <ArrowRight size={18} className="group-hover/btn:translate-x-1 transition-transform" />
                        </div>
                    </Link>
                </div>
            )}

            {/* 3. DECORATIVE GRADIENT LINE (Bottom) */}
            <div className="absolute -bottom-8 left-0 right-0 flex items-center gap-4 opacity-40">
                <div className="h-[2px] w-24 bg-gradient-to-r from-rose-500 to-transparent" />
                <div className="h-[1px] flex-1 bg-zinc-100" />
            </div>
        </div>
    )
}