// libs/komik/komikbox.ts

// const BASE = "https://api.sansekai.my.id/api/komik"
const BASE = "http://localhost:3000/api/komik"

/* ===============================
   DEFAULT HEADERS
=============================== */
const DEFAULT_HEADERS = {
    accept: "application/json",
    "User-Agent": "mytools-Komik/1.0",
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY as string,
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

export async function getKomikPopular(
    type: "manga" | "manhwa" | "manhua" = "manga"
) {
    const json = await fetchJSON<any>(
        `${BASE}/popular?tipe=${type}`,
        21600 // cache 6 jam
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikUpdated(
    type: "manga" | "manhwa" | "manhua" = "manga"
) {
    const json = await fetchJSON<any>(
        `${BASE}/updated?tipe=${type}`,
        1800 // cache 30 menit
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikGenres() {
    const json = await fetchJSON<any>(
        `${BASE}/genres`,
        86400 // cache 1 hari
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikGenresDetail(
    genre: string,
    tipe: "manga" | "manhwa" | "manhua" = "manga"
) {
    const json = await fetchJSON<any>(
        `${BASE}/genres/${encodeURIComponent(genre)}?tipe=${tipe}`,
        86400 // cache 1 hari
    )

    if (!json?.datas) return []
    return json.datas
}

export async function searchKomik(query: string) {
    if (!query) return []

    const json = await fetchJSON<any>(
        `${BASE}/search?q=${encodeURIComponent(query)}`,
        600 // cache 10 menit
    )
    console.log("Search Komik Result:", json)
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