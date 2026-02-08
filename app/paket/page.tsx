"use client"
import { useState, useEffect } from "react"
import { Check, Crown, Flame, Zap, ShieldCheck, Star, KeyRound, ChevronRight, CheckCircle2, RefreshCw } from "lucide-react"
import Link from "next/link"

export default function PremiumPage() {
    const [loading, setLoading] = useState<string | null>(null)
    const [err, setErr] = useState("")
    const [hasToken, setHasToken] = useState(false)

    // ✅ Cek status token saat komponen dimuat
    useEffect(() => {
        const token = localStorage.getItem("premium_token")
        if (token) setHasToken(true)
    }, [])

    const packages = [
        {
            id: "1_day",
            name: "Maraton Stream",
            price: "Rp 2.500",
            period: "/ hari",
            qris: "/qris/2500.png",
            backendId: "basic",
            desc: "Akses kilat tanpa batas.",
            icon: <Zap className="text-amber-400" />,
        },
        {
            id: "3_days",
            name: "Weekend Warrior",
            price: "Rp 5.500",
            period: "/ 3 hari",
            qris: "/qris/5500.png",
            backendId: "pro",
            desc: "Pas untuk marathon drakor.",
            icon: <Flame className="text-rose-500" />,
            popular: true,
        },
        {
            id: "7_days",
            name: "Pro Cultivator",
            price: "Rp 7.000",
            period: "/ minggu",
            qris: "/qris/7000.png",
            backendId: "premium",
            desc: "Pengalaman premium sejati.",
            icon: <Crown className="text-amber-500" />,
        },
    ]


    async function buy(pkg: {
        id: string
        backendId: string
        price: string
    }) {
        setErr("")
        setLoading(pkg.id)

        try {
            // ambil telegram id user
            const telegramId = localStorage.getItem("telegram_id")
            if (!telegramId) {
                setErr("Silakan buka bot Telegram terlebih dahulu.")
                return
            }

            // ambil amount dari price (Rp 2.500 -> 2500)
            const amount = Number(pkg.price.replace(/[^\d]/g, ""))

            if (!amount || amount <= 0) {
                setErr("Nominal paket tidak valid")
                return
            }

            // call backend
            const res = await fetch("https://api-payment-tamanto.vercel.app/orders", {
            method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    telegramId,
                    packageId: pkg.backendId,
                    amount,
                }),
            })

            const json = await res.json()

            if (!res.ok) {
                setErr(json.error || "Gagal membuat order")
                return
            }

            sessionStorage.setItem("order_id", json.orderId)
            sessionStorage.setItem("package_id", pkg.backendId)

            // redirect
            window.location.href = `/paket/beli/payment-method`
        } catch (e) {
            console.error(e)
            setErr("Terjadi kesalahan sistem")
        } finally {
            setLoading(null)
        }
    }

    return (
        <main className="min-h-screen bg-[#050505] text-zinc-100 pb-20">
            {/* Header Section */}
            <section className="relative pt-20 pb-12 px-6 text-center overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[400px] bg-rose-600/10 blur-[120px] rounded-full" />

                <div className="relative z-10 max-w-2xl mx-auto space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-[10px] font-black uppercase tracking-[0.2em] text-rose-500">
                        <Star size={12} fill="currentColor" /> {hasToken ? "Membership Status" : "Upgrade Your Experience"}
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                        Tamanto <span className="text-rose-600">Premium</span>
                    </h1>
                    <p className="text-zinc-400 text-sm md:text-base font-medium max-w-md mx-auto italic">
                        {hasToken
                            ? "Nikmati akses tanpa batas ke semua konten eksklusif tanpa gangguan iklan."
                            : "Buka semua episode eksklusif Drama, Anime, dan Manhua tanpa gangguan iklan."}
                    </p>
                </div>
            </section>

            {/* ✅ Area Dinamis: Status Premium vs Redeem Token */}
            <section className="max-w-xl mx-auto px-6 mb-12 relative z-10">
                {hasToken ? (
                    <div className="p-1 rounded-[2rem] bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20 shadow-2xl shadow-emerald-500/10">
                        <div className="bg-zinc-950 rounded-[1.9rem] p-6 flex flex-col md:flex-row items-center gap-6 justify-between border border-emerald-500/20">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                    <CheckCircle2 size={20} />
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black uppercase tracking-widest text-emerald-500">Premium Aktif</h4>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase italic">Sesi Anda sedang berjalan</p>
                                </div>
                            </div>
                            <Link
                                href="/paket/redeem"
                                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                Detail Token
                            </Link>
                        </div>
                    </div>
                ) : (
                    <div className="p-1 rounded-[2rem] bg-gradient-to-r from-zinc-800 via-rose-500/20 to-zinc-800">
                        <div className="bg-zinc-950 rounded-[1.9rem] p-6 flex flex-col md:flex-row items-center gap-6 justify-between border border-white/5">
                            <div className="flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-rose-500">
                                    <KeyRound size={18} />
                                </div>
                                <div>
                                    <h4 className="text-[11px] font-black uppercase tracking-widest">Sudah Punya Token?</h4>
                                    <p className="text-[9px] text-zinc-500 font-bold uppercase italic">Masukkan kode aksesmu di sini</p>
                                </div>
                            </div>
                            <Link
                                href="/paket/redeem"
                                className="flex items-center gap-2 px-6 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all group"
                            >
                                Gunakan Token <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    </div>
                )}
            </section>

            {/* Pricing Cards */}
            <section className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                {packages.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`relative group p-8 rounded-[2.5rem] border transition-all duration-500 hover:scale-[1.02] ${pkg.popular ? 'bg-zinc-900 border-rose-500/50 shadow-2xl shadow-rose-500/10' : 'bg-zinc-950 border-zinc-800 hover:border-zinc-700'
                            }`}
                    >
                        {pkg.popular && (
                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-rose-600 text-white text-[10px] font-black uppercase rounded-full tracking-widest shadow-xl">
                                {hasToken ? "Paling Recomended" : "Terpopuler"}
                            </div>
                        )}

                        <div className="space-y-6">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-800 flex items-center justify-center shadow-inner">
                                {pkg.icon}
                            </div>

                            <div>
                                <h3 className="text-xl font-black italic uppercase tracking-tight">{pkg.name}</h3>
                                <p className="text-zinc-500 text-xs font-medium mt-1">{pkg.desc}</p>
                            </div>

                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-black">{pkg.price}</span>
                                <span className="text-zinc-500 text-xs font-bold uppercase tracking-widest">{pkg.period}</span>
                            </div>

                            <ul className="space-y-3 py-6 border-t border-zinc-800/50">
                                {["Nonton Tanpa Iklan", "Kualitas HD & 4K", "Prioritas Update", "Akses Semua Channel"].map((feat, idx) => (
                                    <li key={idx} className="flex items-center gap-3 text-[11px] font-bold text-zinc-400 uppercase tracking-wide">
                                        <Check size={14} className="text-emerald-500" /> {feat}
                                    </li>
                                ))}
                            </ul>

                            <button
                                onClick={() => buy(pkg)}
                                disabled={loading !== null}
                                className={`w-full py-4 rounded-2xl font-black uppercase text-[11px] tracking-[0.2em] transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 ${pkg.popular ? 'bg-rose-600 hover:bg-rose-500 text-white shadow-lg shadow-rose-900/20' : 'bg-white text-zinc-900 hover:bg-zinc-200'
                                    }`}
                            >
                                {loading === pkg.id ? (
                                    "Processing..."
                                ) : (
                                    <>
                                        {hasToken ? <RefreshCw size={14} /> : null}
                                        {hasToken ? "Perpanjang Akses" : "Beli Sekarang"}
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                ))}
            </section>

            {/* Trust Badges */}
            <footer className="mt-20 max-w-xl mx-auto px-6 text-center space-y-6">
                {err && (
                    <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl text-red-500 text-xs font-bold italic">
                        {err}
                    </div>
                )}
                <div className="flex items-center justify-center gap-8 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
                    <ShieldCheck size={32} />
                    <span className="text-[10px] font-black uppercase tracking-[0.3em]">Secure Payment by SURU PAY</span>
                </div>
            </footer>
        </main>
    )
}