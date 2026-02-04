'use client'

import { useEffect, useMemo, useState } from 'react'
import { usePathname } from 'next/navigation'
import DramaBookGrid from './DramaBoxGrid'
import DramaShareIcons from './DramaShareIcon'
import DramaFilters from './DramaFilter'
import DubIndoSubFilter from './DubIndoSubFilter'
import DramaBookSkeleton from '@/components/common/DramaBoxSkleton'
import { Search, X } from 'lucide-react'
import MaintenancePage from '@/components/common/MaintenancePage'

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

    useEffect(() => {
        setItems(initialItems)
    }, [initialItems])

    const activeCategory = useMemo(() => {
        const key = '/drama/china/channel/dramabox/kategori/'
        if (!pathname?.includes(key)) return undefined
        return pathname.replace(key, '').split('/')[0]
    }, [pathname])

    const isVIP = activeCategory === "vip"

    function renderVipSections() {
        return (
            <div className="space-y-14">
                {items.map((col: any) => (
                    <div key={col.columnId}>
                        {/* Title */}
                        <h2 className="text-xl md:text-2xl font-black text-zinc-900 mb-5">
                            {col.title}
                        </h2>

                        {/* Grid */}
                        <DramaBookGrid items={col.bookList || []} />
                    </div>
                ))}
            </div>
        )
    }

    async function onSearch(e: React.FormEvent) {
        e.preventDefault()
        if (isVIP) return
        if (!query.trim()) {
            setItems(initialItems)
            return
        }
        setLoading(true)
        try {
            const res = await fetch(`https://api.sansekai.my.id/api/dramabox/search?query=${encodeURIComponent(query)}`)
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
        <section className="space-y-8">
            {/* --- ACTION BAR --- */}
            <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between border-b border-zinc-50 pb-6">

                {/* LEFT: CATEGORY LIST (Scrolled on Mobile) */}
                <div className="w-full lg:flex-1 overflow-hidden">
                    <DramaFilters active={query.trim() ? 'search' : activeCategory} />
                </div>

                {/* RIGHT: DUB INDO FILTER & SEARCH */}
                <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">

                    {/* SUB FILTER DUB INDO: Muncul di atas search (Mobile) & Samping Kiri search (Desktop) */}
                    {activeCategory === 'dubindo' && (
                        <div className="w-full sm:w-auto animate-in fade-in slide-in-from-right-4 duration-500">
                            <DubIndoSubFilter />
                        </div>
                    )}

                    {/* SEARCH FORM */}
                    <form
                        onSubmit={onSearch}
                        className="flex items-center gap-3 w-full sm:min-w-[300px] lg:max-w-sm rounded-[1.2rem] border border-zinc-100 bg-zinc-50/50 px-4 py-2.5 transition-all focus-within:border-purple-300 focus-within:bg-white focus-within:shadow-md"
                    >
                        <Search className="w-4 h-4 text-zinc-400" />
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Cari drama favorit..."
                            className="flex-1 bg-transparent text-zinc-900 text-sm font-medium outline-none placeholder:text-zinc-400"
                        />

                        {query && !loading && (
                            <button type="button" onClick={onReset} className="p-1 rounded-full hover:bg-zinc-200 text-zinc-400 transition">
                                <X className="w-3.5 h-3.5" />
                            </button>
                        )}
                    </form>
                </div>
            </div>

            {/* --- SHARE BAR --- */}
            <div className="flex justify-end px-2">
                <DramaShareIcons
                    title="Drama China Viral & Trending"
                    url={`${site}/drama/china/channel/dramabox`}
                    tags={['DramaChina', 'Dracin', 'DramaViral']}
                />
            </div>

            {/* --- RESULT AREA --- */}
            <div className="min-h-[500px]">
                {loading ? (
                    <div className="pt-10">
                        <DramaBookSkeleton count={10} />
                    </div>
                ) : isVIP ? (
                    <MaintenancePage />
                    // renderVipSections()
                ) : (
                    <DramaBookGrid items={items} />
                )}
            </div>
        </section>
    )
}