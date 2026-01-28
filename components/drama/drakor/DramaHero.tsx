import Image from "next/image"
import DramaShareIcons from "@/components/drama/dramabox/DramaShareIcon"

export default function DramaHero() {
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    return (
        <header className="rounded-5xl bg-gradient-to-br from-rose-950 via-zinc-900 to-black p-8 md:p-10">
            <div className="max-w-6xl mx-auto">

                {/* SEO H1 */}
                <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold tracking-tight">
                    {/* ICON */}
                    <span className="relative h-8 w-8 md:h-9 md:w-9 flex-shrink-0">
                        <Image
                            src="https://static.thenounproject.com/png/6339599-200.png"
                            alt="Movie Icon"
                            aria-hidden
                            fill
                            className="object-contain bg-white bg-opacity-10 rounded-full text-indigo-950"
                            priority
                        />
                    </span>

                    {/* TITLE */}
                    <span>Drama Film & Movie Terbaru</span>
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-3 text-white/80 leading-relaxed max-w-3xl">
                    Koleksi drama film terbaru dan terpopuler dari Korea, Thailand,
                    Jepang, China, dan Asia lainnya. Update rutin, kualitas HD,
                    dan pilihan terbaik hari ini.
                </p>

                {/* META INFO */}
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/70">
                    <span className="rounded-full bg-white/10 px-4 py-1">
                        🎬 Movie
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-1">
                        🌏 Asia
                    </span>
                    <span className="rounded-full bg-white/10 px-4 py-1">
                        🔥 Update Harian
                    </span>
                </div>

                {/* SHARE */}
                <div className="mt-6 flex justify-end">
                    <DramaShareIcons
                        title="Drama Film & Movie Terbaru"
                        url={`${site}/drama/filem`}
                        tags={["DramaFilm", "MovieAsia", "FilmViral"]}
                    />
                </div>
            </div>
        </header>
    )
}