import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://mytools.web.id'
  const now = new Date()

  return [
    // ===== HOME =====
    {
      url: `${baseUrl}`,
      priority: 1,
      changeFrequency: 'daily',
      lastModified: now,
    },

    // ===== STATIC PAGES =====
    {
      url: `${baseUrl}/about`,
      changeFrequency: 'yearly',
      lastModified: now,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      changeFrequency: 'yearly',
      lastModified: now,
    },

    // ===== KALKULATOR =====
    {
      url: `${baseUrl}/kalkulator/cicilan`,
      changeFrequency: 'monthly',
      lastModified: now,
    },
    {
      url: `${baseUrl}/kalkulator/kpr`,
      changeFrequency: 'monthly',
      lastModified: now,
    },
    {
      url: `${baseUrl}/kalkulator/thr`,
      changeFrequency: 'monthly',
      lastModified: now,
    },
    {
      url: `${baseUrl}/kalkulator/zakat`,
      changeFrequency: 'monthly',
      lastModified: now,
    },
    {
      url: `${baseUrl}/kalkulator/zakat-fitrah`,
      changeFrequency: 'monthly',
      lastModified: now,
    },
    {
      url: `${baseUrl}/kalkulator/pph21`,
      changeFrequency: 'monthly',
      lastModified: now,
    },
    {
      url: `${baseUrl}/kalkulator/take-home-pay`,
      changeFrequency: 'monthly',
      lastModified: now,
    },

    // ===== KONVERTER =====
    {
      url: `${baseUrl}/konverter/image`,
      changeFrequency: 'monthly',
      lastModified: now,
    },

    // ===== KOMPRESS =====
    {
      url: `${baseUrl}/kompress/gambar`,
      changeFrequency: 'monthly',
      lastModified: now,
    },
    {
      url: `${baseUrl}/kompress/pdf`,
      changeFrequency: 'monthly',
      lastModified: now,
    },

    { url: `${baseUrl}/kreator`, changeFrequency: 'monthly', lastModified: now },
    { url: `${baseUrl}/kreator/youtube-income`, changeFrequency: 'monthly', lastModified: now },
    { url: `${baseUrl}/kreator/hashtag`, changeFrequency: 'monthly', lastModified: now },
    { url: `${baseUrl}/kreator/caption`, changeFrequency: 'monthly', lastModified: now },
    { url: `${baseUrl}/kreator/video-size`, changeFrequency: 'monthly', lastModified: now },
  ]
}