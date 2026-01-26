import Image from 'next/image'
import Link from 'next/link'

type Props = {
  matches: any[]
  title?: string
}

export default function UpcomingMatchGrid({
  matches,
  title = 'Jadwal Pertandingan Mendatang',
}: Props) {
  if (!matches.length) return null

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">{title}</h2>
        <Link
          href="/bola/jadwal"
          className="text-sm text-emerald-600 hover:underline"
        >
          Lihat semua →
        </Link>
      </header>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {matches.map((m) => (
          <div
            key={m.fixture.id}
            className="bg-white border rounded-2xl p-4 hover:shadow-md transition"
          >
            {/* LEAGUE */}
            <div className="flex items-center gap-2 mb-3">
              {m.league.logo && (
                <Image
                  src={m.league.logo}
                  alt={m.league.name}
                  width={18}
                  height={18}
                />
              )}
              <span className="text-xs text-gray-600 font-medium">
                {m.league.name}
              </span>
            </div>

            {/* TEAMS */}
            <div className="space-y-2">
              <TeamRow team={m.teams.home} />
              <TeamRow team={m.teams.away} />
            </div>

            {/* TIME */}
            <p className="mt-3 text-xs text-gray-500">
              {new Date(m.fixture.date).toLocaleString('id-ID', {
                weekday: 'short',
                day: 'numeric',
                month: 'short',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

function TeamRow({ team }: { team: any }) {
  return (
    <div className="flex items-center gap-3">
      {team.logo && (
        <Image
          src={team.logo}
          alt={team.name}
          width={24}
          height={24}
        />
      )}
      <span className="text-sm font-medium">{team.name}</span>
    </div>
  )
}