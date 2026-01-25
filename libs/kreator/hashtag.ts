const COMMON = {
  tiktok: ['fyp', 'foryou', 'viral', 'tiktokindonesia', 'kontencreator'],
  instagram: ['reels', 'explore', 'viral', 'indonesia', 'contentcreator'],
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '')
}

export function buildHashtags(topic: string, platform: 'tiktok' | 'instagram', count: number) {
  const words = topic
    .toLowerCase()
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 6)

  const base = words.map((w) => `#${slugify(w)}`).filter((t) => t.length > 2)

  // kombinasi
  const combos: string[] = []
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      combos.push(`#${slugify(words[i] + words[j])}`)
    }
  }

  const common = COMMON[platform].map((t) => `#${t}`)

  const all = [...new Set([...base, ...combos, ...common])]
  return all.slice(0, Math.max(5, Math.min(30, count)))
}