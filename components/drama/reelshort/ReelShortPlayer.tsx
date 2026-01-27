'use client'

import { useEffect, useRef, useState } from 'react'
import VideoServerPicker from './VideoServerPicker'
import { pickReelShortVideoUrl } from '@/libs/drama/reelshort/reelshort'

type ViewMode = 'horizontal' | 'vertical'

export default function ReelShortPlayer({
  episode,
  nextUrl,
}: {
  episode: any
  nextUrl?: string
}) {
  const videoRef = useRef<HTMLVideoElement>(null)

  const [src, setSrc] = useState(() =>
    pickReelShortVideoUrl(episode)
  )
  const [mode, setMode] = useState<ViewMode>('vertical') // ✅ default horizontal

  /* ganti video kalau episode berubah */
  useEffect(() => {
    setSrc(pickReelShortVideoUrl(episode))
  }, [episode])

  /* AUTO NEXT */
  useEffect(() => {
    const video = videoRef.current
    if (!video || !nextUrl) return

    const onEnded = () => {
      window.location.href = nextUrl
    }

    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [nextUrl])

  if (!src) {
    return (
      <div className="aspect-video bg-black text-white flex items-center justify-center rounded-xl">
        Video tidak tersedia
      </div>
    )
  }

  return (
    <section>
      {/* PLAYER */}
      <section
        className={`
          mx-auto rounded-2xl overflow-hidden bg-black shadow-lg
          ${mode === 'vertical'
            ? 'max-w-[420px] aspect-[9/16]'
            : 'w-full aspect-video'}
        `}
      >
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </section>

      {/* CONTROLS */}
      <div className="flex items-center justify-between gap-3">
        {/* MODE TOGGLE */}
        <button
          onClick={() =>
            setMode((m) => (m === 'vertical' ? 'horizontal' : 'vertical'))
          }
          className="inline-flex items-center gap-1 rounded-full border px-3 py-1.5 text-xs text-gray-600 hover:bg-gray-50 transition"
        >
          {mode === 'vertical' ? '🖥️ Horizontal' : '📱 Vertical'}
        </button>

        {/* SERVER PICKER */}
        <VideoServerPicker
          sources={episode.videoList}
          onChange={setSrc}
        />
      </div>
    </section>
  )
}