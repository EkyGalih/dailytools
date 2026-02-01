import { getKomikChapterList, getKomikDetail } from "@/libs/komik/komik";
import { Metadata } from "next";
import Image from "next/image";
import MangaHero from "@/components/komik/manga/MangaHero";
import ChapterList from "@/components/komik/manga/ChapterLitst";

function splitTitle(text: string) {
    const words = text.trim().split(" ")

    if (words.length === 1) {
        return {
            title1: words[0],
            title2: "",
        }
    }

    const mid = Math.ceil(words.length / 2)

    return {
        title1: words.slice(0, mid).join(" "),
        title2: words.slice(mid).join(" "),
    }
}

export async function generateMetadata({ params }: { params: Promise<{ mangaId: string }> }): Promise<Metadata> {
    const { mangaId } = await params;
    const res = await getKomikDetail(mangaId);
    const manga = res?.data;

    return {
        title: `${manga?.title || "Detail Manga"} - MyTools Komik`,
        description: manga?.description?.slice(0, 160),
    };
}

export default async function MangaDetailPage({ params }: { params: Promise<{ mangaId: string }> }) {
    const { mangaId } = await params;
    const res = await getKomikDetail(mangaId);
    const chapters = await getKomikChapterList(mangaId);
    const manga = res?.data;
    const { title1, title2 } = splitTitle(manga.title)

    const cover = manga?.cover_portrait_url?.trim()
        ? manga.cover_portrait_url
        : manga?.cover_image_url;

    if (!manga) return (
        <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
            <p className="text-zinc-500 font-black uppercase tracking-widest animate-pulse">Data tidak ditemukan</p>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 selection:bg-orange-500/30 overflow-x-hidden">
            <MangaHero
                title={title1}
                highlight={title2}
                desc={manga.description?.slice(0, 120) + "..."}
                backHref="/komik/manga"
                backLabel="Kenembali ke Library"
                badge={manga.taxonomy?.Format?.[0]?.name || "MANGA"}
            />
            {/* 1. IMMERSIVE HERO SECTION */}
            <section className="relative h-[45vh] w-full overflow-hidden">
                <Image
                    src={cover}
                    alt={manga.title}
                    fill
                    priority
                    className="object-cover opacity-30 blur-2xl scale-110"
                />
                {/* Overlay Gradients */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/80 to-[#09090b]" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#09090b] via-transparent to-[#09090b] opacity-60" />
            </section>

            {/* 2. MAIN CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-[35vh] relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* --- ASIDE: POSTER & QUICK INFO --- */}
                    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-8 items-center lg:items-start">
                        {/* Poster with Glow */}
                        <div className="relative group w-full max-w-[320px] lg:max-w-none">
                            <div className="absolute -inset-1 bg-gradient-to-b from-orange-600 to-amber-600 rounded-[3.2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl">
                                <Image
                                    src={cover}
                                    alt={manga.title}
                                    fill
                                    priority
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${manga.status === 1 ? 'bg-green-500/10 text-green-400 border-green-500/20' : 'bg-zinc-500/10 text-zinc-400 border-zinc-500/20'}`}>
                                        {manga.status === 1 ? '• Ongoing' : '• Finished'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* META CARD: FULL INFO PANEL */}
                        <div className="w-full p-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            {/* Subtle Ambient Glow inside Card */}
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-cyan-500/10 blur-[60px] pointer-events-none" />

                            <div className="space-y-8 relative z-10">
                                {/* Section 1: Alternative Title */}
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <span className="w-1 h-1 bg-orange-500 rounded-full" />
                                        Judul Alternatif
                                    </p>
                                    <p className="text-[13px] font-medium text-zinc-300 italic leading-relaxed pl-3 border-l border-white/10">
                                        {manga.alternative_title || '-'}
                                    </p>
                                </div>

                                {/* Section 2: Creators (Author & Artist) */}
                                <div className="space-y-6 pt-2">
                                    {[
                                        { label: 'Author', data: manga.taxonomy?.Author, icon: '✍️' },
                                        { label: 'Artist', data: manga.taxonomy?.Artist, icon: '🎨' }
                                    ].map((creator, idx) => (
                                        <div key={idx} className="space-y-2">
                                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                                <span className="text-[12px] grayscale group-hover:grayscale-0 transition-all">{creator.icon}</span>
                                                {creator.label}
                                            </p>
                                            <div className="flex flex-wrap gap-2 pl-6">
                                                {creator.data && creator.data.length > 0 ? (
                                                    creator.data.map((item: any) => (
                                                        <span key={item.taxonomy_id} className="text-sm font-black text-zinc-100 group-hover:text-orange-400 transition-colors">
                                                            {item.name}
                                                        </span>
                                                    ))
                                                ) : (
                                                    <span className="text-sm font-bold text-zinc-600">-</span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Section 3: Year & Format (Grid Bottom) */}
                                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
                                    <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-colors">
                                        <p className="text-[9px] font-black text-zinc-500 uppercase mb-1 tracking-widest">Year</p>
                                        <p className="text-sm font-black text-white">{manga.release_year}</p>
                                    </div>
                                    <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5 hover:bg-white/[0.04] transition-colors">
                                        <p className="text-[9px] font-black text-zinc-500 uppercase mb-1 tracking-widest">Format</p>
                                        <p className="text-sm font-black text-orange-500 uppercase italic">
                                            {manga.taxonomy?.Format?.[0]?.name || 'Manga'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* --- MAIN INFO SECTION --- */}
                    <div className="flex-grow space-y-12">
                        {/* Header Info */}
                        <header className="space-y-8 text-center lg:text-left">
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {manga.taxonomy?.Genre?.map((genre: any) => (
                                    <span
                                        key={genre.taxonomy_id}
                                        className="px-4 py-1.5 bg-orange-600/10 border border-orange-600/20 rounded-xl text-[10px] font-black text-orange-500 uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 hover:text-white hover:border-orange-500 hover:shadow-[0_0_20px_rgba(234,88,12,0.3)] hover:-translate-y-0.5 cursor-pointer"
                                    >
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-white">
                                {manga.title}
                            </h1>

                            {/* Stats Glass Box */}
                            <div className="inline-flex flex-wrap items-center gap-8 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">⭐</span>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black leading-none text-amber-400">{manga.user_rate}</span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Rating</span>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">👁️</span>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black leading-none">{manga.view_count.toLocaleString()}</span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Views</span>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">🔖</span>
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black leading-none">{manga.bookmark_count.toLocaleString()}</span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Saved</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        {/* Synopsis */}
                        <section className="relative">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-4">Synopsis</h2>
                            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium max-w-4xl">
                                {manga.description}
                            </p>
                        </section>

                        {/* ===============================
                            MODERN CHAPTER LIST CONTAINER
                        =============================== */}
                        <div className="pt-8">
                            <div className="relative group bg-zinc-900/30 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 overflow-hidden shadow-2xl">

                                {/* Glow Effect Background */}
                                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-600/10 blur-[80px] -z-10" />

                                {/* --- HEADER --- */}
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black uppercase italic tracking-tighter text-white">
                                            Daftar <span className="text-orange-500">Chapter</span>
                                        </h3>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
                                            {chapters.length} Chapter Tersedia
                                        </p>
                                    </div>

                                    <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256">
                                            <path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM152,56V144H104V56ZM40,56H88v88H40ZM216,200H40V160H216v40Zm0-56H168V56h48Z"></path>
                                        </svg>
                                    </div>
                                </div>

                                {/* --- SCROLLABLE LIST --- */}
                                <div className="max-h-[500px] overflow-y-auto pr-3 space-y-3 custom-scrollbar no-scrollbar-mobile">
                                    <ChapterList chapters={chapters} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}