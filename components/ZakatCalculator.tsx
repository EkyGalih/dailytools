'use client'

import {
  formatNumber,
  formatRupiah,
  parseNumber,
} from '@/libs/format'
import { useGoldPrice } from '@/libs/useGoldPrice'
import { useEffect, useState } from 'react'

export default function ZakatCalculator() {
  const [incomeInput, setIncomeInput] = useState('')
  const [goldPriceInput, setGoldPriceInput] =
    useState('')

  const [zakat, setZakat] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)

  // 🔥 AMBIL HARGA EMAS DARI MARKET INFO
  const { price: goldPrice, loading: goldLoading } =
    useGoldPrice()

  // auto isi harga emas saat data tersedia
  useEffect(() => {
    if (goldPrice) {
      setGoldPriceInput(
        goldPrice.toLocaleString('id-ID')
      )
    }
  }, [goldPrice])

  const calculate = () => {
    const income = parseNumber(incomeInput)
    const gold = parseNumber(goldPriceInput)

    if (!income || !gold) return

    setLoading(true)

    setTimeout(() => {
      const nisab = 85 * gold

      if (income >= nisab) {
        const result = income * 0.025
        setZakat(Math.round(result))
      } else {
        setZakat(0)
      }

      setLoading(false)
    }, 500)
  }

  return (
    <div className="space-y-4">
      {/* PENGHASILAN */}
      <div>
        <label className="block text-sm font-medium">
          Penghasilan Bulanan
        </label>
        <input
          type="text"
          inputMode="numeric"
          placeholder="Contoh: 5.000.000"
          className="w-full border p-2 rounded"
          value={incomeInput}
          onChange={(e) =>
            setIncomeInput(formatNumber(e.target.value))
          }
        />
      </div>

      {/* HARGA EMAS */}
      <div>
        <label className="block text-sm font-medium">
          Harga Emas / gram
        </label>
        <input
          type="text"
          inputMode="numeric"
          className="w-full border p-2 rounded"
          value={goldPriceInput}
          onChange={(e) =>
            setGoldPriceInput(formatNumber(e.target.value))
          }
        />
        <p className="text-xs text-gray-500 mt-1">
          {goldLoading
            ? 'Mengambil harga emas terbaru...'
            : 'Otomatis dari harga pasar hari ini'}
        </p>
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
        {loading ? 'Menghitung...' : 'Hitung Zakat'}
      </button>

      {/* RESULT */}
      {zakat !== null && !loading && (
        <div className="bg-gray-100 p-3 rounded">
          {zakat > 0 ? (
            <p>
              Zakat yang harus dibayar:{' '}
              <strong>{formatRupiah(zakat)}</strong>
            </p>
          ) : (
            <p>
              Penghasilan belum mencapai nisab.
            </p>
          )}
        </div>
      )}

      {zakat !== null && !loading && (
        <p className="text-xs text-gray-500">
          Hasil dibulatkan ke rupiah terdekat
        </p>
      )}
    </div>
  )
}