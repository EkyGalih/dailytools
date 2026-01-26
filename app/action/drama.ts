'use server'

import { getTrendingDramaChina } from '@/libs/drama/youtube'

export async function fetchMoreDramaAction(pageToken?: string, query?: string) {
  // Kita panggil fungsi yang sudah kita modifikasi sebelumnya
  const result = await getTrendingDramaChina({
    q: query || 'chinese drama short reelshort episode',
    maxResults: 12, // Ambil 12 saja biar hemat kuota
    pageToken: pageToken
  })
  
  return result
}