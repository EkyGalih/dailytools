'use client'

import { useEffect, useState } from 'react'

export type MarketTrendItem = {
  label: string
  symbol: string
  price: number
  changePercent: number
}

export function useMarketTrend() {
  const [data, setData] = useState<MarketTrendItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/market-trend')
      .then((res) => res.json())
      .then((json) => setData(json))
      .finally(() => setLoading(false))
  }, [])

  return { data, loading }
}