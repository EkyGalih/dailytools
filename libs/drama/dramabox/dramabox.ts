// libs/drama/dramabox.ts
const BASE = 'https://api.sansekai.my.id/api/dramabox'

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

    const res = await fetch(url, {
        next: { revalidate: 1800 },
    })

    // guard JSON
    const ct = res.headers.get('content-type') || ''
    if (!ct.includes('application/json')) return []

    const json = await res.json()

    // 🔑 NORMALISASI
    if (Array.isArray(json)) return json
    if (Array.isArray(json?.data)) return json.data
    if (Array.isArray(json?.data?.list)) return json.data.list

    return []
}

export async function getDramaDetail(bookId: string) {
    const url = `${BASE}/detail?bookId=${encodeURIComponent(bookId)}`

    let res: Response
    try {
        res = await fetch(url, {
            cache: 'no-store', // ⛔ WAJIB
            headers: {
                'accept': 'application/json',
            },
        })
    } catch (err) {
        console.error('Dramabox detail fetch FAILED:', err)
        return null
    }

    if (!res.ok) {
        console.error('Dramabox detail status error:', res.status, url)
        return null
    }

    const raw = await res.text()

    if (!raw || raw.trim().length === 0) {
        console.error('Dramabox detail EMPTY body:', url)
        return null
    }

    if (raw.trim().startsWith('<')) {
        console.error('Dramabox detail HTML response:', raw.slice(0, 120))
        return null
    }

    try {
        const json = JSON.parse(raw)
        if (json?.bookId) return json
        return null
    } catch (e) {
        console.error('Dramabox detail JSON parse error:', raw.slice(0, 200))
        return null
    }
}

export async function getDramaEpisodes(bookId: string) {
    const url = `${BASE}/allepisode?bookId=${encodeURIComponent(bookId)}`

    const res = await fetch(url, {
        next: { revalidate: 3600 },
    })

    if (!res.ok) return []

    const json = await res.json()
    return Array.isArray(json) ? json : []
}