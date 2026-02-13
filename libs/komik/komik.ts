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
    console.log(json);
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
        `/api/komik/search?q=${encodeURIComponent(query)}`,
        600
    )

    if (!json?.datas) return []

    return json.datas
}

export async function getKomikDetail(endpoint: string) {
    if (!endpoint) return null

    const json = await fetchJSON<any>(
        `${BASE}/detail/${encodeURIComponent(endpoint)}`,
        21600 // cache 6 jam
    )

    if (!json?.data?.endpoint) return null
    return json
}

export async function getKomikChapterList(endpoint: string) {
    if (!endpoint) return []

    const json = await fetchJSON<any>(
        `${BASE}/chapter/${encodeURIComponent(endpoint)}`,
        21600 // cache 6 jam
    )

    if (!json?.data) return []
    return json.data
}

export async function getKomikImages(chapterId: string) {
    if (!chapterId) return []

    const json = await fetchJSON<any>(
        `${BASE}/chapter/${encodeURIComponent(chapterId)}`,
        86400 // cache 1 hari (gambar jarang berubah)
    )

    if (!json?.data) return []
    return json.data
}