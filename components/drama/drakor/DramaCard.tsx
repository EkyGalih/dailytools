import { DramaCardItem } from "@/libs/types/drakor"
import Image from "next/image"
import Link from "next/link"
import { Play, Star, Calendar, Monitor, Sparkles } from "lucide-react"

export default function DramaCard({ drama }: { drama: DramaCardItem }) {
  return (
    <Link href={`/drama/korea/${drama.endpoint}`} className="block group">
      <div className="relative bg-white rounded-[1rem] overflow-hidden border border-zinc-100 transition-all duration-500 flex flex-col h-full 
        group-hover:border-pink-200 group-hover:shadow-[0_30px_60px_-15px_rgba(236,72,153,0.15)] group-hover:-translate-y-2">
        {/* THUMBNAIL AREA */}
        <div className="relative w-full aspect-[3/4] overflow-hidden">
          <Image
            src={drama.thumbnail ?? "/placeholder.jpg"}
            alt={drama.title}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            className="object-cover transition-transform duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1"
          />

          {/* Premium Floating Badges */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-start z-20">
            <div className="flex flex-col gap-2">
              {drama.rating && (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-[10px] font-black text-amber-400 shadow-2xl">
                  <Star size={10} fill="currentColor" className="animate-pulse" /> {drama.rating}
                </div>
              )}
              {drama.eps && (
                <div className="inline-flex items-center gap-1 px-3 py-1.5 rounded-2xl bg-pink-500/80 backdrop-blur-xl text-[10px] font-black text-white uppercase tracking-tighter shadow-lg">
                  <Sparkles size={10} /> {drama.eps}
                </div>
              )}
            </div>

            {drama.year && (
              <div className="px-3 py-1.5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 text-[10px] font-black text-zinc-300 uppercase">
                {drama.year}
              </div>
            )}
          </div>

          {/* Overlay Gradient: Deeper and more cinematic */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c] via-[#0c0c0c]/20 to-transparent opacity-100" />

          {/* Hover Play Button with Pulsing Ring */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-pink-500 animate-ping opacity-20" />
              <div className="relative w-16 h-16 rounded-full bg-pink-500 text-white flex items-center justify-center shadow-[0_0_30px_rgba(236,72,153,0.8)] scale-75 group-hover:scale-100 transition-transform duration-500">
                <Play size={28} fill="currentColor" className="ml-1" />
              </div>
            </div>
          </div>
        </div>

        {/* CONTENT AREA */}
        <div className="p-6 space-y-4 flex-1 flex flex-col relative bg-[#0c0c0c]">
          {/* Subtle noise texture or glow behind text can be added via CSS if needed */}
          <div className="min-h-[2.8rem] flex items-start">
            <h3 className="text-sm md:text-base font-black italic uppercase tracking-tighter text-white line-clamp-2 group-hover:text-pink-400 transition-colors duration-300 leading-[1.2]">
              {drama.title}
            </h3>
          </div>

          <div className="mt-auto pt-4 border-t border-zinc-100 space-y-3">
            {/* Baris 1: Tahun Release */}
            <div>
              <div className="inline-flex items-center gap-1.5 text-[9px] font-black text-zinc-500 uppercase italic tracking-widest bg-zinc-50 px-2.5 py-1.5 rounded-xl border border-zinc-100 group-hover:border-pink-200 group-hover:bg-pink-50/30 group-hover:text-pink-500 transition-all duration-300">
                <Monitor size={11} className="group-hover:animate-pulse" />
                {drama.resolution || 'Ultra HD'}
              </div>
            </div>
          </div>

          {/* Baris 2: Badge Resolusi */}
          <div className="flex items-center gap-2 text-[8px] font-bold text-zinc-400 uppercase tracking-[0.2em]">
            <Calendar size={12} className="text-purple-400" />
            <span>{drama.updated_at || '2026'}</span>
          </div>
        </div>

        {/* Bottom Accent Line */}
        <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 w-0 group-hover:w-full transition-all duration-700" />
      </div>
    </Link>
  )
}