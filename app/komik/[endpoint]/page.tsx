import ChapterList from "@/components/komik/manga/ChapterLitst";
import SchemaMarkup from "@/components/SchemaMarkup";
import { getKomikChapterList, getKomikDetail } from "@/libs/komik/komik";
import { ArrowLeft, Bookmark, Zap } from "lucide-react";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ endpoint: string }> }): Promise<Metadata> {
    const { endpoint } = await params;
    const res = await getKomikDetail(endpoint);
    const manga = res?.data;
    if (!manga) return { title: "Komik Tidak Ditemukan | Tamanto" };
    const site = 'https://tamanto.web.id';
    const mangaTitle = manga.title || "Detail Komik";
    const mangaDescription = manga.description?.slice(0, 160) || `Baca komik ${mangaTitle} subtitle Indonesia terbaru dengan kualitas HD hanya di Tamanto.`;

    return {
        title: `${mangaTitle} Sub Indo`,
        description: mangaDescription,
        alternates: { canonical: `${site}/komik/detail/${endpoint}` },
        openGraph: {
            title: `Baca ${mangaTitle} Subtitle Indonesia`,
            description: mangaDescription,
            url: `${site}/komik/detail/${endpoint}`,
            siteName: 'Tamanto',
            type: 'book',
            images: [{ url: manga.thumbnail || manga.cover || `${site}/og-fallback.jpg`, width: 800, height: 1200, alt: `Cover ${mangaTitle}` }],
            locale: 'id_ID',
        },
    }
}

