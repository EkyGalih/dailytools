import Link from 'next/link'

export default function ComingSoon() {
    return (
        <main className="min-h-[70vh] flex items-center justify-center px-4">
            <div className="max-w-xl w-full text-center space-y-6">
                <div className="text-5xl">🚧</div>

                {/* INDONESIA */}
                <section className="space-y-2">
                    <h1 className="text-2xl font-bold">
                        Sedang Dalam Persiapan
                    </h1>
                    <p className="text-gray-600">
                        Fitur ini sedang kami siapkan agar bisa digunakan dengan nyaman dan maksimal.
                        Mohon bersabar, ya 🙏
                    </p>
                </section>

                <hr className="my-4" />

                {/* SASAK */}
                <section className="space-y-2">
                    <h2 className="text-lg font-semibold">
                        Jangke Te Pinak Ton
                    </h2>
                    <p className="text-gray-600">
                        Sabar Juluk Nggeh, Boyak wah sak arak juluk
                    </p>
                </section>

                {/* CTA */}
                <div className="pt-6 flex justify-center">
                    <Link
                        href="/drama/china/channel/dramabox"
                        className="inline-flex items-center gap-2 rounded-full
              bg-gradient-to-r from-fuchsia-600 via-purple-600 to-indigo-600
              px-6 py-3 text-sm font-semibold text-white
              shadow-lg shadow-purple-500/20
              hover:opacity-90 hover:shadow-xl transition"
                        aria-label="Lihat drama China lainnya"
                    >
                        🎬 Lihat Drama Lain
                    </Link>
                </div>

                <p className="text-sm text-gray-400 pt-4">
                    Pantau terus, fitur ini akan segera hadir.
                </p>
            </div>
        </main>
    )
}