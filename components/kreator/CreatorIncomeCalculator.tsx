'use client'

import { PLATFORM_CONFIG, PlatformKey } from '@/libs/kreator/incomePreset'
import { useMemo, useState } from 'react'

function formatIDR(n: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n || 0)
}

function formatNumber(value: string) {
  const raw = value.replace(/\D/g, '')
  return raw.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

function parseNumber(value: string) {
  return Number(value.replace(/\./g, '')) || 0
}

function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export default function CreatorIncomeCalculator() {
  const [platform, setPlatform] = useState<PlatformKey>('youtube')
  const [viewsInput, setViewsInput] = useState('100.000')
  const [rpmInput, setRpmInput] = useState(
    PLATFORM_CONFIG.youtube.defaultRpm.toString()
  )
  const [period, setPeriod] = useState<'video' | 'week' | 'month'>('video')

  const cfg = PLATFORM_CONFIG[platform]

  const views = useMemo(() => parseNumber(viewsInput), [viewsInput])
  const rpm = useMemo(() => parseNumber(rpmInput), [rpmInput])

  const result = useMemo(() => {
    const v = clamp(views, 0, 1_000_000_000)
    const r = clamp(rpm, cfg.rpmMin, cfg.rpmMax)

    const perVideo = (v / 1000) * r
    const multiplier = period === 'video' ? 1 : period === 'week' ? 4 : 12

    return {
      perVideo,
      total: perVideo * multiplier,
      multiplier,
    }
  }, [views, rpm, period, cfg])

  return (
    <div className="space-y-6">
      {/* INPUT */}
      <div className="grid md:grid-cols-4 gap-4">
        <div>
          <label className="block text-sm font-medium">Platform</label>
          <select
            className="w-full border rounded p-2"
            value={platform}
            onChange={(e) => {
              const p = e.target.value as PlatformKey
              setPlatform(p)
              setRpmInput(
                PLATFORM_CONFIG[p].defaultRpm.toString()
              )
            }}
          >
            {Object.entries(PLATFORM_CONFIG).map(
              ([key, p]) => (
                <option key={key} value={key}>
                  {p.label}
                </option>
              )
            )}
          </select>
        </div>

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
        </div>

        <div>
          <label className="block text-sm font-medium">
            RPM (IDR / 1.000 views)
          </label>
          <input
            className="w-full border rounded p-2"
            inputMode="numeric"
            value={formatNumber(rpmInput)}
            onChange={(e) =>
              setRpmInput(formatNumber(e.target.value))
            }
          />
          <p className="text-xs text-gray-500 mt-1">
            Range wajar: {formatIDR(cfg.rpmMin)} –{' '}
            {formatIDR(cfg.rpmMax)}
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium">
            Periode
          </label>
          <select
            className="w-full border rounded p-2"
            value={period}
            onChange={(e) =>
              setPeriod(e.target.value as any)
            }
          >
            <option value="video">Per Video</option>
            <option value="week">Per Minggu</option>
            <option value="month">Per Bulan</option>
          </select>
        </div>
      </div>

      {/* RESULT */}
      <div className="bg-gray-50 border rounded-xl p-5 space-y-2">
        <p className="text-sm">
          Estimasi per video:{' '}
          <strong>
            {formatIDR(result.perVideo)}
          </strong>
        </p>
        <p className="text-sm">
          Estimasi total ({result.multiplier}×):{' '}
          <strong>{formatIDR(result.total)}</strong>
        </p>
        <p className="text-xs text-gray-500">
          {cfg.note}
        </p>
      </div>
    </div>
  )
}