import type { Metadata } from 'next'
import CreatorToolsGrid from '@/components/kreator/CreatorToolsGrid'
import Link from 'next/link'
import { Sparkles, LayoutGrid, Info, ArrowRight, ShieldCheck } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Tools Konten Kreator Online Gratis (YouTube, TikTok, IG, FB) | My Tools',
    description: 'Kumpulan tools gratis untuk optimasi konten: kalkulator penghasilan, generator hashtag, caption, dan estimasi video. Tingkatkan performa konten Anda sekarang.',
    alternates: { canonical: 'https://mytools.web.id/kreator' }
}

export default function CreatorHubPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Dark Mesh Design */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
                {/* Mesh Gradient Effect */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-center text-center gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-purple-400 rounded-full backdrop-blur-md">
                            All-in-One Creator Suite
                        </span>

                        <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Creator <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Hub</span>
                        </h1>

                        <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
                            Ekosistem tools gratis untuk mempercepat workflow Anda. Optimalkan
                            <span className="text-white"> Engagement</span>, hitung
                            <span className="text-white"> Revenue</span>, dan bangun
                            <span className="text-white"> Brand</span> Anda di satu tempat.
                        </p>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT - Overlap Grid */}
            <main className="max-w-6xl mx-auto px-4 md:px-6 -mt-12 md:-mt-24 relative z-10">

                {/* GRID TOOLS */}
                <section aria-labelledby="creator-tools" className="mb-20">
                    <h2 id="creator-tools" className="sr-only">Daftar Tools Konten Kreator</h2>
                    <CreatorToolsGrid />
                </section>

                {/* SEO CONTENT & FOOTER INFO */}
                <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-8 md:p-16 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">
                    <div className="grid md:grid-cols-2 gap-12 lg:gap-20">

                        {/* SEO Educational */}
                        <div className="space-y-6">
                            <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                <Sparkles className="w-4 h-4" /> Professional Ecosystem
                            </div>
                            <h2 className="text-3xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Strategi Konten <br />Berbasis Data</h2>
                            <p className="text-zinc-500 text-sm leading-relaxed text-justify italic font-medium">
                                Menjadi kreator bukan hanya soal upload video, tapi soal presisi. Kami menyediakan data instan agar Anda bisa fokus pada satu hal: <strong>Menciptakan Karya.</strong>
                            </p>
                            <p className="text-zinc-500 text-sm leading-relaxed text-justify">
                                My Tools menghadirkan kumpulan alat bantu seperti <Link href="/kreator/income" className="text-purple-600 font-bold hover:underline">kalkulator penghasilan</Link>, generator hashtag, hingga clipper video yang dirancang ringan dan siap pakai di perangkat mobile manapun.
                            </p>
                        </div>

                        {/* Features List */}
                        <div className="space-y-8">
                            <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                <ShieldCheck className="w-4 h-4" /> Why My Tools?
                            </div>

                            <div className="grid gap-6">
                                {[
                                    { t: "Tanpa Registrasi", d: "Langsung pakai semua tool tanpa perlu login atau memberikan data pribadi." },
                                    { t: "Mobile Optimized", d: "Desain yang sangat responsif, nyaman digunakan meski lewat browser HP." },
                                    { t: "Update Berkala", d: "Data RPM dan algoritma hashtag disesuaikan dengan tren terbaru 2026." }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="w-1 h-12 bg-zinc-100 rounded-full overflow-hidden">
                                            <div className="w-full h-1/2 bg-purple-600" />
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
                </div>
            </main>

            {/* SCHEMA */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'CollectionPage',
                    name: 'Tools Konten Kreator Multi Platform',
                    description: 'Kumpulan tools online gratis untuk konten kreator multi platform.',
                    url: 'https://mytools.web.id/kreator'
                })
            }} />
        </div>
    )
}