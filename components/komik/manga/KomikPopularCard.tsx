import Link from "next/link"
import Image from "next/image"
import { Eye, Star, TrendingUp } from "lucide-react"

export default function KomikPopularCard({ manga }: { manga: any }) {
    const format = manga.taxonomy?.Format?.[0]?.name ?? "Komik"
    
    const themeStyles = {
        manga: "border-red-500/30 group-hover:border-red-500/60 shadow-red-500/5",
        manhwa: "border-cyan-500/30 group-hover:border-cyan-500/60 shadow-cyan-500/5",
        manhua: "border-emerald-500/30 group-hover:border-emerald-500/60 shadow-emerald-500/5",
    }[format.toLowerCase()] || "border-white/5 group-hover:border-orange-500/50";

    const accentBg = {
        manga: "bg-red-600",
        manhwa: "bg-cyan-600",
        manhua: "bg-emerald-600",
    }[format.toLowerCase()] || "bg-orange-600";

    return (
        <Link
            href={`/komik/${manga.manga_id}`}
            className={`group relative flex flex-col w-full bg-[#0c0c0e] rounded-[1.8rem] md:rounded-[2.5rem] overflow-hidden border transition-all duration-500 shadow-2xl active:scale-[0.97] ${themeStyles}`}
        >
            {/* 1. IMAGE AREA - Dibuat m-1 agar gambar lebih lebar di mobile */}
            <div className="relative aspect-[3/4] overflow-hidden m-1 md:m-2 rounded-t-[1.4rem] md:rounded-t-[2.2rem] rounded-b-none bg-zinc-900">
                <Image
                    src={manga.cover_image_url}
                    alt={manga.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-1000 md:group-hover:scale-110"
                    sizes="(max-width:768px) 50vw, 25vw"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-transparent z-10" />

                {/* BADGES - Dikecilkan di mobile */}
                <div className="absolute top-2 left-2 md:top-4 md:left-4 z-20">
                    <div className={`flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl text-white text-[7px] md:text-[10px] font-black uppercase tracking-widest shadow-xl ${accentBg}`}>
                        <TrendingUp size={8} className="md:w-2.5 md:h-2.5" />
                        Pop
                    </div>
                </div>

                {/* CHAPTER FLOATING - Lebih slim di mobile */}
                <div className="absolute bottom-2 left-2 md:bottom-4 md:left-4 z-20">
                    <div className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl bg-white text-black text-[8px] md:text-[11px] font-black uppercase italic shadow-2xl">
                        CH. {manga.latest_chapter_number}
                    </div>
                </div>
            </div>

            {/* 2. INFO AREA - Padding dikurangi dari 5 ke 3 di mobile */}
            <div className="px-3 pb-4 md:px-6 md:pb-6 pt-1 flex flex-col flex-grow bg-[#0c0c0e]">
                <h3 className="text-[10px] md:text-base font-black text-white leading-tight uppercase italic tracking-tighter line-clamp-2 mb-2 md:mb-4 group-hover:text-orange-400 transition-colors">
                    {manga.title}
                </h3>

                <div className="mt-auto pt-2 md:pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[8px] md:text-[10px] font-bold text-zinc-500">
                        <Eye size={10} className="md:w-3 md:h-3" />
                        <span className="truncate max-w-[40px] md:max-w-none">
                            {(manga.view_count ?? 0).toLocaleString("id-ID")}
                        </span>
                    </div>

                    <div className="flex items-center gap-1 px-1.5 py-0.5 md:px-2 md:py-1 rounded-md md:rounded-lg bg-zinc-900 border border-white/5 text-[8px] md:text-[10px] font-black text-yellow-500">
                        <Star size={8} fill="currentColor" className="md:w-2.5 md:h-2.5" />
                        {manga.user_rate ?? 0}
                    </div>
                </div>
            </div>
        </Link>
    )
}