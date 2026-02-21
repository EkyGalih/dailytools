import { Metadata } from "next"
import DramaHero from "@/components/drama/dramabox/DramaHero"
import FlickreelsPlayerClient from "@/components/drama/flickreels/FlickreelsPlayerClient"
import { getFlickreelsDetail, searchFlickreels } from "@/libs/drama/flickreels/flickreels"
import SchemaMarkup from "@/components/SchemaMarkup"
import FlickreelsRelatedDramas from "@/components/drama/flickreels/FlickreelsRelatedDramas"

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

    const res = await getFlickreelsDetail(id)

    if (!res?.drama) return <div>Not Found</div>

    // Ambil data pencarian untuk rekomendasi
    const keyword = res.drama.tags?.[0] || res.drama.title.split(' ')[0] || "drama"
    const relatedData = await searchFlickreels(keyword)

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <SchemaMarkup data={res.drama} type="TVSeries" />
            <DramaHero activeChannel="flickreels" />

            <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 -mt-8 md:-mt-12 relative z-30 space-y-8">
                <FlickreelsPlayerClient
                    drama={res.drama}
                    episodes={res.episodes}
                    initialEpIndex={0}
                />

                {/* PAKAI COMPONENT KHUSUS FLICKREELS */}
                <FlickreelsRelatedDramas
                    currentId={id}
                    dramas={relatedData}
                />
            </main>
        </div>
    )
}