// components/komik/manhua/ManhwaGenreSideList.tsx
import Link from "next/link"
import { Compass, Hash, Zap } from "lucide-react"

export default function ManhwaGenreSideList({ genres, currentGenre }: { genres: any[], currentGenre?: string }) {
    return (
        <aside className="sticky top-28 w-full max-w-sm ml-auto group">
            {/* Outer Glow Decor */}
            <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-cyan-600 rounded-[2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>

            <div className="relative overflow-hidden rounded-[2rem] bg-[#050505] border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.15)]">

                {/* Header: Neon Banner */}
                <div className="p-6 pb-4 border-b border-white/5 bg-gradient-to-br from-cyan-950/20 to-cyan-950/20">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="relative">
                                <div className="absolute inset-0 bg-cyan-500 blur-md opacity-50 animate-pulse"></div>
                                <Compass size={20} className="relative text-cyan-400" />
                            </div>
                            <h2 className="text-sm font-black uppercase tracking-[0.3em] text-white italic">
                                Genre <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-cyan-400">System</span>
                            </h2>
                        </div>
                        <Zap size={14} className="text-cyan-500 animate-bounce" fill="currentColor" />
                    </div>
                </div>

                <div className="p-5">
                    <div className="grid grid-cols-2 gap-2.5 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                        {genres.map((genre: any) => {
                            const cleanTitle = genre.title.split('(')[0].trim();
                            const count = genre.title.match(/\((.*?)\)/)?.[1];
                            const isActive = currentGenre === genre.endpoint;

                            return (
                                <Link
                                    key={genre.endpoint}
                                    href={`/komik/manhwa/genre/${genre.endpoint}`}
                                    className={`group/item relative flex items-center justify-between px-3 py-3 rounded-xl transition-all duration-500 border ${isActive
                                            ? "bg-cyan-500/20 border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.3)] scale-[1.02]"
                                            : "bg-white/[0.03] border-white/5 hover:border-cyan-500/50 hover:bg-cyan-500/10"
                                        }`}
                                >
                                    <div className="flex items-center gap-2 overflow-hidden relative z-10">
                                        <Hash size={10} className={isActive ? "text-cyan-400" : "text-zinc-400"} />
                                        <span className={`text-[10px] font-black uppercase tracking-tighter truncate ${isActive ? "text-white text-shadow-glow" : "text-cyan-500 group-hover/item:text-cyan-300"
                                            }`}>
                                            {cleanTitle}
                                        </span>
                                    </div>

                                    {count && (
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded flex-shrink-0 relative z-10 ${isActive
                                                ? "bg-white text-cyan-400 shadow-[0_0_10px_white]"
                                                : "bg-black text-cyan-600 group-hover/item:text-cyan-400"
                                            }`}>
                                            {count}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Neon Bar */}
                <div className="h-1 w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50"></div>
            </div>
        </aside>
    )
}