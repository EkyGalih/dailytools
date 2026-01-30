'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Smartphone, Monitor, Star, Calendar, ArrowLeft, ChevronLeft } from 'lucide-react'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'
import DramaShareIcons from '@/components/drama/dramabox/DramaShareIcon'

export default function UnifiedReelshortView({ detail, id }: { detail: any, id: string }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [clickCount, setClickCount] = useState<Record<number, number>>({})
    const [isVertical, setIsVertical] = useState(true) // Reelshort default vertical
    const [isAdGap, setIsAdGap] = useState(false)
    const [videoUrl, setVideoUrl] = useState('')
    const [loading, setLoading] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Fungsi Fetch Video URL (Karena Reelshort API per episode)
    const fetchEpisode = async (epNum: number) => {
        setLoading(true)
        try {
            const res = await fetch(`/api/drama/reelshort/episode?id=${id}&ep=${epNum}`)
            const data = await res.json()
            setVideoUrl(data.video_url || '')
        } catch (err) {
            console.error("Gagal load video", err)
        } finally {
            setLoading(false)
        }
    }

    const openAd = () => {
        const products = getAffiliateProducts(["DEFAULT"])
        if (products?.length > 0) {
            const random = products[Math.floor(Math.random() * products.length)]
            if (random?.link) window.open(random.link, "_blank")
        }
    }

    const handleAction = async (index: number) => {
        const epNum = index + 1
        if (!isPlaying) setIsPlaying(true)

        if (isAdGap) {
            openAd(); setIsAdGap(false)
            setTimeout(() => videoRef.current?.play(), 500)
            return
        }

        const count = (clickCount[index] || 0) + 1
        setClickCount(prev => ({ ...prev, [index]: count }))

        if (count === 1) {
            openAd()
            setCurrentIndex(index)
            await fetchEpisode(epNum)
            return
        }
        if (count === 2) {
            openAd()
            return
        }
        if (count >= 3 && videoRef.current) {
            videoRef.current.play()
        }
    }

    const handleVideoEnded = () => {
        const nextIndex = currentIndex + 1
        if (nextIndex < detail.totalEpisodes) {
            if ((nextIndex + 1) % 10 === 0) {
                setIsAdGap(true); setCurrentIndex(nextIndex); fetchEpisode(nextIndex + 1)
                setClickCount(prev => ({ ...prev, [nextIndex]: 3 }))
            } else {
                setCurrentIndex(nextIndex); fetchEpisode(nextIndex + 1)
                setClickCount(prev => ({ ...prev, [nextIndex]: 3 }))
            }
        }
    }

    return (
        <article className="bg-white rounded-[2.5rem] md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100 overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_380px] gap-0">

                {/* LEFT: PLAYER & INFO */}
                <div className="p-4 md:p-10 border-r border-zinc-100 flex flex-col gap-8">

                    {/* Breadcrumb */}
                    <nav className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                        <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                        <ChevronLeft className="w-3 h-3" />
                        <Link href="/drama/china/channel/reelshort" className="hover:text-purple-600 transition-colors">Reelshort</Link>
                        <ChevronLeft className="w-3 h-3" />
                        <span className="text-zinc-900 truncate max-w-[150px]">{detail.title}</span>
                    </nav>

                    <div className="w-full">
                        {!isPlaying ? (
                            <div className="grid md:grid-cols-[250px_1fr] gap-10 items-center">
                                <div className="relative aspect-[3/4] rounded-[2rem] overflow-hidden shadow-2xl ring-1 ring-black/5">
                                    <Image src={detail.cover} alt={detail.title} fill className="object-cover" />
                                </div>
                                <div className="space-y-6 text-center md:text-left">
                                    <h1 className="text-4xl md:text-6xl font-black text-zinc-900 italic uppercase tracking-tighter leading-none">{detail.title}</h1>
                                    <button onClick={() => handleAction(0)} className="flex items-center gap-4 px-10 py-5 bg-purple-600 text-white rounded-2xl font-black uppercase tracking-widest hover:bg-purple-700 shadow-xl shadow-purple-500/20 active:scale-95 transition-all">
                                        <Play className="w-6 h-6 fill-current" /> Mulai Menonton
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className={`relative bg-black rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 ${isVertical ? 'max-w-[360px] mx-auto aspect-[9/16]' : 'w-full aspect-video'}`}>
                                {loading ? (
                                    <div className="absolute inset-0 flex items-center justify-center text-white font-black uppercase text-xs tracking-widest animate-pulse">Loading Source...</div>
                                ) : (
                                    <video ref={videoRef} src={videoUrl} controls onEnded={handleVideoEnded} className="w-full h-full object-contain" autoPlay={(clickCount[currentIndex] || 0) >= 3} />
                                )}

                                {(clickCount[currentIndex] || 0) < 3 && !isAdGap && !loading && (
                                    <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-30 bg-zinc-950/90 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer">
                                        <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4"><Play className="w-8 h-8 text-white fill-current ml-1" /></div>
                                        <p className="text-white font-black italic uppercase tracking-tighter">Klik {3 - (clickCount[currentIndex] || 0)}x Lagi Untuk Play</p>
                                    </div>
                                )}

                                {isAdGap && (
                                    <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-40 bg-purple-900/90 backdrop-blur-3xl flex flex-col items-center justify-center cursor-pointer text-center p-6">
                                        <div className="w-16 h-16 bg-white text-purple-600 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-2xl font-black text-xl">10+</div>
                                        <h2 className="text-white text-xl font-black italic uppercase tracking-tighter">Support & Lanjut</h2>
                                        <p className="text-purple-200 text-[10px] mt-2 font-bold uppercase tracking-widest">Klik 1x untuk lanjut ke Episode {currentIndex + 1}</p>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {/* INFO DETAILS */}
                    <div className="space-y-8 animate-in fade-in duration-700">
                        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-zinc-100 pb-8">
                            <div className="space-y-3 flex-1">
                                <div className="flex items-center gap-3">
                                    <span className="px-2.5 py-1 bg-purple-100 text-purple-600 text-[9px] font-black uppercase tracking-widest rounded-lg">Popular Reelshort</span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="w-3.5 h-3.5 fill-current" />
                                        <span className="text-xs font-black text-zinc-900">4.8</span>
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-none">{detail.title}</h2>
                                <div className="flex flex-wrap items-center gap-4 text-[10px] font-black text-zinc-400 uppercase tracking-widest font-bold">
                                    <span className="flex items-center gap-1.5"><Play className="w-3 h-3" /> {detail.totalEpisodes} Episodes</span>
                                    <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> 2026 Updated</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Link href="/drama/china/channel/reelshort" className="flex items-center gap-2 px-4 py-2 bg-zinc-100 text-zinc-600 text-[10px] font-black uppercase rounded-xl hover:bg-zinc-200 border border-zinc-200/50">
                                    <ArrowLeft className="w-4 h-4" /> Daftar Drama
                                </Link>
                                <button onClick={() => setIsVertical(!isVertical)} className="p-2.5 bg-zinc-100 text-zinc-600 rounded-xl hover:bg-zinc-200 border border-zinc-200/50">
                                    {isVertical ? <Monitor className="w-4 h-4" /> : <Smartphone className="w-4 h-4" />}
                                </button>
                                <div className="p-2.5 bg-zinc-100 rounded-xl border border-zinc-200/50">
                                    <DramaShareIcons title={detail.title} url={typeof window !== 'undefined' ? window.location.href : ''} />
                                </div>
                            </div>
                        </div>

                        <div className="grid md:grid-cols-3 gap-10">
                            <div className="md:col-span-2 space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Sinopsis</h3>
                                <p className="text-zinc-600 leading-relaxed font-medium italic text-lg">"{detail.description}"</p>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xs font-black uppercase tracking-widest text-zinc-400">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 text-zinc-400 text-[10px] font-black uppercase rounded-xl">#ShortDrama</span>
                                    <span className="px-3 py-1.5 bg-zinc-50 border border-zinc-100 text-zinc-400 text-[10px] font-black uppercase rounded-xl">#Viral</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* RIGHT: EPISODES */}
                <aside className="bg-zinc-50/50 flex flex-col h-full lg:max-h-[900px] border-l border-zinc-100">
                    <div className="p-8 border-b border-zinc-100 sticky top-0 bg-zinc-50/80 backdrop-blur-sm z-10">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> Playlist Episode
                        </h3>
                    </div>
                    <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
                        <div className="grid grid-cols-4 lg:grid-cols-2 gap-3 pb-10">
                            {Array.from({ length: detail.totalEpisodes }).map((_, i) => {
                                const isActive = i === currentIndex
                                return (
                                    <button
                                        key={i}
                                        onClick={() => { setIsAdGap(false); handleAction(i) }}
                                        className={`relative flex flex-col items-center justify-center p-4 rounded-2xl border transition-all duration-300 ${isActive
                                                ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-500/30'
                                                : 'bg-white border-zinc-200/60 text-zinc-400 hover:border-purple-300'
                                            }`}
                                    >
                                        <span className="text-[9px] font-black uppercase opacity-60">EP</span>
                                        <span className="text-2xl font-black italic tracking-tighter leading-none">{i + 1}</span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </aside>
            </div>

            <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
      `}</style>
        </article>
    )
}