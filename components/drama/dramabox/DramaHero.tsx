"use client"

import Link from 'next/link'
import Image from 'next/image'
import { DRAMA_CHANNELS, getChannel, DramaChannelSlug } from '@/libs/drama/channel'
import DramaShareIcons from './DramaShareIcon'
import { Sparkles, Zap, Radio } from 'lucide-react'

export default function DramaHero({ activeChannel }: { activeChannel?: DramaChannelSlug }) {
    const channel = getChannel(activeChannel)
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    return (
        <header className="relative overflow-hidden bg-[#020202] pt-16 pb-32 md:pt-32 md:pb-48">

            {/* --- PREMIUM AMBIENCE (MESH GRADIENT) --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/20 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-pink-600/10 blur-[120px] rounded-full" />
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))] opacity-10" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex flex-col items-start gap-6 md:gap-8">

                    {/* 1. STATUS BADGE */}
                    <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl animate-in slide-in-from-left-4 duration-700">
                        <div className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                        </div>
                        <span className="text-[10px] md:text-[11px] font-black tracking-[0.2em] uppercase text-zinc-100 flex items-center gap-2">
                            <Radio size={12} className="text-indigo-400" />
                            Hiburan Premium
                        </span>
                    </div>

                    {/* 2. DYNAMIC TITLE (SEO-FRIENDLY) */}
                    <div className="space-y-4 max-w-4xl">
                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-[0.85] uppercase">
                            <span className="inline-flex items-center gap-4">
                                {channel.name}
                                <span className="relative inline-block px-4 py-1 rounded-2xl bg-gradient-to-r from-indigo-600 to-pink-500 text-white text-base md:text-2xl not-italic tracking-normal align-middle rotate-2 shadow-xl shadow-indigo-500/20">
                                    <Sparkles className="inline-block mr-2 -mt-1" size={18} fill="white" />
                                    Live
                                </span>
                            </span>
                            <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-400 to-zinc-600">
                                Trending Hub
                            </span>
                        </h1>

                        <p className="max-w-2xl text-zinc-400 text-sm md:text-xl font-medium leading-relaxed italic border-l-2 border-indigo-500/30 pl-6">
                            {channel.description}
                        </p>
                    </div>

                    {/* 3. FLOATING CHANNEL NAV */}
                    <nav className="mt-6 flex flex-wrap gap-3 p-2 rounded-3xl bg-white/[0.03] border border-white/5 backdrop-blur-md">
                        {DRAMA_CHANNELS.map((c) => {
                            const isActive = c.slug === channel.slug
                            return (
                                <Link
                                    key={c.slug}
                                    href={`/drama/china/channel/${c.slug}`}
                                    className={`group flex items-center gap-3 px-4 py-2.5 md:px-6 md:py-3 rounded-[1.2rem] text-[11px] md:text-[13px] font-black uppercase tracking-widest transition-all duration-300 active:scale-95
                                        ${isActive
                                            ? 'bg-white text-black shadow-[0_20px_40px_rgba(255,255,255,0.1)] scale-105'
                                            : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    <div className={`relative w-4 h-4 transition-transform group-hover:scale-125 ${isActive ? 'opacity-100' : 'opacity-40'}`}>
                                        <Image src={c.icon} alt="" fill className="object-contain" />
                                    </div>
                                    {c.name}
                                </Link>
                            )
                        })}
                    </nav>
                </div>

                {/* 4. PREMIUM SOCIAL SHARE */}
                <div className="absolute bottom-[-2rem] right-6 hidden lg:block animate-in fade-in slide-in-from-bottom-4 duration-1000">
                    <div className="p-6 rounded-[2.5rem] bg-zinc-900/50 border border-white/5 backdrop-blur-xl shadow-2xl">
                        <p className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.2em] mb-4 text-center">Share Hub</p>
                        <DramaShareIcons
                            title={`${channel.name} - Premium Drama Streaming`}
                            url={`${site}/drama/china/channel/${channel.slug}`}
                        />
                    </div>
                </div>
            </div>

            {/* Bottom Glow Fade */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafafa] to-transparent" />
        </header>
    )
}