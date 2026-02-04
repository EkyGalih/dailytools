// components/drama/vip/VIPCard.tsx
import Image from "next/image";
import Link from "next/link"; // ✅ Tambahkan import Link
import { Play, Star, Crown, ChevronRight } from "lucide-react";

interface VIPBook {
    bookId: string;
    bookName: string;
    coverWap: string;
    playCount: string;
    introduction: string;
    tags: string[];
    corner: { name: string; color: string };
}

export default function VIPCard({ book }: { book: VIPBook }) {
    // Optimasi cover agar lebih tajam dan cepat dimuat
    const safeCover = `https://wsrv.nl/?url=${encodeURIComponent(book.coverWap)}&output=webp&q=80`;

    return (
        /* ✅ Bungkus dengan Link ke arah halaman watch/detail yang sudah digabung */
        <Link
            href={`/drama/china/channel/dramabox/vip/watch/${book.bookId}`}
            className="group relative bg-white rounded-[2.5rem] overflow-hidden border border-zinc-100 transition-all duration-700 hover:-translate-y-2 flex flex-col h-full shadow-[0_10px_30px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_30px_60px_-20px_rgba(79,70,229,0.15)] cursor-pointer"
        >

            {/* 💎 ELEGANT CORNER BADGE */}
            <div className="absolute top-5 right-5 z-20 overflow-hidden rounded-xl shadow-2xl">
                <div
                    className="flex items-center gap-1.5 px-3 py-1.5 text-[8px] font-black uppercase tracking-[0.2em] text-white"
                    style={{ backgroundColor: book.corner.color || '#4D65ED' }}
                >
                    <Crown size={10} fill="currentColor" className="animate-pulse" />
                    {book.corner.name}
                </div>
            </div>

            {/* 🎬 POSTER WITH PREMIUM OVERLAY */}
            <div className="relative aspect-[3/4] overflow-hidden m-2 rounded-[2rem]">
                <Image
                    src={safeCover}
                    alt={book.bookName}
                    fill
                    className="object-cover group-hover:scale-110 group-hover:rotate-1 transition-transform duration-1000"
                    referrerPolicy="no-referrer"
                />

                {/* Dynamic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-700" />

                {/* Stats Overlay */}
                <div className="absolute bottom-6 inset-x-6 z-10 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-white bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
                        <Play size={10} fill="white" />
                        <span className="text-[9px] font-black tracking-[0.2em] uppercase">{book.playCount}</span>
                    </div>
                    {/* ✅ Ikon ini sekarang memberi isyarat visual untuk klik */}
                    <div className="w-8 h-8 rounded-full bg-white text-indigo-600 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 shadow-xl">
                        <ChevronRight size={16} strokeWidth={3} />
                    </div>
                </div>
            </div>

            {/* 📝 CONTENT INFO */}
            <div className="px-7 pt-4 pb-8 flex-1 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                    <div className="flex -space-x-1">
                        {[1, 2, 3].map((s) => (
                            <Star key={s} size={10} fill="#f59e0b" className="text-amber-400" />
                        ))}
                    </div>
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-zinc-300">Top Rated VIP</span>
                </div>

                <div className="space-y-2">
                    <h2 className="text-xl font-black italic uppercase tracking-tighter text-zinc-900 leading-[1.1] group-hover:text-indigo-600 transition-colors duration-300">
                        {book.bookName}
                    </h2>
                    <p className="text-zinc-400 text-[10px] font-bold leading-relaxed line-clamp-2 italic">
                        {book.introduction}
                    </p>
                </div>

                {/* TAGS WITH CLEAN STYLE */}
                <div className="mt-auto pt-4 flex flex-wrap gap-2">
                    {book.tags.slice(0, 3).map((tag, idx) => (
                        <span
                            key={idx}
                            className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 rounded-xl text-[7px] font-black text-zinc-400 uppercase tracking-widest group-hover:bg-indigo-50 group-hover:text-indigo-500 group-hover:border-indigo-100 transition-colors duration-500"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            {/* Subtle Progress Bar Decoration */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-rose-500 w-0 group-hover:w-full transition-all duration-700" />
        </Link>
    );
}