import Link from "next/link"
import Image from "next/image"
import { Eye, Star, Zap, Bookmark, Calendar, Hash } from "lucide-react"

export default function KomikRecommendedCard({
  manga,
  activeType
}: {
  manga: any,
  activeType: string
}) {
  const format = manga.taxonomy?.Format?.[0]?.name ?? "Komik"
  const genres = manga.taxonomy?.Genre?.slice(0, 2) ?? []
  const countryFlag = manga.country_id?.toLowerCase() === "jp" ? "🇯🇵" : manga.country_id?.toLowerCase() === "kr" ? "🇰🇷" : manga.country_id?.toLowerCase() === "cn" ? "🇨🇳" : "🌍"

  // Logic Warna Berdasarkan Section yang Aktif
  const themeStyles = {
    manga: "border-red-500/30 shadow-red-500/5 group-hover:border-red-500/60",
    manhwa: "border-cyan-500/30 shadow-cyan-500/5 group-hover:border-cyan-500/60",
    manhua: "border-emerald-500/30 shadow-emerald-500/5 group-hover:border-emerald-500/60",
  }[activeType] || "border-white/5";

  const accentText = {
    manga: "text-red-500",
    manhwa: "text-cyan-400",
    manhua: "text-emerald-400",
  }[activeType] || "text-orange-500";

  return (
    <Link
      // href={`/komik/${format.toLowerCase()}/${manga.manga_id}`}
      href={`/komik/${manga.manga_id}`}
      className={`group relative flex flex-col w-full bg-[#0c0c0e] rounded-[2.2rem] md:rounded-[2.8rem] overflow-hidden border transition-all duration-500 shadow-2xl active:scale-[0.98] ${themeStyles}`}
    >
      {/* 1. ULTRA-LARGE IMAGE AREA (Nilai Jual Utama) */}
      {/* Kita buat m-0 agar gambar bener-bener mepet ke border luar, memaksimalkan ukuran visual */}
      <div className="relative aspect-[3/4.8] overflow-hidden bg-zinc-900">
        <Image
          src={manga.cover_image_url}
          alt={manga.title}
          fill
          className="object-cover transition-transform duration-1000 md:group-hover:scale-110"
          sizes="(max-width:768px) 50vw, 25vw"
          priority
        />

        {/* Cinematic Gradient yang lebih tinggi agar teks di atasnya terbaca */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/20 to-transparent z-10" />

        {/* TOP BADGES (Floating) */}
        <div className="absolute top-4 left-4 md:top-5 md:left-5 z-20 flex flex-col gap-2">
          <div className={`px-3 py-1.5 rounded-xl text-white text-[9px] md:text-[10px] font-black uppercase tracking-widest shadow-xl flex items-center gap-1 ${activeType === 'manhwa' ? 'bg-cyan-600' : activeType === 'manhua' ? 'bg-emerald-600' : 'bg-red-600'
            }`}>
            <Zap size={10} fill="currentColor" />
            {format}
          </div>

          {manga.release_year && (
            <div className="px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-md border border-white/10 text-[9px] font-bold text-zinc-300 w-fit">
              {manga.release_year}
            </div>
          )}
        </div>

        {/* RATING BADGE (Top Right) */}
        <div className="absolute top-4 right-4 md:top-5 md:right-5 z-20">
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-[11px] font-black text-white shadow-2xl">
            <Star size={11} className="text-yellow-500" fill="currentColor" />
            {manga.user_rate || '0.0'}
          </div>
        </div>

        {/* OVERLAY INFO (Pindah ke dalam area gambar agar gambar terlihat mendominasi) */}
        <div className="absolute bottom-6 left-5 right-5 z-20 space-y-3">
          <div className="flex justify-between items-end">
            <div className="space-y-2">
              <div className="px-3 py-1.5 rounded-xl bg-white text-black text-[10px] md:text-[12px] font-black uppercase italic shadow-[0_10px_20px_rgba(0,0,0,0.4)] inline-block">
                CH. {manga.latest_chapter_number}
              </div>
              {/* Genre Tags - Muncul di atas gambar */}
              <div className="flex gap-1.5">
                {genres.map((g: any, i: number) => (
                  <span key={i} className="text-[8px] font-black uppercase tracking-widest text-white/80 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-md border border-white/5">
                    {g.name}
                  </span>
                ))}
              </div>
            </div>
            <span className="text-2xl md:text-3xl drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">{countryFlag}</span>
          </div>

          {/* TITLE: Sekarang masuk ke area gambar agar info area di bawah lebih tipis */}
          <h3 className={`text-[15px] md:text-[18px] font-black text-white leading-tight uppercase italic tracking-tighter line-clamp-2 drop-shadow-2xl group-hover:${accentText} transition-colors`}>
            {manga.title}
          </h3>
        </div>
      </div>

      {/* 2. MINIMALIST INFO AREA (Compact Stats) */}
      <div className="px-5 py-5 md:px-6 md:py-6 flex flex-col bg-[#0c0c0e] border-t border-white/5">
        <div className="grid grid-cols-2 gap-4">
          {/* ENGAGEMENT */}
          <div className="flex flex-col gap-2">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600 leading-none">
              Stats
            </span>
            <div className="flex flex-col gap-2"> {/* Container menjadi kolom */}
              {/* Baris 1: Views */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-300">
                <Eye size={12} className={accentText} strokeWidth={2.5} />
                <span className="leading-none">
                  {(manga.view_count ?? 0).toLocaleString("id-ID")}
                </span>
              </div>

              {/* Baris 2: Bookmarks */}
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-zinc-300">
                <Bookmark size={12} className={accentText} strokeWidth={2.5} />
                <span className="leading-none">
                  {(manga.bookmark_count ?? 0).toLocaleString("id-ID")}
                </span>
              </div>
            </div>
          </div>

          {/* STATUS */}
          <div className="flex flex-col items-end gap-1.5">
            <span className="text-[8px] font-black uppercase tracking-[0.2em] text-zinc-600 leading-none">Activity</span>
            <div className="flex items-center gap-2">
              <div className={`w-1.5 h-1.5 rounded-full animate-pulse ${manga.latest_chapter_time ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-orange-500 shadow-[0_0_8px_rgba(249,115,22,0.4)]'}`} />
              <span className={`text-[10px] font-black uppercase italic tracking-tight ${accentText}`}>
                {manga.latest_chapter_time ? 'Recent' : 'Ongoing'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}