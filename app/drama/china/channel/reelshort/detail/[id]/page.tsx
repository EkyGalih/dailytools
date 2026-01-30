import { notFound } from 'next/navigation'
import { Metadata } from 'next'
import { getReelShortDetail, getReelShortHomepage } from '@/libs/drama/reelshort/reelshort'
import DramaHero from '@/components/drama/reelshort/DramaHero'
import ReelShortCard from '@/components/drama/reelshort/ReelShortCard'
import UnifiedReelshortView from '@/components/drama/reelshort/UnifiedReelshortView'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'
import AffiliateShelf from '@/components/drama/ads/AffiliateShelf'

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
    const produk = getAffiliateProducts()


    const [detail, homepage] = await Promise.all([
        getReelShortDetail(id),
        getReelShortHomepage(),
    ])

    if (!detail?.success) notFound()

    const related = homepage?.data?.lists
        ?.flatMap((block: any) => Array.isArray(block.banners) ? block.banners : [])
        ?.filter((b: any) => b?.jump_param?.book_id && b.jump_param.book_id !== id)
        ?.slice(0, 10) ?? []

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <DramaHero activeChannel="reelshort" />

            {/* Overlap Card: -mt-10 di mobile, -mt-32 di desktop */}
            <main className="max-w-7xl mx-auto px-2 sm:px-4 md:px-6 -mt-10 md:-mt-32 relative z-20">
                <UnifiedReelshortView detail={detail} id={id} />

                {/* RELATED SECTION */}
                <section className="mt-12 md:mt-20 space-y-8 px-2 md:px-0">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                        <div className="space-y-1 md:space-y-2">
                            <h2 className="text-2xl md:text-3xl font-black tracking-tighter text-zinc-900 uppercase italic leading-none">
                                Rekomendasi <span className="text-purple-600">Lainnya</span>
                            </h2>
                            <p className="text-zinc-400 font-bold text-[10px] md:text-sm uppercase tracking-wide">Drama pendek pilihan yang sedang populer</p>
                        </div>
                    </div>
                    {/* Grid responsif: 2 kolom di mobile */}
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-8">
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
                    <AffiliateShelf products={produk} />
                </section>
            </main>
        </div>
    )
}