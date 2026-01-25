'use client'

import { useEffect, useState } from 'react'

type RateItem = {
  code: string
  rate: number
  updatedAt: string
}

const BASE_CURRENCIES = ['USD', 'SGD', 'AUD', 'JPY', 'EUR']

export function useExchangeRates() {
  const [rates, setRates] = useState<RateItem[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchRates() {
      try {
        const results: RateItem[] = []

        for (const base of BASE_CURRENCIES) {
          const res = await fetch(
            `https://hexarate.paikama.co/api/rates/${base}/IDR/latest`
          )

          if (!res.ok) continue

          const json = await res.json()

          results.push({
            code: base,
            rate: json.data.mid,
            updatedAt: json.data.timestamp,
          })
        }

        setRates(results)
      } catch (err) {
        console.error('FX rate error:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchRates()
  }, [])

  return { rates, loading }
}