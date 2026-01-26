'use client'

import { useEffect, useState } from 'react'

export default function ScoreAnimated({
  home,
  away,
}: {
  home: number
  away: number
}) {
  const [flash, setFlash] = useState(false)

  useEffect(() => {
    setFlash(true)
    const t = setTimeout(() => setFlash(false), 500)
    return () => clearTimeout(t)
  }, [home, away])

  return (
    <h2 className={`text-7xl md:text-9xl font-extrabold transition ${flash ? 'scale-110 text-green-400' : ''}`}>
      {home}
      <span className="mx-4 text-gray-400">:</span>
      {away}
    </h2>
  )
}