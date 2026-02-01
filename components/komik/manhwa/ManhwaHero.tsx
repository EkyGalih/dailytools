import Link from "next/link"

type ManhwaHeroProps = {
    title: string
    highlight?: string
    desc?: string
    backHref?: string
    backLabel?: string
    badge?: string
}

export default function ManhwaHero({
    title,
    highlight,
    desc,
    backHref,
    backLabel = "Back to Lobby",
    badge,
}: ManhwaHeroProps) {
    return (
        <header className="relative lg:pt-15 pt-5 pb-28 px-6 lg:px-20 overflow-hidden border-b border-cyan-500/20 bg-[#020203]">

            {/* 1. SYSTEM INTERFACE BACKGROUND */}
            <div className="absolute inset-0 z-0">
                {/* CORE GLOW (Cyber Core) */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-cyan-500/5 blur-[120px] rounded-full animate-pulse" />

                {/* VERTICAL SCANLINES (Manga Texture) */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_2px,3px_100%]" />

                {/* DIGITAL GRID (System Map) */}
                <div className="absolute inset-0 opacity-[0.07] [background-image:radial-gradient(circle_at_center,#444_1px,transparent_1px)] [background-size:24px_24px]" />

                {/* CORNER BRACKETS (HUD Elements) */}
                <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-500/20 rounded-tl-3xl hidden lg:block" />
                <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-violet-500/20 rounded-br-3xl hidden lg:block" />
            </div>

            {/* 2. CONTENT CONTAINER */}
            <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-start gap-12">

                {/* Back Button & System Notification Row */}
                <div className="flex flex-wrap items-center gap-6">
                    {backHref && (
                        <Link
                            href={backHref}
                            className="group flex items-center gap-3 px-6 py-2.5 rounded-sm bg-zinc-950 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 hover:text-cyan-400 hover:border-cyan-500 transition-all duration-300"
                        >
                            <span className="group-hover:-translate-x-1 transition-transform">«</span> {backLabel}
                        </Link>
                    )}

                    {badge && (
                        <div className="flex items-center gap-3">
                            <div className="flex gap-1">
                                <div className="w-1 h-1 bg-cyan-500 animate-ping" />
                                <div className="w-1 h-1 bg-cyan-500/50" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500 drop-shadow-[0_0_8px_rgba(6,182,212,0.5)]">
                                [ {badge} ]
                            </span>
                        </div>
                    )}
                </div>

                {/* Title Section (Brutalist System Typography) */}
                <div className="space-y-8">
                    <div className="relative">
                        {/* Shadow Title (Glitch Effect) */}
                        <span className="absolute -top-1 -left-1 text-5xl md:text-9xl font-black uppercase tracking-tighter leading-none text-violet-500/10 select-none">
                            {title}
                        </span>

                        <h1 className="relative text-5xl md:text-9xl font-black uppercase tracking-tighter leading-[0.8] text-white italic">
                            {title}
                            {highlight && (
                                <span className="block mt-2 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-violet-600 animate-gradient-x">
                                    {highlight}
                                </span>
                            )}
                        </h1>
                    </div>

                    {/* STATS BAR (System Info) */}
                    <div className="flex items-center gap-4">
                        <div className="h-0.5 w-40 bg-zinc-800 relative overflow-hidden">
                            <div className="absolute inset-0 bg-cyan-500 w-2/3 shadow-[0_0_10px_#06b6d4]" />
                        </div>
                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-widest italic">Syncing Data... 88%</span>
                    </div>

                    {/* Description (Quest Dialogue Style) */}
                    {desc && (
                        <div className="relative group max-w-2xl">
                            <div className="absolute -left-4 top-0 bottom-0 w-1 bg-cyan-500/50 group-hover:bg-cyan-500 transition-colors" />
                            <p className="text-sm md:text-xl text-zinc-400 leading-relaxed font-medium pl-6 italic">
                                "{desc}"
                            </p>
                        </div>
                    )}
                </div>
            </div>

            {/* 3. BOTTOM DECORATION (Digital Horizon) */}
            <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020203] to-transparent pointer-events-none" />
        </header>
    )
}