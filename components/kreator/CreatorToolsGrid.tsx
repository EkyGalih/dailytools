import Link from 'next/link'

const items = [
    {
        title: 'Kalkulator Penghasilan YouTube',
        desc: 'Estimasi pendapatan YouTube berdasarkan jumlah views dan RPM.',
        href: '/kreator/youtube-income',
        emoji: '▶️',
        tag: 'YouTube',
    },
    {
        title: 'Generator Hashtag Instagram & TikTok',
        desc: 'Buat hashtag relevan sesuai topik konten untuk menjangkau audiens.',
        href: '/kreator/hashtag',
        emoji: '#️⃣',
        tag: 'Hashtag',
    },
    {
        title: 'Generator Caption Konten',
        desc: 'Buat caption menarik untuk Reels, TikTok, dan konten jualan.',
        href: '/kreator/caption',
        emoji: '✍️',
        tag: 'Caption',
    },
    {
        title: 'Estimasi Ukuran Video',
        desc: 'Perkirakan ukuran file video sebelum upload ke platform.',
        href: '/kreator/video-size',
        emoji: '🎬',
        tag: 'Video',
    },
]

export default function CreatorToolsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((it, idx) => (
                <article
                    key={it.href}
                    className="group bg-white border rounded-2xl p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
                >
                    <Link href={it.href} className="block h-full">
                        <div className="flex items-start justify-between">
                            <div className="text-3xl">{it.emoji}</div>
                            <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                                {it.tag}
                            </span>
                        </div>

                        <h3 className="mt-4 text-lg font-semibold group-hover:text-black">
                            {it.title}
                        </h3>

                        <p className="mt-2 text-sm text-gray-600">
                            {it.desc}
                        </p>

                        <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-black">
                            Buka Tool
                            <span className="transition group-hover:translate-x-1">→</span>
                        </span>
                    </Link>
                </article>
            ))}
        </div>
    )
}