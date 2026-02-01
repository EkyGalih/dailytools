import Link from "next/link"

export default function SectionHeader({
    title,
    desc = "", // Berikan default value agar tidak error saat render
    link,
}: {
    title: string
    desc?: string // Tambahkan "?" agar menjadi opsional
    link: string
}) {
    return (
        <div className="flex items-center justify-between mb-8">
            <div>
                <h2 className="text-2xl font-black uppercase tracking-tight">
                    {title}
                </h2>
                {/* Render deskripsi hanya jika ada isinya */}
                {desc && <p className="text-zinc-500 text-sm mt-1">{desc}</p>}
            </div>

            <Link
                href={link}
                className="text-xs font-black uppercase tracking-widest text-orange-400 hover:text-orange-300 transition"
            >
                Lihat Semua →
            </Link>
        </div>
    )
}