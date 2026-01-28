import Image from "next/image"
import DramaShareIcons from "@/components/drama/dramabox/DramaShareIcon"

export default function DramaHero() {
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    return (
        <header className="rounded-5xl bg-gradient-to-br from-purple-950 via-zinc-900 to-black p-8 md:p-10">
            <div className="max-w-6xl mx-auto">
                {/* SEO H1 */}
                <h1 className="flex items-center gap-3 text-3xl md:text-4xl font-extrabold tracking-tight">
                    {/* ICON */}
                    <span className="relative h-9 w-9 md:h-10 md:w-10 flex-shrink-0">
                        <Image
                            src="https://cdn-icons-png.flaticon.com/512/197/197582.png"
                            alt="Korean Drama Icon"
                            aria-hidden
                            fill
                            className="object-contain rounded-full bg-white/10 p-1"
                            priority
                        />
                    </span>

                    {/* TITLE */}
                    <span>Nonton Drama Korea Subtitle Indonesia</span>
                </h1>

                {/* DESCRIPTION */}
                <p className="mt-3 text-white/80 leading-relaxed max-w-3xl">
                    Streaming dan download drama Korea terbaru lengkap dengan subtitle Indonesia.
                    Update setiap hari, kualitas HD, rating tinggi, dan episode lengkap dari
                    drama ongoing maupun completed.
                </p>

                {/* META INFO */}
                <div className="mt-5 flex flex-wrap gap-3 text-sm text-white/70">
                    <span className="rounded-full bg-white/10 px-4 py-1">
                        🇰🇷 Korean Drama
                    </span>

                    <span className="rounded-full bg-white/10 px-4 py-1">
                        ⭐ Rating Tinggi
                    </span>

                    <span className="rounded-full bg-white/10 px-4 py-1">
                        🔥 Update Episode Harian
                    </span>

                    <span className="rounded-full bg-white/10 px-4 py-1">
                        🎬 Ongoing & Completed
                    </span>
                </div>

                {/* SHARE */}
                <div className="mt-6 flex justify-end">
                    <DramaShareIcons
                        title="Nonton Drama Korea Subtitle Indonesia"
                        url={`${site}/drama/filem`}
                        tags={[
                            "DramaKorea",
                            "KDramaSubIndo",
                            "StreamingDramaKorea",
                            "DramaOngoing",
                        ]}
                    />
                </div>
            </div>
        </header>
    )
}