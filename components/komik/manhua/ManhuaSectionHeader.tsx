import Link from "next/link"

interface SectionHeaderProps {
    title: string
    desc?: string
    link?: string // Dibuat opsional jika hanya ingin judul saja
    labelLink?: string
}

export default function ManhuaSectionHeader({
    title,
    desc,
    link,
    labelLink = "Lihat Semua",
}: SectionHeaderProps) {
    return (
        <div className="group flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 relative">
            {/* 1. TITLE & DESCRIPTION SECTION */}
            <div className="space-y-1 relative">
                {/* Decorative Small Bar (Cyber Accent) */}
                <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-500 to-violet-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 hidden md:block" />

                <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter text-white leading-none">
                    {title}
                </h2>

                {desc && (
                    <div className="flex items-center gap-3">
                        <div className="h-[1px] w-8 bg-zinc-800" />
                        <p className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-[0.2em]">
                            {desc}
                        </p>
                    </div>
                )}
            </div>

            {/* 2. ACTION LINK (Lihat Semua) */}
            {link && (
                <Link
                    href={link}
                    className="relative flex items-center gap-3 px-6 py-2.5 rounded-full bg-white/[0.03] border border-white/5 overflow-hidden group/link transition-all duration-300 hover:border-cyan-500/30 hover:bg-cyan-500/5 shadow-xl"
                >
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 group-hover/link:text-cyan-400 transition-colors">
                        {labelLink}
                    </span>

                    {/* Minimalist Arrow Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="14" height="14"
                        fill="currentColor"
                        viewBox="0 0 256 256"
                        className="text-zinc-600 group-hover/link:text-cyan-500 group-hover/link:translate-x-1 transition-all duration-300"
                    >
                        <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L204.69,128,141.66,64.91a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                    </svg>

                    {/* Bottom Highlight Line */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-cyan-500 group-hover/link:w-full transition-all duration-500" />
                </Link>
            )}

            {/* 3. SECTION DIVIDER (Optional for more separation) */}
            <div className="absolute -bottom-4 left-0 right-0 h-px bg-gradient-to-r from-white/[0.05] via-transparent to-transparent pointer-events-none" />
        </div>
    )
}