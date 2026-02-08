"use client"

import { ArrowLeft, Hammer, Sparkles, Coffee, ExternalLink } from "lucide-react"
import Link from "next/link"

export default function ElegantMaintenancePage() {
    return (
        <main className="min-h-[80vh] bg-[#020203] flex flex-col items-center justify-center p-6 relative overflow-hidden rounded-[3.5rem] border border-white/[0.05] shadow-2xl my-10">

            {/* Soft Ambient Glows - Elegant Positioning */}
            <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-indigo-600/10 blur-[140px] rounded-full" />
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-violet-600/10 blur-[140px] rounded-full" />

            <div className="max-w-lg w-full relative z-10 flex flex-col items-center">

                {/* floating Badge */}
                <div className="mb-8 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.08] backdrop-blur-md">
                    <Sparkles size={12} className="text-amber-400" />
                    <span className="text-[10px] font-medium tracking-[0.3em] text-zinc-400 uppercase">
                        Tamanto TIM
                    </span>
                </div>

                {/* Main Content Card */}
                <div className="text-center space-y-6">
                    <h1 className="text-6xl md:text-7xl font-extrabold tracking-tighter text-white leading-[0.9] italic">
                        Halaman <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white via-zinc-400 to-zinc-600">
                            Sedang Dalam Perbaikan
                        </span>
                    </h1>

                    <div className="h-px w-20 bg-gradient-to-r from-transparent via-zinc-700 to-transparent mx-auto" />

                    <p className="text-zinc-400 text-sm font-light leading-relaxed max-w-[280px] mx-auto opacity-80">
                        Kami sedang menyempurnakan setiap piksel untuk kenyamanan baca & nonton Anda.
                    </p>
                </div>

                {/* Elegant Glass Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-sm mt-12">
                    <Link
                        href="/"
                        className="group flex items-center justify-center gap-3 px-6 py-4 bg-white text-black rounded-2xl font-bold text-[11px] uppercase tracking-wider hover:bg-zinc-200 transition-all active:scale-[0.98]"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        Explore
                    </Link>

                    <a
                        href="https://trakteer.id/god_suru/showcase?menu=open"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-3 px-6 py-4 bg-white/[0.03] border border-white/[0.08] text-white rounded-2xl font-bold text-[11px] uppercase tracking-wider hover:bg-white/[0.08] transition-all active:scale-[0.98]"
                    >
                        <Coffee size={16} className="text-rose-500 group-hover:scale-110 transition-transform" />
                        Kirim Energi Kopi
                    </a>
                </div>

                {/* Bottom Info */}
                <div className="mt-16 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-4 text-[9px] font-bold text-zinc-600 tracking-[0.4em] uppercase">
                        <span>High Quality</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span>Secure</span>
                        <span className="w-1 h-1 rounded-full bg-zinc-800" />
                        <span>VIP</span>
                    </div>
                </div>
            </div>

            {/* Subtle corner accent */}
            <div className="absolute bottom-10 right-10 opacity-20 hidden md:block">
                <Hammer size={40} className="text-zinc-500" />
            </div>
        </main>
    )
}