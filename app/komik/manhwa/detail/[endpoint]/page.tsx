import { getKomikChapterList, getKomikDetail } from "@/libs/komik/komik";
import { Metadata } from "next";
import Image from "next/image";
import ManhwaHero from "@/components/komik/manhwa/ManhwaHero";
import ManhwaChapterList from "@/components/komik/manhwa/ManhwaChapterLitst";
import SchemaMarkup from "@/components/SchemaMarkup";
import { Star, Eye, Bookmark, Zap, Clock, Users, Calendar } from "lucide-react";

function splitTitle(text: string) {
    const words = text?.trim().split(" ") || ["Komik"];
    if (words.length === 1) return { title1: words[0], title2: "" };
    const mid = Math.ceil(words.length / 2);
    return { title1: words.slice(0, mid).join(" "), title2: words.slice(mid).join(" ") };
}

export async function generateMetadata({ params }: { params: Promise<{ endpoint: string }> }): Promise<Metadata> {
    const { endpoint } = await params;
    const res = await getKomikDetail(endpoint);
    const manhwa = res?.data;

    if (!manhwa) return { title: "Manhwa Tidak Ditemukan | Tamanto" };

    const site = 'https://tamanto.web.id';
    const title = `Baca ${manhwa.title} Sub Indo`;
    const description = manhwa.description?.slice(0, 160) || `Baca manhwa ${manhwa.title} subtitle Indonesia terbaru hanya di Tamanto.`;

    return {
        title: `${title} | Tamanto`,
        description: description,
        alternates: { canonical: `${site}/komik/manhwa/${endpoint}` },
        openGraph: {
            title: title,
            description: description,
            url: `${site}/komik/manhwa/${endpoint}`,
            siteName: 'Tamanto',
            type: 'book',
            images: [{ url: manhwa.thumbnail || `${site}/og-fallback.jpg`, width: 800, height: 1200 }],
        },
    };
}

