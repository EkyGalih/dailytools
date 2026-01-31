import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Tentang MyTools – Solusi Online Gratis & Praktis',
  description: 'Kenali lebih dekat MyTools, platform penyedia alat bantu finansial, pajak, dan produktivitas gratis untuk masyarakat Indonesia.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fafafa] text-zinc-900 pb-20 selection:bg-orange-100 selection:text-orange-700">

      {/* 1. HERO SECTION - Clean & Airy */}
      <section className="relative pt-24 pb-20 px-6 lg:px-20 bg-white border-b border-zinc-100 overflow-hidden">
        {/* Dekorasi Halus */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-orange-50/50 to-transparent -z-10" />

        <div className="max-w-4xl mx-auto text-center space-y-8">
          <span className="inline-block px-4 py-1.5 rounded-full bg-orange-50 border border-orange-100 text-orange-600 text-[10px] md:text-xs font-black uppercase tracking-[0.2em]">
            Digital Productivity Hub
          </span>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.85] text-zinc-900 uppercase">
            Sederhana. <br />
            <span className="text-orange-500">Bermanfaat.</span>
          </h1>
          <p className="text-zinc-500 text-sm md:text-xl max-w-2xl mx-auto leading-relaxed font-medium">
            MyTools lahir untuk menghilangkan kerumitan. Kami menyediakan ekosistem tools yang membantu Anda fokus pada hasil, bukan pada cara menghitungnya.
          </p>
        </div>
      </section>

      {/* 2. CORE MISSION - Two Columns */}
      <section className="max-w-6xl mx-auto px-6 lg:px-20 mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div className="space-y-6 md:sticky md:top-24">
            <h2 className="text-3xl font-black tracking-tight text-zinc-900">
              Misi Kami: <br /> Gratis untuk Semua.
            </h2>
            <p className="text-zinc-600 leading-relaxed">
              Kami percaya bahwa akses terhadap informasi finansial dan tools produktivitas adalah hak setiap orang. MyTools dikembangkan untuk menjadi teman setia dalam mengambil keputusan harian Anda.
            </p>
            <div className="flex gap-4 pt-4">
              <div className="flex flex-col">
                <span className="text-3xl font-black text-orange-500">10+</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Online Tools</span>
              </div>
              <div className="w-[1px] h-10 bg-zinc-200 mx-4" />
              <div className="flex flex-col">
                <span className="text-3xl font-black text-orange-500">0%</span>
                <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">Biaya Akses</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500">
              <h3 className="text-lg font-black text-zinc-900 mb-3">🛠️ Tools Terintegrasi</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Dari perhitungan pajak PPh 21 hingga kompres PDF, semua tersedia di satu tempat tanpa perlu instalasi aplikasi.</p>
            </div>
            <div className="p-8 bg-white border border-zinc-100 rounded-[2.5rem] shadow-sm hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-500">
              <h3 className="text-lg font-black text-zinc-900 mb-3">🛡️ Privasi Aman</h3>
              <p className="text-sm text-zinc-500 leading-relaxed">Data Anda adalah milik Anda. Kami tidak menyimpan informasi sensitif di server kami.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUE PROPOSITION */}
      <section className="max-w-6xl mx-auto px-6 lg:px-20 mt-24 grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: '🚀', title: 'Cepat & Ringan', desc: 'Dioptimalkan untuk performa tinggi di semua perangkat.' },
          { icon: '🎯', title: 'Akurat', desc: 'Algoritma yang selalu diperbarui mengikuti regulasi terbaru.' },
          { icon: '🔓', title: 'Tanpa Akun', desc: 'Gunakan semua fitur secara instan tanpa perlu registrasi.' }
        ].map((item) => (
          <div key={item.title} className="p-8 bg-zinc-100/50 border border-zinc-200/50 rounded-3xl group hover:bg-white hover:border-orange-200 transition-all">
            <div className="text-3xl mb-4 group-hover:scale-110 transition-transform">{item.icon}</div>
            <h4 className="font-black text-zinc-900 uppercase tracking-tight">{item.title}</h4>
            <p className="text-xs text-zinc-500 mt-2 leading-relaxed font-medium">{item.desc}</p>
          </div>
        ))}
      </section>

      {/* 4. FINAL CTA */}
      <section className="max-w-4xl mx-auto px-6 text-center mt-32">
        <div className="bg-orange-600 p-12 rounded-[3rem] text-white shadow-2xl shadow-orange-600/20">
          <h2 className="text-3xl md:text-5xl font-black mb-6 tracking-tighter">SIAP MULAI <br /> SEKARANG?</h2>
          <Link href="/" className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-black text-sm uppercase hover:bg-zinc-100 transition-all active:scale-95 shadow-lg">
            Kembali Ke Dashboard
          </Link>
        </div>
      </section>
    </main>
  )
}