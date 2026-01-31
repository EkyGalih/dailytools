import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Kebijakan Privasi – Transparansi Data MyTools',
  description: 'Bagaimana MyTools mengelola privasi Anda dengan aman dan transparan.',
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-white text-zinc-900 pb-20">

      {/* HEADER - Minimalist Light */}
      <header className="pt-28 pb-16 px-6 lg:px-20 bg-zinc-50 border-b border-zinc-100 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-zinc-900 uppercase">
            PRIVASI & <span className="text-orange-500">KEAMANAN</span>
          </h1>
          <p className="text-zinc-500 font-medium">
            Terakhir diperbarui: 31 Januari 2026
          </p>
        </div>
      </header>

      {/* CONTENT GRID */}
      <div className="max-w-5xl mx-auto px-6 lg:px-20 mt-20 space-y-16">

        {/* Section Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 border-l-2 border-orange-500 pl-6 h-fit">
            <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">01. Data</h2>
            <h3 className="text-xl font-black text-zinc-900">Pengumpulan Informasi</h3>
          </div>
          <div className="md:col-span-8 space-y-4 text-zinc-600 leading-relaxed">
            <p>Kami sangat menghargai privasi Anda. MyTools tidak mengumpulkan data identitas pribadi seperti nama atau email. Kami hanya menggunakan data teknis anonim untuk memastikan situs berjalan optimal di MacBook atau Ponsel Anda.</p>
            <div className="flex flex-wrap gap-2">
              {['IP Anonim', 'Browser', 'Device Type'].map(tag => (
                <span key={tag} className="px-3 py-1 bg-zinc-100 rounded-lg text-[10px] font-black text-zinc-500 uppercase">{tag}</span>
              ))}
            </div>
          </div>
        </div>

        {/* Section Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 border-l-2 border-orange-500 pl-6 h-fit">
            <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">02. Ads</h2>
            <h3 className="text-xl font-black text-zinc-900">Iklan & Cookies</h3>
          </div>
          <div className="md:col-span-8 p-8 bg-zinc-50 rounded-[2rem] border border-zinc-100 space-y-4">
            <p className="text-sm text-zinc-600 font-medium italic">
              "Kami menggunakan Google AdSense untuk membantu menyediakan layanan ini secara gratis."
            </p>
            <p className="text-sm text-zinc-600">
              Google menggunakan cookies untuk menampilkan iklan yang relevan. Anda memiliki kontrol penuh untuk menonaktifkan ini melalui pengaturan Google.
            </p>
          </div>
        </div>

        {/* Section Row */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-4 border-l-2 border-orange-500 pl-6 h-fit">
            <h2 className="text-sm font-black uppercase tracking-widest text-zinc-400">03. Policy</h2>
            <h3 className="text-xl font-black text-zinc-900">Persetujuan</h3>
          </div>
          <div className="md:col-span-8">
            <div className="p-6 bg-orange-50 border border-orange-100 rounded-2xl">
              <p className="text-sm text-orange-800 font-bold leading-relaxed">
                Dengan menggunakan platform MyTools, Anda secara sadar memberikan persetujuan atas kebijakan privasi yang kami terapkan demi kenyamanan bersama.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Support */}
        <div className="pt-16 border-t border-zinc-100 flex flex-col items-center">
          <p className="text-zinc-400 text-sm font-bold uppercase tracking-widest mb-6">Butuh Bantuan?</p>
          <a href="mailto:admin@mytools.web.id" className="px-10 py-4 bg-zinc-900 text-white rounded-full font-black text-xs uppercase hover:bg-orange-600 transition-all active:scale-95 shadow-xl">
            Kirim Email
          </a>
        </div>
      </div>
    </main>
  )
}