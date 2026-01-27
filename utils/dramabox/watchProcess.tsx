export function saveProgress(
  bookId: string,
  episode: number,
  time: number
) {
  localStorage.setItem(
    `watch:${bookId}`,
    JSON.stringify({ episode, time, ts: Date.now() })
  )
}

export function loadProgress(bookId: string) {
  const raw = localStorage.getItem(`watch:${bookId}`)
  if (!raw) return null
  return JSON.parse(raw)
}