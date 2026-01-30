import type { Metadata } from 'next'
import KprCalculator from '@/components/kalkulator/KprCalculator'
import Link from 'next/link'
import { Home, TrendingUp, ShieldCheck, ArrowRight, HelpCircle } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Kalkulator KPR Rumah Online (Fixed & Floating) | My Tools',
    description: 'Simulasi KPR rumah akurat dengan perhitungan bunga fixed dan floating. Ketahui estimasi cicilan bulanan dan jadwal angsuran secara lengkap.',
    alternates: { canonical: 'https://mytools.web.id/kalkulator/kpr' }
}

export default function KprPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Dark Mesh Design */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-purple-400 rounded-full backdrop-blur-md">
                            Property Finance Tool
                        </span>
                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Home <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Mortgage</span>
                        </h1>
                        <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
                            Simulasi hunian impian Anda. Hitung cicilan dengan skema bunga
                            <span className="text-white font-bold"> Fixed</span> dan
                            <span className="text-white font-bold"> Floating</span> secara transparan.
                        </p>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT - Overlap Card */}
            <main className="max-w-6xl mx-auto px-4 md:px-6 -mt-12 md:-mt-32 relative z-10">
                <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-6 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">

                    {/* CALCULATOR AREA */}
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-8 ml-2">
                            <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
                                <Home className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Mortgage Simulator</h2>
                        </div>

                        <div className="bg-zinc-50/50 rounded-[2rem] p-4 md:p-10 border border-zinc-100">
                            <KprCalculator />
                        </div>
                    </section>

                    {/* SEO & FAQ GRID */}
                    <div className="grid md:grid-cols-2 gap-12 border-t border-zinc-100 pt-16">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                    <TrendingUp className="w-4 h-4" /> Market Strategy
                                </div>
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Fixed vs Floating</h2>
                                <p className="text-zinc-500 text-sm leading-relaxed text-justify italic font-medium">
                                    Pahami risiko bunga. Bunga <strong>Fixed</strong> memberikan kepastian di awal tahun, sementara <strong>Floating</strong> mengikuti suku bunga acuan BI yang bisa menyebabkan cicilan melonjak.
                                </p>
                            </div>

                            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Cek Tools Finansial Lainnya</h3>
                                <Link href="/kalkulator/cicilan" className="flex items-center justify-between p-3 bg-white rounded-xl border border-zinc-200/50 hover:border-purple-300 transition-all group shadow-sm">
                                    <span className="text-xs font-black uppercase italic tracking-tighter text-zinc-600">Kalkulator Cicilan Motor/Mobil</span>
                                    <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                </Link>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                <HelpCircle className="w-4 h-4" /> FAQ KPR
                            </div>
                            <div className="space-y-6">
                                {[
                                    { q: "Apa itu anuitas KPR?", a: "Sistem pembayaran di mana jumlah cicilan bulanan tetap, namun porsi bunga mengecil dan pokok membesar seiring waktu." },
                                    { q: "Kapan bunga floating berlaku?", a: "Biasanya setelah masa fixed (1-5 tahun) berakhir, bunga akan menyesuaikan dengan suku bunga pasar." },
                                    { q: "Apakah hasil ini akurat?", a: "Hasil bersifat estimasi. Bank memiliki biaya provisi, asuransi, dan admin tambahan di luar bunga." }
                                ].map((faq, i) => (
                                    <div key={i} className="group border-b border-zinc-50 pb-6 last:border-0">
                                        <h3 className="text-sm font-black text-zinc-900 uppercase italic tracking-tighter mb-2 group-hover:text-purple-600 transition-colors">{faq.q}</h3>
                                        <p className="text-zinc-500 text-xs leading-relaxed">{faq.a}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}