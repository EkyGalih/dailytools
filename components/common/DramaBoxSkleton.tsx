// components/drama/dramabox/DramaBookSkeleton.tsx
export default function DramaBookSkeleton({
  count = 8,
}: {
  count?: number
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border bg-white overflow-hidden animate-pulse"
        >
          {/* COVER */}
          <div className="aspect-[3/4] bg-gray-200" />

          {/* INFO */}
          <div className="p-4 space-y-3">
            <div className="h-4 bg-gray-200 rounded w-3/4" />
            <div className="h-3 bg-gray-200 rounded w-1/2" />
            <div className="h-3 bg-gray-200 rounded w-full" />
            <div className="flex gap-2 pt-2">
              <div className="h-4 w-10 bg-gray-200 rounded-full" />
              <div className="h-4 w-14 bg-gray-200 rounded-full" />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}