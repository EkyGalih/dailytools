'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

const tools = [
  { title: 'Kalkulator THR', desc: 'Hitung THR sesuai gaji dan masa kerja.', href: '/kalkulator/thr', emoji: '🎁', tag: 'Finansial' },
  { title: 'Kalkulator Zakat Penghasilan', desc: 'Hitung zakat penghasilan otomatis.', href: '/kalkulator/zakat', emoji: '🕌', tag: 'Finansial' },
  { title: 'Simulasi KPR', desc: 'Simulasi cicilan KPR rumah.', href: '/kalkulator/kpr', emoji: '🏡', tag: 'Properti' },
  { title: 'Kalkulator Zakat Fitrah', desc: 'Hitung zakat fitrah sesuai jumlah jiwa.', href: '/kalkulator/zakat-fitrah', emoji: '🕌', tag: 'Ibadah' },
  { title: 'Kalkulator PPh 21', desc: 'Estimasi pajak penghasilan karyawan.', href: '/kalkulator/pph21', emoji: '📊', tag: 'Pajak' },
  { title: 'Kalkulator Gaji Bersih', desc: 'Hitung take home pay.', href: '/kalkulator/take-home-pay', emoji: '💼', tag: 'Pajak' },
  { title: 'Kalkulator Cicilan', desc: 'Simulasi cicilan kredit.', href: '/kalkulator/cicilan', emoji: '🏠', tag: 'Kredit' },
  { title: 'Konverter Gambar', desc: 'Konversi PNG, JPG, WebP.', href: '/konverter/image', emoji: '🖼️', tag: 'Converter' },
  { title: 'Kompres Gambar', desc: 'Perkecil ukuran gambar.', href: '/kompress/gambar', emoji: '📉', tag: 'Converter' },
  { title: 'Kompres PDF', desc: 'Perkecil ukuran file PDF.', href: '/kompress/pdf', emoji: '📄', tag: 'Converter' },
]

export default function ToolGrid() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return tools
    return tools.filter((t) =>
      `${t.title} ${t.desc}`.toLowerCase().includes(query.toLowerCase())
    )
  }, [query])

  return (
    <section className="space-y-12">
      <input
        type="text"
        placeholder="Cari tools… (contoh: zakat, cicilan)"
        className="w-full border rounded-xl px-4 py-3"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-white border rounded-2xl p-6 hover:shadow-lg transition"
          >
            <div className="flex justify-between">
              <div className="text-3xl">{tool.emoji}</div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                {tool.tag}
              </span>
            </div>
            <h2 className="mt-4 text-lg font-semibold">{tool.title}</h2>
            <p className="mt-2 text-sm text-gray-600">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </section>
  )
}