import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import TakeHomePayCalculator from '@/components/kalkulator/TakeHomePayCalculator'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'
import { Wallet, TrendingUp, ShieldCheck, ArrowRight, HelpCircle, Zap } from 'lucide-react'
import { Suspense } from 'react'

export const metadata: Metadata = {
    title: 'Kalkulator Gaji Bersih (Take Home Pay) Online 2026 | My Tools',
    description: 'Hitung gaji bersih (take home pay) setelah potongan PPh 21 dan BPJS secara akurat. Gratis, cepat, dan sesuai regulasi pajak terbaru.',
    alternates: { canonical: 'https://mytools.web.id/kalkulator/thp' }
}

export default function TakeHomePayPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Dark Mesh Design */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-blue-900/30 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/20 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-blue-400 rounded-full backdrop-blur-md">
                            Payroll Optimization
                        </span>
                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Take Home <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Pay</span>
                        </h1>
                        <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
                            Berapa gaji yang benar-benar masuk ke kantong Anda? Hitung estimasi
                            <span className="text-white font-bold"> Gaji Bersih</span> setelah potongan pajak dan BPJS secara presisi.
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
                                <div className="p-2 bg-blue-50 rounded-xl text-blue-600">
                                    <Wallet className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Net Salary Calculator</h2>
                            </div>
                            <Suspense fallback={<p className="text-sm text-zinc-400">Loading calculator...</p>}>
                                <TakeHomePayCalculator />
                            </Suspense>
                        </div>

                        {/* SEO CONTENT CARD */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-zinc-100 space-y-12">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                                        <TrendingUp className="w-4 h-4" /> Financial Literacy
                                    </div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Tentang THP</h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed text-justify italic">
                                        Take Home Pay adalah pendapatan bersih karyawan yang diterima setiap bulan setelah dikurangi PPh 21, iuran BPJS Kesehatan (1%), dan BPJS Ketenagakerjaan (2% JHT).
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4" /> Compliance
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Potongan Lainnya</h3>
                                    <div className="grid gap-3">
                                        <Link href="/kalkulator/pph21" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-blue-300 transition-all group shadow-sm">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Hitung Pajak PPh 21</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-1" />
                                        </Link>
                                        <Link href="/kalkulator/thr" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-blue-300 transition-all group shadow-sm">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Estimasi Bonus THR</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-blue-600 group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR */}
                    <aside className="space-y-8">
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2">
                                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" /> Market Pulse
                            </h4>
                            <MarketInfo />
                        </div>
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Stock Momentum</h4>
                            <MarketStockTrend />
                        </div>
                    </aside>
                </div>
            </main>

            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    name: 'Kalkulator Gaji Bersih (Take Home Pay)',
                    url: 'https://mytools.web.id/kalkulator/thp',
                    applicationCategory: 'FinanceApplication',
                    operatingSystem: 'All'
                })
            }} />
        </div>
    )
}