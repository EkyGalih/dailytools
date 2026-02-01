import { getKomikImages, getKomikChapterList } from "@/libs/komik/komik"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import ReadingControls from "@/components/komik/manga/ReadingControls"

export async function generateMetadata({ params }: { params: Promise<{ chapterId: string }> }): Promise<Metadata> {
    const { chapterId } = await params
    return {
        title: `Reading Mode - MyTools Komik`,
        description: "Halaman baca manga full chapter dengan pengalaman modern.",
    }
}

export default async function MangaReadPage({ params }: { params: Promise<{ chapterId: string }> }) {
    const { chapterId } = await params
    const chapterData = await getKomikImages(chapterId)

    if (!chapterData || !chapterData.chapter) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050505]">
                <p className="text-zinc-600 font-black uppercase tracking-[0.3em] animate-pulse text-xs">Chapter Not Found</p>
            </div>
        )
    }

    const images: string[] = chapterData.chapter?.data || []
    const chapters = await getKomikChapterList(chapterData.manga_id)

    return (
        <main className="min-h-screen bg-[#050505] text-zinc-100 selection:bg-orange-500/30">
            {/* --- TOPBAR --- */}
            <header className="sticky top-0 z-[60] bg-[#050505]/60 backdrop-blur-2xl border-b border-white/5 px-6 py-3 flex items-center justify-between transition-all duration-500">
                <div className="flex items-center gap-4">
                    <Link href={`/komik/manga/${chapterData.manga_id}`} className="group flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Exit
                    </Link>
                    <div className="h-4 w-px bg-zinc-800" />
                    <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                        Ch. {chapterData.chapter_number}
                    </h1>
                </div>
                <div className="text-[9px] font-bold text-zinc-600 uppercase tracking-widest hidden md:block italic">
                    MyTools Immersive Reader
                </div>
            </header>

            <section className="max-w-[1400px] mx-auto transition-all duration-500 py-8 px-0 md:px-10">
                <div id="main-grid" className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start transition-all duration-500">

                    {/* --- READER CONTAINER --- */}
                    <div id="reader-container" className="space-y-0 shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden border border-white/5 bg-[#09090b] max-w-[900px] mx-auto w-full transition-all duration-700">
                        {/* --- TOP NAVIGATION --- */}
                        <div className="p-12 bg-zinc-950 border-t border-white/5 flex flex-col items-center gap-8">
                            <p className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px]">Top of Chapter</p>
                            <div className="flex items-center gap-4 w-full max-w-md">
                                {chapterData.prev_chapter_id ? (
                                    <Link href={`/komik/manga/read/${chapterData.prev_chapter_id}`} className="flex-1 text-center py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest hover:border-orange-500/50 hover:bg-zinc-800 transition-all active:scale-95">
                                        ← Prev
                                    </Link>
                                ) : <div className="flex-1 opacity-20 pointer-events-none text-center text-[10px] font-black uppercase tracking-widest py-4 border border-dashed border-zinc-800 rounded-2xl">Start</div>}

                                {chapterData.next_chapter_id ? (
                                    <Link href={`/komik/manga/read/${chapterData.next_chapter_id}`} className="flex-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 hover:shadow-[0_10px_30px_rgba(234,88,12,0.3)] transition-all active:scale-95 text-center">
                                        Next Chapter →
                                    </Link>
                                ) : (
                                    <Link href={`/komik/manga/${chapterData.manga_id}`} className="flex-1 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-center">Done</Link>
                                )}
                            </div>
                        </div>
                        {images.map((img, i) => (
                            <div key={i} className="relative w-full group">
                                <Image
                                    src={img}
                                    alt={`Page ${i + 1}`}
                                    width={1200}
                                    height={1800}
                                    className="w-full h-auto object-contain"
                                    priority={i < 2}
                                    unoptimized
                                />
                                <div className="absolute bottom-4 right-6 text-[8px] font-black text-white/5 pointer-events-none uppercase tracking-[0.5em]">
                                    MyTools Content
                                </div>
                            </div>
                        ))}

                        {/* --- BOTTOM NAVIGATION --- */}
                        <div className="p-12 bg-zinc-950 border-t border-white/5 flex flex-col items-center gap-8">
                            <p className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[10px]">End of Chapter</p>
                            <div className="flex items-center gap-4 w-full max-w-md">
                                {chapterData.prev_chapter_id ? (
                                    <Link href={`/komik/manga/read/${chapterData.prev_chapter_id}`} className="flex-1 text-center py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest hover:border-orange-500/50 hover:bg-zinc-800 transition-all active:scale-95">
                                        ← Prev
                                    </Link>
                                ) : <div className="flex-1 opacity-20 pointer-events-none text-center text-[10px] font-black uppercase tracking-widest py-4 border border-dashed border-zinc-800 rounded-2xl">Start</div>}

                                {chapterData.next_chapter_id ? (
                                    <Link href={`/komik/manga/read/${chapterData.next_chapter_id}`} className="flex-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-orange-600 to-amber-500 text-white text-[10px] font-black uppercase tracking-widest hover:scale-105 hover:shadow-[0_10px_30px_rgba(234,88,12,0.3)] transition-all active:scale-95 text-center">
                                        Next Chapter →
                                    </Link>
                                ) : (
                                    <Link href={`/komik/manga/${chapterData.manga_id}`} className="flex-1 py-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-widest text-center">Done</Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- SIDEBAR CHAPTER --- */}
                    <aside className="hidden lg:block sticky top-24 h-[calc(100vh-120px)] flex flex-col transition-all duration-500">
                        <div className="p-6 bg-zinc-900/30 border border-white/5 rounded-[2.5rem] backdrop-blur-xl flex flex-col h-full overflow-hidden">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="w-1.5 h-6 bg-orange-600 rounded-full" />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Chapter List</h2>
                            </div>
                            <div className="flex-grow overflow-y-auto pr-2 space-y-2 no-scrollbar">
                                {chapters.map((ch: any) => {
                                    const active = ch.chapter_id === chapterId
                                    return (
                                        <Link key={ch.chapter_id} href={`/komik/manga/read/${ch.chapter_id}`} className={`group relative flex items-center justify-between px-5 py-3.5 rounded-2xl border transition-all duration-300 ${active ? "bg-orange-600 border-orange-500 text-white" : "bg-white/[0.02] border-white/5 text-zinc-500 hover:text-zinc-200"}`}>
                                            <span className="text-[11px] font-black uppercase tracking-tighter">{ch.name || `Ch. ${ch.chapter_number}`}</span>
                                            {active && <div className="w-2 h-2 bg-white rounded-full animate-pulse" />}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <ReadingControls />
        </main>
    )
}