'use client'

import { useState } from 'react'
import DramaBookGrid from './DramaBoxGrid'

export default function DramaExplorer({
    initialItems,
}: {
    initialItems: any[]
}) {
    const [items, setItems] = useState(initialItems)
    const [loading, setLoading] = useState(false)
    const [query, setQuery] = useState('')

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
            {/* SEARCH */}
            <form
                onSubmit={onSearch}
                className="flex items-center gap-2 rounded-full border bg-white px-4 py-2 shadow-sm"
            >
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Cari drama China…"
                    className="flex-1 bg-transparent text-sm outline-none"
                />

                {/* RESET BUTTON */}
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

                {/* SEARCH BUTTON */}
                <button
                    type="submit"
                    className="text-gray-500 hover:text-black transition"
                    aria-label="Cari drama"
                >
                    🔍
                </button>
            </form>

            {/* RESULT */}
            {loading ? (
                <p className="text-sm text-gray-500">Mencari drama…</p>
            ) : (
                <DramaBookGrid items={items} />
            )}
        </section>
    )
}