'use client'

import {
  formatNumber,
  formatRupiah,
  parseNumber,
} from '@/libs/format'
import { useState } from 'react'

export default function FidyaCalculator() {
  const [days, setDays] = useState(1)
  const [mealPriceInput, setMealPriceInput] = useState('')
  const [result, setResult] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const calculate = () => {
    const mealPrice = parseNumber(mealPriceInput)
    if (!days || !mealPrice) return

    setLoading(true)

    setTimeout(() => {
      const total = days * mealPrice
      setResult(Math.round(total))
      setLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-4">
      {/* DAYS */}
      <div>
        <label className="block text-sm font-medium">
          Jumlah Hari Puasa
        </label>
        <input
          type="number"
          min={1}
          className="w-full border p-2 rounded"
          value={days}
          onChange={(e) =>
            setDays(Number(e.target.value))
          }
        />
      </div>

      {/* MEAL PRICE */}
      <div>
        <label className="block text-sm font-medium">
          Biaya Makan per Hari
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Contoh: 25.000"
          className="w-full border p-2 rounded"
          value={mealPriceInput}
          onChange={(e) =>
            setMealPriceInput(
              formatNumber(e.target.value)
            )
          }
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={calculate}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 p-2 rounded
          bg-black text-white transition
          ${
            loading
              ? 'opacity-70 cursor-not-allowed'
              : 'cursor-pointer hover:bg-gray-900'
          }
        `}
      >
        {loading && (
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {loading ? 'Menghitung...' : 'Hitung Fidya'}
      </button>

      {/* RESULT */}
      {result !== null && !loading && (
        <div className="bg-gray-100 p-4 rounded">
          <p>
            Total Fidya:{' '}
            <strong>{formatRupiah(result)}</strong>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Berdasarkan satu porsi makan per hari.
          </p>
        </div>
      )}
    </div>
  )
}