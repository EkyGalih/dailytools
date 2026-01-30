// app/drama/china/channel/dramabox/watch/[id]/page.tsx

import { notFound } from 'next/navigation'
import { getDramaDetail, getDramaEpisodes, getDramaByCategory } from '@/libs/drama/dramabox/dramabox'
import DramaHero from '@/components/drama/dramabox/DramaHero'
import DramaBookGrid from '@/components/drama/dramabox/DramaBoxGrid'
import DramaboxPlayer from '@/components/drama/dramabox/VideoPlayer'

export default async function WatchPage({
    params,
    searchParams
}: {
    params: Promise<{ id: string }>,
    searchParams: Promise<{ ep?: string }>
}) {
    const { id } = await params
    const { ep } = await searchParams
    const initialIndex = Math.max(Number(ep ?? 1) - 1, 0)

    const [detail, episodes, related] = await Promise.all([
        getDramaDetail(id),
        getDramaEpisodes(id),
        getDramaByCategory('trending')
    ])

    if (!detail || episodes.length === 0) notFound()

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <DramaHero activeChannel="dramabox" />

            <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-10 md:-mt-32 relative z-20">
                {/* CLIENT PLAYER */}
                <DramaboxPlayer
                    detail={detail}
                    episodes={episodes}
                    initialIndex={initialIndex}
                />

                {/* RELATED SECTION */}
                <section className="mt-20 space-y-10">
                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 px-4">
                        <div className="space-y-2">
                            <h2 className="text-3xl font-black tracking-tighter text-zinc-900 uppercase italic">
                                Drama <span className="text-purple-600">Terpopuler</span>
                            </h2>
                            <p className="text-zinc-500 font-medium text-sm">Rekomendasi trending untuk Anda</p>
                        </div>
                    </div>
                    <div className="px-4">
                        <DramaBookGrid items={related.slice(0, 10)} />
                    </div>
                </section>
            </main>
        </div>
    )
}