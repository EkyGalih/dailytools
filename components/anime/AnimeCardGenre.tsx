import Link from 'next/link'
import Image from 'next/image'

interface AnimeGenreProps {
    title: string;
    endpoint: string;
    thumbnail: string;
    studio: string;
    eps: string;
    rating: string;
    season: string;
    genres: string[];
}

export default function AnimeCardGenre({
    title,
    endpoint,
    thumbnail,
    studio,
    eps,
    rating,
    season,
    genres
}: AnimeGenreProps) {
    return (
        <Link
            href={`/anime/${endpoint}`}
            // Menambahkan flex flex-col dan h-full agar tinggi antar card seragam di grid
            className="group relative flex flex-col h-full overflow-hidden rounded-2xl bg-[#121214] transition-all hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)]"
        >
            {/* 1. Image Container - Mengunci Rasio agar BG Hitam tidak terlihat bocor */}
            <div className="relative aspect-[3/4] w-full overflow-hidden bg-zinc-800">
                {/* Badge Rating - Pindah ke atas agar tidak tertutup teks bawah */}
                <div className="absolute left-2 top-2 z-10">
                    <div className="flex items-center gap-1 rounded-lg bg-white/95 backdrop-blur-md px-2 py-1 shadow-lg">
                        <span className="text-orange-500 text-[10px]">⭐</span>
                        <span className="text-[11px] font-black text-zinc-900">{rating}</span>
                    </div>
                </div>

                <Image
                    src={thumbnail}
                    alt={`Nonton ${title}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 50vw, 25vw"
                />

                {/* Overlay Gradient - Dibuat lebih solid di bagian bawah */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#121214] via-transparent to-black/20 opacity-90" />

                {/* Info Episode & Season (Floating di atas gambar) */}
                <div className="absolute bottom-3 left-2 right-2 z-10">
                    <div className="flex justify-between items-center gap-2">
                        <span className="text-[10px] font-bold text-white bg-orange-600 px-2 py-0.5 rounded-md">
                            {season}
                        </span>
                        <span className="text-[10px] font-black text-white drop-shadow-md bg-black/40 px-2 py-0.5 rounded-md backdrop-blur-sm uppercase">
                            {eps}
                        </span>
                    </div>
                </div>
            </div>

            {/* 2. Content Section - Diberi flex-grow agar mengisi sisa ruang secara rata */}
            <div className="flex flex-col flex-grow p-4">
                <p className="text-[9px] font-bold text-orange-500 uppercase tracking-widest mb-1">
                    {studio || 'Unknown Studio'}
                </p>
                <h3 className="line-clamp-2 text-sm font-bold text-white group-hover:text-orange-400 transition-colors leading-snug">
                    {title}
                </h3>

                {/* List Genre Mini (Optional, buat pemanis agar tinggi seimbang) */}
                <div className="mt-auto pt-3 flex flex-wrap gap-1">
                    {genres?.slice(0, 2).map((g) => (
                        <span key={g} className="text-[8px] text-orange-500 border border-orange-800 px-1.5 py-0.5 rounded">
                            {g}
                        </span>
                    ))}
                </div>
            </div>

            {/* Hover State Border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-orange-500/20 rounded-2xl transition-all pointer-events-none" />
        </Link>
    )
}