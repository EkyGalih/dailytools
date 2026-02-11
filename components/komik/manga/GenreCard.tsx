import Link from "next/link"
import { Eye, Clock, Zap, ChevronRight, Bookmark } from "lucide-react"
import Image from "next/image";

export default function GenreCard({ genre }: { genre: any }) {
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
            className="group relative flex flex-col overflow-hidden rounded-[2.5rem] bg-[#0c0c0e] border border-white/5 hover:border-orange-500/50 transition-all duration-500 shadow-2xl h-full"
        >
            {/* CONTAINER GAMBAR DOMINAN */}
            <div className="relative aspect-[3/4] overflow-hidden bg-zinc-800">
                <Image
                    src={thumbnail}
                    alt={title}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105 opacity-90 group-hover:opacity-100"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                />

                {/* Overlay Gradient Super Dark & Elegant */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/20 to-transparent" />

                {/* Badge Atas - Container */}
                <div className="absolute top-5 left-5 right-5 flex items-center justify-between z-20">
                    {/* Kiri: Tipe Komik */}
                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest shadow-xl shadow-orange-600/20">
                        <Zap size={12} fill="currentColor" />
                        {type}
                    </div>

                    {/* Kanan: Latest Chapter (Glassmorphism Style) */}
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white shadow-2xl">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-wider">
                            {latest_chapter?.title || 'New'}
                        </span>
                    </div>
                </div>

                {/* Teks di Atas Gambar (Bottom Aligned) */}
                <div className="absolute bottom-6 left-6 right-6 z-10">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <span className="h-[2px] w-8 bg-orange-500 rounded-full"></span>
                            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                                {genreName}
                            </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black text-white leading-[1.1] uppercase italic tracking-tighter line-clamp-2 drop-shadow-2xl group-hover:text-orange-400 transition-colors">
                            {title}
                        </h3>
                    </div>
                </div>
            </div>

            {/* AREA KONTEN BAWAH */}
            <div className="p-7 pt-2 flex flex-col flex-grow">
                <p className="text-[12px] text-zinc-500 line-clamp-2 mb-6 font-medium italic leading-relaxed">
                    {description}
                </p>

                {/* Stats & Button Row */}
                <div className="mt-auto flex items-center justify-between pt-5 border-t border-white/5">
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <Eye size={14} className="text-orange-600" />
                            <span className="text-[11px] font-black uppercase">{views.replace('x', '')}</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-zinc-400">
                            <Clock size={14} className="text-orange-600" />
                            <span className="text-[11px] font-black uppercase">{time}</span>
                        </div>
                    </div>

                    <div className="w-11 h-11 rounded-2xl bg-zinc-900 flex items-center justify-center border border-white/5 group-hover:bg-orange-600 group-hover:border-orange-500 transition-all duration-500 group-hover:rotate-[360deg]">
                        <ChevronRight size={20} className="text-zinc-500 group-hover:text-white" />
                    </div>
                </div>
            </div>
        </Link>
    )
}