import Link from "next/link"
import { Eye, Clock, Zap, ChevronRight } from "lucide-react"
import Image from "next/image";

export default function ManhuaGenreCard({ genre }: { genre: any }) {
    const {
        title,
        endpoint,
        thumbnail,
        type,
        genre: genreName,
        views_info,
        description,
        latest_chapter
    } = genre;

    // Split views info: "16rb x • 16 menit"
    const views = views_info?.split(' • ')[0] || "0";
    const time = views_info?.split(' • ')[1] || "Baru";

    return (
        <Link
            href={`/komik/manga/detail/${endpoint}`}
            title={`Jelajahi ${title}`}
            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-[#09090b] border border-white/5 hover:border-emerald-500/30 transition-all duration-500 shadow-2xl h-full"
        >
            {/* CONTAINER GAMBAR DOMINAN */}
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-900">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                />

                {/* Overlay Gradient Emerald-Dark */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/40 to-transparent z-10" />

                {/* Badge Atas - Container */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-20">
                    {/* Kiri: Tipe Komik (Emerald Style) */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest shadow-xl shadow-emerald-600/20">
                        <Zap size={11} fill="currentColor" />
                        {type}
                    </div>

                    {/* Kanan: Latest Chapter (Emerald Glassmorphism) */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-emerald-500/20 text-white shadow-2xl">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider text-emerald-400">
                            {latest_chapter?.title || 'New'}
                        </span>
                    </div>
                </div>

                {/* Teks di Atas Gambar (Bottom Aligned) */}
                <div className="absolute bottom-5 left-5 right-5 z-20">
                    <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                            <span className="h-[2px] w-6 bg-emerald-500 rounded-full"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-500">
                                {genreName}
                            </span>
                        </div>
                        <h3 className="text-lg md:text-xl font-black text-white leading-tight uppercase italic tracking-tighter line-clamp-2 drop-shadow-2xl group-hover:text-emerald-400 transition-colors">
                            {title}
                        </h3>
                    </div>
                </div>
            </div>

            {/* AREA KONTEN BAWAH */}
            <div className="p-6 flex flex-col flex-grow">
                <p className="text-[12px] text-zinc-500 line-clamp-2 mb-5 font-medium italic leading-relaxed">
                    "{description}"
                </p>

                {/* Stats & Button Row */}
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-white/[0.03]">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <Eye size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-tighter">
                                {views.replace('x', '').trim()}
                            </span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <Clock size={14} className="text-emerald-500" />
                            <span className="text-[10px] font-black uppercase tracking-tighter">
                                {time}
                            </span>
                        </div>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all duration-500">
                        <ChevronRight size={18} className="text-zinc-500 group-hover:text-white transition-transform group-hover:translate-x-0.5" />
                    </div>
                </div>
            </div>

            {/* Subtle Inner Glow on Hover */}
            <div className="absolute inset-0 pointer-events-none border border-emerald-500/0 group-hover:border-emerald-500/10 rounded-[2.5rem] transition-all duration-500" />
        </Link>
    )
}