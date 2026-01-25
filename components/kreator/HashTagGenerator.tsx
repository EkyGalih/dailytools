'use client'

import { buildHashtags } from '@/libs/kreator/hashtag'
import { useMemo, useState } from 'react'

export default function HashtagGenerator() {
  const [topic, setTopic] = useState('kopi susu')
  const [platform, setPlatform] = useState<'tiktok' | 'instagram'>('tiktok')
  const [count, setCount] = useState(15)
  const [copied, setCopied] = useState(false)

  const tags = useMemo(() => buildHashtags(topic, platform, count), [topic, platform, count])
  const output = tags.join(' ')

  const copy = async () => {
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 900)
  }

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Topik konten</label>
          <input
            className="w-full border rounded p-2"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: skincare remaja, tips bisnis, resep ayam"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Platform</label>
          <select
            className="w-full border rounded p-2"
            value={platform}
            onChange={(e) => setPlatform(e.target.value as any)}
          >
            <option value="tiktok">TikTok</option>
            <option value="instagram">Instagram</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Jumlah hashtag</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={count}
            onChange={(e) => setCount(Number(e.target.value))}
            min={5}
            max={30}
          />
          <p className="text-xs text-gray-500 mt-1">Rekomendasi 10–20.</p>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Hasil</label>
          <textarea
            className="w-full border rounded p-2 h-28"
            value={output}
            readOnly
          />
        </div>

        <div className="flex items-end">
          <button
            onClick={copy}
            className="w-full bg-black text-white rounded p-2 hover:bg-gray-900 transition"
          >
            {copied ? 'Tercopy ✅' : 'Copy Hashtag'}
          </button>
        </div>
      </div>

      <p className="text-xs text-gray-500">
        Tips: campur hashtag umum + niche. Jangan hanya pakai yang terlalu generik.
      </p>
    </div>
  )
}