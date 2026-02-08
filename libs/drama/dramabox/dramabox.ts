// libs/drama/dramabox.ts
const BASE = 'https://api.sansekai.my.id/api/dramabox'

const DEFAULT_HEADERS = {
  'accept': 'application/json',
  'User-Agent': 'Sansekai-Dramabox/1.0',
}

const DEFAULT_TIMEOUT = 8000

async function fetchJSON<T>(
  url: string,
  revalidate: number,
  timeout = DEFAULT_TIMEOUT
): Promise<T | null> {
  const controller = new AbortController()
  const id = setTimeout(() => controller.abort(), timeout)

  try {
    const res = await fetch(url, {
      next: { revalidate },
      headers: DEFAULT_HEADERS,
      signal: controller.signal,
    })

    if (!res.ok) return null

    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('application/json')) return null

    return res.json()
  } catch (err: any) {
    // AbortError is expected in Next.js SSR / navigation, ignore silently
    if (err?.name === 'AbortError' || err?.code === 20) {
      return null
    }

    console.error('[Dramabox API Error]', url, err)
    return null
  } finally {
    clearTimeout(id)
  }
}

async function fetchWithFallback<T>(
  url: string,
  revalidate: number
): Promise<T | null> {
  // 1️⃣ coba cache dulu
  const cached = await fetchJSON<T>(url, revalidate)
  if (cached) return cached

  // 2️⃣ fallback realtime (tanpa cache)
  try {
    const res = await fetch(url, {
      headers: DEFAULT_HEADERS,
      cache: 'no-store',
    })

    if (!res.ok) return null

    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('application/json')) return null

    return res.json()
  } catch (err) {
    console.error('[Dramabox Fallback Error]', url, err)
    return null
  }
}

export async function getDramaByCategory(
  slug: string,
  options?: {
    classify?: 'terbaru' | 'terpopuler'
  }
) {
  let endpoint = '/latest'
  const params = new URLSearchParams()

  switch (slug) {
    case 'dubindo':
      endpoint = '/dubindo'
      params.set('classify', options?.classify || 'terbaru') // default
      break

    case 'randomdrama':
      endpoint = '/randomdrama'
      break

    case 'foryou':
      endpoint = '/foryou'
      break

    case 'trending':
      endpoint = '/trending'
      break

    case 'latest':
      endpoint = '/latest'
      break

    case 'populersearch':
      endpoint = '/populersearch'
      break

    case 'vip':
      endpoint = '/vip'
      break
  }

  const url =
    params.toString().length > 0
      ? `${BASE}${endpoint}?${params.toString()}`
      : `${BASE}${endpoint}`

  const json = await fetchWithFallback<any>(url, 1800)

  if (!json) return []
  
  if (slug === 'vip') {
    if (Array.isArray(json?.columnVoList)) return json.columnVoList
    if (Array.isArray(json?.data?.columnVoList)) return json.data.columnVoList
    return []
  }

  if (Array.isArray(json)) return json
  if (Array.isArray(json?.data)) return json.data
  if (Array.isArray(json?.data?.list)) return json.data.list
  return []
}

export async function getDramaDetail(bookId: string) {
  const json = await fetchWithFallback<any>(
    `${BASE}/detail?bookId=${encodeURIComponent(bookId)}`,
    3600
  )
  if (json?.bookId) return json
  return null
}

export async function getDramaEpisodes(bookId: string) {
  const json = await fetchWithFallback<any[]>(
    `${BASE}/allepisode?bookId=${encodeURIComponent(bookId)}`,
    3600
  )
  return Array.isArray(json) ? json : []
}

export async function getDramaVIP() {
  const url = `${BASE}/vip`; // Endpoint menyesuaikan dengan server Sansekai Anda

  const json = await fetchWithFallback<any>(url, 3600); // Revalidate 1 jam

  if (!json) return [];

  // Berdasarkan struktur JSON yang Anda berikan:
  // Data utama berada di dalam columnVoList
  if (Array.isArray(json?.columnVoList)) {
    return json.columnVoList;
  }

  // Fallback jika dibungkus dalam properti data
  if (Array.isArray(json?.data?.columnVoList)) {
    return json.data.columnVoList;
  }

  return [];
}