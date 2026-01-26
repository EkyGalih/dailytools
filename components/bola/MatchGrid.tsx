import MatchCard from './MatchCard'

type MatchGridProps = {
  matches: any[]
  limit?: number
}

export default function MatchGrid({ matches, limit }: MatchGridProps) {
  const shown = limit ? matches.slice(0, limit) : matches

  return (
    <div
      className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
      aria-label="Daftar pertandingan sepak bola"
    >
      {shown.map((m) => (
        <MatchCard key={m.fixture.id} match={m} />
      ))}
    </div>
  )
}