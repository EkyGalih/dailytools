import { apiFetch } from "@/libs/fetchApi";

/* ===============================
   ✅ Base API URL (Client Safe)
=============================== */
const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL_API;

if (!BASE_URL) {
    throw new Error("NEXT_PUBLIC_BASE_URL_API belum di set di .env");
}

/* ===============================
   ✅ TTL Revalidate (match Redis)
=============================== */
const REVALIDATE_HOME = 86400; // 1 hari
const REVALIDATE_LIST = 21600; // 6 jam
const REVALIDATE_DETAIL = 3600; // 1 jam
const REVALIDATE_SEARCH = 600; // 10 menit
const REVALIDATE_EPISODE = 3600; // 1 jam

/* ============================================================
   ✅ OTAKUDESU API SERVICES
============================================================ */

/**
 * ✅ Homepage Otakudesu
 * GET /anime/homepage
 */
export async function getAnimeHomePage() {
    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/homepage`,
            REVALIDATE_HOME
        );

        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("getAnimeHomePage error:", err);
        return null;
    }
}

/**
 * ✅ Full Anime List A-Z
 * GET /anime/list
 */
/**
 * ✅ Anime List (Letter + Pagination)
 * GET /anime/list?letter=A&page=1
 */
export async function getAnimeList() {
    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/list-anime`,
            REVALIDATE_LIST // cache 6 jam
        );

        if (!res.ok) return null;

        return await res.json();
    } catch (err) {
        console.error("getAnimeList error:", err);
        return null;
    }
}

/**
 * ✅ Detail Anime
 * GET /anime/anime/:slug
 */
export async function getAnimeDetail(slug: string) {
    if (!slug) return null;

    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/detail/${slug}`,
            REVALIDATE_DETAIL
        );

        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("getAnimeAnimeDetail error:", err);
        return null;
    }
}

/**
 * ✅ Episode Streaming + Download Links
 * GET /anime/episode/:slug
 */
export async function getAnimeEpisodeDetail(slug: string) {
    if (!slug) return null;

    try {
        const res = await fetch(`/api/anime/streaming/${slug}`);

        if (!res.ok) return null;

        return res.json();
    } catch (err) {
        console.error("getAnimeEpisodeDetail error:", err);
        return null;
    }
}

/**
 * ✅ Genre List (All Genres)
 * GET /anime/genres
 */
export async function getAnimeGenres() {
    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/genres`,
            REVALIDATE_HOME
        );

        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("getAnimeGenres error:", err);
        return null;
    }
}

/**
 * ✅ Anime by Genre + Pagination
 * GET /anime/genres/:genre?page=
 */
export async function getAnimeAnimeByGenre(
    genre: string,
    page: number = 1
) {
    if (!genre) return null;

    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/genres/${encodeURIComponent(
                genre
            )}?page=${page}`,
            REVALIDATE_LIST
        );

        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("getAnimeAnimeByGenre error:", err);
        return null;
    }
}

/**
 * ✅ Search Anime
 * GET /anime/search?q=
 */
export async function searchAnime(query: string, page: number = 1) {
    if (!query) return null

    try {
        const res = await fetch(
            `/api/anime/search?q=${encodeURIComponent(query)}&page=${page}`
        )

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("searchAnime error:", err)
        return null
    }
}

/**
 * ✅ Safe Episode Loader (Lazy Load)
 * Prevent flooding request
 */
export async function loadEpisodeOnce(
    slug: string,
    alreadyLoaded: boolean
) {
    if (alreadyLoaded) return null;

    return getAnimeEpisodeDetail(slug);
}