'use client'

import { useState } from 'react'
import { formatRupiah, parseNumber } from '@/libs/format'
import { useRouter } from 'next/navigation'
import { Zap, Calculator, Info, Wallet } from 'lucide-react'

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
    const [salaryDisplay, setSalaryDisplay] = useState('10.000.000')
    const [ptkpKey, setPtkpKey] = useState('TK0')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)
    const router = useRouter()

    // Formatter: Ribuan (titik) & Desimal (koma)
    const formatInput = (value: string) => {
        if (!value) return ''
        const cleanValue = value.replace(/[^0-9,]/g, '')
        const parts = cleanValue.split(',')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return parts.length > 1 ? `${parts[0]},${parts[1].slice(0, 2)}` : parts[0]
    }

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
        const salaryMonthly = parseNumber(salaryDisplay)
        if (!salaryMonthly) return
        setLoading(true)

        setTimeout(() => {
            const salaryYearly = salaryMonthly * 12
            const jobCost = Math.min(salaryYearly * 0.05, 6000000)
            const netIncome = salaryYearly - jobCost
            const ptkp = PTKP_MAP[ptkpKey]
            const pkp = Math.max(netIncome - ptkp, 0)
            const yearlyTax = pkp > 0 ? calculateProgressiveTax(pkp) : 0

            setResult({
                yearlyTax,
                monthlyTax: Math.round(yearlyTax / 12),
                salaryYearly, jobCost, netIncome, ptkp, pkp
            })
            setLoading(false)
        }, 600)
    }

    const taxString = result?.monthlyTax?.toLocaleString('id-ID') || '0'
    const getFontSize = (length: number) => {
        if (length > 13) return 'text-2xl md:text-4xl lg:text-6xl'
        return 'text-4xl md:text-6xl lg:text-8xl'
    }

    return (
        <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
            {/* INPUT GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
                        <Zap className="w-3 h-3 text-indigo-500" /> Tax Parameters
                    </label>
                    <div className="grid gap-5">
                        <div className="relative group">
                            <input
                                type="text" inputMode="decimal" value={salaryDisplay}
                                onChange={(e) => setSalaryDisplay(formatInput(e.target.value))}
                                className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
                            />
                            <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Gaji Bulanan (Gross)</label>
                        </div>
                        <div className="relative group">
                            <select
                                value={ptkpKey}
                                onChange={(e) => setPtkpKey(e.target.value)}
                                className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm appearance-none"
                            >
                                {PTKP_OPTIONS.map((opt) => (
                                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                                ))}
                            </select>
                            <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Status PTKP</label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-end">
                    <button
                        onClick={calculate} disabled={loading}
                        className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-zinc-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Calculator className="w-4 h-4" />}
                        {loading ? 'Analyzing...' : 'Calculate Tax Payout'}
                    </button>
                </div>
            </div>

            {/* RESULT BOX */}
            {result && (
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0c0c0c] p-8 md:p-12 border border-white/5 shadow-2xl flex flex-col justify-center">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-600/20 blur-[100px] rounded-full" />

                    <div className="relative z-10 space-y-6">
                        <header className="flex items-center justify-between">
                            <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">Monthly Tax Estimator</span>
                            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-zinc-500 uppercase">Progressive Rate</div>
                        </header>

                        <div className="flex flex-col py-2">
                            <span className="text-xs font-medium text-zinc-600 uppercase tracking-widest mb-1">PPh 21 Per Bulan</span>
                            <div className="flex items-baseline gap-2 md:gap-3">
                                <span className="text-xl md:text-2xl font-medium text-zinc-500 italic">Rp</span>
                                <h2 className={`font-black text-white italic tracking-tighter leading-none transition-all duration-500 ${getFontSize(taxString.length)}`}>
                                    {taxString}
                                </h2>
                            </div>
                        </div>

                        {/* DETAIL GRID */}
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-white/5">
                            <div>
                                <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">Biaya Jabatan</p>
                                <p className="text-[11px] font-bold text-zinc-300">{formatRupiah(result.jobCost)}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-zinc-500 uppercase mb-1">PTKP ({ptkpKey})</p>
                                <p className="text-[11px] font-bold text-zinc-300">{formatRupiah(result.ptkp)}</p>
                            </div>
                            <div>
                                <p className="text-[8px] font-black text-indigo-400 uppercase mb-1">Total PKP</p>
                                <p className="text-[11px] font-bold text-zinc-300">{formatRupiah(result.pkp)}</p>
                            </div>
                        </div>

                        <div className="pt-6 flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="flex items-center gap-2 text-zinc-600">
                                <Info className="w-3 h-3 text-indigo-500" />
                                <p className="text-[9px] font-bold uppercase tracking-widest italic">Estimasi mengikuti tarif Pasal 17 UU PPh</p>
                            </div>
                            <button
                                onClick={() => router.push(`/kalkulator/take-home-pay?pph=${result.monthlyTax}`)}
                                className="flex items-center gap-2 px-6 py-2.5 bg-white/5 border border-white/10 rounded-xl text-[9px] font-black uppercase tracking-widest text-zinc-300 hover:bg-white/10 hover:text-white transition-all"
                            >
                                <Wallet className="w-3.5 h-3.5" /> Hitung Gaji Bersih (THP)
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}