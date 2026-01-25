'use client'

import { formatRupiah } from '@/libs/format'
import { useExchangeRates } from '@/libs/useFxRates'

export default function MarketInfo() {
  const { rates, loading } = useExchangeRates()

  return (
    <aside className="border rounded-2xl p-5 bg-white shadow-sm space-y-4">
      <p className="text-xs text-gray-500">
        Nilai Tukar Mata Uang ke Rupiah
      </p>

      <ul className="space-y-2 text-sm">
        {loading && (
          <li className="text-gray-500">
            Memuat kurs…
          </li>
        )}

        {!loading &&
          rates.map((item) => (
            <li
              key={item.code}
              className="flex justify-between items-center"
            >
              <span className="text-gray-600">
                1 {item.code}
              </span>

              <span className="font-medium">
                {formatRupiah(item.rate)}
              </span>
            </li>
          ))}

        {!loading && rates.length === 0 && (
          <li className="text-gray-500">
            Data kurs tidak tersedia
          </li>
        )}
      </ul>

      <p className="text-xs text-gray-500">
        Data bersifat indikatif (harian).
      </p>
    </aside>
  )
}