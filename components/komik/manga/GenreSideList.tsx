// components/komik/manga/GenreSideList.tsx
import Link from "next/link"

export default function GenreSideList({
    genres,
    currentGenre
}: {
    genres: any[],
    currentGenre?: string // Kita tambah prop ini
}) {
    return (
        <aside className="sticky top-28 space-y-6">
            <div className="p-6 bg-zinc-900/40 backdrop-blur-xl border border-zinc-800/50 rounded-[2.5rem] shadow-2xl">
                <div className="mb-6 px-2">
                    <h2 className="text-lg font-black uppercase tracking-widest flex items-center gap-2 text-white">
                        <span className="w-1.5 h-5 bg-orange-600 rounded-full" />
                        Explore <span className="text-orange-500">Genres</span>
                    </h2>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase tracking-wider mt-1 ml-3">
                        Filter sesuai kategori favorit
                    </p>
                </div>

                <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
                    {genres.map((genre: any) => {
                        const cleanTitle = genre.title.split('(')[0].trim();
                        const count = genre.title.match(/\((.*?)\)/)?.[1];

                        // CEK APAKAH GENRE INI SEDANG ACTIVE
                        const isActive = currentGenre === genre.endpoint;

                        return (
                            <Link
                                key={genre.endpoint}
                                href={`/komik/manga/genre/${genre.endpoint}`}
                                className={`group flex items-center gap-2 px-3 py-2 rounded-xl border transition-all duration-300 ${isActive
                                        ? "bg-orange-600 border-orange-500 shadow-lg shadow-orange-600/20"
                                        : "bg-zinc-800/30 border-zinc-700/50 hover:bg-orange-600/20 hover:border-orange-500/50"
                                    }`}
                            >
                                <span className={`text-[11px] font-black uppercase tracking-tight transition-colors ${isActive ? "text-white" : "text-zinc-400 group-hover:text-white"
                                    }`}>
                                    {cleanTitle}
                                </span>

                                {count && count !== "0" && (
                                    <span className={`text-[9px] font-black px-1.5 py-0.5 rounded-md transition-colors ${isActive
                                            ? "bg-white text-orange-600"
                                            : "bg-zinc-950/50 text-orange-500 group-hover:bg-orange-700 group-hover:text-white"
                                        }`}>
                                        {count}
                                    </span>
                                )}
                            </Link>
                        );
                    })}
                </div>
            </div>
        </aside>
    )
}