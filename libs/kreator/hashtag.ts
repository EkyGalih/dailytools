type Platform = 'tiktok' | 'instagram' | 'facebook' | 'youtube'

const COMMON: Record<Platform, string[]> = {
  tiktok: ['fyp', 'foryou', 'viral', 'tiktokindonesia', 'kontenkreator'],
  instagram: ['reels', 'explore', 'viral', 'indonesia', 'kontenkreator'],
  facebook: ['facebookreels', 'kontenviral', 'creatorindonesia'],
  youtube: ['shorts', 'youtubeshorts', 'creatorindonesia'],
}

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '')
}

function shuffle<T>(arr: T[]) {
  return [...arr].sort(() => Math.random() - 0.5)
}

export function buildHashtags(
  topic: string,
  platform: Platform,
  count: number
) {
  const safeCount = Math.max(5, Math.min(count, 30))

  const words = topic
    .toLowerCase()
    .split(/[\s,]+/)
    .filter(Boolean)
    .slice(0, 6)

  // 1️⃣ hashtag dasar
  const base = words.map((w) => `#${slugify(w)}`)

  // 2️⃣ kombinasi 2 kata
  const combos: string[] = []
  for (let i = 0; i < words.length; i++) {
    for (let j = i + 1; j < words.length; j++) {
      combos.push(`#${slugify(words[i] + words[j])}`)
    }
  }

  // 3️⃣ variasi kreator
  const variants = words.flatMap((w) => [
    `#tips${slugify(w)}`,
    `#belajar${slugify(w)}`,
    `#${slugify(w)}indonesia`,
  ])

  // 4️⃣ hashtag platform
  const common = COMMON[platform].map((t) => `#${t}`)

  // 5️⃣ gabung & unik
  let pool = Array.from(
    new Set([...base, ...combos, ...variants, ...common])
  )

  // 🔥 6️⃣ PADDING AGAR JUMLAH TERPENUHI
  const fillers = [
    'daily',
    'tips',
    'viral',
    'trend',
    'update',
    'content',
    'creator',
    'story',
  ]

  let i = 0
  while (pool.length < safeCount) {
    pool.push(`#${slugify(topic)}${fillers[i % fillers.length]}`)
    i++
  }

  // 7️⃣ acak + ambil sesuai jumlah
  return shuffle(pool).slice(0, safeCount)
}