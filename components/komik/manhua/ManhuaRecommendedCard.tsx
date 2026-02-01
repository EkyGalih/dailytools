import Link from "next/link"
import Image from "next/image"

export default function ManhuaRecommendedCard({ manhua }: { manhua: any }) {

    return (
        <Link
            href={`/komik/manhua/${manhua.manga_id}`}
            title={`Rekomendasi Manhua: ${manhua.title}`}
            className="group relative flex flex-col w-full overflow-hidden rounded-[2rem] bg-[#0d0d0e] border border-emerald-500/10 hover:border-emerald-500/40 transition-all duration-500 shadow-xl"
        >
            {/* 1. TOP IMAGE CONTAINER */}
            <div className="relative aspect-[3/4.2] overflow-hidden m-2 rounded-[1.5rem]">
                {/* Emerald Wash Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050606] via-emerald-900/5 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />

                <Image
                    src={manhua.cover_image_url}
                    alt={`Cover ${manhua.title}`}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transform group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000 ease-out"
                />

                {/* Status Badge: Recommended */}
                <div className="absolute top-3 left-3 z-20">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-500/40 blur-md rounded-full" />
                        <span className="relative flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-950/80 backdrop-blur-md border border-emerald-500/30 text-[9px] font-black uppercase tracking-widest text-emerald-400">
                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                            Recommended
                        </span>
                    </div>
                </div>

                {/* Quick Info Overlay (Bottom) */}
                <div className="absolute bottom-3 left-3 right-3 z-20 flex justify-between items-center">
                    <div className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/5 flex items-center gap-1">
                        <span className="text-yellow-500 text-[10px]">⭐</span>
                        <span className="text-[10px] font-black text-white">{manhua.user_rate}</span>
                    </div>
                    <div className="px-2 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/5">
                        <span className="text-[9px] font-bold text-emerald-400 uppercase tracking-tighter">
                            {manhua.type || 'Manhua'}
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. CONTENT INFO */}
            <div className="px-4 pb-5 pt-1 space-y-2">
                <h3 className="text-sm font-black text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-2 uppercase tracking-tight leading-snug pl-1 min-h-[40px] flex items-center">
                    {manhua.title}
                </h3>

                {/* Views & Decorative Line */}
                <div className="flex items-center gap-3 pl-1">
                    <div className="h-[1px] w-6 bg-emerald-500/30 group-hover:w-10 transition-all duration-500" />
                    <span className="text-[9px] font-bold text-zinc-500 uppercase tracking-[0.1em]">
                        {manhua.view_count.toLocaleString()} Cultivators
                    </span>
                </div>
            </div>

            {/* 3. LUXURY BORDER SHIMMER */}
            <div className="absolute inset-0 pointer-events-none rounded-[2rem] border border-emerald-500/0 group-hover:border-emerald-500/20 transition-all duration-500" />
        </Link>
    )
}