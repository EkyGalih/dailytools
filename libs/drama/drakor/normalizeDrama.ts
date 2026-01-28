export function normalizeDramaInfo(raw: any) {
    const clean = (text?: string) =>
        text
            ?.replace(/Synopsis:\s*:/gi, "")
            ?.replace(/\s+/g, " ")
            ?.trim()

    const uniqueArray = (arr: string[] = []) =>
        Array.from(new Set(arr))

    return {
        title: raw.title?.replace(/(.+)\1/, "$1"),
        thumbnail: raw.thumbnail,
        synopsis: clean(raw.synopsis),
        otherName: raw.other_name?.replace(/Other name:/gi, "").trim(),
        country: raw.country?.replace(/(.+)\1/, "$1"),
        status: raw.status?.replace(/(.+)\1/, "$1"),
        releaseYear: raw.release_year?.replace(/(.+)\1/, "$1"),
        genres: uniqueArray(raw.genres),
        episodes: raw.episodes || [],
    }
}