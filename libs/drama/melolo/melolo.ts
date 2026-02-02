// libs/drama/melolo.ts
const BASE = "https://api.sansekai.my.id/api/melolo"

const DEFAULT_HEADERS = {
    accept: "application/json",
    "User-Agent": "Sansekai-Netshort/1.0",
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

        const ct = res.headers.get("content-type") || ""
        if (!ct.includes("application/json")) return null

        return res.json()
    } catch (err) {
        console.error("[Melolo API Error]", url, err)
        return null
    } finally {
        clearTimeout(id)
    }
}

export async function getMeloloLatest(offset = 0) {
    const url = `${BASE}/latest?offset=${offset}`

    const json = await fetchJSON<any>(
        url,
        1800
    )

    if (!json) return []

    // ✅ Struktur API Melolo trending pakai "books"
    if (Array.isArray(json?.books)) {
        return json.books
    }

    return []
}

export async function getMeloloTrending() {
    const json = await fetchJSON<any>(`${BASE}/trending`, 1800)

    if (!json) return []

    // ✅ Struktur API Melolo trending pakai "books"
    if (Array.isArray(json?.books)) {
        return json.books
    }

    return []
}

// libs/drama/melolo/melolo.ts

export async function searchMelolo(query: string) {
    try {
        const response = await fetch(
            `${BASE}/search?query=${encodeURIComponent(query)}&limit=10`,
            { next: { revalidate: 3600 } } // Cache 1 jam
        );

        if (!response.ok) return [];

        const result = await response.json();

        // Kita perlu mengambil semua 'books' dari setiap item di 'search_data'
        const rawData = result?.data?.search_data || [];

        // Melakukan flattening agar menjadi array buku yang siap pakai
        const flattenedBooks = rawData.flatMap((item: any) => item.books || []);

        return flattenedBooks;
    } catch (error) {
        console.error("Melolo Search Error:", error);
        return [];
    }
}


export async function getMeloloDetail(bookId: string) {
    try {
        const res = await fetch(
            `${BASE}/detail?bookId=${bookId}`,
            {
                cache: "no-store",
            }
        )

        if (!res.ok) throw new Error("Gagal fetch detail Melolo")

        // ✅ Return JSON mentah
        return await res.json()
    } catch (error) {
        console.error("getMeloloDetail error:", error)
        return null
    }
}

export async function getMeloloStream(videoId: string) {
    if (!videoId) return null

    const url = `${BASE}/stream?videoId=${encodeURIComponent(videoId)}`

    const json = await fetchJSON<any>(url, 600)

    if (!json || json.code !== 0) return null

    return json.data || null
}