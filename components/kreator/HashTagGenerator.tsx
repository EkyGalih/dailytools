'use client'

import { useMemo, useState } from 'react'
import { buildHashtags } from '@/libs/kreator/hashtag'

type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube'

export default function HashtagGenerator() {
    const [topic, setTopic] = useState('kopi susu')
    const [platform, setPlatform] = useState<Platform>('tiktok')
    const [count, setCount] = useState(15)
    const [copied, setCopied] = useState(false)

    const tags = useMemo(
        () => buildHashtags(topic, platform, count),
        [topic, platform, count]
    )

    const output = tags.join(' ')

    const copy = async () => {
        await navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 1000)
    }

    return (
        <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
                <div className="md:col-span-3">
                    <label className="block text-sm font-medium">Topik konten</label>
                    <input
                        className="w-full border rounded p-2"
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        placeholder="Contoh: tips jualan online, skincare remaja"
                    />
                </div>

                <div className='md:col-span-3'>
                    <label className="block text-sm font-medium">Platform</label>
                    <select
                        className="w-full border rounded p-2"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value as Platform)}
                    >
                        <option value="tiktok">TikTok</option>
                        <option value="instagram">Instagram</option>
                        <option value="facebook">Facebook Reels</option>
                        <option value="youtube">YouTube Shorts</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Jumlah hashtag</label>
                    <input
                        type="number"
                        className="w-full border rounded p-2"
                        value={count}
                        min={5}
                        max={30}
                        onChange={(e) => setCount(Number(e.target.value))}
                    />
                    <p className="text-xs text-gray-500">
                        {platform === 'instagram' && 'Rekomendasi: 5–15 hashtag'}
                        {platform === 'tiktok' && 'Rekomendasi: 3–5 hashtag'}
                    </p>
                </div>
            </div>

            <div className="grid md:grid-cols-1 gap-4">
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
                        className="w-full bg-black text-white rounded p-2 hover:bg-gray-900"
                    >
                        {copied ? 'Tercopy ✅' : 'Copy Hashtag'}
                    </button>
                </div>
            </div>

            <p className="text-xs text-gray-500">
                Tips: gabungkan hashtag niche + umum. Jangan hanya pakai hashtag viral.
            </p>
        </div>
    )
}