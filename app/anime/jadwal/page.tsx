import ScheduleClient from "@/components/anime/ScheduleClient";
import { getAnimeSchedule } from "@/libs/anime/anime";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Jadwal Rilis Anime Terupdate – MyTools Anime",
    description: "Cek jadwal rilis anime subtitle Indonesia terbaru setiap harinya. Jangan lewatkan update episode terbaru anime favoritmu.",
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