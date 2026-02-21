import { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import DramaHero from "@/components/drama/dramabox/DramaHero"
import NetshortSectionHeader from "@/components/drama/netshort/SectionHeaderNetshort"
import NetshortForYouList from "@/components/drama/netshort/NetshortForYouList"
import { getNetshortForYou } from "@/libs/drama/netshort/netshort"

export const metadata: Metadata = {
    title: 'Koleksi Lengkap Drama Netshort | Tamanto',
    description: 'Telusuri ribuan koleksi drama pendek China sub Indo terlengkap dari channel Netshort.'
}

export default async function NetshortAllPage() {
    const initialData = await getNetshortForYou(1)

    return (
        <div className="bg-[#fafafa] min-h-screen pb-20">
            <DramaHero activeChannel="netshort" />

            <main className="max-w-7xl mx-auto px-3 md:px-6 -mt-10 md:-mt-32 relative z-30 pt-4 md:pt-0">
                <div className="bg-white rounded-[2.5rem] md:rounded-[40px] p-6 md:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.04)] border border-zinc-100">

                    {/* --- HEADER AREA WITH INTEGRATED BACK BUTTON --- */}
                    <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                            <NetshortSectionHeader
                                title="Koleksi Lengkap"
                                desc="Menampilkan semua serial drama pendek terbaik untukmu."
                                badge="Full Library"
                            />
                        </div>

                        {/* TOMBOL KEMBALI DI SEBELAH KANAN HEADER */}
                        <Link
                            href="/drama/china/channel/netshort"
                            className="group flex items-center gap-2 px-4 py-2.5 bg-zinc-50 hover:bg-rose-600 border border-zinc-100 hover:border-rose-600 rounded-2xl transition-all duration-300 shadow-sm active:scale-95 shrink-0 mt-2"
                        >
                            <ArrowLeft size={16} className="text-zinc-400 group-hover:text-white group-hover:-translate-x-1 transition-all" />
                            <span className="hidden sm:block text-[10px] font-black uppercase tracking-widest text-zinc-500 group-hover:text-white">
                                Kembali
                            </span>
                        </Link>
                    </div>

                    <div className="mt-10">
                        <NetshortForYouList initialData={initialData} />
                    </div>
                </div>
            </main>
        </div>
    )
}