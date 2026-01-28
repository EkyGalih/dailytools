import { getCountryFlag } from "@/libs/drama/drakor/country"
import Image from "next/image"
import Link from "next/link"

export default function DramaListCard({
    drama,
}: {
    drama: any
}) {
    return (
        <Link href={`/drama/filem/${drama.id}`}>
            <div className="flex gap-4 bg-zinc-900 rounded-lg overflow-hidden p-3 hover:bg-zinc-800 transition">

                {/* THUMB */}
                <img
                    src={drama.image}
                    alt={drama.title}
                    className="w-[90px] h-[130px] object-cover rounded-md flex-shrink-0"
                />

                {/* CONTENT */}
                <div className="flex flex-col justify-between flex-1">
                    <div className="space-y-1">
                        <h3 className="text-sm font-semibold line-clamp-2">
                            {drama.title}
                        </h3>

                        {/* META */}
                        <div className="text-[11px] text-zinc-400 flex flex-wrap gap-x-2">
                            {drama.country && (
                                <span className="inline-flex items-center gap-1">
                                    {getCountryFlag(drama.country) ? (
                                        <Image
                                            src={getCountryFlag(drama.country)!}
                                            alt={drama.country}
                                            width={16}
                                            height={12}
                                            className="rounded-sm"
                                        />
                                    ) : (
                                        <span>🌏</span>
                                    )}
                                    <span>{drama.country}</span>
                                </span>
                            )}
                            {drama.releaseYear && <span>• {drama.releaseYear}</span>}
                        </div>

                        {/* STATUS */}
                        {drama.status && (
                            <span
                                className={`inline-block text-[10px] px-2 py-[2px] rounded mt-1
                ${drama.status.toLowerCase().includes("ongoing")
                                        ? "bg-rose-500/20 text-rose-400"
                                        : "bg-emerald-500/20 text-emerald-400"
                                    }`}
                            >
                                {drama.status}
                            </span>
                        )}
                    </div>

                    {/* TAGS */}
                    {drama.genres?.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                            {drama.genres.slice(0, 4).map((g: string) => (
                                <span
                                    key={g}
                                    className="text-[10px] px-2 py-[2px] rounded bg-zinc-800 text-zinc-300"
                                >
                                    {g}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Link>
    )
}