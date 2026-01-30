'use client'

import { useState } from 'react'
import { Zap, Info, Calculator } from 'lucide-react'

export default function ZakatCalculator() {
    const [incomeInput, setIncomeInput] = useState('15.000.000')
    const [goldPriceInput, setGoldPriceInput] = useState('1.250.000')
    const [loading, setLoading] = useState(false)
    const [result, setResult] = useState<any>(null)

    // Formatter: Ribuan (titik) & Desimal (koma)
    const formatInput = (value: string) => {
        if (!value) return ''
        const cleanValue = value.replace(/[^0-9,]/g, '')
        const parts = cleanValue.split(',')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return parts.length > 1 ? `${parts[0]},${parts[1].slice(0, 2)}` : parts[0]
    }

    const parseToNumber = (value: string) => {
        if (!value) return 0
        return parseFloat(value.replace(/\./g, '').replace(',', '.')) || 0
    }

    const calculate = () => {
        const income = parseToNumber(incomeInput)
        const goldPrice = parseToNumber(goldPriceInput)

        if (!income || !goldPrice) return
        setLoading(true)

        setTimeout(() => {
            const nisabBulanan = (85 * goldPrice) / 12
            const isWajib = income >= nisabBulanan
            const amount = isWajib ? income * 0.025 : 0

            setResult({ amount, isWajib, nisabBulanan })
            setLoading(false)
        }, 600)
    }

    const zakatString = result?.amount?.toLocaleString('id-ID') || '0'

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
                        <Zap className="w-3 h-3 text-amber-500" /> Income metrics
                    </label>
                    <div className="grid gap-5">
                        <div className="relative group">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={incomeInput}
                                onChange={(e) => setIncomeInput(formatInput(e.target.value))}
                                className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all shadow-sm"
                            />
                            <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Penghasilan Bulanan</label>
                        </div>
                        <div className="relative group">
                            <input
                                type="text"
                                inputMode="decimal"
                                value={goldPriceInput}
                                onChange={(e) => setGoldPriceInput(formatInput(e.target.value))}
                                className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-amber-500/5 focus:border-amber-500 transition-all shadow-sm"
                            />
                            <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400 tracking-widest leading-none">Harga Emas (per Gram)</label>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col justify-end">
                    <button
                        onClick={calculate}
                        disabled={loading}
                        className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-amber-600 transition-all active:scale-95 shadow-xl shadow-zinc-200 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                        {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Calculator className="w-4 h-4" />}
                        {loading ? 'Analyzing...' : 'Hitung Kewajiban Zakat'}
                    </button>
                </div>
            </div>

            {/* RESULT BOX */}
            {result && (
                <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0c0c0c] p-8 md:p-12 border border-white/5 shadow-2xl flex flex-col justify-center">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-amber-600/20 blur-[100px] rounded-full" />

                    <div className="relative z-10 space-y-4">
                        <header className="flex items-center justify-between">
                            <span className="text-amber-400 text-[10px] font-black uppercase tracking-[0.3em] leading-none">Zakat Payout Estimator</span>
                            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-zinc-500 uppercase">2.5% Rate Applied</div>
                        </header>

                        <div className="flex flex-col py-2">
                            <span className="text-xs font-medium text-zinc-600 uppercase tracking-widest mb-1 leading-none">Amount to Pay</span>
                            <div className="flex items-baseline gap-2 md:gap-3">
                                <span className="text-xl md:text-2xl font-medium text-zinc-500 italic">Rp</span>
                                <h2 className={`font-black text-white italic tracking-tighter leading-none transition-all duration-500 ${getFontSize(zakatString.length)}`}>
                                    {result.isWajib ? zakatString : '0'}
                                </h2>
                            </div>
                        </div>

                        <div className="pt-6 border-t border-white/5 flex items-center gap-3">
                            <div className={`p-1 rounded-full ${result.isWajib ? 'bg-amber-500/10' : 'bg-zinc-800'}`}>
                                <Info className={`w-3 h-3 ${result.isWajib ? 'text-amber-500' : 'text-zinc-600'}`} />
                            </div>
                            <p className="text-[9px] font-bold uppercase tracking-widest italic text-zinc-500 leading-none">
                                {result.isWajib
                                    ? `Penghasilan Anda mencapai nisab (Min: Rp ${Math.round(result.nisabBulanan).toLocaleString('id-ID')})`
                                    : `Penghasilan Anda belum mencapai nisab wajib zakat.`
                                }
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}