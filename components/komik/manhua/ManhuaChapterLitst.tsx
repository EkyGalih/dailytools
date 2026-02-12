'use client'

import Link from "next/link"
import { BookOpen, Calendar, Eye, Sparkles } from "lucide-react";

interface ChapterListProps {
    chapters: any[]
}

export default function ManhuaChapterList({ chapters }: ChapterListProps) {
    // Fungsi Konversi Waktu (Sesuai kode asli kamu)
    const formatDate = (dateString: string) => {
        if (!dateString) return "-";

        // Format expected: DD/MM/YYYY
        const parts = dateString.split("/");

        if (parts.length !== 3) return "-";

        const [day, month, year] = parts;

        const date = new Date(
            Number(year),
            Number(month) - 1,
            Number(day)
        );

        if (isNaN(date.getTime())) return "-";

        return new Intl.DateTimeFormat("id-ID", {
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).format(date);
    };

    if (!chapters || chapters.length === 0) return null;

    return (
        <div className="w-full space-y-4">
            {chapters.map((ch: any, i: number) => {
                const isLatest = i === 0;

                return (
                    <Link
                        key={ch.endpoint}
                        href={`/komik/manhua/read/${ch.endpoint}`}
                        className={`group relative flex items-center justify-between p-5 md:p-6 rounded-[2.5rem] border transition-all duration-500 overflow-hidden
                        ${isLatest
                                ? "bg-white/[0.05] border-emerald-500/40 shadow-[0_20px_40px_rgba(16,185,129,0.1)]"
                                : "bg-zinc-950/20 border-white/[0.03] hover:border-emerald-500/30 hover:bg-emerald-500/[0.02]"
                            }`}
                    >
                        {/* Light Aura untuk Chapter Terbaru */}
                        {isLatest && (
                            <div className="absolute top-0 right-0 w-40 h-40 bg-emerald-500/10 blur-[60px] -z-10" />
                        )}

                        <div className="flex items-center gap-5 md:gap-8 relative z-10">
                            {/* Chapter Number Box (Jade Stone Style) */}
                            <div className={`relative w-14 h-14 md:w-16 md:h-16 rounded-[1.8rem] flex flex-col items-center justify-center font-black transition-all duration-500 shrink-0 border
                            ${isLatest
                                    ? "bg-emerald-600 border-emerald-400 text-white shadow-[0_10px_20px_rgba(16,185,129,0.3)]"
                                    : "bg-zinc-900 border-white/5 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-emerald-400 group-hover:border-emerald-500/30"
                                }`}>
                                <span className={`text-[8px] uppercase leading-none mb-1 tracking-[0.2em] ${isLatest ? 'opacity-80' : 'opacity-40'}`}>Scroll</span>
                                <span className="text-lg md:text-xl leading-none italic tracking-tighter">
                                    {ch.chapter_number || ch.title?.match(/\d+/)?.[0] || i + 1}
                                </span>
                            </div>

                            <div className="flex flex-col">
                                <h4 className={`text-base md:text-lg font-black italic uppercase tracking-tighter transition-colors duration-300 line-clamp-1
                                ${isLatest ? "text-white" : "text-zinc-400 group-hover:text-white"}`}>
                                    {ch.title || ch.chapter_title || `Scroll ${ch.chapter_number}`}
                                </h4>

                                <div className="flex items-center flex-wrap gap-y-2 gap-x-5 mt-2">
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={12} className="text-emerald-500 opacity-70" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                            {formatDate(ch.release_date || ch.updated_at)}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Eye size={12} className="text-emerald-500 opacity-70" />
                                        <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">
                                            {ch.views?.toLocaleString() || '0'} Cultivators
                                        </span>
                                    </div>
                                    {isLatest && (
                                        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-emerald-500/10 border border-emerald-500/20">
                                            <Sparkles size={10} className="text-emerald-400 animate-pulse" fill="currentColor" />
                                            <span className="text-[8px] font-black text-emerald-400 uppercase tracking-widest">New Scripture</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Right Interaction */}
                        <div className="flex items-center gap-4 shrink-0 relative z-10">
                            <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl border flex items-center justify-center transition-all duration-500 
                                ${isLatest
                                    ? "bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-inner"
                                    : "bg-zinc-900 border-white/5 text-zinc-700 group-hover:text-emerald-400 group-hover:scale-110 group-hover:border-emerald-500/50"
                                }`}>
                                <BookOpen size={18} fill={isLatest ? "currentColor" : "none"} className={isLatest ? "ml-0.5 animate-pulse" : "ml-0.5 opacity-40 group-hover:opacity-100"} />
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}