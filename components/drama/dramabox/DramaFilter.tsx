// components/drama/DramaFilters.tsx
import Link from 'next/link'
import { DRAMA_CATEGORIES } from '@/libs/drama/dramabox/categories'

export default function DramaFilters({ active }: { active?: string }) {
    return (
        <div className="mx-auto flex max-w-6xl flex-wrap justify-start gap-2 px-4">
            <Link
                href="/drama/china/channel/dramabox"
                className={`px-3 py-1.5 rounded-full text-sm border transition ${!active ? 'bg-gradient-to-br from-purple-950 via-indigo-950 to-black text-white' : 'bg-white text-indigo-950 hover:bg-purple-950 hover:text-white'
                    }`}
            >
                Trending
            </Link>

            {DRAMA_CATEGORIES.map((c) => (
                <Link
                    key={c.slug}
                    href={`/drama/china/channel/dramabox/kategori/${c.slug}`}
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${active === c.slug
                            ? 'bg-gradient-to-br from-purple-950 via-indigo-950 to-black text-white'
                            : 'bg-white text-indigo-950 hover:bg-purple-950 hover:text-white'
                        }`}
                >
                    {c.name}
                </Link>
            ))}
        </div>
    )
}