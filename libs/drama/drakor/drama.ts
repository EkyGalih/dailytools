import { apiFetch } from "@/libs/fetchApi"

const BASE_URL = process.env.BASE_URL_API

const REVALIDATE_HOME = 300
const REVALIDATE_LIST = 120
const REVALIDATE_DETAIL = 600
const REVALIDATE_SEARCH = 60

/**
 * ✅ Ambil semua series (default homepage)
 * GET /series
 */
export async function getHomePage(page: number = 1) {
    try {
        const res = await apiFetch(
            `${BASE_URL}/drakorkita/homepage?page=${page}`,
            REVALIDATE_HOME
        );

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

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

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

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

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

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

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

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
        const res = await apiFetch(`${BASE_URL}/drakorkita/detail/${slug}`, REVALIDATE_DETAIL)

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

        if (!res.ok) return null
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

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

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

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

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

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

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

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

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

        if (!BASE_URL) {
            throw new Error("BASE_URL_API belum di set di .env");
        }

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("searchDrama error:", err)
        return null
    }
}