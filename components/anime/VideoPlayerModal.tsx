'use client'

import { useEffect, useState } from 'react'
import { getAnimeEpisodeDetail } from "@/libs/anime/anime"

interface Props {
    slug: string | null;
    onClose: () => void;
}

export default function VideoPlayerModal({ slug, onClose }: Props) {
    const [data, setData] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!slug) return

        const fetchVideo = async () => {
            setLoading(true)
            const res = await getAnimeEpisodeDetail(slug)
            if (res?.data) {
                setData(res.data)
            }
            setLoading(false)
        }

        fetchVideo()

        // Lock Scroll body saat modal buka
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [slug])

    if (!slug) return null

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 animate-in fade-in duration-300">

            {/* CONTAINER MODAL */}
            <div className="relative w-full max-w-5xl bg-zinc-900 rounded-3xl overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] border border-white/5">

                {/* HEADER & CLOSE BUTTON */}
                <div className="absolute top-4 right-4 z-[10001]">
                    <button
                        onClick={onClose}
                        className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center font-bold shadow-xl hover:bg-orange-500 hover:text-white transition-all active:scale-90"
                    >
                        ✕
                    </button>
                </div>

                {/* VIDEO PLAYER AREA */}
                <div className="aspect-video w-full bg-black flex items-center justify-center">
                    {loading ? (
                        <div className="flex flex-col items-center gap-4">
                            <div className="w-12 h-12 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
                            <p className="text-zinc-500 font-black tracking-widest text-xs uppercase">Memuat Stream...</p>
                        </div>
                    ) : (
                        <iframe
                            src={data?.stream_url || data?.mirror_embed?.[0]?.url}
                            className="w-full h-full"
                            allowFullScreen
                            scrolling="no"
                        />
                    )}
                </div>

                {/* INFO BAWAH VIDEO */}
                <div className="p-6 bg-gradient-to-b from-zinc-900 to-black">
                    <h3 className="text-lg font-black text-white line-clamp-1">
                        {data?.title || 'Memuat Judul...'}
                    </h3>
                    <p className="text-xs text-zinc-500 mt-1">
                        Gunakan tombol <span className="text-orange-500 font-bold">Fullscreen</span> pada player untuk pengalaman lebih baik.
                    </p>
                </div>
            </div>

            {/* OVERLAY CLIK BLOCKER (Sengaja tidak ada onClick di sini) */}
            <div className="absolute inset-0 z-[-1] cursor-not-allowed" title="Gunakan tombol X untuk menutup" />
        </div>
    )
}