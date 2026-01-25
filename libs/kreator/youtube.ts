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