type Tone = 'santai' | 'profesional' | 'jualan' | 'edukatif'
type Cta = 'follow' | 'komen' | 'save' | 'share' | 'dm'

/* ================= CTA ================= */

const CTA_TEXT: Record<Cta, string[]> = {
    follow: [
        'Follow untuk konten lainnya ya.',
        'Ikuti akun ini biar nggak ketinggalan.',
        'Follow kalau kamu suka konten praktis kayak gini.',
    ],
    komen: [
        'Tulis pendapat kamu di kolom komentar 👇',
        'Menurut kamu gimana? Komentar ya.',
        'Pernah ngalamin juga? Share di komentar.',
    ],
    save: [
        'Save dulu biar nggak lupa.',
        'Simpan postingan ini sebagai referensi.',
        'Bookmark sekarang, pakai nanti.',
    ],
    share: [
        'Share ke teman kamu yang butuh ini.',
        'Bagikan ke orang terdekatmu.',
        'Forward ke grup yang relevan.',
    ],
    dm: [
        'Kalau mau tanya, DM aja ya.',
        'DM terbuka buat diskusi.',
        'Butuh bantuan? Langsung DM.',
    ],
}

/* ================= EMOJI ================= */

const EMOJIS = ['✨', '🔥', '💡', '📌', '✅', '⚡', '🎯']

function maybeEmoji(enabled: boolean) {
    if (!enabled) return ''
    return EMOJIS[Math.floor(Math.random() * EMOJIS.length)]
}

/* ================= TRANSITION ================= */

const TRANSITION = [
    'Singkatnya begini:',
    'Intinya:',
    'Yang perlu kamu ingat:',
    'Kenapa ini penting?',
    'Masalah yang sering kejadian:',
]

/* ================= HOOK ================= */

const HOOKS: Record<Tone, (topic: string) => string[]> = {
    santai: (topic) => [
        `Ngomongin ${topic} yuk.`,
        `Jujur ya, ${topic} sering diremehin.`,
        `Kalau kamu lagi mikir soal ${topic}, ini buat kamu.`,
        `Banyak yang nanya soal ${topic}.`,
        `Ngaku deh, ${topic} kadang bikin bingung 😅`,
    ],
    profesional: (topic) => [
        `Ringkasan praktis tentang ${topic}.`,
        `Catatan penting terkait ${topic}.`,
        `Insight singkat yang bisa kamu terapkan soal ${topic}.`,
        `Framework sederhana untuk ${topic}.`,
    ],
    edukatif: (topic) => [
        `Tahukah kamu tentang ${topic}?`,
        `Panduan singkat: ${topic}.`,
        `Hal yang sering salah kaprah tentang ${topic}.`,
        `Mari pahami ${topic} secara sederhana.`,
    ],
    jualan: (topic) => [
        `Masih stuck di ${topic}?`,
        `Kalau mau hasil lebih baik soal ${topic}, simak ini.`,
        `${topic} bisa lebih efektif kalau caranya tepat.`,
        `Ini solusi praktis buat ${topic}.`,
    ],
}

/* ================= BODY ================= */

const BODIES: Record<Tone, (topic: string) => string[]> = {
    santai: (topic) => [
        `Mulai dari hal kecil.\nKonsisten.\nEvaluasi pelan-pelan.`,
        `Nggak perlu ribet.\nYang penting jalan dulu.`,
        `Sedikit tapi rutin jauh lebih kepake daripada sempurna tapi nggak mulai.`,
    ],
    profesional: (topic) => [
        `1) Tentukan tujuan\n2) Tetapkan metrik\n3) Eksekusi\n4) Evaluasi`,
        `Gunakan pendekatan bertahap agar hasil terukur.`,
        `Fokus pada dampak terbesar lebih dulu.`,
    ],
    edukatif: (topic) => [
        `• Definisi\n• Contoh\n• Cara penerapan`,
        `Konsepnya sederhana, tinggal diterapkan secara konsisten.`,
        `Kesalahan umum biasanya ada di langkah awal.`,
    ],
    jualan: (topic) => [
        `Solusi ini dirancang supaya mudah diterapkan.`,
        `Cocok buat kamu yang pengen hasil tanpa ribet.`,
        `Sudah banyak yang pakai pendekatan ini.`,
    ],
}

/* ================= UTIL ================= */

function pick<T>(arr: T[]) {
    return arr[Math.floor(Math.random() * arr.length)]
}

function decorate(text: string, emoji: boolean) {
    if (!emoji) return text
    const lines = text.split('\n')
    return lines
        .map((l, i) =>
            i === 0 ? `${maybeEmoji(true)} ${l}` : l
        )
        .join('\n')
}

/* ================= BUILDER ================= */

export function buildCaptions(opts: {
    topic: string
    tone: Tone
    cta: Cta
    emoji: boolean
    count: number
}) {
    const topic = (opts.topic || '').trim()
    if (!topic) return []

    const n = Math.max(3, Math.min(12, opts.count))
    const hooks = HOOKS[opts.tone](topic)
    const bodies = BODIES[opts.tone](topic)
    const ctas = CTA_TEXT[opts.cta]

    const list: string[] = []

    for (let i = 0; i < n; i++) {
        const hook = pick(hooks)
        const body = pick(bodies)
        const transition = pick(TRANSITION)
        const cta = pick(ctas)

        const text = `${hook}

${transition}
${body}

${cta}`

        list.push(decorate(text, opts.emoji))
    }

    return list
}