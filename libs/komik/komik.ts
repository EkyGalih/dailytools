// libs/komik/komikbox.ts

const BASE = "https://api.sansekai.my.id/api/komik"

/* ===============================
   DEFAULT HEADERS
=============================== */
const DEFAULT_HEADERS = {
    accept: "application/json",
    "User-Agent": "Sansekai-Komik/1.0",
}

const DEFAULT_TIMEOUT = 8000

/* ===============================
   FETCH JSON HELPER
=============================== */
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

        const ct = res.headers.get("content-type") || ""
        if (!ct.includes("application/json")) return null

        return res.json()
    } catch (err) {
        console.error("[Komik API Error]", url, err)
        return null
    } finally {
        clearTimeout(id)
    }
}

export async function getKomikRecommended(
    type: "manga" | "manhwa" | "manhua" = "manga"
) {
    const json = await fetchJSON<any>(
        `${BASE}/recommended?type=${type}`,
        21600 // cache 6 jam
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikLatest(
    type: "project" | "mirror" = "project"
) {
    const json = await fetchJSON<any>(
        `${BASE}/latest?type=${type}`,
        1800 // cache 30 menit
    )

    if (!json?.data) return []
    return json.data
}

export async function searchKomik(query: string) {
    if (!query) return []

    const json = await fetchJSON<any>(
        `${BASE}/search?query=${encodeURIComponent(query)}`,
        600 // cache 10 menit
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikPopular() {
    const json = await fetchJSON<any>(
        `${BASE}/popular`,
        3600 // cache 1 jam
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikDetail(mangaId: string) {
    if (!mangaId) return null

    const json = await fetchJSON<any>(
        `${BASE}/detail?manga_id=${encodeURIComponent(mangaId)}`,
        21600 // cache 6 jam
    )
    
    if (!json?.data?.manga_id) return null
    return json
}

export async function getKomikChapterList(mangaId: string) {
    if (!mangaId) return []

    const json = await fetchJSON<any>(
        `${BASE}/chapterlist?manga_id=${encodeURIComponent(mangaId)}`,
        21600 // cache 6 jam
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikImages(chapterId: string) {
    if (!chapterId) return []

    const json = await fetchJSON<any>(
        `${BASE}/getimage?chapter_id=${encodeURIComponent(chapterId)}`,
        86400 // cache 1 hari (gambar jarang berubah)
    )

    if (!json?.data) return []
    return json.data
}