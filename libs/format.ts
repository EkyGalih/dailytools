export function formatRupiah(value: number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
    }).format(value)
}

export function formatNumber(value: string) {
    const number = value.replace(/\D/g, '')
    return number.replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function parseNumber(value: string) {
    return Number(value.replace(/\./g, ''))
}

export type MatchStatItem = {
    type: string
    value: number | string | null
}

export type TeamStats = {
    team: {
        id: number
        name: string
        logo: string
    }
    statistics: MatchStatItem[]
}

export function formatReleaseDate(s?: string) {
    if (!s) return null
    const d = new Date(s.replace(' ', 'T'))
    if (isNaN(d.getTime())) return null

    return {
        year: d.getFullYear(),
        short: d.toLocaleDateString('id-ID', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }),
    }
}