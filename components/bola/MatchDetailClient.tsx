'use client'

import Image from 'next/image'
import ScoreAnimated from './ScoreAnimated'
import StatsBlock from './StatsBlock'

export default function MatchDetailClient({
  match,
  stats,
}: {
  match: any
  stats: any[]
}) {
  const homeWin = match.goals.home > match.goals.away
  const awayWin = match.goals.away > match.goals.home
  const isLive = match.fixture.status.short === 'LIVE'

  return (
    <section className="space-y-10">
      {/* HEADER */}
      <header>
        <h1 className="text-3xl font-bold">
          {match.teams.home.name} vs {match.teams.away.name}
        </h1>
        <p className="text-sm text-gray-500">
          {match.league.name} •{' '}
          {new Date(match.fixture.date).toLocaleString('id-ID')}
        </p>
      </header>

      {/* SCORE CARD */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-900 via-gray-900 to-black text-white shadow-2xl">

        {/* LEAGUE BADGE */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2 flex gap-2 bg-black/40 px-4 py-1 rounded-full">
          <Image src={match.league.logo} alt="" width={20} height={20} />
          <span className="text-xs">{match.league.name}</span>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-14 gap-10">
          <Team name={match.teams.home.name} logo={match.teams.home.logo} win={homeWin} reverse />
          <div className="text-center">
            {isLive && <LiveBadge />}
            <ScoreAnimated home={match.goals.home} away={match.goals.away} />
            {match.fixture.status.elapsed && (
              <p className="text-xs text-gray-300">
                Menit {match.fixture.status.elapsed}'
              </p>
            )}
          </div>
          <Team name={match.teams.away.name} logo={match.teams.away.logo} win={awayWin} />
        </div>
      </div>

      {/* STATS */}
      <StatsBlock stats={stats} />
    </section>
  )
}

function Team({ name, logo, win, reverse }: any) {
  return (
    <div className={`flex items-center gap-4 ${reverse ? 'flex-row-reverse text-right' : ''}`}>
      <div className={`p-3 rounded-2xl ${win ? 'bg-green-500/20 ring-2 ring-green-400' : 'bg-white/5'}`}>
        <Image src={logo} alt={name} width={64} height={64} />
      </div>
      <p className="font-semibold max-w-[160px]">{name}</p>
    </div>
  )
}

function LiveBadge() {
  return (
    <div className="flex items-center gap-2 text-red-400 font-semibold animate-pulse">
      <span className="w-2 h-2 bg-red-500 rounded-full" /> LIVE
    </div>
  )
}