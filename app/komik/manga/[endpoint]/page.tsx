import ChapterList from "@/components/komik/manga/ChapterLitst";
import MangaHero from "@/components/komik/manga/MangaHero";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getKomikDetail } from "@/libs/komik/komik";
import { BookOpen, BookType } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";

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

export async function generateMetadata({ params }: { params: Promise<{ endpoint: string }> }): Promise<Metadata> {
    const { endpoint } = await params;
    const res = await getKomikDetail(endpoint);
    const manga = res?.data;

    if (!manga) {
        return {
            title: "Komik Tidak Ditemukan | Tamanto",
        };
    }

    const site = 'https://tamanto.web.id';
    const mangaTitle = manga.title || "Detail Komik";
    const mangaDescription = manga.description?.slice(0, 160) || `Baca komik ${mangaTitle} subtitle Indonesia terbaru dengan kualitas HD hanya di Tamanto.`;

    return {
        // Format: [Judul Komik] Sub Indo - Tamanto
        title: `${mangaTitle} Sub Indo`,
        description: mangaDescription,

        alternates: {
            // Sesuai struktur navigasi Anda untuk komik
            canonical: `${site}/komik/detail/${endpoint}`,
        },

        openGraph: {
            title: `Baca ${mangaTitle} Subtitle Indonesia`,
            description: mangaDescription,
            url: `${site}/komik/detail/${endpoint}`,
            siteName: 'Tamanto',
            type: 'book',
            images: [
                {
                    url: manga.thumbnail || manga.cover || `${site}/og-fallback.jpg`,
                    width: 800,
                    height: 1200,
                    alt: `Cover ${mangaTitle}`,
                },
            ],
            locale: 'id_ID',
        },

        twitter: {
            card: 'summary_large_image',
            title: `${mangaTitle} | Update Chapter Terbaru`,
            description: mangaDescription,
            images: [manga.thumbnail || manga.cover || `${site}/og-fallback.jpg`],
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
    }
}

export default async function MangaDetailPage({ params }: { params: Promise<{ endpoint: string }> }) {
    const { endpoint } = await params;
    const res = await getKomikDetail(endpoint);
    const chapters = res?.data?.chapters || [];
    const manga = res?.data;
    
    if (!manga) return (
        <div className="min-h-screen flex items-center justify-center bg-[#09090b]">
            <p className="text-zinc-500 font-black uppercase tracking-widest animate-pulse">Data tidak ditemukan</p>
        </div>
    );

    // Penyesuaian Variabel Data Baru
    const { title1, title2 } = splitTitle(manga.title || "");
    const info = manga.info || {};
    const genres = manga.genres || [];
    const cover = manga.thumbnail; // Data baru menggunakan 'thumbnail'

    // Status Ongoing vs Finished
    const isOngoing = info["Status"]?.toLowerCase().includes("ongoing");

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 selection:bg-orange-500/30 overflow-x-hidden">
            <SchemaMarkup data={manga} category="manga" type="Book" />

            <MangaHero
                title={title1}
                highlight={title2}
                desc={manga.description?.slice(0, 120) + "..."}
                backHref="/komik/manga"
                backLabel="Kembali ke Library"
                badge={info["Jenis Komik"] || "MANGA"}
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
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#09090b]/80 to-[#09090b]" />
            </section>

            {/* 2. MAIN CONTENT AREA */}
            <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-[35vh] relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">

                    {/* --- ASIDE: POSTER & QUICK INFO --- */}
                    <aside className="w-full lg:w-80 shrink-0 flex flex-col gap-8 items-center lg:items-start">
                        <div className="relative group w-full max-w-[320px] lg:max-w-none">
                            <div className="absolute -inset-1 bg-gradient-to-b from-orange-600 to-amber-600 rounded-[3.2rem] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
                            <div className="relative aspect-[3/4] rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl bg-zinc-900">
                                <Image
                                    src={cover}
                                    alt={manga.title}
                                    fill
                                    priority
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                />
                                <div className="absolute top-6 left-6">
                                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest backdrop-blur-md border ${isOngoing ? 'bg-green-500/10 text-orange-400 border-green-500/20' : 'bg-blue-500/10 text-orange-400 border-blue-500/20'}`}>
                                        {isOngoing ? '• Ongoing' : '• Finished'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* META PANEL (Menggunakan data dari info{}) */}
                        <div className="w-full p-8 bg-zinc-900/40 backdrop-blur-3xl border border-white/5 rounded-[2.5rem] shadow-2xl relative overflow-hidden group">
                            <div className="space-y-8 relative z-10">
                                <div className="space-y-3">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        <span className="w-1 h-1 bg-orange-500 rounded-full" />
                                        Judul Indonesia
                                    </p>
                                    <p className="text-[13px] font-medium text-zinc-300 italic leading-relaxed pl-3 border-l border-white/10">
                                        {manga.title_indonesia || info["Judul Indonesia"] || "-"}
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] flex items-center gap-2">
                                        ✍️ Pengarang
                                    </p>
                                    <p className="text-sm font-black text-zinc-100 pl-6">
                                        {info["Pengarang"] || "-"}
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
                                    <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                                        <p className="text-[9px] font-black text-zinc-500 uppercase mb-1 tracking-widest">Rating Umur</p>
                                        <p className="text-sm font-black text-white">{info["Umur Pembaca"] || "-"}</p>
                                    </div>
                                    <div className="bg-white/[0.02] p-4 rounded-2xl border border-white/5">
                                        <p className="text-[9px] font-black text-zinc-500 uppercase mb-1 tracking-widest">Cara Baca</p>
                                        <p className="text-sm font-black text-orange-500 uppercase italic">
                                            {info["Cara Baca"] || "Kiri ke Kanan"}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </aside>

                    {/* --- MAIN INFO SECTION --- */}
                    <div className="flex-grow space-y-12">
                        <header className="space-y-8 text-center lg:text-left">
                            <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                                {genres.map((genreName: string, idx: number) => (
                                    <span
                                        key={idx}
                                        className="px-4 py-1.5 bg-orange-600/10 border border-orange-600/20 rounded-xl text-[10px] font-black text-orange-500 uppercase tracking-widest transition-all duration-300 hover:bg-orange-600 hover:text-white"
                                    >
                                        {genreName}
                                    </span>
                                ))}
                            </div>

                            <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-white">
                                {manga.title}
                            </h1>

                            <div className="inline-flex flex-wrap items-center gap-8 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] backdrop-blur-sm">
                                <div className="flex items-center gap-3">
                                    <BookType size={24} className="text-amber-400" />
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black leading-none text-amber-400">{info["Jenis Komik"] || "Manga"}</span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Komik</span>
                                    </div>
                                </div>
                                <div className="w-px h-8 bg-white/10 hidden sm:block" />
                                <div className="flex items-center gap-3">
                                    <BookOpen size={24} className="text-orange-500" />
                                    <div className="flex flex-col">
                                        <span className="text-xl font-black leading-none">{manga.total_chapter || chapters.length}</span>
                                        <span className="text-[10px] font-bold text-zinc-500 uppercase">Total Ch.</span>
                                    </div>
                                </div>
                            </div>
                        </header>

                        <section className="relative">
                            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-orange-500 mb-4">Synopsis</h2>
                            <p className="text-zinc-400 text-lg md:text-xl leading-relaxed font-medium max-w-4xl whitespace-pre-line">
                                {manga.description}
                            </p>
                        </section>

                        <div className="pt-8">
                            <div className="relative group bg-zinc-900/30 backdrop-blur-3xl border border-white/5 rounded-[3rem] p-8 overflow-hidden shadow-2xl">
                                <div className="flex items-center justify-between mb-8 px-2">
                                    <div className="space-y-1">
                                        <h3 className="text-lg font-black uppercase italic tracking-tighter text-white">
                                            Daftar <span className="text-orange-500">Chapter</span>
                                        </h3>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">
                                            {chapters.length} Chapter Tersedia
                                        </p>
                                    </div>
                                </div>

                                <div className="max-h-[500px] overflow-y-auto pr-3 space-y-3 custom-scrollbar">
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