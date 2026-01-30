import type { Metadata } from 'next'
import MarketInfo from '@/components/MarketInfo'
import ZakatCalculator from '@/components/kalkulator/ZakatCalculator'
import Link from 'next/link'
import MarketStockTrend from '@/components/MarketStockComponent'
import { Moon, Star, HeartHandshake, HelpCircle, ArrowRight, Zap, Info } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Kalkulator Zakat Penghasilan Online (Nisab 2026) | My Tools',
    description: 'Hitung zakat penghasilan Anda secara akurat berdasarkan nisab 85gr emas. Mudah, transparan, dan sesuai syariat Islam.',
    alternates: { canonical: 'https://mytools.web.id/kalkulator/zakat' }
}

export default function ZakatPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Spiritual Dark Mesh */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-amber-900/20 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-amber-400 rounded-full backdrop-blur-md flex items-center gap-2">
                            <Moon className="w-3 h-3" /> Syariah Finance Tool
                        </span>
                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase text-justify">
                            Zakat <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-600">Calculator</span>
                        </h1>
                        <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
                            Tunaikan kewajiban dengan presisi. Hitung zakat profesi Anda berdasarkan
                            <span className="text-white font-bold"> Harga Emas Real-time</span> dan
                            <span className="text-white font-bold"> Ketentuan Nisab</span> terbaru.
                        </p>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 md:-mt-32 relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* CALCULATOR AREA */}
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">
                            <div className="flex items-center gap-3 mb-8 ml-2">
                                <div className="p-2 bg-amber-50 rounded-xl text-amber-600">
                                    <HeartHandshake className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Al-Maal Calculation</h2>
                            </div>
                            <ZakatCalculator />
                        </div>

                        {/* SEO CONTENT CARD */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-zinc-100 space-y-12">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-amber-600 font-black text-[10px] uppercase tracking-widest">
                                        <Star className="w-4 h-4" /> Ketentuan Syariat
                                    </div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Nisab Zakat Profesi</h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed text-justify">
                                        Zakat penghasilan (profesi) diwajibkan jika pendapatan telah mencapai nisab senilai <strong>85 gram emas</strong> per tahun. Kadar zakat yang dikeluarkan adalah sebesar <strong>2,5%</strong> dari total penghasilan kotor.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                        <Zap className="w-4 h-4" /> Smart Navigation
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Kebutuhan Lainnya</h3>
                                    <div className="grid gap-3">
                                        <Link href="/kalkulator/zakat-fitrah" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-amber-300 transition-all group">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Hitung Zakat Fitrah</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-amber-600 group-hover:translate-x-1" />
                                        </Link>
                                        <Link href="/kalkulator/thr" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-amber-300 transition-all group">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Hitung Bonus THR</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-amber-600 group-hover:translate-x-1" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* SIDEBAR AREA */}
                    <aside className="space-y-8">
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2 leading-none">
                                <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" /> Gold & Market Data
                            </h4>
                            <MarketInfo />
                        </div>
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 leading-none">Global Trends</h4>
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
                    name: 'Kalkulator Zakat Penghasilan Online',
                    url: 'https://mytools.web.id/kalkulator/zakat',
                    applicationCategory: 'FinanceApplication',
                    operatingSystem: 'All'
                })
            }} />
        </div>
    )
}