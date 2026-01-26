import type { Metadata } from 'next'
import DramaFilters from '@/components/drama/DramaFilter'
import DramaVideoGrid from '@/components/drama/DramaVideoGrid'
import { getCategory, getCategoryVideos } from '@/libs/drama/youtube'
import { notFound } from 'next/navigation'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> // Ubah jadi Promise
}): Promise<Metadata> {
  const { slug } = await params // Tambahkan await
  const cat = getCategory(slug)

  if (!cat) {
    return { title: 'Kategori Drama China' }
  }

  return {
    title: `Drama China ${cat.name} – Viral & Trending`,
    description: `Daftar video drama China kategori ${cat.name} yang lagi viral.`,
  }
}

export default async function DramaChinaCategoryPage({
  params,
}: {
  params: Promise<{ slug: string }> // Ubah jadi Promise
}) {
  const { slug } = await params // Tambahkan await
  const cat = getCategory(slug)

  if (!cat) notFound()

  const items = await getCategoryVideos(slug, 18)

  return (
    <section className="space-y-8">
      <header className="rounded-3xl bg-gradient-to-br from-slate-900 via-purple-900 to-fuchsia-900 text-white p-8">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Kategori: {cat.name}
        </h1>
        <p className="mt-2 text-white/75">
          Pilihan video drama China {cat.name} yang sedang ramai.
        </p>
      </header>

      <DramaFilters active={slug} />
      <DramaVideoGrid items={items} />
    </section>
  )
}