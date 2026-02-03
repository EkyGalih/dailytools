import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/premium/success',
        '/search',
      ],
    },
    sitemap: 'https://tamanto.web.id/sitemap.xml',
  }
}