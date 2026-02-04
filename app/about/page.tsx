import type { Metadata } from 'next'
import Link from 'next/link'
import { Crown, Sparkles, Zap, ShieldCheck, Globe } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Tentang Tamanto – The Digital Ecosystem',
  description: 'Kenali Tamanto, platform ekosistem digital yang menghadirkan hiburan premium, tools produktivitas, dan solusi teknologi modern.',
}

export default function AboutTamanto() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-900 pb-20 selection:bg-indigo-100 selection:text-indigo-700">

      {/* 1. HERO SECTION - Premium & Modern */}
      <section className="relative pt-32 pb-24 px-6 lg:px-20 bg-white border-b border-zinc-100 overflow-hidden">
        {/* Dekorasi Gradient Tamanto */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-indigo-50/50 to-transparent -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-600 text-[10px] md:text-xs font-black uppercase tracking-[0.3em]">
            <Sparkles size={14} /> The Digital Ecosystem
          </div>
          <h1 className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.8] text-zinc-900 uppercase italic">
            Tamanto <br />
            <span className="text-indigo-600">Vision.</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-bold italic">
            Membangun jembatan antara teknologi dan gaya hidup digital. Kami hadir sebagai ekosistem yang menggabungkan hiburan, produktivitas, dan solusi cerdas dalam satu genggaman.
          </p>
        </div>
      </section>

      {/* 2. CORE PHILOSOPHY - Two Columns */}
      <section className="max-w-6xl mx-auto px-6 lg:px-20 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 md:sticky md:top-24">
            <h2 className="text-4xl font-black tracking-tighter text-zinc-900 italic uppercase">
              Visi Kami: <br /> Tanpa Batas.
            </h2>
            <p className="text-zinc-600 leading-relaxed font-medium">
              Tamanto lahir dari semangat untuk memberikan akses digital yang setara dan berkualitas bagi seluruh masyarakat, khususnya di wilayah Nusa Tenggara Barat dan sekitarnya.
            </p>
            <div className="flex gap-8 pt-6">
              <div className="flex flex-col">
                <span className="text-4xl font-black text-indigo-600 italic">2026</span>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Future Ready</span>
              </div>
              <div className="w-[1px] h-12 bg-zinc-200" />
              <div className="flex flex-col">
                <span className="text-4xl font-black text-indigo-600 italic">VIP</span>
                <span className="text-[10px] font-black text-zinc-400 uppercase tracking-widest">Premium Status</span>
              </div>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-700 group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                <Zap fill="currentColor" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-3 italic uppercase tracking-tight">Hiburan Premium</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">Menghadirkan konten drama dan streaming berkualitas tinggi yang dioptimalkan untuk performa MacBook dan perangkat Mobile Anda.</p>
            </div>
            <div className="p-10 bg-white border border-zinc-100 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-700 group">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-emerald-600 group-hover:text-white transition-all">
                <ShieldCheck fill="currentColor" />
              </div>
              <h3 className="text-xl font-black text-zinc-900 mb-3 italic uppercase tracking-tight">Keamanan VIP</h3>
              <p className="text-xs text-zinc-500 leading-relaxed font-medium">Privasi Anda adalah prioritas utama. Dengan teknologi token terverifikasi, akses VIP Anda tetap aman dan personal.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION */}
      <section className="max-w-6xl mx-auto px-6 lg:px-20 mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Zap className="text-indigo-500" />, title: 'High Performance', desc: 'Arsitektur Next.js yang membuat setiap interaksi terasa instan di MacBook Air Anda.' },
          { icon: <Crown className="text-amber-500" />, title: 'Premium Access', desc: 'Akses fitur eksklusif dan konten tanpa iklan bagi anggota VIP Tamanto.' },
          { icon: <Globe className="text-blue-500" />, title: 'Local Pride', desc: 'Dibangun dengan jiwa Mataram, NTB untuk menjangkau ekosistem digital global.' }
        ].map((item, idx) => (
          <div key={idx} className="p-10 bg-zinc-100/50 border border-zinc-200/50 rounded-[2.5rem] group hover:bg-white hover:border-indigo-200 transition-all duration-500">
            <div className="mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h4 className="text-sm font-black text-zinc-900 uppercase tracking-[0.2em] italic">{item.title}</h4>
            <p className="text-[11px] text-zinc-500 mt-3 leading-relaxed font-bold uppercase tracking-wider">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 4. FINAL CTA */}
      <section className="max-w-5xl mx-auto px-6 text-center mt-32">
        <div className="bg-zinc-900 p-16 rounded-[4rem] text-white shadow-[0_40px_100px_-20px_rgba(79,70,229,0.3)] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-indigo-600/20 to-transparent pointer-events-none" />
          <h2 className="text-4xl md:text-7xl font-black mb-8 tracking-tighter leading-none italic uppercase">SIAP MENJADI <br /> <span className="text-indigo-500 underline">VIP MEMBER?</span></h2>
          <Link href="/premium" className="relative z-10 inline-flex items-center gap-3 bg-white text-zinc-900 px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all active:scale-95 shadow-2xl">
            Jelajahi Ekosistem
          </Link>
        </div>
      </section>

      {/* Footer Minimalis */}
      <footer className="mt-32 text-center">
        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-[0.6em]">
          Tamanto Digital Ecosystem • Mataram • 2026
        </p>
      </footer>
    </main>
  )
}