'use client'

import { useEffect, useState } from 'react'
import AffiliateProductMiniCard from './AffiliateProductMiniCard'
import { AffiliateProduct } from './AffiliateProductCard'
import { getAffiliatePopup } from '@/libs/ads/getAffiliatePopup'

const POSITION: 'right' | 'left' = 'right'

export default function AffiliateMiniPopup() {
  const [open, setOpen] = useState(false)
  const [product, setProduct] = useState<AffiliateProduct | null>(null)

  useEffect(() => {
    setProduct(getAffiliatePopup())

    const timer = setTimeout(() => {
      setOpen(true)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  if (!open || !product) return null

  return (
    <div
      className={`fixed bottom-4 ${
        POSITION === 'right' ? 'right-4' : 'left-4'
      } z-[110]`}
    >
      <div className="relative w-72 rounded-2xl bg-white border shadow-xl p-3">

        {/* CLOSE */}
        <button
          onClick={() => setOpen(false)}
          aria-label="Tutup iklan"
          className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-black text-white text-xs flex items-center justify-center"
        >
          ✕
        </button>

        <p className="text-[11px] text-indigo-950 font-semibold mb-2">
          Rekomendasi buat kamu
        </p>

        <AffiliateProductMiniCard product={product} />

        <p className="mt-2 text-[10px] text-orange-800">
          *Affiliate
        </p>
      </div>
    </div>
  )
}