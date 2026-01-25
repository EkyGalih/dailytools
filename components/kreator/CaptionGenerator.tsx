'use client'

import { buildCaptions } from '@/libs/kreator/caption'
import { useMemo, useState } from 'react'

export default function CaptionGenerator() {
  const [topic, setTopic] = useState('tips hemat listrik')
  const [tone, setTone] = useState<'santai' | 'profesional' | 'jualan' | 'edukatif'>('santai')
  const [cta, setCta] = useState<'follow' | 'komen' | 'save' | 'share' | 'dm'>('save')
  const [emoji, setEmoji] = useState(true)
  const [count, setCount] = useState(6)

  const captions = useMemo(
    () => buildCaptions({ topic, tone, cta, emoji, count }),
    [topic, tone, cta, emoji, count]
  )

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Topik konten</label>
          <input
            className="w-full border rounded p-2"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            placeholder="Contoh: review coffee shop, tips jualan online"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Gaya</label>
          <select
            className="w-full border rounded p-2"
            value={tone}
            onChange={(e) => setTone(e.target.value as any)}
          >
            <option value="santai">Santai</option>
            <option value="profesional">Profesional</option>
            <option value="edukatif">Edukatif</option>
            <option value="jualan">Jualan</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">CTA</label>
          <select
            className="w-full border rounded p-2"
            value={cta}
            onChange={(e) => setCta(e.target.value as any)}
          >
            <option value="save">Ajak Save</option>
            <option value="komen">Ajak Komen</option>
            <option value="share">Ajak Share</option>
            <option value="follow">Ajak Follow</option>
            <option value="dm">Ajak DM</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Jumlah output</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={count}
            min={3}
            max={12}
            onChange={(e) => setCount(Number(e.target.value))}
          />
        </div>

        <div className="flex items-end gap-3">
          <label className="flex items-center gap-2 text-sm text-gray-700">
            <input
              type="checkbox"
              checked={emoji}
              onChange={(e) => setEmoji(e.target.checked)}
            />
            Pakai emoji
          </label>
        </div>
      </div>

      <div className="space-y-3">
        {captions.map((c, idx) => (
          <CaptionCard key={idx} text={c} />
        ))}
      </div>

      <p className="text-xs text-gray-500">
        Tips: caption terbaik biasanya punya hook 1 kalimat + isi singkat + CTA.
      </p>
    </div>
  )
}

function CaptionCard({ text }: { text: string }) {
  const copy = async () => {
    await navigator.clipboard.writeText(text)
  }

  return (
    <div className="border rounded-xl p-4 bg-gray-50">
      <p className="text-sm text-gray-800 whitespace-pre-wrap">{text}</p>
      <button
        onClick={copy}
        className="mt-3 text-xs underline text-black"
      >
        Copy
      </button>
    </div>
  )
}