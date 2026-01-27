'use client'

import { useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { saveProgress } from '@/utils/dramabox/watchProcess'

export default function VideoPlayer({
    src,
    nextUrl,
    bookId,
    episode,
}: {
    src: string
    nextUrl?: string
    bookId: string
    episode: number
}) {
    const ref = useRef<HTMLVideoElement>(null)
    const router = useRouter()

    useEffect(() => {
        const video = ref.current
        if (!video) return

        // AUTO PLAY NEXT
        const onEnded = () => {
            if (nextUrl) router.push(nextUrl)
        }

        // SAVE PROGRESS
        const onTime = () => {
            saveProgress(bookId, episode, video.currentTime)
        }

        video.addEventListener('ended', onEnded)
        video.addEventListener('timeupdate', onTime)

        return () => {
            video.removeEventListener('ended', onEnded)
            video.removeEventListener('timeupdate', onTime)
        }
    }, [nextUrl, router, bookId, episode])

    return (
        <video
            ref={ref}
            src={src}
            controls
            autoPlay
            playsInline
            className="w-full h-full"
        />
    )
}