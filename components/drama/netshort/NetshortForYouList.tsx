"use client"

import { useState } from "react"
import { getNetshortForYou } from "@/libs/drama/netshort/netshort"
import NetshortForYouGridCard from "./NetshortForyouCard"

export default function NetshortForYouList({ initialData }: { initialData: any[] }) {
    const [theaters, setTheaters] = useState(initialData)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [hasMore, setHasMore] = useState(true)

    const handleLoadMore = async () => {
        if (loading) return
        setLoading(true)

        try {
            const nextPage = page + 1
            const newData = await getNetshortForYou(nextPage)

            if (newData.length === 0) {
                setHasMore(false)
            } else {
                setTheaters([...theaters, ...newData])
                setPage(nextPage)
            }
        } catch (error) {
            console.error("Load more failed", error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="space-y-12">
            {/* GRID: 2 Kolom Mobile, 3 Kolom Desktop */}
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 mt-10">
                {theaters?.map((drama: any) => (
                    <NetshortForYouGridCard key={drama.id} drama={drama} />
                ))}
            </div>

            {/* LOAD MORE BUTTON */}
            {hasMore && (
                <div className="mt-16 flex justify-center">
                    <button
                        onClick={handleLoadMore}
                        disabled={loading}
                        className="group relative px-10 py-4 bg-zinc-900 text-white rounded-full font-black uppercase text-[10px] tracking-[0.2em] overflow-hidden hover:scale-105 transition-all disabled:opacity-50 active:scale-95 shadow-xl"
                    >
                        <span className="relative z-10">
                            {loading ? "Memuat..." : "Tampilkan Lebih Banyak"}
                        </span>
                        <div className="absolute inset-0 bg-rose-600 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
                    </button>
                </div>
            )}
        </div>
    )
}