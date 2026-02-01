import Link from "next/link"

type MangaHeroProps = {
    title: string
    highlight?: string
    desc?: string
    backHref?: string
    backLabel?: string
    badge?: string
}

export default function MangaHero({
    title,
    highlight,
    desc,
    backHref,
    backLabel = "Kembali",
    badge,
}: MangaHeroProps) {
    return (
        <header className="relative lg:pt-15 pt-5 pb-28 px-6 lg:px-20 overflow-hidden border-b-4 border-black bg-[#0a0a0a]">

            {/* 1. MANGA TEXTURE & ACTION BACKGROUND */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                {/* Screentone Pattern (Dots) */}
                <div className="absolute inset-0 opacity-[0.07]"
                    style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '12px 12px' }}
                />

                {/* Manga Action Lines (Focus Effect) */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, #fff 2deg, transparent 4deg)` }}
                />

                {/* Theme Glow (Amber/Orange) */}
                <div className="absolute -top-[20%] -right-[10%] w-[60%] h-[80%] bg-orange-600/10 blur-[140px] rounded-full animate-pulse" />

                {/* Vertical Text Decoration (Japanese Style) */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:block">
                    <span className="text-[120px] font-black text-white/[0.02] uppercase tracking-tighter leading-none [writing-mode:vertical-rl]">
                        漫画 (MANGA)
                    </span>
                </div>
            </div>

            {/* 2. CONTENT CONTAINER */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start gap-12">

                {/* Header Row: Back & Badge */}
                <div className="flex flex-wrap items-center gap-6">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="group flex items-center gap-3 px-6 py-2 bg-white text-black text-[11px] font-black uppercase tracking-widest border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-[4px_4px_0px_#ea580c]"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> {backLabel}
                        </Link>
                    )}

                    {badge && (
                        <div className="px-5 py-2 border-2 border-orange-500/50 skew-x-[-12deg] bg-orange-500/5">
                            <span className="block skew-x-[12deg] text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                                {badge}
                            </span>
                        </div>
                    )}
                </div>

                {/* Main Typography Section */}
                <div className="space-y-10 max-w-5xl">
                    <div className="relative inline-block">
                        {/* Huge Background Lettering */}
                        <span className="absolute -top-10 -left-6 text-[120px] md:text-[200px] font-black text-white/[0.03] uppercase tracking-tighter select-none -z-10 italic">
                            {title.slice(0, 2)}
                        </span>

                        <h1 className="text-6xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.8] text-white">
                            {title}
                            {highlight && (
                                <span className="block mt-4 text-orange-500 drop-shadow-[6px_6px_0px_rgba(255,255,255,0.1)]">
                                    {highlight}
                                </span>
                            )}
                        </h1>
                    </div>

                    {/* Manga Style Divider (Jagged/Sharp) */}
                    <div className="flex items-center gap-4">
                        <div className="h-2 w-32 bg-white skew-x-[-20deg]" />
                        <div className="h-2 w-12 bg-orange-500 skew-x-[-20deg]" />
                    </div>

                    {/* Description Section */}
                    {desc && (
                        <div className="relative group max-w-2xl">
                            <div className="absolute -left-6 top-0 bottom-0 w-1.5 bg-orange-600 shadow-[0_0_15px_#ea580c]" />
                            <p className="text-base md:text-2xl text-zinc-400 leading-tight font-black uppercase tracking-tight pl-6 italic">
                                "{desc}"
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. INK SPLATTER / BOTTOM FADE */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </header>
    )
}