import { MetadataRoute } from 'next'
import { DRAMA_CHANNELS } from '@/libs/drama/channel'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tamanto.web.id'

  // 1. HALAMAN UTAMA & NAVIGASI LEVEL 1
  const mainRoutes = [
    '',
    '/drama/china',
    '/drama/korea',
    '/anime',
    '/about',
    '/premium',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }))

  // 2. KOMIK (Manga, Manhwa, Manhua)
  const komikRoutes = ['manga', 'manhwa', 'manhua'].map((k) => ({
    url: `${baseUrl}/komik/${k}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // 3. TOOLS (Kreator, Konversi, Kalkulator)
  const toolRoutes = [
    '/kreator/calculate-income', '/kreator/hashtag', '/kreator/caption', '/kreator/video-size',
    '/kompress/gambar', '/kompress/pdf',
    '/kalkulator/cicilan', '/kalkulator/kpr', '/kalkulator/thr',
    '/kalkulator/zakat-fitrah', '/kalkulator/zakat', '/kalkulator/take-home-pay',
    '/kalkulator/pph21', '/kalkulator/fidya'
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  // 4. SPORTS
  const sportRoutes = [
    {
      url: `${baseUrl}/bola/livescore`,
      lastModified: new Date(),
      changeFrequency: 'always' as const, // Karena skor bola berubah terus
      priority: 0.8,
    }
  ]

  // 5. DRAMA CHANNELS (Dramabox, Reelshort, dll)
  const channelRoutes = DRAMA_CHANNELS.map((channel) => ({
    url: `${baseUrl}/drama/china/channel/${channel.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    ...mainRoutes,
    ...komikRoutes,
    ...toolRoutes,
    ...sportRoutes,
    ...channelRoutes,
  ]
}