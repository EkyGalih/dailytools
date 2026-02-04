import Link from "next/link"

export default function TermsPage() {
    const sections = [
        { title: "Penerimaan Ketentuan", content: "Dengan mengakses ekosistem digital Tamanto, Anda menyetujui untuk terikat dengan syarat dan ketentuan ini secara penuh." },
        { title: "Akses VIP & Token", content: "Layanan VIP memerlukan token premium terverifikasi. Pengguna bertanggung jawab penuh atas keamanan kredensial akun mereka." },
        { title: "Hak Kekayaan Intelektual", content: "Semua konten, logo, dan teknologi pemutar video dalam platform Tamanto adalah milik sah kami dan dilindungi hukum yang berlaku." },
        { title: "Batasan Tanggung Jawab", content: "Kami berusaha memberikan performa tinggi bagi pengguna MacBook dan Mobile, namun tidak menjamin layanan bebas gangguan teknis dari pihak ketiga." }
    ]

    return (
        <main className="bg-white py-20 px-6 min-h-screen">
            <div className="max-w-3xl mx-auto">
                <header className="mb-20 text-center space-y-4">
                    <h1 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
                        Syarat & <span className="text-indigo-600">Ketentuan</span>
                    </h1>
                    <p className="text-[10px] font-black text-zinc-300 uppercase tracking-[0.5em]">Terakhir Diperbarui: 4 Februari 2026</p>
                </header>

                <div className="space-y-12">
                    {sections.map((item, i) => (
                        <section key={i} className="space-y-4">
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-black text-zinc-100">0{i + 1}</span>
                                <h2 className="text-lg font-black uppercase tracking-tight text-zinc-900">{item.title}</h2>
                            </div>
                            <p className="text-zinc-500 text-sm leading-relaxed font-medium pl-12 border-l-2 border-indigo-50">
                                {item.content}
                            </p>
                        </section>
                    ))}
                </div>

                <footer className="mt-20 pt-10 border-t border-zinc-50 text-center">
                    <p className="text-zinc-400 text-[10px] font-bold italic">
                        Ada pertanyaan mengenai kebijakan kami? <Link href="/contact" className="text-indigo-600 underline">Hubungi Tim Legal Kami</Link>.
                    </p>
                </footer>
            </div>
        </main>
    )
}