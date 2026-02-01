"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"

export default function AnimeLetterSection({
    letter,
    list,
}: {
    letter: string
    list: any[]
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [visible, setVisible] = useState(false)

    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    obs.disconnect()
                }
            },
            { threshold: 0.15 }
        )

        if (ref.current) obs.observe(ref.current)

        return () => obs.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            id={`section-${letter}`}
            className="scroll-mt-32"
        >
            <h2 className="text-4xl font-black text-orange-500 mb-6">
                {letter}
            </h2>

            {!visible ? (
                <p className="text-zinc-600 italic">Loading {letter}...</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2 gap-x-10">
                    {list.map((anime) => (
                        <Link
                            key={anime.endpoint}
                            href={`/anime/${anime.endpoint}`}
                            className="py-2 border-b border-zinc-800 text-zinc-300 hover:text-white hover:border-orange-500 transition"
                        >
                            {anime.title}
                        </Link>
                    ))}
                </div>
            )}
        </div>
    )
}