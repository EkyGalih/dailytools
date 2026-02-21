import { Metadata } from "next"
import DramaHero from "@/components/drama/dramabox/DramaHero"
import SchemaMarkup from "@/components/SchemaMarkup"
import { getFreereelsDetail } from "@/libs/drama/Freereels/freereels" // Pastikan import bener
import FreereelsPlayerClient from "@/components/drama/freereels/FreereelsPlayerClient"
import { getNetshortDetail, getNetshortList } from "@/libs/drama/netshort/netshort"
import NetshortPlayerClient from "@/components/drama/netshort/NetshortPlayerClient"
import NetshortRelatedDramas from "@/components/drama/netshort/NetshortRelatedDramas"

export default async function NetshortsDetailPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ ep?: string }>
}) {
    const { id } = await params
    const sp = await searchParams
    const epQuery = sp?.ep

    // Fetch data secara bersamaan
    const [res, relatedRes] = await Promise.all([
        getNetshortDetail(id),
        getNetshortList({ page: 1, limit: 10 }) // Ambil list drama buat rekomendasi
    ])

    console.log(relatedRes)

    if (!res) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white font-black italic uppercase tracking-tighter text-zinc-300 text-4xl">
                Drama Tidak Ditemukan
            </div>
        )
    }

    const activeEpisodeIndex = epQuery
        ? res.episodes.findIndex((e: any) => e.index === parseInt(epQuery))
        : 0
    const safeIndex = activeEpisodeIndex === -1 ? 0 : activeEpisodeIndex

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <SchemaMarkup data={res.drama} type="TVSeries" />
            <DramaHero activeChannel="netshort" />

            {/* Ubah space-y-16 jadi space-y-8 atau space-y-10 */}
            <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 -mt-8 md:-mt-12 relative z-30 space-y-8">
                <NetshortPlayerClient
                    drama={res.drama}
                    episodes={res.episodes}
                    initialEpIndex={safeIndex}
                />

                {/* TAMPILKAN DRAMA SERUPA DI SINI */}
                <NetshortRelatedDramas
                    currentId={id}
                    dramas={relatedRes || []}
                />
            </main>
        </div>
    )
}