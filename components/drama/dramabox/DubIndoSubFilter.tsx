'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'

type Classify = 'terbaru' | 'terpopuler'

export default function DubIndoSubFilter() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const pathname = usePathname()

  // hanya tampil di halaman dubindo
  if (!pathname.endsWith('/dubindo')) return null

  const current = (searchParams.get('classify') as Classify) || 'terbaru'

  function setFilter(value: Classify) {
    if (value === current) return

    const params = new URLSearchParams(searchParams.toString())
    params.set('classify', value)

    // 🔑 penting: push ke pathname + query
    router.push(`${pathname}?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 px-4">
      <button
        type="button"
        onClick={() => setFilter('terbaru')}
        className={`px-3 py-1.5 rounded-full text-sm border transition ${
          current === 'terbaru'
            ? 'bg-gradient-to-br from-purple-950 via-indigo-950 to-black text-white'
            : 'bg-white text-indigo-950 hover:bg-purple-950 hover:text-white'
        }`}
      >
        Terbaru
      </button>

      <button
        type="button"
        onClick={() => setFilter('terpopuler')}
        className={`px-3 py-1.5 rounded-full text-sm border transition ${
          current === 'terpopuler'
            ? 'bg-gradient-to-br from-purple-950 via-indigo-950 to-black text-white'
            : 'bg-white text-indigo-950 hover:bg-purple-950 hover:text-white'
        }`}
      >
        Terpopuler
      </button>
    </div>
  )
}