'use client'

import {
    formatNumber,
    formatRupiah,
    parseNumber,
} from '@/libs/format'
import { useState } from 'react'

export default function ZakatCalculator() {
    const [incomeInput, setIncomeInput] = useState('')
    const [goldPriceInput, setGoldPriceInput] = useState('')
    const [zakat, setZakat] = useState<number | null>(null)
    const [loading, setLoading] = useState(false)

    const calculate = () => {
        const income = parseNumber(incomeInput)
        const goldPrice = parseNumber(goldPriceInput)

        if (!income || !goldPrice) return

        setLoading(true)
        setZakat(null)

        setTimeout(() => {
            const nisab = 85 * goldPrice

            if (income >= nisab) {
                const result = income * 0.025
                setZakat(Math.round(result))
            } else {
                setZakat(0)
            }

            setLoading(false)
        }, 400)
    }

    return (
        <div className="space-y-4">
            {/* ================= PENGHASILAN ================= */}
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

            {/* ================= HARGA EMAS ================= */}
            <div>
                <label className="block text-sm font-medium">
                    Harga Emas per Gram
                </label>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Contoh: 1.200.000"
                    className="w-full border p-2 rounded"
                    value={goldPriceInput}
                    onChange={(e) =>
                        setGoldPriceInput(formatNumber(e.target.value))
                    }
                />
                <p className="text-xs text-gray-500 mt-1">
                    Masukkan harga emas 24K per gram
                </p>
            </div>

            {/* ================= BUTTON ================= */}
            <button
                onClick={calculate}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2
          bg-black text-white p-2 rounded transition
          ${loading
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

            {/* ================= RESULT ================= */}
            {zakat !== null && !loading && (
                <div className="bg-gray-100 p-3 rounded">
                    {zakat > 0 ? (
                        <p>
                            Zakat yang harus dibayar:{' '}
                            <strong>{formatRupiah(zakat)}</strong>
                        </p>
                    ) : (
                        <p>
                            Penghasilan belum mencapai nisab zakat.
                        </p>
                    )}
                </div>
            )}

            {zakat !== null && !loading && (
                <p className="text-xs text-gray-500">
                    Perhitungan menggunakan nisab 85 gram emas
                </p>
            )}
        </div>
    )
}