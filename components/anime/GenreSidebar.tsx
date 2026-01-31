// components/GenreSidebar.tsx
import Link from 'next/link';

interface GenreSidebarProps {
    genres: any;
    activeSlug?: string;
}

export default function GenreSidebar({ genres, activeSlug }: GenreSidebarProps) {
    return (
        <aside className="col-span-12 lg:col-span-3">
            <div className="sticky top-24">
                <div className="flex items-center gap-2 mb-6">
                    <div className="w-2 h-6 bg-orange-600 rounded-full shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                    <h2 className="text-lg font-black uppercase tracking-tighter text-white">
                        Pilih Genre Kamu
                    </h2>
                </div>

                <div className="bg-zinc-900/40 border border-zinc-800/50 rounded-3xl p-5 backdrop-blur-md">
                    <div className="flex flex-wrap gap-2">
                        {genres?.data?.map((genre: any) => {
                            const isActive = activeSlug === genre.endpoint;
                            return (
                                <Link
                                    key={genre.endpoint}
                                    href={`/anime/genres/${genre.endpoint}`}
                                    className={`px-3 py-1.5 text-[11px] font-bold rounded-xl border transition-all hover:-translate-y-1 active:scale-95 ${isActive
                                            ? "bg-orange-600 text-white border-orange-500 shadow-[0_5px_15px_rgba(249,115,22,0.4)]"
                                            : "bg-zinc-800/40 text-zinc-300 border-zinc-700/30 hover:bg-zinc-700 hover:text-white"
                                        }`}
                                >
                                    {genre.title}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </aside>
    );
}