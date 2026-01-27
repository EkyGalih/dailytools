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
        const timer = setTimeout(() => {
            setOpen(true)
        }, 3000)

        return () => clearTimeout(timer)
    }, [])

    if (!open) return null

    return (
        <div className="fixed inset-0 z-[90] bg-black/50 backdrop-blur-sm flex items-center justify-center px-4">
            <div className="relative w-full max-w-sm rounded-3xl bg-white p-5 shadow-2xl">

                {/* CLOSE */}
                <button
                    onClick={() => setOpen(false)}
                    aria-label="Tutup"
                    className="absolute right-4 top-4 text-indigo-950 hover:text-black transition"
                >
                    ✕
                </button>

                {/* HEADER */}
                <div className="mb-4">
                    <h3 className="text-sm text-indigo-950 font-semibold">
                        Rekomendasi Buat Kamu 🎁
                    </h3>
                    <p className="text-xs text-gray-500">
                        Banyak yang beli ini buat nonton nyaman
                    </p>
                </div>

                {/* PRODUCT CARD */}
                <AffiliateProductCard product={product} />

                {/* CTA */}
                <a
                    href={product.link}
                    target="_blank"
                    rel="nofollow sponsored noopener"
                    className="
            mt-4 block w-full text-center
            rounded-full
            bg-gradient-to-r from-orange-500 to-pink-500
            px-4 py-2.5
            text-sm font-semibold text-white
            shadow hover:opacity-90 transition
          "
                >
                    🛒 Checkout Sekarang
                </a>

                <p className="mt-2 text-[10px] text-gray-400 text-center">
                    *Link affiliate. Dukunganmu membantu kami terus update 🙏
                </p>
            </div>
        </div>
    )
}