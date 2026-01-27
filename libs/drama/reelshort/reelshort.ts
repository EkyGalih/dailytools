// libs/reelshort.ts

const BASE_URL = 'https://api.sansekai.my.id/api/reelshort'

/* =========================
   TYPES (OPSIONAL TAPI DISARANKAN)
========================= */

export type ReelShortHomeResponse = {
    success: boolean
    data?: {
        lists: any[]
    }
}

export type ReelShortDetailResponse = {
    success: boolean
    bookId: string
    title: string
    cover: string
    description: string
    totalEpisodes: number
    chapters: {
        index: number
        chapterId: string
        title: string
        isLocked: boolean
    }[]
}

/* =========================
   FETCH HELPERS
========================= */

async function fetchJSON<T>(
    url: string,
    revalidate: number = 300 // default 5 menit
): Promise<T | null> {
    try {
        const res = await fetch(url, {
            next: { revalidate },
            headers: {
                'User-Agent': 'Sansekai-ReelShort/1.0',
            },
        })

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error('[ReelShort API Error]', url, err)
        return null
    }
}

/* =========================
   API FUNCTIONS
========================= */

// 🔥 HOMEPAGE
export async function getReelShortHomepage() {
    return fetchJSON<ReelShortHomeResponse>(
        `${BASE_URL}/homepage`,
        600
    )
}

// 📘 DETAIL (INFO + EP LIST)
export async function getReelShortDetail(bookId: string) {
    if (!bookId) return null

    return fetchJSON<ReelShortDetailResponse>(
        `${BASE_URL}/detail?bookId=${bookId}`,
        3600 // 1 jam
    )
}

// 📚 ALL EPISODE
export async function getReelShortAllEpisode(bookId: string) {
    if (!bookId) return null

    return fetchJSON(
        `${BASE_URL}/allepisode?bookId=${bookId}`,
        3600
    )
}

// ▶️ SINGLE EPISODE
export async function getReelShortEpisode(
    bookId: string,
    episodeNumber: number
) {
    if (!bookId || !episodeNumber) return null

    return fetchJSON(
        `${BASE_URL}/episode?bookId=${bookId}&episodeNumber=${episodeNumber}`,
        1800 // 30 menit
    )
}

// 🔍 SEARCH
export async function searchReelShort(query: string) {
    if (!query) return null

    return fetchJSON(
        `${BASE_URL}/search?query=${encodeURIComponent(query)}`,
        120 // 2 menit
    )
}

export function pickReelShortVideoUrl(ep: any): string {
    if (!ep?.videoList || ep.videoList.length === 0) return ''

    // PRIORITAS:
    // 1. H264 + 720p
    // 2. 720p apa saja
    // 3. fallback pertama
    const h264 = ep.videoList.find(
        (v: any) => v.encode === 'H264' && v.quality === 720
    )

    if (h264) return h264.url

    const hd = ep.videoList.find((v: any) => v.quality === 720)
    if (hd) return hd.url

    return ep.videoList[0]?.url ?? ''
}