import { Metadata } from "next"
import DramaHero from "@/components/drama/dramabox/DramaHero"
import SchemaMarkup from "@/components/SchemaMarkup"
import { getNetshortDetail, getNetshortList } from "@/libs/drama/netshort/netshort"
import NetshortPlayerClient from "@/components/drama/netshort/NetshortPlayerClient"
import NetshortRelatedDramas from "@/components/drama/netshort/NetshortRelatedDramas"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const res = await getNetshortDetail(id)
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

    // 1. Ambil detail drama utama dulu
    const res = await getNetshortDetail(id)

    if (!res) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white font-black italic uppercase tracking-tighter text-zinc-300 text-4xl">
                Drama Tidak Ditemukan
            </div>
        )
    }

    // 2. Ambil keyword dari Tag pertama atau potongan judul untuk mencari drama serupa
    // Misal: Drama "Cinta Pewaris", kita ambil kata "Pewaris" agar hasil search nyambung
    const relatedKeyword = res.drama.tags[0] || res.drama.title.split(' ')[0] || "drama"

    // 3. Cari drama serupa berdasarkan keyword tadi
    const relatedRes = await getNetshortList(relatedKeyword)

    const activeEpisodeIndex = epQuery
        ? res.episodes.findIndex((e: any) => e.index === parseInt(epQuery))
        : 0
    const safeIndex = activeEpisodeIndex === -1 ? 0 : activeEpisodeIndex

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <SchemaMarkup data={res.drama} type="TVSeries" />
            <DramaHero activeChannel="netshort" />

            <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 -mt-6 md:-mt-12 relative z-30 space-y-6">
                <NetshortPlayerClient
                    drama={res.drama}
                    episodes={res.episodes}
                    initialEpIndex={safeIndex}
                />

                {/* Sekarang datanya dinamis sesuai tema drama yang ditonton */}
                <NetshortRelatedDramas
                    currentId={id}
                    dramas={relatedRes || []}
                />
            </main>
        </div>
    )
}