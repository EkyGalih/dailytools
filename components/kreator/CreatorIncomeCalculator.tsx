'use client'

import { useState, useEffect } from 'react'
import { Youtube, Instagram, Music2, Facebook, Zap, Info } from 'lucide-react'

export default function CreatorIncomeCalculator() {
  const [viewsDisplay, setViewsDisplay] = useState<string>('100.000')
  const [rpmDisplay, setRpmDisplay] = useState<string>('5.500,50')
  const [income, setIncome] = useState<number>(0)

  // Formatter: Ribuan (titik), Desimal (koma)
  const formatInput = (value: string) => {
    if (!value) return ''
    const cleanValue = value.replace(/[^0-9,]/g, '')
    const parts = cleanValue.split(',')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return parts.length > 1 ? `${parts[0]},${parts[1].slice(0, 2)}` : parts[0]
  }

  // Parser: Mengubah tampilan ke angka murni
  const parseToNumber = (value: string) => {
    if (!value) return 0
    const normalized = value.replace(/\./g, '').replace(',', '.')
    return parseFloat(normalized) || 0
  }

  useEffect(() => {
    const v = parseToNumber(viewsDisplay)
    const r = parseToNumber(rpmDisplay)
    setIncome((v / 1000) * r)
  }, [viewsDisplay, rpmDisplay])

  const incomeString = income.toLocaleString('id-ID', {
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  // Logika Auto-scaling yang lebih sensitif untuk Ratusan Juta - Milyaran
  const getFontSize = (length: number) => {
    if (length >= 15) return 'text-xl md:text-3xl lg:text-5xl'; // Ratusan Milyar / Triliun
    if (length >= 13) return 'text-2xl md:text-4xl lg:text-6xl'; // Milyaran (1.000.000.000)
    if (length >= 11) return 'text-3xl md:text-5xl lg:text-7xl'; // Ratusan Juta (100.000.000)
    return 'text-4xl md:text-6xl lg:text-8xl'; // Jutaan kebawah
  }

  // Update juga prefix Rp-nya supaya sinkron
  const getPrefixSize = (length: number) => {
    if (length >= 13) return 'text-base md:text-xl';
    return 'text-xl md:text-2xl';
  }

  return (
    <div className="w-full space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

        {/* INPUT AREA */}
        <div className="space-y-8">
          <div className="space-y-6">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
              <Zap className="w-3 h-3 text-purple-500" /> Configure Metrics
            </label>

            <div className="grid gap-6">
              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <span className="text-zinc-300 font-bold text-sm group-focus-within:text-purple-500 transition-colors">#</span>
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  value={viewsDisplay}
                  onChange={(e) => setViewsDisplay(formatInput(e.target.value))}
                  className="w-full bg-white border border-zinc-200 rounded-2xl pl-12 pr-6 py-4 md:py-5 text-zinc-900 font-black text-lg focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all shadow-sm"
                />
                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400 tracking-widest">Total Views</label>
              </div>

              <div className="relative group">
                <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
                  <span className="text-zinc-300 font-bold text-sm group-focus-within:text-purple-500 transition-colors">Rp</span>
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  value={rpmDisplay}
                  onChange={(e) => setRpmDisplay(formatInput(e.target.value))}
                  className="w-full bg-white border border-zinc-200 rounded-2xl pl-12 pr-6 py-4 md:py-5 text-zinc-900 font-black text-lg focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all shadow-sm"
                />
                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400 tracking-widest">RPM Value</label>
              </div>
            </div>
          </div>

          {/* PRESETS */}
          <div className="space-y-4">
            <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest ml-1">Quick Select Platform</p>
            <div className="flex flex-wrap gap-2">
              {[
                { name: 'YouTube', icon: Youtube, rpm: '15.000' },
                { name: 'TikTok', icon: Music2, rpm: '3.500' },
                { name: 'Reels', icon: Instagram, rpm: '4.500' },
                { name: 'FB Ads', icon: Facebook, rpm: '5.500' }
              ].map((p) => (
                <button
                  key={p.name}
                  onClick={() => setRpmDisplay(p.rpm)}
                  className="flex items-center gap-2.5 px-4 py-2.5 bg-white border border-zinc-200 rounded-xl text-[10px] font-black uppercase tracking-widest text-zinc-500 transition-all active:scale-95 shadow-sm hover:border-purple-500 hover:text-purple-600"
                >
                  <p.icon className="w-3.5 h-3.5" /> {p.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* RESULT AREA */}
        <div className="relative min-h-[300px] rounded-[2.5rem] bg-[#0c0c0c] p-8 md:p-12 overflow-hidden border border-white/5 shadow-2xl flex flex-col justify-center transition-all">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />

          <div className="relative z-10 space-y-4">
            <header className="flex items-center justify-between">
              <span className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em]">Estimated Revenue</span>
              <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-zinc-500 uppercase tracking-tighter">IDR Currency</div>
            </header>

            <div className="flex flex-col py-4">
              <span className="text-[10px] font-black text-zinc-600 uppercase tracking-[0.2em] mb-2">Total Payout</span>
              <div className="flex items-baseline gap-2 md:gap-3">
                {/* Prefix Rp yang ikut mengecil secara cerdas */}
                <span className={`font-black text-zinc-500 transition-all duration-500 ${getPrefixSize(incomeString.length)}`}>
                  Rp
                </span>

                {/* Angka Utama dengan dynamic scaling yang lebih agresif */}
                <h2 className={`font-black text-white italic tracking-tighter leading-none transition-all duration-500 ${getFontSize(incomeString.length)}`}>
                  {incomeString}
                </h2>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-zinc-500">
              <Info className="w-3 h-3 text-purple-500" />
              <p className="text-[9px] font-bold uppercase tracking-widest italic leading-none">Estimasi pendapatan kotor bulanan</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}