"use client"

import { ArrowLeft, Hammer, Sparkles } from "lucide-react"
import Link from "next/link"

export default function SimpleMaintenancePage() {
    return (
        <main className="min-h-[70vh] bg-[#fafafa] flex flex-col items-center justify-center p-8 relative overflow-hidden rounded-[3rem] border border-zinc-100 shadow-sm my-10">

            {/* Background Minimalist Glow */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-50 blur-[100px] rounded-full opacity-60" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-rose-50 blur-[100px] rounded-full opacity-60" />

            <div className="max-w-md w-full relative z-10 text-center space-y-10">

                {/* Minimalist Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-3xl shadow-sm border border-zinc-100 rotate-3">
                    <Hammer size={32} className="text-indigo-600" />
                </div>

                {/* Text Content */}
                <div className="space-y-4">
                    <div className="flex items-center justify-center gap-2 text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400">
                        <Sparkles size={12} className="text-amber-400" /> Tamanto 2026
                    </div>
                    <h1 className="text-5xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
                        Tahap <br /> <span className="text-indigo-600">Pengembangan</span>
                    </h1>
                    <p className="text-zinc-500 text-xs font-medium leading-relaxed italic px-4">
                        Halaman ini sedang dipoles agar sesuai dengan standar **Keamanan VIP** dan **Performa Tinggi** yang kami janjikan.
                    </p>
                </div>

                {/* Simple Action */}
                <div className="pt-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase text-[10px] tracking-widest hover:bg-indigo-600 transition-all active:scale-95 group shadow-xl shadow-zinc-200"
                    >
                        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                        Kembali ke Beranda
                    </Link>
                </div>

                {/* Discreet Footer */}
                <p className="text-[8px] font-black text-zinc-300 uppercase tracking-[0.5em] pt-12">
                    Verified • TAMANTO
                </p>
            </div>
        </main>
    )
}