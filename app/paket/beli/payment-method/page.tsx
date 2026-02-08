"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShieldCheck, ChevronRight, CreditCard } from "lucide-react"
import Link from "next/link"

const PACKAGE_INFO: Record<string, { name: string; price: string }> = {
    basic: { name: "Maraton Stream", price: "Rp 2.500" },
    pro: { name: "Weekend Warrior", price: "Rp 5.500" },
    premium: { name: "Pro Cultivator", price: "Rp 7.000" },
}

export default function PaymentMethodPage() {
    const router = useRouter()
    const [orderId, setOrderId] = useState<string | null>(null)
    const [packageId, setPackageId] = useState<string | null>(null)

    useEffect(() => {
        const o = sessionStorage.getItem("order_id")
        const p = sessionStorage.getItem("package_id")
        if (!o || !p) {
            router.replace("/paket")
            return
        }
        setOrderId(o)
        setPackageId(p)
    }, [router])

    if (!orderId || !packageId || !PACKAGE_INFO[packageId]) {
        return (
            <main className="min-h-screen flex items-center justify-center bg-[#050505] text-white">
                <div className="animate-pulse flex flex-col items-center gap-4">
                    <div className="w-12 h-12 rounded-full border-2 border-rose-600 border-t-transparent animate-spin" />
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-500">Memvalidasi Pesanan...</p>
                </div>
            </main>
        )
    }

    const pkg = PACKAGE_INFO[packageId]

    function chooseMethod(method: "dana" | "shopee" | "gopay") {
        sessionStorage.setItem("payment_method", method)
        router.push("/paket/beli/payment/qris")
    }

    return (
        <main className="min-h-screen bg-[#050505] text-zinc-100 flex items-center justify-center px-4 py-10">
            <div className="max-w-md w-full space-y-8">

                {/* Top Navigation */}
                <Link
                    href="/paket"
                    className="group inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-rose-500 transition-colors"
                >
                    <div className="p-2 rounded-full bg-zinc-900 group-hover:bg-rose-500/10 transition-all">
                        <ArrowLeft size={14} />
                    </div>
                    Kembali
                </Link>

                <div className="space-y-2">
                    <h1 className="text-3xl font-black italic uppercase tracking-tighter text-white">
                        Metode <span className="text-rose-600">Pembayaran</span>
                    </h1>
                    <p className="text-xs text-zinc-500 font-medium">Pilih e-wallet favoritmu untuk menyelesaikan transaksi.</p>
                </div>

                {/* Glassy Order Card */}
                <div className="relative overflow-hidden bg-zinc-900/50 border border-white/5 rounded-[2rem] p-6 backdrop-blur-xl">
                    <div className="relative z-10 flex justify-between items-center">
                        <div className="space-y-1">
                            <p className="text-[9px] font-black uppercase tracking-[0.2em] text-rose-500">Ringkasan Pesanan</p>
                            <h2 className="text-lg font-black uppercase italic tracking-tight">{pkg.name}</h2>
                            <p className="text-[10px] text-zinc-500 font-mono">ID: {orderId.slice(0, 8)}...</p>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-white tracking-tighter">{pkg.price}</p>
                            <p className="text-[9px] text-zinc-500 uppercase font-bold tracking-widest">Nett Price</p>
                        </div>
                    </div>
                    {/* Abstract Decorative Background */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-rose-600/10 blur-[50px] -mr-10 -mt-10" />
                </div>

                {/* Payment Selection */}
                <div className="space-y-3">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 ml-2">E-Wallet Indonesia</p>

                    <PaymentButton
                        label="DANA"
                        color="bg-blue-500"
                        onClick={() => chooseMethod("dana")}
                        subLabel="Konfirmasi instan via DANA"
                    />

                    {/* <PaymentButton
                        label="ShopeePay"
                        color="bg-orange-500"
                        onClick={() => chooseMethod("shopee")}
                        subLabel="Bayar pakai saldo Shopee"
                    />

                    <PaymentButton
                        label="GoPay"
                        color="bg-emerald-500"
                        onClick={() => chooseMethod("gopay")}
                        subLabel="Praktis dengan aplikasi Gojek"
                    /> */}
                </div>

                {/* Trust Badge */}
                <div className="pt-4 flex flex-col items-center gap-4">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/50 border border-zinc-800">
                        <ShieldCheck size={14} className="text-emerald-500" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">TAMANTO Security</span>
                    </div>
                    <p className="text-[10px] text-zinc-600 text-center leading-relaxed max-w-[280px]">
                        Dengan melanjutkan, Anda menyetujui <span className="text-zinc-400 underline">Syarat & Ketentuan</span> pembayaran otomatis kami.
                    </p>
                </div>
            </div>
        </main>
    )
}

function PaymentButton({ label, color, onClick, subLabel }: { label: string; color: string; onClick: () => void; subLabel: string }) {
    return (
        <button
            onClick={onClick}
            className="group w-full flex items-center justify-between p-5 rounded-[1.5rem] bg-zinc-900 border border-zinc-800 hover:border-zinc-600 transition-all active:scale-[0.98]"
        >
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl ${color} flex items-center justify-center text-white shadow-lg`}>
                    <CreditCard size={20} />
                </div>
                <div className="text-left">
                    <p className="text-sm font-black uppercase tracking-tight text-white group-hover:text-rose-500 transition-colors">{label}</p>
                    <p className="text-[10px] text-zinc-500 font-medium tracking-tight">{subLabel}</p>
                </div>
            </div>
            <ChevronRight size={18} className="text-zinc-600 group-hover:text-white transition-all transform group-hover:translate-x-1" />
        </button>
    )
}