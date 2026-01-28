// libs/drama/country.ts

export type CountryCode =
    | "korean"
    | "south korea"
    | "thailand"
    | "japanese"
    | "chinese"
    | "taiwan"
    | "hong kong"
    | "philippines"
    | "indonesia"

const FLAG_BASE = "https://flagcdn.com/w20"

export const COUNTRY_FLAGS: Record<string, string> = {
    korean: `${FLAG_BASE}/kr.png`,

    thailand: `${FLAG_BASE}/th.png`,
    japanese: `${FLAG_BASE}/jp.png`,
    chinese: `${FLAG_BASE}/cn.png`,
    taiwan: `${FLAG_BASE}/tw.png`,
    "hong kong": `${FLAG_BASE}/hk.png`,

    philipines: `${FLAG_BASE}/ph.png`,
    indonesia: `${FLAG_BASE}/id.png`,
}

/**
 * Ambil URL flag berdasarkan nama country
 */
export function getCountryFlag(country?: string) {
    if (!country) return null

    const key = country.toLowerCase().trim()
    return COUNTRY_FLAGS[key] || null
}