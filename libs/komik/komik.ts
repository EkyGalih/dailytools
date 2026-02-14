// libs/komik/komikbox.ts

const BASE = "https://api.sansekai.my.id/api/komik"
/* ===============================
   DEFAULT HEADERS
=============================== */
const DEFAULT_HEADERS = {
    accept: "application/json",
    "User-Agent": "mytools-Komik/1.0"
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

export async function getKomikRecomended(
    type: "manga" | "manhwa" | "manhua" = "manga"
) {
    const json = await fetchJSON<any>(
        `${BASE}/recommended?type=${type}`,
        259200 // cache 3 hari
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikUpdated(
    type: "project" | "mirror" = "project"
) {
    const json = await fetchJSON<any>(
        `${BASE}/latest?type=${type}`, // FIXED (type bukan tipe)
        1800
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikPopular(page: number = 1) {
    try {
        const res = await fetch(
            `${BASE}/popular?page=${page}`,
            {
                next: { revalidate: 1800 } // cache 30 menit
            }
        )

        if (!res.ok) {
            throw new Error("Failed to fetch popular")
        }

        const json = await res.json()

        if (json?.retcode !== 0) {
            throw new Error("API returned error")
        }

        return {
            data: Array.isArray(json.data) ? json.data : [],
            meta: json.meta ?? null,
        }

    } catch (error) {
        console.error("getKomikPopular error:", error)
        return {
            data: [],
            meta: null,
        }
    }
}

// export async function getKomikGenres() {
//     const json = await fetchJSON<any>(
//         `${BASE}/genres`,
//         86400 // cache 1 hari
//     )

//     if (!json?.data) return []
//     return json.data
// }

// export async function getKomikGenresDetail(
//     genre: string,
//     tipe: "manga" | "manhwa" | "manhua" = "manga"
// ) {
//     const json = await fetchJSON<any>(
//         `${BASE}/genres/${encodeURIComponent(genre)}?tipe=${tipe}`,
//         86400 // cache 1 hari
//     )

//     if (!json?.datas) return []
//     return json.datas
// }

export async function searchKomik(query: string) {
    if (!query) return []

    const res = await fetch(
        `${BASE}/search?query=${encodeURIComponent(query)}`,
        {
            next: { revalidate: 600 }
        }
    )

    if (!res.ok) return []

    const json = await res.json()

    return json?.data || []
}

export async function getKomikDetail(manga_id: string) {
    if (!manga_id) return null

    const res = await fetch(
        `${BASE}/detail?manga_id=${encodeURIComponent(manga_id)}`,
        {
            next: { revalidate: 21600 },
        }
    )

    if (!res.ok) return null

    return res.json()
}

export async function getKomikChapterList(endpoint: string) {
    if (!endpoint) return []

    const json = await fetchJSON<any>(
        `${BASE}/chapterList?manga_id=${encodeURIComponent(endpoint)}`,
        21600 // cache 6 jam
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikImages(chapterId: string) {
    if (!chapterId) return null

    const json = await fetchJSON<any>(
        `${BASE}/getimage?chapter_id=${encodeURIComponent(chapterId)}`,
        86400
    )

    if (!json?.data) return null
    return json.data
}