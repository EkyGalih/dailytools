import { getKomikImages, getKomikChapterList } from "@/libs/komik/komik"
import { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import ManhwaReadingControls from "@/components/komik/manhwa/ManhwaReadingControls"

export async function generateMetadata({ params }: { params: Promise<{ chapterId: string }> }): Promise<Metadata> {
    const { chapterId } = await params

    const site = 'https://tamanto.web.id'
    const title = `Reading Mode: Baca Manhwa Chapter ${chapterId} Sub Indo | Tamanto`
    const description = "Nikmati pengalaman baca manhwa premium dengan mode fokus yang bersih, cepat, dan responsif hanya di Tamanto."

    return {
        // Format: Reading Mode: Baca [Judul] Chapter [No] Sub Indo | Tamanto
        title: title,
        description: description,

        alternates: {
            // Memastikan Google mengindeks rute manhwa Tamanto yang benar
            canonical: `${site}/komik/manhwa/read/${chapterId}`,
        },

        openGraph: {
            title: title,
            description: description,
            url: `${site}/komik/manhwa/read/${chapterId}`,
            siteName: 'Tamanto',
            type: 'article',
            images: [
                {
                    url: '/og-reader-manhwa.jpg', // Gambar bertema manhwa reader
                    width: 1200,
                    height: 630,
                    alt: 'Premium Manhwa Reader Tamanto',
                },
            ],
            locale: 'id_ID',
        },

        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-snippet': -1,
            },
        },
    }
}

