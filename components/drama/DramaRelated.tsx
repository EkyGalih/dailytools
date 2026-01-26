// components/drama/DramaRelated.tsx
import DramaVideoGrid, { VideoCardItem } from './DramaVideoGrid'

interface DramaRelatedProps {
  items: VideoCardItem[]
  currentId?: string // Tambahkan prop ini
}

export default function DramaRelated({ items, currentId }: DramaRelatedProps) {
  // Filter items agar tidak menampilkan video yang sedang ditonton
  const filteredItems = items.filter((item) => {
    // Sesuaikan dengan properti ID yang kamu gunakan (__videoId atau id.videoId)
    const videoId = item.__videoId || (typeof item.id === 'string' ? item.id : item.id.videoId);
    return videoId !== currentId;
  });

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