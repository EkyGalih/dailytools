'use client'

import Image from 'next/image'
import { AffiliateProduct } from './AffiliateProductCard'

export default function AffiliateProductMiniCard({
  product,
}: {
  product: AffiliateProduct
}) {
  return (
    <a
      href={product.link}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="flex items-center gap-3"
    >
      <div className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover"
        />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-medium line-clamp-2">
          {product.title}
        </p>
        <p className="text-xs font-semibold text-red-600 mt-0.5">
          {product.price}
        </p>
      </div>
    </a>
  )
}