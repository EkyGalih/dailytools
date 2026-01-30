'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'
import {
  Search, Wallet, Zap, Sparkles,
  DollarSign, Moon, ReceiptText, Home,
  Gift, Image as ImageIcon, Minimize2,
  FileText, Hash, MessageSquare, Video,
  Scissors, ArrowUpRight, LayoutGrid
} from 'lucide-react'

type Tool = {
  title: string
  desc: string
  href: string
  icon: any
  tag: string
  category: 'all' | 'finansial' | 'teknis' | 'kreator'
  color: string
}

const tools: Tool[] = [
  // ================= FINANSIAL =================
  {
    title: 'Kalkulator THR',
    desc: 'Hitung Tunjangan Hari Raya sesuai gaji dan masa kerja.',
    href: '/kalkulator/thr',
    icon: Gift,
    tag: 'Gaji',
    category: 'finansial',
    color: 'bg-rose-50 text-rose-600',
  },
  {
    title: 'Zakat Penghasilan',
    desc: 'Hitung zakat profesi bulanan sesuai nisab terbaru.',
    href: '/kalkulator/zakat',
    icon: DollarSign,
    tag: 'Zakat',
    category: 'finansial',
    color: 'bg-amber-50 text-amber-600',
  },
  {
    title: 'Zakat Fitrah',
    desc: 'Hitung zakat fitrah sesuai jumlah jiwa & harga beras.',
    href: '/kalkulator/zakat-fitrah',
    icon: Moon,
    tag: 'Ibadah',
    category: 'finansial',
    color: 'bg-emerald-50 text-emerald-600',
  },
  {
    title: 'Kalkulator PPh 21',
    desc: 'Estimasi pajak penghasilan karyawan progresif.',
    href: '/kalkulator/pph21',
    icon: ReceiptText,
    tag: 'Pajak',
    category: 'finansial',
    color: 'bg-indigo-50 text-indigo-600',
  },
  {
    title: 'Gaji Bersih (THP)',
    desc: 'Hitung take home pay setelah pajak dan BPJS.',
    href: '/kalkulator/take-home-pay',
    icon: Wallet,
    tag: 'Gaji',
    category: 'finansial',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Simulasi KPR',
    desc: 'Simulasi cicilan rumah bunga fixed & floating.',
    href: '/kalkulator/kpr',
    icon: Home,
    tag: 'Properti',
    category: 'finansial',
    color: 'bg-purple-50 text-purple-600',
  },

  // ================= TEKNIS =================
  {
    title: 'Konverter Gambar',
    desc: 'Konversi PNG, JPG, WebP langsung di browser.',
    href: '/konverter/image',
    icon: ImageIcon,
    tag: 'Konverter',
    category: 'teknis',
    color: 'bg-cyan-50 text-cyan-600',
  },
  {
    title: 'Kompres Gambar',
    desc: 'Perkecil ukuran gambar ke target 1MB - 5MB.',
    href: '/kompress/gambar',
    icon: Minimize2,
    tag: 'Kompres',
    category: 'teknis',
    color: 'bg-blue-50 text-blue-600',
  },
  {
    title: 'Kompres PDF',
    desc: 'Perkecil ukuran dokumen PDF secara lokal.',
    href: '/kompress/pdf',
    icon: FileText,
    tag: 'Kompres',
    category: 'teknis',
    color: 'bg-zinc-100 text-zinc-600',
  },

  // ================= KREATOR =================
  {
    title: 'Income YT/TikTok',
    desc: 'Estimasi pendapatan kreator dari views & RPM.',
    href: '/kreator/income',
    icon: Zap,
    tag: 'Kreator',
    category: 'kreator',
    color: 'bg-orange-50 text-orange-600',
  },
  {
    title: 'Hashtag Generator',
    desc: 'Buat hashtag viral untuk IG & TikTok.',
    href: '/kreator/hashtag',
    icon: Hash,
    tag: 'Kreator',
    category: 'kreator',
    color: 'bg-purple-50 text-purple-600',
  },
  {
    title: 'Caption Studio',
    desc: 'Generator caption otomatis berbagai gaya.',
    href: '/kreator/caption',
    icon: MessageSquare,
    tag: 'Kreator',
    category: 'kreator',
    color: 'bg-pink-50 text-pink-600',
  },
  {
    title: 'Auto Clipper',
    desc: 'Potong video panjang jadi klip pendek otomatis.',
    href: '/kreator/auto-clipper',
    icon: Scissors,
    tag: 'Clipper',
    category: 'kreator',
    color: 'bg-red-50 text-red-600',
  }
]

