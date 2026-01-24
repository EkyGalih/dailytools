'use client'

import { useGoldPrice } from '@/libs/useGoldPrice'
import { useFxRates } from '@/libs/useFxRates'
import { formatRupiah } from '@/libs/format'

export default function MarketInfo() {
    const {
        price,
        changePercent: goldChangePercent,
        loading: goldLoading,
    } = useGoldPrice()

    const {
        rates,
        loading: fxLoading,
    } = useFxRates()

    const goldIsUp =
        typeof goldChangePercent === 'number' &&
        goldChangePercent > 0

    const goldIsDown =
        typeof goldChangePercent === 'number' &&
        goldChangePercent < 0
    return (
        <aside className="border rounded-2xl p-5 bg-white shadow-sm space-y-5">
            <h3 className="font-semibold text-lg">
                Trend Pasar Hari Ini
            </h3>

            {/* ================= GOLD ================= */}
            <ul className="space-y-3 text-sm">
                <li className="flex justify-between items-center">
                    <span className="text-gray-600">
                        Emas (gram)
                    </span>

                    <div className="flex items-center gap-2">
                        <span className="font-medium">
                            {goldLoading && 'Memuat...'}
                            {!goldLoading && price !== null &&
                                formatRupiah(price)}
                            {!goldLoading && price === null && '-'}
                        </span>

                        {!goldLoading &&
                            typeof goldChangePercent === 'number' && (
                                <span
                                    className={`text-xs font-medium ${goldIsUp
                                            ? 'text-green-600'
                                            : goldIsDown
                                                ? 'text-red-600'
                                                : 'text-gray-500'
                                        }`}
                                >
                                    {goldIsUp && '+'}
                                    {goldChangePercent.toFixed(2)}%
                                </span>
                            )}
                    </div>
                </li>
            </ul>

            {/* ================= FX ================= */}
            <div>
                <p className="text-xs text-gray-500 mb-2">
                    Nilai Tukar Rupiah
                </p>

                <ul className="space-y-2 text-sm">
                    {fxLoading && (
                        <li className="text-gray-500">
                            Memuat kurs...
                        </li>
                    )}

                    {!fxLoading &&
                        rates.map((item) => {
                            const change =
                                typeof item.changePercent === 'number'
                                    ? item.changePercent
                                    : 0

                            const isUp = change > 0
                            const isDown = change < 0

                            return (
                                <li
                                    key={item.code}
                                    className="flex justify-between items-center"
                                >
                                    <span className="text-gray-600">
                                        1 {item.code}
                                    </span>

                                    <div className="flex items-center gap-2">
                                        <span className="font-medium">
                                            {formatRupiah(item.rate)}
                                        </span>

                                        <span
                                            className={`text-xs font-medium ${isUp
                                                    ? 'text-green-600'
                                                    : isDown
                                                        ? 'text-red-600'
                                                        : 'text-gray-500'
                                                }`}
                                        >
                                            {isUp && '+'}
                                            {change.toFixed(2)}%
                                        </span>
                                    </div>
                                </li>
                            )
                        })}

                    {!fxLoading && rates.length === 0 && (
                        <li className="text-gray-500">
                            Data kurs tidak tersedia
                        </li>
                    )}
                </ul>
            </div>

            <p className="text-xs text-gray-500">
                Data bersifat indikatif dan dapat berbeda antar
                penyedia.
            </p>
        </aside>
    )
}