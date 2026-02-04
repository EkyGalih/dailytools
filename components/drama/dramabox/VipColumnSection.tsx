import Link from "next/link"
import { Crown, Sparkles, PlayCircle, Star, Users, BookOpen } from "lucide-react"

export default function VipColumnSection({ column }: { column: any }) {
    return (
        <section className="mb-24 px-4 md:px-0">
            {/* Header dengan Identitas VIP Tamanto */}
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <div className="space-y-2">
                    <div className="flex items-center gap-3 text-indigo-500">
                        <div className="h-px w-8 bg-indigo-500" />
                        <span className="text-[10px] font-black uppercase tracking-[0.5em]">Exclusive Selection</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
                        {column.title}
                    </h2>
                </div>

                <div className="flex items-center gap-4 bg-white border border-zinc-100 p-2 pl-5 rounded-2xl shadow-xl shadow-zinc-200/50">
                    <p className="text-[9px] font-black uppercase tracking-widest text-zinc-400">Verified Member Access</p>
                    <div className="bg-zinc-900 text-amber-400 p-2 rounded-xl shadow-lg">
                        <Crown size={18} fill="currentColor" />
                    </div>
                </div>
            </div>

            {/* Grid Kartu VIP yang Diperkaya */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 md:gap-10">
                {column.bookList?.map((book: any) => {
                    const safeCover = `https://wsrv.nl/?url=${encodeURIComponent(book.coverWap)}&output=webp&q=80`;

                    return (
                        <Link
                            key={book.bookId}
                            href={`/drama/china/channel/dramabox/detail/${book.bookId}`}
                            className="group"
                        >
                            <div className="bg-white rounded-[3rem] p-3 border border-zinc-100 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] transition-all duration-700 hover:shadow-[0_40px_80px_-20px_rgba(79,70,229,0.15)] hover:-translate-y-3">

                                {/* Poster dengan Data Statistik Terintegrasi */}
                                <div className="relative aspect-[3/4] rounded-[2.5rem] overflow-hidden">
                                    <img
                                        src={safeCover}
                                        alt={book.bookName}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
                                    />

                                    {/* Overlay Badge Status */}
                                    <div className="absolute top-5 left-5 right-5 flex justify-between items-start">
                                        <span className="px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-xl text-[8px] font-black uppercase tracking-widest text-zinc-900 shadow-xl border border-white/50">
                                            {book.playCount} Views
                                        </span>
                                        {book.corner?.name && (
                                            <div className="bg-indigo-600 p-2 rounded-xl text-white shadow-xl rotate-3 group-hover:rotate-0 transition-transform">
                                                <Crown size={14} fill="currentColor" />
                                            </div>
                                        )}
                                    </div>

                                    {/* Informasi Episode (Bottom Overlay) */}
                                    <div className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent flex flex-col justify-end p-8">
                                        <div className="flex items-center gap-3 text-white mb-2">
                                            <div className="flex items-center gap-1.5 bg-indigo-500 px-2 py-1 rounded-lg">
                                                <BookOpen size={10} />
                                                <span className="text-[9px] font-black uppercase leading-none">{book.chapterCount} Chapters</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Area Informasi Terperinci */}
                                <div className="p-6 pt-5 space-y-4">
                                    <h3 className="text-xl font-black italic uppercase tracking-tighter text-zinc-900 leading-[1.1] group-hover:text-indigo-600 transition-colors line-clamp-2">
                                        {book.bookName}
                                    </h3>

                                    {/* Snippet Sinopsis Menarik */}
                                    <p className="text-zinc-400 text-[10px] font-bold leading-relaxed line-clamp-2 italic border-l-2 border-indigo-50 pl-3">
                                        {book.introduction}
                                    </p>

                                    {/* Multi-Language Tags dari data tagV3s */}
                                    <div className="flex flex-wrap gap-2 pt-2">
                                        {book.tagV3s?.slice(0, 3).map((tag: any) => (
                                            <div key={tag.tagId} className="flex flex-col">
                                                <span className="text-[7px] font-black uppercase tracking-widest text-indigo-500 mb-0.5">
                                                    # {tag.tagName}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    )
                })}
            </div>
        </section>
    )
}