export default function ToolGrid() {
  const [query, setQuery] = useState('')
  const [activeCategory, setActiveCategory] = useState<'all' | 'finansial' | 'teknis' | 'kreator'>('all')

  const categories = [
    { id: 'all', name: 'Semua Tools', icon: LayoutGrid },
    { id: 'finansial', name: 'Finansial', icon: Wallet },
    { id: 'kreator', name: 'Kreator', icon: Sparkles },
    { id: 'teknis', name: 'Optimasi', icon: Zap },
  ]

  const filtered = useMemo(() => {
    return tools.filter((t) => {
      const matchQuery = `${t.title} ${t.desc} ${t.tag}`.toLowerCase().includes(query.toLowerCase())
      const matchCategory = activeCategory === 'all' || t.category === activeCategory
      return matchQuery && matchCategory
    })
  }, [query, activeCategory])

  return (
    <div className="space-y-10">
      {/* 🔍 SEARCH & FILTER BAR */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
        <div className="relative w-full md:max-w-md group">
          <div className="absolute inset-y-0 left-5 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-zinc-400 group-focus-within:text-purple-600 transition-colors" />
          </div>
          <input
            type="text"
            placeholder="Cari tool... (zakat, pph21, kompres)"
            className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl pl-12 pr-6 py-4 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all placeholder:text-zinc-300"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* CATEGORY TABS */}
        <div className="flex items-center gap-1 bg-zinc-100 p-1 rounded-2xl w-full md:w-auto overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${activeCategory === cat.id
                  ? 'bg-white text-zinc-900 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600'
                }`}
            >
              <cat.icon size={14} />
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* 🛠️ GRID TOOLS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-in fade-in duration-700">
        {filtered.map((tool) => (
          <article
            key={tool.href}
            className="group relative bg-white border border-zinc-100 rounded-[2rem] p-7 hover:border-purple-500/30 hover:shadow-[0_30px_60px_rgba(0,0,0,0.04)] hover:-translate-y-1.5 transition-all duration-500 overflow-hidden"
          >
            {/* Hover Decorative Glow */}
            <div className="absolute -right-4 -top-4 w-20 h-20 bg-zinc-50 rounded-full group-hover:bg-purple-50 transition-colors duration-500 -z-10" />

            <Link href={tool.href} className="flex flex-col h-full">
              <div className="flex items-center justify-between mb-6">
                <div className={`p-3.5 rounded-2xl ${tool.color} shadow-sm group-hover:scale-110 transition-transform duration-500`}>
                  <tool.icon className="w-6 h-6" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-300 group-hover:text-purple-400 transition-colors">
                  {tool.tag}
                </span>
              </div>

              <h2 className="text-lg font-black italic uppercase tracking-tighter text-zinc-900 group-hover:text-purple-600 transition-colors leading-tight">
                {tool.title}
              </h2>

              <p className="mt-3 text-xs text-zinc-500 leading-relaxed font-medium flex-1">
                {tool.desc}
              </p>

              <div className="mt-6 pt-5 border-t border-zinc-50 flex items-center justify-between">
                <span className="text-[9px] font-black uppercase tracking-widest text-zinc-900 flex items-center gap-2">
                  Launch Tool <ArrowUpRight className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </span>
              </div>
            </Link>
          </article>
        ))}

        {filtered.length === 0 && (
          <div className="col-span-full py-20 text-center space-y-4">
            <div className="inline-flex p-6 bg-zinc-50 rounded-full text-zinc-200">
              <Search size={40} />
            </div>
            <p className="text-zinc-400 text-sm font-medium italic">Tool "{query}" tidak ditemukan. Coba kata kunci lain.</p>
          </div>
        )}
      </div>

      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  )
}