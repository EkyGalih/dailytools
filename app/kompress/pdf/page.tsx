import type { Metadata } from 'next'
import PdfCompressor from '@/components/konverter/PdfCompressor'
import MarketInfo from '@/components/MarketInfo'
import MarketStockTrend from '@/components/MarketStockComponent'
import Link from 'next/link'
import { FileText, ShieldCheck, Zap, ArrowRight, Info, Lock } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kompres PDF Online – Perkecil Ukuran PDF Aman | My Tools',
  description: 'Kompres file PDF secara instan langsung di browser. Privasi 100% terjaga karena dokumen tidak diunggah ke server. Cepat, gratis, dan tanpa registrasi.',
  alternates: { canonical: 'https://mytools.web.id/konverter/pdf-compress' }
}

export default function PdfCompressPage() {
  return (
    <div className="bg-[#fafafa] min-h-screen pb-20">
      {/* HERO SECTION - Optimized Dark Mesh */}
      <header className="relative overflow-hidden bg-[#050505] pt-16 pb-24 md:pt-24 md:pb-48">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] bg-indigo-900/40 blur-[80px] rounded-full transform-gpu will-change-transform" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-900/30 blur-[80px] rounded-full transform-gpu will-change-transform" />
        </div>

        <div className="relative max-w-7xl mx-auto px-6">
          <div className="flex flex-col items-start gap-4 md:gap-6 text-left">
            <span className="px-4 py-1.5 text-[10px] font-black tracking-[0.3em] uppercase bg-white/5 border border-white/10 text-indigo-400 rounded-full backdrop-blur-md flex items-center gap-2">
              <Lock className="w-3 h-3" /> Secure Local Processing
            </span>
            <h1 className="text-4xl md:text-8xl font-black text-white italic tracking-tighter leading-none uppercase">
              PDF <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-blue-400">Compressor</span>
            </h1>
            <p className="max-w-2xl text-zinc-400 text-base md:text-xl font-medium leading-relaxed">
              Kecilkan ukuran dokumen tanpa kompromi. Proses
              <span className="text-white font-bold"> Client-Side</span> memastikan data sensitif Anda tetap berada di perangkat Anda.
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
                  <FileText className="w-5 h-5" />
                </div>
                <h2 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-zinc-900">Document Optimizer</h2>
              </div>
              <PdfCompressor />
            </div>

            {/* SEO CONTENT CARD */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 border border-zinc-100 space-y-12">
              <div className="grid md:grid-cols-2 gap-10 text-justify text-sm">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest leading-none">
                    <ShieldCheck className="w-4 h-4" /> Privacy-First Architecture
                  </div>
                  <h2 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Keamanan Dokumen</h2>
                  <p className="text-zinc-500 leading-relaxed italic">
                    Kami memahami pentingnya privasi. File PDF Anda diproses menggunakan <strong>WebAssembly</strong> langsung di browser. Tidak ada data yang dikirim ke internet.
                  </p>
                </div>
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-indigo-600 font-black text-[10px] uppercase tracking-widest leading-none">
                    <Zap className="w-4 h-4" /> Multi-Tool Ecosystem
                  </div>
                  <h3 className="text-2xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">Konversi Lainnya</h3>
                  <div className="grid gap-3">
                    <Link href="/kompress/gambar" className="flex items-center justify-between p-3 bg-zinc-50 rounded-xl border border-zinc-100 hover:border-indigo-300 transition-all group shadow-sm">
                      <span className="text-[10px] font-black uppercase italic text-zinc-600">Kompres Gambar Online</span>
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
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> Market Analytics
              </h4>
              <MarketInfo />
            </div>
            <div className="bg-white rounded-[2rem] p-6 shadow-sm border border-zinc-100">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6 uppercase">Stock Trends</h4>
              <MarketStockTrend />
            </div>
          </aside>
        </div>
      </main>

      <script type="application/ld+json" dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'WebApplication',
          name: 'Kompres PDF Online',
          url: 'https://mytools.web.id/konverter/pdf-compress',
          applicationCategory: 'UtilitiesApplication',
          operatingSystem: 'All'
        })
      }} />
    </div>
  )
}