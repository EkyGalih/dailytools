import Link from "next/link"
import Image from "next/image"

export default function ManhwaRecommendedCard({ manhwa }: { manhwa: any }) {
    console.log(manhwa)
    return (
        <Link
            href={`/komik/manhwa/${manhwa.manga_id}`}
            className="group relative rounded-[2.4rem] overflow-hidden 
      bg-[#070708] border border-white/5 
      hover:border-cyan-400/50 transition-all duration-500 
      shadow-[0_20px_50px_rgba(0,0,0,0.6)]"
        >
            {/* ===============================
          ✨ Neon Portal Glow Hover
      =============================== */}
            <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 
        bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.25),transparent_60%)]"
            />

            {/* ===============================
          COVER IMAGE (Webtoon Style)
      =============================== */}
            <div className="relative aspect-[3/4.5] overflow-hidden">
                <Image
                    src={manhwa.cover_image_url}
                    alt={manhwa.title}
                    fill
                    className="object-cover transition duration-700 group-hover:scale-[1.12]"
                />

                {/* Overlay Fade */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-black/10 to-transparent" />

                {/* ===============================
            Badge Manhwa Pick
        =============================== */}
                <div className="absolute top-4 left-4 z-20">
                    <span
                        className="px-4 py-1.5 rounded-full 
            bg-cyan-500/10 border border-cyan-400/30 
            text-[9px] font-black uppercase tracking-[0.25em] 
            text-cyan-300 backdrop-blur-xl"
                    >
                        Manhwa Pick
                    </span>
                </div>

                {/* ===============================
            Rating Floating (Bottom Right)
        =============================== */}
                {/* Bottom Info Row (Year & Rating) */}
                <div className="absolute bottom-4 left-4 right-4 z-20 flex justify-between items-center">
                    {/* Release Year - Pojok Kiri Bawah */}
                    <div className="px-3 py-1 rounded-xl bg-zinc-950/60 backdrop-blur-md border border-white/10 text-[10px] font-black text-zinc-300 tracking-wider">
                        {/* Mengambil tahun rilis, ganti ke properti yang sesuai jika berbeda */}
                        {manhwa.release_year || "2024"}
                    </div>

                    {/* User Rating - Pojok Kanan Bawah */}
                    <div className="px-3 py-1 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md text-[10px] font-black text-white flex items-center gap-1.5 group-hover:border-cyan-500/30 transition-colors">
                        <span className="text-yellow-400 drop-shadow-[0_0_5px_rgba(250,204,21,0.4)]">⭐</span>
                        <span className="text-cyan-300">{manhwa.user_rate}</span>
                    </div>
                </div>
            </div>

            {/* ===============================
          INFO CONTENT
      =============================== */}
            <div className="p-5 space-y-4 relative z-10">
                {/* TITLE */}
                <h3
                    className="text-sm font-black uppercase tracking-tight 
          text-white group-hover:text-cyan-300 transition line-clamp-1"
                >
                    {manhwa.title}
                </h3>

                {/* META */}
                <div className="flex items-center justify-between">
                    {/* Views */}
                    <div className="flex flex-col">
                        <span className="text-[9px] uppercase font-black tracking-widest text-zinc-600">
                            Views
                        </span>
                        <span className="text-[11px] font-bold text-zinc-300">
                            {manhwa.view_count.toLocaleString()}
                        </span>
                    </div>

                    {/* Arrow Action */}
                    <div
                        className="w-10 h-10 rounded-2xl flex items-center justify-center
            bg-gradient-to-br from-cyan-500/20 to-violet-500/10
            border border-white/10
            group-hover:scale-110 group-hover:border-cyan-400/40
            transition duration-500"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            viewBox="0 0 256 256"
                            className="text-cyan-300 group-hover:text-white transition"
                        >
                            <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            {/* ===============================
          Bottom Neon Line Accent
      =============================== */}
            <div
                className="absolute bottom-0 left-0 w-full h-[2px] 
        bg-gradient-to-r from-transparent via-cyan-400 to-violet-500 
        opacity-0 group-hover:opacity-100 transition duration-700"
            />
        </Link>
    )
}