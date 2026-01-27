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
    <a
      href={product.link}
      target="_blank"
      rel="nofollow sponsored noopener"
      className="group block rounded-xl border bg-white p-2
                 hover:shadow-md transition"
    >
      {/* IMAGE */}
      <div className="relative aspect-square rounded-lg overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 160px"
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* INFO */}
      <div className="mt-2 space-y-0.5">
        <h3 className="text-xs font-medium leading-snug line-clamp-2">
          {product.title}
        </h3>

        {product.price && (
          <div className="text-red-600 font-semibold text-xs">
            {product.price}
          </div>
        )}

        <div className="text-[10px] text-gray-500">
          {product.source === 'shopee' ? 'Shopee' : 'TikTok'}
        </div>
      </div>
    </a>
  )
}