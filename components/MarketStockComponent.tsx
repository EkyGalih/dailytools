'use client'

import { useMarketTrend } from '@/libs/MarketTrends'

export default function MarketStockTrend() {
    const { data, loading } = useMarketTrend()

    return (
        <div className="bg-white border rounded-2xl p-5 shadow-sm">
            <h3 className="font-semibold text-base mb-3">
                📈 Trend Pasar Saham
            </h3>

            {loading && (
                <p className="text-xs text-gray-500">
                    Memuat data pasar…
                </p>
            )}

            <ul className="space-y-2 text-sm">
                {data.map((item) => {
                    const up = item.changePercent > 0

                    return (
                        <li
                            key={item.symbol}
                            className="flex justify-between items-center"
                        >
                            <span className="text-gray-700">
                                {item.label}
                            </span>

                            <span
                                className={`font-medium ${up ? 'text-green-600' : 'text-red-600'
                                    }`}
                            >
                                {up ? '▲' : '▼'} {item.changePercent.toFixed(2)}%
                            </span>
                        </li>
                    )
                })}
            </ul>

            <p className="text-[11px] text-gray-500 mt-3">
                Data indikatif • update harian
            </p>
        </div>
    )
}