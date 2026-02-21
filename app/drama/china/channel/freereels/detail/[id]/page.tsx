import { Metadata } from "next"
import DramaHero from "@/components/drama/dramabox/DramaHero"
import SchemaMarkup from "@/components/SchemaMarkup"
import { getFreereelsDetail, searchFreereels } from "@/libs/drama/Freereels/freereels"
import FreereelsPlayerClient from "@/components/drama/freereels/FreereelsPlayerClient"
import NetshortRelatedDramas from "@/components/drama/netshort/NetshortRelatedDramas" // Kita pake component card yang sama biar konsisten

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params
    const res = await getFreereelsDetail(id)
    if (!res) return { title: "Drama Not Found" }

    const { drama } = res
    return {
        title: `Nonton ${drama.title} Sub Indo HD - Tamanto`,
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

    // Fetch Detail & Search Related Dramas secara paralel
    const res = await getFreereelsDetail(id)

    if (!res) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white font-black italic uppercase text-zinc-300 text-4xl">
                Drama Tidak Ditemukan
            </div>
        )
    }

    // Ambil keyword dinamis buat pencarian drama serupa
    const searchKeyword = res.drama.tags?.[0] || res.drama.title.split(' ')[0] || "drama"
    const relatedDramas = await searchFreereels(searchKeyword)
    console.log(relatedDramas)
    const activeEpisodeIndex = epQuery
        ? res.episodes.findIndex((e: any) => e.index === parseInt(epQuery))
        : 0

    const safeIndex = activeEpisodeIndex === -1 ? 0 : activeEpisodeIndex

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <SchemaMarkup data={res.drama} type="TVSeries" />
            <DramaHero activeChannel="freereels" />

            <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 -mt-8 md:-mt-12 relative z-30 space-y-12">
                <FreereelsPlayerClient
                    drama={res.drama}
                    episodes={res.episodes}
                    initialEpIndex={safeIndex}
                />

                {/* Seksi Rekomendasi Dinamis */}
                <div className="pt-10 border-t border-zinc-200/50">
                    <NetshortRelatedDramas
                        currentId={id}
                        dramas={relatedDramas.map((d: any) => ({
                            shortPlayId: d.bookId || d.id, // Sesuaikan mapping key-nya
                            shortPlayName: d.bookName || d.title,
                            shortPlayCover: d.coverWap || d.cover,
                            formatHeatScore: d.hotScore || "HOT"
                        }))}
                    />
                </div>
            </main>
        </div>
    )
}