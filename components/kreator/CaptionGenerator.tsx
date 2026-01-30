'use client'

import { buildCaptions, Platform, Tone, Cta } from '@/libs/kreator/caption'
import { useMemo, useState } from 'react'
import { Copy, Check, Zap, Smartphone, Music2, Instagram, Facebook, Youtube, Smile, Type, Target } from 'lucide-react'

export default function CaptionGenerator() {
    const [topic, setTopic] = useState('tips hemat listrik')
    const [platform, setPlatform] = useState<Platform>('instagram')
    const [tone, setTone] = useState<Tone>('santai')
    const [cta, setCta] = useState<Cta>('save')
    const [emoji, setEmoji] = useState(true)
    const [countDisplay, setCountDisplay] = useState('6') // String untuk desimal formatter

    // Formatter desimal/ribuan
    const formatInput = (value: string) => {
        if (!value) return ''
        const cleanValue = value.replace(/[^0-9,]/g, '')
        const parts = cleanValue.split(',')
        parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, '.')
        return parts.length > 1 ? `${parts[0]},${parts[1].slice(0, 1)}` : parts[0]
    }

    const parseToNumber = (value: string) => {
        const normalized = value.replace(/\./g, '').replace(',', '.')
        return Math.min(Math.max(parseInt(normalized) || 0, 3), 12)
    }

    const captions = useMemo(
        () => buildCaptions({ topic, platform, tone, cta, emoji, count: parseToNumber(countDisplay) }),
        [topic, platform, tone, cta, emoji, countDisplay]
    )

    return (
        <div className="w-full space-y-10 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">

                {/* INPUT AREA */}
                <div className="space-y-8">
                    <div className="space-y-6">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400 ml-1">
                            <Zap className="w-3 h-3 text-purple-500" /> Caption Settings
                        </label>

                        <div className="grid gap-6">
                            {/* Topic */}
                            <div className="relative group">
                                <input
                                    type="text"
                                    value={topic}
                                    onChange={(e) => setTopic(e.target.value)}
                                    className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold focus:outline-none focus:ring-4 focus:ring-purple-500/5 focus:border-purple-500 transition-all shadow-sm"
                                />
                                <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400 tracking-widest">Topik Konten</label>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {/* Gaya Select */}
                                <div className="relative">
                                    <select
                                        value={tone}
                                        onChange={(e) => setTone(e.target.value as Tone)}
                                        className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-xs font-bold appearance-none focus:ring-4 focus:ring-purple-500/5 transition-all shadow-sm"
                                    >
                                        <option value="santai">Santai</option>
                                        <option value="profesional">Profesional</option>
                                        <option value="edukatif">Edukatif</option>
                                        <option value="jualan">Jualan</option>
                                    </select>
                                    <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Gaya Bahasa</label>
                                </div>
                                {/* CTA Select */}
                                <div className="relative">
                                    <select
                                        value={cta}
                                        onChange={(e) => setCta(e.target.value as Cta)}
                                        className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-xs font-bold appearance-none focus:ring-4 focus:ring-purple-500/5 transition-all shadow-sm"
                                    >
                                        <option value="save">Ajak Save</option>
                                        <option value="komen">Ajak Komen</option>
                                        <option value="share">Ajak Share</option>
                                        <option value="follow">Ajak Follow</option>
                                    </select>
                                    <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Pilihan CTA</label>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 items-center">
                                {/* Output Count formatted */}
                                <div className="relative">
                                    <input
                                        type="text"
                                        inputMode="decimal"
                                        value={countDisplay}
                                        onChange={(e) => setCountDisplay(formatInput(e.target.value))}
                                        className="w-full bg-white border border-zinc-200 rounded-2xl px-5 py-4 text-zinc-900 font-bold"
                                    />
                                    <label className="absolute -top-2.5 left-5 px-2 bg-white text-[9px] font-black uppercase text-zinc-400">Jumlah</label>
                                </div>
                                <label className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" checked={emoji} onChange={(e) => setEmoji(e.target.checked)} className="w-5 h-5 rounded-lg border-zinc-300 text-purple-600 focus:ring-purple-500" />
                                    <span className="text-[10px] font-black uppercase text-zinc-400 group-hover:text-zinc-900 transition-colors tracking-widest">Gunakan Emoji</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* PLATFORM PILLS */}
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
                                            ? 'bg-zinc-900 border-zinc-900 text-white'
                                            : 'bg-white border-zinc-200 text-zinc-500 hover:border-purple-500'
                                        }`}
                                >
                                    <p.icon className="w-3.5 h-3.5" /> {p.name}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* RIGHT: RESULTS AREA */}
                <div className="relative rounded-[2.5rem] bg-[#0c0c0c] p-6 md:p-8 overflow-hidden border border-white/5 shadow-2xl flex flex-col h-[500px] lg:h-auto">
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full" />
                    <div className="relative z-10 flex flex-col h-full">
                        <header className="flex items-center justify-between mb-6">
                            <span className="text-purple-400 text-[10px] font-black uppercase tracking-[0.3em]">Draft Captions</span>
                            <div className="px-2 py-1 rounded-md bg-white/5 text-[8px] font-black text-zinc-500 uppercase">Live Preview</div>
                        </header>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-2 custom-scrollbar">
                            {captions.map((c, i) => (
                                <CaptionCard key={i} text={c} />
                            ))}
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

function CaptionCard({ text }: { text: string }) {
    const [copied, setCopied] = useState(false)
    const copy = async () => {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="group bg-white/[0.03] border border-white/5 rounded-2xl p-5 hover:bg-white/[0.05] hover:border-purple-500/30 transition-all relative">
            <p className="text-zinc-200 text-sm font-medium leading-relaxed whitespace-pre-wrap">{text}</p>
            <button
                onClick={copy}
                className={`mt-4 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest transition-colors ${copied ? 'text-green-400' : 'text-zinc-500 hover:text-white'}`}
            >
                {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                {copied ? 'Disalin' : 'Salin Caption'}
            </button>
        </div>
    )
}