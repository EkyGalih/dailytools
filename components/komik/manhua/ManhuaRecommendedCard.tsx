import Link from "next/link"
import Image from "next/image"
import { Users, Zap, TrendingUp, ChevronRight } from "lucide-react"

export default function ManhuaRecommendedCard({ manhua }: { manhua: any }) {
    const formatViewers = (num: number) => {
        if (!num) return "0";
        return num >= 1000000
            ? (num / 1000000).toFixed(1) + 'M'
            : num.toLocaleString('id-ID');
    };

    return (
        <Link
            href={`/komik/manhua/detail/${manhua.endpoint}`}
            title={`Baca Manhua: ${manhua.title}`}
            className="group relative flex flex-col w-full overflow-hidden rounded-[1.5rem] md:rounded-[2.5rem] bg-[#0b0c0d] border border-emerald-500/5 hover:border-emerald-500/40 transition-all duration-500 shadow-2xl h-full"
        >
            {/* 1. IMAGE CONTAINER (Responsive Ratio) */}
            {/* Di mobile kita buat sedikit lebih tinggi agar gambar tidak terlalu gepeng */}
            <div className="relative aspect-[16/10] md:aspect-[16/9] overflow-hidden m-1.5 md:m-2.5 rounded-[1.2rem] md:rounded-[1.8rem] bg-zinc-900">
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#0b0c0d] via-transparent to-transparent opacity-90" />

                <Image
                    src={manhua.thumbnail}
                    alt={manhua.title}
                    fill
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Badge Atas: Responsive sizing */}
                <div className="absolute top-2 left-2 right-2 md:top-3 md:left-3 md:right-3 flex justify-between items-center z-20">
                    <div className="flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl bg-emerald-600 text-white text-[8px] md:text-[9px] font-black uppercase tracking-widest shadow-lg">
                        <Zap size={10} fill="currentColor" className="md:w-3 md:h-3" />
                        {manhua.type}
                    </div>

                    <div className="px-2 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-emerald-400 text-[8px] md:text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5">
                        <span className="relative flex h-1.5 w-1.5 md:h-2 md:w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 md:h-2 md:w-2 bg-emerald-500"></span>
                        </span>
                        {manhua.newest_chapter}
                    </div>
                </div>

                {/* Title Overlay: Menyesuaikan ukuran text di mobile */}
                <div className="absolute bottom-3 left-3 right-3 md:bottom-4 md:left-4 md:right-4 z-20">
                    <h3 className="text-sm md:text-lg font-black text-white leading-tight uppercase italic tracking-tighter line-clamp-1 group-hover:text-emerald-400 transition-colors drop-shadow-lg">
                        {manhua.title}
                    </h3>
                </div>
            </div>

            {/* 2. FOOTER INFO: Padding lebih kecil di mobile */}
            <div className="px-4 pb-4 md:px-6 md:pb-6 pt-0">
                <div className="flex items-center justify-between pt-3 md:pt-4 border-t border-white/5">
                    {/* Viewers */}
                    <div className="flex items-center gap-2">
                        <div className="p-1 md:p-1.5 rounded-lg bg-emerald-500/10">
                            <Users size={12} className="text-emerald-500 md:w-3.5 md:h-3.5" />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[9px] md:text-[10px] font-black text-white uppercase tracking-tighter leading-none">
                                {formatViewers(manhua.viewers)}
                            </span>
                            <span className="text-[7px] md:text-[8px] text-zinc-500 font-bold uppercase tracking-[0.15em] md:tracking-widest">
                                Cultivators
                            </span>
                        </div>
                    </div>

                    {/* Action Button: Sembunyikan icon dekorasi di mobile agar tidak crowded */}
                    <div className="flex items-center gap-2 md:gap-3">
                        <TrendingUp size={12} className="hidden xs:block text-zinc-700 group-hover:text-emerald-500 transition-colors md:w-3.5 md:h-3.5" />
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-zinc-900 border border-white/5 flex items-center justify-center group-hover:bg-emerald-600 transition-all duration-500">
                            <ChevronRight size={14} className="text-zinc-500 group-hover:text-white md:w-[18px] md:h-[18px]" />
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    )
}