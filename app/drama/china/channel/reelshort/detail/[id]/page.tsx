import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getReelShortDetail, getReelShortHomepage } from '@/libs/drama/reelshort/reelshort'
import DramaHero from '@/components/drama/reelshort/DramaHero'
import ReelShortCard from '@/components/drama/reelshort/ReelShortCard'
import UnifiedReelshortView from '@/components/drama/reelshort/UnifiedReelshortView'

export const dynamic = 'force-dynamic'

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
    const { id } = await params
    const data = await getReelShortDetail(id)
    if (!data?.success) return {}
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    return {
        title: `Nonton ${data.title} Sub Indo – Drama Pendek ReelShort | My Tools`,
        description: data.description?.slice(0, 160),
        openGraph: {
            title: data.title,
            images: data.cover ? [{ url: data.cover }] : [],
            url: `${site}/drama/china/channel/reelshort/${id}`,
            type: 'video.tv_show',
        },
    }
}

export default async function ReelShortUnifiedPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const [detail, homepage] = await Promise.all([
        getReelShortDetail(id),
        getReelShortHomepage(),
    ])

    if (!detail?.success) notFound()

    // Ambil related dari homepage
    const related = homepage?.data?.lists
        ?.flatMap((block: any) => Array.isArray(block.banners) ? block.banners : [])
        ?.filter((b: any) => b?.jump_param?.book_id && b.jump_param.book_id !== id)
        ?.slice(0, 10) ?? []

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <DramaHero activeChannel="reelshort" />

            <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-20 md:-mt-32 relative z-20">
                <UnifiedReelshortView detail={detail} id={id} />

                {/* RELATED SECTION */}
                <section className="mt-20 space-y-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase italic">
                                Rekomendasi <span className="text-purple-600">Lainnya</span>
                            </h2>
                            <p className="text-zinc-500 font-medium text-sm font-bold">Drama pendek pilihan yang sedang populer</p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 px-4">
                        {related.map((b: any) => (
                            <ReelShortCard
                                key={b.b_id}
                                item={{
                                    bookId: b.jump_param.book_id,
                                    title: b.jump_param.book_title,
                                    cover: b.pic,
                                    totalEpisodes: b.jump_param.chapter_count,
                                }}
                            />
                        ))}
                    </div>
                </section>
            </main>
        </div>
    )
}