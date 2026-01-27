import Link from 'next/link'
import Image from 'next/image'
import {
    DRAMA_CHANNELS,
    getChannel,
    DramaChannelSlug,
} from '@/libs/drama/channel'
import DramaShareIcons from '../dramabox/DramaShareIcon'

export default function DramaHero({
    activeChannel,
}: {
    activeChannel?: DramaChannelSlug
}) {
    const channel = getChannel(activeChannel)
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    return (
        <>
            <header className="rounded-3xl bg-gradient-to-br from-fuchsia-700 via-purple-700 to-indigo-800 text-white p-8 md:p-10">
                <div className="max-w-3xl">
                    {/* SEO H1 */}
                    <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold tracking-tight">
                        {/* ICON */}
                        <span className="relative h-8 w-8 md:h-9 md:w-9 flex-shrink-0">
                            <Image
                                src={channel.icon}
                                alt=""
                                aria-hidden
                                fill
                                className="object-contain"
                                priority
                            />
                        </span>

                        {/* TITLE TEXT */}
                        <span>
                            {channel.name} – Drama China Viral & Trending
                        </span>
                    </h1>

                    <p className="mt-3 text-white/80 leading-relaxed">
                        {channel.description}{' '}
                        Update rutin, episode lengkap, dan pilihan drama populer hari ini.
                    </p>

                    {/* CHANNEL NAV */}
                    <div className="mt-6 flex flex-wrap gap-3">
                        {DRAMA_CHANNELS.map((c) => {
                            const isActive = c.slug === channel.slug

                            return (
                                <Link
                                    key={c.slug}
                                    href={`/drama/china/channel/${c.slug}`}
                                    aria-current={isActive ? 'page' : undefined}
                                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm border transition
                  ${isActive
                                            ? 'bg-white text-black border-white'
                                            : 'bg-white/10 hover:bg-white/20 border-white/20'
                                        }`}
                                >
                                    {/* ICON IMAGE */}
                                    <span className="relative h-4 w-4 flex-shrink-0">
                                        <Image
                                            src={c.icon}
                                            alt={`${c.name} logo`}
                                            fill
                                            className={`object-contain ${isActive ? '' : 'opacity-80'
                                                }`}
                                        />
                                    </span>

                                    <span className="font-medium">{c.name}</span>
                                </Link>
                            )
                        })}
                    </div>
                </div>
                <div className="max-w-6xl mx-auto px-4 flex justify-end">
                    <DramaShareIcons
                        title="Drama China Viral & Trending"
                        url={`${site}/drama/china/channel/dramabox`}
                        tags={['DramaChina', 'Dracin', 'DramaViral']}
                    />
                </div>
            </header>
        </>
    )
}