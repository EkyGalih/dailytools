'use client'

import { buildCaptions, Platform, Tone, Cta } from '@/libs/kreator/caption'
import { useMemo, useState } from 'react'

export default function CaptionGenerator() {
    const [topic, setTopic] = useState('tips hemat listrik')
    const [platform, setPlatform] = useState<Platform>('instagram')
    const [tone, setTone] = useState<Tone>('santai')
    const [cta, setCta] = useState<Cta>('save')
    const [emoji, setEmoji] = useState(true)
    const [count, setCount] = useState(6)

    const captions = useMemo(
        () =>
            buildCaptions({
                topic,
                platform,
                tone,
                cta,
                emoji,
                count,
            }),
        [topic, platform, tone, cta, emoji, count]
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
                        placeholder="Contoh: tips bisnis online, review produk"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium">Platform</label>
                    <select
                        className="w-full border rounded p-2"
                        value={platform}
                        onChange={(e) => setPlatform(e.target.value as Platform)}
                    >
                        <option value="instagram">Instagram</option>
                        <option value="tiktok">TikTok</option>
                        <option value="facebook">Facebook Reels</option>
                        <option value="youtube">YouTube Shorts</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium">Gaya</label>
                    <select
                        className="w-full border rounded p-2"
                        value={tone}
                        onChange={(e) => setTone(e.target.value as Tone)}
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
                        onChange={(e) => setCta(e.target.value as Cta)}
                    >
                        <option value="save">Ajak Save</option>
                        <option value="komen">Ajak Komentar</option>
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

                <div className="flex items-end">
                    <label className="flex items-center gap-2 text-sm">
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
                {captions.map((c, i) => (
                    <CaptionCard key={i} text={c} />
                ))}
            </div>
        </div>
    )
}

function CaptionCard({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)

        // auto reset setelah 1 detik
        setTimeout(() => setCopied(false), 1000)
    }

    return (
        <div className="border rounded-xl p-4 bg-gray-50 relative">
            <p className="text-sm text-gray-800 whitespace-pre-wrap">
                {text}
            </p>

            <button
                onClick={copy}
                className="mt-3 text-xs font-medium underline text-black cursor-pointer hover:text-gray-700 transition"
            >
                Copy
            </button>

            {/* FEEDBACK */}
            {copied && (
                <span className="absolute top-3 right-3 text-xs text-green-600 font-medium">
                    ✓ Disalin
                </span>
            )}
        </div>
    )
}