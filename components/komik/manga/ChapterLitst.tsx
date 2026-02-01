'use client'

import Link from "next/link"

interface ChapterListProps {
    chapters: any[]
}

export default function ChapterList({ chapters }: ChapterListProps) {
    const formatDate = (dateStr: string) => {
        if (!dateStr) return "N/A";
        const date = new Date(dateStr);
        return new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric'
        }).format(date);
    };

    if (!chapters || chapters.length === 0) return null;

    return (
        <div className="w-full space-y-3">
            {chapters.map((ch: any, i: number) => {
                const isLatest = i === 0;

                return (
                    <Link
                        key={ch.chapter_id}
                        href={`/komik/manhua/read/${ch.chapter_id}`}
                        className={`group relative flex items-center justify-between p-4 md:p-5 rounded-[1.8rem] border transition-all duration-500
                        ${isLatest
                                ? "bg-gradient-to-r from-emerald-500/15 to-teal-600/5 border-emerald-500/40 shadow-[0_10px_30px_rgba(16,185,129,0.1)]"
                                : "bg-zinc-950/40 border-white/[0.03] hover:border-emerald-500/30 hover:bg-emerald-500/[0.02]"
                            }`}
                    >
                        <div className="flex items-center gap-4 lg:gap-6">
                            {/* Chapter Number Box */}
                            <div className={`w-11 h-11 md:w-13 md:h-13 rounded-2xl flex flex-col items-center justify-center font-black transition-all duration-500 shrink-0
                            ${isLatest
                                    ? "bg-emerald-500 text-black shadow-[0_0_15px_rgba(16,185,129,0.4)]"
                                    : "bg-zinc-900 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-emerald-400"
                                }`}>
                                <span className="text-[7px] opacity-70 uppercase leading-none mb-0.5 tracking-tighter">Chapter</span>
                                <span className="text-sm md:text-base leading-none tracking-tighter">{ch.chapter_number}</span>
                            </div>

                            <div className="flex flex-col">
                                <h4 className={`text-sm md:text-base font-bold tracking-tight line-clamp-1 transition-colors duration-300
                                ${isLatest ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                                    {ch.chapter_title || `Chapter ${ch.chapter_number}`}
                                </h4>
                                <div className="flex items-center gap-3 mt-1.5">
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                                        <span className={`w-1 h-1 rounded-full ${isLatest ? 'bg-emerald-400' : 'bg-zinc-700'}`} />
                                        {formatDate(ch.release_date)}
                                    </span>
                                    <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
                                        {ch.view_count.toLocaleString()} Cultivators
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Interaction */}
                        <div className="flex items-center gap-4 shrink-0">
                            {isLatest && (
                                <span className="hidden md:block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[8px] font-black uppercase tracking-[0.2em] rounded-full animate-pulse">
                                    Chapter Baru
                                </span>
                            )}
                            <div className={`w-8 h-8 md:w-10 md:h-10 rounded-full border flex items-center justify-center transition-all duration-500 
                                ${isLatest
                                    ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400"
                                    : "bg-zinc-900 border-white/5 text-zinc-700 group-hover:text-emerald-400 group-hover:scale-110"
                                }`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L204.69,128,138.34,61.66a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66ZM96,64V192a8,8,0,0,1-16,0V64a8,8,0,0,1,16,0Z"></path></svg>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}