export default async function MangaDetailPage({
    params,
}: {
    params: Promise<{ endpoint: string }>
}) {
    const { endpoint } = await params
    const detailRes = await getKomikDetail(endpoint)
    const manga = detailRes?.data
    const chaptersRes = await getKomikChapterList(endpoint)
    const chapters = Array.isArray(chaptersRes) ? chaptersRes : (chaptersRes?.data || [])

    if (!manga) return <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-400">Komik tidak ditemukan</div>

    const formatType = manga.taxonomy?.Format?.[0]?.name || "Manga"
    const formatSlug = manga.taxonomy?.Format?.[0]?.slug?.toLowerCase() || "manga"
    const genres = manga.taxonomy?.Genre?.map((g: any) => g.name) || []
    const authors = manga.taxonomy?.Author?.map((a: any) => a.name).join(", ") || "-"
    const artists = manga.taxonomy?.Artist?.map((a: any) => a.name).join(", ") || "-"
    const isOngoing = manga.status === 1

    // --- 🎨 DYNAMIC ACCENT COLOR LOGIC ---
    const theme = {
        manga: {
            text: "text-red-500",
            bg: "bg-red-500",
            border: "border-red-500/20",
            glow: "bg-red-500/10",
            hover: "hover:bg-red-600",
            btn: "hover:border-red-500"
        },
        manhwa: {
            text: "text-cyan-400",
            bg: "bg-cyan-500",
            border: "border-cyan-500/20",
            glow: "bg-cyan-500/10",
            hover: "hover:bg-cyan-600",
            btn: "hover:border-cyan-500"
        },
        manhua: {
            text: "text-emerald-400",
            bg: "bg-emerald-500",
            border: "border-emerald-500/20",
            glow: "bg-emerald-500/10",
            hover: "hover:bg-emerald-600",
            btn: "hover:border-emerald-500"
        }
    }[formatSlug as 'manga' | 'manhwa' | 'manhua'] || {
        text: "text-orange-500", bg: "bg-orange-600", border: "border-orange-500/20", glow: "bg-orange-500/10", hover: "hover:bg-orange-700", btn: "hover:border-orange-500"
    };

    return (
        <main className="min-h-screen bg-[#050507] text-white pb-24">
            <SchemaMarkup data={manga} category={formatSlug || "manga"} type="Book" />

            {/* HERO SECTION WITH DYNAMIC GLOW */}
            <section className="relative h-[60vh] w-full overflow-hidden">
                <Image
                    src={manga.cover_image_url}
                    alt={manga.title}
                    fill
                    priority
                    className="object-cover opacity-30 blur-3xl scale-110"
                />
                <div className={`absolute inset-0 bg-gradient-to-b from-black/20 via-black/60 to-[#050507]`} />
                <div className={`absolute top-0 left-0 w-full h-full ${theme.glow} opacity-30 pointer-events-none`} />
            </section>

            <div className="max-w-7xl mx-auto px-6 lg:px-20 -mt-[45vh] relative z-10">

                {/* BACK BUTTON WITH DYNAMIC HOVER */}
                <div className="mb-8">
                    <Link
                        href="/komik/manga"
                        className={`group inline-flex items-center gap-2 px-6 py-2.5 bg-zinc-900/50 ${theme.hover} border border-white/5 ${theme.btn} rounded-full text-[10px] font-black uppercase tracking-[0.3em] transition-all duration-500 shadow-2xl`}
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Kembali
                    </Link>
                </div>

                <div className="flex flex-col lg:flex-row gap-12 xl:gap-20">
                    {/* LEFT COVER */}
                    <aside className="w-full lg:w-80 shrink-0">
                        <div className={`relative aspect-[3/4.5] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10`}>
                            <Image
                                src={manga.cover_image_url || manga.cover_portrait_url}
                                alt={manga.title}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="mt-8 p-8 bg-[#0c0c0e]/80 border border-white/5 rounded-[2.5rem] backdrop-blur-3xl space-y-6">
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">Format</p>
                                <p className={`text-sm font-black uppercase italic ${theme.text}`}>{formatType}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">Status</p>
                                <p className="text-sm font-black uppercase italic text-white">{isOngoing ? "Ongoing" : "Finished"}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">Release</p>
                                <p className="text-sm font-black uppercase italic text-white">{manga.release_year || "-"}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 mb-2">Views</p>
                                <p className="text-sm font-black uppercase italic text-white">{manga.view_count?.toLocaleString()}</p>
                            </div>
                        </div>
                    </aside>

                    {/* RIGHT CONTENT */}
                    <div className="flex-1 space-y-12">
                        <header className="space-y-4">
                            <h1 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-[0.85] text-white">
                                {manga.title}
                            </h1>
                            <p className="text-zinc-500 italic font-medium text-lg">{manga.alternative_title}</p>

                            <div className="flex flex-wrap gap-2 pt-4">
                                {genres.map((genre: string, i: number) => (
                                    <span key={i} className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest bg-white/5 border border-white/5 hover:border-white/20 transition-all text-zinc-400 hover:${theme.text}`}>
                                        {genre}
                                    </span>
                                ))}
                            </div>
                        </header>

                        {/* INFO GRID WITH DYNAMIC TEXT */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 p-8 bg-[#0c0c0e]/40 border border-white/5 rounded-[2.5rem] backdrop-blur-xl">
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mb-2">Author</p>
                                <p className="text-sm font-bold text-zinc-300">{authors}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mb-2">Artist</p>
                                <p className="text-sm font-bold text-zinc-300">{artists}</p>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-2xl">
                                    <Bookmark size={20} className={theme.text} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mb-1">Bookmark</p>
                                    <p className="text-lg font-black italic text-white">{manga.bookmark_count?.toLocaleString()}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4">
                                <div className="p-3 bg-white/5 rounded-2xl">
                                    <Zap size={20} className={theme.text} />
                                </div>
                                <div>
                                    <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mb-1">Latest Chapter</p>
                                    <p className={`text-lg font-black italic ${theme.text}`}>Ch. {manga.latest_chapter_number}</p>
                                </div>
                            </div>
                        </div>

                        <section className="space-y-4">
                            <div className="flex items-center gap-3">
                                <div className={`h-1 w-12 ${theme.bg} rounded-full`} />
                                <h2 className={`text-xs font-black uppercase tracking-[0.4em] ${theme.text}`}>Synopsis</h2>
                            </div>
                            <p className="text-zinc-400 leading-relaxed text-sm md:text-base whitespace-pre-line font-medium">
                                {manga.description}
                            </p>
                        </section>

                        {/* CHAPTER LIST WITH THEME INJECTED */}
                        <div className="pt-10">
                            <div className="relative bg-[#0c0c0e] border border-white/5 rounded-[3.5rem] p-8 md:p-12 shadow-2xl overflow-hidden">
                                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
                                    <div className="space-y-2">
                                        <h3 className="text-3xl md:text-5xl font-black italic uppercase tracking-tighter text-white">
                                            Archive <span className={theme.text}>Chapters</span>
                                        </h3>
                                        <p className="text-[10px] text-zinc-600 font-black uppercase tracking-[0.3em]">
                                            Total {chapters.length} Records Detected
                                        </p>
                                    </div>
                                </div>
                                <div className="max-h-[650px] overflow-y-auto pr-3 space-y-3 custom-scrollbar">
                                    {/* Pass formatSlug ke ChapterList biar warnanya seragam */}
                                    <ChapterList chapters={chapters} formatType={formatSlug} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}