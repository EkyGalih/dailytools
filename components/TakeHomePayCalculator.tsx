'use client'

import { useState, useEffect } from 'react'
import { formatRupiah, formatNumber, parseNumber } from '@/libs/format'
import { useSearchParams } from 'next/navigation'


export default function TakeHomePayCalculator() {
    const searchParams = useSearchParams()
    const pphFromQuery = searchParams.get('pph')
    const [salaryInput, setSalaryInput] = useState('')
    const [pphInput, setPphInput] = useState('') // estimasi PPh21 bulanan
    const [loading, setLoading] = useState(false)

    const [result, setResult] = useState<null | {
        gross: number
        pph21: number
        bpjsHealth: number
        bpjsTk: number
        net: number
    }>(null)

    useEffect(() => {
        if (pphFromQuery) {
            setPphInput(
                Number(pphFromQuery).toLocaleString('id-ID')
            )
        }
    }, [pphFromQuery])

    const calculate = () => {
        const gross = parseNumber(salaryInput)
        const pph21 = parseNumber(pphInput)

        if (!gross) return

        setLoading(true)

        setTimeout(() => {
            // Asumsi potongan karyawan
            const bpjsHealth = Math.round(gross * 0.01) // 1%
            const bpjsTk = Math.round(gross * 0.02) // 2% (JHT)

            const net =
                gross - pph21 - bpjsHealth - bpjsTk

            setResult({
                gross,
                pph21,
                bpjsHealth,
                bpjsTk,
                net: Math.max(net, 0),
            })

            setLoading(false)
        }, 500)
    }

    return (
        <div className="space-y-4">
            <div>
                <label className="block text-sm font-medium">
                    Gaji Kotor Bulanan
                </label>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Contoh: 10.000.000"
                    className="w-full border p-2 rounded"
                    value={salaryInput}
                    onChange={(e) =>
                        setSalaryInput(formatNumber(e.target.value))
                    }
                />
            </div>

            <div>
                <label className="block text-sm font-medium">
                    Estimasi PPh 21 Bulanan
                </label>
                <input
                    type="text"
                    inputMode="numeric"
                    placeholder="Opsional (isi dari kalkulator PPh 21)"
                    className="w-full border p-2 rounded"
                    value={pphInput}
                    onChange={(e) =>
                        setPphInput(formatNumber(e.target.value))
                    }
                />
                <p className="text-xs text-gray-500 mt-1">
                    Jika kosong, diasumsikan 0
                </p>
            </div>

            <button
                onClick={calculate}
                disabled={loading}
                className={`w-full flex items-center justify-center gap-2 p-2 rounded
          bg-black text-white transition
          ${loading ? 'opacity-70 cursor-not-allowed' : 'cursor-pointer hover:bg-gray-900'}
        `}
            >
                {loading && (
                    <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                )}
                {loading ? 'Menghitung...' : 'Hitung Gaji Bersih'}
            </button>

            {result && !loading && (
                <div className="bg-gray-100 p-4 rounded space-y-3">
                    <div>
                        <p className="text-sm text-gray-600">
                            Gaji Bersih (Take Home Pay)
                        </p>
                        <p className="text-xl font-semibold">
                            {formatRupiah(result.net)}
                        </p>
                    </div>

                    <div className="border-t pt-3 space-y-1 text-sm">
                        <p>Gaji Kotor: {formatRupiah(result.gross)}</p>
                        <p>PPh 21: {formatRupiah(result.pph21)}</p>
                        <p>BPJS Kesehatan (1%): {formatRupiah(result.bpjsHealth)}</p>
                        <p>BPJS Ketenagakerjaan (2%): {formatRupiah(result.bpjsTk)}</p>
                    </div>

                    <p className="text-xs text-gray-500">
                        Hasil dibulatkan dan bersifat estimasi.
                    </p>
                </div>
            )}
        </div>
    )
}