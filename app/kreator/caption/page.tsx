import CaptionGenerator from '@/components/kreator/CaptionGenerator'
import type { Metadata } from 'next'
import Link from 'next/link'
import { PenTool, Sparkles, MessageSquare, HelpCircle, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
    title: 'Generator Caption Konten Kreator (IG, TikTok, FB) | My Tools',
    description: 'Generator caption otomatis untuk Instagram Reels, TikTok, Facebook Reels, dan YouTube Shorts. Buat caption menarik dengan hook dan CTA secara instan.',
    alternates: { canonical: 'https://mytools.web.id/kreator/caption' }
}

export default function CaptionPage() {
    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            {/* HERO SECTION - Dark Mesh Design */}
            <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-44">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-30">
                    <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-900/40 blur-[100px] rounded-full" />
                    <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-purple-900/30 blur-[100px] rounded-full" />
                </div>

                <div className="relative max-w-7xl mx-auto px-6">
                    <div className="flex flex-col items-start gap-4 md:gap-6">
                        <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-purple-400 rounded-full backdrop-blur-md">
                            Engagement Booster
                        </span>

                        <h1 className="text-4xl md:text-7xl font-black text-white italic tracking-tighter leading-none uppercase">
                            Caption <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-indigo-400">Generator</span>
                        </h1>

                        <p className="max-w-2xl text-zinc-400 text-base md:text-lg font-medium leading-relaxed">
                            Ubah ide menjadi kata-kata yang memikat. Buat caption dengan
                            <span className="text-white"> Hook</span>,
                            <span className="text-white"> Story</span>, dan
                            <span className="text-white"> CTA</span> yang mengonversi audiens Anda.
                        </p>
                    </div>
                </div>
            </header>

            {/* MAIN CONTENT - Overlap Card */}
            <main className="max-w-5xl mx-auto px-4 md:px-6 -mt-12 md:-mt-24 relative z-10">
                <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-6 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">

                    {/* TOOL SECTION */}
                    <section className="mb-20">
                        <div className="flex items-center gap-3 mb-8 ml-2">
                            <div className="p-2 bg-purple-100 rounded-xl text-purple-600">
                                <PenTool className="w-5 h-5" />
                            </div>
                            <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Creative Studio</h2>
                        </div>

                        <div className="bg-zinc-50/50 rounded-[2rem] p-4 md:p-10 border border-zinc-100">
                            <CaptionGenerator />
                        </div>
                    </section>

                    {/* SEO & FAQ CONTENT */}
                    <div className="grid md:grid-cols-2 gap-12 border-t border-zinc-100 pt-16">
                        <div className="space-y-8">
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-purple-600 font-black text-[10px] uppercase tracking-widest">
                                    <Sparkles className="w-4 h-4" /> Copywriting Strategy
                                </div>
                                <h2 className="text-3xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none text-justify">Pentingnya <br />Sebuah Caption</h2>
                                <p className="text-zinc-500 text-sm leading-relaxed text-justify italic font-medium">
                                    Visual memancing mata, tapi caption memenangkan hati. Caption yang baik adalah jembatan antara konten Anda dengan tindakan audiens (Like, Save, Share).
                                </p>
                            </div>

                            <div className="bg-zinc-50 rounded-3xl p-6 border border-zinc-100 space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Tools Pendukung</h3>
                                <div className="grid gap-3">
                                    {['hashtag', 'income'].map((item) => (
                                        <Link key={item} href={`/kreator/${item}`} className="flex items-center justify-between p-3 bg-white rounded-xl border border-zinc-200/50 hover:border-purple-300 transition-all group shadow-sm">
                                            <span className="text-xs font-black uppercase italic tracking-tighter text-zinc-600">Generator {item}</span>
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
                                    { q: "Bisa langsung pakai?", a: "Ya. Namun kami menyarankan untuk melakukan sedikit tweak agar sesuai dengan personal brand Anda." },
                                    { q: "Platform apa saja?", a: "Optimasi khusus untuk Instagram, TikTok, Facebook Reels, dan YouTube Shorts." },
                                    { q: "Gratis selamanya?", a: "100% Gratis tanpa perlu berlangganan AI mahal. Gunakan kapan saja sepuasnya." }
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

            {/* SCHEMA */}
            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'WebApplication',
                    name: 'Generator Caption Konten Kreator',
                    url: 'https://mytools.web.id/kreator/caption',
                    applicationCategory: 'SocialMediaApplication',
                    operatingSystem: 'All'
                })
            }} />
        </div>
    )
}