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
        <header className="relative pt-16 md:pt-32 pb-24 md:pb-40 px-6 md:px-20 overflow-hidden bg-[#050507]">
            
            {/* 1. THE FUSION BACKGROUND (Visualisasi 3 Kategori) */}
            <div className="absolute inset-0 z-0 select-none pointer-events-none">
                {/* Background Pattern: Dots & Lines */}
                <div className="absolute inset-0 opacity-[0.05]"
                    style={{ backgroundImage: `radial-gradient(#ffffff 0.5px, transparent 0.5px)`, backgroundSize: '24px 24px' }}
                />

                {/* Ambient Glows: Red (Manga), Cyan (Manhwa), Emerald (Manhua) */}
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-red-600/10 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[0%] w-[50%] h-[60%] bg-cyan-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
                <div className="absolute top-[20%] left-[30%] w-[40%] h-[40%] bg-emerald-600/5 blur-[100px] rounded-full" />

                {/* Vertical Text Decoration (Kanji Representing 3 Regions) */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 hidden lg:flex flex-col gap-8 opacity-[0.03]">
                    <span className="text-[60px] font-black text-white uppercase [writing-mode:vertical-rl]">漫画 (MANGA)</span>
                    <span className="text-[60px] font-black text-white uppercase [writing-mode:vertical-rl]">웹툰 (MANHWA)</span>
                    <span className="text-[60px] font-black text-white uppercase [writing-mode:vertical-rl]">漫画 (MANHUA)</span>
                </div>
            </div>

            {/* 2. CONTENT CONTAINER */}
            <div className="relative z-10 max-w-7xl mx-auto">
                <div className="flex flex-col items-start gap-10">
                    
                    {/* Navigation & Status Badge */}
                    <div className="flex flex-wrap items-center gap-4">
                        {backHref && (
                            <Link
                                href={backHref}
                                className="group flex items-center gap-3 px-6 py-2.5 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full hover:bg-orange-600 hover:text-white transition-all duration-500 shadow-2xl active:scale-95"
                            >
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> {backLabel}
                            </Link>
                        )}

                        <div className="px-5 py-2.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl">
                            <span className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-orange-500">
                                {badge || "Tri-Border Archive"}
                            </span>
                        </div>
                    </div>

                    {/* Typography Section */}
                    <div className="relative space-y-8 max-w-5xl">
                        <div className="relative">
                            {/* Huge Abstract Lettering */}
                            <span className="absolute -top-12 -left-4 text-[100px] md:text-[250px] font-black text-white/[0.02] uppercase italic tracking-tighter select-none -z-10 truncate w-full">
                                {title}
                            </span>

                            <h1 className="text-5xl md:text-[140px] font-black uppercase italic tracking-tighter leading-[0.8] text-white">
                                {title}
                                {highlight && (
                                    <span className="block mt-4 text-transparent bg-clip-text bg-gradient-to-r from-red-600 via-cyan-400 to-emerald-500 drop-shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                        {highlight}
                                    </span>
                                )}
                            </h1>
                        </div>

                        {/* Divider Line */}
                        <div className="flex items-center gap-4">
                            <div className="h-2 w-32 bg-white rounded-full" />
                            <div className="h-2 w-12 bg-gradient-to-r from-orange-600 to-red-600 rounded-full" />
                        </div>

                        {/* Description */}
                        {desc && (
                            <div className="relative max-w-2xl border-l-4 border-orange-600 pl-8 py-2">
                                <p className="text-sm md:text-2xl text-zinc-400 font-bold uppercase italic tracking-tight leading-snug">
                                    "{desc}"
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* 3. INK SPLATTER / BOTTOM FADE */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-[#050507] to-transparent pointer-events-none" />
        </header>
    )
}