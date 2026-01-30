'use client'

import { useState, useEffect } from 'react'
import { Zap, Info, ArrowDownCircle, CheckCircle2, ChevronRight } from 'lucide-react'

export default function InstallmentCalculator() {
  const [priceInput, setPriceInput] = useState('150.000.000')
  const [dpInput, setDpInput] = useState('30.000.000')
  const [tenor, setTenor] = useState('36')
  const [interest, setInterest] = useState('8,5')
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
    const price = parseToNumber(priceInput)
    const dp = parseToNumber(dpInput)
    const t = parseInt(tenor)
    const i = parseToNumber(interest)

    if (!price || t <= 0) return
    setLoading(true)

    setTimeout(() => {
      const loan = price - dp
      const yearlyRate = i / 100
      const monthlyRate = yearlyRate / 12

      // FLAT
      const flatInterest = loan * yearlyRate * (t / 12)
      const flatTotal = loan + flatInterest
      const flatMonthly = flatTotal / t

      // ANUITAS
      const anuitasMonthly = (loan * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -t))
      const anuitasTotal = anuitasMonthly * t

      setResult({
        flat: { monthly: Math.round(flatMonthly), total: Math.round(flatTotal), interest: Math.round(flatInterest) },
        anuitas: { monthly: Math.round(anuitasMonthly), total: Math.round(anuitasTotal), interest: Math.round(anuitasTotal - loan) },
        cheaper: flatTotal < anuitasTotal ? 'flat' : 'anuitas'
      })
      setLoading(false)
    }, 600)
  }

  const formatIDR = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)

  return (
    <div className="space-y-10">
      {/* INPUT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-6">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
            <Zap className="w-3 h-3 text-purple-500" /> Credit Details
          </label>
          <div className="grid gap-5">
            <div className="relative group">
              <input type="text" inputMode="decimal" value={priceInput} onChange={(e) => setPriceInput(formatInput(e.target.value))} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all" />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Harga Barang</label>
            </div>
            <div className="relative group">
              <input type="text" inputMode="decimal" value={dpInput} onChange={(e) => setDpInput(formatInput(e.target.value))} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all" />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Uang Muka (DP)</label>
            </div>
          </div>
        </div>

        <div className="space-y-6 md:pt-10">
          <div className="grid grid-cols-2 gap-5">
            <div className="relative group">
              <input type="number" value={tenor} onChange={(e) => setTenor(e.target.value)} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all" />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Tenor (Bulan)</label>
            </div>
            <div className="relative group">
              <input type="text" inputMode="decimal" value={interest} onChange={(e) => setInterest(formatInput(e.target.value))} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all" />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Bunga p.a (%)</label>
            </div>
          </div>
          <button onClick={calculate} disabled={loading} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 transition-all active:scale-95 shadow-xl shadow-zinc-200 disabled:opacity-50">
            {loading ? 'Processing...' : 'Generate Simulation'}
          </button>
        </div>
      </div>

      {/* RESULTS AREA */}
      {result && (
        <div className="pt-10 border-t border-zinc-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { type: 'flat', label: 'Flat (Leasing)', data: result.flat },
              { type: 'anuitas', label: 'Anuitas (Bank)', data: result.anuitas }
            ].map((item) => (
              <div key={item.type} className={`relative overflow-hidden rounded-[2rem] p-8 border-2 transition-all ${result.cheaper === item.type ? 'border-purple-500 bg-white' : 'border-zinc-100 bg-zinc-50/50'}`}>
                {result.cheaper === item.type && (
                  <div className="absolute top-4 right-4 bg-purple-500 text-white text-[8px] font-black px-2 py-1 rounded-full uppercase tracking-widest flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Rekomendasi
                  </div>
                )}
                <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-6">{item.label}</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-[10px] font-black text-zinc-400 uppercase tracking-widest mb-1">Cicilan / Bulan</p>
                    <p className="text-3xl font-black italic tracking-tighter text-zinc-900 leading-none">{formatIDR(item.data.monthly)}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-zinc-100">
                    <div>
                      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Bunga</p>
                      <p className="text-xs font-bold text-zinc-600">{formatIDR(item.data.interest)}</p>
                    </div>
                    <div>
                      <p className="text-[8px] font-black text-zinc-400 uppercase tracking-widest mb-1">Total Bayar</p>
                      <p className="text-xs font-bold text-zinc-600">{formatIDR(item.data.total)}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 p-4 rounded-xl bg-purple-50 border border-purple-100 flex items-start gap-3">
            <Info className="w-4 h-4 text-purple-600 mt-0.5" />
            <p className="text-[10px] text-purple-900 font-medium leading-relaxed italic">
              <strong>Catatan:</strong> Simulasi di atas hanya estimasi pokok + bunga. Belum termasuk biaya asuransi, provisi, dan admin yang biasanya dibebankan di awal atau masuk ke cicilan.
            </p>
          </div>
        </div>
      )}
    </div>
  )
}