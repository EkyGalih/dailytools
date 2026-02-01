import Link from "next/link"
import Image from "next/image"

export default function ManhuaPopularMiniCard({
    manhua,
    rank,
}: {
    manhua: any
    rank: number
}) {
    // Warna ranking (Top 3 mendapatkan warna spesial)
    const rankColor = rank === 1 ? "text-yellow-500" : rank === 2 ? "text-emerald-400" : rank === 3 ? "text-teal-500" : "text-zinc-600";

    return (
        <Link
            href={`/komik/manhua/${manhua.manhua_id}`}
            title={`Peringkat ${rank}: ${manhua.title}`}
            className="flex items-center gap-4 p-2.5 rounded-2xl bg-[#0d0d0e]/50 backdrop-blur-sm border border-white/[0.03] hover:border-emerald-500/30 hover:bg-emerald-500/[0.02] transition-all duration-300 group"
        >
            {/* RANK NUMBER - Elegant Typography */}
            <div className={`w-6 text-center font-black italic text-lg tracking-tighter transition-transform group-hover:scale-110 ${rankColor}`}>
                {rank < 10 ? `0${rank}` : rank}
            </div>

            {/* THUMBNAIL - Clean Border */}
            <div className="relative w-12 h-16 rounded-xl overflow-hidden shrink-0 border border-white/5 group-hover:border-emerald-500/20 transition-colors shadow-lg">
                <Image
                    src={manhua.cover_image_url}
                    alt={manhua.title}
                    fill
                    sizes="48px"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-500"
                />
                {/* Overlay Subtle Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* CONTENT - High Scannability */}
            <div className="flex-1 min-w-0 space-y-1">
                <h3 className="text-[13px] font-black text-zinc-200 truncate group-hover:text-emerald-400 transition-colors uppercase tracking-tight">
                    {manhua.title}
                </h3>

                <div className="flex items-center gap-2">
                    {/* Rating Section */}
                    <div className="flex items-center gap-1">
                        <span className="text-[10px]">⭐</span>
                        <span className="text-[10px] font-bold text-zinc-400 group-hover:text-zinc-200 transition-colors">
                            {manhua.user_rate}
                        </span>
                    </div>

                    {/* Visual Divider Dot */}
                    <div className="w-1 h-1 rounded-full bg-zinc-800" />

                    {/* Views Section */}
                    <div className="flex items-center gap-1">
                        <span className="text-[9px] font-black text-zinc-600 uppercase tracking-tighter group-hover:text-emerald-500/50 transition-colors">
                            {manhua.view_count.toLocaleString()} Cultivators
                        </span>
                    </div>
                </div>
            </div>

            {/* HOVER INDICATOR - Minimalist Arrow */}
            <div className="opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 pr-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="text-emerald-500" viewBox="0 0 256 256">
                    <path d="M221.66,133.66l-72,72a8,8,0,0,1-11.32-11.32L204.69,128,141.66,64.91a8,8,0,0,1,11.32-11.32l72,72A8,8,0,0,1,221.66,133.66Z"></path>
                </svg>
            </div>
        </Link>
    )
}