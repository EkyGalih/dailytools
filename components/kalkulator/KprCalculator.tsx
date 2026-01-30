'use client'

import { useState } from 'react'
import { Zap, Calendar, Table as TableIcon, Home, TrendingUp } from 'lucide-react'

export default function KprCalculator() {
  const [priceDisplay, setPriceDisplay] = useState('500.000.000')
  const [dpPercent, setDpPercent] = useState(20)
  const [tenor, setTenor] = useState(20)
  const [fixedRate, setFixedRate] = useState('5,5')
  const [fixedYear, setFixedYear] = useState(3)
  const [floatingRate, setFloatingRate] = useState('11')
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

  const price = parseToNumber(priceDisplay)
  const dpNominal = (dpPercent / 100) * price

  const formatIDR = (val: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val)

  const calculate = () => {
    if (!price || tenor <= 0) return
    setLoading(true)

    setTimeout(() => {
      const loan = price - dpNominal
      const totalMonth = tenor * 12
      const fixedM = fixedYear * 12
      const fRate = parseToNumber(fixedRate) / 100 / 12
      const flRate = parseToNumber(floatingRate) / 100 / 12

      // Fixed Installment
      const fixedInstallment = (loan * fRate) / (1 - Math.pow(1 + fRate, -totalMonth))

      // Calculate Remaining Principal after Fixed Period to get Floating Installment
      let remainingLoan = loan
      for (let m = 1; m <= fixedM; m++) {
        const interest = remainingLoan * fRate
        remainingLoan -= (fixedInstallment - interest)
      }

      const remainingMonth = totalMonth - fixedM
      const floatingInstallment = (remainingLoan * flRate) / (1 - Math.pow(1 + flRate, -remainingMonth))

      // Simplified Schedule for Table
      const yearlySchedule = []
      let tempLoan = loan
      for (let y = 1; y <= tenor; y++) {
        const isFixed = y <= fixedYear
        const rate = isFixed ? fRate : flRate
        const inst = isFixed ? fixedInstallment : floatingInstallment
        let yearlyInterest = 0
        for (let m = 1; m <= 12; m++) {
          const interest = tempLoan * rate
          yearlyInterest += interest
          tempLoan -= (inst - interest)
        }
        yearlySchedule.push({
          year: y,
          phase: isFixed ? 'Fixed' : 'Floating',
          monthly: Math.round(inst),
          remaining: Math.max(0, Math.round(tempLoan))
        })
      }

      setResult({
        loan,
        fixed: { installment: Math.round(fixedInstallment), rate: fixedRate, year: fixedYear },
        floating: { installment: Math.round(floatingInstallment), rate: floatingRate, remainingLoan: Math.round(remainingLoan) },
        yearlySchedule
      })
      setLoading(false)
    }, 800)
  }

  return (
    <div className="space-y-10">
      {/* INPUT GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
            <Zap className="w-3 h-3 text-purple-500" /> Property Data
          </label>
          <div className="grid gap-5">
            <div className="relative">
              <input type="text" inputMode="decimal" value={priceDisplay} onChange={(e) => setPriceDisplay(formatInput(e.target.value))} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 outline-none transition-all" />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Harga Properti</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input type="number" value={dpPercent} onChange={(e) => setDpPercent(Number(e.target.value))} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:ring-4 focus:ring-purple-500/5 outline-none" />
                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">DP (%)</label>
              </div>
              <div className="relative">
                <input type="number" value={tenor} onChange={(e) => setTenor(Number(e.target.value))} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:ring-4 focus:ring-purple-500/5 outline-none" />
                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Tenor (Tahun)</label>
              </div>
            </div>
            <p className="text-[10px] font-bold text-zinc-400 italic ml-2">Estimasi DP: {formatIDR(dpNominal)}</p>
          </div>
        </div>

        <div className="space-y-6">
          <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
            <Calendar className="w-3 h-3 text-purple-500" /> Interest Schema
          </label>
          <div className="grid gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="relative">
                <input type="text" value={fixedRate} onChange={(e) => setFixedRate(formatInput(e.target.value))} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:ring-4 focus:ring-purple-500/5 outline-none" />
                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Fixed Rate (%)</label>
              </div>
              <div className="relative">
                <input type="number" value={fixedYear} onChange={(e) => setFixedYear(Number(e.target.value))} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:ring-4 focus:ring-purple-500/5 outline-none" />
                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Masa Fixed</label>
              </div>
            </div>
            <div className="relative">
              <input type="text" value={floatingRate} onChange={(e) => setFloatingRate(formatInput(e.target.value))} className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:ring-4 focus:ring-purple-500/5 outline-none" />
              <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Estimasi Floating Rate (%)</label>
            </div>
          </div>
          <button onClick={calculate} disabled={loading} className="w-full py-4 bg-zinc-900 text-white rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 transition-all active:scale-95 shadow-xl shadow-zinc-200 disabled:opacity-50">
            {loading ? 'Calculating...' : 'Run Simulation'}
          </button>
        </div>
      </div>

      {/* RESULT SECTION */}
      {result && (
        <div className="pt-10 border-t border-zinc-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-zinc-50 rounded-[2rem] p-8 border border-zinc-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5"><Home size={80} /></div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-purple-600 mb-4">Periode Fixed ({result.fixed.year} Thn)</h3>
              <p className="text-4xl font-black italic tracking-tighter text-zinc-900">{formatIDR(result.fixed.installment)}</p>
              <p className="text-[10px] font-bold text-zinc-400 mt-2 uppercase">Bunga Flat: {result.fixed.rate}% p.a</p>
            </div>
            <div className="bg-[#0c0c0c] rounded-[2rem] p-8 border border-white/5 relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10 text-white"><TrendingUp size={80} /></div>
              <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-4">Estimasi Floating</h3>
              <p className="text-4xl font-black italic tracking-tighter text-white">{formatIDR(result.floating.installment)}</p>
              <p className="text-[10px] font-bold text-zinc-500 mt-2 uppercase">Asumsi Bunga: {result.floating.rate}% p.a</p>
            </div>
          </div>

          {/* Yearly Table */}
          <div className="space-y-4">
            <h3 className="text-[10px] font-black uppercase tracking-widest text-zinc-400 ml-2 flex items-center gap-2">
              <TableIcon size={14} /> Jadwal Angsuran per Tahun
            </h3>
            <div className="bg-white border border-zinc-100 rounded-[2rem] overflow-hidden shadow-sm overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-50 border-b border-zinc-100">
                    <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-400">Tahun</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-400">Fase</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-400">Cicilan / Bulan</th>
                    <th className="px-6 py-4 text-[9px] font-black uppercase text-zinc-400 text-right">Sisa Pokok</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {result.yearlySchedule.map((row: any) => (
                    <tr key={row.year} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="px-6 py-4 text-xs font-black text-zinc-900">{row.year}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${row.phase === 'Fixed' ? 'bg-purple-100 text-purple-600' : 'bg-amber-100 text-amber-600'}`}>
                          {row.phase}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-bold text-zinc-700">{formatIDR(row.monthly)}</td>
                      <td className="px-6 py-4 text-xs font-bold text-zinc-400 text-right">{formatIDR(row.remaining)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}