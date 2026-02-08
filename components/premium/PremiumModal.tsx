import Link from "next/link"

export default function PremiumModal({
    onClose,
}: {
    onClose: () => void
}) {
    return (
        <div className="fixed inset-0 z-[999] bg-zinc-900/40 backdrop-blur-md flex items-center justify-center px-4">
            <div className="bg-white rounded-[2.5rem] max-w-md w-full overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)] animate-in zoom-in-95 duration-300">

                <div className="h-2 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400" />

                <div className="p-10 text-center">
                    <div className="w-20 h-20 mx-auto mb-6 bg-slate-50 rounded-3xl flex items-center justify-center text-3xl">
                        💎
                    </div>

                    <h2 className="text-2xl font-bold text-zinc-800 mb-2">
                        Konten Eksklusif
                    </h2>

                    <p className="text-zinc-500 text-sm mb-8">
                        Episode ini khusus untuk member premium.
                        Akses semua drama hanya Rp 2.500 / 24 jam.
                    </p>

                    <div className="bg-slate-50 rounded-2xl p-5 mb-8 border border-slate-100 text-left">
                        <span className="text-2xl font-black text-zinc-900">
                            Rp 2.500
                        </span>
                        <span className="text-zinc-400 text-sm"> / 24 jam</span>
                    </div>

                    <div className="space-y-3">
                        <Link
                            href="/paket"
                            className="block w-full bg-zinc-900 text-white py-4 rounded-2xl font-bold text-sm text-center hover:bg-zinc-800"
                        >
                            Berlangganan Sekarang
                        </Link>

                        <button
                            onClick={onClose}
                            className="block w-full bg-white text-zinc-400 py-3 rounded-2xl text-sm hover:bg-zinc-50"
                        >
                            Mungkin nanti
                        </button>
                    </div>

                    <div className="mt-6 pt-4 border-t border-zinc-100">
                        <p className="text-xs text-zinc-500">
                            Sudah punya paket?{" "}
                            <Link href="/paket/redeem" className="text-purple-600 font-bold">
                                Redeem di sini
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}