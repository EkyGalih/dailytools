import Link from 'next/link'
import Image from 'next/image'
import { Play, Sparkles, ChevronRight, Globe2 } from 'lucide-react'

const dramaCategories = [
    {
        id: 'china',
        title: 'Drama China',
        label: 'Chinese Series',
        origin: 'Mainland China',
        flag: '🇨🇳',
        desc: 'Saksikan kemegahan Wuxia, intrik istana yang tajam, hingga kisah cinta modern yang estetik.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWyeY6BPtX9xFbtLBaxdlr6x0gwLROinOsQQ&s',
        accent: 'from-purple-600 to-indigo-900',
        glow: 'shadow-purple-900/20'
    },
    {
        id: 'korea',
        title: 'Drama Korea',
        label: 'Korean Series',
        origin: 'South Korea',
        flag: '🇰🇷',
        desc: 'Masterpiece penuh emosi, romansa ikonik, dan thriller kelas dunia yang selalu dinanti.',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfCdZ0iyy3d1VEBNBdiYaitovxPbAz1GOy0Q&s',
        accent: 'from-blue-600 to-indigo-900',
        glow: 'shadow-blue-900/20'
    }
]

export default function DramaPage() {
    return (
        <main className="min-h-screen bg-[#050505] text-zinc-100 py-24 px-6 lg:px-20 selection:bg-purple-500/30 overflow-hidden">

            {/* AMBIENT BACKGROUND LIGHTS */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-purple-600/10 blur-[150px] rounded-full animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse delay-1000" />
            </div>

            <div className="max-w-7xl mx-auto relative z-10">

                {/* HEADER SECTION */}
                <header className="max-w-3xl mb-24 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl">
                        <Sparkles size={14} className="text-purple-400" />
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Premium Collection</span>
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black uppercase italic tracking-tighter leading-[0.85] text-white">
                        SELECT YOUR <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-indigo-400 to-purple-600 uppercase">DESTINY</span>
                    </h1>
                    <p className="text-zinc-500 text-sm md:text-base font-medium max-w-xl leading-relaxed">
                        Masuki dunia penuh emosi, romansa, dan konflik menegangkan. Pilih asal drama untuk memulai petualangan sinematikmu.
                    </p>
                </header>

                {/* OPTIONS GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                    {dramaCategories.map((drama) => (
                        <Link
                            key={drama.id}
                            href={`/drama/${drama.id}`}
                            className={`group relative flex flex-col h-[500px] md:h-[600px] rounded-[3rem] overflow-hidden bg-zinc-950 border border-white/5 transition-all duration-700 hover:border-purple-500/30 shadow-2xl ${drama.glow}`}
                        >
                            {/* IMAGE AREA */}
                            <div className="relative h-full w-full">
                                <Image
                                    src={drama.image}
                                    alt={drama.title}
                                    fill
                                    className="object-cover transition-transform duration-1000 group-hover:scale-110 opacity-60 group-hover:opacity-100"
                                    sizes="(max-width: 768px) 100vw, 50vw"
                                />

                                {/* CYBER OVERLAYS */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/20 to-transparent z-10" />

                                {/* ORIGIN TAG */}
                                <div className="absolute top-8 left-8 z-20">
                                    <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-black/60 backdrop-blur-2xl border border-white/10 shadow-2xl">
                                        <span className="text-lg">{drama.flag}</span>
                                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white border-l border-white/20 pl-3">
                                            {drama.origin}
                                        </span>
                                    </div>
                                </div>

                                {/* CONTENT ON IMAGE */}
                                <div className="absolute bottom-10 left-8 right-8 z-20 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-lg bg-purple-600 shadow-[0_0_15px_rgba(147,51,234,0.5)]">
                                            <Play size={16} fill="white" className="text-white" />
                                        </div>
                                        <span className="text-[11px] font-black uppercase tracking-[0.3em] text-purple-400 drop-shadow-lg">
                                            {drama.label}
                                        </span>
                                    </div>

                                    <h2 className="text-4xl md:text-5xl font-black uppercase italic tracking-tighter text-white">
                                        {drama.title}
                                    </h2>

                                    <p className="text-sm text-zinc-400 font-medium max-w-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {drama.desc}
                                    </p>

                                    {/* INTERACTIVE BUTTON */}
                                    <div className="pt-4 flex items-center justify-between">
                                        <div className="flex items-center gap-2 group/btn">
                                            <span className="text-xs font-black uppercase tracking-widest text-white">Explore Series</span>
                                            <ChevronRight size={16} className="text-purple-500 group-hover:translate-x-2 transition-transform" />
                                        </div>

                                        {/* DECORATIVE CIRCLE */}
                                        <div className={`w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center transition-all duration-500 group-hover:bg-gradient-to-br ${drama.accent} group-hover:rotate-12`}>
                                            <Globe2 size={20} className="text-white" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* DECORATIVE EDGE LINE */}
                            <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${drama.accent} transition-all duration-700 w-0 group-hover:w-full`} />
                        </Link>
                    ))}
                </div>

                {/* FOOTER DECOR */}
                <div className="mt-24 text-center">
                    <p className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.5em]">
                        Experience Every Emotion • Endless Stories
                    </p>
                </div>
            </div>
        </main>
    )
}