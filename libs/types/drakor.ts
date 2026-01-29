// src/types/drakor.ts

export interface DramaCardItem {
    /** Judul drama/movie */
    title: string;

    /** Slug endpoint detail */
    endpoint: string;

    /** Thumbnail poster */
    thumbnail: string | null;

    /** Rating drama (contoh: 8.9) */
    rating?: string | null;

    /** Episode info (contoh: E12/16) */
    eps?: string | null;

    /** Tahun rilis (contoh: 2024) */
    year?: string | null;

    /** Durasi atau tipe tayangan (contoh: 60 min) */
    time?: string | null;

    /** Resolusi video (contoh: 1080p, 720p) */
    resolution?: string | null;

    /** Terakhir update (contoh: 2 hari yang lalu) */
    updated_at?: string | null;
}

export interface GenreItem {
    title: string
    endpoint: string
}

export interface PaginationInfo {
    current_page: number
    next_page: number | null
    prev_page: number | null
    has_next: boolean
    has_prev: boolean
}

export interface DramaListResponse {
    message: string
    page: number
    pagination: number
    total: number
    datas: DramaCardItem[]
    pagination_info?: PaginationInfo
}

export interface GenreResponse {
    message: string
    datas: GenreItem[]
}