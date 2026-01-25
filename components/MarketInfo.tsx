'use client'

import { formatRupiah } from '@/libs/format'
import { useExchangeRates } from '@/libs/useFxRates'

export default function MarketInfo() {
  const { rates, loading: fxLoading } = useExchangeRates()

  return (
    <aside className="border rounded-2xl p-5 bg-white shadow-sm space-y-6">
      {/* ================= FX ================= */}
      <div>
        <p className="text-xs text-gray-500 mb-3">
          Nilai Tukar Mata Uang ke Rupiah
        </p>

        <ul className="space-y-2 text-sm">
          {fxLoading && (
            <li className="text-gray-500">
              Memuat kurs…
            </li>
          )}

          {!fxLoading &&
            rates.map((item) => {
              const change =
                typeof item.changePercent === 'number'
                  ? item.changePercent
                  : null

              const isUp = change !== null && change > 0
              const isDown = change !== null && change < 0

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

                    {change !== null && (
                      <span
                        className={`text-xs font-medium ${
                          isUp
                            ? 'text-green-600'
                            : isDown
                            ? 'text-red-600'
                            : 'text-gray-500'
                        }`}
                      >
                        {isUp && '▲'}
                        {isDown && '▼'}
                        {Math.abs(change).toFixed(2)}%
                      </span>
                    )}
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
        Data bersifat indikatif (harian) dan bukan untuk
        keperluan trading.
      </p>
    </aside>
  )
}