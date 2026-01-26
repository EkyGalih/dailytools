'use client'

export default function StatsBlock({ stats }: { stats: any[] }) {
  // 🚨 JIKA STATS BELUM ADA
  if (!Array.isArray(stats) || stats.length < 2) {
    return (
      <div className="bg-white border rounded-3xl p-6 text-center text-sm text-gray-500">
        Statistik pertandingan belum tersedia.
        <br />
        <span className="text-xs text-gray-400">
          Biasanya muncul setelah pertandingan berjalan beberapa menit.
        </span>
      </div>
    )
  }

  const homeStats = stats[0].statistics
  const awayStats = stats[1].statistics

  return (
    <div className="bg-white border rounded-3xl p-6 space-y-5 shadow-sm">
      <h3 className="text-lg font-semibold text-center">
        Statistik Pertandingan
      </h3>

      {homeStats.map((s: any) => {
        const away = awayStats.find((x: any) => x.type === s.type)

        const homeVal = Number(s.value) || 0
        const awayVal = Number(away?.value) || 0
        const total = homeVal + awayVal || 1

        return (
          <div key={s.type} className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-indigo-600 font-medium">{homeVal}</span>
              <span className="text-gray-500">{s.type}</span>
              <span className="text-red-500 font-medium">{awayVal}</span>
            </div>

            <div className="flex h-2 rounded-full bg-gray-200 overflow-hidden">
              <div
                className="bg-indigo-600 transition-all"
                style={{ width: `${(homeVal / total) * 100}%` }}
              />
              <div
                className="bg-red-500 transition-all"
                style={{ width: `${(awayVal / total) * 100}%` }}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}