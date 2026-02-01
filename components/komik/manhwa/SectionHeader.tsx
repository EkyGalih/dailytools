import Link from "next/link"

interface SectionHeaderProps {
    title: string
    desc?: string
    link?: string
    labelLink?: string
}

export default function SectionHeader({
    title,
    desc,
    link,
    labelLink = "View All [System]",
}: SectionHeaderProps) {
    return (
        <div className="group relative flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">

            {/* 1. LEFT SIDE: SYSTEM TITLE */}
            <div className="relative space-y-2">
                {/* Decorative Background Text (Watermark style) */}
                <span className="absolute -top-6 -left-2 text-4xl md:text-6xl font-black text-white/[0.02] uppercase tracking-tighter select-none pointer-events-none italic">
                    {title}
                </span>
            </div>

            <div className="flex items-center gap-4">
                {/* Vertical Neon Bar */}
                <div className="h-10 w-1.5 bg-gradient-to-b from-cyan-500 to-violet-600 rounded-full shadow-[0_0_15px_rgba(6,182,212,0.5)]" />

                <div className="space-y-0.5">
                    <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter text-white leading-none drop-shadow-[0_0_10px_rgba(255,255,255,0.1)]">
                        {title}
                    </h2>
                    {desc && (
                        <p className="text-[10px] md:text-xs font-bold text-cyan-500/60 uppercase tracking-[0.3em] pl-1">
                            <span className="text-white/20 mr-2">»</span> {desc}
                        </p>
                    )}
                </div>
            </div>
        </div>
}