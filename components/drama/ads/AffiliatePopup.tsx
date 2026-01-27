'use client'

import { useEffect, useState } from 'react'
import AffiliateProductCard, {
    AffiliateProduct,
} from './AffiliateProductCard'

export default function AffiliatePopup({
    product,
    episode,
}: {
    product: AffiliateProduct
    episode: number
}) {
    const [open, setOpen] = useState(false)
    const [firstTime, setFirstTime] = useState(false)

    useEffect(() => {
        // hanya setiap 10 episode
        if (episode % 10 !== 0) return

        const shownKey = `affiliate_popup_episode_${episode}`

        if (!localStorage.getItem(shownKey)) {
            setFirstTime(true)
            localStorage.setItem(shownKey, '1')
        }

        const timer = setTimeout(() => {
            setOpen(true)
        }, 2000)

        return () => clearTimeout(timer)
    }, [episode])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="relative w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl">

                {/* CLOSE / LINK ICON */}
                <a
                    href={product.link}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    onClick={() => setOpen(false)}
                    aria-label="Lihat produk"
                    className="absolute right-4 top-4 text-gray-400 hover:text-black transition"
                >
                    ✕
                </a>

                {/* HEADER */}
                <div className="mb-3">
                    <h3 className="text-sm font-semibold">
                        Rekomendasi Buat Kamu 🎬
                    </h3>
                    <p className="text-xs text-gray-500">
                        Banyak yang pakai ini saat nonton drama
                    </p>
                </div>

                {/* PRODUCT */}
                <AffiliateProductCard product={product} />

                {/* DISCLAIMER */}
                <p className="mt-3 text-[10px] text-gray-400">
                    *Sebagian link merupakan affiliate.
                </p>
            </div>
        </div>
    )
}