"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function RefreshButton() {
    const router = useRouter()
    const [loading, setLoading] = useState(false)

    function handleRefresh() {
        setLoading(true)

        // kasih delay biar animasi sempat muncul
        setTimeout(() => {
            router.refresh()
        }, 300)
    }

    return (
        <button
            onClick={handleRefresh}
            disabled={loading}
            className="inline-flex items-center gap-2 mt-6 px-5 py-2 rounded-full
        bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition
        disabled:opacity-60 disabled:cursor-not-allowed"
        >
            {loading ? (
                <>
                    {/* Spinner */}
                    <span className="h-4 w-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                    Loading...
                </>
            ) : (
                <>🔄 Refresh Halaman</>
            )}
        </button>
    )
}