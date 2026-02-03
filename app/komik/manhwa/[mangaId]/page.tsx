import { getKomikChapterList, getKomikDetail } from "@/libs/komik/komik";
import { Metadata } from "next";
import Image from "next/image";
import ManhwaHero from "@/components/komik/manhwa/ManhwaHero";
import ManhwaChapterList from "@/components/komik/manhwa/ManhwaChapterLitst";
import SchemaMarkup from "@/components/SchemaMarkup";

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
    const manhwa = res?.data;

    if (!manhwa) {
        return {
            title: "Manhwa Tidak Ditemukan | Tamanto",
        };
    }

    const site = 'https://tamanto.web.id';
    const title = `Baca Manhwa ${manhwa.title} Sub Indo`;
    const description = manhwa.description?.slice(0, 160) || `Baca manhwa ${manhwa.title} subtitle Indonesia terbaru dengan kualitas HD hanya di Tamanto.`;

    return {
        // Format: Baca Manhwa [Judul] Sub Indo | Tamanto
        title: `${title} | Tamanto`,
        description: description,

        alternates: {
            // Mengarahkan ke rute spesifik manhwa di Tamanto
            canonical: `${site}/komik/manhwa/${mangaId}`,
        },

        openGraph: {
            title: title,
            description: description,
            url: `${site}/komik/manhwa/${mangaId}`,
            siteName: 'Tamanto',
            type: 'book',
            images: [
                {
                    url: manhwa.thumbnail || manhwa.cover || manhwa.cover_image_url || `${site}/og-fallback.jpg`,
                    width: 800,
                    height: 1200,
                    alt: `Cover Manhwa ${manhwa.title}`,
                },
            ],
            locale: 'id_ID',
        },

        twitter: {
            card: 'summary_large_image',
            title: title,
            description: description,
            images: [manhwa.thumbnail || manhwa.cover || manhwa.cover_image_url || `${site}/og-fallback.jpg`],
        },

        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-image-preview': 'large',
            },
        },
    };
}

