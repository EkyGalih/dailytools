import UpcomingMatchGrid from '@/components/bola/jadwal/UpcomingMatchGrid';
import { getUpcomingFixtures } from '@/libs/bola/api'

export const metadata = {
  title: 'Jadwal Pertandingan Bola Mendatang',
  description:
    'Jadwal pertandingan sepak bola mendatang dari berbagai liga dunia. Update jadwal bola terbaru.',
}

export default async function JadwalPage() {
  const data = await getUpcomingFixtures(7)
  const matches = data?.response || []
    console.log(matches);
  return (
    <section className="space-y-10">
      <header>
        <h1 className="text-3xl font-bold">
          Jadwal Pertandingan Bola
        </h1>
        <p className="mt-2 text-gray-600">
          Jadwal sepak bola beberapa hari ke depan dari berbagai kompetisi.
        </p>
      </header>

      <UpcomingMatchGrid
        matches={matches}
        title="Jadwal 7 Hari Ke Depan"
      />
    </section>
  )
}