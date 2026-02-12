import Link from "next/link"
import Image from "next/image"
import { Clock, Zap, Star, ChevronRight } from "lucide-react"

export default function ManhuaLatestCard({ manhua }: { manhua: any }) {
    // Parsing updated_at untuk tampilan lebih bersih
    const updateInfo = manhua.updated_at?.split('|')[0].trim() || "Baru";

    return (
        <Link
            href={`/komik/manga/detail/${manhua.endpoint}`}
            title={`Baca ${manhua.title} - ${manhua.newest_chapter}`}
            className="group relative flex flex-col w-full overflow-hidden rounded-[2rem] bg-[#09090b] border border-white/[0.03] hover:border-emerald-500/40 transition-all duration-500 shadow-2xl h-full"
        >
            {/* 1. COVER SECTION (Portrait) */}
            <div className="relative aspect-[3/4.2] overflow-hidden m-1.5 rounded-[1.6rem] bg-zinc-900">
                {/* Cinematic Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#09090b] via-transparent to-transparent opacity-80" />

                <Image
                    src={manhua.thumbnail}
                    alt={`Cover ${manhua.title}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 25vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                    loading="lazy"
                />

                {/* Badge Atas: Type & Views */}
                <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-20">
                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-emerald-600 text-white text-[8px] font-black uppercase tracking-widest shadow-lg">
                        <Zap size={10} fill="currentColor" />
                        {manhua.type}
                    </div>

                    <div className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 text-zinc-300 text-[8px] font-bold">
                        👁 {manhua.views}
                    </div>
                </div>

                {/* Bottom Overlay: Chapter Info (Glassmorphism) */}
                <div className="absolute bottom-3 left-3 right-3 z-20">
                    <div className="px-3 py-2 rounded-xl bg-black/60 backdrop-blur-md border border-emerald-500/20 flex justify-between items-center group-hover:border-emerald-500/50 transition-colors">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                            {manhua.newest_chapter}
                        </span>
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. INFO SECTION */}
            <div className="px-4 pb-5 pt-2 flex flex-col flex-grow">
                <h3 className="text-[13px] md:text-sm font-black text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-2 uppercase italic tracking-tighter leading-tight mb-3">
                    {manhua.title}
                </h3>

                {/* Meta Info Row */}
                <div className="mt-auto flex items-center justify-between pt-3 border-t border-white/5">
                    <div className="flex items-center gap-2 text-zinc-500">
                        <Clock size={12} className="text-emerald-600" />
                        <span className="text-[9px] font-bold uppercase tracking-wider">
                            {updateInfo}
                        </span>
                    </div>

                    {/* Minimalist Action Icon */}
                    <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-300">
                        <ChevronRight size={14} className="text-zinc-600 group-hover:text-white" />
                    </div>
                </div>
            </div>

            {/* SEO Optimization: Hidden Description for Screen Readers */}
            <span className="sr-only">Baca Manhua {manhua.title} sub indo terbaru di My Tools.</span>
        </Link>
    )
}