'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function ReelShortSearch() {
    const router = useRouter()
    const searchParams = useSearchParams()

    const qParam = searchParams.get('q') ?? ''
    const [q, setQ] = useState(qParam)

    function submit(e: React.FormEvent) {
        e.preventDefault()
        if (!q.trim()) return

        router.push(`/drama/china/channel/reelshort?q=${encodeURIComponent(q)}`)
    }

    function reset() {
        setQ('')
        router.push('/drama/china/channel/reelshort')
    }

    return (
        <form
            onSubmit={submit}
            className="
        w-full sm:max-w-md
        flex items-center gap-2
        rounded-full border bg-white
        px-4 py-2
        shadow-sm
      "
        >
            {/* ICON */}
            <span className="text-gray-400 text-sm">🔍</span>

            {/* INPUT */}
            <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Cari drama ReelShort..."
                className="flex-1 bg-transparent outline-none text-sm"
            />

            {/* RESET */}
            {q && (
                <button
                    type="button"
                    onClick={reset}
                    aria-label="Reset pencarian"
                    className="text-gray-400 hover:text-black transition"
                >
                    ✕
                </button>
            )}
        </form>
    )
}