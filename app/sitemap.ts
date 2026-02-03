import { MetadataRoute } from 'next'
import { DRAMA_CHANNELS } from '@/libs/drama/channel'
import { getAnimeList } from "@/libs/anime/anime"
// Import fetcher tambahan Anda di sini, misal:
// import { getDramaList } from "@/libs/drama/drama"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://tamanto.web.id'

  // ========================================================
  // 1. DYNAMIC FETCHING (Anime, Drama, dll)
  // ========================================================
  const [animeRes] = await Promise.all([
    getAnimeList().catch(() => null),
    // getDramaList().catch(() => null),
  ])

  // Mapping data Anime ke format sitemap
  const animeEntries = (animeRes?.data?.anime_list || []).map((anime: any) => ({
    url: `${baseUrl}/anime/${anime.endpoint}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }))

  // ========================================================
  // 2. STATIC ROUTES (Berdasarkan Navbar & Proyek Anda)
  // ========================================================

  // Halaman Utama & Navigasi Level 1
  const mainRoutes = ['', '/drama/china', '/drama/korea', '/anime', '/about', '/premium'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 1.0,
  }))

  // Komik (Manga, Manhwa, Manhua)
  const komikRoutes = ['manga', 'manhwa', 'manhua'].map((k) => ({
    url: `${baseUrl}/komik/${k}`,
    lastModified: new Date(),
    changeFrequency: 'daily' as const,
    priority: 0.9,
  }))

  // Smart Tools (Kreator, Konversi, Kalkulator)
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

  // Sports (Live Score)
  const sportRoutes = [{
    url: `${baseUrl}/bola/livescore`,
    lastModified: new Date(),
    changeFrequency: 'always' as const,
    priority: 0.8,
  }]

  // Drama Channels
  const channelRoutes = DRAMA_CHANNELS.map((channel) => ({
    url: `${baseUrl}/drama/china/channel/${channel.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  // ========================================================
  // 3. COMBINE ALL
  // ========================================================
  return [
    ...mainRoutes,
    ...komikRoutes,
    ...toolRoutes,
    ...sportRoutes,
    ...channelRoutes,
    ...animeEntries,
  ]
}