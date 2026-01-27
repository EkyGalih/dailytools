'use client'

import { useState } from 'react'

type VideoSource = {
    url: string
    encode: string
    quality: number
}

export default function VideoServerPicker({
    sources,
    onChange,
}: {
    sources: VideoSource[]
    onChange: (url: string) => void
}) {
    const [open, setOpen] = useState(false)

    if (!sources || sources.length === 0) return null

    return (
        <div className="relative">
            <button
                onClick={() => setOpen(!open)}
                className="rounded-full border px-3 py-1 text-xs bg-white/80 backdrop-blur hover:bg-white"
            >
                ⚙️ Server
            </button>

            {open && (
                <div className="absolute right-0 mt-2 w-44 rounded-xl bg-white shadow-lg border overflow-hidden z-50">
                    {sources.map((v, i) => (
                        <button
                            key={i}
                            onClick={() => {
                                onChange(v.url)
                                setOpen(false)
                            }}
                            className="block w-full px-3 py-2 text-left text-sm hover:bg-gray-50"
                        >
                            {v.encode} • {v.quality ? `${v.quality}p` : 'Auto'}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}