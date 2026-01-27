'use client'

import { useRouter, useSearchParams } from 'next/navigation'

export default function DubIndoSubFilter() {
    const router = useRouter()
    const search = useSearchParams()

    const current = search.get('classify') || 'terbaru'

    function setFilter(v: 'terbaru' | 'terpopuler') {
        const params = new URLSearchParams(search.toString())
        params.set('classify', v)
        router.push(`?${params.toString()}`)
    }

    return (
        <div className="flex gap-2 px-4">
            <button
                onClick={() => setFilter('terbaru')}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${current === 'terbaru'
                        ? 'bg-black text-white border-black'
                        : 'bg-white hover:bg-gray-50'
                    }`}
            >
                Terbaru
            </button>

            <button
                onClick={() => setFilter('terpopuler')}
                className={`px-3 py-1.5 rounded-full text-sm border transition ${current === 'terpopuler'
                        ? 'bg-black text-white border-black'
                        : 'bg-white hover:bg-gray-50'
                    }`}
            >
                Terpopuler
            </button>
        </div>
    )
}