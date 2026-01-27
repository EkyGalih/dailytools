'use client'

import { useEffect, useState } from 'react'
import AffiliateProductCard, {
    AffiliateProduct,
} from './AffiliateProductCard'

export default function AffiliateChannelPopup({
    product,
}: {
    product: AffiliateProduct
}) {
    const [open, setOpen] = useState(false)

    useEffect(() => {
        // muncul sekali saat refresh
        const timer = setTimeout(() => {
            setOpen(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="relative w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl">

                {/* CLOSE + LINK */}
                <a
                    href={product.link}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    onClick={() => setOpen(false)}
                    className="absolute right-4 top-4 text-gray-400 hover:text-black transition"
                >
                    ✕
                </a>

                <div className="mb-3">
                    <h3 className="text-sm font-semibold">
                        Rekomendasi Buat Kamu 🎁
                    </h3>
                    <p className="text-xs text-gray-500">
                        Lagi populer hari ini
                    </p>
                </div>

                <AffiliateProductCard product={product} />
            </div>
        </div>
    )
}