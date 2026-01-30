'use client'

import { useMemo, useState, useEffect } from 'react'
import { buildHashtags } from '@/libs/kreator/hashtag'
import { Copy, Check, Sparkles, Zap, Smartphone, Music2, Instagram, Facebook, Youtube } from 'lucide-react'

type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube'

export default function HashtagGenerator() {
    const [topic, setTopic] = useState('kopi susu')
    const [platform, setPlatform] = useState<Platform>('tiktok')
    const [countDisplay, setCountDisplay] = useState('15')
    const [copied, setCopied] = useState(false)

    // Formatter desimal/ribuan untuk jumlah hashtag
    const formatInput = (value: string) => {
        if (!value) return ''
        const cleanValue = value.replace(/[^0-9,]/g, '')
        const parts = cleanValue.split(',')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return parts.length > 1 ? `${parts[0]},${parts[1].slice(0, 1)}` : parts[0]
    }

    const parseToNumber = (value: string) => {
        const normalized = value.replace(/\./g, '').replace(',', '.')
        return Math.min(Math.max(parseInt(normalized) || 0, 0), 30) // Limit max 30 tags
    }

    const tags = useMemo(
        () => buildHashtags(topic, platform, parseToNumber(countDisplay)),
        [topic, platform, countDisplay]
    )

    const output = tags.join(' ')

    const copy = async () => {
        await navigator.clipboard.writeText(output)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="w-full space-y-10 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                {/* LEFT: INPUT AREA */}
                <div className="space-y-8">
                    <div className="space-y-6">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
                            <Zap className="w-3 h-3 text-purple-500" /> Hashtag Config
                        </label>

                        <div className="grid gap-6">
                            {/* Input Topic */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    placeholder="Contoh: kuliner jakarta..."
                                    className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all shadow-sm placeholder:text-zinc-200"
                                />
                                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400 tracking-widest">Topik Konten</label>
                            </div>

                            {/* Input Count (With Decimal/Separator Concept) */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    inputMode="decimal"
                                    value={countDisplay}
                                    onChange={(e) => setCountDisplay(formatInput(e.target.value))}
                                    className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all shadow-sm"
                                />
                                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400 tracking-widest">Jumlah Hashtag</label>
                            </div>
                        </div>
                    </div>

                    {/* PLATFORM PILLS - Mengganti Dropdown */}
                    <div className="space-y-4">
                        <p className="text-[9px] font-black text-zinc-300 uppercase tracking-widest ml-1">Select Platform</p>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'tiktok', name: 'TikTok', icon: Music2 },
                                { id: 'instagram', name: 'Instagram', icon: Instagram },
                                { id: 'facebook', name: 'Facebook', icon: Facebook },
                                { id: 'youtube', name: 'YouTube', icon: Youtube }
                            ].map((p) => (
                                <button
                                    key={p.id}
                                    onClick={() => setPlatform(p.id as Platform)}
                                    className={`flex items-center gap-2.5 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all active:scale-95 shadow-sm border ${platform === p.id
                                            ? 'bg-zinc-900 border-zinc-900 text-white shadow-zinc-200'
                                            : 'bg-white border-zinc-200 text-zinc-500 hover:border-purple-500'
                                        }`}
                                >
                                    <p.icon className="w-3.5 h-3.5" /> {p.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: RESULT BOX (Premium Dark Mode) */}
                <div className="relative min-h-[300px] rounded-[2.5rem] bg-[#0c0c0c] p-8 md:p-10 overflow-hidden border border-white/5 shadow-2xl flex flex-col">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />

                    <div className="relative z-10 flex flex-col h-full">
                        <header className="flex items-center justify-between mb-6">
                            <span className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em]">Result Tags</span>
                            <button
                                onClick={copy}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${copied ? 'bg-green-500 text-white' : 'bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white border border-white/10'
                                    }`}
                            >
                                {copied ? <><Check className="w-3 h-3" /> Copied</> : <><Copy className="w-3 h-3" /> Copy All</>}
                            </button>
                        </header>

                        <div className="flex-1 bg-white/[0.03] rounded-2xl p-4 border border-white/5 overflow-y-auto custom-scrollbar">
                            <p className="text-zinc-200 text-sm md:text-base font-medium leading-relaxed italic tracking-tight">
                                {output || <span className="text-zinc-700">Awaiting keywords...</span>}
                            </p>
                        </div>

                        <div className="mt-6 flex items-center gap-3 text-zinc-500">
                            <Sparkles className="w-4 h-4 text-purple-500" />
                            <p className="text-[9px] font-bold uppercase tracking-widest leading-none">
                                {platform === 'instagram' ? 'Tip: Gunakan 5-15 hashtag untuk hasil terbaik' : 'Tip: Gabungkan niche + hashtag umum'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
            `}</style>
        </div>
    )
}