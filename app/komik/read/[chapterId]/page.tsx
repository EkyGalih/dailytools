import { getKomikImages, getKomikDetail, getKomikChapterList } from "@/libs/komik/komik"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import MangaReadingControls from "@/components/komik/manga/MangaReadingControls"
import { ChevronLeft, ChevronRight, Home, List, Zap } from "lucide-react"

export default async function MangaReadPage({ params }: { params: Promise<{ chapterId: string }> }) {
    const { chapterId } = await params
    const chapterData = await getKomikImages(chapterId)

    if (!chapterData) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <p className="text-zinc-600 font-black uppercase tracking-[0.3em] animate-pulse">Chapter Not Found</p>
            </div>
        )
    }

    const detail = await getKomikDetail(chapterData.manga_id)
    const formatSlug = detail?.data?.taxonomy?.Format?.[0]?.slug?.toLowerCase() || "manga"

    // --- DYNAMIC THEME ---
    const theme = {
        manga: "text-red-500 bg-red-500",
        manhwa: "text-cyan-400 bg-cyan-500",
        manhua: "text-emerald-400 bg-emerald-500",
    }[formatSlug as 'manga' | 'manhwa' | 'manhua'] || "text-orange-500 bg-orange-600";

    const accentText = theme.split(" ")[0];
    const accentBg = theme.split(" ")[1];

    const images: string[] = chapterData.chapter?.data || []
    const chaptersRes = await getKomikChapterList(chapterData?.manga_id || "")
    const chapters = Array.isArray(chaptersRes) ? chaptersRes : (chaptersRes?.data || [])

    return (
        <main className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-white/10 overflow-x-hidden">
            {/* --- ELITE TOPBAR --- */}
            <header className="sticky top-0 z-[60] bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 px-4 md:px-10 py-4 flex items-center justify-between transition-all duration-500">
                <div className="flex items-center gap-4 md:gap-8">
                    <Link href={`/komik/${chapterData.manga_id}`} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all">
                        <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span className="hidden md:block">Back to Detail</span>
                    </Link>
                    <div className="h-4 w-px bg-zinc-800 hidden md:block" />
                    <div className="flex flex-col">
                        <h1 className="text-[11px] md:text-sm font-black uppercase italic tracking-tighter line-clamp-1 max-w-[150px] md:max-w-md">
                            {detail?.data?.title || "Reading Mode"}
                        </h1>
                        <p className={`text-[9px] font-black uppercase tracking-[0.2em] ${accentText}`}>
                            Chapter {chapterData.chapter_number}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <span className="text-[8px] font-black text-zinc-600 uppercase tracking-widest hidden lg:block border border-white/5 px-3 py-1 rounded-full">
                        {images.length} Pages Loaded
                    </span>
                </div>
            </header>

            <section className="max-w-[1600px] mx-auto transition-all duration-500 py-6 md:py-12 px-0 lg:px-10">
                <div id="main-grid" className="grid grid-cols-1 lg:grid-cols-[1fr_350px] gap-12 items-start">

                    {/* --- READER ENGINE --- */}
                    <div id="reader-container" className="flex flex-col items-center w-full max-w-[950px] mx-auto transition-all duration-700">

                        {/* Top Nav Buttons */}
                        <div className="w-full flex items-center justify-between mb-10 px-4 md:px-0">
                            {chapterData.prev_chapter_id ? (
                                <Link href={`/komik/read/${chapterData.prev_chapter_id}`} className="group flex items-center gap-3 px-6 py-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:border-white/20 transition-all active:scale-95">
                                    <ChevronLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Prev
                                </Link>
                            ) : <div className="opacity-20 grayscale px-6 py-4 text-[10px] font-black uppercase">Start</div>}

                            <div className="flex flex-col items-center">
                                <div className={`w-1 h-1 rounded-full ${accentBg} animate-ping mb-2`} />
                                <span className="text-[9px] font-black text-zinc-500 uppercase tracking-[0.4em]">Scroll Down</span>
                            </div>

                            {chapterData.next_chapter_id ? (
                                <Link href={`/komik/read/${chapterData.next_chapter_id}`} className={`flex items-center gap-3 px-8 py-4 rounded-2xl ${accentBg} text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 transition-all active:scale-95 shadow-xl`}>
                                    Next <ChevronRight size={14} />
                                </Link>
                            ) : <Link href={`/komik/detail/${chapterData.manga_id}`} className="px-6 py-4 rounded-2xl bg-zinc-900 text-[10px] font-black uppercase">Finish</Link>}
                        </div>

                        {/* Image Stack */}
                        <div className="w-full space-y-0 bg-black rounded-3xl overflow-hidden border border-white/5 shadow-2xl">
                            {images.map((img, i) => (
                                <div key={i} className="relative w-full">
                                    <Image
                                        src={img}
                                        alt={`Page ${i + 1}`}
                                        width={1200}
                                        height={1800}
                                        className="w-full h-auto object-contain select-none"
                                        priority={i < 3}
                                        unoptimized
                                    />
                                    {/* Page Number Indicator */}
                                    <div className="absolute bottom-4 right-4 text-[9px] font-black text-white/10 uppercase tracking-widest pointer-events-none">
                                        P. {i + 1} / {images.length}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Nav Buttons */}
                        <div className="w-full flex flex-col items-center mt-12 mb-20 gap-8">
                            <div className="h-20 w-px bg-gradient-to-b from-zinc-800 to-transparent" />
                            <div className="flex items-center gap-4 w-full max-w-md px-4">
                                {chapterData.prev_chapter_id && (
                                    <Link href={`/komik/read/${chapterData.prev_chapter_id}`} className="flex-1 text-center py-5 rounded-3xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest hover:bg-zinc-800 transition-all">
                                        Prev Chapter
                                    </Link>
                                )}
                                {chapterData.next_chapter_id ? (
                                    <Link href={`/komik/read/${chapterData.next_chapter_id}`} className={`flex-[2] text-center py-5 rounded-3xl ${accentBg} text-white text-[10px] font-black uppercase tracking-widest hover:brightness-110 transition-all shadow-2xl`}>
                                        Read Next Chapter
                                    </Link>
                                ) : (
                                    <Link href={`/komik/detail/${chapterData.manga_id}`} className="flex-1 text-center py-5 rounded-3xl bg-orange-600 text-white text-[10px] font-black uppercase tracking-widest">Back to Detail</Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- SIDEBAR LIST --- */}
                    <aside className="hidden lg:block sticky top-32 h-[calc(100vh-160px)] flex flex-col transition-all duration-500">
                        <div className="p-8 bg-[#0c0c0e]/60 border border-white/5 rounded-[3rem] backdrop-blur-3xl flex flex-col h-full overflow-hidden shadow-2xl">
                            <div className="flex items-center justify-between mb-8">
                                <div className="space-y-1">
                                    <h2 className="text-sm font-black uppercase italic tracking-tighter text-white">Archives</h2>
                                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-widest">Chapter Sequence</p>
                                </div>
                                <div className={`p-2 rounded-xl bg-white/5 ${accentText}`}>
                                    <List size={18} />
                                </div>
                            </div>
                            <div className="flex-grow overflow-y-auto pr-3 space-y-3 custom-scrollbar">
                                {chapters.map((ch: any) => {
                                    const active = ch.chapter_id === chapterId
                                    return (
                                        <Link key={ch.chapter_id} href={`/komik/read/${ch.chapter_id}`} className={`group relative flex items-center justify-between px-6 py-4 rounded-2xl border transition-all duration-500 ${active ? `${accentBg} border-white/20 text-white shadow-xl scale-[1.02]` : "bg-white/[0.02] border-white/5 text-zinc-500 hover:text-white hover:border-white/10"}`}>
                                            <span className="text-[11px] font-black uppercase italic tracking-tight">Chapter {ch.chapter_number}</span>
                                            {active && <Zap size={10} fill="currentColor" className="animate-pulse" />}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <MangaReadingControls accentColor={accentBg} />
        </main>
    )
}