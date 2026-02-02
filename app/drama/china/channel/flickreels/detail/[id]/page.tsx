import { Metadata } from "next"
import DramaHero from "@/components/drama/dramabox/DramaHero"
import FlickreelsPlayerClient from "@/components/drama/flickreels/FlickreelsPlayerClient"
import { getFlickreelsDetail } from "@/libs/drama/flickreels/flickreels" // Pastikan library ini sudah ada

// ===============================
// ✅ Metadata SEO
// ===============================
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const res = await getFlickreelsDetail(id)
    
    const drama = res?.drama

    return {
        title: `Nonton ${drama?.title || "Drama"} Sub Indo - Melolo Premium`,
        description: drama?.description?.slice(0, 160) || "Tonton drama china viral kualitas HD",
        openGraph: {
            images: [drama?.cover || ""],
        },
    }
}

// ===============================
// ✅ Detail Page
// ===============================
export default async function FlickreelsDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ ep?: string }>
}) {
    const { id } = await params
    const sp = await searchParams
    const epQuery = sp?.ep

    // ===============================
    // ✅ Fetch Data Flickreels
    // ===============================
    const res = await getFlickreelsDetail(id)

    // Sesuai JSON Flickreels: data punya root { drama: {...}, episodes: [...] }
    const dramaData = res?.drama
    const episodes = res?.episodes || []

    // ===============================
    // ❌ Proteksi Data Kosong
    // ===============================
    if (!dramaData || episodes.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="text-center space-y-4">
                    <h2 className="text-6xl font-black text-zinc-100 uppercase italic">404</h2>
                    <p className="text-zinc-400 font-bold uppercase tracking-widest text-sm">Drama Tidak Ditemukan</p>
                </div>
            </div>
        )
    }

    // ===============================
    // ✅ Tentukan Episode Aktif
    // ===============================
    // Flickreels biasanya pakai index 0-based atau check id
    const activeEpisodeIndex = epQuery
        ? episodes.findIndex((e: any) => e.index === parseInt(epQuery))
        : 0

    const safeIndex = activeEpisodeIndex === -1 ? 0 : activeEpisodeIndex

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* Header Hero */}
            <DramaHero activeChannel="flickreels" />

            {/* Kontainer Utama */}
            <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 -mt-10 md:-mt-32 relative z-30">
                {/* Passing data ke Client Component:
                   - drama: Objek info drama (title, cover, desc)
                   - episodes: Array episode lengkap
                   - initialEpIndex: Index episode yang mau diputar
                */}
                <FlickreelsPlayerClient
                    drama={dramaData}
                    episodes={episodes}
                    initialEpIndex={safeIndex}
                />
            </main>
        </div>
    )
}