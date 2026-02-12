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

/**
 * ✅ Ambil semua series (default homepage)
 * GET /series
 */
export async function getHomePage() {
    const res = await apiFetch(
        `${BASE_URL}/drakorkita/homepage`,
        { revalidate: REVALIDATE_HOME }
    )
    return res.ok ? res.json() : null
}

/**
 * ✅ Ambil semua series (default homepage)
 * GET /series
 */
export async function getSeries(page = 1) {
    const res = await apiFetch(
        `${BASE_URL}/drakorkita/series?page=${page}`,
        { revalidate: REVALIDATE_LIST }
    )
    return res.ok ? res.json() : null
}

/**
 * ✅ Ambil ongoing series
 * GET /series/ongoing
 */
export async function getOngoingSeries(page = 1) {
    const res = await apiFetch(
        `${BASE_URL}/drakorkita/series/ongoing?page=${page}`,
        { revalidate: REVALIDATE_LIST }
    )
    return res.ok ? res.json() : null
}

/**
 * ✅ Ambil updated series
 * GET /series/updated
 */
export async function getUpdatedSeries(page = 1) {
    const res = await apiFetch(
        `${BASE_URL}/drakorkita/series/updated?page=${page}`,
        { revalidate: REVALIDATE_LIST }
    )
    return res.ok ? res.json() : null
}

/**
 * ✅ Ambil completed series
 * GET /series/completed
 */
export async function getCompletedSeries(page = 1) {
    const res = await apiFetch(
        `${BASE_URL}/drakorkita/series/completed?page=${page}`,
        { revalidate: REVALIDATE_LIST }
    )
    return res.ok ? res.json() : null
}

/**
 * ✅ Detail drama
 * GET /detail/:slug
 */
export async function getDramaDetail(slug: string) {
    if (!slug) return null

    const res = await apiFetch(
        `${BASE_URL}/drakorkita/detail/${slug}`,
        { revalidate: REVALIDATE_DETAIL }
    )
    return res.ok ? res.json() : null
}

/**
 * ✅ List movie
 * GET /movie
 */
export async function getMovies(page = 1) {
    const res = await apiFetch(
        `${BASE_URL}/drakorkita/movie?page=${page}`,
        { revalidate: REVALIDATE_LIST }
    )
    return res.ok ? res.json() : null
}

/**
 * ✅ Movie terbaru
 * GET /movie/newest
 */
export async function getNewestMovies(page = 1) {
    const res = await apiFetch(
        `${BASE_URL}/drakorkita/movie/newest?page=${page}`,
        { revalidate: REVALIDATE_LIST }
    )
    return res.ok ? res.json() : null
}

/**
 * ✅ Semua genre
 * GET /genres
 */
export async function getGenres() {
    const res = await apiFetch(
        `${BASE_URL}/drakorkita/genres`,
        { revalidate: REVALIDATE_HOME }
    )
    return res.ok ? res.json() : null
}


/**
 * ✅ Drama berdasarkan genre
 * GET /genres/:genre
 */
export async function getDramaByGenre(genre: string, page = 1) {
    if (!genre) return null

    const res = await apiFetch(
        `${BASE_URL}/drakorkita/genres/${encodeURIComponent(genre)}?page=${page}`,
        { revalidate: REVALIDATE_LIST }
    )
    return res.ok ? res.json() : null
}

/**
 * ✅ Search drama
 * GET /search?query=
 */
export async function searchDrama(query: string, page = 1) {
    if (!query) return null

    const res = await apiFetch(
        `${BASE_URL}/drakorkita/search?q=${encodeURIComponent(query)}&page=${page}`,
        { revalidate: REVALIDATE_SEARCH }
    )
    return res.ok ? res.json() : null
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

    const res = await apiFetch(
        `${BASE_URL}/drakorkita/episode/${episodeId}?tag=${encodeURIComponent(tag)}`,
        { noStore: true }
    )

    return res.ok ? res.json() : null
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