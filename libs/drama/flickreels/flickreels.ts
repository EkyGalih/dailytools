// libs/drama/melolo.ts
const BASE = "https://api.sansekai.my.id/api/flickreels"

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
        console.error("[Flickreels API Error]", url, err)
        return null
    } finally {
        clearTimeout(id)
    }
}

export async function getFlickreelsForYou() {
    const url = `${BASE}/foryou`
    const json = await fetchJSON<any>(url, 1800)

    if (!json || json.status_code !== 1) return []

    // Mengambil data dari data.list sesuai struktur JSON yang diberikan
    if (Array.isArray(json?.data?.list)) {
        return json.data.list.filter((item: any) => item.playlet_id !== 0)
    }

    return []
}

export async function getFlickreelsLatest() {
    const url = `${BASE}/latest`

    // Kita panggil fetchJSON yang sudah kamu buat sebelumnya
    const json = await fetchJSON<any>(url, 1800)

    if (!json || json.status_code !== 1) return []

    if (Array.isArray(json?.data) && json.data.length > 0) {
        const firstColumn = json.data[0]

        if (Array.isArray(firstColumn?.list)) {
            // Kita filter item yang playlet_id nya 0 (biasanya data kosong/header api)
            return firstColumn.list.filter((item: any) => item.playlet_id !== 0)
        }
    }

    return []
}

export async function getFlickreelsHomepage() {
    const url = `${BASE}/hotrank`

    const json = await fetchJSON<any>(url, 1800)
    console.log('json', json)
    if (!json || json.status_code !== 1) return null

    if (Array.isArray(json?.data)) {
        const rankingData = {
            hot: json.data[0]?.data || [],
            new: json.data[1]?.data || [],
            trending: json.data[2]?.data || []
        }

        // Filter data agar tidak ada item kosong
        rankingData.hot = rankingData.hot.filter((item: any) => item.playlet_id)
        rankingData.new = rankingData.new.filter((item: any) => item.playlet_id)
        rankingData.trending = rankingData.trending.filter((item: any) => item.playlet_id)

        return rankingData
    }

    return null
}

export async function searchFlickreels(query: string) {
    try {
        const response = await fetch(
            `${BASE}/search?query=${encodeURIComponent(query)}`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) return [];

        const result = await response.json();

        // Sesuai JSON Flickreels: data langsung berisi array objek drama
        if (result.status_code === 1 && Array.isArray(result.data)) {
            return result.data;
        }

        return [];
    } catch (error) {
        console.error("Flickreels Search Error:", error);
        return [];
    }
}


export async function getFlickreelsDetail(id: string) {
    const res = await fetch(`${BASE}/detailAndAllEpisode?id=${id}`, {
        next: { revalidate: 3600 }
    });
    return res.json();
}