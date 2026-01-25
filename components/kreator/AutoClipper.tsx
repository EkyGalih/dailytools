'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import JSZip from 'jszip'

type ClipItem = {
    name: string
    blob: Blob
    url: string
    startSec: number
    endSec: number
    sizeBytes: number
}

type Mode = 'fast-copy' | 'compatible-encode'

function pad2(n: number) {
    return String(n).padStart(2, '0')
}

function secToHHMMSS(sec: number) {
    const s = Math.max(0, Math.floor(sec))
    const hh = Math.floor(s / 3600)
    const mm = Math.floor((s % 3600) / 60)
    const ss = s % 60
    return hh > 0 ? `${pad2(hh)}:${pad2(mm)}:${pad2(ss)}` : `${pad2(mm)}:${pad2(ss)}`
}

function formatBytes(bytes: number) {
    if (!Number.isFinite(bytes)) return '0 B'
    const units = ['B', 'KB', 'MB', 'GB']
    let v = bytes
    let i = 0
    while (v >= 1024 && i < units.length - 1) {
        v /= 1024
        i++
    }
    return `${v.toFixed(i === 0 ? 0 : 1)} ${units[i]}`
}

async function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = filename
    document.body.appendChild(a)
    a.click()
    a.remove()
    URL.revokeObjectURL(url)
}

