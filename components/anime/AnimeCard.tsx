import Link from 'next/link'
import Image from 'next/image'

// Interface disesuaikan dengan model data API
interface AnimeCardProps {
    title: string;
    episode: string;
    info: string;      // Hari (misal: Sabtu)
    update: string;    // Tanggal (misal: 31 Jan)
    thumbnail: string;
    link: string;      // Full URL (biasanya untuk fallback)
    endpoint: string;  // Ini yang jadi slug untuk routing internal
}

export default function AnimeCard({
    title,
    episode,
    info,
    update,
    thumbnail,
    endpoint
}: AnimeCardProps) {
    return (
        <Link
            href={`/anime/${endpoint}`}
            className="group relative block overflow-hidden rounded-2xl bg-zinc-900 transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.7)]"
        >
            {/* Info Badge (Update Terakhir) */}
            <div className="absolute left-2 top-2 z-10 flex flex-col gap-1">
                <div className="flex items-center gap-1 rounded-full bg-orange-600 px-2 py-0.5 shadow-lg">
                    <span className="text-[9px] font-black text-white uppercase tracking-tighter">
                        {info}
                    </span>
                </div>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[3/4] w-full bg-zinc-800">
                <Image
                    src={thumbnail}
                    alt={`Nonton ${title} Sub Indo`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                    priority={false}
                />

                {/* Overlay Gradient Lebih Gelap (Wibu Style) */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-90" />

                {/* Episode Floating Tag */}
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                    <div className="flex items-center gap-1.5 bg-white backdrop-blur-md border border-white/10 px-2 py-1 rounded-lg">
                        <div className="w-1.5 h-1.5 rounded-full bg-orange-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-zinc-900 whitespace-nowrap">
                            {episode}
                        </span>
                    </div>
                    <span className="text-[10px] font-bold text-white bg-black/60 backdrop-blur-md px-2 py-1 rounded-lg border border-white/10">
                        {update}
                    </span>
                </div>
            </div>

            {/* Title Section */}
            <div className="p-4 bg-zinc-900/50">
                <h3 className="line-clamp-2 text-sm font-bold text-zinc-200 group-hover:text-orange-500 transition-colors leading-snug min-h-[40px]">
                    {title}
                </h3>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/20 rounded-2xl transition-all pointer-events-none" />
        </Link>
    )
}