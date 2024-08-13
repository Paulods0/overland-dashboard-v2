export interface CreateTipDTO {
  date: string
  title: string
  author: string
  content: string
  category: string
  author_notes: string
  tags: string | string[]
  image: File | string | null
}

export interface UpdateTipDTO {
  id: string
  date?: string
  title?: string
  image?: string
  author?: string
  content?: string
  category?: string
  author_notes?: string
  tags?: string | string[]
}

export interface TipResponseDTO {
  pages: number
  posts: Tip[]
}

export type Tip = {
  date: string
  title: string
  image: string
  author: string
  content: string
  category: string
  author_notes: string
  tags: string | string[]
}
