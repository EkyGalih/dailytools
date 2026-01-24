'use client'

import {
  formatNumber,
  formatRupiah,
  parseNumber,
} from '@/libs/format'
import { useState } from 'react'

const RICE_PER_PERSON_KG = 2.5

export default function ZakatFitrahCalculator() {
  const [people, setPeople] = useState(1)
  const [ricePriceInput, setRicePriceInput] =
    useState('')
  const [result, setResult] = useState<null | {
    totalRice: number
    totalMoney: number
  }>(null)

  const [loading, setLoading] = useState(false)

  const calculate = () => {
    const ricePrice = parseNumber(ricePriceInput)
    if (!people || !ricePrice) return

    setLoading(true)

    setTimeout(() => {
      const totalRice =
        people * RICE_PER_PERSON_KG
      const totalMoney =
        totalRice * ricePrice

      setResult({
        totalRice,
        totalMoney: Math.round(totalMoney),
      })

      setLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-4">
      {/* JUMLAH JIWA */}
      <div>
        <label className="block text-sm font-medium">
          Jumlah Jiwa
        </label>
        <input
          type="number"
          min={1}
          className="w-full border p-2 rounded"
          value={people}
          onChange={(e) =>
            setPeople(Number(e.target.value))
          }
        />
      </div>

      {/* HARGA BERAS */}
      <div>
        <label className="block text-sm font-medium">
          Harga Beras per Kg
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Contoh: 15.000"
          className="w-full border p-2 rounded"
          value={ricePriceInput}
          onChange={(e) =>
            setRicePriceInput(
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
        {loading
          ? 'Menghitung...'
          : 'Hitung Zakat Fitrah'}
      </button>

      {/* RESULT */}
      {result && !loading && (
        <div className="bg-gray-100 p-4 rounded space-y-2">
          <p>
            Total Beras:{' '}
            <strong>
              {result.totalRice.toFixed(2)} kg
            </strong>
          </p>
          <p>
            Total Zakat (Uang):{' '}
            <strong>
              {formatRupiah(result.totalMoney)}
            </strong>
          </p>

          <p className="text-xs text-gray-500">
            Perhitungan berdasarkan 2,5 kg beras per jiwa.
          </p>
        </div>
      )}
    </div>
  )
}