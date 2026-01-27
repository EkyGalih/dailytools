import Image from 'next/image'

export type AffiliateProduct = {
  title: string
  image: string
  price?: string
  link: string
  source: 'shopee' | 'tiktok'
}

export default function AffiliateProductCard({
  product,
}: {
  product: AffiliateProduct
}) {
  return (
    <div className="rounded-xl border bg-white p-2">
      {/* IMAGE */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 160px"
          className="object-cover"
        />
      </div>

      {/* INFO */}
      <div className="mt-2 space-y-0.5">
        <h3 className="text-xs font-medium leading-snug text-indigo-950 line-clamp-2">
          {product.title}
        </h3>

        {product.price && (
          <div className="text-red-600 font-semibold text-xs">
            {product.price}
          </div>
        )}

        <a
          href={product.link}
          target="_blank"
          rel="noopener noreferrer sponsored"
          className="mt-1 inline-flex items-center justify-center
                     w-full rounded-md
                     bg-gradient-to-r from-orange-600 to-orange-600
                     px-2 py-1
                     text-[10px] font-semibold text-white
                     hover:from-orange-700 hover:to-orange-700
                     transition"
        >
          Checkout di {product.source === 'shopee' ? 'Shopee' : 'TikTok'}
        </a>
      </div>
    </div>
  )
}