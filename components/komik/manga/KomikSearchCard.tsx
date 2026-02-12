"use client"

import Image from "next/image"
import Link from "next/link"

interface Props {
    manga: {
        title: string
        endpoint: string
        thumbnail: string
        type: string
        genre: string
        updated: string
        first_chapter: string
        latest_chapter: string
    }
}

export default function KomikSearchCard({ manga }: Props) {
    return (
        <Link
            href={`/komik/${manga.endpoint}`}
            className="group relative bg-zinc-900 rounded-2xl overflow-hidden border border-zinc-800 hover:border-orange-500 transition-all duration-300 shadow-lg hover:shadow-orange-500/20"
        >
            {/* Thumbnail */}
            <div className="relative w-full h-48 overflow-hidden">
                <Image
                    src={manga.thumbnail}
                    alt={manga.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>

            {/* Content */}
            <div className="p-4 space-y-2">
                <h3 className="text-sm font-bold line-clamp-2 group-hover:text-orange-500 transition-colors">
                    {manga.title}
                </h3>

                <div className="flex flex-wrap gap-2 text-[10px] uppercase font-semibold tracking-wide">
                    <span className="px-2 py-1 bg-zinc-800 rounded-md text-zinc-400">
                        {manga.type}
                    </span>
                    <span className="px-2 py-1 bg-orange-500/10 text-orange-400 rounded-md">
                        {manga.genre}
                    </span>
                </div>

                <div className="text-[11px] text-zinc-500 pt-2 border-t border-zinc-800">
                    <p>{manga.latest_chapter}</p>
                    <p>{manga.updated}</p>
                </div>
            </div>
        </Link>
    )
}