'use client'

import { useEffect, useState, useRef } from 'react'
import { getAnimeEpisodeDetail } from "@/libs/anime/anime"
import { X, Activity, RotateCw, Smartphone } from 'lucide-react'

export default function VideoPlayerModal({ slug, onClose }: { slug: string | null; onClose: () => void }) {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [activeStream, setActiveStream] = useState<string>('')
    const [selectedResolution, setSelectedResolution] = useState<string>("")

    // 0: Normal, 1: Full Screen Vertical (Rotated 90deg)
    const [rotationMode, setRotationMode] = useState(0)
    const videoRef = useRef<HTMLVideoElement>(null)

    useEffect(() => {
        if (!slug) return
        const fetchVideo = async () => {
            setLoading(true)
            const res = await getAnimeEpisodeDetail(slug)
            if (res?.data?.length > 0) {
                const episode = res.data[0]
                setData(episode)
                if (episode.stream?.length > 0) {
                    const sorted = [...episode.stream].sort((a: any, b: any) => parseInt(b.reso) - parseInt(a.reso))
                    setActiveStream(sorted[0].link)
                    setSelectedResolution(sorted[0].reso)
                }
            }
            setLoading(false)
        }
        fetchVideo()
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [slug])

    if (!slug) return null

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black animate-in fade-in duration-300">
            <div className={`relative w-full h-full flex flex-col transition-all duration-500 ${rotationMode === 1 ? 'p-0' : 'md:max-w-5xl md:h-auto'}`}>

                {/* TOOLBAR ATAS */}
                <div className="absolute top-6 right-6 flex gap-3 z-[100]">
                    {/* Toggle Rotate - Biar nonton full meski HP tegak */}
                    <button
                        onClick={() => setRotationMode(rotationMode === 0 ? 1 : 0)}
                        className="w-12 h-12 rounded-full bg-black/60 backdrop-blur-xl border border-white/10 text-white flex flex-col items-center justify-center active:scale-90 transition-all hover:bg-orange-600"
                    >
                        {rotationMode === 1 ? <Smartphone size={18} /> : <RotateCw size={18} />}
                        <span className="text-[6px] font-black uppercase mt-0.5">Rotate</span>
                    </button>

                    <button
                        onClick={onClose}
                        className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center active:scale-90 shadow-2xl"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className={`flex flex-col bg-[#0c0c0e] shadow-2xl transition-all duration-500 ${rotationMode === 1 ? 'w-full h-full rounded-0' : 'md:rounded-3xl overflow-hidden'}`}>

                    {/* VIDEO CONTAINER */}
                    <div className={`relative flex items-center justify-center bg-black overflow-hidden transition-all duration-500 ${rotationMode === 1
                            ? 'w-full h-full' // Full screen mode
                            : 'aspect-video w-full' // Normal mode
                        }`}>

                        {loading ? (
                            <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
                        ) : activeStream ? (
                            <video
                                ref={videoRef}
                                key={activeStream}
                                src={activeStream}
                                controls
                                autoPlay
                                playsInline
                                className={`transition-all duration-500 ease-in-out ${rotationMode === 1
                                        ? "fixed w-[100vh] h-[100vw] rotate-90 object-contain z-[50]"
                                        : "w-full h-full object-contain"
                                    }`}
                            />
                        ) : (
                            <p className="text-zinc-500 text-xs font-black uppercase">No Stream</p>
                        )}
                    </div>

                    {/* CONTROL RESOLUSI (Hanya muncul jika mode normal) */}
                    {rotationMode === 0 && (
                        <div className="p-6 bg-zinc-950/80 backdrop-blur-md border-t border-white/5">
                            <div className="flex items-center gap-2 mb-4">
                                <Activity size={14} className="text-orange-500" />
                                <p className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.2em]">Select Quality</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {data?.stream?.map((s: any) => (
                                    <button
                                        key={s.id}
                                        onClick={() => {
                                            setSelectedResolution(s.reso);
                                            setActiveStream(s.link);
                                        }}
                                        className={`px-5 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all active:scale-95 ${selectedResolution === s.reso
                                                ? "bg-orange-600 border-orange-500 text-white shadow-lg"
                                                : "bg-zinc-900 border-white/5 text-zinc-500"
                                            }`}
                                    >
                                        {s.reso}p
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}