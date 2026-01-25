'use client'

import Link from 'next/link'
import { useState, useMemo } from 'react'

type Tool = {
  title: string
  desc: string
  href: string
  emoji: string
  tag: string
  category: 'finansial' | 'teknis' | 'kreator'
}

const tools: Tool[] = [
  // ================= FINANSIAL =================
  {
    title: 'Kalkulator THR',
    desc: 'Hitung THR sesuai gaji dan masa kerja.',
    href: '/kalkulator/thr',
    emoji: '🎁',
    tag: 'Finansial',
    category: 'finansial',
  },
  {
    title: 'Kalkulator Zakat Penghasilan',
    desc: 'Hitung zakat penghasilan otomatis.',
    href: '/kalkulator/zakat',
    emoji: '🕌',
    tag: 'Finansial',
    category: 'finansial',
  },
  {
    title: 'Kalkulator Zakat Fitrah',
    desc: 'Hitung zakat fitrah sesuai jumlah jiwa.',
    href: '/kalkulator/zakat-fitrah',
    emoji: '🕌',
    tag: 'Ibadah',
    category: 'finansial',
  },
  {
    title: 'Kalkulator PPh 21',
    desc: 'Estimasi pajak penghasilan karyawan.',
    href: '/kalkulator/pph21',
    emoji: '📊',
    tag: 'Pajak',
    category: 'finansial',
  },
  {
    title: 'Kalkulator Gaji Bersih',
    desc: 'Hitung take home pay karyawan.',
    href: '/kalkulator/take-home-pay',
    emoji: '💼',
    tag: 'Pajak',
    category: 'finansial',
  },
  {
    title: 'Simulasi KPR',
    desc: 'Simulasi cicilan KPR rumah.',
    href: '/kalkulator/kpr',
    emoji: '🏡',
    tag: 'Properti',
    category: 'finansial',
  },
  {
    title: 'Kalkulator Cicilan',
    desc: 'Simulasi cicilan kredit motor & mobil.',
    href: '/kalkulator/cicilan',
    emoji: '🏠',
    tag: 'Kredit',
    category: 'finansial',
  },

  // ================= TEKNIS =================
  {
    title: 'Konverter Gambar',
    desc: 'Konversi PNG, JPG, WebP langsung di browser.',
    href: '/konverter/image',
    emoji: '🖼️',
    tag: 'Konverter',
    category: 'teknis',
  },
  {
    title: 'Kompres Gambar',
    desc: 'Perkecil ukuran gambar JPG, PNG, WebP.',
    href: '/kompress/gambar',
    emoji: '📉',
    tag: 'Kompres',
    category: 'teknis',
  },
  {
    title: 'Kompres PDF',
    desc: 'Perkecil ukuran file PDF.',
    href: '/kompress/pdf',
    emoji: '📄',
    tag: 'Kompres',
    category: 'teknis',
  },

  // ================= KREATOR =================
  {
    title: 'Kalkulator Penghasilan YouTube',
    desc: 'Estimasi pendapatan YouTube dari views & RPM.',
    href: '/kreator/calculate-income',
    emoji: '▶️',
    tag: 'Kreator',
    category: 'kreator',
  },
  {
    title: 'Generator Hashtag',
    desc: 'Buat hashtag Instagram & TikTok sesuai topik.',
    href: '/kreator/hashtag',
    emoji: '#️⃣',
    tag: 'Kreator',
    category: 'kreator',
  },
  {
    title: 'Generator Caption',
    desc: 'Buat caption IG & TikTok berbagai gaya.',
    href: '/kreator/caption',
    emoji: '✍️',
    tag: 'Kreator',
    category: 'kreator',
  },
  {
    title: 'Estimasi Ukuran Video',
    desc: 'Perkirakan ukuran video sebelum upload.',
    href: '/kreator/video-size',
    emoji: '🎬',
    tag: 'Kreator',
    category: 'kreator',
  },
  {
    title: 'Auto Clipper Video',
    desc: 'Upload video panjang → otomatis jadi banyak klip, bisa download satu atau semua.',
    href: '/kreator/auto-clipper',
    emoji: '✂️',
    tag: 'Kreator',
    category: 'kreator',
  }
]

export default function ToolGrid() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    if (!query) return tools
    const q = query.toLowerCase()
    return tools.filter((t) =>
      `${t.title} ${t.desc} ${t.tag}`.toLowerCase().includes(q)
    )
  }, [query])

  return (
    <section
      className="space-y-12"
      aria-label="Daftar kalkulator dan tools online"
    >
      {/* SEARCH */}
      <input
        type="text"
        placeholder="Cari tools… (contoh: zakat, youtube, kompres)"
        className="w-full border rounded-xl px-4 py-3"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Cari tools"
      />

      {/* GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group bg-white border rounded-2xl p-6 hover:shadow-lg hover:-translate-y-1 transition"
          >
            <div className="flex justify-between items-start">
              <div className="text-3xl">{tool.emoji}</div>
              <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">
                {tool.tag}
              </span>
            </div>

            <h2 className="mt-4 text-lg font-semibold group-hover:underline">
              {tool.title}
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              {tool.desc}
            </p>
          </Link>
        ))}
      </div>

      {/* SEO TEXT */}
      <p className="text-xs text-gray-500 max-w-3xl">
        My Tools menyediakan berbagai kalkulator finansial, tools teknis,
        dan alat bantu untuk konten kreator yang dapat digunakan gratis
        langsung dari browser tanpa registrasi.
      </p>
    </section>
  )
}