import Link from "next/link"
import Image from "next/image"

interface MangaProps {
    manhwa: {
        manga_id: string;
        title: string;
        cover_image_url: string;
        latest_chapter_number: string | number;
        latest_chapter_time: string | number;
        type?: string;
        release_year?: string;
        user_rate?: string | number;
    }
}

export default function ManhwaLatestCard({ manhwa }: MangaProps) {
    const formattedDate = manhwa.latest_chapter_time
        ? new Intl.DateTimeFormat('id-ID', {
            day: '2-digit',
            month: 'short',
        }).format(new Date(manhwa.latest_chapter_time))
        : "Baru";

    return (
        <Link
            href={`/komik/manhwa/${manhwa.manga_id}`}
            title={`Baca ${manhwa.title}`}
            className="group relative flex flex-col w-full max-w-[220px] overflow-hidden rounded-2xl bg-[#070708] border border-white/[0.05] hover:border-cyan-500/40 transition-all duration-300"
        >
            {/* 1. IMAGE SECTION (More Compact Aspect Ratio) */}
            <div className="relative aspect-[3/4] overflow-hidden m-1.5 rounded-xl">
                {/* Gradient Overlay */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#070708] via-transparent to-transparent opacity-80" />

                <Image
                    src={manhwa.cover_image_url}
                    alt={manhwa.title}
                    fill
                    sizes="(max-width: 768px) 45vw, 180px"
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                />

                {/* Top Badge Left: Latest */}
                <div className="absolute top-2 left-2 z-20">
                    <span className="px-2 py-0.5 text-[8px] font-black uppercase tracking-tighter bg-cyan-500 text-black rounded-md">
                        Latest
                    </span>
                </div>

                {/* Top Badge Right: Year */}
                {manhwa.release_year && (
                    <div className="absolute top-2 right-2 z-20 px-1.5 py-0.5 rounded-md bg-black/40 backdrop-blur-md border border-white/10 text-[8px] font-bold text-white/70">
                        {manhwa.release_year}
                    </div>
                )}

                {/* Bottom Badge: Chapter */}
                <div className="absolute bottom-2 left-2 z-20">
                    <div className="px-2 py-1 rounded-lg bg-cyan-500/10 backdrop-blur-md border border-cyan-500/20 flex items-center gap-1.5">
                        <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                        <span className="text-[9px] font-black text-cyan-400 uppercase">
                            Ch. {manhwa.latest_chapter_number}
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. CONTENT SECTION (Slimmer Padding) */}
            <div className="px-3 pb-3 pt-1 flex flex-col gap-1.5">
                <h3 className="text-[13px] font-bold text-zinc-100 group-hover:text-cyan-400 transition-colors line-clamp-1 leading-tight tracking-tight">
                    {manhwa.title}
                </h3>

                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                        <span className="text-yellow-500 text-[9px]">⭐</span>
                        <span className="text-[9px] font-bold text-zinc-300">{manhwa.user_rate || "8.5"}</span>
                    </div>
                    <span className="text-[8px] font-medium text-zinc-500 uppercase tracking-tighter">
                        {formattedDate}
                    </span>
                </div>
            </div>

            {/* Hover Glow Accent */}
            <div className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 border border-cyan-500/10" />
        </Link>
    )
}