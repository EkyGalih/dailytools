'use client'

import { useState, useEffect } from 'react'
import { Wheat, Users, Calculator, Info, Zap, CheckCircle2 } from 'lucide-react'

const RICE_PER_PERSON_KG = 2.5

export default function ZakatFitrahCalculator() {
  const [peopleInput, setPeopleInput] = useState('1')
  const [ricePriceInput, setRicePriceInput] = useState('15.500')
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
    const people = parseToNumber(peopleInput)
    const price = parseToNumber(ricePriceInput)

    if (!people || !price) return
    setLoading(true)

    setTimeout(() => {
      const totalRice = people * RICE_PER_PERSON_KG
      const totalMoney = totalRice * price

      setResult({ totalRice, totalMoney: Math.round(totalMoney) })
      setLoading(false)
    }, 600)
  }

  const moneyString = result?.totalMoney?.toLocaleString('id-ID') || '0'
  const riceString = result?.totalRice?.toLocaleString('id-ID', { minimumFractionDigits: 1 }) || '0'

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* INPUT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
            <Zap className="w-3 h-3 text-emerald-500" /> Member Data
          </label>
          <div className="grid gap-5">
            {/* Jumlah Jiwa */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <Users className="w-4 h-4 text-zinc-300 group-focus-within:text-emerald-500 transition-colors" />
              </div>
              <input
                type="text"
                inputMode="decimal"
                value={peopleInput}
                onChange={(e) => setPeopleInput(formatInput(e.target.value))}
                className="w-full bg-white border border-zinc-200 rounded-2xl pl-12 pr-6 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all shadow-sm"
              />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Jumlah Jiwa</label>
            </div>
            {/* Harga Beras */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                <span className="text-zinc-300 font-bold text-xs group-focus-within:text-emerald-500">Rp</span>
              </div>
              <input
                type="text"
                inputMode="decimal"
                value={ricePriceInput}
                onChange={(e) => setRicePriceInput(formatInput(e.target.value))}
                className="w-full bg-white border border-zinc-200 rounded-2xl pl-12 pr-6 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-emerald-500/5 focus:border-emerald-500 transition-all shadow-sm"
              />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400 tracking-widest leading-none">Harga Beras (per kg)</label>
            </div>
          </div>
        </div>

        <div className="flex flex-col justify-end">
          <button
            onClick={calculate}
            disabled={loading}
            className="w-full py-5 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-emerald-600 transition-all active:scale-95 shadow-xl shadow-zinc-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Calculator className="w-4 h-4" />}
            {loading ? 'Processing...' : 'Hitung Zakat Fitrah'}
          </button>
        </div>
      </div>

      {/* RESULT BOX */}
      {result && (
        <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0c0c0c] p-8 md:p-12 border border-white/5 shadow-2xl flex flex-col justify-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-600/20 blur-[100px] rounded-full" />

          <div className="relative z-10 space-y-6">
            <header className="flex items-center justify-between">
              <span className="text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em]">Fitrah Estimation</span>
              <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-zinc-500 uppercase flex items-center gap-1">
                <CheckCircle2 className="w-2.5 h-2.5" /> 2,5kg Per Soul
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-2">
              {/* Hasil Uang */}
              <div className="flex flex-col">
                <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest mb-1 leading-none">Setara Uang</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-medium text-zinc-500 italic">Rp</span>
                  <h2 className="text-4xl md:text-6xl font-black text-white italic tracking-tighter leading-none transition-all">
                    {moneyString}
                  </h2>
                </div>
              </div>
              {/* Hasil Beras */}
              <div className="flex flex-col border-l border-white/5 md:pl-8">
                <span className="text-[10px] font-medium text-zinc-600 uppercase tracking-widest mb-1 leading-none">Setara Beras</span>
                <div className="flex items-baseline gap-2">
                  <h2 className="text-4xl md:text-6xl font-black text-emerald-400 italic tracking-tighter leading-none transition-all">
                    {riceString}
                  </h2>
                  <span className="text-xl font-medium text-zinc-500 italic">Kg</span>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-3">
              <Info className="w-3.5 h-3.5 text-emerald-500" />
              <p className="text-[9px] font-bold uppercase tracking-widest italic text-zinc-500 leading-tight">
                Perhitungan mengikuti standar 2,5kg beras per orang. Tunaikan segera sebelum Shalat Id.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}