export default function AutoClipper() {
    const [file, setFile] = useState<File | null>(null)
    const [videoDuration, setVideoDuration] = useState<number>(0)

    const [clipLength, setClipLength] = useState<number>(30) // seconds
    const [overlap, setOverlap] = useState<number>(0) // seconds
    const [maxClips, setMaxClips] = useState<number>(50)
    const [mode, setMode] = useState<Mode>('fast-copy')

    const [loadingFfmpeg, setLoadingFfmpeg] = useState(false)
    const [processing, setProcessing] = useState(false)
    const [progress, setProgress] = useState(0)

    const [clips, setClips] = useState<ClipItem[]>([])
    const [error, setError] = useState<string>('')

    const videoRef = useRef<HTMLVideoElement | null>(null)

    // Cleanup URLs
    useEffect(() => {
        return () => {
            clips.forEach((c) => URL.revokeObjectURL(c.url))
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const estimatedCount = useMemo(() => {
        if (!videoDuration || clipLength <= 0) return 0
        const step = Math.max(1, clipLength - overlap)
        const count = Math.ceil(videoDuration / step)
        return Math.min(maxClips, count)
    }, [videoDuration, clipLength, overlap, maxClips])

    const onPickFile = (f: File | null) => {
        setError('')
        setClips((prev) => {
            prev.forEach((c) => URL.revokeObjectURL(c.url))
            return []
        })
        setProgress(0)
        setFile(f)
        setVideoDuration(0)

        if (!f) return

        // Load duration using <video> metadata
        const tempUrl = URL.createObjectURL(f)
        const v = document.createElement('video')
        v.preload = 'metadata'
        v.src = tempUrl
        v.onloadedmetadata = () => {
            const d = Number(v.duration) || 0
            setVideoDuration(d)
            URL.revokeObjectURL(tempUrl)
        }
        v.onerror = () => {
            setError('Gagal membaca durasi video. Coba file lain.')
            URL.revokeObjectURL(tempUrl)
        }
    }

    const ensureValidSettings = () => {
        if (!file) return 'Pilih video dulu.'
        if (clipLength < 3) return 'Durasi klip minimal 3 detik.'
        if (overlap < 0) return 'Overlap tidak boleh minus.'
        if (overlap >= clipLength) return 'Overlap harus lebih kecil dari durasi klip.'
        if (maxClips < 1) return 'Max clips minimal 1.'
        return ''
    }

    const splitVideo = async () => {
        const msg = ensureValidSettings()
        if (msg) {
            setError(msg)
            return
        }
        if (!file) return

        setError('')
        setProcessing(true)
        setProgress(0)

        // Cleanup old
        setClips((prev) => {
            prev.forEach((c) => URL.revokeObjectURL(c.url))
            return []
        })

        try {
            setLoadingFfmpeg(true)

            // Dynamic import (biar gak SSR error)
            const { FFmpeg } = await import('@ffmpeg/ffmpeg')
            const { fetchFile } = await import('@ffmpeg/util')

            const ffmpeg = new FFmpeg()

            ffmpeg.on('progress', ({ progress }) => {
                // progress per command; karena multi-clip, kita pakai progress global manual
            })

            // Load core
            await ffmpeg.load()
            setLoadingFfmpeg(false)

            const inputName = `input_${Date.now()}.${file.name.split('.').pop() || 'mp4'}`
            await ffmpeg.writeFile(inputName, await fetchFile(file))

            const duration = videoDuration || 0
            const step = Math.max(1, clipLength - overlap)

            const totalClips = Math.min(
                maxClips,
                Math.max(1, Math.ceil(duration / step))
            )

            const outClips: ClipItem[] = []

            for (let i = 0; i < totalClips; i++) {
                const start = i * step
                if (duration && start >= duration) break

                const end = Math.min(duration || start + clipLength, start + clipLength)
                const t = Math.max(1, end - start)

                const outName = `clip_${pad2(i + 1)}_${secToHHMMSS(start).replace(/:/g, '-')}.mp4`

                // Command:
                // - fast-copy: super cepat, minim CPU, tapi bisa kurang kompatibel pada beberapa file
                // - compatible-encode: lebih stabil untuk semua player, tapi lebih lama
                if (mode === 'fast-copy') {
                    await ffmpeg.exec([
                        '-ss',
                        String(start),
                        '-t',
                        String(t),
                        '-i',
                        inputName,
                        '-c',
                        'copy',
                        '-movflags',
                        'faststart',
                        outName,
                    ])
                } else {
                    await ffmpeg.exec([
                        '-ss',
                        String(start),
                        '-t',
                        String(t),
                        '-i',
                        inputName,
                        '-c:v',
                        'libx264',
                        '-preset',
                        'veryfast',
                        '-crf',
                        '23',
                        '-c:a',
                        'aac',
                        '-b:a',
                        '128k',
                        '-movflags',
                        'faststart',
                        outName,
                    ])
                }

                const data = await ffmpeg.readFile(outName)

                // 1. Normalisasi data menjadi Uint8Array mentah
                let rawUint8: Uint8Array
                if (typeof data === 'string') {
                    rawUint8 = new TextEncoder().encode(data)
                } else {
                    rawUint8 = data
                }

                // 2. FIX: Buat SALINAN ke Uint8Array standar baru.
                // Ini memaksa penggunaan ArrayBuffer standar, bukan SharedArrayBuffer.
                // Konstruktor `new Uint8Array(typedArray)` melakukan penyalinan ini.
                const standardUint8 = new Uint8Array(rawUint8);

                // 3. Sekarang standardUint8 aman untuk dimasukkan ke Blob
                const blob = new Blob([standardUint8], { type: 'video/mp4' })
                const url = URL.createObjectURL(blob)

                outClips.push({
                    name: outName,
                    blob,
                    url,
                    startSec: start,
                    endSec: start + t,
                    sizeBytes: blob.size,
                })

                // Update global progress
                setProgress(Math.round(((i + 1) / totalClips) * 100))
            }

            // Optional cleanup
            // (ffmpeg FS dibuang saat instance hilang, tapi boleh bersih2)
            setClips(outClips)
        } catch (e: any) {
            console.error(e)
            setError(
                'Gagal memproses video. Coba mode "Kompatibel" atau gunakan file MP4 standar.'
            )
        } finally {
            setProcessing(false)
            setLoadingFfmpeg(false)
        }
    }

    const downloadAllZip = async () => {
        if (clips.length === 0) return

        try {
            const zip = new JSZip()
            clips.forEach((c) => {
                zip.file(c.name, c.blob)
            })
            const blob = await zip.generateAsync({ type: 'blob' })
            await downloadBlob(blob, `mytools_clips_${Date.now()}.zip`)
        } catch (e) {
            console.error(e)
            setError('Gagal membuat ZIP. Coba download satu-satu.')
        }
    }

    return (
        <div className="space-y-6">
            {/* INPUT FILE */}
            <div className="grid gap-4">
                <div>
                    <label className="block text-sm font-medium">Upload video panjang</label>
                    <input
                        type="file"
                        accept="video/*"
                        className="w-full border rounded p-2"
                        onChange={(e) => onPickFile(e.target.files?.[0] || null)}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Diproses di browser. Tidak upload ke server.
                    </p>
                </div>

                {file && (
                    <div className="border rounded-xl p-4 bg-gray-50 space-y-2">
                        <p className="text-sm text-gray-700">
                            File: <strong>{file.name}</strong>
                        </p>
                        <p className="text-sm text-gray-700">
                            Durasi: <strong>{videoDuration ? secToHHMMSS(videoDuration) : '—'}</strong>
                        </p>
                        <p className="text-xs text-gray-500">
                            Estimasi klip: <strong>{estimatedCount}</strong> (berdasarkan durasi klip & overlap)
                        </p>
                    </div>
                )}
            </div>

            {/* SETTINGS */}
            <div className="grid md:grid-cols-4 gap-4">
                <div>
                    <label className="block text-sm font-medium">Durasi klip (detik)</label>
                    <input
                        type="number"
                        min={3}
                        className="w-full border rounded p-2"
                        value={clipLength}
                        onChange={(e) => setClipLength(Number(e.target.value))}
                    />
                    <p className="text-xs text-gray-500 mt-1">Contoh: 15–60 detik.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium">Overlap (detik)</label>
                    <input
                        type="number"
                        min={0}
                        className="w-full border rounded p-2"
                        value={overlap}
                        onChange={(e) => setOverlap(Number(e.target.value))}
                    />
                    <p className="text-xs text-gray-500 mt-1">Biar tidak kepotong “nyambung”.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium">Max klip</label>
                    <input
                        type="number"
                        min={1}
                        className="w-full border rounded p-2"
                        value={maxClips}
                        onChange={(e) => setMaxClips(Number(e.target.value))}
                    />
                    <p className="text-xs text-gray-500 mt-1">Batasi biar tidak terlalu banyak.</p>
                </div>

                <div>
                    <label className="block text-sm font-medium">Mode</label>
                    <select
                        className="w-full border rounded p-2"
                        value={mode}
                        onChange={(e) => setMode(e.target.value as Mode)}
                    >
                        <option value="fast-copy">Cepat (copy)</option>
                        <option value="compatible-encode">Kompatibel (encode)</option>
                    </select>
                    <p className="text-xs text-gray-500 mt-1">
                        Encode lebih stabil, tapi lebih lama.
                    </p>
                </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row gap-3">
                <button
                    onClick={splitVideo}
                    disabled={processing || loadingFfmpeg}
                    className={`px-4 py-2 rounded bg-black text-white transition ${processing || loadingFfmpeg ? 'opacity-70 cursor-wait' : 'hover:bg-gray-900 cursor-pointer'
                        }`}
                >
                    {loadingFfmpeg ? 'Memuat engine…' : processing ? 'Memotong…' : 'Auto Potong Jadi Banyak Klip'}
                </button>
            </div>

            {/* PROGRESS */}
            {(processing || loadingFfmpeg) && (
                <div className="border rounded-xl p-4 bg-gray-50 space-y-2">
                    <p className="text-sm text-gray-700">
                        Progress: <strong>{progress}%</strong>
                    </p>
                    <div className="w-full h-2 bg-gray-200 rounded">
                        <div
                            className="h-2 bg-black rounded"
                            style={{ width: `${progress}%` }}
                        />
                    </div>
                    <p className="text-xs text-gray-500">
                        Video processing cukup berat. Kalau device lemah, pakai durasi klip lebih besar atau turunkan max klip.
                    </p>
                </div>
            )}

            {/* ERROR */}
            {error && (
                <div className="border rounded-xl p-4 bg-red-50 text-sm text-red-700">
                    {error}
                </div>
            )}

            {/* OUTPUT */}
            {clips.length > 0 && (
                <div className="space-y-4">
                    <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold">
                            Hasil Klip ({clips.length})
                        </h3>

                        <button
                            onClick={downloadAllZip}
                            className="text-sm underline"
                        >
                            Download Semua (ZIP)
                        </button>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {clips.map((c, idx) => (
                            <div
                                key={c.name}
                                className="border rounded-xl bg-white overflow-hidden"
                            >
                                {/* VIDEO PREVIEW */}
                                <video
                                    src={c.url}
                                    controls
                                    preload="metadata"
                                    className="w-full aspect-video bg-black"
                                />

                                {/* INFO */}
                                <div className="p-3 space-y-1">
                                    <p className="text-xs font-medium text-gray-800">
                                        {secToHHMMSS(c.startSec)} – {secToHHMMSS(c.endSec)}
                                    </p>

                                    <p className="text-[11px] text-gray-500">
                                        {formatBytes(c.sizeBytes)}
                                    </p>

                                    <button
                                        onClick={() => downloadBlob(c.blob, c.name)}
                                        className="mt-2 w-full text-xs border rounded py-1 hover:bg-gray-50"
                                    >
                                        Download
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    <p className="text-xs text-gray-500">
                        Tips: untuk hasil paling kompatibel di semua device, pilih mode <strong>Kompatibel (encode)</strong>.
                    </p>
                </div>
            )}
        </div>
    )
}