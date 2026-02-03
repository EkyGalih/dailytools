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
        <header className="relative pt-12 md:pt-20 pb-20 md:pb-28 px-4 md:px-20 overflow-hidden border-b-4 border-black bg-[#0a0a0a]">

            {/* 1. MANGA TEXTURE & ACTION BACKGROUND */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                <div className="absolute inset-0 opacity-[0.05] md:opacity-[0.07]"
                    style={{ backgroundImage: `radial-gradient(#ffffff 1px, transparent 1px)`, backgroundSize: '12px 12px' }}
                />

                <div className="absolute inset-0 opacity-[0.03] md:opacity-[0.05]"
                    style={{ backgroundImage: `conic-gradient(from 0deg at 50% 50%, transparent 0deg, #fff 2deg, transparent 4deg)` }}
                />

                {/* Theme Glow - Ukuran disesuaikan untuk mobile */}
                <div className="absolute -top-[10%] -right-[5%] w-[80%] md:w-[60%] h-[60%] md:h-[80%] bg-orange-600/10 blur-[80px] md:blur-[140px] rounded-full animate-pulse" />

                {/* Vertical Text Decoration - Tetap hidden di mobile */}
                <div className="absolute right-6 md:right-10 top-1/2 -translate-y-1/2 hidden lg:block">
                    <span className="text-[80px] md:text-[120px] font-black text-white/[0.02] uppercase tracking-tighter leading-none [writing-mode:vertical-rl]">
                        漫画 (MANGA)
                    </span>
                </div>
            </div>

            {/* 2. CONTENT CONTAINER */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start gap-8 md:gap-12">

                {/* Header Row: Back & Badge */}
                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="group flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 bg-white text-black text-[10px] md:text-[11px] font-black uppercase tracking-widest border-2 border-white hover:bg-transparent hover:text-white transition-all duration-300 shadow-[3px_3px_0px_#ea580c]"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> {backLabel}
                        </Link>
                    )}

                    {badge && (
                        <div className="px-4 md:px-5 py-2 border-2 border-orange-500/50 skew-x-[-12deg] bg-orange-500/5">
                            <span className="block skew-x-[12deg] text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-orange-500">
                                {badge}
                            </span>
                        </div>
                    )}
                </div>

                {/* Main Typography Section */}
                <div className="space-y-6 md:space-y-10 max-w-5xl w-full">
                    <div className="relative inline-block w-full">
                        {/* Huge Background Lettering - Diperkecil di mobile agar tidak berantakan */}
                        <span className="absolute -top-6 md:-top-10 -left-2 md:-left-6 text-[80px] md:text-[200px] font-black text-white/[0.03] uppercase tracking-tighter select-none -z-10 italic truncate w-full">
                            {title.slice(0, 2)}
                        </span>

                        <h1 className="text-4xl md:text-9xl font-black uppercase tracking-tighter italic leading-[0.9] md:leading-[0.8] text-white break-words">
                            {title}
                            {highlight && (
                                <span className="block mt-2 md:mt-4 text-orange-500 drop-shadow-[4px_4px_0px_rgba(255,255,255,0.1)]">
                                    {highlight}
                                </span>
                            )}
                        </h1>
                    </div>

                    {/* Manga Style Divider */}
                    <div className="flex items-center gap-3 md:gap-4">
                        <div className="h-1.5 md:h-2 w-20 md:w-32 bg-white skew-x-[-20deg]" />
                        <div className="h-1.5 md:h-2 w-8 md:w-12 bg-orange-500 skew-x-[-20deg]" />
                    </div>

                    {/* Description Section */}
                    {desc && (
                        <div className="relative group max-w-2xl">
                            <div className="absolute -left-4 md:-left-6 top-0 bottom-0 w-1 md:w-1.5 bg-orange-600 shadow-[0_0_15px_#ea580c]" />
                            <p className="text-sm md:text-2xl text-zinc-400 leading-tight font-black uppercase tracking-tight pl-4 md:pl-6 italic">
                                "{desc}"
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. INK SPLATTER / BOTTOM FADE */}
            <div className="absolute bottom-0 left-0 w-full h-24 md:h-32 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none" />
        </header>
    )
}