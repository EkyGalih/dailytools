'use client'

import Link from "next/link"

interface ChapterListProps {
    chapters: any[]
}

export default function ManhwaChapterList({ chapters }: ChapterListProps) {
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

    if (!chapters || chapters.length === 0) return (
        <div className="py-10 text-center">
            <p className="text-zinc-600 font-bold uppercase tracking-widest text-xs">Belum ada chapter.</p>
        </div>
    );

    return (
        <div className="w-full space-y-3">
            {chapters.map((ch: any, i: number) => {
                const isLatest = i === 0;

                return (
                    <Link
                        key={ch.chapter_id}
                        href={`/komik/manhwa/read/${ch.chapter_id}`}
                        className={`group relative flex items-center justify-between p-4 md:p-5 rounded-[1.8rem] border transition-all duration-500
                        ${isLatest
                                ? "bg-gradient-to-r from-cyan-500/10 to-violet-600/5 border-cyan-500/30 shadow-[0_10px_30px_rgba(6,182,212,0.1)]"
                                : "bg-zinc-950/20 border-white/[0.03] hover:border-cyan-500/30 hover:bg-zinc-900/40"
                            }`}
                    >
                        {/* LEFT: CHAPTER IDENTITY */}
                        <div className="flex items-center gap-4 lg:gap-6">
                            {/* Circle/Box Nomor Chapter */}
                            <div className={`relative w-11 h-11 md:w-13 md:h-13 rounded-2xl flex flex-col items-center justify-center font-black transition-all duration-500 shrink-0
                            ${isLatest
                                    ? "bg-cyan-500 text-black shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                                    : "bg-zinc-900 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-cyan-400"
                                }`}>
                                <span className="text-[7px] opacity-70 uppercase tracking-tighter leading-none mb-0.5">CH</span>
                                <span className="text-sm md:text-base leading-none tracking-tighter">{ch.chapter_number}</span>

                                {isLatest && (
                                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-violet-500 rounded-full border-2 border-[#070708] animate-ping" />
                                )}
                            </div>

                            <div className="flex flex-col">
                                <h4 className={`text-sm md:text-base font-bold tracking-tight line-clamp-1 transition-colors duration-300
                                ${isLatest ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                                    {ch.chapter_title || `Chapter ${ch.chapter_number}`}
                                </h4>

                                {/* Meta Info Bar */}
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <span className={`w-1 h-1 rounded-full ${isLatest ? 'bg-cyan-500' : 'bg-zinc-700'}`} />
                                        {formatDate(ch.release_date)}
                                    </span>
                                    <span className="hidden sm:inline text-[9px] font-black text-zinc-600 uppercase tracking-widest">|</span>
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                                        {ch.view_count.toLocaleString()} Views
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: INTERACTION */}
                        <div className="flex items-center gap-4 shrink-0">
                            {isLatest && (
                                <span className="hidden md:block px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-[8px] font-black uppercase tracking-[0.2em] rounded-full">
                                    Terbaru
                                </span>
                            )}

                            <div className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border transition-all duration-500 
                                ${isLatest
                                    ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.1)]"
                                    : "bg-zinc-900 border-white/5 text-zinc-600 group-hover:border-cyan-500/50 group-hover:text-cyan-400 group-hover:scale-110"
                                }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L204.69,128,138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66ZM96,64V192a8,8,0,0,1-16,0V64a8,8,0,0,1,16,0Z"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Subtle Border Glow for All Items */}
                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/0 group-hover:via-cyan-500/20 to-transparent transition-all duration-500" />
                    </Link>
                );
            })}
        </div>
    );
}