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
        <header className="relative pt-32 pb-20 px-6 lg:px-20 overflow-hidden border-b border-white/[0.03] bg-[#09090b]">

            {/* 1. LAYERED BACKGROUND MASK */}
            <div className="absolute inset-0 z-0">
                {/* Primary Glow */}
                <div className="absolute -top-[10%] -left-[5%] w-[50%] h-[60%] bg-orange-600/15 blur-[120px] rounded-full animate-pulse" />
                {/* Secondary Blue/White Tint for Contrast */}
                <div className="absolute -bottom-[20%] -right-[5%] w-[40%] h-[50%] bg-white/[0.02] blur-[100px] rounded-full" />
                {/* Texture Grid (Subtle) */}
                <div className="absolute inset-0 opacity-[0.03] [background-image:radial-gradient(#fff_1px,transparent_1px)] [background-size:32px_32px]" />
            </div>

            {/* 2. CONTENT CONTAINER */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start gap-8">

                {/* Back Button & Badge Row */}
                <div className="flex flex-wrap items-center gap-4">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="group flex items-center gap-2.5 px-5 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-orange-600 hover:border-orange-500 transition-all duration-300 shadow-xl"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">←</span> {backLabel}
                        </Link>
                    )}

                    {badge && (
                        <div className="relative">
                            <div className="absolute inset-0 bg-orange-500/20 blur-md rounded-full" />
                            <span className="relative inline-block px-5 py-2 rounded-full bg-zinc-950 border border-orange-500/30 text-[9px] font-black uppercase tracking-[0.3em] text-orange-500">
                                {badge}
                            </span>
                        </div>
                    )}
                </div>

                {/* Title Section */}
                <div className="space-y-6">
                    <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter italic leading-[0.85] text-white">
                        {title}
                        {highlight && (
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-400 drop-shadow-[0_10px_10px_rgba(249,115,22,0.2)]">
                                {highlight}
                            </span>
                        )}
                    </h1>

                    {/* Decorative Line */}
                    <div className="h-1 w-24 bg-gradient-to-r from-orange-600 to-transparent rounded-full" />

                    {/* Description */}
                    {desc && (
                        <p className="text-sm md:text-lg text-zinc-500 max-w-2xl leading-relaxed font-medium">
                            {desc}
                        </p>
                    )}
                </div>
            </div>

            {/* 3. BOTTOM GRADIENT FADE */}
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#09090b] to-transparent pointer-events-none" />
        </header>
    )
}