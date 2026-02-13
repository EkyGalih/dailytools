import { apiFetch } from "@/libs/fetchApi";

/* ===============================
   ✅ Base API URL (Client Safe)
=============================== */
const BASE_URL = 'https://api.sansekai.my.id/api';

if (!BASE_URL) {
    console.error("BASE_URL_API belum diset");
}

/* ============================================================
   ✅ OTAKUDESU API SERVICES
============================================================ */

/**
 * ✅ Anime Latest
 * GET /anime/latest
 */
export async function getAnimeLatest() {
    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/latest`,
            { revalidate: 86400 }
        );

        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("getAnimeLatest error:", err);
        return null;
    }
}

export async function getAnimeRecomended(page: number = 1) {
    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/recommended?page=${page}`,
            { revalidate: 86400 }
        );

        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("getAnimeRecomended error:", err);
        return null;
    }
}

export async function getAnimeMovie() {
    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/movie`,
            { revalidate: 86400 }
        );

        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("getAnimeMovie error:", err);
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
// export async function getAnimeList() {
//     try {
//         const res = await apiFetch(
//             `${BASE_URL}/anime/list-anime`,
//             { revalidate: 21600 }
//         );

//         if (!res.ok) return null;
//         return res.json();
//     } catch (err) {
//         console.error("getAnimeList error:", err);
//         return null;
//     }
// }

/**
 * ✅ Jadwal Rilis Anime Ongoing
 * GET /anime/schedule
 */
// export async function getAnimeSchedule() {
//     try {
//         const res = await apiFetch(
//             `${BASE_URL}/anime/jadwal`,
//             { revalidate: 21600 }
//         );

//         if (!res.ok) return null;
//         return res.json();
//     } catch (err) {
//         console.error("getAnimeSchedule error:", err);
//         return null;
//     }
// }

/**
 * ✅ Detail Anime
 * GET /anime/anime/:slug
 */
export async function getAnimeDetail(slug: string) {
    if (!slug) return null;

    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/detail?urlId=${slug}`,
            { revalidate: 3600 }
        );

        if (!res.ok) return null;

        const json = await res.json();

        return json?.data?.[0] || null; // ambil object pertama
    } catch (err) {
        console.error("getAnimeDetail error:", err);
        return null;
    }
}

/**
 * ✅ Episode Streaming + Download Links
 * GET /anime/episode/:slug
 */
export async function getAnimeEpisodeDetail(slug: string) {
    const res = await fetch(`/api/anime/streaming/${slug}`, {
        cache: "no-store"
    });

    if (!res.ok) return null;

    return res.json();
}

/**
 * ✅ Genre List (All Genres)
 * GET /anime/genres
 */
// export async function getAnimeGenres() {
//     try {
//         const res = await apiFetch(
//             `${BASE_URL}/anime/genres`,
//             { revalidate: 86400 }
//         );

//         if (!res.ok) return null;
//         return res.json();
//     } catch (err) {
//         console.error("getAnimeGenres error:", err);
//         return null;
//     }
// }

/**
 * ✅ Anime by Genre + Pagination
 * GET /anime/genres/:genre?page=
 */
// export async function getAnimeAnimeByGenre(
//     genre: string,
//     page: number = 1
// ) {
//     if (!genre) return null;

//     try {
//         const res = await apiFetch(
//             `${BASE_URL}/anime/genres/${encodeURIComponent(genre)}?page=${page}`,
//             { revalidate: 21600 }
//         );

//         if (!res.ok) return null;
//         return res.json();
//     } catch (err) {
//         console.error("getAnimeAnimeByGenre error:", err);
//         return null;
//     }
// }

/**
 * ✅ Search Anime
 * GET /anime/search?q=
 */
export async function searchAnime(query: string, page: number = 1) {
    if (!query) return null;

    try {
        const res = await apiFetch(
            `${BASE_URL}/anime/search?query=${encodeURIComponent(query)}&page=${page}`,
            { noStore: true }
        );
        
        if (!res.ok) return null;
        return res.json();
    } catch (err) {
        console.error("searchAnime error:", err);
        return null;
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