import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import FidyaCalculator from '@/components/kalkulator/FidyaCalculator'
import Link from 'next/link'
import { HeartHandshake, Utensils, Info, ArrowRight, HelpCircle, ShieldCheck, Zap } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Kalkulator Fidya Puasa Online 2026 | My Tools',
    description: 'Hitung estimasi fidya puasa berdasarkan jumlah hari yang ditinggalkan dan biaya makan lokal. Mudah, akurat, dan sesuai ketentuan syariat.',
    alternates: { canonical: 'https://mytools.web.id/kalkulator/fidya' }
}

export default function FidyaPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Optimized Mesh Design */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                {/* Mesh Gradient Effect - Performance Optimized */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/40 blur-[80px] rounded-full transform-gpu will-change-transform" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-orange-900/20 blur-[80px] rounded-full transform-gpu will-change-transform" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-indigo-400 rounded-full backdrop-blur-md">
                            Ramadan Support Tool
                        </span>
                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Fidya <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-orange-400">Calculator</span>
                        </h1>
                        <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
                            Tunaikan fidyah dengan perhitungan tepat. Estimasi biaya berdasarkan
                            <span className="text-white font-bold"> Frekuensi Puasa</span> dan
                            <span className="text-white font-bold"> Standar Makan</span> harian Anda.
                        </p>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT - Overlap Card */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 md:-mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* CALCULATOR AREA */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">
                            <div className="flex items-center gap-3 mb-8 ml-2">
                                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                                    <HeartHandshake className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Provision Tool</h2>
                            </div>
                            <FidyaCalculator />
                        </div>

                        {/* SEO CONTENT CARD */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-zinc-100 space-y-12 text-justify">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4" /> Ketentuan Fidyah
                                    </div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Apa itu Fidyah?</h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed italic">
                                        Fidyah adalah denda yang wajib dibayar oleh orang yang tidak mampu berpuasa karena alasan syar'i seperti sakit menahun atau lanjut usia.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-orange-600 font-black text-[10px] uppercase tracking-widest">
                                        <Zap className="w-4 h-4" /> Smart Links
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Tunaikan Zakat</h3>
                                    <div className="grid gap-3">
                                        <Link href="/kalkulator/zakat" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-indigo-300 transition-all group">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Zakat Penghasilan</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-indigo-600 group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR AREA */}
                    <aside className="space-y-8">
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" /> Market Context
                            </h4>
                            <MarketInfo />
                        </div>
                    </aside>
                </div>
            </main>

            {/* SCHEMA DATA */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    name: 'Kalkulator Fidya Puasa Online',
                    url: 'https://mytools.web.id/kalkulator/fidya',
                    applicationCategory: 'FinanceApplication',
                    operatingSystem: 'All'
                })
            }} />
        </div>
    )
}