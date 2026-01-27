import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getDramaByCategory, getDramaDetail, getDramaEpisodes } from '@/libs/drama/dramabox/dramabox'
import VideoPlayer from '@/components/drama/dramabox/VideoPlayer'
import DramaBookList from '@/components/drama/dramabox/RelatedVideo'
import AffiliateProductCard from '@/components/drama/ads/AffiliateProductCard'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'
import AffiliatePopup from '@/components/drama/ads/AffiliatePopup'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'

export const dynamic = 'force-dynamic'

function pickVideoUrl(ep: any) {
    const cdn = ep.cdnList?.find((c: any) => c.isDefault) || ep.cdnList?.[0]
    const video =
        cdn?.videoPathList?.find((v: any) => v.isDefault) ||
        cdn?.videoPathList?.[0]
    return video?.videoPath || ''
}

export default async function DramaWatchPage({
    params,
    searchParams,
}: {
    params: Promise<{ id: string }>
    searchParams: Promise<{ ep?: string; mode?: string }>
}) {
    const { id } = await params
    const { ep, mode } = await searchParams

    const episodeIndex = Math.max(Number(ep ?? 1) - 1, 0)
    const isVertical = mode === 'vertical'

    const [detail, episodes] = await Promise.all([
        getDramaDetail(id),
        getDramaEpisodes(id),
    ])

    if (!detail || episodes.length === 0) notFound()

    const current = episodes[episodeIndex]
    if (!current) notFound()

    const videoUrl = pickVideoUrl(current)

    const baseUrl = `/drama/china/channel/dramabox/watch/${id}`

    const nextUrl =
        episodeIndex + 1 < episodes.length
            ? `${baseUrl}?ep=${episodeIndex + 2}${isVertical ? '&mode=vertical' : ''
            }`
            : undefined

    const prevUrl =
        episodeIndex > 0
            ? `${baseUrl}?ep=${episodeIndex}${isVertical ? '&mode=vertical' : ''
            }`
            : undefined

    const toggleModeUrl = isVertical
        ? `${baseUrl}?ep=${episodeIndex + 1}`
        : `${baseUrl}?ep=${episodeIndex + 1}&mode=vertical`

    const related = await getDramaByCategory('trending')
    const products = getAffiliateProducts(detail.tags)
    const popupProduct = getAffiliatePopup()

    return (
        <article className="space-y-6">
            {popupProduct && (
                <AffiliatePopup
                    product={popupProduct}
                    episode={episodeIndex + 1}
                />
            )}
            {/* HEADER */}
            <header className="flex items-start justify-between gap-4">
                {/* LEFT */}
                <div className="space-y-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500">
                        Drama China
                    </p>

                    <h1 className="text-xl md:text-2xl font-bold leading-tight">
                        {detail.bookName}
                    </h1>

                    <p className="text-sm text-gray-600">
                        Episode {episodeIndex + 1}
                        {current.chapterName && ` • ${current.chapterName}`}
                        {current.chargeChapter && (
                            <span className="ml-2 rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-800">
                                Premium
                            </span>
                        )}
                    </p>
                </div>

                {/* RIGHT: BACK BUTTON */}
                <Link
                    href={`/drama/china/channel/dramabox/detail/${detail.bookId}`}
                    aria-label="Kembali ke detail drama"
                    className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition"
                >
                    <span className="text-sm">←</span>
                    <span className="hidden sm:inline">Kembali</span>
                </Link>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* LEFT: PLAYER */}
                <div className="md:col-span-2 space-y-4">
                    {/* PLAYER */}
                    <section
                        className={`mx-auto rounded-2xl overflow-hidden bg-black shadow-lg ${isVertical
                            ? 'max-w-[420px] aspect-[9/16]'
                            : 'w-full aspect-video'
                            }`}
                    >
                        {videoUrl ? (
                            <VideoPlayer
                                src={videoUrl}
                                nextUrl={nextUrl}
                                bookId={id}
                                episode={episodeIndex + 1}
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-white">
                                Video tidak tersedia
                            </div>
                        )}
                    </section>

                    {/* MODE TOGGLE */}
                    <div className="flex justify-end">
                        <Link
                            href={toggleModeUrl}
                            className="inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs text-gray-600 hover:bg-gray-50"
                        >
                            {isVertical ? '🖥️ Horizontal' : '📱 Vertikal'}
                        </Link>
                    </div>

                    {/* NAV */}
                    <nav className="flex gap-4">
                        <Link
                            href={prevUrl || '#'}
                            className={`flex-1 text-center text-sm px-4 py-2 rounded-full border ${prevUrl
                                ? 'hover:bg-gray-50'
                                : 'pointer-events-none opacity-40'
                                }`}
                        >
                            ← Episode Sebelumnya
                        </Link>

                        <Link
                            href={nextUrl || '#'}
                            className={`flex-1 text-center text-sm px-4 py-2 rounded-full border ${nextUrl
                                ? 'bg-black text-white hover:bg-gray-900'
                                : 'pointer-events-none opacity-40'
                                }`}
                        >
                            Episode Selanjutnya →
                        </Link>
                    </nav>

                    {/* EPISODE LIST */}
                    <section className="space-y-3">
                        <h2 className="text-lg font-semibold">Daftar Episode</h2>

                        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            {episodes.map((epItem: any, i: number) => {
                                const isActive = i === episodeIndex
                                const isLocked = epItem.chargeChapter

                                return (
                                    <Link
                                        key={epItem.chapterId}
                                        href={`${baseUrl}?ep=${i + 1}${isVertical ? '&mode=vertical' : ''
                                            }`}
                                        aria-label={`Tonton episode ${i + 1}`}
                                        className={`relative text-xs text-center rounded-lg px-2 py-1.5 border transition ${isActive
                                            ? 'bg-black text-white border-black'
                                            : isLocked
                                                ? 'bg-gray-100 text-gray-400'
                                                : 'hover:bg-gray-50'
                                            }`}
                                    >
                                        Ep {i + 1}
                                        {isLocked && (
                                            <span className="absolute -top-1 -right-1 text-[10px]">
                                                🔒
                                            </span>
                                        )}
                                    </Link>
                                )
                            })}
                        </div>
                        <section className="mt-8 space-y-3">
                            <h3 className="text-sm font-semibold">
                                Rekomendasi yang Cocok Buat Kamu 🎁
                            </h3>

                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                {products.map((p) => (
                                    <AffiliateProductCard key={p.link} product={p} />
                                ))}
                            </div>
                        </section>
                    </section>
                </div>
                <aside className="space-y-3">
                    <h2 className="text-xl font-bold">Drama Terpopuler</h2>
                    <DramaBookList items={related.slice(0, 6)} />
                </aside>
            </div>
        </article>
    )
}