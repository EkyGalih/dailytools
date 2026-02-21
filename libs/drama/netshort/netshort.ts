// libs/drama/melolo.ts
const BASE = "https://api.sansekai.my.id/api/netshort"

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
        console.error("[Netshort API Error]", url, err)
        return null
    } finally {
        clearTimeout(id)
    }
}

export async function getNetshortForYou(page: number = 1) {
    const url = `${BASE}/foryou?page=${page}`
    const json = await fetchJSON<any>(url, 1800)

    // Data Netshort For You biasanya langsung array atau object dengan contentInfos
    if (!json || !json.contentInfos) return []

    return json.contentInfos.map((item: any) => ({
        id: item.shortPlayId,
        title: item.shortPlayName,
        cover: item.shortPlayCover,
        score: item.heatScoreShow,
        tags: item.labelArray || []
    }))
}

export async function getNetshortTheaters() {
    const url = `${BASE}/theaters`
    const json = await fetchJSON<any>(url, 1800)

    if (!json || !Array.isArray(json)) return null

    const findGroup = (remark: string) => {
        const group = json.find((g: any) => g.contentRemark === remark);
        return group?.contentInfos || [];
    }

    return {
        popular: findGroup("premium_drama"),
        topDramas: findGroup("top_short_dramas"),
        dubbed: findGroup("dubbed"),
        comingSoon: findGroup("coming_soon"),
        rankings: findGroup("rankings"),
    }
}

export async function searchNetshort(query: string) {
    const url = `${BASE}/search?query=${encodeURIComponent(query)}`
    try {
        const response = await fetch(url, { next: { revalidate: 3600 } });
        if (!response.ok) return [];

        const result = await response.json();

        // Mapping sesuai struktur JSON baru
        if (result.searchCodeSearchResult && Array.isArray(result.searchCodeSearchResult)) {
            return result.searchCodeSearchResult.map((item: any) => ({
                id: item.shortPlayId,
                title: item.shortPlayName.replace(/<\/?[^>]+(>|$)/g, ""), // Bersihkan tag <em>
                cover: item.shortPlayCover,
                score: item.formatHeatScore || "0.0",
                tags: item.labelNameList || []
            }));
        }

        return [];
    } catch (error) {
        console.error("Netshort Search Error:", error);
        return [];
    }
}


export async function getNetshortDetail(id: string) {
    try {
        const res = await fetch(`${BASE}/allepisode?shortPlayId=${id}`, {
            next: { revalidate: 3600 }
        });
        const json = await res.json();
        console.log(json)
        if (!json || !json.shortPlayId) return null;

        return {
            drama: {
                id: json.shortPlayId,
                title: json.shortPlayName.trim(),
                description: json.shotIntroduce || "Tidak ada deskripsi untuk drama ini.",
                cover: json.shortPlayCover,
                tags: json.shortPlayLabels || [],
                chapterCount: json.totalEpisode || 0,
                hotScore: json.formatHeatScore || "N/A",
                isFinish: json.isFinish === 1,
                source: "Netshort Original"
            },
            episodes: json.shortPlayEpisodeInfos.map((ep: any) => ({
                id: ep.episodeId,
                name: `Episode ${ep.episodeNo}`,
                index: ep.episodeNo,
                videoUrl: ep.playVoucher, // Link MP4/Stream utama
                cover: ep.episodeCover,
                isLocked: ep.isLock,
                subtitleList: ep.subtitleList || []
            }))
        };
    } catch (error) {
        console.error("Netshort Detail Error:", error);
        return null;
    }
}

export async function getNetshortList(query: string = "pewaris") {
    try {
        const res = await fetch(`${BASE}/search?query=${encodeURIComponent(query)}`, {
            next: { revalidate: 3600 }
        });
        const json = await res.json();

        // Mapping sesuai struktur JSON searchCodeSearchResult
        return json.searchCodeSearchResult || []; 
    } catch (error) {
        console.error("Netshort Search List Error:", error);
        return [];
    }
}