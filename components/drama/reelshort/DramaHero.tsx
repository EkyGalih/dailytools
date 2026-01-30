import Link from 'next/link'
import Image from 'next/image'
import { DRAMA_CHANNELS, getChannel, DramaChannelSlug } from '@/libs/drama/channel'
import DramaShareIcons from '../dramabox/DramaShareIcon'

export default function DramaHero({ activeChannel }: { activeChannel?: DramaChannelSlug }) {
    const channel = getChannel(activeChannel)
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    return (
        <header className="relative overflow-hidden bg-[#050505] pt-20 pb-28 md:pt-28 md:pb-44">
            {/* Mesh Gradient Effect */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[70%] bg-indigo-900/40 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[60%] bg-purple-900/30 blur-[120px] rounded-full" />
            </div>

            <div className="relative max-w-7xl mx-auto px-6">
                <div className="flex flex-col items-start gap-6">
                    {/* Unique Badge */}
                    <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-purple-400 rounded-full backdrop-blur-md">
                        Premium Short Drama
                    </span>

                    {/* SEO Heading */}
                    <h1 className="flex flex-wrap items-center gap-4 text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none uppercase">
                        <span className="relative h-12 w-12 md:h-14 md:w-14 bg-white/10 p-2 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
                            <Image src={channel.icon} alt="" fill className="object-contain p-2" priority />
                        </span>
                        <span>
                            {channel.name} <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">– REELSHORT</span>
                        </span>
                    </h1>

                    <p className="max-w-2xl text-zinc-400 text-base md:text-lg font-medium leading-relaxed">
                        Nikmati koleksi drama pendek original dari {channel.name}.
                        Format video vertikal yang mendalam, cerita cepat, dan update episode setiap hari khusus untuk Anda.
                    </p>

                    {/* CHANNEL NAV PILLS */}
                    <div className="mt-4 flex flex-wrap gap-2">
                        {DRAMA_CHANNELS.map((c) => {
                            const isActive = c.slug === channel.slug
                            return (
                                <Link
                                    key={c.slug}
                                    href={`/drama/china/channel/${c.slug}`}
                                    className={`flex items-center gap-2.5 px-5 py-2.5 rounded-2xl text-[13px] font-black transition-all active:scale-95
                                        ${isActive
                                            ? 'bg-white text-black shadow-xl shadow-white/5'
                                            : 'bg-zinc-900/50 text-zinc-500 border border-white/5 hover:border-white/20 hover:text-white'
                                        }`}
                                >
                                    <div className="relative w-4 h-4">
                                        <Image src={c.icon} alt="" fill className="object-contain" />
                                    </div>
                                    {c.name}
                                </Link>
                            )
                        })}
                    </div>
                </div>

                {/* Desktop Share Icons */}
                <div className="absolute bottom-0 right-6 hidden md:block">
                    <DramaShareIcons
                        title={`${channel.name} - Drama Pendek Viral`}
                        url={`${site}/drama/china/channel/${channel.slug}`}
                        tags={['ReelShort', 'ShortDrama', 'DramaViral']}
                    />
                </div>
            </div>
        </header>
    )
}