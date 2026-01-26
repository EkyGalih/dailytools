// components/drama/DramaRelated.tsx
import DramaVideoGrid, { VideoCardItem } from './DramaVideoGrid'

interface DramaRelatedProps {
  items: VideoCardItem[]
  currentId?: string
}

export default function DramaRelated({ items, currentId }: DramaRelatedProps) {
  // Filter menggunakan __videoId yang sudah di-mapping di libs/drama/youtube.ts
  const filteredItems = items.filter((item) => item.__videoId !== currentId);

  if (!filteredItems.length) return null;

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold tracking-tight">Rekomendasi Terkait</h2>
        <span className="h-px flex-1 bg-gray-200 ml-4"></span>
      </div>
      <DramaVideoGrid items={filteredItems} />
    </section>
  )
}