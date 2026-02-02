"use client"

import { useRouter } from "next/navigation"
import TokenForm from "@/components/premium/TokenForm"
import { Crown, Sparkles, Star } from "lucide-react"

export default function PremiumPage() {
    const router = useRouter()

    function handleSuccess() {
        const last = sessionStorage.getItem("last_page") || "/"
        router.push(last)
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-white px-6 relative overflow-hidden">

            {/* --- CERAH & VIBRANT BACKGROUND DECOR --- */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-100/50 blur-[120px] rounded-full" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-pink-100/50 blur-[120px] rounded-full" />
                <div className="absolute top-[20%] right-[10%] w-[40%] h-[40%] bg-amber-50/50 blur-[100px] rounded-full" />
            </div>

            <div className="max-w-md w-full relative z-10">
                <div className="bg-white/70 backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] shadow-[0_40px_100px_-20px_rgba(79,70,229,0.15)] border border-white">

                    {/* Floating Icon */}
                    <div className="text-center mb-10">
                        <div className="relative inline-block">
                            <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 animate-pulse" />
                            <div className="relative w-24 h-24 bg-gradient-to-tr from-indigo-600 to-pink-500 text-white rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-indigo-500/40">
                                <Crown size={48} fill="currentColor" className="drop-shadow-lg" />
                            </div>
                            <div className="absolute -top-2 -right-2 bg-amber-400 text-white p-2 rounded-full shadow-lg">
                                <Star size={16} fill="currentColor" />
                            </div>
                        </div>

                        <h1 className="text-4xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none mb-4">
                            Premium <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-pink-500">Access</span>
                        </h1>
                        <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.2em] leading-relaxed">
                            Buka semua konten eksklusif <br /> & nikmati kualitas terbaik.
                        </p>
                    </div>

                    <TokenForm onSuccess={handleSuccess} />

                    <div className="mt-12 flex items-center justify-center gap-4 opacity-30 italic">
                        <div className="h-px w-8 bg-zinc-300" />
                        <Sparkles size={16} className="text-zinc-400" />
                        <div className="h-px w-8 bg-zinc-300" />
                    </div>
                </div>

                {/* Visual SEO/Trust Badge */}
                <p className="text-center mt-8 text-[9px] font-black text-zinc-300 uppercase tracking-[0.3em]">
                    Securely Verified by My Tools • 2026
                </p>
            </div>
        </main>
    )
}