import { getKomikDetail } from "@/libs/komik/komik";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

// Pastikan animasi shimmer sudah ada di tailwind.config.js atau globals.css
// keyframes: { shimmer: { '100%': { transform: 'translateX(100%)' } } }

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
    const manga = res?.data;

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

            {/* 1. IMMERSIVE HERO SECTION */}
            <section className="relative h-[65vh] w-full overflow-hidden">
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

                        {/* Meta Card */}
                        <div className="w-full p-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-xl">
                            <div className="space-y-6">
                                <div>
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-3">Alternative Title</p>
                                    <p className="text-xs font-medium text-zinc-400 italic leading-relaxed">{manga.alternative_title || '-'}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
                                    <div>
                                        <p className="text-[9px] font-black text-zinc-500 uppercase mb-1">Year</p>
                                        <p className="text-sm font-bold">{manga.release_year}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-zinc-500 uppercase mb-1">Format</p>
                                        <p className="text-sm font-bold text-orange-500">{manga.taxonomy?.Format?.[0]?.name}</p>
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

                            {/* Action CTA */}
                            <div className="pt-6">
                                <Link
                                    href={`/komik/manga/read/${manga.latest_chapter_id}`}
                                    className="group relative flex items-center justify-between p-1 shadow-2xl rounded-[2.6rem] bg-white/5 border border-white/10 hover:border-orange-500/50 transition-all duration-500 overflow-hidden"
                                >
                                    <div className="flex items-center gap-6 py-4 px-8">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-black text-orange-500 uppercase tracking-[0.4em]">Read Latest</span>
                                            <span className="text-2xl font-black text-white uppercase italic">Chapter {manga.latest_chapter_number}</span>
                                        </div>
                                    </div>
                                    <div className="m-2 w-16 h-16 bg-orange-600 rounded-[2rem] flex items-center justify-center text-white group-hover:bg-orange-500 group-hover:scale-105 transition-all duration-500">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="bold" viewBox="0 0 256 256"><path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path></svg>
                                    </div>
                                    {/* Animated Shine */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_2s_infinite]" />
                                </Link>
                            </div>
                        </header>

                        {/* Synopsis */}
                        <section className="relative">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-4">Synopsis</h2>
                            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium max-w-4xl">
                                {manga.description}
                            </p>
                        </section>

                        {/* Creators Section */}
                        <footer className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10">
                            {[
                                { label: 'Author / Penulis', data: manga.taxonomy?.Author },
                                { label: 'Artist / Ilustrator', data: manga.taxonomy?.Artist }
                            ].map((creator, idx) => (
                                <div key={idx} className="p-8 bg-white/[0.02] border border-white/5 rounded-[2.5rem]">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 italic">{creator.label ?? '-'}</p>
                                    <div className="flex flex-wrap gap-4">
                                        {creator.data?.map((item: any) => (
                                            <span key={item.taxonomy_id} className="text-md font-bold text-zinc-200">{item.name ?? '-'}</span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </footer>
                    </div>
                </div>
            </div>
        </main>
    );
}