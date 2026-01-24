'use client'

import {
  formatNumber,
  formatRupiah,
  parseNumber,
} from '@/libs/format'
import { useState } from 'react'

export default function ThrCalculator() {
  const [salaryInput, setSalaryInput] = useState('')
  const [months, setMonths] = useState(0)
  const [thr, setThr] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  const calculate = () => {
    const salary = parseNumber(salaryInput)
    if (!salary || !months) return

    setLoading(true)

    setTimeout(() => {
      let result = 0

      if (months >= 12) {
        result = salary
      } else {
        result = (months / 12) * salary
      }

      setThr(Math.round(result))
      setLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-4">
      {/* GAJI */}
      <div>
        <label className="block text-sm font-medium">
          Gaji Bulanan
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Contoh: 4.500.000"
          className="w-full border p-2 rounded"
          value={salaryInput}
          onChange={(e) =>
            setSalaryInput(formatNumber(e.target.value))
          }
        />
        <p className="text-xs text-gray-500 mt-1">
          Otomatis menggunakan pemisah ribuan
        </p>
      </div>

      {/* MASA KERJA */}
      <div>
        <label className="block text-sm font-medium">
          Masa Kerja (bulan)
        </label>
        <input
          type="number"
          min={1}
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setMonths(Number(e.target.value))
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
        {loading ? 'Menghitung...' : 'Hitung THR'}
      </button>

      {/* RESULT */}
      {thr !== null && !loading && (
        <div className="bg-gray-100 p-3 rounded">
          <p>
            Perkiraan THR:{' '}
            <strong>{formatRupiah(thr)}</strong>
          </p>
        </div>
      )}
    </div>
  )
}