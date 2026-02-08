"use client"

import { useEffect, useState } from "react"
import { AlertTriangle, ArrowLeft, Send, Timer, ShieldCheck, Download } from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const PACKAGE_AMOUNT: Record<string, number> = {
    basic: 2500,
    pro: 5500,
    premium: 7000,
}

const METHOD_LABEL: Record<string, string> = {
    dana: "DANA",
    shopee: "ShopeePay",
    gopay: "GoPay",
}

function formatRupiah(amount: number) {
    return "Rp " + amount.toLocaleString("id-ID")
}

export default function PaymentQRISPage() {
    const [orderId, setOrderId] = useState<string | null>(null)
    const [packageId, setPackageId] = useState<string | null>(null)
    const [method, setMethod] = useState<string | null>(null)
    const [timeLeft, setTimeLeft] = useState(1800) // 30 Menit dalam detik

    useEffect(() => {
        const o = sessionStorage.getItem("order_id")
        const p = sessionStorage.getItem("package_id")
        const m = sessionStorage.getItem("payment_method")

        if (!o || !p || !m) {
            window.location.href = "/paket"
            return
        }

        setOrderId(o)
        setPackageId(p)
        setMethod(m)

        // Timer Logic
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0))
        }, 1000)
        return () => clearInterval(timer)
    }, [])

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    if (!orderId || !packageId || !method || !PACKAGE_AMOUNT[packageId] || !METHOD_LABEL[method]) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-black">
                <div className="w-10 h-10 border-4 border-rose-600 border-t-transparent rounded-full animate-spin" />
            </main>
        )
    }

    const amount = PACKAGE_AMOUNT[packageId]
    const qrSrc = `/qris/${method}/${amount}.png`

    return (
        <main className="min-h-screen bg-[#050505] text-zinc-100 flex flex-col items-center justify-center px-4 py-10">
            <div className="max-w-md w-full space-y-6">

                {/* Back Link */}
                <Link
                    href={`/paket/beli/payment`}
                    className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 hover:text-white transition-all"
                >
                    <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                    Ganti Metode
                </Link>

                <div className="bg-zinc-950 border border-zinc-800 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
                    {/* Glow Decorative */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/5 blur-[60px]" />

                    {/* Header */}
                    <div className="text-center space-y-4 mb-8">
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-zinc-900 border border-zinc-800">
                            <Timer size={14} className="text-rose-500" />
                            <span className="text-[11px] font-black font-mono text-white">
                                Selesaikan dalam {formatTime(timeLeft)}
                            </span>
                        </div>

                        <div className="space-y-1">
                            <h1 className="text-2xl font-black uppercase italic tracking-tighter text-white">
                                Scan <span className="text-rose-600">QR Code</span>
                            </h1>
                            <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">
                                Gunakan Aplikasi <span className="text-zinc-200">{METHOD_LABEL[method]}</span>
                            </p>
                        </div>

                        {/* Amount Card */}
                        <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-3xl py-6 px-4">
                            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-zinc-500">Total Tagihan</p>
                            <p className="text-5xl font-black text-white tracking-tighter mt-1 tabular-nums">
                                {formatRupiah(amount)}
                            </p>
                        </div>
                    </div>

                    {/* QR Area with Scanner Animation */}
                    <div className="relative group">
                        <div className="bg-white rounded-[2rem] p-6 shadow-[0_0_50px_rgba(255,255,255,0.05)] overflow-hidden relative">
                            <Image
                                src={qrSrc}
                                alt="QR Pembayaran"
                                width={400}
                                height={400}
                                className="w-full h-auto"
                            />
                            {/* Scanning Line Animation */}
                            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-rose-500 to-transparent shadow-[0_0_15px_rgba(244,63,94,0.8)] animate-scan opacity-70" />
                        </div>

                        {/* Download Prompt Overlay */}
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity rounded-[2rem] flex items-center justify-center cursor-pointer">
                            <div className="bg-white text-black p-4 rounded-full shadow-xl">
                                <Download size={24} />
                            </div>
                        </div>
                    </div>

                    {/* Warning Section */}
                    <div className="mt-8 flex gap-4 bg-rose-500/5 border border-rose-500/10 rounded-3xl p-5">
                        <div className="shrink-0 w-10 h-10 rounded-2xl bg-rose-500/10 flex items-center justify-center text-rose-500">
                            <AlertTriangle size={20} />
                        </div>
                        <div className="space-y-1">
                            <p className="text-[10px] font-black uppercase tracking-widest text-rose-500">Penting</p>
                            <p className="text-[11px] text-zinc-400 leading-relaxed">
                                Hanya untuk aplikasi <b>{METHOD_LABEL[method]}</b>. Screenshot QR ini dan buka di menu scan aplikasi Anda.
                            </p>
                        </div>
                    </div>

                    {/* Confirm Button */}
                    <div className="mt-8 space-y-4">
                        <a
                            href={`https://t.me/suruyambeli_bot?start=ORDER_${orderId}`}
                            target="_blank"
                            className="group flex items-center justify-center gap-3 w-full py-5 rounded-[1.5rem] bg-rose-600 hover:bg-rose-500 text-white font-black uppercase text-xs tracking-[0.2em] shadow-xl shadow-rose-900/20 transition-all active:scale-[0.98]"
                        >
                            <Send size={16} />
                            Konfirmasi di Telegram
                        </a>

                        <div className="flex items-center justify-center gap-2 text-zinc-600">
                            <ShieldCheck size={14} />
                            <span className="text-[9px] font-bold uppercase tracking-widest">Secured by TAMANTO PAYMENT</span>
                        </div>
                    </div>
                </div>

                {/* Footer Instructions */}
                <div className="grid grid-cols-2 gap-3">
                    {[
                        { step: "01", title: "SCAN QR", desc: "Screenshot & bayar" },
                        { step: "02", title: "NOMINAL", desc: "Harus sesuai tagihan" },
                        { step: "03", title: "KIRIM BUKTI", desc: "Konfirmasi ke Telegram" },
                        { step: "04", title: "REDEEM", desc: "Token otomatis dikirim" },
                    ].map((item) => (
                        <div key={item.step} className="group p-3 rounded-2xl bg-zinc-900/40 border border-zinc-800/50 hover:border-rose-500/30 transition-colors">
                            <div className="flex flex-col gap-1">
                                <span className="text-[10px] font-black text-rose-500 tracking-tighter opacity-80 group-hover:opacity-100">
                                    STEP {item.step}
                                </span>
                                <p className="text-[10px] font-black text-zinc-200 uppercase tracking-wide">
                                    {item.title}
                                </p>
                                <p className="text-[9px] font-medium text-zinc-500 uppercase leading-tight">
                                    {item.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style jsx>{`
                @keyframes scan {
                    0% { top: 0%; }
                    100% { top: 100%; }
                }
                .animate-scan {
                    position: absolute;
                    animation: scan 3s linear infinite;
                }
            `}</style>
        </main>
    )
}