import CreatorIncomeCalculator from '@/components/kreator/CreatorIncomeCalculator'
import Link from 'next/link'
import type { Metadata } from 'next'
import { TrendingUp, HelpCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Kalkulator Penghasilan Konten Kreator (YouTube, FB, TikTok, IG) | My Tools',
    description: 'Hitung estimasi penghasilan konten kreator secara akurat berdasarkan views dan RPM. Tool wajib untuk kreator YouTube, TikTok, dan Reels.',
}

export default function CreatorIncomePage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-44">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-purple-400 rounded-full backdrop-blur-md">
                            Creator Monetization Tool
                        </span>
                        <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Income <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Calculator</span>
                        </h1>
                        <p className="max-w-2xl text-zinc-400 text-base md:text-lg font-medium leading-relaxed">
                            Berapa nilai konten Anda? Estimasi pendapatan dari YouTube, TikTok, dan Reels secara instan dan akurat.
                        </p>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT */}
            <main className="max-w-5xl mx-auto px-4 md:px-6 -mt-12 md:-mt-24 relative z-10">
                <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-6 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">

                    <section className="mb-20">
                        <div className="bg-zinc-50/50 rounded-[2rem] p-4 md:p-10 border border-zinc-100">
                            <CreatorIncomeCalculator />
                        </div>
                    </section>

                    <div className="grid md:grid-cols-2 gap-12 border-t border-zinc-100 pt-16">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest text-justify">
                                    <TrendingUp className="w-4 h-4" /> Insight Monetisasi
                                </div>
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Cara Menghitung <br />Penghasilan</h2>
                                <p className="text-zinc-500 text-sm leading-relaxed text-justify italic font-medium">
                                    Penghasilan dihitung berdasarkan RPM (Revenue per Mille), yaitu pendapatan bersih per 1.000 views setelah dipotong platform.
                                </p>
                            </div>
                            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Tools Lainnya</h3>
                                <div className="grid gap-3">
                                    {['hashtag', 'caption', 'video-size'].map((item) => (
                                        <Link key={item} href={`/kreator/${item}`} className="flex items-center justify-between p-3 bg-white rounded-xl border border-zinc-200/50 hover:border-purple-300 transition-all group">
                                            <span className="text-xs font-black uppercase italic tracking-tighter text-zinc-600">Generator {item.replace('-', ' ')}</span>
                                            <ArrowRight className="w-4 h-4 text-zinc-300 group-hover:text-purple-600 group-hover:translate-x-1 transition-all" />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                <HelpCircle className="w-4 h-4" /> FAQ Center
                            </div>
                            <div className="space-y-6">
                                {[
                                    { q: "Apakah ini akurat?", a: "Hasil bersifat estimasi berdasarkan rata-rata industri. Angka riil tergantung niche dan lokasi audiens." },
                                    { q: "Beda RPM vs CPM?", a: "CPM adalah biaya iklan dari pengiklan, RPM adalah uang bersih yang Anda terima (Take-home pay)." }
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

            {/* JSON-LD SCHEMAS */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    name: 'Kalkulator Penghasilan Konten Kreator',
                    url: 'https://mytools.web.id/kreator/income',
                    applicationCategory: 'FinanceApplication',
                    operatingSystem: 'All'
                })
            }} />
        </div>
    )
}