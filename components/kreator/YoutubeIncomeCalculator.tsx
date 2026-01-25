'use client'

import { formatNumber, parseNumber } from '@/libs/format'
import { clamp, formatIDR } from '@/libs/kreator/youtube'
import { useMemo, useState } from 'react'

export default function YoutubeIncomeCalculator() {
    const [viewsInput, setViewsInput] = useState('100.000')
    const [rpmInput, setRpmInput] = useState('15.000')
    const [period, setPeriod] = useState<'video' | 'week' | 'month'>('video')

    const views = useMemo(() => parseNumber(viewsInput), [viewsInput])
    const rpm = useMemo(() => parseNumber(rpmInput), [rpmInput])

    const result = useMemo(() => {
        const v = clamp(views, 0, 1_000_000_000)
        const r = clamp(rpm, 0, 1_000_000_000)

        const perVideo = (v / 1000) * r
        const mult = period === 'video' ? 1 : period === 'week' ? 4 : 12

        return {
            perVideo,
            total: perVideo * mult,
            mult,
        }
    }, [views, rpm, period])

    return (
        <div className="space-y-5">
            <div className="grid md:grid-cols-3 gap-4">
                {/* VIEWS */}
                <div>
                    <label className="block text-sm font-medium">Views</label>
                    <input
                        className="w-full border rounded p-2"
                        inputMode="numeric"
                        value={viewsInput}
                        onChange={(e) =>
                            setViewsInput(formatNumber(e.target.value))
                        }
                        placeholder="Contoh: 100.000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        Total views yang ingin diestimasi.
                    </p>
                </div>

                {/* RPM */}
                <div>
                    <label className="block text-sm font-medium">
                        RPM (IDR / 1.000 views)
                    </label>
                    <input
                        className="w-full border rounded p-2"
                        inputMode="numeric"
                        value={rpmInput}
                        onChange={(e) =>
                            setRpmInput(formatNumber(e.target.value))
                        }
                        placeholder="Contoh: 15.000"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                        RPM = pendapatan bersih per 1.000 views.
                    </p>
                </div>

                {/* PERIOD */}
                <div>
                    <label className="block text-sm font-medium">Periode</label>
                    <select
                        className="w-full border rounded p-2"
                        value={period}
                        onChange={(e) => setPeriod(e.target.value as any)}
                    >
                        <option value="video">Per Video</option>
                        <option value="week">Per Minggu</option>
                        <option value="month">Per Bulan</option>
                    </select>
                </div>
            </div>

            {/* RESULT */}
            <div className="bg-gray-50 border rounded-xl p-4 space-y-2">
                <p className="text-sm">
                    Estimasi per video:{' '}
                    <strong>{formatIDR(result.perVideo)}</strong>
                </p>
                <p className="text-sm">
                    Estimasi total (× {result.mult}):{' '}
                    <strong>{formatIDR(result.total)}</strong>
                </p>
                <p className="text-xs text-gray-500">
                    Estimasi saja. Nilai aktual dipengaruhi niche, negara penonton,
                    jenis iklan, dan seasonality.
                </p>
            </div>
        </div>
    )
}