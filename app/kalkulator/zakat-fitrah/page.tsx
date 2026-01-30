import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import ZakatFitrahCalculator from '@/components/kalkulator/ZakatFitrahCalculator'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'
import { Moon, Wheat, Users, ArrowRight, HelpCircle, ShieldCheck, Zap } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Kalkulator Zakat Fitrah Online 2026 (Beras & Uang) | My Tools',
    description: 'Hitung zakat fitrah Anda dan keluarga secara akurat berdasarkan jumlah jiwa dan harga beras terbaru. Mudah, cepat, dan sesuai syariat.',
    alternates: { canonical: 'https://mytools.web.id/kalkulator/zakat-fitrah' }
}

export default function ZakatFitrahPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Emerald Dark Mesh */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-emerald-900/30 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-amber-900/20 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center md:items-start gap-4 md:gap-6 text-center md:text-left">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-emerald-400 rounded-full backdrop-blur-md flex items-center gap-2">
                            <Moon className="w-3 h-3" /> Ramadan Essentials
                        </span>
                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Zakat <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Fitrah</span>
                        </h1>
                        <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
                            Sucikan jiwa dan sempurnakan ibadah. Hitung kewajiban zakat fitrah untuk
                            <span className="text-white font-bold"> Diri Sendiri</span> dan
                            <span className="text-white font-bold"> Keluarga</span> secara instan.
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
                                <div className="p-2 bg-emerald-50 rounded-xl text-emerald-600">
                                    <Wheat className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Purification Tools</h2>
                            </div>
                            <ZakatFitrahCalculator />
                        </div>

                        {/* SEO CONTENT CARD */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-zinc-100 space-y-12">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4" /> Syariat Islam
                                    </div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Tentang Zakat Fitrah</h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed text-justify italic">
                                        Zakat fitrah wajib ditunaikan setiap Muslim yang mampu sebelum shalat Idul Fitri. Besaran standarnya adalah <strong>2,5 kg</strong> atau <strong>3,5 liter</strong> beras berkualitas baik per jiwa.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-widest">
                                        <Zap className="w-4 h-4" /> Quick Links
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Zakat Lainnya</h3>
                                    <div className="grid gap-3">
                                        <Link href="/kalkulator/zakat" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-emerald-300 transition-all group">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Zakat Penghasilan</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-600 group-hover:translate-x-1" />
                                        </Link>
                                        <Link href="/kalkulator/thr" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-emerald-300 transition-all group">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Hitung THR 2026</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-emerald-600 group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>

                            {/* FAQ SECTION */}
                            <div className="pt-10 border-t border-zinc-50">
                                <div className="flex items-center gap-2 mb-8">
                                    <HelpCircle className="w-5 h-5 text-emerald-600" />
                                    <h3 className="text-lg font-black uppercase italic tracking-tighter">Pertanyaan Umum</h3>
                                </div>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {[
                                        { q: "Boleh pakai uang?", a: "Boleh, selama nilainya setara dengan harga beras yang dikonsumsi (umumnya 2,5kg)." },
                                        { q: "Kapan batas akhirnya?", a: "Wajib ditunaikan sebelum khatib naik mimbar pada shalat Idul Fitri." }
                                    ].map((f, i) => (
                                        <div key={i} className="p-5 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-white hover:border-emerald-200 transition-all">
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
                                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> Market Update
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

            {/* SCHEMA DATA */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    name: 'Kalkulator Zakat Fitrah Online',
                    url: 'https://mytools.web.id/kalkulator/zakat-fitrah',
                    applicationCategory: 'FinanceApplication',
                    operatingSystem: 'All'
                })
            }} />
        </div>
    )
}