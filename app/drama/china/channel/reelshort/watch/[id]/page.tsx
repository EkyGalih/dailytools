import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
    getReelShortEpisode,
    getReelShortDetail,
    getReelShortHomepage,
} from '@/libs/drama/reelshort/reelshort'
import DramaShareIcons from '@/components/drama/dramabox/DramaShareIcon'
import ReelShortPlayer from '@/components/drama/reelshort/ReelShortPlayer'
import AffiliateProductCard from '@/components/drama/ads/AffiliateProductCard'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'
import AffiliatePopup from '@/components/drama/ads/AffiliatePopup'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'
import ReelShortListItem from '@/components/drama/reelshort/ReelShortListItem'
import DramaHero from '@/components/drama/dramabox/DramaHero'

export const dynamic = 'force-dynamic'

export default async function ReelShortWatchPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ ep?: string }>
}) {
    const { id } = await params
    const { ep } = await searchParams
    const products = getAffiliateProducts()

    if (!id) notFound()

    const episodeNumber = Math.max(Number(ep ?? 1), 1)

    const [episode, detail, homepage] = await Promise.all([
        getReelShortEpisode(id, episodeNumber),
        getReelShortDetail(id),
        getReelShortHomepage(),
    ])

    if (!episode || !detail?.success) notFound()
    const baseUrl = `/drama/china/channel/reelshort/watch/${id}`

    const nextUrl =
        episodeNumber < detail.totalEpisodes
            ? `${baseUrl}?ep=${episodeNumber + 1}`
            : undefined

    const nextEp =
        episodeNumber < detail.totalEpisodes ? episodeNumber + 1 : null
    const prevEp =
        episodeNumber > 1 ? episodeNumber - 1 : null

    const related =
        homepage?.data?.lists?.[0]?.banners
            ?.filter((b: any) => b.jump_param.book_id !== id)
            ?.slice(0, 8) ?? []

    const site = process.env.NEXT_PUBLIC_SITE_URL!
    const popupProduct = getAffiliatePopup()


    return (
        <article className="space-y-10">
            {popupProduct && (
                <AffiliatePopup
                    product={popupProduct}
                    episode={episodeNumber + 1}
                />
            )}

            <DramaHero />

            {/* HEADER */}
            <header className="flex items-start justify-between gap-4 px-8">
                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                        ReelShort
                    </p>
                    <h1 className="text-xl md:text-2xl font-bold">
                        {detail.title}
                    </h1>
                    <p className="text-sm text-gray-600">
                        Episode {episodeNumber}
                    </p>
                </div>

                <Link
                    href={`/drama/china/channel/reelshort/detail/${id}`}
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs"
                >
                    ← Kembali
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8">
                {/* LEFT: PLAYER */}
                <div className="md:col-span-2 space-y-4">
                    <ReelShortPlayer
                        episode={episode}
                        nextUrl={nextUrl}
                    />

                    {/* NAV + SHARE */}
                    <nav className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mt-4">
                        <div className="flex flex-1 gap-3">
                            <Link
                                href={prevEp ? `${baseUrl}?ep=${prevEp}` : '#'}
                                className={`flex-1 text-center rounded-full border px-4 py-2 text-sm ${
                                    prevEp ? 'hover:bg-gray-50' : 'opacity-40 pointer-events-none'
                                }`}
                            >
                                ← Sebelumnya
                            </Link>

                            <Link
                                href={nextEp ? `${baseUrl}?ep=${nextEp}` : '#'}
                                className={`flex-1 text-center rounded-full px-4 py-2 text-sm ${
                                    nextEp
                                        ? 'bg-black text-white hover:bg-gray-900'
                                        : 'opacity-40 pointer-events-none border'
                                }`}
                            >
                                Selanjutnya →
                            </Link>
                        </div>

                        <DramaShareIcons
                            title={`${detail.title} - Episode ${episodeNumber}`}
                            url={`${site}/drama/china/channel/reelshort/watch/${id}?ep=${episodeNumber}`}
                        />
                    </nav>

                    {/* RELATED */}
                    {related.length > 0 && (
                        <aside className="space-y-3">
                            <h2 className="text-xl font-bold">🔥 Drama Pendek Lainnya</h2>
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                                {related.map((b: any) => (
                                    <ReelShortListItem
                                        key={b.b_id}
                                        item={{
                                            bookId: b.jump_param.book_id,
                                            title: b.jump_param.book_title,
                                            cover: b.pic,
                                            totalEpisodes: b.jump_param.chapter_count,
                                            themes: b.jump_param.book_theme,
                                            hot: b.jump_param.collect_count,
                                        }}
                                    />
                                ))}
                            </div>
                        </aside>
                    )}
                </div>

                {/* RIGHT: EPISODE LIST + ADS */}
                <section className="space-y-6">
                    <div>
                        <h2 className="text-lg font-semibold">Daftar Episode</h2>
                        <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mt-3">
                            {Array.from({ length: detail.totalEpisodes }).map((_, i) => {
                                const epNum = i + 1
                                const isActive = epNum === episodeNumber

                                return (
                                    <Link
                                        key={epNum}
                                        href={`?ep=${epNum}`}
                                        className={`text-xs text-center rounded-lg px-2 py-1.5 border transition ${
                                            isActive
                                                ? 'bg-black text-white border-black'
                                                : 'hover:bg-gray-50'
                                        }`}
                                    >
                                        Ep {epNum}
                                    </Link>
                                )
                            })}
                        </div>
                    </div>

                    <aside className="space-y-3">
                        <h3 className="text-sm font-semibold">
                            Rekomendasi Produk 🎁
                        </h3>
                        <div className="grid grid-cols-3 gap-3">
                            {products.map((p) => (
                                <AffiliateProductCard key={p.link} product={p} />
                            ))}
                        </div>
                    </aside>
                </section>
            </div>
        </article>
    )
}