export default async function ManhwaDetailPage({ params }: { params: Promise<{ endpoint: string }> }) {
    const { endpoint } = await params;
    const res = await getKomikDetail(endpoint);
    const manhwa = res?.data;
    console.log(res)

    if (!manhwa) return (
        <div className="min-h-screen flex items-center justify-center bg-[#050505]">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto" />
                <p className="text-cyan-500 font-black uppercase tracking-widest animate-pulse">Initializing System...</p>
            </div>
        </div>
    );

    const chapters = manhwa.chapters || [];
    const info = manhwa.info || {};
    const genres = manhwa.genres || [];
    const { title1, title2 } = splitTitle(manhwa.title);
    const isOngoing = info["Status"]?.toLowerCase().includes("ongoing");

    return (
        <main className="min-h-screen bg-[#050505] text-zinc-100 pb-20 selection:bg-cyan-500/30 overflow-x-hidden">
            <SchemaMarkup data={manhwa} category="manhwa" type="Book" />

            {/* 1. DYNAMIC HERO COMPONENT */}
            <ManhwaHero
                title={title1}
                highlight={title2}
                desc={manhwa.description?.slice(0, 150) + "..."}
                backHref="/komik/manhwa"
                backLabel="Exit to Gate"
                badge={info["Jenis Komik"] || "MANHUA"}
            />

            {/* 2. ATMOSPHERIC BACKDROP */}
            <section className="relative h-[45vh] w-full overflow-hidden opacity-50">
                <Image src={manhwa.thumbnail} alt="" fill priority className="object-cover blur-[120px] scale-150" />
                <div className="absolute inset-0 bg-gradient-to-b from-[#050505] via-transparent to-[#050505]" />
            </section>

            {/* 3. CONTENT CORE */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 -mt-[35vh] relative z-20">
                <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">

                    {/* --- ASIDE: SYSTEM STATS & POSTER --- */}
                    <aside className="w-full lg:w-[340px] shrink-0 space-y-8">
                        {/* Neon Poster Frame */}
                        <div className="relative group mx-auto lg:mx-0 max-w-[320px] lg:max-w-none">
                            <div className="absolute -inset-1.5 bg-gradient-to-tr from-cyan-500 via-purple-500 to-cyan-500 rounded-[3rem] blur opacity-30 group-hover:opacity-60 transition duration-1000 animate-pulse"></div>
                            <div className="relative aspect-[3/4.5] rounded-[2.8rem] overflow-hidden border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.2)] bg-zinc-950">
                                <Image src={manhwa.thumbnail} alt={manhwa.title} fill className="object-cover transform transition-transform duration-1000 group-hover:scale-110 group-hover:rotate-1" />
                                <div className="absolute top-6 right-6">
                                    <div className={`px-5 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.25em] backdrop-blur-2xl border shadow-2xl ${isOngoing ? 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30' : 'bg-zinc-900/80 text-zinc-400 border-white/10'}`}>
                                        <span className="relative flex h-2 w-2 mr-2 inline-block">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                                        </span>
                                        {info["Status"] || 'Ongoing'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Power Level Stats */}
                        <div className="p-6 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                            <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/10 blur-[60px] pointer-events-none" />
                            <div className="space-y-6 relative z-10">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 group hover:border-cyan-500/50 transition-colors">
                                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Zap size={10} className="text-cyan-500" /> Power Level
                                        </p>
                                        <p className="text-xl font-black text-cyan-400">9.4</p>
                                    </div>
                                    <div className="p-4 bg-white/[0.03] rounded-2xl border border-white/5 group hover:border-purple-500/50 transition-colors">
                                        <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                                            <Users size={10} className="text-purple-500" /> Readers
                                        </p>
                                        <p className="text-xl font-black text-zinc-200">76K</p>
                                    </div>
                                </div>

                                <div className="space-y-4 pt-2">
                                    {[
                                        { label: 'Indo Title', val: manhwa.title_indonesia || info["Judul Indonesia"], icon: <Zap size={12} /> },
                                        { label: 'Creator', val: info["Pengarang"], icon: <Clock size={12} /> },
                                        { label: 'Concept', val: info["Konsep Cerita"], icon: <Star size={12} /> }
                                    ].map((item, i) => (
                                        <div key={i} className="flex justify-between items-start gap-4 py-1">
                                            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest shrink-0">{item.label}</span>
                                            <span className="text-[11px] font-bold text-zinc-300 text-right italic leading-tight">{item.val || '-'}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* --- MAIN: SCRIPTURES & SCROLLS --- */}
                    <div className="flex-grow space-y-12">
                        {/* Title & Path Selection */}
                        <header className="space-y-8">
                            <div className="flex flex-wrap gap-2.5">
                                {genres.map((genre: string, idx: number) => (
                                    <span key={idx} className="px-5 py-2 rounded-xl bg-[#09090b] border border-white/5 text-[10px] font-black text-cyan-400 uppercase tracking-widest hover:border-cyan-500/50 hover:text-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all cursor-default group">
                                        <span className="text-cyan-600 mr-1.5 opacity-0 group-hover:opacity-100 transition-opacity">#</span>
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </header>

                        {/* Immersive Synopsis */}
                        <section className="relative p-8 md:p-10 bg-zinc-900/20 rounded-[3rem] border border-white/5 overflow-hidden">
                            <div className="absolute top-0 left-0 w-1 h-20 bg-cyan-500 rounded-full blur-[1px]" />
                            <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-cyan-500 mb-6 flex items-center gap-3">
                                <span className="w-8 h-[1px] bg-cyan-500/30" /> Ancient Scripture
                            </h2>
                            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium italic whitespace-pre-line">
                                {manhwa.description}
                            </p>
                        </section>

                        {/* Chapter List (System Scroll) */}
                        <div className="relative group bg-[#080808] border border-cyan-500/10 rounded-[3rem] p-6 md:p-10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden">
                            <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-600/5 blur-[120px] -z-10 animate-pulse" />

                            <div className="flex items-center justify-between mb-10 border-b border-white/5 pb-8">
                                <div>
                                    <h3 className="text-3xl font-black uppercase italic text-white tracking-tighter">
                                        System <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Scrolls</span>
                                    </h3>
                                    <p className="text-[10px] text-zinc-600 font-bold uppercase tracking-[0.3em] mt-2 flex items-center gap-2">
                                        <Zap size={10} className="text-cyan-500" /> {manhwa.total_chapter || chapters.length} Chapters Unlocked
                                    </p>
                                </div>
                                <div className="h-14 w-14 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.1)] transition-transform group-hover:rotate-12">
                                    <Zap size={24} fill="currentColor" />
                                </div>
                            </div>

                            <div className="max-h-[700px] overflow-y-auto pr-2 custom-scrollbar no-scrollbar-mobile">
                                <ManhwaChapterList chapters={chapters} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}