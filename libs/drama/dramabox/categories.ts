// libs/drama/categories.ts (REKOMENDASI DIPISAH)
export type DramaCategorySlug =
  | 'dubindo'
  | 'randomdrama'
  | 'foryou'
  | 'latest'
  | 'populersearch'

export const DRAMA_CATEGORIES: Array<{
  slug: DramaCategorySlug
  name: string
  description?: string
}> = [
  { slug: 'dubindo', name: 'Dub Indo' },
  { slug: 'randomdrama', name: 'Random Drama' },
  { slug: 'foryou', name: 'For You' },
  { slug: 'latest', name: 'Terbaru' },
  { slug: 'populersearch', name: 'Pencarian Populer' },
]