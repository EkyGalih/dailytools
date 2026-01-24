'use client'

import { useEffect, useState } from 'react'

type FxRate = {
    code: string
    rate: number
    changePercent: number
}

const CURRENCIES = ['USD', 'SGD', 'AUD', 'EUR', 'GBP', 'JPY']

function getYesterday() {
    const d = new Date()
    d.setDate(d.getDate() - 1)
    return d.toISOString().split('T')[0]
}

export function useFxRates() {
    const [rates, setRates] = useState<FxRate[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchRates() {
            try {
                const yesterday = getYesterday()

                const results = await Promise.all(
                    CURRENCIES.map(async (currency) => {
                        // hari ini
                        const todayRes = await fetch(
                            `https://api.frankfurter.app/latest?from=${currency}&to=IDR`
                        )
                        const todayData = await todayRes.json()

                        // kemarin
                        const yesterdayRes = await fetch(
                            `https://api.frankfurter.app/${yesterday}?from=${currency}&to=IDR`
                        )
                        const yesterdayData =
                            await yesterdayRes.json()

                        const todayRate = todayData.rates.IDR
                        const yesterdayRate =
                            yesterdayData.rates.IDR

                        const changePercent =
                            ((todayRate - yesterdayRate) /
                                yesterdayRate) *
                            100

                        return {
                            code: currency,
                            rate: todayRate,
                            changePercent,
                        }
                    })
                )

                setRates(results)
            } catch (err) {
                console.error('FX error:', err)
                setRates([])
            } finally {
                setLoading(false)
            }
        }

        fetchRates()
    }, [])

    return { rates, loading }
}