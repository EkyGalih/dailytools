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
    const [activeStream, setActiveStream] = useState<string>('')
    const [selectedResolution, setSelectedResolution] = useState<string>("")
    const [selectedMirror, setSelectedMirror] = useState<string | null>(null)

    useEffect(() => {
        if (!slug) return
        const fetchVideo = async () => {
            setLoading(true)
            const res = await getAnimeEpisodeDetail(slug)
            if (res?.data) {
                setData(res.data)
                setActiveStream(res.data.streaming_iframe)
            }
            setLoading(false)
        }
        fetchVideo()
        document.body.style.overflow = 'hidden'
        return () => { document.body.style.overflow = 'unset' }
    }, [slug])

    if (!slug) return null

    return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-md p-2 md:p-6 animate-in fade-in duration-300">

            <div className="relative w-full max-w-6xl max-h-full flex flex-col">

                {/* CLOSE BUTTON - Dibuat lebih mencolok di mobile */}
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 md:-top-12 md:-right-4 w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shadow-2xl z-[100001] active:scale-90 transition-transform"
                >
                    ✕
                </button>

                {/* MAIN CONTENT BOX */}
                <div className="flex flex-col md:flex-row bg-[#0c0c0e] rounded-2xl md:rounded-3xl overflow-hidden border border-white/5 shadow-2xl max-h-[85vh] md:max-h-[90vh]">

                    {/* LEFT SIDE: VIDEO & MIRRORS */}
                    <div className="flex flex-col w-full md:flex-grow bg-black overflow-hidden">
                        {/* PLAYER: Locked Aspect Ratio */}
                        <div className="relative aspect-video w-full bg-zinc-900 shrink-0">
                            {loading ? (
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                    <div className="w-10 h-10 border-4 border-orange-600 border-t-transparent rounded-full animate-spin" />
                                </div>
                            ) : activeStream ? (
                                <iframe
                                    src={activeStream}
                                    className="w-full h-full"
                                    allowFullScreen
                                    scrolling="no"
                                />
                            ):(
                                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                                    <p className="text-white text-center">Tidak ada stream tersedia</p>
                                </div>
                            )}
                        </div>

                        {/* SERVER + RESOLUTION (3 COLUMN UI) */}
                        <div className="p-4 bg-zinc-950/80 border-b border-white/5 shrink-0">
                            <p className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-3">
                                Server / Resolusi
                            </p>

                            {data?.mirrors?.length > 0 ? (
                                (() => {
                                    /* ===============================
                                       ✅ GROUP MIRRORS BY RESOLUTION
                                    =============================== */
                                    const grouped: Record<string, any[]> = {}

                                    data.mirrors.forEach((m: any) => {
                                        const res = m.resolution || "Other"
                                        if (!grouped[res]) grouped[res] = []
                                        grouped[res].push(m)
                                    })

                                    // ✅ Sort resolution numeric
                                    const resolutions = Object.keys(grouped).sort(
                                        (a, b) => parseInt(a) - parseInt(b)
                                    )

                                    return (
                                        <div className="grid grid-cols-3 gap-2 items-center">

                                            {/* ===============================
              ✅ COLUMN 1: UTAMA BUTTON
          =============================== */}
                                            <button
                                                onClick={() => {
                                                    setActiveStream(data.streaming_iframe)
                                                    setSelectedResolution("")
                                                    setSelectedMirror(null)
                                                }}
                                                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all
              ${activeStream === data.streaming_iframe
                                                        ? "bg-orange-600 text-white shadow-lg shadow-orange-600/20"
                                                        : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700"
                                                    }`}
                                            >
                                                Utama
                                            </button>

                                            {/* ===============================
                                                ✅ COLUMN 2: RESOLUTION DROPDOWN
                                            =============================== */}
                                            <select
                                                className="px-3 py-2 rounded-xl bg-zinc-800 text-white text-[10px] font-bold uppercase"
                                                value={selectedResolution}
                                                onChange={(e) => {
                                                    setSelectedResolution(e.target.value)
                                                    setSelectedMirror(null)
                                                }}
                                            >
                                                <option value="">Resolusi</option>

                                                {resolutions.map((res) => (
                                                    <option key={res} value={res}>
                                                        {res}
                                                    </option>
                                                ))}
                                            </select>

                                            {/* ===============================
                                                ✅ COLUMN 3: SERVER DROPDOWN
                                            =============================== */}
                                            <select
                                                className="px-3 py-2 rounded-xl bg-zinc-900 text-white text-[10px] font-bold uppercase"
                                                value={selectedMirror ?? ""}
                                                disabled={!selectedResolution}
                                                onChange={(e) => {
                                                    const mirrorData = e.target.value
                                                    if (!mirrorData) return

                                                    const mirrorUrl = `https://desustream.info/dstream/ondesu3/v5/index.php?data=${mirrorData}`

                                                    setSelectedMirror(mirrorData)
                                                    setActiveStream(mirrorUrl)
                                                }}
                                            >
                                                <option value="">
                                                    {selectedResolution ? "Server" : "Pilih Resolusi"}
                                                </option>

                                                {selectedResolution &&
                                                    grouped[selectedResolution]?.map((m: any, i: number) => (
                                                        <option key={i} value={m.data}>
                                                            {m.provider}
                                                        </option>
                                                    ))}
                                            </select>
                                        </div>
                                    )
                                })()
                            ) : (
                                <p className="text-xs text-zinc-500 italic">
                                    Mirror tidak tersedia.
                                </p>
                            )}
                        </div>

                        {/* MOBILE ONLY: DOWNLOAD LIST (Hanya muncul di mobile di bawah video) */}
                        <div className="flex md:hidden flex-col overflow-y-auto p-4 bg-zinc-900/30">
                            <DownloadSection data={data} />
                        </div>
                    </div>

                    {/* RIGHT SIDE: DOWNLOAD LIST (Desktop Only) */}
                    <div className="hidden md:flex w-80 bg-[#0c0c0e] border-l border-white/5 flex-col overflow-hidden">
                        <div className="p-5 border-b border-white/5 shrink-0">
                            <h3 className="text-sm font-black text-white uppercase tracking-tight">Download Link</h3>
                        </div>
                        <div className="flex-grow overflow-y-auto p-5 space-y-6 custom-scrollbar">
                            <DownloadSection data={data} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

// Sub-komponen agar kode bersih dan bisa dipakai di dua tempat (mobile & desktop)
function DownloadSection({ data }: { data: any }) {
    if (!data?.downloads) return null;

    return (
        <div className="space-y-6">
            {data.downloads.map((dl: any, idx: number) => (
                <div key={idx} className="space-y-3">
                    <div className="flex items-center justify-between border-b border-white/5 pb-2">
                        <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{dl.quality}</span>
                        <span className="text-[9px] font-bold text-zinc-500 uppercase">{dl.size}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                        {dl.links.map((link: any, lIdx: number) => (
                            <a
                                key={lIdx}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="px-2 py-2.5 bg-zinc-800/50 hover:bg-orange-600 border border-white/5 rounded-xl text-[10px] font-bold text-center text-zinc-400 hover:text-white transition-all truncate"
                            >
                                {link.provider}
                            </a>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    )
}