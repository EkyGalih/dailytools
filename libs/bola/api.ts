const API_BASE = 'https://v3.football.api-sports.io'

async function footballFetch(endpoint: string) {
    const res = await fetch(`${API_BASE}${endpoint}`, {
        headers: {
            'x-apisports-key': process.env.API_FOOTBALL_KEY!,
        },
        next: { revalidate: 60 }, // 1 menit
    })

    if (!res.ok) {
        console.error(await res.text())
        throw new Error('Failed fetch football API')
    }

    return res.json()
}

/* ================= FIXTURES ================= */

// 🔴 LIVE MATCHES
export async function getLiveMatches() {
    return footballFetch('/fixtures?live=all')
}

// 📅 TODAY MATCHES
export async function getTodayFixtures() {
    const today = new Date().toISOString().slice(0, 10)
    return footballFetch(`/fixtures?date=${today}`)
}

// ⏭ UPCOMING MATCHES (PALING AMAN)
export async function getUpcomingFixtures(limit = 10) {
    return footballFetch(`/fixtures?next=${limit}`)
}

// 📄 MATCH DETAIL
export async function getMatchDetail(fixtureId: number) {
    return footballFetch(`/fixtures?id=${fixtureId}`)
}

// 📊 MATCH STATS
export async function getMatchStats(fixtureId: number) {
    return footballFetch(`/fixtures/statistics?fixture=${fixtureId}`)
}