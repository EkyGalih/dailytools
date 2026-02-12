import { getKomikDetail } from "@/libs/komik/komik";
import { Metadata } from "next";
import Image from "next/image";
import ManhuaHero from "@/components/komik/manhua/ManhuaHero";
import SchemaMarkup from "@/components/SchemaMarkup";
import ManhuaChapterList from "@/components/komik/manhua/ManhuaChapterLitst";
import { BookType, Eye } from "lucide-react";

function splitTitle(text: string) {
    const words = text.trim().split(" ")
    if (words.length === 1) return { title1: words[0], title2: "" }
    const mid = Math.ceil(words.length / 2)
    return { title1: words.slice(0, mid).join(" "), title2: words.slice(mid).join(" ") }
}

export async function generateMetadata({ params }: { params: Promise<{ endpoint: string }> }): Promise<Metadata> {
    const { endpoint } = await params;
    const res = await getKomikDetail(endpoint);
    const manhua = res?.data;

    if (!manhua) return { title: "Manhua Tidak Ditemukan | Tamanto" };

    const site = 'https://tamanto.web.id';
    const title = `Baca Manhua ${manhua.title} Sub Indo`;
    const description = manhua.description?.slice(0, 160) || `Baca manhua ${manhua.title} subtitle Indonesia terbaru dengan kualitas HD hanya di Tamanto.`;

    return {
        title: `${title} | Tamanto`,
        description: description,
        alternates: { canonical: `${site}/komik/manhua/${endpoint}` },
        openGraph: {
            title: title,
            description: description,
            url: `${site}/komik/manhua/${endpoint}`,
            siteName: 'Tamanto',
            type: 'book',
            images: [{ url: manhua.thumbnail || `${site}/og-fallback.jpg`, width: 800, height: 1200 }],
            locale: 'id_ID',
        },
    };
}

