'use client'

import Link from "next/link"

interface ChapterListProps {
    chapters: any[]
}

export default function ChapterList({ chapters }: ChapterListProps) {
    // Fungsi Konversi Waktu (Sesuai kode asli kamu)
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
        <div className="w-full space-y-4">
            {chapters.map((ch: any, i: number) => {
                const isLatest = i === 0;

                return (
                    <Link
                        key={ch.chapter_id}
                        href={`/komik/manga/read/${ch.chapter_id}`}
                        className={`group relative flex items-center justify-between p-5 rounded-[2.5rem] border transition-all duration-500 h-full
                        ${isLatest
                                ? "bg-gradient-to-br from-orange-600/20 to-amber-500/10 border-orange-500/40 shadow-[0_20px_40px_rgba(234,88,12,0.15)]"
                                : "bg-zinc-950/40 border-white/5 hover:border-orange-500/30 hover:bg-zinc-900/60"
                            }`}
                    >
                        {/* LEFT: CHAPTER IDENTITY */}
                        <div className="flex items-center gap-4">
                            {/* Box Nomor Chapter */}
                            <div className={`w-12 h-12 rounded-2xl flex flex-col items-center justify-center text-[10px] font-black transition-all duration-500 shrink-0
                            ${isLatest
                                    ? "bg-orange-600 text-white shadow-lg shadow-orange-600/40"
                                    : "bg-zinc-900 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-orange-400"
                                }`}>
                                <span className="text-[7px] opacity-60 uppercase tracking-widest leading-none mb-0.5">CH</span>
                                <span className="text-base leading-none tracking-tighter">{ch.chapter_number}</span>
                            </div>

                            <div className="flex flex-col">
                                <span className={`text-sm font-black tracking-tight line-clamp-1 transition-colors duration-300
                                ${isLatest ? "text-white" : "text-zinc-300 group-hover:text-white"}`}>
                                    {ch.chapter_title || `Chapter ${ch.chapter_number}`}
                                </span>

                                {/* 2 BARIS INFO (Release & Views) */}
                                <div className="flex flex-col mt-1 space-y-0.5">
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1 h-1 rounded-full ${isLatest ? 'bg-orange-400' : 'bg-zinc-700'}`} />
                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter group-hover:text-zinc-400 transition-colors">
                                            {formatDate(ch.release_date)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className={`w-1 h-1 rounded-full ${isLatest ? 'bg-orange-400' : 'bg-zinc-700'}`} />
                                        <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-tighter group-hover:text-zinc-400 transition-colors">
                                            {ch.view_count.toLocaleString()} Views
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT: INTERACTION & STATUS */}
                        <div className="flex flex-col items-end gap-2 shrink-0">
                            {isLatest ? (
                                <span className="px-2.5 py-1 bg-orange-600 text-white text-[7px] font-black uppercase tracking-[0.2em] rounded-full animate-pulse shadow-md shadow-orange-600/20">
                                    New
                                </span>
                            ) : (
                                <div className="w-8 h-8 rounded-full border border-white/5 bg-zinc-900/50 flex items-center justify-center text-zinc-700 group-hover:border-orange-500/50 group-hover:text-orange-500 group-hover:rotate-45 transition-all duration-500">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 256 256">
                                        <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                                    </svg>
                                </div>
                            )}

                            {/* Visual Indicator Progress */}
                            <div className={`h-1 rounded-full transition-all duration-700 ${isLatest ? 'w-8 bg-orange-500' : 'w-4 bg-zinc-800'}`} />
                        </div>

                        {/* GLOW DECORATION */}
                        {isLatest && (
                            <div className="absolute inset-y-6 left-0 w-1 bg-orange-600 rounded-r-full" />
                        )}
                    </Link>
                );
            })}
        </div>
    );
}