'use client'

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function RetryAnimeNotFound() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const timer = setTimeout(() => {
            router.refresh()
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    const handleRefresh = () => {
        setLoading(true)
        router.refresh()
    }

    return (
        <div className="tex t-white text-center py-20 font-black flex flex-col items-center gap-6">
            <p>ANIME TIDAK DITEMUKAN</p>

            <button
                onClick={handleRefresh}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-xl text-white text-sm transition-all"
            >
                {loading ? "Memuat ulang..." : "Coba Lagi"}
            </button>
        </div>
    )
}