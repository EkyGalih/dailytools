import type { Metadata } from 'next'
import Link from 'next/link'
import {
    Minimize2, Image as ImageIcon, FileText,
    Zap, ShieldCheck, ArrowUpRight, Sparkles,
    HardDrive, Cpu, Lock
} from 'lucide-react'

export const metadata: Metadata = {
    title: 'Kompres File Online Gratis (Gambar & PDF) | My Tools',
    description: 'Kumpulan tools kompresi file gratis: Perkecil ukuran Gambar dan PDF tanpa kehilangan kualitas. Proses 100% di browser, aman, dan tanpa upload.',
    alternates: { canonical: 'https://mytools.web.id/kompress' }
}

const compressTools = [
    {
        title: 'Kompres Gambar',
        desc: 'Perkecil ukuran JPG, PNG, atau WebP ke target 1MB - 5MB secara instan.',
        href: '/kompress/gambar',
        tag: 'Media',
        icon: ImageIcon,
        color: 'bg-blue-50 text-blue-600',
    },
    {
        title: 'Kompres PDF',
        desc: 'Optimasi ukuran dokumen PDF Anda untuk upload formulir atau email.',
        href: '/kompress/pdf',
        tag: 'Document',
        icon: FileText,
        color: 'bg-indigo-50 text-indigo-600',
    },
]

export default function KompressPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Dark Mesh Design */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                {/* Optimized Mesh Gradient - GPU Accelerated */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30 pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/40 blur-[100px] rounded-full transform-gpu will-change-transform" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/30 blur-[100px] rounded-full transform-gpu will-change-transform" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6 text-center md:text-left">
                    <div className="flex flex-col items-center md:items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-blue-400 rounded-full backdrop-blur-md flex items-center gap-2">
                            <Minimize2 className="w-3.5 h-3.5" /> File Optimization Hub
                        </span>

                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Compress <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">Tools</span>
                        </h1>

                        <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
                            Maksimalkan efisiensi file Anda. Perkecil ukuran
                            <span className="text-white font-bold"> Gambar</span> dan
                            <span className="text-white font-bold"> PDF</span> tanpa mengorbankan kualitas, diproses secara lokal dan aman.
                        </p>
                    </div>
                </div>
            </header>

            {/* MAIN GRID - Overlap Style */}
            <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 md:-mt-24 relative z-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 md:gap-8 max-w-4xl mx-auto">
                    {compressTools.map((it) => (
                        <article
                            key={it.href}
                            className="group relative bg-white border border-zinc-100 rounded-[2.5rem] p-8 md:p-10 hover:border-blue-500/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Decorative Glow */}
                            <div className="absolute -right-4 -top-4 w-24 h-24 bg-zinc-50 rounded-full group-hover:bg-blue-50 transition-colors duration-500 -z-10" />

                            <Link href={it.href} className="flex flex-col h-full">
                                <div className="flex items-center justify-between mb-8">
                                    <div className={`p-4 rounded-[1.25rem] ${it.color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                                        <it.icon className="w-7 h-7" />
                                    </div>
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-blue-500 transition-colors">
                                        {it.tag}
                                    </span>
                                </div>

                                <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 group-hover:text-blue-600 transition-colors leading-tight">
                                    {it.title}
                                </h2>

                                <p className="mt-3 text-sm text-zinc-500 leading-relaxed font-medium">
                                    {it.desc}
                                </p>

                                <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                                        Launch Optimizer <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                    </span>
                                </div>
                            </Link>
                        </article>
                    ))}
                </div>

                {/* SEO CONTENT SECTION */}
                <section className="mt-20 bg-white rounded-[2.5rem] md:rounded-[40px] p-8 md:p-16 border border-zinc-100 max-w-6xl mx-auto shadow-sm">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
                        {/* Technical Value */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-blue-600 font-black text-[10px] uppercase tracking-widest leading-none">
                                <Cpu className="w-4 h-4" /> local machine processing
                            </div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Mengapa Kompresi Lokal Lebih Baik?</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed text-justify italic font-medium">
                                My Tools menggunakan teknologi terbaru yang memproses file langsung di browser Anda. Ini berarti file tidak pernah meninggalkan komputer atau HP Anda, menjadikannya 100% pribadi dan sangat cepat.
                            </p>
                            <p className="text-zinc-500 text-sm leading-relaxed text-justify">
                                Ingin mengubah format file? Silakan jelajahi <Link href="/konverter" className="text-indigo-600 font-bold hover:underline">konverter file online</Link> kami untuk kebutuhan PNG, JPG, atau WebP lainnya.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest leading-none">
                                <Lock className="w-4 h-4" /> Privacy Standards
                            </div>
                            <div className="grid gap-6">
                                {[
                                    { t: "No Server Upload", d: "Data Anda adalah milik Anda. Kami tidak menyimpan, melihat, atau mengumpulkan file yang Anda kompres." },
                                    { t: "Zero Quality Loss", d: "Algoritma kami dirancang untuk membuang metadata yang tidak perlu sambil menjaga ketajaman visual." },
                                    { t: "Batch Optimized", d: "Proses banyak file sekaligus dalam satu kali klik. Efisiensi tinggi untuk workflow profesional." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-1 h-12 bg-zinc-100 rounded-full overflow-hidden shrink-0">
                                            <div className="w-full h-1/2 bg-blue-600" />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-black italic uppercase tracking-tighter text-zinc-900 leading-none">{item.t}</h3>
                                            <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">{item.d}</p>
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
                    name: 'Kompres File Online Gratis',
                    url: 'https://mytools.web.id/kompress',
                    description: 'Kumpulan tools kompresi file gambar dan PDF berbasis browser yang aman dan privat.'
                })
            }} />
        </div>
    )
}