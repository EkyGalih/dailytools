import {
    getOngoingSeries,
    getCompletedSeries, // Asumsi kamu punya fungsi ini
    getMovies, // Asumsi kamu punya fungsi ini
} from "@/libs/drama/drakor/drama"
import DramaHero from "@/components/drama/drakor/DramaHero"
import DramaCard from "@/components/drama/drakor/DramaCard"
import { ArrowLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import RefreshButton from "@/components/drama/drakor/RefreshButton"
import { notFound } from "next/navigation"

/* ======================================== */
/* ✅ CONFIG & MAPPING */
/* ======================================== */
const CATEGORY_MAP: Record<string, { title: string, fetcher: any, color: string }> = {
    "ongoing": {
        title: "Series Berjalan",
        fetcher: getOngoingSeries,
        color: "text-rose-500"
    },
    "completed": {
        title: "Series Selesai",
        fetcher: getCompletedSeries, // Ganti ke getCompletedSeries jika sudah ada
        color: "text-indigo-600"
    },
    "movies": {
        title: "Film",
        fetcher: getMovies, // Ganti ke getMovies jika sudah ada
        color: "text-amber-500"
    }
}

import { Metadata } from 'next'

export async function generateMetadata({ params }: { params: Promise<{ category: string }> }): Promise<Metadata> {
    const { category } = await params
    const config = CATEGORY_MAP[category]

    if (!config) return { title: "Halaman Tidak Ditemukan | Tamanto" }

    const site = 'https://tamanto.web.id'
    const categoryTitle = config.title || "Drama Korea"
    const description = `Koleksi ${categoryTitle} subtitle Indonesia terbaru dengan kualitas Ultra HD. Update harian genre favoritmu hanya di Tamanto.`

    return {
        // Format: Nonton [Nama Kategori] Sub Indo Terbaru | Tamanto
        title: `Nonton ${categoryTitle} Sub Indo Terbaru`,
        description: description,

        alternates: {
            canonical: `${site}/drama/korea/category/${category}`,
        },

        openGraph: {
            title: `${categoryTitle} Terbaru - Tamanto`,
            description: description,
            url: `${site}/drama/korea/category/${category}`,
            siteName: 'Tamanto',
            type: 'website',
            images: [
                {
                    url: '/og-category.jpg', // Opsional: Berikan image bertema kategori
                    width: 1200,
                    height: 630,
                    alt: `Kategori ${categoryTitle} di Tamanto`,
                },
            ],
            locale: 'id_ID',
        },

        twitter: {
            card: 'summary_large_image',
            title: `Update ${categoryTitle} Sub Indo Tercepat`,
            description: description,
        },
    }
}

/* ======================================== */
/* ✅ PAGE COMPONENT */
/* ======================================== */
export default async function DramaCategoryPage({ params, searchParams }: any) {
    const { category } = await params
    const { page } = await searchParams
    const config = CATEGORY_MAP[category] || notFound()
    const currentPage = parseInt(page || "1")
    const raw = await config.fetcher(currentPage)
    const dramaList = raw?.datas || []

    return (
        <div className="bg-[#F8F9FB] min-h-screen pb-24 font-sans selection:bg-rose-100 selection:text-rose-600">
            {/* HERO dengan padding container agar simetris */}
            <div className="p-4 mb-10 md:p-6 lg:p-8">
                <DramaHero />
            </div>

            {/* MAIN CONTENT: Kurangi margin negatif agar tidak menindih tombol hero */}
            <main className="max-w-7xl mx-auto px-4 md:px-10 -mt-8 md:-mt-12 relative z-30">

                <div className="space-y-8 mb-12 px-4">
                    {/* Baris Atas: Breadcrumb & Tombol Kembali (Sejajar) */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <nav className="inline-flex items-center gap-3 px-5 py-2.5 bg-white rounded-2xl border border-zinc-100 shadow-sm text-[10px] font-black uppercase tracking-[0.2em] text-zinc-400 w-fit">
                            <Link href="/" className="hover:text-rose-500 transition-colors">Home</Link>
                            <ChevronRight size={12} className="text-zinc-300" />
                            <Link href="/drama/korea" className="hover:text-rose-500 transition-colors">Drama</Link>
                            <ChevronRight size={12} className="text-zinc-300" />
                            <span className="text-zinc-900 truncate max-w-[150px]">{config.title}</span>
                        </nav>

                        <Link
                            href="/drama/korea"
                            className="flex items-center justify-center gap-2 w-full md:w-auto px-6 py-3 bg-white border border-zinc-100 rounded-2xl text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm group active:scale-95"
                        >
                            <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
                            Semua Drama
                        </Link>
                    </div>

                    {/* Baris Bawah: Judul Besar */}
                    <div className="space-y-2">
                        <h1 className="text-5xl md:text-8xl font-black text-zinc-900 italic tracking-tighter uppercase leading-[0.85]">
                            <span className={`${config.color} drop-shadow-sm`}>
                                {config.title.split(' ')[0]}
                            </span>
                        </h1>
                        <div className="w-24 h-2 bg-gradient-to-r from-rose-500 to-indigo-500 rounded-full" />
                    </div>
                </div>

                {/* Section Card dengan Border tebal agar kontras dengan Hero */}
                <section className="bg-white rounded-[3.5rem] md:rounded-[4rem] p-6 md:p-16 border-[12px] border-[#F8F9FB] shadow-[0_50px_100px_rgba(0,0,0,0.04)] relative overflow-hidden">
                    <div className="relative z-10">
                        <div className="flex items-center gap-3 mb-10">
                            <div className={`w-1.5 h-8 rounded-full ${config.color.replace('text', 'bg')}`} />
                            <h2 className="text-xl md:text-2xl font-black text-zinc-900 italic tracking-tighter uppercase">
                                Daftar {config.title}
                            </h2>
                        </div>

                        {dramaList.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 gap-6 md:gap-10">
                                {dramaList.map((item: any) => (
                                    <div key={item.endpoint} className="h-full">
                                        <DramaCard drama={item} />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="py-20 text-center space-y-4">
                                <p className="text-zinc-400 font-medium italic">Tidak ada data untuk kategori ini.</p>
                                <RefreshButton />
                            </div>
                        )}

                        {/* Pagination - Tetap seperti sebelumnya */}
                        <div className="mt-20 flex justify-center pt-12 border-t border-zinc-50">
                            <div className="flex items-center gap-4">
                                {currentPage > 1 && (
                                    <Link href={`/drama/korea/${category}?page=${currentPage - 1}`} className="px-8 py-4 bg-white border border-zinc-100 rounded-2xl text-xs font-black uppercase">Prev</Link>
                                )}
                                <span className="w-12 h-12 flex items-center justify-center rounded-2xl bg-zinc-900 text-white font-black">{currentPage}</span>
                                <Link href={`/drama/korea/${category}?page=${currentPage + 1}`} className="px-8 py-4 bg-zinc-900 text-white rounded-2xl text-xs font-black uppercase">Next</Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}