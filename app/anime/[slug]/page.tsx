import AnimeActionDetails from "@/components/anime/AnimeActionDetails";
import { getAnimeDetail } from "@/libs/anime/anime";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const res = await getAnimeDetail(slug);
    const data = res?.data;

    if (!data) {
        return {
            title: 'Anime Tidak Ditemukan | Tamanto',
        };
    }

    const siteName = 'Tamanto';
    const siteUrl = 'https://tamanto.web.id';
    const fullTitle = `Nonton ${data.title} Sub Indo HD`;
    const cleanDescription = data.synopsis?.slice(0, 160) || `Streaming anime ${data.title} subtitle Indonesia kualitas HD terbaru di ${siteName}.`;

    return {
        title: fullTitle,
        description: cleanDescription,
        alternates: {
            canonical: `${siteUrl}/anime/${slug}`,
        },
        openGraph: {
            title: `${data.title} - Tamanto Anime Universe`,
            description: cleanDescription,
            url: `${siteUrl}/anime/${slug}`,
            siteName: siteName,
            type: 'video.tv_show',
            images: [
                {
                    url: data.thumbnail || `${siteUrl}/og-fallback.jpg`,
                    width: 800,
                    height: 1200,
                    alt: `Nonton ${data.title} di Tamanto`,
                },
            ],
            locale: 'id_ID',
        },
        twitter: {
            card: 'summary_large_image',
            title: fullTitle,
            description: cleanDescription,
            images: [data.thumbnail || `${siteUrl}/og-fallback.jpg`],
        },
        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
        },
    };
}

export default async function AnimeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const res = await getAnimeDetail(slug);
    const data = res?.data;
    console.log(data)
    if (!data) return <div className="text-white text-center py-20 font-black">ANIME TIDAK DITEMUKAN</div>;

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 overflow-x-hidden">

            {/* 1. HERO BACKDROP SECTION */}
            <section className="relative min-h-[70vh] md:h-[80vh] w-full flex items-center pt-20 md:pt-0">
                {/* Image Backdrop (Blurred) */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        className="object-cover opacity-30 blur-2xl scale-110"
                        priority
                    />
                    {/* Gradient yang lebih halus dan gelap di mobile agar teks terbaca */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/80 md:via-[#09090b]/40 to-black/60" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 w-full px-6 lg:px-20 pb-12">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-end w-full">

                        {/* Poster Utama - Diberi Margin Top di mobile agar tidak terpotong */}
                        <div className="relative w-48 md:w-64 aspect-[3/4] shrink-0 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10 mt-4 md:mt-0">
                            <Image
                                src={data.thumbnail}
                                alt={data.title}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 192px, 256px"
                            />
                        </div>

                        {/* Title & Stats */}
                        <div className="flex-grow text-center md:text-left">
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-orange-600 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-600/20">
                                    {data.status || 'Ongoing'}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-300 border border-white/5">
                                    {data.type || 'TV Series'}
                                </span>
                            </div>

                            <h1 className="text-3xl md:text-5xl lg:text-7xl font-black tracking-tighter mb-4 leading-tight md:leading-none uppercase break-words">
                                {data.title}
                            </h1>

                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 md:gap-6 text-sm font-bold text-zinc-400">
                                <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/5">
                                    <span className="text-orange-500 text-lg">⭐</span>
                                    <span className="text-white text-lg">{data.score || 'N/A'}</span>
                                </div>
                                <div className="hidden md:block h-4 w-[1px] bg-zinc-800" />
                                <span className="bg-zinc-900/50 px-3 py-1.5 rounded-xl border border-white/5">{data.studio || 'Unknown'}</span>
                                <div className="hidden md:block h-4 w-[1px] bg-zinc-800" />
                                <span className="bg-zinc-900/50 px-3 py-1.5 rounded-xl border border-white/5">{data.release_date || data.season}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SYNOPSIS & INFO SECTION */}
            <section className="px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
                <div className="lg:col-span-8">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-orange-600" /> Sinopsis
                    </h2>
                    <div className="bg-zinc-900/40 border border-zinc-800/50 p-6 md:p-8 rounded-3xl backdrop-blur-sm">
                        <p className="text-zinc-400 leading-relaxed text-sm md:text-base italic">
                            "{data.synopsis || 'Belum ada sinopsis untuk anime ini.'}"
                        </p>
                    </div>

                    <AnimeActionDetails data={data} />
                </div>

                {/* 4. SIDEBAR INFO */}
                <div className="lg:col-span-4">
                    <div className="bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 sticky top-24">
                        <h3 className="text-lg font-black uppercase mb-6 text-white tracking-tighter">Information</h3>
                        <div className="space-y-4">
                            <InfoRow label="Judul Jepang" value={data.japanese} />
                            <InfoRow label="Total Eps" value={data.total_episode} />
                            <InfoRow label="Durasi" value={data.duration} />
                            <InfoRow label="Status" value={data.status} />
                        </div>

                        <div className="mt-8">
                            <p className="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-3">Genres</p>
                            <div className="flex flex-wrap gap-2">
                                {data.genres?.map((g: any) => (
                                    <Link
                                        key={g.endpoint}
                                        href={`/genres/${g.endpoint}`}
                                        className="px-3 py-1 bg-zinc-800 hover:bg-orange-600 text-zinc-300 hover:text-white text-[10px] font-bold rounded-lg transition-colors border border-zinc-700"
                                    >
                                        {g.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}

// Sub-component sederhana untuk row info
function InfoRow({ label, value }: { label: string; value: string }) {
    return (
        <div className="flex flex-col border-b border-zinc-800 pb-3">
            <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{label}</span>
            <span className="text-sm font-bold text-zinc-200 mt-1">{value || 'N/A'}</span>
        </div>
    )
}