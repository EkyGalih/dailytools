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
      className="group block rounded-2xl border bg-white p-3 hover:shadow-lg transition"
    >
      {/* IMAGE */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-100">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform"
        />
      </div>

      {/* INFO */}
      <div className="mt-3 space-y-1">
        <h3 className="text-sm font-medium line-clamp-2">
          {product.title}
        </h3>

        {product.price && (
          <div className="text-red-600 font-semibold text-sm">
            {product.price}
          </div>
        )}

        <div className="text-[11px] text-gray-500">
          Beli di{' '}
          <span className="font-medium">
            {product.source === 'shopee' ? 'Shopee' : 'TikTok'}
          </span>
        </div>
      </div>
    </a>
  )
}