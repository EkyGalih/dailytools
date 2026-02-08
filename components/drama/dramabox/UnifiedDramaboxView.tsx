'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Play, Lock, Smartphone, Monitor, Calendar, Info, ChevronLeft, Star, ArrowLeft } from 'lucide-react'
import { getAffiliateProducts } from '@/libs/ads/getAffiliateProducts'
import DramaShareIcons from '@/components/drama/dramabox/DramaShareIcon'
import AffiliateShelf from '../ads/AffiliateShelf'
import { usePremiumDracinStatus } from '../usePremiumDrachin'

export default function UnifiedDramaboxView({ detail, episodes }: { detail: any, episodes: any[] }) {
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [clickCount, setClickCount] = useState<Record<number, number>>({})
    const [isVertical, setIsVertical] = useState(false)
    const [isAdGap, setIsAdGap] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)

    // handle premium status
    const { premium, loading } = usePremiumDracinStatus();
    const FREE_LIMIT = 25;
    const [showPremiumModal, setShowPremiumModal] = useState(false)

    const currentEpisode = episodes[currentIndex]

    const videoUrl = (() => {
        const cdn = currentEpisode?.cdnList?.find((c: any) => c.isDefault) || currentEpisode?.cdnList?.[0]
        const video = cdn?.videoPathList?.find((v: any) => v.isDefault) || cdn?.videoPathList?.[0]
        return video?.videoPath || ''
    })()

    const openAd = () => {
        const products = getAffiliateProducts(detail.tags || ["DEFAULT"])
        if (products?.length > 0) {
            const random = products[Math.floor(Math.random() * products.length)]
            if (random?.link) window.open(random.link, "_blank")
        }
    }

    const handleAction = (index: number) => {
        if (!isPlaying) setIsPlaying(true)

        // Kalau lagi adGap (per 10 episode)
        if (isAdGap) {
            openAd()
            setIsAdGap(false)

            setTimeout(() => videoRef.current?.play(), 500)
            return
        }

        const count = (clickCount[index] || 0) + 1
        setClickCount(prev => ({ ...prev, [index]: count }))

        // ✅ Klik pertama → iklan
        if (count === 1) {
            openAd()
            setCurrentIndex(index)
            return
        }

        // ✅ Klik kedua → play
        if (count >= 2 && videoRef.current) {
            videoRef.current.play()
        }
    }

    const handleVideoEnded = () => {
        const nextIndex = currentIndex + 1
        if (!premium && nextIndex >= FREE_LIMIT) {
            setIsPlaying(false)
            setShowPremiumModal(true)
            return
        }

        if (nextIndex < episodes.length) {
            if ((nextIndex + 1) % 10 === 0) {
                setIsAdGap(true); setCurrentIndex(nextIndex)
                setClickCount(prev => ({ ...prev, [nextIndex]: 3 }))
            } else {
                setCurrentIndex(nextIndex)
                setClickCount(prev => ({ ...prev, [nextIndex]: 3 }))
            }
        }
    }

    useEffect(() => {
        if (isPlaying && !isAdGap && (clickCount[currentIndex] || 0) >= 2) {
            const timer = setTimeout(() => {
                videoRef.current?.play().catch(() => console.log("Autoplay blocked"))
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [currentIndex, isAdGap])

    return (
        <article className="bg-white rounded-[1.5rem] md:rounded-[40px] shadow-[0_40px_100px_rgba(0,0,0,0.06)] border border-zinc-100 overflow-hidden">
            <div className="grid lg:grid-cols-[1fr_380px] gap-0">

                {/* ========================================== */}
                {/* LEFT: PLAYER & INFO AREA */}
                {/* ========================================== */}
                <div className="p-4 md:p-10 border-r border-zinc-100 flex flex-col gap-6 md:gap-8">

                    {/* Breadcrumb - Ukuran lebih kecil di Mobile */}
                    <nav className="flex items-center gap-1.5 text-[8px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 overflow-hidden whitespace-nowrap">
                        <Link href="/" className="hover:text-purple-600 transition-colors">Home</Link>
                        <ChevronLeft className="w-2.5 h-2.5" />
                        <Link href="/drama/china/channel/dramabox" className="hover:text-purple-600 transition-colors">DramaBox</Link>
                        <ChevronLeft className="w-2.5 h-2.5" />
                        <span className="text-zinc-900 truncate">{detail.bookName}</span>
                    </nav>

                    {/* 1. THE PLAYER / PREVIEW */}
                    <div className="w-full">
                        {!isPlaying ? (
                            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-6 md:gap-8 items-center">
                                <div className="relative aspect-[3/4] rounded-[1.5rem] md:rounded-[2rem] max-w-[200px] md:max-w-none mx-auto w-full overflow-hidden shadow-2xl ring-1 ring-black/5">
                                    <Image src={detail.coverWap} alt={detail.bookName} fill className="object-cover" />
                                </div>
                                <div className="space-y-4 md:space-y-6 text-center md:text-left">
                                    <h1 className="text-2xl md:text-4xl font-black text-zinc-900 italic uppercase tracking-tighter leading-tight md:leading-none">
                                        {detail.bookName}
                                    </h1>
                                    <button
                                        onClick={() => handleAction(0)}
                                        className="group flex items-center justify-center gap-3 px-8 py-4 md:px-10 md:py-5 bg-purple-600 text-white rounded-xl md:rounded-2xl text-xs md:text-sm font-black uppercase tracking-widest hover:bg-purple-700 transition-all active:scale-95 shadow-xl shadow-purple-500/20"
                                    >
                                        <Play className="w-5 h-5 md:w-6 md:h-6 fill-current" /> Mulai Menonton
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className={`relative bg-black rounded-[1.2rem] md:rounded-[2rem] overflow-hidden shadow-2xl transition-all duration-700 ${isVertical ? 'max-w-[320px] md:max-w-[360px] mx-auto aspect-[9/16]' : 'w-full aspect-video'}`}>
                                    <video ref={videoRef} src={videoUrl} controls onEnded={handleVideoEnded} className="w-full h-full object-contain" />

                                    {/* Overlays 3x Klik */}
                                    {(clickCount[currentIndex] || 0) < 2 && !isAdGap && (
                                        <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-30 bg-zinc-950/90 backdrop-blur-xl flex flex-col items-center justify-center cursor-pointer p-4 text-center">
                                            <div className="w-12 h-12 md:w-16 md:h-16 bg-purple-600 rounded-full flex items-center justify-center mb-4 shadow-lg shadow-purple-500/50">
                                                <Play className="w-6 h-6 md:w-8 md:h-8 text-white fill-current ml-1" />
                                            </div>
                                            <p className="text-white text-sm md:text-base font-black italic uppercase tracking-tighter leading-none">
                                                Klik Untuk Memulai
                                            </p>
                                        </div>
                                    )}

                                    {/* Overlays 10 Ep Gap */}
                                    {isAdGap && (
                                        <div onClick={() => handleAction(currentIndex)} className="absolute inset-0 z-40 bg-purple-900/95 backdrop-blur-3xl flex flex-col items-center justify-center cursor-pointer text-center p-6">
                                            <div className="w-16 h-16 md:w-20 md:h-20 bg-white text-purple-600 rounded-full flex items-center justify-center mb-6 animate-bounce shadow-2xl font-black text-xl md:text-2xl">10+</div>
                                            <h2 className="text-white text-lg md:text-2xl font-black italic uppercase tracking-tighter">Support & Lanjut</h2>
                                            <p className="text-purple-200 text-[10px] md:text-xs mt-2 font-bold uppercase tracking-widest">Klik untuk lanjut ke Episode {currentIndex + 1}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* 2. DRAMA INFORMATION */}
                    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-700">
                        <div className="flex flex-col gap-6 border-b border-zinc-50 pb-6 md:pb-8">
                            {/* BARIS 1: INFORMASI JUDUL & META */}
                            <div className="space-y-2 md:space-y-3">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-0.5 bg-purple-100 text-purple-600 text-[8px] md:text-[9px] font-black uppercase rounded-md tracking-widest">
                                        Trending Now
                                    </span>
                                    <div className="flex items-center gap-1 text-yellow-500">
                                        <Star className="w-3 h-3 fill-current" />
                                        <span className="text-[10px] font-black text-zinc-900">4.9</span>
                                    </div>
                                </div>

                                <h4 className="text-2xl md:text-5xl font-black text-zinc-900 italic uppercase tracking-tighter leading-tight md:leading-[0.9]">
                                    {detail.bookName}
                                </h4>

                                <div className="flex flex-wrap items-center gap-3 md:gap-4 text-[9px] md:text-[10px] font-black text-zinc-400 uppercase tracking-widest">
                                    <span className="flex items-center gap-1.5">
                                        <Play className="w-3 h-3 text-purple-500" /> {detail.chapterCount} Episodes
                                    </span>
                                    <span className="flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3 text-purple-500" /> {detail.shelfTime?.slice(0, 4) || '2026'}
                                    </span>
                                </div>
                            </div>

                            {/* BARIS 2: TOMBOL AKSI - Responsive Layout */}
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 md:gap-3 pt-5 border-t border-zinc-50/50">

                                {/* GROUP NAVIGASI: Baris 1 di Mobile, Pojok Kanan di Desktop */}
                                <div className="flex items-center gap-2 w-full md:w-auto order-1 md:order-2">
                                    <Link
                                        href="/drama/china/channel/dramabox"
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3.5 md:px-5 md:py-2.5 bg-zinc-100 text-zinc-700 text-[10px] md:text-[11px] font-black uppercase rounded-xl md:rounded-2xl border border-zinc-200/50 shadow-sm active:scale-95 transition-all shadow-sm"
                                    >
                                        <ArrowLeft className="w-3.5 h-3.5 text-purple-600" />
                                        <span>Daftar Drama</span>
                                    </Link>

                                    <button
                                        onClick={() => setIsVertical(!isVertical)}
                                        className="flex-1 md:flex-none flex items-center justify-center gap-2 px-4 py-3.5 md:px-5 md:py-2.5 bg-zinc-100 text-zinc-700 text-[10px] md:text-[11px] font-black uppercase rounded-xl md:rounded-2xl border border-zinc-200/50 shadow-sm active:scale-95 transition-all shadow-sm"
                                    >
                                        {isVertical ? <Monitor className="w-3.5 h-3.5 text-purple-600" /> : <Smartphone className="w-3.5 h-3.5 text-purple-600" />}
                                        <span>{isVertical ? 'Mode TV' : 'Mode HP'}</span>
                                    </button>
                                </div>

                                {/* TOMBOL SHARE: Baris 2 di Mobile (Center), Pojok Kiri di Desktop */}
                                <div className="w-full md:w-auto flex justify-center md:justify-start p-2.5 md:p-3 bg-zinc-100 rounded-xl md:rounded-2xl border border-zinc-200/50 shadow-sm order-2 md:order-1 active:scale-[0.98] transition-all">
                                    <DramaShareIcons
                                        title={detail.bookName}
                                        url={typeof window !== 'undefined' ? window.location.href : ''}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
                            <div className="md:col-span-2 space-y-3 md:space-y-4">
                                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400 flex items-center gap-2">
                                    <Info className="w-3.5 h-3.5" /> Sinopsis Cerita
                                </h3>
                                <p className="text-zinc-600 leading-relaxed font-medium text-sm md:text-lg italic">
                                    "{detail.introduction}"
                                </p>
                            </div>
                            <div className="space-y-3 md:space-y-4">
                                <h3 className="text-[10px] md:text-xs font-black uppercase tracking-widest text-zinc-400">Genre Terkait</h3>
                                <div className="flex flex-wrap gap-1.5 md:gap-2">
                                    {detail.tags?.map((t: string) => (
                                        <span key={t} className="px-2.5 py-1 md:px-3 md:py-1.5 bg-zinc-50 border border-zinc-100 text-zinc-500 text-[9px] md:text-[10px] font-black uppercase rounded-lg md:rounded-xl hover:text-purple-600 hover:border-purple-200 transition-all cursor-default">
                                            #{t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ========================================== */}
                {/* RIGHT: SCROLLABLE EPISODE LIST */}
                {/* ========================================== */}
                <aside className="bg-zinc-50/50 flex flex-col h-full lg:max-h-[900px]">
                    <div className="p-5 md:p-8 border-b border-zinc-100 bg-zinc-50/80 backdrop-blur-sm sticky top-0 z-10">
                        <h3 className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 flex items-center gap-2">
                            <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" /> Playlist Episode
                        </h3>
                        <p className="text-[9px] md:text-[10px] text-zinc-400 font-bold mt-1">Pilih episode untuk memutar</p>
                    </div>

                    <div className="flex-1 overflow-y-auto p-5 md:p-8 custom-scrollbar">
                        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-2 gap-2 md:gap-3 pb-10">
                            {episodes.map((ep, i) => {
                                const isActive = i === currentIndex
                                const isWatched = (clickCount[i] || 0) >= 2
                                return (
                                    <button
                                        key={ep.chapterId}
                                        onClick={() => {
                                            if (!premium && i >= FREE_LIMIT) {
                                                setShowPremiumModal(true)
                                                return
                                            }

                                            setIsAdGap(false);
                                            setIsPlaying(true);
                                            setCurrentIndex(i);

                                            setTimeout(() => {
                                                videoRef.current?.play();
                                            }, 300);

                                            setClickCount(prev => ({ ...prev, [i]: 2 }));
                                        }}
                                        className={`relative flex flex-col items-center justify-center p-3 md:p-4 rounded-xl md:rounded-2xl border transition-all duration-300 ${isActive
                                            ? 'bg-purple-600 border-purple-600 text-white shadow-xl shadow-purple-500/30 scale-95'
                                            : 'bg-white border-zinc-200/60 text-zinc-400 hover:border-purple-300 hover:text-zinc-600'
                                            }`}
                                    >
                                        <span className="text-[8px] md:text-[9px] font-black uppercase opacity-60 leading-none">EP</span>
                                        <span className="text-lg md:text-2xl font-black italic tracking-tighter leading-none">{i + 1}</span>
                                        {isWatched && !isActive && <div className="absolute top-1 right-1 md:top-2 md:right-2 w-1 h-1 md:w-1.5 md:h-1.5 bg-green-500 rounded-full shadow-md" />}
                                        {ep.chargeChapter && !isActive && <Lock className="absolute top-1 right-1 md:top-2 md:right-2 w-2.5 h-2.5 md:w-3 md:h-3 text-orange-400" />}
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </aside>

            </div>

            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #e4e4e7; border-radius: 10px; }
            `}</style>

            {showPremiumModal && (
                <div className="fixed inset-0 z-[999] bg-zinc-900/40 backdrop-blur-md flex items-center justify-center px-4">
                    <div className="bg-white rounded-[2.5rem] max-w-md w-full overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] animate-in zoom-in-95 duration-300">

                        {/* Dekorasi Atas (Optional Soft Gradient) */}
                        <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />

                        <div className="p-10 text-center">
                            {/* Icon dengan Ring Soft */}
                            <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 border border-slate-100 rounded-3xl flex items-center justify-center text-3xl shadow-sm">
                                <span className="drop-shadow-sm">💎</span>
                            </div>

                            {/* Typography Profesional */}
                            <h2 className="text-2xl font-bold tracking-tight text-zinc-800 mb-2">
                                Konten Eksklusif
                            </h2>
                            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
                                Episode ini dirancang khusus untuk member premium.
                                Dapatkan akses instan dan nikmati tontonan berkualitas tinggi.
                            </p>

                            {/* Detail Paket dalam Kotak Soft */}
                            <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-zinc-500 text-xs font-semibold uppercase tracking-wider">Harga Spesial</span>
                                    <span className="bg-green-100 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full">PROMO</span>
                                </div>
                                <div className="text-left">
                                    <span className="text-2xl font-black text-zinc-900">Rp 2.500</span>
                                    <span className="text-zinc-400 text-sm"> / 24 jam</span>
                                </div>
                                <ul className="mt-3 text-left space-y-2">
                                    <li className="text-[11px] text-zinc-600 flex items-center">
                                        <svg className="w-3 h-3 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20"><path d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" /></svg>
                                        Akses Drama Apa saja sepuasnya di situs ini
                                    </li>
                                </ul>
                            </div>

                            {/* Action Buttons */}
                            <div className="space-y-3">
                                <Link
                                    href="/paket"
                                    className="block w-full bg-zinc-900 hover:bg-zinc-800 text-white py-4 rounded-2xl font-bold text-sm transition-all active:scale-[0.98] shadow-lg shadow-zinc-200"
                                >
                                    Berlangganan Sekarang
                                </Link>

                                <button
                                    onClick={() => setShowPremiumModal(false)}
                                    className="block w-full bg-white hover:bg-zinc-50 text-zinc-400 py-3 rounded-2xl font-medium text-sm transition-all"
                                >
                                    Mungkin nanti
                                </button>
                            </div>

                            {/* Tombol Sudah Punya Akses */}
                            <div className="mt-8 pt-6 border-t border-zinc-100">
                                <p className="text-zinc-500 text-xs">
                                    Sudah punya paket aktif?{' '}
                                    <Link href="/paket/redeem" className="text-purple-600 font-bold hover:underline ml-1">
                                        Klik di sini
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </article>
    )
}