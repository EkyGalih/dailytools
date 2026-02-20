import Link from "next/link"
import Image from "next/image"

export default function FreeMiniCard({ theater }: { theater: any }) {
    const id = theater.shortPlayId;
    const title = theater.shortPlayName;
    const cover = theater.shortPlayCover || theater.groupShortPlayCover;
    const score = theater.heatScoreShow || "9.0";

    return (
        <Link 
            href={`/drama/netshort/detail/${id}`}
            className="flex items-center gap-4 rounded-2xl bg-zinc-50/50 border border-transparent hover:border-rose-100 hover:bg-white hover:shadow-sm transition-all duration-300 group"
        >
            {/* Thumbnail */}
            <div className="relative w-16 h-20 rounded-xl overflow-hidden shrink-0 bg-zinc-200">
                <Image 
                    src={cover} 
                    alt={title} 
                    fill 
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    unoptimized
                />
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
                <h3 className="text-[13px] font-bold text-zinc-900 line-clamp-1 group-hover:text-rose-600 transition-colors uppercase tracking-tight">
                    {title}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                    <span className="text-[10px] font-black text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                        🔥 {score}
                    </span>
                    <span className="text-[10px] font-medium text-zinc-400 uppercase tracking-widest">
                        HD 1080P
                    </span>
                </div>
            </div>
        </Link>
    )
}