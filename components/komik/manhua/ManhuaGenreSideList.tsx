// components/komik/manga/ManhuaGenreSideList.tsx
import Link from "next/link"
import { Compass, Zap } from "lucide-react"

export default function ManhuaGenreSideList({
    genres,
    currentGenre
}: {
    genres: any[],
    currentGenre?: string
}) {
    return (
        <aside className="sticky top-28 w-full max-w-sm ml-auto">
            <div className="relative overflow-hidden rounded-[2rem] bg-[#09090b] border border-white/[0.05] shadow-2xl">

                {/* Header Section */}
                <div className="p-5 pb-4 border-b border-white/[0.03] bg-zinc-950/20">
                    <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                            <div className="p-1.5 rounded-lg bg-emerald-500/10">
                                <Compass size={16} className="text-emerald-500" />
                            </div>
                            <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white italic">
                                Genre <span className="text-emerald-500">Path</span>
                            </h2>
                        </div>
                        <Zap size={12} className="text-zinc-700" />
                    </div>
                </div>

                {/* Grid Container: 2 Kolom */}
                <div className="p-4">
                    <div className="grid grid-cols-2 gap-x-3 gap-y-1.5 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                        {genres.map((genre: any) => {
                            const cleanTitle = genre.title.split('(')[0].trim();
                            const count = genre.title.match(/\((.*?)\)/)?.[1];
                            const isActive = currentGenre === genre.endpoint;

                            return (
                                <Link
                                    key={genre.endpoint}
                                    href={`/komik/manhua/genre/${genre.endpoint}`}
                                    className={`group relative flex items-center justify-between mb-2 px-3 py-2 rounded-xl transition-all duration-300 border ${isActive
                                            ? "bg-emerald-500/10 border-emerald-500/30"
                                            : "bg-white/[0.02] border-transparent hover:border-emerald-500/20 hover:bg-white/[0.04]"
                                        }`}
                                >
                                    <span className={`text-[10px] font-bold uppercase tracking-tight truncate pr-1 ${isActive ? "text-emerald-400" : "text-zinc-500 group-hover:text-zinc-200"
                                        }`}>
                                        {cleanTitle}
                                    </span>

                                    {count && (
                                        <span className={`text-[8px] font-black px-1.5 py-0.5 rounded-md flex-shrink-0 ${isActive
                                                ? "bg-emerald-500 text-black"
                                                : "bg-zinc-900 text-zinc-600 group-hover:text-emerald-500"
                                            }`}>
                                            {count.replace('.', '')}
                                        </span>
                                    )}
                                </Link>
                            );
                        })}
                    </div>
                </div>

                {/* Footer Section */}
                <div className="p-4 bg-zinc-950/50 border-t border-white/[0.03]">
                    <Link
                        href="/komik/genres"
                        className="flex items-center justify-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] text-zinc-600 hover:text-emerald-500 transition-colors"
                    >
                        Explore All Categories →
                    </Link>
                </div>
            </div>
        </aside>
    )
}