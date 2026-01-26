// libs/drama/youtube.ts
export type YtVideoItem = {
  id: { videoId?: string } | string
  snippet: {
    title: string
    description: string
    channelTitle: string
    publishedAt: string
    thumbnails: {
      high?: { url: string; width: number; height: number }
      medium?: { url: string; width: number; height: number }
      default?: { url: string; width: number; height: number }
    }
  }
}

export type YtSearchResponse = {
  items?: YtVideoItem[]
}

const YT_SEARCH = 'https://www.googleapis.com/youtube/v3/search'
const YT_VIDEOS = 'https://www.googleapis.com/youtube/v3/videos'

function getKey() {
  const key = process.env.YOUTUBE_API_KEY
  if (!key) throw new Error('YOUTUBE_API_KEY belum diset di .env')
  return key
}

function daysAgoISO(days: number) {
  const d = new Date()
  d.setDate(d.getDate() - days)
  return d.toISOString()
}

function pickThumb(v: YtVideoItem) {
  return (
    v.snippet.thumbnails.high?.url ||
    v.snippet.thumbnails.medium?.url ||
    v.snippet.thumbnails.default?.url ||
    ''
  )
}

export function getVideoId(v: YtVideoItem) {
  if (typeof v.id === 'string') return v.id
  return v.id.videoId || ''
}

/**
 * Trending harian "otomatis" versi YouTube Data API:
 * - kita cari video dengan query viral
 * - order=viewCount
 * - publishedAfter (misal 7 hari terakhir)
 */
export async function getTrendingDramaChina(opts?: {
  q?: string
  maxResults?: number
  days?: number
}) {
  const key = getKey()
  const q = opts?.q ?? 'chinese drama short reelshort episode'
  const maxResults = Math.min(Math.max(opts?.maxResults ?? 18, 1), 24)
  const days = Math.min(Math.max(opts?.days ?? 7, 1), 30)

  const url =
    `${YT_SEARCH}?part=snippet&type=video` +
    `&maxResults=${maxResults}` +
    `&order=viewCount` +
    `&publishedAfter=${encodeURIComponent(daysAgoISO(days))}` +
    `&regionCode=ID` +
    `&safeSearch=none` +
    `&q=${encodeURIComponent(q)}` +
    `&key=${encodeURIComponent(key)}`

  const res = await fetch(url, { next: { revalidate: 60 * 60 } }) // cache 1 jam
  const data: YtSearchResponse = await res.json()
  const items = (data.items ?? []).filter((v) => getVideoId(v))
  return items.map((v) => ({ ...v, __thumb: pickThumb(v), __videoId: getVideoId(v) }))
}

export type CategorySlug =
  | 'romance'
  | 'ceo'
  | 'revenge'
  | 'timetravel'
  | 'fantasy'
  | 'family'
  | 'youth'
  | 'historical'
  | 'mystery'

export const DRAMA_CATEGORIES: Array<{
  slug: CategorySlug
  name: string
  query: string
}> = [
  { slug: 'romance', name: 'Romance', query: 'chinese drama romance short' },
  { slug: 'ceo', name: 'CEO / Boss', query: 'chinese drama ceo boss short' },
  { slug: 'revenge', name: 'Revenge', query: 'chinese drama revenge short' },
  { slug: 'timetravel', name: 'Time Travel', query: 'chinese drama time travel short' },
  { slug: 'fantasy', name: 'Fantasy', query: 'chinese drama fantasy short' },
  { slug: 'family', name: 'Family', query: 'chinese drama family short' },
  { slug: 'youth', name: 'Youth', query: 'chinese drama youth school short' },
  { slug: 'historical', name: 'Historical', query: 'chinese historical drama short' },
  { slug: 'mystery', name: 'Mystery', query: 'chinese drama mystery thriller short' },
]

export function getCategory(slug: string) {
  return DRAMA_CATEGORIES.find((c) => c.slug === slug)
}

export async function getCategoryVideos(slug: string, maxResults = 18) {
  const cat = getCategory(slug)
  const q = cat?.query ?? 'chinese drama short'
  return getTrendingDramaChina({ q, maxResults, days: 30 })
}

export async function getRelatedVideos(title: string, maxResults = 10) {
  const key = getKey()
  // Cari berdasarkan judul drama, bukan ID video
  const url =
    `${YT_SEARCH}?part=snippet&type=video` +
    `&maxResults=${maxResults}` +
    `&q=${encodeURIComponent(title)}` + // Gunakan judul
    `&key=${encodeURIComponent(key)}`

  const res = await fetch(url, { next: { revalidate: 3600 } })
  const data: YtSearchResponse = await res.json()
  const items = (data.items ?? []).filter((v) => getVideoId(v))
  return items.map((v) => ({ ...v, __thumb: pickThumb(v), __videoId: getVideoId(v) }))
}

export type VideoDetail = {
  id: string
  snippet?: {
    title?: string
    description?: string
    channelTitle?: string
    publishedAt?: string
    thumbnails?: { high?: { url: string } }
  }
}

export async function getVideoDetail(videoId: string) {
  const key = getKey()
  const url =
    `${YT_VIDEOS}?part=snippet&id=${encodeURIComponent(videoId)}` +
    `&key=${encodeURIComponent(key)}`

  const res = await fetch(url, { next: { revalidate: 60 * 60 } })
  const data = (await res.json()) as { items?: VideoDetail[] }
  return data.items?.[0] ?? null
}