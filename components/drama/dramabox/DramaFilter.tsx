// components/drama/DramaFilters.tsx
import Link from 'next/link'
import { DRAMA_CATEGORIES } from '@/libs/drama/dramabox/categories'

export default function DramaFilters({ active }: { active?: string }) {
    return (
        <div className="flex flex-wrap gap-2 px-4">
            <Link
                href="/drama/china/channel/dramabox"
                className={`px-3 py-1.5 rounded-full text-sm border transition ${!active ? 'bg-black text-white border-black' : 'bg-white hover:bg-gray-50'
                    }`}
            >
                Trending
            </Link>

            {DRAMA_CATEGORIES.map((c) => (
                <Link
                    key={c.slug}
                    href={`/drama/china/channel/dramabox/kategori/${c.slug}`}
                    className={`px-3 py-1.5 rounded-full text-sm border transition ${active === c.slug
                            ? 'bg-black text-white border-black'
                            : 'bg-white hover:bg-gray-50'
                        }`}
                >
                    {c.name}
                </Link>
            ))}
        </div>
    )
}