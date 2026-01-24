'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

const tools = [
  {
    title: 'Kalkulator THR',
    desc: 'Hitung Tunjangan Hari Raya berdasarkan gaji dan masa kerja.',
    href: '/thr',
    cta: 'Hitung THR',
    emoji: '🎁',
    tag: 'Finansial',
  },
  {
    title: 'Kalkulator Zakat',
    desc: 'Hitung zakat penghasilan otomatis berdasarkan nisab emas.',
    href: '/zakat',
    cta: 'Hitung Zakat',
    emoji: '🕌',
    tag: 'Finansial',
  },
  {
    title: 'Kalkulator PPh 21',
    desc: 'Estimasi pajak penghasilan karyawan dengan tarif progresif.',
    href: '/pph21',
    cta: 'Hitung PPh 21',
    emoji: '📊',
    tag: 'Pajak',
  },
  {
    title: 'Kalkulator Gaji Bersih',
    desc: 'Hitung take home pay setelah pajak dan BPJS.',
    href: '/take-home-pay',
    cta: 'Hitung Gaji Bersih',
    emoji: '💼',
    tag: 'Pajak',
  },
  {
    title: 'Kalkulator Cicilan',
    desc: 'Simulasi cicilan motor, mobil, KPR, dan kredit lainnya.',
    href: '/cicilan',
    cta: 'Hitung Cicilan',
    emoji: '🏠',
    tag: 'Kredit',
  },
  {
    title: 'Kompres Gambar',
    desc: 'Kompres JPG & PNG ke ukuran kecil tanpa kehilangan kualitas.',
    href: '/compress-image',
    cta: 'Kompres Gambar',
    emoji: '🖼️',
    tag: 'Converter',
  },
]

export default function Home() {
  const [query, setQuery] = useState('')

  const filteredTools = useMemo(() => {
    if (!query) return tools
    return tools.filter((tool) =>
      `${tool.title} ${tool.desc}`
        .toLowerCase()
        .includes(query.toLowerCase())
    )
  }, [query])

  return (
    <section className="space-y-24">
      {/* HERO */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-black to-gray-800 text-white px-6 py-20">
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Daily Tools untuk Kebutuhan Finansial
          </h1>

          <p className="mt-6 text-gray-300 text-lg">
            Kalkulator & tools online untuk THR, zakat, pajak, gaji bersih,
            cicilan, dan kebutuhan harian lainnya. Cepat, gratis, dan mudah.
          </p>

          {/* SEARCH */}
          <div className="mt-10 max-w-xl mx-auto">
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                🔍
              </span>
              <input
                type="text"
                placeholder="Cari tools… (contoh: zakat, cicilan)"
                className="w-full pl-12 pr-4 py-3 rounded-xl text-black bg-white border border-gray-700
                           focus:outline-none focus:ring-2 focus:ring-white"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* DECOR */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_60%)]" />
      </div>

      {/* TOOLS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {filteredTools.length === 0 && (
          <p className="col-span-full text-center text-gray-500">
            Tidak ada tools yang cocok dengan pencarian.
          </p>
        )}

        {filteredTools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white border rounded-2xl p-6
                       hover:shadow-xl hover:-translate-y-1
                       transition-all duration-200"
          >
            <div className="flex items-start justify-between">
              <div className="text-3xl">{tool.emoji}</div>
              <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                {tool.tag}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-semibold group-hover:text-black">
              {tool.title}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {tool.desc}
            </p>

            <span className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-black">
              {tool.cta}
              <span className="transition group-hover:translate-x-1">→</span>
            </span>
          </Link>
        ))}
      </div>

      {/* TRUST */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto text-center">
        <div className="bg-white border rounded-xl p-6">
          <p className="text-lg font-semibold">⚡ Cepat</p>
          <p className="text-sm text-gray-600 mt-2">
            Hasil instan tanpa loading lama.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-lg font-semibold">🎯 Akurat</p>
          <p className="text-sm text-gray-600 mt-2">
            Berdasarkan rumus & aturan resmi.
          </p>
        </div>

        <div className="bg-white border rounded-xl p-6">
          <p className="text-lg font-semibold">💯 Gratis</p>
          <p className="text-sm text-gray-600 mt-2">
            Tanpa login, tanpa biaya.
          </p>
        </div>
      </div>
    </section>
  )
}