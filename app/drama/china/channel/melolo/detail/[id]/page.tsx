
import { getMeloloDetail } from "@/libs/drama/melolo/melolo"
import { Metadata } from "next"
import DramaHero from "@/components/drama/dramabox/DramaHero"
import MeloloPlayerClient from "@/components/drama/melolo/MeloloPlayerClient"
import SchemaMarkup from "@/components/SchemaMarkup"

// ===============================
// ✅ Metadata SEO
// ===============================
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}): Promise<Metadata> {
    const { id } = await params
    const res = await getMeloloDetail(id)

    const videoData = res?.data?.video_data
    const site = 'https://tamanto.web.id'

    const dramaTitle = videoData?.series_title || "Drama China"
    const dramaDescription = videoData?.series_intro?.slice(0, 160) || `Nonton ${dramaTitle} subtitle Indonesia dengan kualitas terbaik di Tamanto.`

    return {
        // Format: Nonton [Judul] Sub Indo HD | Melolo Tamanto
        title: `Nonton ${dramaTitle} Sub Indo HD`,
        description: dramaDescription,

        alternates: {
            canonical: `${site}/drama/china/channel/melolo/${id}`,
        },

        openGraph: {
            title: `${dramaTitle} - Melolo Drama Collection`,
            description: dramaDescription,
            url: `${site}/drama/china/channel/melolo/${id}`,
            siteName: 'Tamanto',
            type: 'video.tv_show',
            images: [
                {
                    url: videoData?.series_cover || `${site}/og-fallback.jpg`,
                    width: 800,
                    height: 1200,
                    alt: `Poster ${dramaTitle} - Tamanto`,
                }
            ],
            locale: 'id_ID',
        },

        twitter: {
            card: 'summary_large_image',
            title: `${dramaTitle} | Melolo Sub Indo`,
            description: dramaDescription,
            images: [videoData?.series_cover || `${site}/og-fallback.jpg`],
        },

        // SEO Deep Indexing
        robots: {
            index: true,
            follow: true,
            'max-image-preview': 'large',
            'max-snippet': -1,
        }
    }
}

// ===============================
// ✅ Detail Page
// ===============================
export default async function MeloloDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ ep?: string }>
}) {
    const { id } = await params
    const sp = await searchParams
    const ep = sp?.ep

    // ===============================
    // ✅ Fetch Detail JSON
    // ===============================
    const res = await getMeloloDetail(id)

    const videoData = res?.data?.video_data
    const episodes = videoData?.video_list || []

    // ===============================
    // ❌ Kalau tidak ada data
    // ===============================
    if (!videoData || episodes.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#fafafa] text-zinc-500 font-black uppercase tracking-widest">
                Drama Not Found
            </div>
        )
    }

    // ===============================
    // ✅ Tentukan Episode Aktif
    // ===============================
    const activeEpisodeIndex = ep
        ? episodes.findIndex(
            (e: any) => e.vid_index === parseInt(ep)
        )
        : 0

    const safeIndex = activeEpisodeIndex === -1 ? 0 : activeEpisodeIndex

    // ===============================
    // ✅ Kirim data ke Player
    // ===============================
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* ✅ PASANG SCHEMA DI SINI */}
            <SchemaMarkup data={videoData} type="TVSeries" />
            <DramaHero activeChannel="melolo" />

            <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 -mt-10 md:-mt-32 relative z-20">
                <MeloloPlayerClient
                    drama={videoData}
                    initialEpIndex={safeIndex}
                />
            </main>
        </div>
    )
}