'use client'

import { useState, useEffect } from 'react'
import { formatRupiah, parseNumber } from '@/libs/format'
import { useSearchParams } from 'next/navigation'
import { Zap, Info, Calculator } from 'lucide-react'

export default function TakeHomePayCalculator() {
    const searchParams = useSearchParams()
    const pphFromQuery = searchParams.get('pph')

    const [salaryDisplay, setSalaryDisplay] = useState('10.000.000')
    const [pphDisplay, setPphDisplay] = useState('')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    useEffect(() => {
        if (pphFromQuery) {
            setPphDisplay(formatInput(pphFromQuery))
        }
    }, [pphFromQuery])

    // Formatter: Ribuan (titik) & Desimal (koma)
    const formatInput = (value: string) => {
        if (!value) return ''
        const cleanValue = value.replace(/[^0-9,]/g, '')
        const parts = cleanValue.split(',')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return parts.length > 1 ? `${parts[0]},${parts[1].slice(0, 2)}` : parts[0]
    }

    const calculate = () => {
        const gross = parseNumber(salaryDisplay)
        const pph21 = parseNumber(pphDisplay)

        if (!gross) return
        setLoading(true)

        setTimeout(() => {
            const bpjsHealth = Math.round(gross * 0.01)
            const bpjsTk = Math.round(gross * 0.02)
            const net = gross - pph21 - bpjsHealth - bpjsTk

            setResult({
                gross, pph21, bpjsHealth, bpjsTk,
                net: Math.max(net, 0)
            })
            setLoading(false)
        }, 600)
    }

    const netString = result?.net?.toLocaleString('id-ID') || '0'
    const getFontSize = (length: number) => {
        if (length > 13) return 'text-3xl md:text-5xl lg:text-6xl'
        return 'text-4xl md:text-6xl lg:text-8xl'
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* INPUT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
                        <Zap className="w-3 h-3 text-blue-500" /> Salary Configuration
                    </label>
                    <div className="grid gap-5">
                        <div className="relative group">
                            <input
                                type="text" inputMode="decimal" value={salaryDisplay}
                                onChange={(e) => setSalaryDisplay(formatInput(e.target.value))}
                                className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm"
                            />
                            <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Gaji Kotor Bulanan</label>
                        </div>
                        <div className="relative group">
                            <input
                                type="text" inputMode="decimal" value={pphDisplay}
                                onChange={(e) => setPphDisplay(formatInput(e.target.value))}
                                placeholder="Opsional"
                                className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all shadow-sm placeholder:text-zinc-200"
                            />
                            <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Estimasi PPh 21</label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-end">
                    <button
                        onClick={calculate} disabled={loading}
                        className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 transition-all active:scale-95 shadow-xl shadow-zinc-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Calculator className="w-4 h-4" />}
                        {loading ? 'Processing...' : 'Hitung Gaji Bersih'}
                    </button>
                    <p className="text-[9px] text-zinc-400 mt-3 text-center italic">*Potongan BPJS dihitung otomatis (3%)</p>
                </div>
            </div>

            {/* RESULT BOX */}
            {result && (
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0c0c0c] p-8 md:p-12 border border-white/5 shadow-2xl flex flex-col justify-center">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full" />

                    <div className="relative z-10 space-y-6">
                        <header className="flex items-center justify-between">
                            <span className="text-blue-400 text-[10px] font-black uppercase tracking-[0.3em]">Net Payout Estimator</span>
                            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-zinc-500 uppercase">Monthly Cycle</div>
                        </header>

                        <div className="flex flex-col py-2">
                            <span className="text-xs font-medium text-zinc-600 uppercase tracking-widest mb-1">Take Home Pay</span>
                            <div className="flex items-baseline gap-2 md:gap-3">
                                <span className="text-xl md:text-2xl font-medium text-zinc-500 italic">Rp</span>
                                <h2 className={`font-black text-white italic tracking-tighter leading-none transition-all duration-500 ${getFontSize(netString.length)}`}>
                                    {netString}
                                </h2>
                            </div>
                        </div>

                        {/* BREAKDOWN */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-6 border-t border-white/5">
                            <div>
                                <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Gaji Kotor</p>
                                <p className="text-[11px] font-bold text-zinc-300">{formatRupiah(result.gross)}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-red-500/70 uppercase mb-1">PPh 21</p>
                                <p className="text-[11px] font-bold text-zinc-300">-{formatRupiah(result.pph21)}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">BPJS Kes (1%)</p>
                                <p className="text-[11px] font-bold text-zinc-300">-{formatRupiah(result.bpjsHealth)}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">BPJS TK (2%)</p>
                                <p className="text-[11px] font-bold text-zinc-300">-{formatRupiah(result.bpjsTk)}</p>
                            </div>
                        </div>

                        <div className="pt-4 flex items-center gap-2 text-zinc-600">
                            <Info className="w-3 h-3 text-blue-500" />
                            <p className="text-[9px] font-bold uppercase tracking-widest italic">Hasil bersifat estimasi bersih yang diterima</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}