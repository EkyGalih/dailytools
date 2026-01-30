import type { Metadata } from 'next'
import InstallmentCalculator from '@/components/kalkulator/InstallmentCalculator'
import MarketInfo from '@/components/MarketInfo'
import MarketStockTrend from '@/components/MarketStockComponent'
import Link from 'next/link'
import { Calculator, TrendingUp, ShieldCheck, ArrowRight, Info } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Kalkulator Cicilan Motor & Mobil Online (Flat & Anuitas) | My Tools',
    description: 'Hitung simulasi cicilan motor dan mobil secara akurat dengan metode Flat dan Anuitas. Gratis, mudah, dan mobile-friendly.',
    alternates: { canonical: 'https://mytools.web.id/kalkulator/cicilan' }
}

export default function CicilanPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Dark Mesh */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-purple-400 rounded-full backdrop-blur-md">
                            Finance Management Tool
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Credit <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Simulator</span>
                        </h1>
                        <p className="max-w-2xl text-zinc-400 text-base md:text-lg font-medium leading-relaxed">
                            Simulasi kredit kendaraan impian Anda. Bandingkan metode
                            <span className="text-white font-bold"> Flat (Leasing)</span> dan
                            <span className="text-white font-bold"> Anuitas (Bank)</span> dalam hitungan detik.
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
                                <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
                                    <Calculator className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Installment Calculator</h2>
                            </div>
                            <InstallmentCalculator />
                        </div>

                        {/* SEO CONTENT CARD */}
                        <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-zinc-100 space-y-8">
                            <div className="grid md:grid-cols-2 gap-10">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                        <TrendingUp className="w-4 h-4" /> Financial Insight
                                    </div>
                                    <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Flat vs Anuitas</h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed text-justify">
                                        Metode <strong>Flat</strong> biasanya digunakan untuk kredit motor/mobil (Leasing) di mana bunga dihitung dari plafon awal. Sementara <strong>Anuitas</strong> sering digunakan Bank, di mana porsi bunga mengecil seiring berjalannya waktu.
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                        <ShieldCheck className="w-4 h-4" /> Smart Decision
                                    </div>
                                    <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Tools Pendukung</h3>
                                    <div className="grid gap-3">
                                        <Link href="/kalkulator/take-home-pay" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-purple-300 transition-all group">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Hitung Gaji Bersih (THP)</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-purple-600 group-hover:translate-x-1" />
                                        </Link>
                                        <Link href="/kalkulator/pph21" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-purple-300 transition-all group">
                                            <span className="text-[10px] font-black uppercase italic text-zinc-600">Estimasi Pajak PPh 21</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-purple-600 group-hover:translate-x-1" />
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
                                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Market Info
                            </h4>
                            <MarketInfo />
                        </div>
                        <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
                            <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">Stock Trends</h4>
                            <MarketStockTrend />
                        </div>
                    </aside>
                </div>
            </main>

            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    name: 'Kalkulator Cicilan Motor & Mobil Online',
                    url: 'https://mytools.web.id/kalkulator/cicilan',
                    applicationCategory: 'FinanceApplication',
                    operatingSystem: 'All'
                })
            }} />
        </div>
    )
}