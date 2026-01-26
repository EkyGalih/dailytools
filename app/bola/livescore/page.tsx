import MatchGrid from '@/components/bola/MatchGrid'
import { getLiveMatches, getTodayFixtures } from '@/libs/bola/api'

export const metadata = {
    title: 'Live Score Bola Hari Ini & Jadwal Pertandingan',
    description:
        'Live score sepak bola hari ini lengkap dengan logo klub dan liga. Pantau skor, jadwal, dan hasil pertandingan terbaru.',
}

export default async function BolaPage() {
    const [live, today] = await Promise.all([
        getLiveMatches(),
        getTodayFixtures(),
    ])

    // Gabung + dedupe
    const map = new Map<number, any>()
        ;[...(live?.response || []), ...(today?.response || [])].forEach((m) => {
            map.set(m.fixture.id, m)
        })
    const matches = Array.from(map.values())

    return (
        <section className="space-y-14">
            {/* HERO */}
            <header className="rounded-3xl bg-gradient-to-br from-emerald-600 to-green-700 text-white p-8 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold">
                    Live Score & Jadwal Bola Hari Ini
                </h1>
                <p className="mt-3 text-emerald-100 max-w-3xl">
                    Pantau skor langsung sepak bola lengkap dengan logo klub dan liga
                    dari berbagai kompetisi dunia.
                </p>
            </header>

            {/* MATCH GRID */}
            <MatchGrid matches={matches} />

            {/* SEO TEXT */}
            <section className="max-w-4xl text-sm text-gray-700 space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">
                    Live Score Sepak Bola Lengkap
                </h2>
                <p>
                    Dapatkan update live score sepak bola hari ini dengan tampilan modern,
                    lengkap dengan logo klub dan liga. Informasi skor, jadwal, dan hasil
                    pertandingan diperbarui secara berkala untuk penggemar sepak bola.
                </p>
            </section>
        </section>
    )
}