import { apiFetch } from "@/libs/fetchApi"

// ✅ Base API URL (must be exposed to client)
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API

if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL_API belum di set di .env")
}

// ✅ These should match backend Redis TTL
const REVALIDATE_HOME = 86400       // 1 hari
const REVALIDATE_LIST = 21600       // 6 jam
const REVALIDATE_DETAIL = 3600      // 1 jam
const REVALIDATE_SEARCH = 600       // 10 menit
const REVALIDATE_EPISODE = 3600     // 1 jam

/**
 * ✅ Ambil semua series (default homepage)
 * GET /series
 */
export async function getHomePage() {
    try {
        const res = await apiFetch(
            `${BASE_URL}/drakorkita/homepage`,
            REVALIDATE_HOME
        );

        if (!res.ok) {
            console.error("Homepage fetch failed:", res.status);
            return null;
        }

        return res.json();
    } catch (err) {
        console.error("getHomePage error:", err);
        return null;
    }
}

/**
 * ✅ Ambil semua series (default homepage)
 * GET /series
 */
export async function getSeries(page: number = 1) {
    try {
        const res = await apiFetch(
            `${BASE_URL}/drakorkita/series?page=${page}`,
            REVALIDATE_LIST
        )

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("getSeries error:", err)
        return null
    }
}

/**
 * ✅ Ambil ongoing series
 * GET /series/ongoing
 */
export async function getOngoingSeries(page: number = 1) {
    try {
        const res = await apiFetch(`${BASE_URL}/drakorkita/series/ongoing?page=${page}`,
            REVALIDATE_LIST
        )

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("getOngoingSeries error:", err)
        return null
    }
}

/**
 * ✅ Ambil updated series
 * GET /series/updated
 */
export async function getUpdatedSeries(page: number = 1) {
    try {
        const res = await apiFetch(`${BASE_URL}/drakorkita/series/updated?page=${page}`, REVALIDATE_LIST)

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("getUpdatedSeries error:", err)
        return null
    }
}

/**
 * ✅ Ambil completed series
 * GET /series/completed
 */
export async function getCompletedSeries(page: number = 1) {
    try {
        const res = await apiFetch(
            `${BASE_URL}/drakorkita/series/completed?page=${page}`,
            REVALIDATE_LIST
        );

        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("getCompletedSeries error:", err);
        return null;
    }
}

/**
 * ✅ Detail drama
 * GET /detail/:slug
 */
export async function getDramaDetail(slug: string) {
    try {
        const res = await apiFetch(
            `${BASE_URL}/drakorkita/detail/${slug}`,
            REVALIDATE_DETAIL
        )

        if (!res.ok) {
            console.error("Detail fetch failed:", res.status)
            return null
        }

        return res.json()
    } catch (err) {
        console.error("getDramaDetail error:", err)
        return null
    }
}

/**
 * ✅ List movie
 * GET /movie
 */
export async function getMovies(page: number = 1) {
    try {
        const res = await apiFetch(`${BASE_URL}/drakorkita/movie?page=${page}`, REVALIDATE_LIST)

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("getMovies error:", err)
        return null
    }
}

/**
 * ✅ Movie terbaru
 * GET /movie/newest
 */
export async function getNewestMovies(page: number = 1) {
    try {
        const res = await apiFetch(`${BASE_URL}/drakorkita/movie/newest?page=${page}`, REVALIDATE_LIST)

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("getNewestMovies error:", err)
        return null
    }
}

/**
 * ✅ Semua genre
 * GET /genres
 */
export async function getGenres() {
    try {
        const res = await apiFetch(`${BASE_URL}/drakorkita/genres`, REVALIDATE_HOME)

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("getGenres error:", err)
        return null
    }
}


/**
 * ✅ Drama berdasarkan genre
 * GET /genres/:genre
 */
export async function getDramaByGenre(
    genre: string,
    page: number = 1
) {
    if (!genre) return null

    try {
        const res = await apiFetch(
            `${BASE_URL}/drakorkita/genres/${encodeURIComponent(genre)}?page=${page}`,
            REVALIDATE_HOME
        )

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("getDramaByGenre error:", err)
        return null
    }
}

/**
 * ✅ Search drama
 * GET /search?query=
 */
export async function searchDrama(query: string, page: number = 1) {
    if (!query) return null

    try {
        const res = await apiFetch(
            `${BASE_URL}/drakorkita/search?q=${encodeURIComponent(query)}&page=${page}`,
            REVALIDATE_SEARCH
        )

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("searchDrama error:", err)
        return null
    }
}

/**
 * ✅ Ambil resolusi video per episode (lazy load)
 * GET /episode/:id?tag=tv
 */
export async function getEpisodeResolutions(
    episodeId: string,
    tag: string
) {
    if (!episodeId || !tag) return null

    // ✅ Fetch ke API frontend sendiri (NO CORS)
    const res = await fetch(
        `/api/drakorkita/episode/${episodeId}?tag=${encodeURIComponent(tag)}`
    )

    if (!res.ok) return null

    return res.json()
}

/**
 * ✅ Safe episode loader (prevents flooding requests)
 * Only call this when user clicks Play.
 */
export async function loadEpisodeOnce(
    episodeId: string,
    tag: string,
    alreadyLoaded: boolean
) {
    if (alreadyLoaded) return null

    return getEpisodeResolutions(episodeId, tag)
}