'use client'

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';

interface AnimeHeroProps {
    badgeText?: string;
    titlePrimary?: string;
    titleSecondary?: string;
    description?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}

export default function AnimeHero({
    badgeText = "STREAMING ANIME ⚡",
    titlePrimary = "NONTON ANIME",
    titleSecondary = "SEPUASNYA",
    description = "Nikmati pengalaman nonton anime kualitas Ultra-HD dengan subtitle Indonesia paling akurat. Tanpa gangguan iklan yang mengesalkan, hanya ada kamu dan cerita favoritmu.",
    ctaText = "Mulai Nonton Sekarang",
    onCtaClick
}: AnimeHeroProps) {
    const pathname = usePathname();
    const router = useRouter();
    const isHomePage = pathname === '/anime';

    const handleDefaultScroll = () => {
        const element = document.getElementById('content');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };
    return (
        <section className="relative min-h-[70vh] md:h-[80vh] w-full flex items-center px-6 lg:px-20 overflow-hidden bg-zinc-950 pt-10">
            {/* Background Glow Effect */}
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-600/10 via-zinc-950 to-zinc-950 z-0"
                aria-hidden="true"
            />

            {/* Dekorasi Grid & Stardust */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 pointer-events-none" />

            <div className="relative z-20 max-w-4xl">
                {/* Badge - Lebih Menonjol */}
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-600/10 border border-orange-600/30 text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-[0.2em] mb-8 animate-fade-in shadow-[0_0_20px_rgba(234,88,12,0.1)]">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    {badgeText}
                </div>

                {/* Main Title - Lebih "Bold" dan Menjual */}
                <h1 className="text-5xl md:text-8xl lg:text-[100px] font-black tracking-tighter mb-8 leading-[0.85] text-white">
                    {titlePrimary} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-400 to-orange-400 animate-gradient-x">
                        {titleSecondary}
                    </span>
                </h1>

                {/* Description - Copywriting yang lebih Persuasif */}
                <p className="max-w-xl text-zinc-400 text-sm md:text-lg mb-10 leading-relaxed font-medium border-l-2 border-orange-600/30 pl-6">
                    {description}
                </p>

                {/* CTA Buttons - Pastikan ini memiliki z-index yang lebih tinggi atau pembungkusnya aman */}
                <div className="relative z-10 flex flex-wrap gap-5">
                    <button
                        onClick={onCtaClick || handleDefaultScroll} // Gunakan props atau default
                        className="group relative px-10 py-4 bg-white text-black font-black rounded-2xl transition-all hover:scale-105 overflow-hidden shadow-[0_20px_40px_rgba(255,255,255,0.05)]"
                    >
                        <span className="relative z-10 flex items-center gap-2">
                            {ctaText}
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="group-hover:translate-x-1 transition-transform">
                                <path d="M208,128a8,8,0,0,1-8,8H72.83l47.58,47.59a8,8,0,0,1-11.32,11.32l-61.26-61.26a8,8,0,0,1,0-11.32l61.26-61.26a8,8,0,0,1,11.32,11.32L72.83,120H200A8,8,0,0,1,208,128Z" transform="rotate(180 128 128)"></path>
                            </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-amber-500 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </button>

                    {/* Tombol Jadwal Rilis (Bisa diarahkan ke page lain atau scroll ke section lain) */}
                    <button
                        onClick={() => isHomePage ? router.push('/anime/jadwal') : router.push('/anime')}
                        className="px-10 py-4 bg-zinc-900/50 backdrop-blur-xl text-white font-bold rounded-2xl border border-white/5 hover:bg-zinc-800 transition-all hover:border-orange-600/50 flex items-center gap-2"
                    >
                        {!isHomePage && (
                            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 256 256"><path d="M224,128a8,8,0,0,1-8,8H72.83l47.58,47.59a8,8,0,0,1-11.32,11.32l-61.26-61.26a8,8,0,0,1,0-11.32l61.26-61.26a8,8,0,0,1,11.32,11.32L72.83,120H200A8,8,0,0,1,208,128Z"></path></svg>
                        )}
                        {isHomePage ? "Jadwal Rilis" : "Kembali Ke Daftar"}
                    </button>

                    <Link
                        href="/anime/daftar-anime"
                        className="group relative px-10 py-4 bg-zinc-900/40 backdrop-blur-xl text-white font-black rounded-2xl border border-white/10 transition-all hover:scale-105 hover:border-orange-500/50 overflow-hidden shadow-[0_20px_40px_rgba(0,0,0,0.3)] flex items-center gap-3"
                    >
                        {/* Background Glow Effect on Hover */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-orange-600/10 to-amber-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                        <span className="relative z-10 flex items-center gap-2 tracking-tight">
                            Daftar Anime A-Z
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 256 256" className="group-hover:rotate-45 transition-transform duration-300 text-orange-500">
                                <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                            </svg>
                        </span>

                        {/* Animated Border Trace (Efek Garis Berjalan) */}
                        <div className="absolute inset-0 rounded-2xl border border-orange-500/20 scale-105 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500" />
                    </Link>
                </div>

                {/* ... */}

                {/* Gradient Bottom Overlay - Turunkan z-index atau tambahkan pointer-events-none */}
                <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-[5] pointer-events-none" />
            </div>

            {/* Gradient Bottom Overlay */}
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent z-10" />
        </section>
    );
}