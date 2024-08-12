export interface CreateTipDTO {
  title: string
  image: string
  author: string
  content: string
  category: string
}

export interface UpdateTipDTO {
  id: string
  title?: string
  image?: string
  author?: string
  content?: string
  category?: string
}

export interface TipResponseDTO {
  pages: number
  posts: Tip[]
}

export type Tip = {
  title: string
  image: string
  author: string
  content: string
  category: string
}
