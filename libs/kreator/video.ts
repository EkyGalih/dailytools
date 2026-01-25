export function sizeFromBitrate(bitrateMbps: number, durationSec: number) {
  const bitrateBits = Math.max(0, bitrateMbps) * 1_000_000 // bit/s
  const bytes = (bitrateBits * Math.max(0, durationSec)) / 8
  return Math.round(bytes)
}

export function formatBytes(bytes: number) {
  const b = Math.max(0, bytes)
  const units = ['B', 'KB', 'MB', 'GB']
  let n = b
  let i = 0
  while (n >= 1024 && i < units.length - 1) {
    n /= 1024
    i++
  }
  return `${n.toFixed(i === 0 ? 0 : 2)} ${units[i]}`
}