export default async function ManhuaDetailPage({ params }: { params: Promise<{ endpoint: string }> }) {
    const { endpoint } = await params;
    const res = await getKomikDetail(endpoint);
    const chapters = res?.data?.chapters;
    const manhua = res?.data;

    if (!manhua) return (
        <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
            <p className="text-zinc-500 font-black uppercase tracking-widest animate-pulse">Data tidak ditemukan</p>
        </div>
    );

    // Destructuring Data Baru
    const info = manhua.info || {};
    const genres = manhua.genres || [];
    const { title1, title2 } = splitTitle(manhua.title || "");
    const cover = manhua.thumbnail;
    const isOngoing = info["Status"]?.toLowerCase().includes("ongoing");

    return (
        <main className="min-h-screen bg-[#050606] text-zinc-100 pb-20 selection:bg-emerald-500/30 overflow-x-hidden">
            <SchemaMarkup data={manhua} category="manhua" type="Book" />

            <ManhuaHero
                title={title1}
                highlight={title2}
                desc={manhua.description?.slice(0, 120) + "..."}
                backHref="/komik/manhua"
                backLabel="Ke Perpustakaan"
                badge={info["Jenis Komik"] || "MANHUA"}
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
                        <div className="relative group mx-auto lg:mx-0 w-full max-w-[320px]">
                            <div className="absolute -inset-1 bg-gradient-to-tr from-emerald-600 to-teal-400 rounded-[2.5rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative aspect-[3/4.2] rounded-[2.2rem] overflow-hidden border border-emerald-500/20 shadow-2xl bg-zinc-900">
                                <Image src={cover} alt={manhua.title} fill priority className="object-cover transition-transform duration-700 group-hover:scale-105" />
                                <div className="absolute top-5 right-5">
                                    <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest backdrop-blur-xl border ${isOngoing ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-zinc-800 text-zinc-400 border-white/5'}`}>
                                        {isOngoing ? '• Cultivating' : '• Ascended'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* INFO PANEL (Mapping dari info{}) */}
                        <div className="w-full p-7 bg-emerald-950/10 backdrop-blur-2xl border border-emerald-500/10 rounded-[2rem] shadow-xl relative overflow-hidden">
                            <div className="space-y-6 relative z-10">
                                <div>
                                    <p className="text-[9px] font-black text-emerald-500/50 uppercase tracking-[0.2em] mb-2">Judul Indonesia</p>
                                    <p className="text-[12px] font-medium text-zinc-400 italic leading-relaxed line-clamp-2">
                                        {manhua.title_indonesia || info["Judul Indonesia"] || '-'}
                                    </p>
                                </div>
                                <div className="space-y-4 border-y border-emerald-500/10 py-5">
                                    <div>
                                        <p className="text-[9px] font-black text-emerald-500/50 uppercase tracking-[0.2em] mb-1">✍️ Pengarang</p>
                                        <p className="text-sm font-black text-zinc-200">{info["Pengarang"] || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-emerald-500/50 uppercase tracking-[0.2em] mb-1">🎭 Konsep Cerita</p>
                                        <p className="text-sm font-black text-zinc-200">{info["Konsep Cerita"] || '-'}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-[9px] font-black text-emerald-500/50 uppercase mb-1">Umur</p>
                                        <p className="text-sm font-black text-white">{info["Umur Pembaca"] || '-'}</p>
                                    </div>
                                    <div>
                                        <p className="text-[9px] font-black text-emerald-500/50 uppercase mb-1">Cara Baca</p>
                                        <p className="text-sm font-black text-emerald-400 uppercase tracking-tighter">{info["Cara Baca"] || '-'}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* --- MAIN CONTENT --- */}
                    <div className="flex-grow space-y-12">
                        <header className="space-y-8">
                            <div className="flex flex-wrap gap-2">
                                {genres.map((genreName: string, idx: number) => (
                                    <span key={idx} className="px-4 py-1.5 bg-emerald-500/5 border border-emerald-500/20 rounded-full text-[9px] font-black text-emerald-400 uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all cursor-pointer">
                                        {genreName}
                                    </span>
                                ))}
                            </div>

                            <div className="inline-flex flex-wrap items-center gap-6 p-5 bg-white/[0.02] border border-white/5 rounded-[1.8rem] backdrop-blur-md">
                                <div className="flex items-center gap-3">
                                    <BookType size={24} className="text-emerald-400" />
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black leading-none text-emerald-400">{info["Jenis Komik"] || "Manga"}</span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Komik</span>
                                    </div>
                                </div>
                                <div className="w-px h-6 bg-white/10" />
                                <div className="flex items-center gap-3">
                                   <Eye size={24} className="text-emerald-400" />
                                    <div className="flex flex-col">
                                        <span className="text-lg font-black text-zinc-200 leading-none">{manhua.total_chapter || "300+"}</span>
                                        <span className="text-[8px] font-bold text-zinc-600 uppercase">Total Scrolls</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <section className="space-y-4">
                            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-500">Ancient Scripture (Synopsis)</h2>
                            <p className="text-zinc-400 text-lg leading-relaxed font-medium max-w-4xl border-l-2 border-emerald-500/20 pl-6 py-1 whitespace-pre-line">
                                {manhua.description}
                            </p>
                        </section>

                        {/* Chapter List */}
                        <div className="relative group bg-[#0d0d0e]/60 backdrop-blur-3xl border border-emerald-500/10 rounded-[2.5rem] p-6 md:p-10 overflow-hidden shadow-2xl">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[100px] -z-10" />
                            <div className="flex items-center justify-between mb-10">
                                <div>
                                    <h3 className="text-2xl font-black uppercase italic text-white tracking-tighter">
                                        Daftar <span className="text-emerald-400">Scrolls</span>
                                    </h3>
                                    <p className="text-[9px] text-zinc-600 font-bold uppercase tracking-[0.2em] mt-1">{chapters.length} Scroll Available</p>
                                </div>
                            </div>
                            <div className="max-h-[600px] overflow-y-auto pr-2 custom-scrollbar">
                                <ManhuaChapterList chapters={chapters} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}