export default async function ManhwaDetailPage({ params }: { params: Promise<{ mangaId: string }> }) {
    const { mangaId } = await params;
    const [res, chapters] = await Promise.all([
        getKomikDetail(mangaId),
        getKomikChapterList(mangaId)
    ]);

    const manhwa = res?.data;
    const cover = manhwa?.cover_portrait_url || manhwa?.cover_image_url;
    const { title1, title2 } = splitTitle(manhwa.title)

    if (!manhwa) return (
        <div className="min-h-screen flex items-center justify-center bg-[#070708]">
            <div className="text-center space-y-4">
                <div className="w-16 h-16 border-4 border-cyan-500/20 border-t-cyan-500 rounded-full animate-spin mx-auto" />
                <p className="text-zinc-500 font-black uppercase tracking-widest">Memuat Data...</p>
            </div>
        </div>
    );

    return (
        <main className="min-h-screen bg-[#070708] text-zinc-100 pb-20 selection:bg-cyan-500/30">
            <SchemaMarkup data={manhwa} category="manhwa" type="Book" />
            {/* 1. DYNAMIC HERO COMPONENT */}
            <ManhwaHero
                title={title1}
                highlight={title2}
                desc={manhwa.description?.slice(0, 120) + "..."}
                backHref="/komik/manhwa"
                backLabel="Back to Library"
                badge={manhwa.taxonomy?.Format?.[0]?.name || "MANHWA"}
            />

            {/* 2. IMMERSIVE BLUR BACKDROP */}
            <section className="relative h-[40vh] w-full overflow-hidden opacity-40">
                <Image
                    src={cover}
                    alt=""
                    fill
                    priority
                    className="object-cover blur-[100px] scale-125"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-[#070708] via-transparent to-[#070708]" />
            </section>

            {/* 3. CONTENT GRID */}
            <div className="max-w-7xl mx-auto px-4 md:px-10 lg:px-20 -mt-[30vh] relative z-20">
                <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

                    {/* --- LEFT COLUMN: POSTER & STATS --- */}
                    <aside className="w-full lg:w-[350px] shrink-0 space-y-6">
                        {/* Premium Poster */}
                        <div className="relative group">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-cyan-500 to-violet-600 rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-700"></div>
                            <div className="relative aspect-[3/4.2] rounded-[2.2rem] overflow-hidden border border-white/10 shadow-3xl bg-zinc-900">
                                <Image
                                    src={cover}
                                    alt={manhwa.title}
                                    fill
                                    className="object-cover transform transition-transform duration-1000 group-hover:scale-110"
                                />
                                {/* Status Floating Badge */}
                                <div className="absolute top-5 right-5">
                                    <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] backdrop-blur-xl border ${manhwa.status === 1 ? 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30' : 'bg-zinc-800/80 text-zinc-400 border-white/10'}`}>
                                        {manhwa.status === 1 ? 'Ongoing' : 'Completed'}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Quick Stats Card */}
                        <div className="grid grid-cols-3 gap-2">
                            {[
                                { label: 'Rating', val: manhwa.user_rate, icon: '⭐', color: 'text-amber-400' },
                                { label: 'Views', val: manhwa.view_count.toLocaleString(), icon: '👁️', color: 'text-cyan-400' },
                                { label: 'Saved', val: manhwa.bookmark_count.toLocaleString(), icon: '🔖', color: 'text-violet-400' }
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/[0.03] border border-white/5 rounded-2xl p-3 text-center backdrop-blur-md">
                                    <p className={`text-sm font-black mb-0.5 ${stat.color}`}>{stat.val}</p>
                                    <p className="text-[8px] font-bold text-zinc-500 uppercase tracking-tighter">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* Meta Info Box */}
                        <div className="p-6 bg-zinc-900/40 backdrop-blur-xl border border-white/5 rounded-[2rem] space-y-4">
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-[10px] font-black text-zinc-500 uppercase">Year</span>
                                <span className="text-xs font-bold text-zinc-200">{manhwa.release_year}</span>
                            </div>
                            <div className="flex justify-between items-center py-2 border-b border-white/5">
                                <span className="text-[10px] font-black text-zinc-500 uppercase">Format</span>
                                <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">{manhwa.taxonomy?.Format?.[0]?.name || 'Manhwa'}</span>
                            </div>
                            <div>
                                <p className="text-[10px] font-black text-zinc-500 uppercase mb-2">Judul Alternatif</p>
                                <p className="text-[11px] text-zinc-400 leading-relaxed italic line-clamp-2">{manhwa.alternative_title || '-'}</p>
                            </div>
                        </div>
                    </aside>

                    {/* --- RIGHT COLUMN: SYNOPSIS & CHAPTERS --- */}
                    <div className="flex-grow space-y-10">
                        {/* Title & Genres Section */}
                        <div className="space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {manhwa.taxonomy?.Genre?.map((genre: any) => (
                                    <span key={genre.taxonomy_id} className="px-4 py-1.5 rounded-full bg-zinc-900 border border-white/5 text-[10px] font-bold text-zinc-400 uppercase tracking-wider hover:border-cyan-500/50 hover:text-cyan-400 transition-all cursor-default">
                                        {genre.name}
                                    </span>
                                ))}
                            </div>
                            {/* <h1 className="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter leading-none italic">
                                {manhwa.title}
                            </h1> */}
                        </div>

                        {/* Synopsis */}
                        <div className="space-y-4 max-w-3xl">
                            <div className="flex items-center gap-4">
                                <div className="h-px w-8 bg-cyan-500" />
                                <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">Sinopsis</h2>
                            </div>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                                {manhwa.description}
                            </p>
                        </div>

                        {/* Creators Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                { role: 'Author', list: manhwa.taxonomy?.Author },
                                { role: 'Artist', list: manhwa.taxonomy?.Artist }
                            ].map((item, i) => (
                                <div key={i} className="p-5 rounded-[1.5rem] bg-white/[0.02] border border-white/5 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase text-zinc-500 tracking-widest">{item.role}</span>
                                    <span className="text-sm font-bold text-zinc-200">{item.list?.[0]?.name || '-'}</span>
                                </div>
                            ))}
                        </div>

                        {/* Chapter List Card */}
                        <div className="relative group overflow-hidden bg-zinc-900/60 backdrop-blur-2xl border border-white/5 rounded-[2.5rem] p-6 md:p-10 shadow-2xl">
                            {/* Decorative Glow */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-600/5 blur-[100px] -z-10" />

                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-2xl font-black uppercase italic text-white tracking-tighter">
                                        Daftar <span className="text-cyan-400">Chapter</span>
                                    </h3>
                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] mt-1">{chapters.length} Total Chapters</p>
                                </div>
                                <div className="h-12 w-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-cyan-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 6h16M4 12h16M4 18h7" /></svg>
                                </div>
                            </div>

                            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar no-scrollbar-mobile">
                                <ManhwaChapterList chapters={chapters} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}