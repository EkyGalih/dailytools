'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function ScheduleClient({
    schedule,
}: {
    schedule: any[]
}) {
    // ✅ activeDay bukan index
    const [activeDay, setActiveDay] = useState<string>('')

    // ===============================
    // ✅ AUTO DETECT HARI INI
    // ===============================
    useEffect(() => {
        if (!schedule || schedule.length === 0) return

        const daftarHari = [
            'Minggu',
            'Senin',
            'Selasa',
            'Rabu',
            'Kamis',
            'Jumat',
            'Sabtu',
        ]

        const hariIni = daftarHari[new Date().getDay()]

        // cari apakah hari ini ada di schedule
        const found = schedule.find(
            (item) =>
                item.day?.toLowerCase() === hariIni.toLowerCase()
        )

        // kalau ada → aktifkan
        if (found) {
            setActiveDay(found.day)
        } else {
            // fallback default hari pertama
            setActiveDay(schedule[0].day)
        }
    }, [schedule])

    // ===============================
    // ✅ DATA ACTIVE DAY
    // ===============================
    const activeData = schedule.find(
        (item) => item.day === activeDay
    )

    if (!activeData) return null

    return (
        <section className="px-6 lg:px-10 mt-10 max-w-6xl mx-auto">
            <div className="flex justify-center md:justify-end mb-8">
                <Link
                    href={`/anime`}
                    className="group relative flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-orange-600 to-amber-500 text-white rounded-xl font-black shadow-[0_5px_15px_rgba(234,88,12,0.2)] hover:scale-105 hover:shadow-[0_8px_25px_rgba(234,88,12,0.3)] transition-all duration-300 overflow-hidden border border-white/10"
                >
                    {/* Efek Kilauan (Shimmer) */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform" />

                    <div className="relative z-10 flex items-center gap-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="14" height="14"
                            fill="currentColor"
                            viewBox="0 0 256 256"
                            className="group-hover:-translate-x-0.5 transition-transform duration-300"
                        >
                            <path d="M224,128a8,8,0,0,1-8,8H72.83l47.58,47.59a8,8,0,0,1-11.32,11.32l-61.26-61.26a8,8,0,0,1,0-11.32l61.26-61.26a8,8,0,0,1,11.32,11.32L72.83,120H200A8,8,0,0,1,208,128Z"></path>
                        </svg>

                        <span className="text-[10px] uppercase tracking-[0.15em] leading-none">
                            Beranda
                        </span>
                    </div>

                    <style jsx>{`
            @keyframes shimmer {
                100% { transform: translateX(100%); }
            }
        `}</style>
                </Link>
            </div>
            {/* ===============================
          NAVIGATION TAB HARI
      =============================== */}
            <div className="flex overflow-x-auto gap-4 py-6 no-scrollbar justify-start md:justify-center">
                {schedule.map((item) => {
                    const isActive = item.day === activeDay

                    // label hari ini
                    const daftarHari = [
                        'Minggu',
                        'Senin',
                        'Selasa',
                        'Rabu',
                        'Kamis',
                        'Jumat',
                        'Sabtu',
                    ]
                    const hariIni = daftarHari[new Date().getDay()]

                    const isToday =
                        item.day.toLowerCase() === hariIni.toLowerCase()

                    return (
                        <button
                            key={item.day}
                            onClick={() => setActiveDay(item.day)}
                            className={`px-8 py-4 rounded-2xl font-black text-xs uppercase tracking-widest border relative transition-all shrink-0
                ${isActive
                                    ? 'bg-white text-black border-white scale-110 shadow-lg'
                                    : 'bg-zinc-900 text-zinc-500 border-zinc-800 hover:text-white'
                                }
              `}
                        >
                            {item.day}

                            {/* Badge Hari Ini */}
                            {isToday && !isActive && (
                                <span className="absolute -top-2 left-1/2 -translate-x-1/2 text-[8px] bg-orange-600 text-white px-2 py-0.5 rounded-full">
                                    HARI INI
                                </span>
                            )}
                        </button>
                    )
                })}
            </div>

            {/* ===============================
          LIST ANIME ACTIVE DAY
      =============================== */}
            <div className="mt-16 animate-in fade-in slide-in-from-bottom-6 duration-700">
                {/* HEADER SECTION */}
                <div className="flex items-center gap-6 mb-10">
                    <div className="relative">
                        <h2 className="text-3xl md:text-4xl font-black uppercase italic tracking-tighter leading-none text-white">
                            Rilis Hari{' '}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-orange-500">
                                {activeData.day}
                            </span>
                        </h2>
                        {/* Dekorasi Glow Kecil di bawah teks */}
                        <div className="absolute -bottom-2 left-0 w-1/3 h-1 bg-purple-600 rounded-full blur-[2px]" />
                    </div>

                    <div className="flex-grow h-px bg-gradient-to-r from-zinc-800 to-transparent" />

                    <div className="flex items-center gap-2 px-4 py-2 bg-zinc-900/50 rounded-2xl border border-zinc-800 shadow-inner">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-purple-500"></span>
                        </span>
                        <span className="text-[10px] font-black uppercase tracking-widest text-zinc-400">
                            {activeData.anime_list.length} Anime
                        </span>
                    </div>
                </div>

                {/* GRID LIST - Enhanced Glassmorphism */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">

                    {activeData.anime_list.map((anime: any, i: number) => (
                        <Link
                            key={anime.endpoint}
                            href={`/anime/${anime.endpoint}`}
                            className="group relative flex items-center justify-between p-5 bg-zinc-900/30 backdrop-blur-md border border-white/5 rounded-[2rem] hover:border-purple-500/40 hover:bg-zinc-800/40 transition-all duration-500 overflow-hidden"
                        >
                            {/* Hover Aura Effect */}
                            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                            <div className="flex items-center gap-4 truncate relative z-10">
                                <span className="w-11 h-11 flex items-center justify-center rounded-2xl bg-zinc-950 border border-zinc-800 text-[10px] font-black text-zinc-500 group-hover:text-purple-400 group-hover:border-purple-500/30 transition-all duration-300 shadow-xl">
                                    {String(i + 1).padStart(2, '0')}
                                </span>

                                <div className="flex flex-col truncate">
                                    <h3 className="text-sm font-bold text-zinc-300 group-hover:text-white truncate transition-colors duration-300">
                                        {anime.title}
                                    </h3>
                                    <span className="text-[9px] font-bold text-zinc-600 uppercase tracking-tighter group-hover:text-purple-500/70 transition-colors">
                                        Update Berkala
                                    </span>
                                </div>
                            </div>

                            <div className="relative z-10 w-8 h-8 flex items-center justify-center rounded-full bg-zinc-950 border border-zinc-800 group-hover:border-purple-500/50 group-hover:bg-purple-600 text-zinc-500 group-hover:text-white transition-all duration-300 transform group-hover:rotate-45">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 256 256">
                                    <path d="M200,64V168a8,8,0,0,1-16,0V83.31L69.66,197.66a8,8,0,0,1-11.32-11.32L172.69,72H88a8,8,0,0,1,0-16H192A8,8,0,0,1,200,64Z"></path>
                                </svg>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}