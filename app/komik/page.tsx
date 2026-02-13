import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Sparkles, Sword } from 'lucide-react'

const categories = [
    {
        id: 'manga',
        title: 'Manga',
        origin: 'JAPAN',
        flag: '🇯🇵',
        label: 'The Eternal Legend',
        desc: 'Masuki dunia tanpa batas, tempat setiap halaman membuka petualangan baru, dari isekai epik hingga romansa yang menyentuh jiwa.',
        color: 'from-red-600 via-zinc-900 to-zinc-950',
        neon: 'shadow-[0_0_30px_rgba(220,38,38,0.15)]',
        accent: 'text-red-500',
        // Gambar gaya Manga Hitam Putih Tajam
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT81lkkBUojLZYsh-busk5S9bGmTZYetoSEPA&s',
    },
    {
        id: 'manhwa',
        title: 'Manhwa',
        origin: 'SOUTH KOREA',
        flag: '🇰🇷',
        label: 'System Awakening',
        desc: 'Jelajahi kisah penuh kekuatan, balas dendam, dan kebangkitan karakter utama dalam dunia manhwa terbaik pilihan hari ini.',
        color: 'from-cyan-500 via-zinc-900 to-zinc-950',
        neon: 'shadow-[0_0_30px_rgba(6,182,212,0.15)]',
        accent: 'text-cyan-400',
        // Gambar gaya Manhwa Neon Blue/Purple
        thumbnail: 'https://i.pinimg.com/236x/d8/cc/54/d8cc5417f091c017e5f38a98c62204c2.jpg',
    },
    {
        id: 'manhua',
        title: 'Manhua',
        origin: 'CHINA',
        flag: '🇨🇳',
        label: 'Immortal Cultivation',
        desc: 'Dari reinkarnasi sang jenius hingga kebangkitan penguasa langit, temukan manhua dengan alur epik dan pertarungan spektakuler.',
        color: 'from-emerald-500 via-zinc-900 to-zinc-950',
        neon: 'shadow-[0_0_30px_rgba(16,185,129,0.15)]',
        accent: 'text-emerald-400',
        // Gambar gaya Manhua Pemandangan Kolosal/Emas
        thumbnail: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQStgU8onYio4fJANuNNWERYfMJzdJUKMk49Q&s',
    }
]

export default function ComicCategoryPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-zinc-100 py-24 px-6 lg:px-20 selection:bg-orange-600/30">
            {/* Background Decor */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden">
                <div className="absolute top-1/4 -left-20 w-96 h-96 bg-red-600/5 blur-[120px] rounded-full animate-pulse" />
                <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-cyan-600/5 blur-[120px] rounded-full animate-pulse delay-700" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="space-y-4 mb-24 max-w-3xl">
                    <div className="flex items-center gap-3">
                        <div className="h-[2px] w-12 bg-orange-600" />
                        <span className="text-xs font-black uppercase tracking-[0.5em] text-orange-500">Perpustakaan Komik</span>
                    </div>
                    <h1 className="text-6xl md:text-9xl font-black uppercase italic tracking-tighter leading-[0.8] text-white">
                        Pilih <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-600 uppercase">Komikmu</span>
                    </h1>
                </div>

                {/* Categories Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                    {categories.map((cat) => (
                        <Link
                            key={cat.id}
                            href={`/komik/${cat.id}`}
                            className={`group relative flex flex-col h-[650px] rounded-[3.5rem] bg-zinc-950 border border-white/5 overflow-hidden transition-all duration-700 hover:border-white/20 shadow-2xl ${cat.neon}`}
                        >
                            {/* Image Section */}
                            <div className="relative h-2/3 w-full overflow-hidden">
                                <Image
                                    src={cat.thumbnail}
                                    alt={cat.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-50 group-hover:opacity-100 group-hover:rotate-1"
                                />

                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />

                                {/* Badge Negara + Bendera */}
                                <div className="absolute top-10 left-10 flex items-center gap-2">
                                    <div className="px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 flex items-center gap-3 shadow-2xl">
                                        <span className="text-lg">{cat.flag}</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white border-l border-white/20 pl-3">
                                            {cat.origin}
                                        </span>
                                    </div>
                                </div>

                                {/* Floating Vertical Title */}
                                <div className="absolute -right-6 top-1/2 -translate-y-1/2 -rotate-90 opacity-10 group-hover:opacity-40 transition-all duration-700">
                                    <span className="text-8xl font-black uppercase tracking-tighter text-white whitespace-nowrap">
                                        {cat.title}
                                    </span>
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-10 flex flex-col flex-grow justify-between relative z-20 bg-zinc-950">
                                <div className="space-y-4">
                                    <div className="flex items-center gap-3">
                                        <Sparkles size={16} className={cat.accent} />
                                        <span className={`text-[11px] font-black uppercase tracking-[0.3em] ${cat.accent}`}>
                                            {cat.label}
                                        </span>
                                    </div>
                                    <h2 className="text-5xl font-black uppercase italic tracking-tighter text-white">
                                        {cat.title}
                                    </h2>
                                    <p className="text-sm text-zinc-500 leading-relaxed font-medium">
                                        {cat.desc}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between pt-8 border-t border-white/5">
                                    <div className="flex flex-col">
                                        <span className="text-[9px] font-black uppercase tracking-widest text-zinc-600">Masuk Ke</span>
                                        <span className="text-xs font-black uppercase text-white group-hover:text-orange-500 transition-colors tracking-widest">Paviliun {cat.id}</span>
                                    </div>
                                    <div className={`w-14 h-14 rounded-3xl bg-zinc-900 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-to-br ${cat.color} group-hover:rotate-12`}>
                                        <ChevronRight size={24} className="text-white" />
                                    </div>
                                </div>
                            </div>

                            {/* Decorative Edge Glow */}
                            <div className={`absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b ${cat.color} opacity-0 group-hover:opacity-100 transition-all duration-700`} />
                        </Link>
                    ))}
                </div>

                {/* Footer Decor */}
                <div className="mt-32 text-center">
                    <div className="inline-flex items-center gap-4 px-8 py-4 rounded-full border border-white/5 bg-zinc-900/50 backdrop-blur-xl group cursor-pointer hover:border-orange-500/30 transition-all">
                        <Sword size={18} className="text-orange-500 group-hover:rotate-45 transition-transform" />
                        <span className="text-xs font-black uppercase tracking-[0.4em] text-zinc-400 group-hover:text-zinc-200">Enjoy Your Reading - TAMANTO</span>
                    </div>
                </div>
            </div>
        </main>
    )
}