import Link from 'next/link'

const items = [
    {
        title: 'Kalkulator Penghasilan Konten Kreator',
        desc: 'Estimasi penghasilan kreator dari YouTube, TikTok, Instagram Reels, dan Facebook berdasarkan views dan RPM.',
        href: '/kreator/calculate-income',
        emoji: '💰',
        tag: 'Penghasilan',
    },
    {
        title: 'Generator Hashtag Konten Kreator',
        desc: 'Buat hashtag relevan sesuai topik untuk Instagram, TikTok, Facebook Reels, dan YouTube Shorts.',
        href: '/kreator/hashtag',
        emoji: '#️⃣',
        tag: 'Hashtag',
    },
    {
        title: 'Generator Caption Konten',
        desc: 'Buat caption menarik dengan berbagai gaya untuk Reels, TikTok, Facebook, dan konten promosi.',
        href: '/kreator/caption',
        emoji: '✍️',
        tag: 'Caption',
    },
    {
        title: 'Estimasi Ukuran Video',
        desc: 'Perkirakan ukuran file video berdasarkan durasi dan bitrate sebelum upload ke platform.',
        href: '/kreator/video-size',
        emoji: '🎬',
        tag: 'Video',
    },
    {
        title: 'Auto Clipper Video',
        desc: 'Upload video panjang lalu otomatis dipotong menjadi banyak klip siap upload. Download satu atau sekaligus.',
        href: '/kreator/auto-clipper',
        emoji: '✂️',
        tag: 'Clipper',
    },
]

export default function CreatorToolsGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {items.map((it) => (
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