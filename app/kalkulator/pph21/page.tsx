import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import Pph21Calculator from '@/components/kalkulator/Pph21Calculator'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'
import { ShieldCheck, TrendingUp, HelpCircle, ArrowRight, Zap } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Kalkulator PPh 21 Online 2026 – Hitung Pajak Penghasilan | My Tools',
    description: 'Hitung estimasi PPh 21 karyawan berdasarkan gaji dan status PTKP terbaru. Akurat, gratis, dan sesuai tarif pajak progresif Indonesia.',
    alternates: { canonical: 'https://mytools.web.id/kalkulator/pph21' }
}

export default function Pph21Page() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Dark Mesh Design */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-indigo-400 rounded-full backdrop-blur-md">
                            Tax Compliance Tool
                        </span>
                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            PPh 21 <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Calculator</span>
                        </h1>
                        <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
                            Hitung kewajiban pajak Anda secara transparan. Simulasi pajak progresif berdasarkan
                            <span className="text-white font-bold"> Penghasilan Kena Pajak (PKP)</span> dan
                            <span className="text-white font-bold"> Status PTKP</span> terbaru.
                        </p>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT - Overlap Grid */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 md:-mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* CALCULATOR AREA */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">
                            <div className="flex items-center gap-3 mb-8 ml-2">
                                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                    <ShieldCheck className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Tax Estimation</h2>
                            </div>
                            <Pph21Calculator />
                        </div>

                        {/* SEO CONTENT CARD */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-zinc-100 space-y-12">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                                        <TrendingUp className="w-4 h-4" /> Dasar Perpajakan
                                    </div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Cara Hitung PPh</h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed text-justify italic">
                                        PPh 21 dihitung dari penghasilan bruto setahun dikurangi Biaya Jabatan (maks. 6jt) dan PTKP. Sisanya disebut PKP, yang dikenakan tarif progresif mulai dari 5%.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                        <Zap className="w-4 h-4" /> Next Step
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Gaji Bersih</h3>
                                    <div className="grid gap-3">
                                        <Link href="/kalkulator/take-home-pay" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-indigo-300 transition-all group shadow-sm">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Hitung Take Home Pay (THP)</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-indigo-600 group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ SECTION */}
                            <div className="pt-10 border-t border-zinc-50">
                                <div className="flex items-center gap-2 mb-8">
                                    <HelpCircle className="w-5 h-5 text-indigo-600" />
                                    <h3 className="text-lg font-black uppercase italic tracking-tighter">Pertanyaan Umum</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { q: "Apa itu PTKP?", a: "Penghasilan Tidak Kena Pajak adalah batas penghasilan yang tidak dikenakan pajak, tergantung status pernikahan." },
                                        { q: "PPh 21 ditarik bulanan?", a: "Ya, perusahaan biasanya memotong estimasi tahunan yang dibagi ke dalam 12 bulan pembayaran." }
                                    ].map((f, i) => (
                                        <div key={i} className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-white hover:border-indigo-200 transition-all">
                                            <h4 className="text-xs font-black uppercase tracking-tight text-zinc-900 mb-2">{f.q}</h4>
                                            <p className="text-[11px] leading-relaxed text-zinc-500">{f.a}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR AREA */}
                    <aside className="space-y-8">
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Live Market Info
                            </h4>
                            <MarketInfo />
                        </div>
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 uppercase">Global Economy</h4>
                            <MarketStockTrend />
                        </div>
                    </aside>
                </div>
            </main>
        </div>
    )
}