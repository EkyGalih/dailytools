import AnimeActionDetails from "@/components/anime/AnimeActionDetails";
import { getAnimeAnimeDetail } from "@/libs/anime/anime";
import Image from "next/image";
import Link from "next/link";

export default async function AnimeDetailPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const res = await getAnimeAnimeDetail(slug);
    const data = res?.data;

    console.log(res)

    if (!data) return <div className="text-white text-center py-20 font-black">ANIME TIDAK DITEMUKAN</div>;

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20 overflow-x-hidden">

            {/* 1. HERO BACKDROP SECTION */}
            <section className="relative h-[50vh] md:h-[70vh] w-full">
                {/* Image Backdrop (Blurred) */}
                <div className="absolute inset-0 z-0">
                    <Image
                        src={data.thumbnail}
                        alt={data.title}
                        fill
                        className="object-cover opacity-30 blur-xl scale-110"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-[#09090b]/60 to-transparent" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 h-full flex items-end px-6 lg:px-20 pb-10">
                    <div className="flex flex-col md:flex-row gap-8 items-center md:items-end w-full">

                        {/* Poster Utama */}
                        <div className="relative w-48 md:w-64 aspect-[3/4] shrink-0 rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] border border-white/10">
                            <Image src={data.thumbnail} alt={data.title} fill className="object-cover" />
                        </div>

                        {/* Title & Stats */}
                        <div className="flex-grow text-center md:text-left">
                            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-4">
                                <span className="px-3 py-1 rounded-full bg-orange-600 text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-orange-600/20">
                                    {data.status || 'Ongoing'}
                                </span>
                                <span className="px-3 py-1 rounded-full bg-zinc-800 text-[10px] font-black uppercase tracking-widest text-zinc-300">
                                    {data.type || 'TV Series'}
                                </span>
                            </div>
                            <h1 className="text-3xl md:text-5xl lg:text-6xl font-black tracking-tighter mb-4 leading-none uppercase">
                                {data.title}
                            </h1>
                            <div className="flex items-center justify-center md:justify-start gap-6 text-sm font-bold text-zinc-400">
                                <div className="flex items-center gap-2">
                                    <span className="text-orange-500 text-xl">⭐</span>
                                    <span className="text-white text-lg">{data.score || 'N/A'}</span>
                                </div>
                                <div className="h-4 w-[1px] bg-zinc-800" />
                                <span>{data.studio || 'Unknown'}</span>
                                <div className="h-4 w-[1px] bg-zinc-800" />
                                <span>{data.release_date || data.season}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 2. SYNOPSIS & INFO SECTION */}
            <section className="px-6 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12 mt-10">
                <div className="lg:col-span-8">
                    <h2 className="text-xl font-black uppercase tracking-widest mb-6 flex items-center gap-3">
                        <span className="w-8 h-[2px] bg-orange-600" /> Synopsis
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
                            <InfoRow label="Japanese" value={data.japanese_title} />
                            <InfoRow label="Total Eps" value={data.total_episode} />
                            <InfoRow label="Duration" value={data.duration} />
                            <InfoRow label="Season" value={data.season} />
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