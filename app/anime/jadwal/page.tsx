import ScheduleClient from "@/components/anime/ScheduleClient";
import { getAnimeSchedule } from "@/libs/anime/anime";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jadwal Rilis Anime Sub Indo Terupdate Hari Ini | Tamanto",
    description: "Cek jadwal rilis harian anime subtitle Indonesia terbaru. Pantau waktu tayang episode ongoing favoritmu agar tidak ketinggalan update hanya di Tamanto.",
    keywords: [
        'Jadwal Anime Hari Ini', 'Update Anime Ongoing', 'Jadwal Rilis Anime Sub Indo',
        'Kapan Anime Rilis', 'Tamanto Schedule', 'Streaming Anime Terupdate'
    ],
    alternates: {
        canonical: 'https://tamanto.web.id/anime/schedule',
    },
    openGraph: {
        title: 'Jadwal Tayang Anime Ongoing - Tamanto',
        description: 'Pantau terus hari rilis anime favoritmu setiap minggunya. Update akurat dan cepat untuk para pecinta anime.',
        url: 'https://tamanto.web.id/anime/schedule',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-schedule.jpg', // Opsional: Berikan image bertema kalender atau jadwal rilis
                width: 1200,
                height: 630,
                alt: 'Jadwal Rilis Anime Tamanto',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Jangan Ketinggalan Episode Terbaru Anime Favoritmu!',
        description: 'Cek jadwal tayang anime ongoing harian di Tamanto.',
    },
};

export default async function SchedulePage() {
    const data = await getAnimeSchedule();

    if (!data || !data.data) {
        return <div className="text-white text-center py-20 font-black">GAGAL MEMUAT JADWAL...</div>;
    }

    return (
        <main className="min-h-screen bg-[#09090b] text-zinc-100 pb-20">
            {/* HERO SECTION */}
            <section className="relative pt-24 pb-12 px-6 lg:px-20 overflow-hidden border-b border-zinc-800/50">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />

                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-600/10 border border-purple-600/20 text-purple-400 text-[10px] font-black uppercase tracking-widest mb-6">
                        <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
                        Weekly Update
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase leading-none italic italic-bold">
                        Jadwal <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">Rilis</span>
                    </h1>
                    <p className="text-zinc-500 mt-6 text-sm md:text-base font-medium">
                        Pantau terus hari rilis anime favoritmu agar tidak ketinggalan episode terbaru.
                    </p>
                </div>
            </section>

            {/* INTERACTIVE CONTENT (Client Side) */}
            <ScheduleClient schedule={data.data.schedule} />
        </main>
    );
}