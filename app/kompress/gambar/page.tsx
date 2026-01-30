import type { Metadata } from 'next'
import ImageSizeCompressor from '@/components/konverter/ImageSizeCompressor'
import MarketInfo from '@/components/MarketInfo'
import MarketStockTrend from '@/components/MarketStockComponent'
import Link from 'next/link'
import { Image as ImageIcon, Zap, ShieldCheck, ArrowRight, Info, Settings } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kompres Gambar ke 1MB, 2MB, 5MB Online | My Tools',
  description: 'Perkecil ukuran JPG, PNG, WebP ke target 1MB, 2MB, atau 5MB secara instan. Proses 100% di browser, privasi terjaga tanpa upload ke server.',
  alternates: { canonical: 'https://mytools.web.id/konverter/image-compress' }
}

export default function ImageCompressPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* HERO SECTION - Optimized Dark Mesh */}
      <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/40 blur-[80px] rounded-full transform-gpu will-change-transform" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/30 blur-[80px] rounded-full transform-gpu will-change-transform" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-start gap-4 md:gap-6">
            <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-indigo-400 rounded-full backdrop-blur-md">
              Privacy-First Optimization
            </span>
            <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
              Image <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">Compressor</span>
            </h1>
            <p className="max-w-2xl text-zinc-400 text-base md:text-lg font-medium leading-relaxed">
              Kecilkan ukuran file tanpa kehilangan kualitas. Target
              <span className="text-white font-bold"> 1MB</span>,
              <span className="text-white font-bold"> 2MB</span>, hingga
              <span className="text-white font-bold"> 5MB</span> diproses langsung di browser Anda.
            </p>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT - Overlap Grid */}
      <main className="max-w-7xl mx-auto px-4 md:px-6 -mt-12 md:-mt-32 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* TOOL AREA */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-6 md:p-10 shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100">
              <div className="flex items-center gap-3 mb-8 ml-2">
                <div className="p-2 bg-indigo-50 rounded-xl text-indigo-600">
                  <Settings className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Optimization Studio</h2>
              </div>
              <ImageSizeCompressor />
            </div>

            {/* SEO CONTENT CARD */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-zinc-100 space-y-12">
              <div className="grid md:grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest">
                    <ShieldCheck className="w-4 h-4" /> Zero-Server Process
                  </div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none text-justify">Privasi Adalah Prioritas</h2>
                  <p className="text-zinc-500 text-sm leading-relaxed text-justify italic">
                    Berbeda dengan tool lain, foto Anda <strong>tidak pernah dikirim ke server kami</strong>. Seluruh algoritma kompresi berjalan di memori browser Anda, menjamin keamanan data 100%.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest text-justify leading-none">
                    <Zap className="w-4 h-4" /> Smart Conversion
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Format Converter</h3>
                  <div className="grid gap-3">
                    <Link href="/konverter/image" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-indigo-300 transition-all group shadow-sm">
                      <span className="text-[10px] font-black uppercase italic text-zinc-600">Image Format Converter</span>
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
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 flex items-center gap-2 leading-none">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Market Data
              </h4>
              <MarketInfo />
            </div>
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 leading-none">Global Stock</h4>
              <MarketStockTrend />
            </div>
          </aside>
        </div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Kompres Gambar Online',
          url: 'https://mytools.web.id/konverter/image-compress',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'All'
        })
      }} />
    </div>
  )
}