export default async function MangaReadPage({ params }: { params: Promise<{ chapterId: string }> }) {
    const { chapterId } = await params
    const chapterData = await getKomikImages(chapterId)
    console.log(chapterData)

    if (!chapterData || !chapterData.chapter) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#070708]">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-12 h-12 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin" />
                    <p className="text-zinc-600 font-black uppercase tracking-[0.3em] text-[10px]">Initializing Chapter...</p>
                </div>
            </div>
        )
    }

    const images: string[] = chapterData.chapter?.data || []
    const chapters = await getKomikChapterList(chapterData.manga_id)

    return (
        <main className="min-h-screen bg-[#070708] text-zinc-100 selection:bg-cyan-500/30">
            {/* --- 1. PREMIUM TOPBAR --- */}
            <header className="sticky top-0 z-[60] bg-[#070708]/80 backdrop-blur-2xl border-b border-white/[0.05] px-4 md:px-10 py-4 flex items-center justify-between transition-all duration-500">
                <div className="flex items-center gap-6">
                    <Link href={`/komik/manhwa/${chapterData.manga_id}`} className="group flex items-center gap-2.5 px-4 py-2 rounded-full bg-white/[0.03] border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-cyan-400 hover:border-cyan-500/30 transition-all">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span> Exit
                    </Link>
                    <div className="hidden sm:block h-6 w-px bg-white/10" />
                    <div className="flex flex-col">
                        <h1 className="text-[11px] font-black uppercase tracking-[0.2em] text-cyan-400">
                            Chapter {chapterData.chapter_number}
                        </h1>
                        <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-widest truncate max-w-[150px] md:max-w-xs">
                            {chapterData.chapter_title || " Mode Membaca"}
                        </p>
                    </div>
                </div>

                <div className="flex items-center gap-4">
                    <div className="hidden lg:flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-white/5">
                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                        <span className="text-[9px] font-black text-zinc-400 uppercase tracking-[0.2em]">Immersive System v2</span>
                    </div>
                </div>
            </header>

            <section className="max-w-[1600px] mx-auto transition-all duration-500 pt-6 pb-20 px-0 md:px-6 lg:px-10">
                <div id="main-grid" className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8 items-start transition-all duration-500">

                    {/* --- 2. READER CONTAINER --- */}
                    <div id="reader-container" className="relative space-y-0 shadow-[0_0_100px_rgba(0,0,0,0.8)] rounded-3xl overflow-hidden border border-white/[0.05] bg-[#0d0d0e] max-w-[900px] mx-auto w-full transition-all duration-700">

                        {/* TOP NAVIGATION BUTTONS */}
                        <div className="p-10 bg-zinc-950/50 flex flex-col items-center gap-6 border-b border-white/5">
                            <span className="text-zinc-600 font-black uppercase tracking-[0.4em] text-[9px]">Batas Atas Halaman</span>
                            <div className="flex items-center gap-3 w-full max-w-lg">
                                {chapterData.prev_chapter_id ? (
                                    <Link href={`/komik/manhwa/read/${chapterData.prev_chapter_id}`} className="flex-1 py-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:border-cyan-500/50 transition-all text-center">
                                        ← Prev
                                    </Link>
                                ) : <div className="flex-1 opacity-20 text-[10px] font-black uppercase tracking-widest py-4 border border-dashed border-zinc-800 rounded-2xl text-center">Start</div>}

                                {chapterData.next_chapter_id ? (
                                    <Link href={`/komik/manhwa/read/${chapterData.next_chapter_id}`} className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-violet-600 text-white text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] hover:scale-[1.02] transition-all text-center">
                                        Next Chapter →
                                    </Link>
                                ) : (
                                    <Link href={`/komik/manhwa/${chapterData.manga_id}`} className="flex-1 py-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-center">Finished</Link>
                                )}
                            </div>
                        </div>

                        {/* IMAGES RENDERING */}
                        <div className="flex flex-col items-center bg-[#0d0d0e]">
                            {images.map((img, i) => (
                                <div key={i} className="relative w-full overflow-hidden">
                                    <Image
                                        src={img}
                                        alt={`Page ${i + 1}`}
                                        width={1200}
                                        height={1800}
                                        className="w-full h-auto object-contain select-none"
                                        priority={i < 3}
                                        unoptimized
                                    />
                                    {/* Subtle Watermark */}
                                    <div className="absolute bottom-4 right-6 text-[10px] font-black text-white/5 pointer-events-none uppercase tracking-[1em] rotate-90 origin-right">
                                        MYTOOLS
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* BOTTOM NAVIGATION BUTTONS */}
                        <div className="p-16 bg-zinc-950/50 border-t border-white/5 flex flex-col items-center gap-8">
                            <div className="flex flex-col items-center gap-2">
                                <div className="w-12 h-1 bg-cyan-500 rounded-full mb-2" />
                                <span className="text-zinc-500 font-black uppercase tracking-[0.4em] text-[10px]">End of Chapter</span>
                            </div>

                            <div className="flex items-center gap-4 w-full max-w-lg">
                                {chapterData.prev_chapter_id && (
                                    <Link href={`/komik/manhwa/read/${chapterData.prev_chapter_id}`} className="flex-1 py-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-white transition-all text-center">
                                        ← Prev
                                    </Link>
                                )}
                                <Link href={`/komik/manhwa/${chapterData.manga_id}`} className="flex-1 py-4 rounded-2xl bg-zinc-900 border border-white/5 text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-cyan-400 transition-all text-center">
                                    Menu
                                </Link>
                                {chapterData.next_chapter_id && (
                                    <Link href={`/komik/manhwa/read/${chapterData.next_chapter_id}`} className="flex-[2] py-4 rounded-2xl bg-gradient-to-r from-cyan-600 to-violet-600 text-white text-[10px] font-black uppercase tracking-widest hover:shadow-[0_0_40px_rgba(124,58,237,0.3)] transition-all text-center">
                                        Next Chapter →
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* --- 3. FLOATING SIDEBAR CHAPTERS --- */}
                    <aside className="hidden lg:block sticky top-28 h-[calc(100vh-140px)] transition-all duration-500">
                        <div className="p-6 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] backdrop-blur-2xl flex flex-col h-full shadow-2xl">
                            <div className="flex items-center justify-between mb-8 px-2">
                                <div className="space-y-1">
                                    <h2 className="text-xs font-black uppercase tracking-[0.2em] text-white">Chapters</h2>
                                    <p className="text-[8px] font-bold text-zinc-600 uppercase tracking-widest">Navigation Panel</p>
                                </div>
                                <div className="w-8 h-8 rounded-xl bg-cyan-500/10 flex items-center justify-center text-cyan-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H40a8,8,0,0,1,0-16H216A8,8,0,0,1,224,128ZM40,72H216a8,8,0,0,0,0-16H40a8,8,0,0,0,0,16ZM216,184H40a8,8,0,0,0,0,16H216a8,8,0,0,0,0-16Z"></path></svg>
                                </div>
                            </div>

                            <div className="flex-grow overflow-y-auto pr-2 space-y-2 custom-scrollbar">
                                {chapters.map((ch: any) => {
                                    const active = ch.chapter_id === chapterId
                                    return (
                                        <Link
                                            key={ch.chapter_id}
                                            href={`/komik/manhwa/read/${ch.chapter_id}`}
                                            className={`group relative flex items-center justify-between px-5 py-4 rounded-2xl border transition-all duration-300 
                                            ${active
                                                    ? "bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-cyan-500/50 text-cyan-400"
                                                    : "bg-white/[0.02] border-white/5 text-zinc-500 hover:bg-white/[0.05] hover:text-zinc-200"}`}
                                        >
                                            <span className="text-[10px] font-black uppercase tracking-tighter">
                                                {ch.name || `Ch. ${ch.chapter_number}`}
                                            </span>
                                            {active && (
                                                <div className="flex gap-1">
                                                    <div className="w-1 h-1 bg-cyan-400 rounded-full animate-bounce" />
                                                    <div className="w-1 h-1 bg-violet-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                                                </div>
                                            )}
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    </aside>
                </div>
            </section>

            {/* FLOATING CONTROLS */}
            <ManhwaReadingControls />
        </main>
    )
}