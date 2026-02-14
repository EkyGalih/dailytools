'use client'

import { Calendar, Eye, Zap, ChevronRight } from "lucide-react";
import Link from "next/link"

interface ChapterListProps {
    chapters: any[]
    formatType?: string // 'manga' | 'manhwa' | 'manhua'
}

export default function ChapterList({ chapters, formatType = 'manga' }: ChapterListProps) {

    // Formatter tanggal stabil
    const formatDate = (dateString: string) => {
        if (!dateString) return "Unknown";
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return "-";

        return new Intl.DateTimeFormat("id-ID", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(date);
    };

    // Dinamis Warna berdasarkan Kategori
    const theme = {
        manga: {
            border: "group-hover:border-red-500/50",
            glow: "bg-red-500/20",
            text: "text-red-500",
            accent: "bg-red-500",
            shadow: "shadow-red-500/20"
        },
        manhwa: {
            border: "group-hover:border-cyan-500/50",
            glow: "bg-cyan-500/20",
            text: "text-cyan-400",
            accent: "bg-cyan-500",
            shadow: "shadow-cyan-500/20"
        },
        manhua: {
            border: "group-hover:border-emerald-500/50",
            glow: "bg-emerald-500/20",
            text: "text-emerald-400",
            accent: "bg-emerald-500",
            shadow: "shadow-emerald-500/20"
        }
    }[formatType.toLowerCase()] || { border: "group-hover:border-orange-500/50", glow: "bg-orange-500/20", text: "text-orange-500", accent: "bg-orange-500", shadow: "shadow-orange-500/20" };

    if (!chapters || chapters.length === 0) return (
        <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[3rem]">
            <p className="text-zinc-600 font-black uppercase tracking-[0.4em] italic">No Archives Found</p>
        </div>
    );

    return (
        <div className="w-full space-y-3 md:space-y-4">
            {chapters.map((ch: any, i: number) => {
                const isLatest = i === 0;

                return (
                    <Link
                        key={ch.chapter_id}
                        href={`/komik/read/${ch.chapter_id}`}
                        // Gunakan block dan cursor-pointer di sini agar area deteksi maksimal
                        className="block group cursor-pointer no-underline outline-none"
                    >
                        <div
                            className={`relative flex items-center justify-between p-4 md:p-6 rounded-[2rem] md:rounded-[3rem] border transition-all duration-500 overflow-hidden bg-[#0c0c0e]/80 backdrop-blur-md active:scale-[0.98]
                            ${isLatest
                                    ? `border-white/10 ${theme.shadow} shadow-2xl`
                                    : `border-white/5 hover:bg-white/[0.02] ${theme.border}`
                                }`}
                        >
                            {/* THEME ACCENT (Pointer events none agar tidak ganggu kursor) */}
                            <div className={`absolute left-0 top-0 h-full w-[3px] transition-all duration-500 pointer-events-none
                                ${isLatest ? theme.accent : 'bg-transparent group-hover:' + theme.accent}`}
                            />

                            {/* KONTEN KIRI (Semua elemen dalam diberi pointer-events-none) */}
                            <div className="flex items-center gap-4 md:gap-8 relative z-10 pointer-events-none">
                                {/* Chapter Box */}
                                <div className={`relative w-12 h-12 md:w-16 md:h-16 rounded-[1.2rem] md:rounded-[2rem] flex flex-col items-center justify-center font-black transition-all duration-500 shrink-0 border
                                ${isLatest
                                        ? `${theme.accent} border-white/20 text-white shadow-xl`
                                        : `bg-zinc-900 border-white/5 text-zinc-500 group-hover:bg-zinc-800 group-hover:text-white`
                                    }`}>
                                    <span className={`text-[7px] md:text-[8px] uppercase leading-none mb-1 tracking-widest opacity-60`}>Chapter</span>
                                    <span className="text-base md:text-xl leading-none italic">
                                        {ch.chapter_number}
                                    </span>
                                </div>

                                <div className="flex flex-col min-w-0">
                                    <h4 className={`text-sm md:text-lg font-black italic uppercase tracking-tighter transition-colors duration-300 line-clamp-1
                                    ${isLatest ? "text-white" : "text-zinc-400 group-hover:text-white"}`}>
                                        {ch.chapter_title ? ch.chapter_title : `Chapter ${ch.chapter_number}`}
                                    </h4>

                                    <div className="flex items-center flex-wrap gap-y-1 gap-x-3 md:gap-x-6 mt-1.5 md:mt-2">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={12} className={theme.text} />
                                            <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                                {formatDate(ch.release_date)}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Eye size={12} className={theme.text} />
                                            <span className="text-[9px] md:text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                                                {(ch.view_count || 0).toLocaleString()} <span className="hidden md:inline">Views</span>
                                            </span>
                                        </div>
                                        {isLatest && (
                                            <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full ${theme.glow} border border-white/5`}>
                                                <Zap size={10} className={theme.text} fill="currentColor" />
                                                <span className={`text-[8px] font-black uppercase tracking-widest ${theme.text}`}>New Update</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* KONTEN KANAN */}
                            <div className="flex items-center gap-3 md:gap-4 shrink-0 relative z-10 pointer-events-none">
                                <span className={`hidden md:block text-[10px] font-black uppercase tracking-[0.2em] opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0 ${theme.text}`}>
                                    Launch Reader
                                </span>
                                <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl border flex items-center justify-center transition-all duration-500 
                                    ${isLatest
                                        ? `bg-white/5 border-white/10 text-white`
                                        : "bg-zinc-950 border-white/5 text-zinc-700 group-hover:scale-110 group-hover:border-white/20 group-hover:text-white"
                                    }`}>
                                    <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                                </div>
                            </div>
                        </div>
                    </Link>
                );
            })}
        </div>
    );
}