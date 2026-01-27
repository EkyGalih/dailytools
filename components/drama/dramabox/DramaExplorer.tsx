'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import DramaBookGrid from './DramaBoxGrid'
import DramaShareIcons from './DramaShareIcon'
import DramaFilters from './DramaFilter'
import DubIndoSubFilter from './DubIndoSubFilter'
import DramaBookSkeleton from '@/components/common/DramaBoxSkleton'

export default function DramaExplorer({
    initialItems,
}: {
    initialItems: any[]
}) {
    const [items, setItems] = useState(initialItems)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    const pathname = usePathname()

    /* 🔥 FIX UTAMA: SYNC DATA DARI SERVER */
    useEffect(() => {
        setItems(initialItems)
    }, [initialItems])

    const activeCategory = useMemo(() => {
        const key = '/drama/china/channel/dramabox/kategori/'
        if (!pathname?.includes(key)) return undefined
        return pathname.replace(key, '').split('/')[0]
    }, [pathname])

    async function onSearch(e: React.FormEvent) {
        e.preventDefault()

        if (!query.trim()) {
            setItems(initialItems)
            return
        }

        setLoading(true)
        try {
            const res = await fetch(
                `https://api.sansekai.my.id/api/dramabox/search?query=${encodeURIComponent(
                    query
                )}`
            )
            const json = await res.json()
            setItems(Array.isArray(json) ? json : json?.data || [])
        } finally {
            setLoading(false)
        }
    }

    function onReset() {
        setQuery('')
        setItems(initialItems)
    }

    return (
        <section className="space-y-6">
            <div
                className="
    flex flex-col gap-3
    md:flex-row md:items-center md:justify-between md:gap-4
  "
            >
                {/* LEFT — FILTER */}
                <div className="w-full md:flex-1">
                    <DramaFilters active={query.trim() ? 'search' : activeCategory} />
                    <div className="py-4 px-2">
                        {/* SUB FILTER KHUSUS DUB INDO */}
                        {activeCategory === 'dubindo' && <DubIndoSubFilter />}
                    </div>
                </div>
                {/* RIGHT — SEARCH */}
                <form
                    onSubmit={onSearch}
                    className="
      flex items-center gap-2
      w-full md:max-w-sm
      rounded-full border
      bg-white px-4 py-2
      shadow-sm
    "
                >
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Cari drama China…"
                        className="flex-1 bg-transparent text-indigo-950 text-sm outline-none"
                    />

                    {/* RESET */}
                    {query && !loading && (
                        <button
                            type="button"
                            onClick={onReset}
                            aria-label="Reset pencarian"
                            className="text-gray-400 hover:text-gray-700 transition"
                        >
                            ✕
                        </button>
                    )}

                    {/* SEARCH */}
                    <button
                        type="submit"
                        className="text-gray-500 hover:text-black transition"
                        aria-label="Cari drama"
                    >
                        🔍
                    </button>
                </form>
            </div>
            <div className="w-full px-4 flex justify-end">
                <DramaShareIcons
                    title="Drama China Viral & Trending"
                    url={`${site}/drama/china/channel/dramabox`}
                    tags={['DramaChina', 'Dracin', 'DramaViral']}
                />
            </div>

            {/* RESULT */}
            {loading ? (
                <DramaBookSkeleton count={8} />
            ) : (
                <DramaBookGrid items={items} />
            )}
        </section>
    )
}