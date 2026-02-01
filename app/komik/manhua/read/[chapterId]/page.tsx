import { getKomikImages, getKomikChapterList } from "@/libs/komik/komik"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import ManhuaReadingControls from "@/components/komik/manga/ManhuaReadingControls"

export async function generateMetadata({ params }: { params: Promise<{ chapterId: string }> }): Promise<Metadata> {
    const { chapterId } = await params
    return {
        title: `Cultivation Mode - MyTools Manhua`,
        description: "Halaman baca manhua dengan pengalaman spiritual yang mendalam.",
    }
}

export default async function ManhuaReadPage({ params }: { params: Promise<{ chapterId: string }> }) {
    const { chapterId } = await params
    const chapterData = await getKomikImages(chapterId)

    if (!chapterData || !chapterData.chapter) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#050606]">
                <p className="text-emerald-900 font-black uppercase tracking-[0.3em] animate-pulse text-xs">Scroll Not Found</p>
            </div>
        )
    }

    const images: string[] = chapterData.chapter?.data || []
    const chapters = await getKomikChapterList(chapterData.manga_id)

    return (
        <main className="min-h-screen bg-[#050606] text-zinc-100 selection:bg-emerald-500/30 overflow-x-hidden">
            {/* --- TOPBAR (JADE STYLE) --- */}
            <header className="sticky top-0 z-[60] bg-[#050606]/80 backdrop-blur-2xl border-b border-emerald-500/10 px-6 py-4 flex items-center justify-between transition-all duration-500">
                <div className="flex items-center gap-4">
                    <Link href={`/komik/manhua/${chapterData.manga_id}`} className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-black uppercase tracking-widest text-emerald-500 hover:text-white hover:bg-emerald-600 transition-all">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Exit
                    </Link>
                    <div className="h-4 w-px bg-emerald-900/30" />
                    <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400">
                        Scroll {chapterData.chapter_number}
                    </h1>
                </div>
                <div className="text-[9px] font-bold text-emerald-900 uppercase tracking-[0.4em] hidden md:block italic">
                    Ancient Archive Reader
                </div>
            </header>

            <section className="max-w-[1400px] mx-auto transition-all duration-500 py-8 px-0 md:px-10">
                <div id="main-grid" className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-12 items-start transition-all duration-500">

                    {/* --- READER CONTAINER (SPIRITUAL CORE) --- */}
                    <div id="reader-container" className="space-y-0 shadow-[0_0_100px_rgba(16,185,129,0.05)] rounded-3xl overflow-hidden border border-emerald-500/10 bg-[#0d0d0e] max-w-[900px] mx-auto w-full transition-all duration-700">

                        {/* --- TOP NAVIGATION --- */}
                        <div className="p-12 bg-emerald-950/10 border-b border-emerald-500/5 flex flex-col items-center gap-8">
                            <p className="text-emerald-900 font-black uppercase tracking-[0.5em] text-[9px]">Begin Cultivation</p>
                            <div className="flex items-center gap-4 w-full max-w-md">
                                {chapterData.prev_chapter_id ? (
                                    <Link href={`/komik/manhua/read/${chapterData.prev_chapter_id}`} className="flex-1 text-center py-4 rounded-2xl bg-zinc-950 border border-emerald-900/20 text-[10px] font-black uppercase tracking-widest text-emerald-700 hover:border-emerald-500 hover:text-emerald-400 transition-all active:scale-95">
                                        ← Previous
                                    </Link>
                                ) : <div className="flex-1 opacity-10 text-center text-[10px] font-black uppercase tracking-widest py-4 border border-dashed border-emerald-900 rounded-2xl">Root</div>}

                                {chapterData.next_chapter_id ? (
                                    <Link href={`/komik/manhua/read/${chapterData.next_chapter_id}`} className="flex-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-black text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all active:scale-95 text-center">
                                        Next Scroll →
                                    </Link>
                                ) : (
                                    <Link href={`/komik/manhua/${chapterData.manga_id}`} className="flex-1 py-4 rounded-2xl bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest text-center">Ascended</Link>
                                )}
                            </div>
                        </div>

                        {/* --- IMAGES RENDERING --- */}
                        <div className="flex flex-col items-center">
                            {images.map((img, i) => (
                                <div key={i} className="relative w-full group">
                                    <Image
                                        src={img}
                                        alt={`Scripture Page ${i + 1}`}
                                        width={1200}
                                        height={1800}
                                        className="w-full h-auto object-contain select-none"
                                        priority={i < 2}
                                        unoptimized
                                    />
                                    <div className="absolute bottom-4 right-6 text-[8px] font-black text-emerald-500/5 pointer-events-none uppercase tracking-[1em]">
                                        Ancient Script
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* --- BOTTOM NAVIGATION --- */}
                        <div className="p-12 bg-emerald-950/10 border-t border-emerald-500/5 flex flex-col items-center gap-8">
                            <p className="text-emerald-900 font-black uppercase tracking-[0.5em] text-[9px]">End of Scripture</p>
                            <div className="flex items-center gap-4 w-full max-w-md">
                                {chapterData.prev_chapter_id ? (
                                    <Link href={`/komik/manhua/read/${chapterData.prev_chapter_id}`} className="flex-1 text-center py-4 rounded-2xl bg-zinc-950 border border-emerald-900/20 text-[10px] font-black uppercase tracking-widest text-emerald-700 hover:text-emerald-400 transition-all">
                                        ← Previous
                                    </Link>
                                ) : <div className="flex-1 opacity-10 text-center text-[10px] font-black uppercase tracking-widest py-4 border border-dashed border-emerald-900 rounded-2xl">Root</div>}

                                {chapterData.next_chapter_id ? (
                                    <Link href={`/komik/manhua/read/${chapterData.next_chapter_id}`} className="flex-2 px-10 py-4 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-500 text-black text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(16,185,129,0.3)] transition-all text-center">
                                        Next Scroll →
                                    </Link>
                                ) : (
                                    <Link href={`/komik/manhua/${chapterData.manga_id}`} className="flex-1 py-4 rounded-2xl bg-emerald-900/20 border border-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-widest text-center">Ascended</Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- SIDEBAR SCROLL LIST (JADE PANEL) --- */}
                    <aside className="hidden lg:block sticky top-28 h-[calc(100vh-140px)] flex flex-col transition-all duration-500">
                        <div className="p-6 bg-emerald-950/5 border border-emerald-500/10 rounded-[2.5rem] backdrop-blur-3xl flex flex-col h-full overflow-hidden shadow-2xl">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-1.5 h-6 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                <h2 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Archive</h2>
                            </div>
                            <div className="flex-grow overflow-y-auto pr-2 space-y-2 custom-scrollbar no-scrollbar-mobile">
                                {chapters.map((ch: any) => {
                                    const active = ch.chapter_id === chapterId
                                    return (
                                        <Link key={ch.chapter_id} href={`/komik/manhua/read/${ch.chapter_id}`}
                                            className={`group relative flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-300 
                                            ${active ? "bg-emerald-500 text-black border-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]" : "bg-white/[0.02] border-white/5 text-emerald-900 hover:text-emerald-400 hover:border-emerald-500/20"}`}>
                                            <span className="text-[10px] font-black uppercase tracking-tighter">{ch.name || `Scroll ${ch.chapter_number}`}</span>
                                            {active && <div className="w-1.5 h-1.5 bg-black rounded-full animate-pulse" />}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            <ManhuaReadingControls />
        </main>
    )
}