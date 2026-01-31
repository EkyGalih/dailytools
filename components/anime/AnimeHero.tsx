import React from 'react';

interface AnimeHeroProps {
    badgeText?: string;
    titlePrimary?: string;
    titleSecondary?: string;
    description?: string;
    ctaText?: string;
    onCtaClick?: () => void;
}

export default function AnimeHero({
    badgeText = "NEW UPDATE TODAY",
    titlePrimary = "EKOSISTEM",
    titleSecondary = "ANIME",
    description = "Streaming anime subtitle Indonesia dengan kualitas terbaik. Tanpa iklan yang mengganggu dan update paling cepat.",
    ctaText = "Mulai Nonton",
    onCtaClick
}: AnimeHeroProps) {
    return (
        <section className="relative h-[60vh] min-h-[400px] w-full flex items-center px-6 lg:px-20 overflow-hidden bg-zinc-950">
            {/* Background Glow Effect - Dioptimalkan untuk performa */}
            <div
                className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/20 via-zinc-950 to-zinc-950 z-0"
                aria-hidden="true"
            />

            {/* Dekorasi Grid Halus (Opsional, untuk kesan canggih) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10 pointer-events-none" />

            <div className="relative z-10 max-w-3xl">
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/10 border border-orange-600/20 text-orange-500 text-[10px] md:text-xs font-black uppercase tracking-widest mb-6 animate-fade-in">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                    </span>
                    {badgeText}
                </div>

                {/* Main Title */}
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter mb-6 leading-[0.9] text-white">
                    {titlePrimary} <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-amber-300">
                        {titleSecondary}
                    </span> DIGITAL.
                </h1>

                {/* Description */}
                <p className="max-w-md text-zinc-400 text-sm md:text-base mb-8 leading-relaxed font-medium">
                    {description}
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-wrap gap-4">
                    <button
                        onClick={onCtaClick}
                        className="group relative px-8 py-3 bg-white text-black font-black rounded-full transition-all hover:bg-orange-500 hover:text-white overflow-hidden shadow-lg shadow-white/5"
                    >
                        <span className="relative z-10">{ctaText}</span>
                        <div className="absolute inset-0 bg-orange-600 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                    </button>

                    <button className="px-8 py-3 bg-zinc-900/50 backdrop-blur-md text-white font-bold rounded-full border border-zinc-800 hover:bg-zinc-800 transition-all">
                        Cek Jadwal
                    </button>
                </div>
            </div>

            {/* Gradient Bottom Overlay agar menyatu dengan konten bawah */}
            <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
        </section>
    );
}