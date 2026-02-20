"use client"

import { useRouter } from "next/navigation"
import TokenForm from "@/components/premium/TokenForm"
import { Crown, Sparkles, Star, KeyRound, ArrowLeft, Clock, LogOut } from "lucide-react"
import Link from "next/link"
import { usePremium } from "@/components/premium/usePremium"

export default function RedeemTokenPage() {
    const router = useRouter()
    const { premium, expiresAt, loading } = usePremium()

    function handleSuccess() {
        const last = sessionStorage.getItem("last_page") || "/"
        router.push(last)
    }

    async function handleLogout() {
        const token = localStorage.getItem("premium_token");
        const deviceId = localStorage.getItem("device_id");

        // Hapus device dari DB
        if (token && deviceId) {
            await fetch("/api/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, deviceId }),
            }).catch(() => { });
        }

        // Hapus localStorage
        localStorage.removeItem("premium_token");
        localStorage.removeItem("device_id");
        localStorage.removeItem("premium_expires");
        window.dispatchEvent(new Event("premium_updated"));
        window.location.reload();
    }

    function getTimeLeft(expiresAt: string) {
        const diff = new Date(expiresAt).getTime() - Date.now()
        if (diff <= 0) return "Kedaluwarsa"

        const hours = Math.floor(diff / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

        if (hours >= 24) {
            const days = Math.floor(hours / 24)
            return `${days} hari ${hours % 24} jam`
        }
        return `${hours} jam ${minutes} menit`
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-[#050505] px-6 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-rose-900/10 blur-[150px] rounded-full opacity-50" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-zinc-900/50 blur-[120px] rounded-full" />
            </div>

            <div className="max-w-md w-full relative z-10">
                <Link
                    href="/paket"
                    className="inline-flex items-center mt-8 gap-2 mb-8 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-rose-500 transition-colors group"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" /> Kembali ke Paket
                </Link>

                <div className="bg-zinc-950/50 backdrop-blur-3xl p-10 md:p-14 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.5)] border border-white/5 relative">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-rose-600/20 blur-3xl rounded-full" />

                    {!loading && premium && expiresAt ? (
                        /* === SUDAH PREMIUM === */
                        <div className="text-center space-y-8">
                            <div className="relative inline-block mb-2">
                                <div className="w-20 h-20 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-[2rem] flex items-center justify-center mx-auto shadow-2xl">
                                    <Crown size={36} className="drop-shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
                                </div>
                            </div>

                            <div>
                                <h1 className="text-4xl font-black italic uppercase tracking-tighter text-white leading-none mb-2">
                                    Akses <span className="text-emerald-400">Aktif</span>
                                </h1>
                                <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.3em]">
                                    Paket premium kamu sedang aktif
                                </p>
                            </div>

                            {/* Waktu Tersisa */}
                            <div className="bg-zinc-900/60 border border-emerald-500/20 rounded-2xl p-6 space-y-2">
                                <div className="flex items-center justify-center gap-2 text-emerald-400">
                                    <Clock size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Waktu Tersisa</span>
                                </div>
                                <p className="text-3xl font-black text-white">
                                    {getTimeLeft(expiresAt)}
                                </p>
                                <p className="text-zinc-500 text-[10px]">
                                    Berakhir: {new Date(expiresAt).toLocaleString("id-ID")}
                                </p>
                            </div>

                            {/* Tombol Logout */}
                            <button
                                onClick={handleLogout}
                                className="w-full flex items-center justify-center gap-2 bg-zinc-900 hover:bg-red-950 border border-zinc-800 hover:border-red-800 text-zinc-400 hover:text-red-400 py-4 rounded-2xl font-black uppercase text-xs tracking-widest transition-all"
                            >
                                <LogOut size={14} /> Keluar
                            </button>
                        </div>
                    ) : (
                        /* === BELUM PREMIUM === */
                        <>
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

                            <div className="relative">
                                <div className="mb-6 bg-zinc-900/60 border border-zinc-800 rounded-2xl p-4 text-xs text-zinc-400 space-y-1">
                                    <p className="font-bold text-zinc-300 uppercase tracking-widest">Cara Redeem Token</p>
                                    <p>1. Salin token yang kamu dapat dari Telegram</p>
                                    <p>2. Tempel token di kolom di bawah</p>
                                    <p>3. Klik tombol Redeem untuk aktivasi</p>
                                </div>
                                <TokenForm onSuccess={handleSuccess} />
                            </div>
                        </>
                    )}

                    <div className="mt-12 flex items-center justify-center gap-4 opacity-10">
                        <div className="h-px w-12 bg-white" />
                        <Sparkles size={14} className="text-white" />
                        <div className="h-px w-12 bg-white" />
                    </div>
                </div>

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