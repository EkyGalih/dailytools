import { NextResponse } from 'next/server'

const API_KEY = process.env.FMP_API_KEY

const INDEXES = [
  { symbol: '^GSPC', label: 'S&P 500' },
  { symbol: '^IXIC', label: 'Nasdaq' },
  { symbol: '^DJI', label: 'Dow Jones' },
]

export async function GET() {
  try {
    const results = []

    for (const idx of INDEXES) {
      const res = await fetch(
        `https://financialmodelingprep.com/api/v3/quote/${encodeURIComponent(
          idx.symbol
        )}?apikey=${API_KEY}`,
        {
          // cache 1 jam (hemat kuota)
          next: { revalidate: 3600 },
        }
      )

      const data = await res.json()
      const d = data?.[0]

      if (!d) continue

      results.push({
        label: idx.label,
        symbol: d.symbol,
        price: d.price,
        changePercent: d.changesPercentage,
      })
    }

    return NextResponse.json(results)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch market trend' },
      { status: 500 }
    )
  }
}