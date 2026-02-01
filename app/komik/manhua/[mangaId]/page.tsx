import { getKomikChapterList, getKomikDetail } from "@/libs/komik/komik";
import { Metadata } from "next";
import Image from "next/image";
import ChapterList from "@/components/komik/manga/ChapterLitst";
import ManhuaHero from "@/components/komik/manhua/ManhuaHero";

function splitTitle(text: string) {
    const words = text.trim().split(" ")
    if (words.length === 1) return { title1: words[0], title2: "" }
    const mid = Math.ceil(words.length / 2)
    return { title1: words.slice(0, mid).join(" "), title2: words.slice(mid).join(" ") }
}

export async function generateMetadata({ params }: { params: Promise<{ mangaId: string }> }): Promise<Metadata> {
    const { mangaId } = await params;
    const res = await getKomikDetail(mangaId);
    const manhua = res?.data;

    return {
        title: `Baca ${manhua?.title || "Manhua"} Bahasa Indonesia - MyTools`,
        description: `Baca ${manhua?.title} online. ${manhua?.description?.slice(0, 150)}...`,
        openGraph: {
            images: [manhua?.cover_image_url || ""],
        },
    };
}

export default async function ManhuaDetailPage({ params }: { params: Promise<{ mangaId: string }> }) {
    const { mangaId } = await params;
    const res = await getKomikDetail(mangaId);
    const chapters = await getKomikChapterList(mangaId);
    const manga = res?.data;

    if (!manga) return null;
    const { title1, title2 } = splitTitle(manga.title)
    const cover = manga?.cover_portrait_url?.trim() || manga?.cover_image_url;

    return (
        <main className="min-h-screen bg-[#050606] text-zinc-100 pb-20 selection:bg-emerald-500/30 overflow-x-hidden">
            <ManhuaHero
                title={title1}
                highlight={title2}
                desc={manga.description?.slice(0, 120) + "..."}
                backHref="/komik/manhua"
                backLabel="Ke Perpustakaan"
                badge={manga.taxonomy?.Format?.[0]?.name || "MANHUA"}
            />

            {/* 1. ATMOSPHERIC BACKDROP */}
            <section className="relative h-[50vh] w-full overflow-hidden">
                <Image
                    src={cover}
                    alt=""
                    fill
                    priority
                    className="object-cover opacity-20 blur-[80px] scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#050606]/80 to-[#050606]" />
            </section>

            {/* 2. MAIN CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-[40vh] relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-16">

                    {/* --- ASIDE: POSTER & META --- */}
                    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-6">
                        {/* Jade Poster Frame */}
                        <div className="relative group mx-auto lg:mx-0 w-full max-w-[320px]">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative aspect-[3/4.2] rounded-[2.2rem] overflow-hidden border border-emerald-500/20 shadow-2xl bg-zinc-900">
                                <Image src={cover} alt={manga.title} fill priority className="object-cover transition-transform duration-1000 group-hover:scale-110" />
                                <div className="absolute top-5 right-5">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-xl border ${manga.status === 1 ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-zinc-800 text-zinc-400 border-white/5'}`}>
                                        {manga.status === 1 ? '• Cultivating' : '• Ascended'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* INFO PANEL (META CARD) */}
                        <div className="w-full p-7 bg-emerald-950/10 backdrop-blur-2xl border border-emerald-500/10 rounded-[2rem] shadow-xl relative overflow-hidden">
                            <div className="absolute -top-12 -right-12 w-32 h-32 bg-emerald-500/5 blur-[50px] pointer-events-none" />
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <p className="text-[9px] font-black text-emerald-500/50 uppercase tracking-[0.2em] mb-2">Alternatif</p>
                                    <p className="text-[12px] font-medium text-zinc-400 italic leading-relaxed line-clamp-2">{manga.alternative_title || '-'}</p>
                                </div>
                                <div className="space-y-4 border-y border-emerald-500/10 py-5">
                                    {[
                                        { label: 'Author', data: manga.taxonomy?.Author, icon: '✍️' },
                                        { label: 'Artist', data: manga.taxonomy?.Artist, icon: '🎨' }
                                    ].map((creator, i) => (
                                        <div key={i}>
                                            <p className="text-[9px] font-black text-emerald-500/50 uppercase tracking-[0.2em] mb-1">{creator.label}</p>
                                            <p className="text-sm font-black text-zinc-200">{creator.data?.[0]?.name || '-'}</p>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[9px] font-black text-emerald-500/50 uppercase mb-1">Rilis</p>
                                        <p className="text-sm font-black text-white">{manga.release_year}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-emerald-500/50 uppercase mb-1">Format</p>
                                        <p className="text-sm font-black text-emerald-400 uppercase tracking-tighter">{manga.taxonomy?.Format?.[0]?.name}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* --- MAIN CONTENT --- */}
                    <div className="flex-grow space-y-12">
                        {/* Header Stats */}
                        <header className="space-y-8">
                            <div className="flex flex-wrap gap-2">
                                {manga.taxonomy?.Genre?.map((genre: any) => (
                                    <span key={genre.taxonomy_id} className="px-4 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>

                            <div className="inline-flex flex-wrap items-center gap-6 p-5 bg-white/[0.02] border border-white/5 rounded-[1.8rem] backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">⭐</span>
                                    <div className="flex flex-col"><span className="text-lg font-black text-emerald-400 leading-none">{manga.user_rate}</span><span className="text-[8px] font-bold text-zinc-600 uppercase">Power Level</span></div>
                                </div>
                                <div className="w-px h-6 bg-white/10" />
                                <div className="flex items-center gap-3">
                                    <span className="text-xl">👁️</span>
                                    <div className="flex flex-col"><span className="text-lg font-black text-zinc-200 leading-none">{manga.view_count.toLocaleString()}</span><span className="text-[8px] font-bold text-zinc-600 uppercase">Cultivators</span></div>
                                </div>
                            </div>
                        </header>

                        {/* Synopsis */}
                        <section className="space-y-4">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Ancient Scripture (Synopsis)</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed font-medium max-w-4xl border-l-2 border-emerald-500/20 pl-6 py-1">
                                {manga.description}
                            </p>
                        </section>

                        {/* Chapter List Container */}
                        <div className="relative group bg-[#0d0d0e]/60 backdrop-blur-3xl border border-emerald-500/10 rounded-[2.5rem] p-6 md:p-10 overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-2xl font-black uppercase italic text-white tracking-tighter">
                                        Daftar <span className="text-emerald-400">Scrolls</span>
                                    </h3>
                                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] mt-1">{chapters.length} Scrolls Available</p>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 256 256"><path d="M216,40H40A16,16,0,0,0,24,56V200a16,16,0,0,0,16,16H216a16,16,0,0,0,16-16V56A16,16,0,0,0,216,40ZM152,56V144H104V56ZM40,56H88v88H40ZM216,200H40V160H216v40Zm0-56H168V56h48Z"></path></svg>
                                </div>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar no-scrollbar-mobile">
                                <ChapterList chapters={chapters} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}