import Link from "next/link"
import Image from "next/image"

export default function ManhuaLatestCard({ manhua }: { manhua: any }) {
    // Format tanggal sederhana untuk SEO & Info (opsional jika ada datanya)
    const formattedDate = manhua.latest_chapter_time
        ? new Intl.DateTimeFormat('id-ID', { day: '2-digit', month: 'short' }).format(new Date(manhua.latest_chapter_time))
        : "Baru";

    return (
        <Link
            href={`/komik/manhua/${manhua.manhua_id}`}
            title={`Update Terbaru ${manhua.title}`}
            className="group relative flex flex-col w-full overflow-hidden rounded-[1.5rem] bg-[#070708] border border-white/[0.03] hover:border-emerald-500/40 transition-all duration-500 shadow-2xl"
        >
            {/* 1. COVER SECTION */}
            <div className="relative aspect-[3/4.2] overflow-hidden">
                {/* Dark Vignette Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#070708] via-transparent to-[#070708]/20" />

                <Image
                    src={manhua.cover_image_url}
                    alt={manhua.title}
                    fill
                    sizes="(max-width: 768px) 50vw, 20vw"
                    className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Top Badge: Floating Latest */}
                <div className="absolute top-3 left-3 z-20">
                    <span className="px-3 py-1 text-[9px] font-black uppercase tracking-widest bg-emerald-500 text-black rounded-sm shadow-[0_0_15px_rgba(16,185,129,0.4)]">
                        Latest
                    </span>
                </div>

                {/* Right Badge: Year (Small & Elegant) */}
                {manhua.release_year && (
                    <div className="absolute top-3 right-3 z-20 px-2 py-1 rounded-md bg-black/40 backdrop-blur-md border border-white/5 text-[8px] font-bold text-white/70">
                        {manhua.release_year}
                    </div>
                )}

                {/* Bottom Overlay: Chapter Info (Glassmorphism) */}
                <div className="absolute bottom-3 left-3 right-3 z-20">
                    <div className="px-3 py-2 rounded-xl bg-emerald-950/40 backdrop-blur-md border border-emerald-500/20 flex justify-between items-center group-hover:border-emerald-500/40 transition-colors">
                        <span className="text-[10px] font-black text-emerald-400 uppercase tracking-tighter">
                            Ch. {manhua.latest_chapter_number}
                        </span>
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    </div>
                </div>
            </div>

            {/* 2. INFO SECTION */}
            <div className="p-4 space-y-1.5">
                <h3 className="text-sm font-bold text-zinc-100 group-hover:text-emerald-400 transition-colors line-clamp-1 uppercase tracking-tight leading-snug">
                    {manhua.title}
                </h3>

                <div className="flex items-center justify-between opacity-60">
                    <div className="flex items-center gap-1.5">
                        <span className="text-yellow-500 text-[9px]">⭐</span>
                        <span className="text-[9px] font-bold text-zinc-300">{manhua.user_rate || "0.0"}</span>
                    </div>
                    <span className="text-[8px] font-medium text-zinc-500 uppercase tracking-widest">
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Subtle Hover Glow (Celestial Aura) */}
            <div className="absolute inset-0 pointer-events-none border border-emerald-500/0 group-hover:border-emerald-500/20 rounded-[1.5rem] transition-all duration-500 shadow-[inset_0_0_20px_rgba(16,185,129,0.05)]" />
        </Link>
    )
}