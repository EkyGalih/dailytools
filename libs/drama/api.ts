// libs/drama/api.ts
const BASE = 'https://imdb.iamidiotareyoutoo.com'

export async function searchDrama(keyword: string) {
  const res = await fetch(
    `${BASE}/search?q=${encodeURIComponent(keyword)}&type=tv`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) throw new Error('Failed search drama')
  return res.json()
}

export async function getDramaDetail(id: string) {
  const res = await fetch(
    `${BASE}/title/${id}`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) throw new Error('Failed fetch detail')
  return res.json()
}