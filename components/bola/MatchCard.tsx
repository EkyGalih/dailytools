import Image from 'next/image'
import Link from 'next/link'

type MatchCardProps = {
    match: any
}

export default function MatchCard({ match }: MatchCardProps) {
    const isLive =
        match.fixture.status.elapsed !== null &&
        match.fixture.status.short !== 'FT'

    return (
        <Link
            href={`/bola/${match.fixture.id}`}
            className="relative group bg-white border rounded-2xl p-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-200"
        >
            {/* LEAGUE BADGE */}
            <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur px-3 py-1.5 rounded-full">
                {match.league.logo && (
                    <Image
                        src={match.league.logo}
                        alt={match.league.name}
                        width={18}
                        height={18}
                    />
                )}
                <span className="text-xs text-white truncate max-w-[140px]">
                    {match.league.name}
                </span>
            </div>

            {/* LIVE */}
            {isLive && (
                <span className="absolute top-4 right-4 flex items-center gap-2 text-red-500 text-xs font-semibold animate-pulse">
                    <span className="w-2 h-2 bg-red-500 rounded-full" />
                    LIVE
                </span>
            )}

            {/* TEAMS */}
            <div className="mt-10 space-y-3">
                {/* HOME */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 min-w-0">
                        {match.teams.home.logo && (
                            <Image
                                src={match.teams.home.logo}
                                alt={match.teams.home.name}
                                width={28}
                                height={28}
                            />
                        )}
                        <span className="font-medium truncate">
                            {match.teams.home.name}
                        </span>
                    </div>
                    <span className="font-bold text-xl">
                        {match.goals.home ?? '-'}
                    </span>
                </div>

                {/* AWAY */}
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 min-w-0">
                        {match.teams.away.logo && (
                            <Image
                                src={match.teams.away.logo}
                                alt={match.teams.away.name}
                                width={28}
                                height={28}
                            />
                        )}
                        <span className="font-medium truncate">
                            {match.teams.away.name}
                        </span>
                    </div>
                    <span className="font-bold text-xl">
                        {match.goals.away ?? '-'}
                    </span>
                </div>
            </div>

            {/* FOOTER */}
            <div className="mt-4 flex justify-between text-xs text-gray-500">
                <span>
                    {match.fixture.status.short === 'FT'
                        ? 'Full Time'
                        : isLive
                            ? `Menit ${match.fixture.status.elapsed}'`
                            : new Date(match.fixture.date).toLocaleTimeString('id-ID', {
                                hour: '2-digit',
                                minute: '2-digit',
                            })}
                </span>

                <span className="text-emerald-600 font-medium group-hover:underline">
                    Detail →
                </span>
            </div>
        </Link>
    )
}