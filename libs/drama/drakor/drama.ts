const API_KEY = "key1"
const BASE_URL = "https://api.xyra.stream/v1/dramacool"

const REVALIDATE_HOME = 300 // 5 menit
const REVALIDATE_LATEST = 120 // 2 menit
const REVALIDATE_INFO = 600 // 10 menit
const REVALIDATE_POPULAR = 120 // 2 menit
const REVALIDATE_DISCOVER = 300 // 2 menit
const REVALIDATE_SEARCH = 60 // 1 menit (search bisa sering berubah)

/**
 * Ambil data home (recently added, popular, dll)
 */
export async function getHomeData() {
    try {
        const res = await fetch(
            `${BASE_URL}/home?api_key=${API_KEY}`,
            { next: { revalidate: REVALIDATE_HOME } }
        )

        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error("getHomeData error:", error)
        return null
    }
}

/**
 * Ambil detail drama (info lengkap)
 */
export async function getDramaInfo(id: string) {
    try {
        const res = await fetch(
            `${BASE_URL}/info?api_key=${API_KEY}&id=${id}`,
            {
                next: { revalidate: REVALIDATE_INFO },
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0",
                },
            }
        )

        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error("getDramaInfo error:", error)
        return null
    }
}

/**
 * Ambil latest update (pagination)
 */
export async function getLatestDrama(page: number = 1) {
    try {
        const res = await fetch(
            `${BASE_URL}/latest?api_key=${API_KEY}&page=${page}`,
            {
                next: { revalidate: REVALIDATE_LATEST },
                headers: {
                    "Accept": "application/json",
                    "User-Agent": "Mozilla/5.0",
                },
            }
        )

        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error("getLatestDrama error:", error)
        return null
    }
}

/**
 * Ambil popular
 */
export async function getPopular(page: number = 1) {
    try {
        const res = await fetch(
            `${BASE_URL}/popular?api_key=${API_KEY}&page=${page}`,
            {
                next: { revalidate: REVALIDATE_POPULAR },
                headers: {
                    Accept: "application/json",
                    "User-Agent": "Mozilla/5.0",
                },
            }
        )

        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error("getPopular error:", error)
        return null
    }
}

/**
 * Ambil discover
 */
export async function getDIscover(page: number = 1) {
    try {
        const res = await fetch(
            `${BASE_URL}/discover?api_key=${API_KEY}&page=${page}`,
            {
                next: { revalidate: REVALIDATE_DISCOVER },
                headers: {
                    Accept: "application/json",
                    "User-Agent": "Mozilla/5.0",
                },
            }
        )

        if (!res.ok) return null
        return res.json()
    } catch (error) {
        console.error("getPopular error:", error)
        return null
    }
}

/**
 * Search drama
 */
export async function searchDrama(
  query: string,
  page: number = 1
) {
  if (!query) return null

  try {
    const res = await fetch(
      `${BASE_URL}/search?api_key=${API_KEY}&query=${encodeURIComponent(
        query
      )}&page=${page}`,
      {
        next: { revalidate: REVALIDATE_SEARCH },
        headers: {
          Accept: "application/json",
          "User-Agent": "Mozilla/5.0",
        },
      }
    )

    if (!res.ok) return null
    return res.json()
  } catch (error) {
    console.error("searchDrama error:", error)
    return null
  }
}