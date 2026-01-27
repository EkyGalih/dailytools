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
  } catch (err) {
    console.error('[Dramabox API Error]', url, err)
    return null
  } finally {
    clearTimeout(id)
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
    }

    const url =
        params.toString().length > 0
            ? `${BASE}${endpoint}?${params.toString()}`
            : `${BASE}${endpoint}`

    const json = await fetchJSON<any>(url, 1800)
    if (!json) return []
    if (Array.isArray(json)) return json
    if (Array.isArray(json?.data)) return json.data
    if (Array.isArray(json?.data?.list)) return json.data.list
    return []
}

export async function getDramaDetail(bookId: string) {
    const json = await fetchJSON<any>(
      `${BASE}/detail?bookId=${encodeURIComponent(bookId)}`,
      3600
    )
    if (json?.bookId) return json
    return null
}

export async function getDramaEpisodes(bookId: string) {
    const json = await fetchJSON<any[]>(
      `${BASE}/allepisode?bookId=${encodeURIComponent(bookId)}`,
      3600
    )
    return Array.isArray(json) ? json : []
}