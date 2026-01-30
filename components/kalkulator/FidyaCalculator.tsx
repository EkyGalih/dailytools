'use client'

import { useState, useEffect } from 'react'
import { HeartHandshake, Utensils, Calculator, Info, Zap, CheckCircle2 } from 'lucide-react'

export default function FidyaCalculator() {
  const [daysInput, setDaysInput] = useState('1')
  const [mealPriceInput, setMealPriceInput] = useState('30.000')
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<number | null>(null)

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
    const days = parseToNumber(daysInput)
    const price = parseToNumber(mealPriceInput)

    if (!days || !price) return
    setLoading(true)

    setTimeout(() => {
      setResult(Math.round(days * price))
      setLoading(false)
    }, 500)
  }

  const fidyaString = result?.toLocaleString('id-ID') || '0'

  const getFontSize = (length: number) => {
    if (length > 13) return 'text-3xl md:text-5xl lg:text-6xl'
    return 'text-4xl md:text-6xl lg:text-8xl'
  }

  return (
    <div className="w-full space-y-10">
      {/* INPUT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
            <Zap className="w-3 h-3 text-indigo-500" /> Calculation Params
          </label>
          <div className="grid gap-5">
            {/* Hari Puasa */}
            <div className="relative group">
              <input
                type="text"
                inputMode="decimal"
                value={daysInput}
                onChange={(e) => setDaysInput(formatInput(e.target.value))}
                className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
              />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Jumlah Hari Puasa</label>
            </div>
            {/* Biaya Makan */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <span className="text-zinc-300 font-bold text-xs group-focus-within:text-indigo-500">Rp</span>
              </div>
              <input
                type="text"
                inputMode="decimal"
                value={mealPriceInput}
                onChange={(e) => setMealPriceInput(formatInput(e.target.value))}
                className="w-full bg-white border border-zinc-200 rounded-2xl pl-12 pr-6 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-indigo-500/5 focus:border-indigo-500 transition-all shadow-sm"
              />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400 tracking-widest leading-none">Biaya Makan per Hari</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <button
            onClick={calculate}
            disabled={loading}
            className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all active:scale-95 shadow-xl shadow-zinc-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Calculator className="w-4 h-4" />}
            {loading ? 'Processing...' : 'Calculate Fidya'}
          </button>
        </div>
      </div>

      {/* RESULT BOX */}
      {result !== null && (
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0c0c0c] p-8 md:p-12 border border-white/5 shadow-2xl flex flex-col justify-center animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-orange-600/10 blur-[100px] rounded-full" />

          <div className="relative z-10 space-y-4">
            <header className="flex items-center justify-between">
              <span className="text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em]">Total Obligation</span>
              <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-zinc-500 uppercase flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> 1 Meal per Day
              </div>
            </header>

            <div className="flex flex-col py-2">
              <span className="text-xs font-medium text-zinc-600 uppercase tracking-widest mb-1 leading-none">Fidya Amount</span>
              <div className="flex items-baseline gap-2 md:gap-3">
                <span className="text-xl md:text-2xl font-medium text-zinc-500 italic">Rp</span>
                <h2 className={`font-black text-white italic tracking-tighter leading-none transition-all duration-500 ${getFontSize(fidyaString.length)}`}>
                  {fidyaString}
                </h2>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-3">
              <Info className="w-3.5 h-3.5 text-indigo-500" />
              <p className="text-[9px] font-bold uppercase tracking-widest italic text-zinc-500 leading-tight">
                Fidyah wajib diberikan kepada fakir miskin sebagai pengganti puasa yang ditinggalkan.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}