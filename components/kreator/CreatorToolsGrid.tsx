import Link from 'next/link'
import { DollarSign, Hash, MessageSquare, Video, Scissors, ArrowUpRight } from 'lucide-react'

const items = [
    {
        title: 'Income Calculator',
        desc: 'Estimasi penghasilan dari YouTube, TikTok, dan Reels berdasarkan views.',
        href: '/kreator/income',
        icon: DollarSign,
        color: 'bg-green-100 text-green-600',
        tag: 'Monetize',
    },
    {
        title: 'Hashtag Generator',
        desc: 'Buat kombinasi hashtag relevan untuk tembus algoritma Explore & FYP.',
        href: '/kreator/hashtag',
        icon: Hash,
        color: 'bg-purple-100 text-purple-600',
        tag: 'Discovery',
    },
    {
        title: 'Caption Studio',
        desc: 'Generator caption otomatis dengan berbagai gaya bahasa dan CTA.',
        href: '/kreator/caption',
        icon: MessageSquare,
        color: 'bg-blue-100 text-blue-600',
        tag: 'Creative',
    },
    {
        title: 'Size Estimator',
        desc: 'Hitung ukuran file video berdasarkan bitrate sebelum proses render.',
        href: '/kreator/video-size',
        icon: Video,
        color: 'bg-amber-100 text-amber-600',
        tag: 'Technical',
    },
    {
        title: 'Auto Clipper',
        desc: 'Potong video panjang menjadi klip pendek siap upload secara otomatis.',
        href: '/kreator/auto-clipper',
        icon: Scissors,
        color: 'bg-pink-100 text-pink-600',
        tag: 'Efficiency',
    },
]

export default function CreatorToolsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {items.map((it) => (
                <article
                    key={it.href}
                    className="group relative bg-white border border-zinc-100 rounded-[2rem] p-8 hover:border-purple-500/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-500 overflow-hidden"
                >
                    {/* Decorative Background Glow on Hover */}
                    <div className="absolute -right-4 -top-4 w-24 h-24 bg-zinc-50 rounded-full group-hover:bg-purple-50 transition-colors duration-500 -z-10" />

                    <Link href={it.href} className="flex flex-col h-full">
                        <div className="flex items-center justify-between mb-6">
                            <div className={`p-3 rounded-2xl ${it.color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                                <it.icon className="w-6 h-6" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-300 group-hover:text-purple-400 transition-colors">
                                {it.tag}
                            </span>
                        </div>

                        <h3 className="text-xl font-black italic uppercase tracking-tighter text-zinc-900 group-hover:text-purple-600 transition-colors leading-tight">
                            {it.title}
                        </h3>

                        <p className="mt-3 text-sm text-zinc-500 leading-relaxed font-medium">
                            {it.desc}
                        </p>

                        <div className="mt-8 pt-6 border-t border-zinc-50 flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                                Launch Tool <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                            </span>
                        </div>
                    </Link>
                </article>
            ))}
        </div>
    )
}