'use client'

import { formatBytes, sizeFromBitrate } from '@/libs/kreator/video'
import { useMemo, useState } from 'react'
import { Zap, Info, Clock, Activity, HardDrive } from 'lucide-react'

export default function VideoSizeEstimator() {
  const [minDisplay, setMinDisplay] = useState('1')
  const [secDisplay, setSecDisplay] = useState('0')
  const [bitrateDisplay, setBitrateDisplay] = useState('6,5') // Support decimal input

  // Formatter desimal/ribuan
  const formatInput = (value: string) => {
    if (!value) return ''
    const cleanValue = value.replace(/[^0-9,]/g, '')
    const parts = cleanValue.split(',')
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    return parts.length > 1 ? `${parts[0]},${parts[1].slice(0, 2)}` : parts[0]
  }

  const parseToNumber = (value: string) => {
    const normalized = value.replace(/\./g, '').replace(',', '.')
    return parseFloat(normalized) || 0
  }

  const durationSec = useMemo(() => {
    return Math.max(0, parseToNumber(minDisplay) * 60 + parseToNumber(secDisplay))
  }, [minDisplay, secDisplay])

  const size = useMemo(() => {
    return sizeFromBitrate(parseToNumber(bitrateDisplay), durationSec)
  }, [bitrateDisplay, durationSec])

  const formattedSize = formatBytes(size)

  // Auto-scaling font size logic
  const getFontSize = (text: string) => {
    if (text.length > 12) return 'text-3xl md:text-5xl lg:text-6xl'
    return 'text-4xl md:text-6xl lg:text-7xl'
  }

  return (
    <div className="w-full space-y-10 animate-in fade-in duration-700">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

        {/* LEFT: INPUT AREA */}
        <div className="space-y-8">
          <div className="space-y-6">
            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
              <Zap className="w-3 h-3 text-purple-500" /> Video Parameters
            </label>

            <div className="grid gap-6">
              <div className="grid grid-cols-2 gap-4">
                {/* Menit */}
                <div className="relative group">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={minDisplay}
                    onChange={(e) => setMinDisplay(formatInput(e.target.value))}
                    className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all shadow-sm"
                  />
                  <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Durasi (Menit)</label>
                </div>
                {/* Detik */}
                <div className="relative group">
                  <input
                    type="text"
                    inputMode="decimal"
                    value={secDisplay}
                    onChange={(e) => setSecDisplay(formatInput(e.target.value))}
                    className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all shadow-sm"
                  />
                  <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Durasi (Detik)</label>
                </div>
              </div>

              {/* Bitrate Input */}
              <div className="relative group">
                <div className="absolute inset-y-0 right-5 flex items-center pointer-events-none">
                  <span className="text-zinc-300 font-black text-xs uppercase tracking-widest">Mbps</span>
                </div>
                <input
                  type="text"
                  inputMode="decimal"
                  value={bitrateDisplay}
                  onChange={(e) => setBitrateDisplay(formatInput(e.target.value))}
                  className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all shadow-sm pr-16"
                />
                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400 tracking-widest">Target Bitrate</label>
              </div>
            </div>
          </div>

          {/* PRESET INFO */}
          <div className="p-4 rounded-2xl bg-zinc-50 border border-zinc-100 flex items-start gap-3">
            <Info className="w-4 h-4 text-purple-500 mt-0.5" />
            <div className="space-y-1">
              <p className="text-[10px] font-black text-zinc-900 uppercase tracking-widest leading-none">Quick Tip</p>
              <p className="text-[10px] text-zinc-500 font-medium leading-relaxed">
                Untuk 1080p jernih, gunakan bitrate 8 Mbps. <br />
                Untuk 4K tajam, gunakan bitrate 35 Mbps.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT: RESULT BOX (Premium Dark Mode) */}
        <div className="relative min-h-[300px] rounded-[2.5rem] bg-[#0c0c0c] p-8 md:p-12 overflow-hidden border border-white/5 shadow-2xl flex flex-col justify-center">
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />

          <div className="relative z-10 space-y-4">
            <header className="flex items-center justify-between">
              <span className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em]">Estimated Storage</span>
              <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[8px] font-black text-zinc-500 uppercase tracking-tighter">Render Preview</div>
            </header>

            <div className="flex flex-col py-4">
              <span className="text-sm font-medium text-zinc-600 uppercase tracking-widest mb-2">File Size</span>
              <div className="flex items-baseline gap-3">
                <h2 className={`font-black text-white italic tracking-tighter leading-none transition-all duration-500 ${getFontSize(formattedSize)}`}>
                  {formattedSize}
                </h2>
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 flex items-center gap-2 text-zinc-500">
              <HardDrive className="w-3 h-3 text-purple-500" />
              <p className="text-[9px] font-bold uppercase tracking-widest italic">Hanya estimasi data visual bruto</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}