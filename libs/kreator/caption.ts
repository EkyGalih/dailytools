export type Platform = 'instagram' | 'tiktok' | 'facebook' | 'youtube'
export type Tone = 'santai' | 'profesional' | 'edukatif' | 'jualan'
export type Cta = 'follow' | 'komen' | 'save' | 'share' | 'dm'

/* ================= CTA ================= */

const CTA_TEXT: Record<Cta, string[]> = {
    follow: [
        'Follow untuk konten selanjutnya.',
        'Ikuti akun ini biar nggak ketinggalan.',
        'Follow kalau kamu suka konten praktis kayak gini.',
        'Stay tuned, bakal ada lanjutan.',
    ],
    komen: [
        'Tulis pendapat kamu di kolom komentar 👇',
        'Menurut kamu gimana?',
        'Pernah ngalamin juga? Share di komentar.',
        'Komentar versi kamu di bawah ya.',
    ],
    save: [
        'Save dulu biar nggak lupa.',
        'Simpan postingan ini sebagai referensi.',
        'Bookmark sekarang, pakai nanti.',
        'Save biar bisa dibuka lagi kapan aja.',
    ],
    share: [
        'Share ke teman kamu yang butuh ini.',
        'Bagikan ke orang terdekatmu.',
        'Forward ke grup yang relevan.',
        'Share kalau ini ngebantu.',
    ],
    dm: [
        'Kalau mau tanya, DM aja ya.',
        'DM terbuka buat diskusi.',
        'Butuh bantuan? Langsung DM.',
        'Konsultasi? DM sekarang.',
    ],
}

/* ================= HOOK ================= */

const HOOKS: Record<Tone, (topic: string) => string[]> = {
    santai: (t) => [
        `Ngomongin ${t} yuk.`,
        `Jujur ya, ${t} sering diremehin.`,
        `Kalau kamu lagi mikir soal ${t}, ini buat kamu.`,
        `Banyak yang nanya soal ${t}.`,
        `Ngaku deh, ${t} kadang bikin bingung 😅`,
        `Stop scroll dulu, ini penting soal ${t}.`,
        `Gue baru sadar soal ${t}.`,
    ],

    profesional: (t) => [
        `Ringkasan praktis tentang ${t}.`,
        `Insight penting terkait ${t}.`,
        `Catatan singkat yang bisa langsung diterapkan.`,
        `Framework sederhana untuk ${t}.`,
        `Beberapa poin penting terkait ${t}.`,
        `Pendekatan sistematis untuk ${t}.`,
    ],

    edukatif: (t) => [
        `Tahukah kamu tentang ${t}?`,
        `Panduan singkat: ${t}.`,
        `Hal yang sering salah kaprah tentang ${t}.`,
        `Mari pahami ${t} dengan cara sederhana.`,
        `Dasar penting yang perlu kamu tahu soal ${t}.`,
        `Penjelasan singkat tentang ${t}.`,
    ],

    jualan: (t) => [
        `Masih stuck di ${t}?`,
        `Kalau mau hasil lebih baik soal ${t}, simak ini.`,
        `${t} bisa lebih efektif kalau caranya tepat.`,
        `Ini solusi praktis buat ${t}.`,
        `Banyak yang gagal di ${t} karena ini.`,
        `Kalau kamu serius soal ${t}, ini wajib tahu.`,
    ],
}

/* ================= BODY ================= */

const BODIES: Record<Tone, string[]> = {
    santai: [
        `Mulai dari hal kecil.\nNggak perlu sempurna.\nYang penting konsisten.`,
        `Sering kejadian:\n• Kebanyakan mikir\n• Takut salah\n• Akhirnya nggak mulai`,
        `Pelan-pelan asal jalan.\nLebih baik progress kecil daripada diam.`,
        `Yang penting paham dasarnya dulu.\nSisanya bisa nyusul.`,
    ],

    profesional: [
        `1) Tentukan tujuan\n2) Susun strategi\n3) Eksekusi\n4) Evaluasi`,
        `Gunakan pendekatan bertahap agar hasil terukur.`,
        `Fokus pada variabel dengan dampak terbesar.`,
        `Lakukan review berkala untuk optimasi.`,
        `Dokumentasikan proses supaya bisa direplikasi.`,
    ],

    edukatif: [
        `• Pengertian\n• Contoh penerapan\n• Kesalahan umum`,
        `Konsepnya sederhana, tinggal diterapkan secara konsisten.`,
        `Masalah sering muncul karena salah di langkah awal.`,
        `Pahami dulu logikanya sebelum praktek.`,
        `Ini dasar yang sering dilewatkan pemula.`,
    ],

    jualan: [
        `Solusi ini dirancang supaya mudah diterapkan.`,
        `Cocok buat kamu yang pengen hasil tanpa ribet.`,
        `Sudah banyak yang pakai pendekatan ini.`,
        `Lebih hemat waktu dan tenaga.`,
        `Bisa langsung dipraktikkan mulai hari ini.`,
    ],
}

/* ================= UTIL ================= */

function pick<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)]
}

/* ================= BUILDER ================= */

export function buildCaptions(opts: {
    topic: string
    platform: Platform
    tone: Tone
    cta: Cta
    emoji: boolean
    count: number
}) {
    const topic = (opts.topic || '').trim()
    if (!topic) return []

    const n = Math.max(3, Math.min(opts.count, 12))
    const hooks = HOOKS[opts.tone](topic)
    const bodies = BODIES[opts.tone]
    const ctas = CTA_TEXT[opts.cta]

    const result: string[] = []

    for (let i = 0; i < n; i++) {
        const caption = `${pick(hooks)}

${pick(bodies)}

${pick(ctas)}`

        result.push(caption)
    }

    return result
}