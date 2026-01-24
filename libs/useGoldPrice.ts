'use client'

import { useEffect, useState } from 'react'

const USD_TO_IDR = 16000

type GoldApiResponse = {
  price_gram_24k?: number
  chp?: number
  error?: string
}

export function useGoldPrice() {
  const [price, setPrice] = useState<number | null>(null)
  const [changePercent, setChangePercent] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchGoldPrice() {
      try {
        const res = await fetch(
          'https://www.goldapi.io/api/XAU/USD',
          {
            headers: {
              'x-access-token':
                process.env.NEXT_PUBLIC_GOLD_API_KEY ?? '',
            },
          }
        )

        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`)
        }

        const data: GoldApiResponse = await res.json()

        if (!data.price_gram_24k) {
          throw new Error(
            data.error || 'Gold price not found'
          )
        }

        const priceIDR =
          data.price_gram_24k * USD_TO_IDR

        setPrice(Math.round(priceIDR))
        setChangePercent(data.chp ?? null)
      } catch (err) {
        console.error('Gold price error:', err)
        setPrice(null)
        setChangePercent(null)
      } finally {
        setLoading(false)
      }
    }

    fetchGoldPrice()
  }, [])

  return { price, changePercent, loading }
}