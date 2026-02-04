import type { Metadata } from 'next'
import { ShieldCheck, Lock, EyeOff, Mail, Sparkles, Crown } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi – Privasi Digital Tamanto',
  description: 'Bagaimana Tamanto menjaga keamanan data dan privasi ekosistem digital Anda dengan standar VIP.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 pb-20 selection:bg-indigo-100 selection:text-indigo-700">

      {/* HEADER - Premium Dark Style */}
      <header className="pt-32 pb-20 px-6 lg:px-20 bg-zinc-950 border-b border-white/5 relative overflow-hidden">
        {/* Dekorasi Glow Indigo */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-indigo-600/10 blur-[120px] rounded-full -z-0" />

        <div className="max-w-3xl mx-auto space-y-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-500/10 border border-indigo-500/20 rounded-full">
            <ShieldCheck size={12} className="text-indigo-400" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Data Protection</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter text-white uppercase italic leading-none">
            PRIVASI & <br /><span className="text-indigo-500 underline">KEAMANAN</span>
          </h1>
          <p className="text-zinc-500 font-bold uppercase tracking-widest text-[10px]">
            Terakhir diperbarui: 4 Februari 2026
          </p>
        </div>
      </header>

      {/* CONTENT GRID */}
      <div className="max-w-5xl mx-auto px-6 lg:px-20 mt-24 space-y-20">

        {/* 01. INFORMASI PRIBADI */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 border-l-4 border-indigo-600 pl-8 h-fit">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-2">01. Identity</h2>
            <h3 className="text-2xl font-black text-zinc-900 italic uppercase leading-none">Manajemen Data</h3>
          </div>
          <div className="md:col-span-8 space-y-6 text-zinc-600 leading-relaxed font-medium">
            <p>
              Tamanto menghargai privasi digital Anda. Kami tidak menjual data identitas pribadi kepada pihak ketiga. Dalam ekosistem kami, data teknis diolah secara anonim untuk memastikan performa tinggi saat diakses melalui MacBook atau perangkat Mobile Anda.
            </p>
            <div className="flex flex-wrap gap-3">
              {[<Lock size={14} />, <EyeOff size={14} />, <Crown size={14} />].map((icon, i) => (
                <div key={i} className="px-4 py-2 bg-zinc-50 border border-zinc-100 rounded-2xl text-indigo-600">
                  {icon}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 02. VIP & TOKEN SECURITY */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 border-l-4 border-indigo-600 pl-8 h-fit">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-2">02. Premium</h2>
            <h3 className="text-2xl font-black text-zinc-900 italic uppercase leading-none">Keamanan VIP</h3>
          </div>
          <div className="md:col-span-8 p-10 bg-zinc-950 rounded-[3rem] border border-white/5 shadow-2xl space-y-6">
            <div className="flex items-center gap-3 text-amber-400">
              <Crown size={20} fill="currentColor" />
              <span className="text-xs font-black uppercase tracking-widest italic">Tamanto VIP Status</span>
            </div>
            <p className="text-sm text-zinc-400 font-medium leading-relaxed italic">
              "Kami menggunakan teknologi token terverifikasi untuk mengelola akses premium Anda secara aman tanpa menyimpan informasi sensitif di server kami."
            </p>
          </div>
        </div>

        {/* 03. MONETISASI & COOKIES */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4 border-l-4 border-indigo-600 pl-8 h-fit">
            <h2 className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300 mb-2">03. Monetize</h2>
            <h3 className="text-2xl font-black text-zinc-900 italic uppercase leading-none">Iklan Digital</h3>
          </div>
          <div className="md:col-span-8 space-y-6">
            <p className="text-zinc-600 font-medium leading-relaxed">
              Untuk menjaga ekosistem tetap gratis bagi sebagian besar pengguna, kami bekerja sama dengan layanan iklan seperti Google AdSense dan ExoClick. Google menggunakan cookies untuk menampilkan iklan yang relevan berdasarkan riwayat kunjungan Anda.
            </p>
            <div className="p-8 bg-indigo-50/50 border border-indigo-100 rounded-[2.5rem]">
              <p className="text-[11px] text-indigo-800 font-black uppercase tracking-widest leading-relaxed">
                Anda memiliki kontrol penuh untuk mengelola preferensi iklan atau menikmati pengalaman tanpa iklan dengan beralih ke status Member VIP Tamanto.
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT SUPPORT */}
        <div className="pt-24 border-t border-zinc-100 flex flex-col items-center text-center">
          <div className="w-16 h-16 bg-zinc-50 rounded-[1.5rem] flex items-center justify-center mb-8 border border-zinc-100">
            <Mail className="text-indigo-600" size={24} />
          </div>
          <p className="text-zinc-400 text-[10px] font-black uppercase tracking-[0.4em] mb-8">Pertanyaan Terkait Privasi?</p>
          <a href="mailto:admin@tamanto.com" className="px-12 py-5 bg-zinc-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all active:scale-95 shadow-2xl flex items-center gap-3">
            Kirim Email Resmi
          </a>
          <p className="mt-16 text-[8px] font-black text-zinc-300 uppercase tracking-[0.6em]">
            Tamanto Digital Ecosystem • Mataram, NTB • 2026
          </p>
        </div>
      </div>
    </main>
  )
}