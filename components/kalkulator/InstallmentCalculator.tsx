'use client'

import { useState } from 'react'
import {
  formatRupiah,
  formatNumber,
  parseNumber,
} from '@/libs/format'

type Result = {
  monthly: number
  totalInterest: number
  totalPayment: number
  totalWithDp: number
}

export default function InstallmentCalculator() {
  const [priceInput, setPriceInput] = useState('')
  const [dpInput, setDpInput] = useState('')
  const [tenor, setTenor] = useState(36)
  const [interest, setInterest] = useState(8)
  const [loading, setLoading] = useState(false)

  const [result, setResult] = useState<{
    flat: Result
    anuitas: Result
    dp: number
  } | null>(null)

  const calculate = () => {
    const price = parseNumber(priceInput)
    const dp = parseNumber(dpInput)

    if (!price || tenor <= 0) return

    setLoading(true)
    setResult(null)

    setTimeout(() => {
      const loan = price - (dp || 0)
      const yearlyRate = interest / 100
      const monthlyRate = yearlyRate / 12

      // ===== FLAT =====
      const flatInterest =
        loan * yearlyRate * (tenor / 12)
      const flatTotal = loan + flatInterest
      const flatMonthly = flatTotal / tenor

      // ===== ANUITAS =====
      const anuitasMonthly =
        (loan * monthlyRate) /
        (1 - Math.pow(1 + monthlyRate, -tenor))
      const anuitasTotal = anuitasMonthly * tenor
      const anuitasInterest = anuitasTotal - loan

      setResult({
        dp: dp || 0,
        flat: {
          monthly: Math.round(flatMonthly),
          totalInterest: Math.round(flatInterest),
          totalPayment: Math.round(flatTotal),
          totalWithDp: Math.round(
            flatTotal + (dp || 0)
          ),
        },
        anuitas: {
          monthly: Math.round(anuitasMonthly),
          totalInterest: Math.round(anuitasInterest),
          totalPayment: Math.round(anuitasTotal),
          totalWithDp: Math.round(
            anuitasTotal + (dp || 0)
          ),
        },
      })

      setLoading(false)
    }, 500)
  }

  const cheaper =
    result &&
    (result.flat.totalPayment <
    result.anuitas.totalPayment
      ? 'flat'
      : 'anuitas')

  return (
    <div className="space-y-4">
      {/* INPUT */}
      <div>
        <label className="block text-sm font-medium">
          Harga Kendaraan / Barang
        </label>
        <input
          type="text"
          inputMode="numeric"
          className="w-full border p-2 rounded"
          placeholder="Contoh: 150.000.000"
          value={priceInput}
          onChange={(e) =>
            setPriceInput(formatNumber(e.target.value))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Uang Muka (DP)
        </label>
        <input
          type="text"
          inputMode="numeric"
          className="w-full border p-2 rounded"
          value={dpInput}
          onChange={(e) =>
            setDpInput(formatNumber(e.target.value))
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Tenor (bulan)
        </label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={tenor}
          onChange={(e) => setTenor(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Bunga per Tahun (%)
        </label>
        <input
          type="number"
          className="w-full border p-2 rounded"
          value={interest}
          onChange={(e) =>
            setInterest(Number(e.target.value))
          }
        />
      </div>

      {/* BUTTON */}
      <button
        onClick={calculate}
        disabled={loading}
        className={`w-full flex items-center justify-center gap-2 bg-black text-white p-2 rounded transition
          ${
            loading
              ? 'opacity-70 cursor-wait'
              : 'cursor-pointer hover:bg-gray-900'
          }
        `}
      >
        {loading && (
          <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
        )}
        {loading
          ? 'Menghitung...'
          : 'Hitung Cicilan'}
      </button>

      {/* RESULT */}
      {result && (
        <div className="space-y-4 animate-fade-in">
          <h3 className="font-semibold text-lg">
            Perbandingan Metode Cicilan
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* FLAT */}
            <div
              className={`border rounded-xl p-4 space-y-2 ${
                cheaper === 'flat'
                  ? 'border-green-500 bg-green-50'
                  : 'bg-gray-50'
              }`}
            >
              <h4 className="font-semibold">
                Flat (Leasing)
              </h4>

              <p>
                Cicilan / bulan:
                <br />
                <strong>
                  {formatRupiah(
                    result.flat.monthly
                  )}
                </strong>
              </p>

              <p>
                Total bunga:
                <br />
                {formatRupiah(
                  result.flat.totalInterest
                )}
              </p>

              <p>
                Total pembayaran:
                <br />
                {formatRupiah(
                  result.flat.totalPayment
                )}
              </p>

              <p className="font-medium">
                Total + DP:
                <br />
                {formatRupiah(
                  result.flat.totalWithDp
                )}
              </p>

              {cheaper === 'flat' && (
                <span className="text-xs text-green-700 font-medium">
                  Lebih hemat ✅
                </span>
              )}
            </div>

            {/* ANUITAS */}
            <div
              className={`border rounded-xl p-4 space-y-2 ${
                cheaper === 'anuitas'
                  ? 'border-green-500 bg-green-50'
                  : 'bg-gray-50'
              }`}
            >
              <h4 className="font-semibold">
                Anuitas (Bank)
              </h4>

              <p>
                Cicilan / bulan:
                <br />
                <strong>
                  {formatRupiah(
                    result.anuitas.monthly
                  )}
                </strong>
              </p>

              <p>
                Total bunga:
                <br />
                {formatRupiah(
                  result.anuitas.totalInterest
                )}
              </p>

              <p>
                Total pembayaran:
                <br />
                {formatRupiah(
                  result.anuitas.totalPayment
                )}
              </p>

              <p className="font-medium">
                Total + DP:
                <br />
                {formatRupiah(
                  result.anuitas.totalWithDp
                )}
              </p>

              {cheaper === 'anuitas' && (
                <span className="text-xs text-green-700 font-medium">
                  Lebih hemat ✅
                </span>
              )}
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Perhitungan bersifat estimasi. Nilai aktual
            tergantung kebijakan leasing / bank.
          </p>
        </div>
      )}
    </div>
  )
}