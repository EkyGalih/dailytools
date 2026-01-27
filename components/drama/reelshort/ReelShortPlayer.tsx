'use client'

import { useEffect, useRef, useState } from 'react'
import VideoServerPicker from './VideoServerPicker'
import { pickReelShortVideoUrl } from '@/libs/drama/reelshort/reelshort'

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

  /* ganti video kalau episode berubah */
  useEffect(() => {
    setSrc(pickReelShortVideoUrl(episode))
  }, [episode])

  /* AUTO NEXT */
  useEffect(() => {
    const video = videoRef.current
    if (!video || !nextUrl) return

    const onEnded = () => {
      // redirect ke episode selanjutnya
      window.location.href = nextUrl
    }

    video.addEventListener('ended', onEnded)
    return () => video.removeEventListener('ended', onEnded)
  }, [nextUrl])

  if (!src) {
    return (
      <div className="aspect-[9/16] bg-black text-white flex items-center justify-center">
        Video tidak tersedia
      </div>
    )
  }

  return (
    <div className="space-y-2">
      {/* VIDEO */}
      <div className="relative aspect-[9/16] rounded-2xl overflow-hidden bg-black">
        <video
          ref={videoRef}
          src={src}
          controls
          autoPlay
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
        />
      </div>

      {/* SERVER PICKER */}
      <div className="flex justify-end">
        <VideoServerPicker
          sources={episode.videoList}
          onChange={setSrc}
        />
      </div>
    </div>
  )
}