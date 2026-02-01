import Link from "next/link"

type ManhuaHeroProps = {
    title: string
    highlight?: string
    desc?: string
    backHref?: string
    backLabel?: string
    badge?: string
}

export default function ManhuaHero({
    title,
    highlight,
    desc,
    backHref,
    backLabel = "Kembali",
    badge,
}: ManhuaHeroProps) {
    return (
        <header className="relative lg:pt-15 pt-5 pb-24 px-6 lg:px-20 overflow-hidden border-b border-emerald-500/10 bg-[#050606]">

            {/* 1. ATMOSPHERIC BACKGROUND MASK */}
            <div className="absolute inset-0 z-0">
                {/* Emerald & Teal Nebula Glow */}
                <div className="absolute top-[-10%] left-[-5%] w-[60%] h-[70%] bg-emerald-500/10 blur-[130px] rounded-full animate-pulse opacity-60" />
                <div className="absolute bottom-[-10%] right-[-5%] w-[50%] h-[60%] bg-teal-600/10 blur-[120px] rounded-full opacity-40" />

                {/* Chinese Silk/Paper Pattern Texture */}
                <div className="absolute inset-0 opacity-[0.04] [background-image:linear-gradient(to_right,#34d399_1px,transparent_1px),linear-gradient(to_bottom,#34d399_1px,transparent_1px)] [background-size:60px_60px]" />

                {/* Fog/Mist Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#050606]/0 via-transparent to-[#050606]" />
            </div>

            {/* 2. CONTENT CONTAINER */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start gap-10">

                {/* Navigation & Badge */}
                <div className="flex flex-wrap items-center gap-5">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="group flex items-center gap-3 px-6 py-2.5 rounded-full bg-emerald-950/20 border border-emerald-500/20 text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 hover:text-white hover:bg-emerald-600 hover:border-emerald-400 transition-all duration-500 shadow-[0_0_20px_rgba(16,185,129,0.1)]"
                        >
                            <span className="group-hover:-translate-x-1.5 transition-transform duration-300">←</span> {backLabel}
                        </Link>
                    )}

                    {badge && (
                        <div className="relative">
                            <div className="absolute inset-0 bg-emerald-500/15 blur-lg rounded-full animate-pulse" />
                            <span className="relative inline-block px-6 py-2 rounded-full bg-zinc-950 border border-emerald-500/40 text-[9px] font-black uppercase tracking-[0.4em] text-emerald-400">
                                {badge}
                            </span>
                        </div>
                    )}
                </div>

                {/* Typography Section */}
                <div className="space-y-8 max-w-4xl">
                    <h1 className="text-6xl md:text-9xl font-black uppercase tracking-[-0.05em] leading-[0.8] text-white">
                        {title}
                        {highlight && (
                            <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-500 drop-shadow-[0_15px_15px_rgba(16,185,129,0.25)]">
                                {highlight}
                            </span>
                        )}
                    </h1>

                    {/* Vertical Decorative Element (Modern Oriental Touch) */}
                    <div className="flex items-center gap-4">
                        <div className="h-1 w-24 bg-gradient-to-r from-emerald-500 to-transparent rounded-full shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                        <span className="text-[10px] font-bold text-emerald-500/50 uppercase tracking-[0.5em]">Kultivasi Tanpa Batas</span>
                    </div>

                    {/* Description */}
                    {desc && (
                        <p className="text-sm md:text-xl text-zinc-400 leading-relaxed font-medium max-w-2xl border-l-2 border-emerald-500/20 pl-6 py-1">
                            {desc}
                        </p>
                    )}
                </div>
            </div>

            {/* 3. TRANSITION GRADIENT */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#050606] to-transparent pointer-events-none" />
        </header>
    )
}