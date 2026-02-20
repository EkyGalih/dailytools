// libs/drama/melolo.ts
const BASE = "https://api.sansekai.my.id/api/freereels"

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
        console.error("[Freereels API Error]", url, err)
        return null
    } finally {
        clearTimeout(id)
    }
}

export async function getFreereelsForYou() {
    const url = `${BASE}/foryou`
    const json = await fetchJSON<any>(url, 1800)

    // Sesuaikan pengecekan success code
    if (!json || json.code !== 200) return []

    // Di JSON lu, datanya ada di data.items
    if (Array.isArray(json?.data?.items)) {
        return json.data.items.filter((item: any) => item.key)
    }

    return []
}

export async function getAnimeFreereelsHomepage() {
    const url = `${BASE}/animepage`
    const json = await fetchJSON<any>(url, 1800)

    if (!json || json.code !== 200) return []

    // Mencari module recommend (key 2204) sesuai JSON lu
    const animeModule = json?.data?.items?.find((m: any) => m.module_key === "2204")

    if (animeModule && Array.isArray(animeModule.items)) {
        return animeModule.items.filter((item: any) => item.key)
    }

    return []
}

export async function getFreereelsHomepage() {
    const url = `${BASE}/homepage`

    const json = await fetchJSON<any>(url, 1800)

    // API ini pake format standard: code 200 & data.items
    if (!json || json.code !== 200) return null

    const items = json?.data?.items || []

    // Kita petakan datanya berdasarkan module_key atau urutan items
    const rankingData = {
        // Module pertama (key 1034) biasanya Popular/Hot
        popular: items.find((m: any) => m.module_key === "1034")?.items || [],
        // Module Segera Hadir (key 1035)
        comingSoon: items.find((m: any) => m.module_key === "1035")?.items || [],
        // Module Pilihan Populer (key 1036) - ini biasanya list ranking harian
        topDaily: items.find((m: any) => m.module_key === "1036")?.items[0]?.module_card?.items || []
    }

    return rankingData
}

export async function searchFreereels(query: string) {
    try {
        const response = await fetch(
            `${BASE}/search?query=${encodeURIComponent(query)}`,
            { next: { revalidate: 3600 } }
        );

        if (!response.ok) return [];

        const result = await response.json();

        // Sesuai JSON Freereels: data langsung berisi array objek drama
        if (result.status_code === 1 && Array.isArray(result.data)) {
            return result.data;
        }

        return [];
    } catch (error) {
        console.error("Freereels Search Error:", error);
        return [];
    }
}


export async function getFreereelsDetail(id: string) {
    try {
        const res = await fetch(`${BASE}/detailAndAllEpisode?id=${id}`, {
            next: { revalidate: 3600 }
        });
        const json = await res.json();

        if (json.code !== 200 || !json.data?.info) return null;

        const info = json.data.info;

        // Kita standarisasi outputnya supaya gampang dipake di component
        return {
            drama: {
                id: info.id,
                title: info.name,
                description: info.desc,
                cover: info.cover,
                tags: info.content_tags,
                chapterCount: info.episode_count,
                hotScore: info.hot_score,
                source: "Freereels Premium"
            },
            episodes: info.episode_list.map((ep: any) => ({
                id: ep.id,
                name: ep.name,
                index: ep.index,
                videoUrl: ep.external_audio_h264_m3u8, // Gunakan h264 m3u8
                cover: ep.cover
            }))
        };
    } catch (error) {
        console.error("Freereels Detail Error:", error);
        return null;
    }
}