'use client'

import { formatBytes, sizeFromBitrate } from '@/libs/kreator/video'
import { useMemo, useState } from 'react'

export default function VideoSizeEstimator() {
  const [minutes, setMinutes] = useState(1)
  const [seconds, setSeconds] = useState(0)
  const [bitrateMbps, setBitrateMbps] = useState(6) // video bitrate

  const durationSec = useMemo(() => Math.max(0, minutes * 60 + seconds), [minutes, seconds])

  const size = useMemo(() => {
    // bitrateMbps = megabit per sec
    // size bytes = (bitrate (bit/s) * duration)/8
    return sizeFromBitrate(bitrateMbps, durationSec)
  }, [bitrateMbps, durationSec])

  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium">Durasi (menit)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={minutes}
            min={0}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Durasi (detik)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={seconds}
            min={0}
            max={59}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bitrate (Mbps)</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            value={bitrateMbps}
            min={0.5}
            step={0.5}
            onChange={(e) => setBitrateMbps(Number(e.target.value))}
          />
          <p className="text-xs text-gray-500 mt-1">
            Contoh: 4–8 Mbps (1080p ringan).
          </p>
        </div>
      </div>

      <div className="bg-gray-50 border rounded-xl p-4">
        <p className="text-sm text-gray-700">
          Estimasi ukuran file: <strong>{formatBytes(size)}</strong>
        </p>
        <p className="text-xs text-gray-500 mt-1">
          Ini estimasi kasar (belum termasuk audio, codec, dan variable bitrate).
        </p>
      </div>
    </div>
  )
}