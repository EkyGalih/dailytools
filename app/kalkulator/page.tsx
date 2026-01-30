import type { Metadata } from 'next'
import Link from 'next/link'
import {
    Wallet, Moon, ReceiptText, Banknote,
    Calculator, Home, Gift, ArrowUpRight,
    ShieldCheck, TrendingUp
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Kumpulan Kalkulator Finansial Online Gratis | My Tools',
    description: 'Akses berbagai kalkulator finansial: THR, PPh 21, Zakat, Gaji Bersih, Cicilan, dan KPR. Solusi cerdas untuk perencanaan keuangan Anda.',
    alternates: { canonical: 'https://mytools.web.id/kalkulator' }
}

const calculators = [
    {
        title: 'Kalkulator THR',
        desc: 'Hitung Tunjangan Hari Raya berdasarkan gaji dan masa kerja.',
        href: '/kalkulator/thr',
        tag: 'Gaji',
        icon: Gift,
        color: 'bg-rose-50 text-rose-600',
    },
    {
        title: 'Zakat Penghasilan',
        desc: 'Hitung zakat profesi bulanan sesuai nisab harga emas terbaru.',
        href: '/kalkulator/zakat',
        tag: 'Zakat',
        icon: Banknote,
        color: 'bg-amber-50 text-amber-600',
    },
    {
        title: 'Zakat Fitrah',
        desc: 'Hitung zakat fitrah jiwa berdasarkan harga beras lokal.',
        href: '/kalkulator/zakat-fitrah',
        tag: 'Zakat',
        icon: Moon,
        color: 'bg-emerald-50 text-emerald-600',
    },
    {
        title: 'Kalkulator PPh 21',
        desc: 'Estimasi pajak penghasilan karyawan dengan tarif progresif.',
        href: '/kalkulator/pph21',
        tag: 'Pajak',
        icon: ReceiptText,
        color: 'bg-indigo-50 text-indigo-600',
    },
    {
        title: 'Gaji Bersih (THP)',
        desc: 'Hitung gaji bersih setelah potongan pajak dan iuran BPJS.',
        href: '/kalkulator/take-home-pay',
        tag: 'Gaji',
        icon: Wallet,
        color: 'bg-blue-50 text-blue-600',
    },
    {
        title: 'Simulasi Cicilan',
        desc: 'Hitung cicilan motor, mobil, dan barang dengan bunga flat/anuitas.',
        href: '/kalkulator/cicilan',
        tag: 'Kredit',
        icon: Calculator,
        color: 'bg-zinc-100 text-zinc-600',
    },
    {
        title: 'Simulasi KPR',
        desc: 'Simulasi cicilan rumah dengan skema bunga fixed & floating.',
        href: '/kalkulator/kpr',
        tag: 'Properti',
        icon: Home,
        color: 'bg-purple-50 text-purple-600',
    },
]

export default function FinancialCalculatorPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Dark Mesh Design */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                {/* Optimized Mesh Gradient */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[100px] rounded-full transform-gpu will-change-transform" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-900/30 blur-[100px] rounded-full transform-gpu will-change-transform" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-indigo-400 rounded-full backdrop-blur-md">
                            Financial Control Center
                        </span>

                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Finance <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Suite</span>
                        </h1>

                        <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
                            Kelola finansial Anda dengan presisi. Kumpulan kalkulator cerdas untuk
                            <span className="text-white font-bold"> Gaji</span>,
                            <span className="text-white font-bold"> Pajak</span>, dan
                            <span className="text-white font-bold"> Investasi</span> masa depan Anda.
                        </p>
                    </div>
                </div>
            </header>

            {/* MAIN GRID - Overlap Style */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 md:-mt-24 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {calculators.map((it) => (
                        <article
                            key={it.href}
                            className="group relative bg-white border border-zinc-100 rounded-[2rem] p-8 hover:border-indigo-500/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Decorative Glow */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-zinc-50 rounded-full group-hover:bg-indigo-50 transition-colors duration-500 -z-10" />

                            <Link href={it.href} className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-6">
                                    <div className={`p-3 rounded-2xl ${it.color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                                        <it.icon className="w-6 h-6" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-indigo-400 transition-colors">
                                        {it.tag}
                                    </span>
                                </div>

                                <h2 className="text-xl font-black italic uppercase tracking-tighter text-zinc-900 group-hover:text-indigo-600 transition-colors leading-tight">
                                    {it.title}
                                </h2>

                                <p className="mt-3 text-sm text-zinc-500 leading-relaxed font-medium">
                                    {it.desc}
                                </p>

                                <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                                        Open Calculator <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* SEO CONTENT SECTION */}
                <section className="mt-20 bg-white rounded-[2.5rem] md:rounded-[40px] p-8 md:p-16 border border-zinc-100">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                                <TrendingUp className="w-4 h-4" /> Smart Planning
                            </div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Keputusan Finansial <br />Lebih Percaya Diri</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed text-justify italic font-medium">
                                Perencanaan keuangan yang matang dimulai dari data yang akurat. Kalkulator finansial kami dirancang untuk membantu Anda memproyeksikan pengeluaran dan pendapatan dengan cepat.
                            </p>
                        </div>

                        <div className="space-y-8">
                            <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4" /> Why Choose My Tools?
                            </div>
                            <div className="grid gap-6">
                                {[
                                    { t: "Akurasi Syariah & Pajak", d: "Perhitungan zakat dan PPh 21 disesuaikan dengan regulasi terbaru tahun 2026." },
                                    { t: "Privasi Terjamin", d: "Semua perhitungan dilakukan di sisi klien. Data finansial Anda tidak pernah disimpan di server kami." },
                                    { t: "Simulasi Progresif", d: "Mendukung simulasi bunga bank (anuitas) dan leasing (flat) secara berdampingan." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-1 h-12 bg-zinc-100 rounded-full overflow-hidden shrink-0">
                                            <div className="w-full h-1/2 bg-indigo-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black italic uppercase tracking-tighter text-zinc-900">{item.t}</h3>
                                            <p className="text-xs text-zinc-500 mt-1">{item.d}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            {/* STRUCTURED DATA */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: 'Kumpulan Kalkulator Finansial',
                    url: 'https://mytools.web.id/kalkulator',
                    description: 'Kumpulan alat bantu finansial online gratis untuk perhitungan pajak, gaji, dan investasi.'
                })
            }} />
        </div>
    )
}