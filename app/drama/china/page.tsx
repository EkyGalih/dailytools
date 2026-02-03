import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Play, Zap, MonitorPlay } from 'lucide-react'
import { DRAMA_CHANNELS } from '@/libs/drama/channel'
import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'TAMANTO - Streaming Drama China Viral & Terlengkap (Sub Indo)',
    description:
        'Nonton Drama China viral dari Dramabox, Realshort, Melolo, & Flickreels. Ribuan episode drama pendek vertikal kualitas HD sub Indo, update setiap hari!',
    keywords: [
        'Nonton Drama China', 'Drama China Sub Indo', 'Drama Pendek China',
        'Dramabox Indonesia', 'Realshort Sub Indo', 'Melolo Drama China',
        'Flickreels Drama', 'Drama China Viral TikTok'
    ],
    openGraph: {
        title: 'Tamanto – Galeri Drama China & Short Drama Terlengkap',
        description: 'Update harian Drama China trending. Nikmati akses gratis ke ribuan episode dari channel Dramabox, Realshort, dan lainnya.',
        url: 'https://tamanto.web.id/drama/china',
        siteName: 'Tamanto',
        images: [
            {
                url: '/og-china-drama.jpg', // Opsional: Berikan gambar poster drama china yang keren
                width: 1200,
                height: 630,
                alt: 'Tamanto China Drama Hub',
            },
        ],
        locale: 'id_ID',
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Nonton Drama China Viral HD Sub Indo',
        description: 'Ribuan drama pendek China dari Dramabox & Realshort tersedia di Tamanto. Kita Nonton, Kita Terhibur!',
    },
}

export default function ChannelsPage() {
    return (
        <div className="min-h-screen bg-[#fafafa] pb-24">
            {/* 🌌 CINEMATIC HEADER */}
            <header className="relative overflow-hidden bg-[#020202] pt-24 pb-48 md:pt-32 md:pb-60">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[70%] bg-indigo-600/20 blur-[140px] rounded-full animate-pulse" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[70%] bg-rose-600/10 blur-[140px] rounded-full" />
                </div>

                <div className="relative max-w-6xl mx-auto px-6 text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 text-[10px] font-black tracking-[0.3em] uppercase bg-white/[0.03] border border-white/10 text-indigo-400 rounded-full backdrop-blur-xl">
                        <Zap size={12} fill="currentColor" /> Pilek Bale
                    </div>
                    <h1 className="text-6xl md:text-[9rem] font-black text-white italic tracking-tighter leading-[0.8] uppercase">
                        Balen<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-rose-500">Media.</span>
                    </h1>
                    <p className="mt-8 text-zinc-500 text-sm md:text-xl max-w-2xl mx-auto font-medium leading-relaxed italic border-l-2 border-indigo-500/30 pl-6 md:border-l-0 md:pl-0">
                        Pilih gerbang hiburanmu. Tamanto menghubungkan Anda dengan platform drama vertikal paling viral di Asia.
                    </p>
                </div>
            </header>

            {/* 🗂️ CHANNELS EXPLORER */}
            <main className="max-w-6xl mx-auto px-4 md:px-6 -mt-32 md:-mt-44 relative z-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
                    {DRAMA_CHANNELS.map((channel) => (
                        <Link
                            key={channel.slug}
                            href={`/drama/china/channel/${channel.slug}`}
                            className="group relative flex flex-col bg-white rounded-[3rem] p-4 border border-zinc-100 shadow-[0_40px_100px_-20px_rgba(0,0,0,0.04)] hover:shadow-[0_40px_100px_-20px_rgba(99,102,241,0.15)] transition-all duration-700 active:scale-[0.98]"
                        >
                            {/* Visual Box */}
                            <div className="relative w-full aspect-[16/9] md:aspect-[16/8] rounded-[2.5rem] bg-zinc-950 overflow-hidden shadow-2xl">
                                {/* Brand Icon Overlay */}
                                <div className="absolute inset-0 flex items-center justify-center z-10">
                                    <div className="relative w-24 h-24 p-4 bg-white/10 backdrop-blur-3xl rounded-[2rem] border border-white/20 shadow-2xl transition-transform duration-700 group-hover:scale-110 group-hover:rotate-3">
                                        <Image
                                            src={channel.icon}
                                            alt={channel.name}
                                            fill
                                            className="object-contain p-4"
                                            unoptimized
                                        />
                                    </div>
                                </div>

                                {/* Background Image/Pattern */}
                                <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-indigo-900 via-zinc-950 to-black" />
                                <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-20" />

                                {/* Play Button Hover */}
                                <div className="absolute bottom-6 right-6 w-12 h-12 bg-white text-black rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    <Play size={20} fill="black" />
                                </div>
                            </div>

                            {/* Content Detail */}
                            <div className="p-8 md:p-10 flex flex-col gap-4">
                                <div className="flex items-center justify-between">
                                    <h2 className="text-3xl md:text-4xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
                                        {channel.name}
                                    </h2>
                                    <ArrowRight className="text-zinc-200 group-hover:text-indigo-600 group-hover:translate-x-2 transition-all" />
                                </div>

                                <p className="text-zinc-500 text-sm md:text-base font-medium leading-relaxed italic">
                                    {channel.description}
                                </p>

                                <div className="mt-4 pt-6 border-t border-zinc-50 flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-indigo-600">
                                        <MonitorPlay size={14} />
                                        <span>Enter Channel</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-zinc-300 uppercase tracking-[0.2em]">
                                        Tamanto Verified
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* 🏷️ FOOTER TAG */}
                <div className="mt-24 text-center">
                    <div className="inline-flex items-center gap-3 px-6 py-3 rounded-2xl bg-white border border-zinc-100 shadow-sm">
                        <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
                        <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.4em] italic">
                            Tamanto • Kita Nonton Kita Terhibur
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}