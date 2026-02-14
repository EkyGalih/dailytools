import Image from "next/image"
import Link from "next/link"
import { Star, Eye, Bookmark, Zap } from "lucide-react"

export default function KomikSearchCard({ manga }: { manga: any }) {
    const format = manga.taxonomy?.Format?.[0]?.name ?? "Unknown"
    const genres = manga.taxonomy?.Genre?.slice(0, 2) ?? []
    const countryFlag = manga.country_id?.toLowerCase() === "jp" ? "🇯🇵" : manga.country_id?.toLowerCase() === "kr" ? "🇰🇷" : manga.country_id?.toLowerCase() === "cn" ? "🇨🇳" : "🌍"

    // Theme color based on format
    const themeColor = format.toLowerCase() === 'manhwa' ? 'border-cyan-500/30 shadow-cyan-500/5' :
        format.toLowerCase() === 'manhua' ? 'border-emerald-500/30 shadow-emerald-500/5' :
            'border-red-500/30 shadow-red-500/5';

    return (
        <Link
            href={`/komik/${manga.manga_id}`}
            className={`group relative flex flex-col w-full bg-[#0c0c0e] rounded-[2rem] overflow-hidden border transition-all duration-500 hover:-translate-y-2 hover:border-orange-500/50 shadow-2xl ${themeColor}`}
        >
            {/* IMAGE AREA */}
            <div className="relative aspect-[3/4.2] overflow-hidden m-2 rounded-[1.6rem] bg-zinc-900">
                <Image
                    src={manga.cover_image_url}
                    alt={manga.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width:768px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent" />

                {/* TOP LEFT: Format Badge */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-orange-600 text-white text-[9px] font-black uppercase tracking-widest shadow-lg">
                        <Zap size={10} fill="currentColor" />
                        {format}
                    </div>
                </div>

                {/* TOP RIGHT: Rating */}
                <div className="absolute top-3 right-3">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-white">
                        <Star size={10} className="text-yellow-500" fill="currentColor" />
                        {manga.user_rate || '0.0'}
                    </div>
                </div>

                {/* BOTTOM OVERLAY */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                    <div className="space-y-1">
                        <div className="px-2.5 py-1 rounded-lg bg-white text-black text-[10px] font-black uppercase italic shadow-xl inline-block">
                            CH. {manga.latest_chapter_number}
                        </div>
                        <div className="flex gap-1">
                            {genres.map((g: any, i: number) => (
                                <span key={i} className="text-[8px] font-black uppercase tracking-widest text-zinc-400 bg-zinc-900/80 px-2 py-0.5 rounded-md border border-white/5">
                                    {g.name}
                                </span>
                            ))}
                        </div>
                    </div>
                    <span className="text-xl drop-shadow-2xl">{countryFlag}</span>
                </div>
            </div>

            {/* INFO AREA */}
            <div className="px-5 pb-6 pt-1 flex flex-col flex-grow bg-[#0c0c0e]">
                <h3 className="text-sm font-black text-white leading-tight uppercase italic tracking-tighter line-clamp-2 mb-4 group-hover:text-orange-500 transition-colors">
                    {manga.title}
                </h3>

                <div className="mt-auto pt-4 border-t border-white/5 grid grid-cols-2 gap-2">
                    <div className="flex flex-col gap-1">
                        <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-600">Engagement</span>
                        <div className="flex items-center gap-2 text-[9px] font-bold text-zinc-400">
                            <div className="flex items-center gap-1">
                                <Eye size={10} className="text-orange-500" />
                                {(manga.view_count ?? 0).toLocaleString("id-ID")}
                            </div>
                            <div className="flex items-center gap-1">
                                <Bookmark size={10} className="text-orange-500" />
                                {(manga.bookmark_count ?? 0).toLocaleString("id-ID")}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <span className="text-[7px] font-black uppercase tracking-[0.2em] text-zinc-600">Year</span>
                        <span className="text-[10px] font-black text-zinc-300 uppercase italic">
                            {manga.release_year || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </Link>
    )
}