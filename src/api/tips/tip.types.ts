import { Author } from "../post/post.types"

export interface CreateTipDTO {
  title: string
  author: string
  content: string
  category: string
  author_notes: string
  tags?: string | string[]
  image: File | string | null
}

export interface UpdateTipDTO {
  id: string
  title?: string
  author?: string
  content?: string
  category?: string
  image?: string | File
  author_notes?: string
  tags?: string | string[]
}

export type Tip = {
  _id: string
  title: string
  image: string
  author: Author
  content: string
  category: string
  createdAt: string
  author_notes: string
  tags: string[]
}
export interface TipResponseDTO {
  pages: number
  posts: Tip[]
}
