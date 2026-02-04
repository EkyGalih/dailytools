"use client"

import { Mail, MessageSquare, MapPin, Send, Sparkles } from "lucide-react"

export default function ContactPage() {
    return (
        <main className="min-h-[80vh] bg-[#fafafa] py-20 px-6 relative overflow-hidden">
            {/* Dekorasi Estetik MacBook-Style */}
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-indigo-50/50 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-5xl mx-auto relative z-10">
                <div className="text-center mb-16 space-y-4">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-zinc-100 rounded-full shadow-sm">
                        <Sparkles size={12} className="text-indigo-600" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Get In Touch</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter text-zinc-900 leading-none">
                        Hubungi <span className="text-indigo-600">Kami</span>
                    </h1>
                    <p className="text-zinc-400 text-xs font-bold uppercase tracking-widest italic">Tamanto Digital Ecosystem • Mataram, NTB</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Info Kontak */}
                    <div className="lg:col-span-1 space-y-4">
                        {[
                            { icon: <Mail />, label: "Email", val: "support@tamanto.web.id" },
                            { icon: <MessageSquare />, label: "WhatsApp", val: "+62 812-2327-4321" },
                            { icon: <MapPin />, label: "Lokasi", val: "Mataram, West Nusa Tenggara, Indonesia" }
                        ].map((item, i) => (
                            <div key={i} className="p-6 bg-white border border-zinc-100 rounded-[2rem] shadow-sm hover:shadow-md transition-all group">
                                <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                                    {item.icon}
                                </div>
                                <h4 className="text-[10px] font-black uppercase text-zinc-400 tracking-widest">{item.label}</h4>
                                <p className="text-sm font-black text-zinc-900 italic uppercase tracking-tight">{item.val}</p>
                            </div>
                        ))}
                    </div>

                    {/* Form Kontak (SEO Friendly Form) */}
                    <div className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3rem] border border-zinc-100 shadow-xl shadow-zinc-200/50">
                        <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-2">Nama Lengkap</label>
                                <input type="text" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" placeholder="Ex: Suru" />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-2">Email</label>
                                <input type="email" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" placeholder="name@domain.com" />
                            </div>
                            <div className="md:col-span-2 space-y-2">
                                <label className="text-[10px] font-black uppercase tracking-widest ml-2">Pesan</label>
                                <textarea rows={4} className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition-all font-medium" placeholder="Bagaimana kami bisa membantu Anda?" />
                            </div>
                            <button className="md:col-span-2 w-full py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase text-xs tracking-[0.2em] hover:bg-indigo-600 transition-all shadow-xl active:scale-95 flex items-center justify-center gap-3">
                                <Send size={16} /> Kirim Pesan
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </main>
    )
}