export type DramaBookItem = {
  bookId: string
  bookName: string
  coverWap: string
  bookCover?: string
  cover?: string
  introduction: string
  tags: string[]
  rankVo?: {
    hotCode?: string
  }
  shelfTime?: string
  chapterCount?: number
}