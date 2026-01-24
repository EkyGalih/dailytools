'use client'

import { useState } from 'react'
import {
    formatRupiah,
    formatNumber,
    parseNumber,
} from '@/libs/format'
import { useRouter } from 'next/navigation'

const PTKP_MAP: Record<string, number> = {
    TK0: 54000000,
    K0: 58500000,
    K1: 63000000,
    K2: 67500000,
    K3: 72000000,
}

const PTKP_OPTIONS = [
    { label: 'TK/0 (Lajang)', value: 'TK0' },
    { label: 'K/0 (Menikah)', value: 'K0' },
    { label: 'K/1', value: 'K1' },
    { label: 'K/2', value: 'K2' },
    { label: 'K/3', value: 'K3' },
]

export default function Pph21Calculator() {
    const [salaryInput, setSalaryInput] = useState('')
    const [ptkpKey, setPtkpKey] = useState('TK0')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const [result, setResult] = useState<null | {
        yearlyTax: number
        monthlyTax: number
        salaryYearly: number
        jobCost: number
        netIncome: number
        ptkp: number
        pkp: number
    }>(null)

    const calculateProgressiveTax = (pkp: number) => {
        let tax = 0
        let remaining = pkp

        const layers = [
            { limit: 60000000, rate: 0.05 },
            { limit: 190000000, rate: 0.15 },
            { limit: 250000000, rate: 0.25 },
            { limit: 4500000000, rate: 0.3 },
            { limit: Infinity, rate: 0.35 },
        ]

        for (const layer of layers) {
            if (remaining <= 0) break
            const taxable = Math.min(remaining, layer.limit)
            tax += taxable * layer.rate
            remaining -= taxable
        }

        return Math.round(tax)
    }

    const calculate = () => {
        const salaryMonthly = parseNumber(salaryInput)
        if (!salaryMonthly) return

        setLoading(true)

        setTimeout(() => {
            const salaryYearly = salaryMonthly * 12

            const jobCost = Math.min(
                salaryYearly * 0.05,
                6000000
            )

            const netIncome = salaryYearly - jobCost
            const ptkp = PTKP_MAP[ptkpKey]
            const pkp = Math.max(netIncome - ptkp, 0)

            const yearlyTax =
                pkp > 0 ? calculateProgressiveTax(pkp) : 0

            setResult({
                yearlyTax,
                monthlyTax: Math.round(yearlyTax / 12),
                salaryYearly,
                jobCost,
                netIncome,
                ptkp,
                pkp,
            })

            setLoading(false)
        }, 600)
    }

    return (
        <div className="space-y-4">
            {/* INPUT */}
            <div>
                <label className="block text-sm font-medium">
                    Gaji Bulanan
                </label>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Contoh: 8.000.000"
                    className="w-full border p-2 rounded"
                    value={salaryInput}
                    onChange={(e) =>
                        setSalaryInput(formatNumber(e.target.value))
                    }
                />
            </div>

            <div>
                <label className="block text-sm font-medium">
                    Status PTKP
                </label>
                <select
                    className="w-full border p-2 rounded bg-white"
                    value={ptkpKey}
                    onChange={(e) => setPtkpKey(e.target.value)}
                >
                    {PTKP_OPTIONS.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                            {opt.label}
                        </option>
                    ))}
                </select>
            </div>

            {/* BUTTON */}
            <button
                onClick={calculate}
                disabled={loading}
                className={`w-full flex justify-center items-center gap-2 p-2 rounded
          bg-black text-white transition
          ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-900'}
        `}
            >
                {loading && (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? 'Menghitung...' : 'Hitung PPh 21'}
            </button>

            {/* RESULT */}
            {result && !loading && (
                <div className="bg-gray-100 p-4 rounded space-y-3">
                    <div>
                        <p className="text-sm text-gray-600">
                            Estimasi PPh 21 Bulanan
                        </p>
                        <p className="text-xl font-semibold">
                            {formatRupiah(result.monthlyTax)}
                        </p>
                    </div>

                    <div className="border-t pt-3 space-y-1 text-sm">
                        <p>Gaji Tahunan: {formatRupiah(result.salaryYearly)}</p>
                        <p>Biaya Jabatan: {formatRupiah(result.jobCost)}</p>
                        <p>Penghasilan Neto: {formatRupiah(result.netIncome)}</p>
                        <p>PTKP: {formatRupiah(result.ptkp)}</p>
                        <p>PKP: {formatRupiah(result.pkp)}</p>
                        <p className="font-medium">
                            PPh 21 Tahunan: {formatRupiah(result.yearlyTax)}
                        </p>
                    </div>

                    <p className="text-xs text-gray-500">
                        Perhitungan ini bersifat estimasi dan mengikuti tarif PPh 21
                        progresif yang berlaku secara umum.
                    </p>
                    <button
                        onClick={() =>
                            router.push(
                                `/take-home-pay?pph=${result.monthlyTax}`
                            )
                        }
                        className="w-full mt-3 border border-black p-2 rounded cursor-pointer hover:bg-gray-100 transition"
                    >
                        Hitung Gaji Bersih
                    </button>
                </div>
            )}
        </div>
    )
}