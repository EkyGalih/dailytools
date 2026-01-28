const BASE_URL = "https://scrapper-suru.vercel.app/"

const REVALIDATE_HOME = 300
const REVALIDATE_LIST = 120
const REVALIDATE_DETAIL = 600
const REVALIDATE_SEARCH = 60

/**
 * ✅ Ambil semua series (default homepage)
 * GET /series
 */
export async function getSeries(page: number = 1) {
    try {
        const res = await fetch(
            `${BASE_URL}/series?page=${page}`,
            {
                next: { revalidate: REVALIDATE_HOME },
            }
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
        const res = await fetch(`${BASE_URL}/series/ongoing?page=${page}`, {
            next: { revalidate: REVALIDATE_LIST },
        })

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
        const res = await fetch(`${BASE_URL}/series/updated?page=${page}`, {
            next: { revalidate: REVALIDATE_LIST },
        })

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
        const res = await fetch(`${BASE_URL}/series/completed?page=${page}`, {
            next: { revalidate: REVALIDATE_LIST },
        })

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("getCompletedSeries error:", err)
        return null
    }
}

/**
 * ✅ Detail drama
 * GET /detail/:slug
 */
export async function getDramaDetail(slug: string) {
    try {
        const res = await fetch(`${BASE_URL}/detail/${slug}`, {
            next: { revalidate: REVALIDATE_DETAIL },
        })

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
        const res = await fetch(`${BASE_URL}/movie?page=${page}`, {
            next: { revalidate: REVALIDATE_LIST },
        })

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
        const res = await fetch(`${BASE_URL}/movie/newest?page=${page}`, {
            next: { revalidate: REVALIDATE_LIST },
        })

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
        const res = await fetch(`${BASE_URL}/genres`, {
            next: { revalidate: REVALIDATE_HOME },
        })

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
        const res = await fetch(
            `${BASE_URL}/genres/${encodeURIComponent(genre)}?page=${page}`,
            {
                next: { revalidate: 60 },
            }
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
        const res = await fetch(
            `${BASE_URL}/search?q=${encodeURIComponent(query)}&page=${page}`,
            {
                next: { revalidate: REVALIDATE_SEARCH },
            }
        )

        if (!res.ok) return null
        return res.json()
    } catch (err) {
        console.error("searchDrama error:", err)
        return null
    }
}