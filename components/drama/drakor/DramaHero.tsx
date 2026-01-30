import DramaShareIcons from "@/components/drama/dramabox/DramaShareIcon"
import { Sparkles, Clapperboard, Film } from "lucide-react"

export default function DramaHero() {
    const site = process.env.NEXT_PUBLIC_SITE_URL!

    return (
        <header className="relative overflow-hidden rounded-[3rem] bg-white p-8 md:p-16 border border-zinc-100 shadow-[0_20px_50px_rgba(0,0,0,0.02)]">

            {/* Mesh Gradient background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[70%] h-[70%] bg-indigo-400 blur-[100px] rounded-full transform-gpu" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-pink-400 blur-[100px] rounded-full transform-gpu" />
                <div className="absolute top-[20%] right-[20%] w-[40%] h-[40%] bg-purple-300 blur-[80px] rounded-full transform-gpu" />
            </div>

            <div className="relative z-10 max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 lg:gap-20">
                <div className="flex-[1.2] space-y-8 text-center md:text-left">

                    {/* Badge Station */}
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-pink-50 border border-pink-100 text-pink-600 text-[10px] font-black uppercase tracking-[0.2em] shadow-sm">
                        <Sparkles size={12} className="animate-pulse" /> Stasiun Drama Korea
                    </div>

                    {/* Main Title */}
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-7xl font-black text-zinc-900 italic tracking-tight md:tracking-normal leading-[1.1] md:leading-[1.05] uppercase">
                            K-Drama <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">
                                Sub Indo
                            </span>
                        </h1>
                    </div>

                    {/* Description */}
                    <p className="text-zinc-500 text-base md:text-xl font-medium leading-relaxed max-w-2xl italic border-l-4 border-pink-200 pl-6">
                        Streaming koleksi Drama Korea terpopuler dengan kualitas
                        <span className="text-zinc-900 font-bold"> Ultra HD</span>.
                        Nikmati update harian dengan subtitle Indonesia yang akurat.
                    </p>

                    {/* Interactive Tags */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        {['Ongoing', 'Completed', 'Movies', 'Trending'].map((tag) => (
                            <button key={tag} className="px-6 py-2.5 rounded-2xl bg-zinc-50 border border-zinc-100 text-zinc-600 text-[11px] font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white hover:border-pink-500 hover:shadow-lg hover:shadow-pink-200 transition-all duration-300 active:scale-95">
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Illustration Side */}
                <div className="hidden lg:flex flex-col items-center gap-8 relative group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 blur-3xl opacity-10 rounded-full group-hover:opacity-20 transition-opacity duration-700" />

                        {/* Container Ikon Movie */}
                        <div className="relative z-10 p-12 bg-white/40 backdrop-blur-sm rounded-[3rem] border border-white shadow-2xl transition-transform duration-700 group-hover:scale-105 group-hover:rotate-2 flex items-center justify-center w-[280px] h-[280px]">
                            <Clapperboard
                                size={140}
                                strokeWidth={1}
                                className="text-pink-500 drop-shadow-[0_10px_20px_rgba(236,72,153,0.3)]"
                            />
                            <div className="absolute top-8 right-8">
                                <Film size={36} className="text-indigo-400 opacity-50 rotate-12" />
                            </div>
                        </div>
                    </div>

                    {/* Share Icons Positioned Relative to Illustration */}
                    <div className="relative z-20 translate-y-2">
                        <div className="p-2 bg-white/60 backdrop-blur-xl rounded-2xl shadow-xl shadow-zinc-200/50 border border-white">
                            <DramaShareIcons
                                title="Nonton Drama Korea Subtitle Indonesia"
                                url={`${site}/drama/korea`}
                                tags={["DramaKorea", "KDramaSubIndo", "MyTools"]}
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile Share Only */}
            <div className="mt-12 lg:hidden flex justify-center">
                <DramaShareIcons
                    title="Nonton Drama Korea Subtitle Indonesia"
                    url={`${site}/drama/korea`}
                    tags={["DramaKorea", "KDramaSubIndo", "MyTools"]}
                />
            </div>
        </header>
    )
}