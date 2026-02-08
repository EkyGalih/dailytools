"use client"

import { useRouter } from "next/navigation"
import TokenForm from "@/components/premium/TokenForm"
import { Crown, Sparkles, Star, KeyRound, ArrowLeft } from "lucide-react"
import Link from "next/link"

export default function RedeemTokenPage() {
    const router = useRouter()

    function handleSuccess() {
        // Mengambil halaman terakhir atau kembali ke home Tamanto
        const last = sessionStorage.getItem("last_page") || "/"
        router.push(last)
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#050505] px-6 relative overflow-hidden">

            {/* --- DEEP DARK BACKGROUND DECOR --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-rose-900/10 blur-[150px] rounded-full opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-zinc-900/50 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-md w-full relative z-10">
                {/* Back to Selection */}
                <Link
                    href="/paket"
                    className="inline-flex items-center mt-8 gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-rose-500 transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Paket
                </Link>

                <div className="bg-zinc-950/50 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 relative">

                    {/* Glow Effect behind Icon */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-600/20 blur-3xl rounded-full" />

                    {/* Main Header */}
                    <div className="text-center mb-12">
                        <div className="relative inline-block mb-8">
                            <div className="w-20 h-20 bg-zinc-900 border border-white/10 text-rose-500 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl relative z-10">
                                <KeyRound size={36} className="drop-shadow-[0_0_10px_rgba(225,29,72,0.5)]" />
                            </div>
                            <div className="absolute -bottom-2 -right-2 bg-amber-500 text-black p-1.5 rounded-lg rotate-12 shadow-xl z-20">
                                <Crown size={14} fill="currentColor" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-4">
                            Redeem <span className="text-rose-600">Token</span>
                        </h1>
                        <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em] leading-relaxed max-w-[200px] mx-auto">
                            Masukkan kode akses premium <br /> untuk aktivasi instan.
                        </p>
                    </div>

                    {/* Form Component */}
                    <div className="relative">
                        {/* Info Box */}
                        <div className="mb-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 text-xs text-zinc-400 space-y-1">
                            <p className="font-bold text-zinc-300 uppercase tracking-widest">
                                Cara Redeem Token
                            </p>
                            <p>1. Salin token yang kamu dapat dari Telegram</p>
                            <p>2. Tempel token di kolom di bawah</p>
                            <p>3. Klik tombol Redeem untuk aktivasi</p>
                        </div>
                        <TokenForm onSuccess={handleSuccess} />
                    </div>

                    {/* Decorative Footer inside Card */}
                    <div className="mt-12 flex items-center justify-center gap-4 opacity-10">
                        <div className="h-px w-12 bg-white" />
                        <Sparkles size={14} className="text-white" />
                        <div className="h-px w-12 bg-white" />
                    </div>
                </div>

                {/* Visual SEO/Trust Badge - Branding Tamanto 2026 */}
                <div className="text-center mt-10 space-y-2">
                    <p className="text-[9px] font-black text-zinc-600 uppercase tracking-[0.4em]">
                        Verified Secure Access • Tamanto 2026
                    </p>
                    <div className="flex justify-center gap-4 opacity-20 grayscale">
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                        <Star size={12} fill="currentColor" />
                    </div>
                </div>
            </div>
        </main>
    )
}