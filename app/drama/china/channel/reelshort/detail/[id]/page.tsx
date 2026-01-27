import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'

import {
    getReelShortDetail,
    getReelShortHomepage,
} from '@/libs/drama/reelshort/reelshort'

import ReelShortCard from '@/components/drama/reelshort/ReelShortCard'
import DramaShareIcons from '@/components/drama/dramabox/DramaShareIcon'
import AffiliateChannelPopup from '@/components/drama/ads/AffiliateChannelPopup'
import AffiliateMiniPopup from '@/components/drama/ads/AffiliateMiniPopup'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'
import DramaHero from '@/components/drama/reelshort/DramaHero'

/* =========================
   SEO METADATA
========================= */
export async function generateMetadata({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params   // ✅ WAJIB await

    if (!id) return {}

    const data = await getReelShortDetail(id)
    if (!data?.success) return {}

    return {
        title: `${data.title} – ReelShort`,
        description: data.description,
        openGraph: {
            title: data.title,
            description: data.description,
            images: data.cover ? [data.cover] : [],
            type: 'video.tv_show',
        },
    }
}

/* =========================
   PAGE
========================= */
export default async function ReelShortDetailPage({
    params,
}: {
    params: Promise<{ id: string }>
}) {
    const { id } = await params
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    if (!id) notFound()

    /* DETAIL */
    const detail = await getReelShortDetail(id)
    if (!detail?.success) notFound()

    const {
        title,
        cover,
        description,
        totalEpisodes,
    } = detail

    /* RELATED DRAMA */
    const home = await getReelShortHomepage()

    const related =
        home?.data?.lists
            ?.flatMap((block: any) =>
                Array.isArray(block.banners) ? block.banners : []
            )
            ?.filter(
                (b: any) =>
                    b?.jump_param?.book_id &&
                    b.jump_param.book_id !== id
            )
            ?.slice(0, 10) ?? []
    const popupProduct = getAffiliatePopup()

    return (
        <article className="space-y-10">
            {popupProduct && <AffiliateChannelPopup product={popupProduct} />}
            <AffiliateMiniPopup />
            <DramaHero />
            {/* HEADER */}
            <section className="grid md:grid-cols-[240px_1fr] px-8 gap-8 items-start">
                <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-100 shadow">
                    {cover && (
                        <Image
                            src={cover}
                            alt={title}
                            fill
                            priority
                            className="object-cover"
                        />
                    )}
                </div>

                <div className="space-y-6">
                    {/* CONTENT */}
                    <p className="text-sm text-white/70">
                        ReelShort • Drama Pendek
                    </p>
                    <div>
                        <h1 className="mt-1 text-2xl md:text-3xl font-extrabold leading-tight">
                            {title}
                        </h1>

                        <p className="mt-2 text-sm text-white">
                            🎬 {totalEpisodes} Episode
                        </p>
                    </div>

                    {/* CTA + SHARE */}
                    <div className="flex flex-wrap items-center gap-4">
                        <Link
                            href={`/drama/china/channel/reelshort/watch/${id}?ep=1`}
                            className="inline-flex items-center gap-2 rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white hover:bg-red-700 transition"
                            aria-label={`Mulai menonton ${title}`}
                        >
                            ▶ Mulai Tonton
                        </Link>

                    </div>
                    <div>
                        <h2 className="text-sm font-semibold text-white">Sinopsis</h2>

                        <p
                            className="mt-2 text-sm text-gray-200 leading-relaxed"
                            itemProp="description"
                        >
                            {description}
                        </p>
                    </div>
                </div>
            </section>

            {/* RELATED */}
            {related.length > 0 && (
                <section className="space-y-4 px-8">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                        <h2 className="text-xl font-bold">Drama Pendek Lainnya</h2>

                        <Link
                            href="/drama/china/channel/reelshort"
                            className="inline-flex items-center gap-2 rounded-full 
                            bg-gradient-to-r from-indigo-600 to-purple-600
                            px-5 py-2 text-sm font-semibold text-white
                            shadow-md shadow-indigo-500/20
                            hover:from-indigo-700 hover:to-purple-700
                            hover:shadow-lg transition-all"
                        >
                            <span className="text-base">←</span>
                            Lihat Semua
                        </Link>
                    </div>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
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
            )}
        </article>
    )
}