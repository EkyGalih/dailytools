"use client"

import { useEffect, useState } from "react"
import { KeyRound, LogOut, Loader2, CheckCircle2, Zap } from "lucide-react"
import { getDeviceId } from "@/libs/device"

const formatDate = (value: number | string) => {
    const date = new Date(Number(value))
    if (isNaN(date.getTime())) return "-"
    return new Intl.DateTimeFormat("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
    }).format(date)
}

export default function TokenForm({ onSuccess }: { onSuccess?: () => void }) {
    const [token, setToken] = useState("")
    const [msg, setMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [savedToken, setSavedToken] = useState<string | null>(null)
    const [expiresAt, setExpiresAt] = useState<number | null>(null)

    useEffect(() => {
        const t = localStorage.getItem("premium_token")
        const exp = localStorage.getItem("premium_expires_at")
        if (t) setSavedToken(t)
        if (exp) setExpiresAt(Number(exp))
    }, [])

    async function logout() {
        const token = localStorage.getItem("premium_token");
        if (!token) {
            localStorage.clear();
            setSavedToken(null);
            setExpiresAt(null);
            setMsg("Sesi sudah berakhir.");
            return;
        }

        setIsLoading(true);

        try {
            const deviceId = getDeviceId();

            const res = await fetch(
                "https://api-payment-tamanto.vercel.app/logout",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ token, deviceId }),
                }
            );

            // WALAU backend error → tetap logout lokal
            localStorage.removeItem("premium_token");
            localStorage.removeItem("premium_expires_at");

            setSavedToken(null);
            setExpiresAt(null);
            setMsg("Sesi berakhir. Kembali ke mode Free.");

            window.dispatchEvent(new Event("premium_updated"));
        } finally {
            setIsLoading(false);
        }
    }

    async function submit() {
        if (!token.trim()) return

        setIsLoading(true)

        const deviceId = getDeviceId()

        try {
            const res = await fetch("https://api-payment-tamanto.vercel.app/redeem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, deviceId }),
            })

            const json = await res.json()

            if (json.success) {
                localStorage.setItem("premium_token", token)
                localStorage.setItem("premium_expires_at", String(json.expiresAt))

                setSavedToken(token)
                setExpiresAt(Number(json.expiresAt))
                setMsg("")

                window.dispatchEvent(new Event("premium_updated"))
                setTimeout(() => onSuccess?.(), 1500)
            } else {
                setMsg("❌ " + json.error)
            }

            if (json.error?.includes("2 perangkat")) {
                setMsg("❌ Token sudah aktif di 2 device lain");
                return;
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (savedToken) {
        return (
            <div className="space-y-8 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-white border border-emerald-100 rounded-[2.5rem] p-10 text-center shadow-[0_20px_50px_-15px_rgba(16,185,129,0.1)] relative overflow-hidden">
                    {/* Decorative Glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-emerald-50 blur-3xl rounded-full" />

                    <div className="relative z-10">
                        <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-[2rem] flex items-center justify-center mx-auto mb-6">
                            <CheckCircle2 size={40} strokeWidth={2.5} />
                        </div>
                        <h3 className="text-zinc-900 font-black italic uppercase tracking-tighter text-2xl mb-2">Premium Aktif</h3>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full">
                            <Zap size={12} className="text-emerald-500" fill="currentColor" />
                            <p className="text-emerald-600 text-[10px] font-black uppercase tracking-widest italic">
                                Berlaku s/d {expiresAt ? formatDate(String(expiresAt)) : "..."}
                            </p>
                        </div>
                    </div>
                </div>

                <button
                    onClick={logout}
                    disabled={isLoading}
                    className={`w-full py-5 rounded-[1.8rem] font-black uppercase text-[10px] tracking-[0.3em]
  transition-all duration-300 flex items-center justify-center gap-3 border
  ${isLoading
                            ? "bg-rose-400 text-white border-rose-300 cursor-not-allowed"
                            : "bg-rose-600 text-white border-rose-600 hover:bg-rose-700 hover:border-rose-700 active:scale-95"
                        }`}
                >
                    {isLoading ? (
                        <Loader2 size={16} className="animate-spin" />
                    ) : (
                        <>
                            <LogOut size={16} />
                            Keluar dari Sesi
                        </>
                    )}
                </button>
            </div>
        )
    }

    return (
        <div className="space-y-5">
            <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center text-indigo-500 group-focus-within:text-pink-500 transition-colors">
                    <KeyRound size={20} />
                </div>
                <input
                    value={token}
                    onChange={(e) => setToken(e.target.value)}
                    placeholder="TAMAK TOKEN RAHASIA SIDE"
                    className="w-full bg-zinc-50 border-2 border-zinc-100 text-purple-900 rounded-2xl py-5 pl-14 pr-5 text-sm font-bold tracking-[0.2em] outline-none focus:bg-white focus:border-indigo-400 focus:ring-8 focus:ring-indigo-500/5 transition-all"
                />
            </div>

            <button
                onClick={submit}
                disabled={isLoading || !token}
                className="w-full group relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 p-[2px] rounded-2xl shadow-xl shadow-indigo-500/20 active:scale-95 transition-all"
            >
                <div className="bg-white group-hover:bg-transparent transition-colors rounded-[14px] py-4">
                    <span className="flex items-center justify-center gap-3 font-black uppercase text-[11px] tracking-[0.2em] text-indigo-600 group-hover:text-white transition-colors">
                        {isLoading ? <Loader2 className="animate-spin" /> : <><Zap size={18} fill="currentColor" /> Aktifkan Sekarang</>}
                    </span>
                </div>
            </button>

            {msg && (
                <p className={`text-center text-[10px] font-black uppercase tracking-widest p-3 rounded-xl ${msg.includes("❌") ? "bg-rose-50 text-rose-500" : "bg-emerald-50 text-emerald-600"}`}>
                    {msg}
                </p>
            )}
        </div>
    )
}