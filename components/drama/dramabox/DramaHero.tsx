"use client"

import Link from 'next/link'
import Image from 'next/image'
import { DRAMA_CHANNELS, getChannel, DramaChannelSlug } from '@/libs/drama/channel'
import DramaShareIcons from './DramaShareIcon'
import { Sparkles, Radio, LayoutGrid, Zap } from 'lucide-react'

export default function DramaHero({ activeChannel }: { activeChannel?: DramaChannelSlug }) {
    const channel = getChannel(activeChannel)
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    return (
        <header className="relative overflow-hidden bg-[#050505] pt-10 pb-20 md:pt-28 md:pb-40">

            {/* --- 1. PREMIUM AMBIENCE --- */}
            <div className="absolute inset-0 pointer-events-none select-none">
                <div className="absolute top-[-10%] left-[-5%] w-[80%] h-[50%] bg-rose-600/15 blur-[100px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-0 w-[50%] h-[40%] bg-indigo-600/10 blur-[100px] rounded-full" />
                <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
            </div>

            <div className="relative max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col items-start gap-6 md:gap-10">

                    {/* --- STATUS BADGE (Lebih mungil di mobile) --- */}
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 border border-white/10 backdrop-blur-xl animate-in fade-in slide-in-from-top-4 duration-1000">
                        <span className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                        </span>
                        <span className="text-[9px] md:text-[10px] font-black tracking-[0.2em] uppercase text-zinc-100 flex items-center gap-2">
                            <Zap size={10} className="text-rose-500 fill-rose-500" />
                            Tamanto Premium
                        </span>
                    </div>

                    {/* --- DYNAMIC HERO TITLE (Responsive Font Size) --- */}
                    <div className="relative space-y-4 md:space-y-6 w-full">
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-black text-white italic tracking-tighter leading-[0.9] uppercase">
                            <span className="block animate-in fade-in slide-in-from-left-6 duration-700">
                                {channel.name}
                            </span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 via-zinc-500 to-zinc-800 animate-in fade-in slide-in-from-left-8 duration-1000 delay-100">
                                Premium Hub
                            </span>
                        </h1>

                        <div className="max-w-xl border-l-2 border-rose-500/50 pl-4 md:pl-6 animate-in fade-in duration-1000 delay-300">
                            <p className="text-zinc-400 text-sm md:text-lg font-medium leading-relaxed italic">
                                {channel.description}
                            </p>
                        </div>
                    </div>

                    {/* --- CHANNEL NAVIGATION (SWIPEABLE MOBILE) --- */}
                    <div className="w-full space-y-4 mt-4">
                        <div className="flex items-center gap-2 text-zinc-500 mb-1">
                            <LayoutGrid size={12} />
                            <span className="text-[9px] font-black uppercase tracking-widest">Pilih Channel</span>
                        </div>

                        {/* Container Swipeable di Mobile */}
                        <nav className="flex items-center gap-2.5 overflow-x-auto no-scrollbar snap-x snap-mandatory pb-4 -mx-4 px-4 md:mx-0 md:px-0 md:flex-wrap md:pb-0">
                            {DRAMA_CHANNELS.map((c) => {
                                const isActive = c.slug === channel.slug
                                return (
                                    <Link
                                        key={c.slug}
                                        href={`/drama/china/channel/${c.slug}`}
                                        className={`shrink-0 snap-start group flex items-center gap-2.5 px-5 py-3 md:px-7 md:py-3.5 rounded-2xl text-[11px] md:text-[13px] font-black uppercase tracking-wider transition-all duration-300 active:scale-95
                                            ${isActive
                                                ? 'bg-white text-zinc-950 shadow-xl shadow-rose-500/10'
                                                : 'bg-white/5 border border-white/5 text-zinc-400 hover:text-white hover:bg-white/10'
                                            }`}
                                    >
                                        <div className={`relative w-4 h-4 transition-all ${isActive ? 'opacity-100' : 'opacity-40 grayscale'}`}>
                                            <Image src={c.icon} alt="" fill className="object-contain" />
                                        </div>
                                        {c.name}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>
                </div>
            </div>

            {/* Fade to body background */}
            <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafafa] to-transparent pointer-events-none" />

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </header>
    )
}