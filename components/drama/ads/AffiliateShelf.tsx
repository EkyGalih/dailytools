'use client'

import Image from 'next/image'
import { ShoppingBag } from 'lucide-react'
import { AffiliateProduct } from './AffiliateProductCard'

export default function AffiliateShelf({ products }: { products: AffiliateProduct[] }) {
    if (!products || products.length === 0) return null

    return (
        <section className="mt-8 md:mt-12 border-t border-zinc-100 pt-6">
            {/* Header Super Minimalis */}
            <div className="flex items-center justify-between mb-4 px-4">
                <div className="flex items-center gap-1.5">
                    <ShoppingBag className="w-3 h-3 text-purple-600" />
                    <h3 className="text-[9px] font-black uppercase tracking-[0.15em] text-zinc-400">
                        Top <span className="text-zinc-900">Picks</span>
                    </h3>
                </div>
                <span className="text-[8px] font-bold text-zinc-300 uppercase tracking-widest">Swipe →</span>
            </div>

            {/* Horizontal Scroll - Ukuran diperkecil */}
            <div className="flex gap-3 overflow-x-auto pb-4 px-4 no-scrollbar">
                {products.map((p, i) => (
                    <a
                        key={i}
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 w-[110px] md:w-[130px] group bg-white border border-zinc-100 rounded-xl p-1.5 transition-all active:scale-95 hover:border-purple-200"
                    >
                        {/* Image Wrap - Aspect Square lebih kecil */}
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-zinc-50 mb-2">
                            <Image
                                src={p.image}
                                alt={p.title}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>

                        {/* Info Ringkas */}
                        <div className="space-y-1">
                            <p className="text-[9px] font-bold text-zinc-700 line-clamp-1 leading-tight px-0.5 italic">
                                {p.title}
                            </p>
                            <div className="flex items-center justify-between gap-1 px-0.5">
                                <span className="text-[10px] font-black text-purple-600 tracking-tighter uppercase italic">
                                    {p.price}
                                </span>
                                <div className="w-4 h-4 rounded-full bg-zinc-50 flex items-center justify-center border border-zinc-100">
                                    <ShoppingBag className="w-2 h-2 text-zinc-300" />
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>

            <style jsx>{`
                .no-scrollbar::-webkit-scrollbar { display: none; }
                .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>
        </section>
    )
}