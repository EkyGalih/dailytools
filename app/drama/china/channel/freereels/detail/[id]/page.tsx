import { Metadata } from "next"
import DramaHero from "@/components/drama/dramabox/DramaHero"
import SchemaMarkup from "@/components/SchemaMarkup"
import { getFreereelsDetail } from "@/libs/drama/Freereels/freereels" // Pastikan import bener
import FreereelsPlayerClient from "@/components/drama/freereels/FreereelsPlayerClient"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const res = await getFreereelsDetail(id)
    if (!res) return { title: "Drama Not Found" }

    const { drama } = res
    const site = 'https://tamanto.web.id'

    return {
        title: `Nonton ${drama.title} Sub Indo HD`,
        description: drama.description.slice(0, 160),
        openGraph: {
            title: drama.title,
            description: drama.description,
            images: [{ url: drama.cover }],
            type: 'video.tv_show',
        }
    }
}

export default async function FreereelsDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ ep?: string }>
}) {
    const { id } = await params
    const sp = await searchParams
    const epQuery = sp?.ep

    const res = await getFreereelsDetail(id)

    if (!res) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white font-black italic uppercase tracking-tighter text-zinc-300 text-4xl">
                Drama Tidak Ditemukan
            </div>
        )
    }

    // Cari episode berdasarkan index atau default ke 0
    const activeEpisodeIndex = epQuery
        ? res.episodes.findIndex((e: any) => e.index === parseInt(epQuery))
        : 0

    const safeIndex = activeEpisodeIndex === -1 ? 0 : activeEpisodeIndex

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <SchemaMarkup data={res.drama} type="TVSeries" />
            <DramaHero activeChannel="freereels" />
            <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 -mt-10 md:-mt-32 relative z-30">
                <FreereelsPlayerClient
                    drama={res.drama}
                    episodes={res.episodes}
                    initialEpIndex={safeIndex}
                />
            </main>
        </div>
    )
}