export function parseNumber(v: string) {
  const n = Number(String(v).replace(/[^\d]/g, ''))
  return Number.isFinite(n) ? n : 0
}

export function clamp(n: number, min: number, max: number) {
  return Math.min(max, Math.max(min, n))
}

export function formatIDR(n: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(n || 0)
}

export type PlatformKey = 'youtube' | 'facebook' | 'instagram' | 'tiktok'

export const PLATFORM_CONFIG: Record<
  PlatformKey,
  {
    label: string
    rpmMin: number
    rpmMax: number
    defaultRpm: number
    note: string
  }
> = {
  youtube: {
    label: 'YouTube',
    rpmMin: 5000,
    rpmMax: 50000,
    defaultRpm: 15000,
    note:
      'RPM YouTube dipengaruhi niche, lokasi penonton, jenis iklan, dan season.',
  },
  facebook: {
    label: 'Facebook Reels',
    rpmMin: 3000,
    rpmMax: 30000,
    defaultRpm: 10000,
    note:
      'Penghasilan Facebook Reels tergantung bonus program dan negara audiens.',
  },
  instagram: {
    label: 'Instagram Reels',
    rpmMin: 2000,
    rpmMax: 20000,
    defaultRpm: 7000,
    note:
      'Instagram lebih sering menghasilkan dari brand deal dibanding iklan langsung.',
  },
  tiktok: {
    label: 'TikTok',
    rpmMin: 1000,
    rpmMax: 15000,
    defaultRpm: 5000,
    note:
      'TikTok Creator Fund & sponsor memengaruhi penghasilan aktual.',
  },
}