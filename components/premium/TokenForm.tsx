"use client"

import { useEffect, useState } from "react"
import { KeyRound, LogOut, Loader2, CheckCircle2, Zap } from "lucide-react"
import { getDeviceId } from "@/libs/device"

export default function TokenForm({ onSuccess }: { onSuccess?: () => void }) {
    const [token, setToken] = useState("")
    const [msg, setMsg] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const [savedToken, setSavedToken] = useState<string | null>(null)

    useEffect(() => {
        const t = localStorage.getItem("premium_token")
        if (t) setSavedToken(t)
    }, [])

    async function logout() {
        setIsLoading(true)

        const token = localStorage.getItem("premium_token")
        const deviceId = getDeviceId()

        try {
            await fetch("/api/token/logout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, deviceId }),
            })

            localStorage.removeItem("premium_token")

            setSavedToken(null)
            setMsg("Sesi berakhir. Kembali ke mode Free.")

            window.dispatchEvent(new Event("premium_updated"))
        } finally {
            setIsLoading(false)
        }
    }

    async function submit() {
        if (!token.trim()) return

        setIsLoading(true)

        const deviceId = getDeviceId()

        try {
            const res = await fetch("/api/token/redeem", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, deviceId }),
            })

            const json = await res.json()

            if (json.success) {
                localStorage.setItem("premium_token", token)
                setSavedToken(token)

                setMsg("✅ Premium Aktif s/d " + json.expires_at)

                window.dispatchEvent(new Event("premium_updated"))

                setTimeout(() => onSuccess?.(), 1500)
            } else {
                setMsg("❌ " + json.error)
            }
        } finally {
            setIsLoading(false)
        }
    }

    if (savedToken) {
        return (
            <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500">
                <div className="bg-gradient-to-br from-emerald-400/10 to-cyan-400/10 border-2 border-emerald-500/20 rounded-[2rem] p-8 text-center backdrop-blur-sm">
                    <div className="w-16 h-16 bg-gradient-to-tr from-emerald-500 to-teal-400 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/30 rotate-3">
                        <CheckCircle2 size={32} />
                    </div>
                    <h3 className="text-emerald-600 font-black uppercase tracking-[0.2em] text-xs">Membership Active</h3>
                    <p className="text-zinc-500 text-[10px] font-bold uppercase mt-1 italic">{msg || "Nimati premium hingga " + savedToken.split(".")[1] + "."}</p>
                </div>

                <button
                    onClick={logout}
                    disabled={isLoading}
                    className={`w-full py-4 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em]
    transition-all duration-300 flex items-center justify-center gap-2
    ${isLoading
                            ? "bg-zinc-100 text-zinc-300 cursor-not-allowed"
                            : "text-zinc-400 hover:text-rose-500 hover:bg-rose-50"
                        }`}
                >
                    {isLoading ? (
                        <>
                            <Loader2 size={14} className="animate-spin" />
                            Logging out...
                        </>
                    ) : (
                        <>
                            <LogOut size={14} />
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