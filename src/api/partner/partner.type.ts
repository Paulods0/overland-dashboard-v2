import { Author } from "../post/post.types"

export type Partner = {
  _id: string
  date: string
  image: string
  title: string
  author: Author
  content: string
  author_notes?: string
}

export interface CreatePartnerDTO {
  date: string
  title: string
  author: string
  content: string
  image: string | File
  author_notes?: string
  tags: string | string[]
}

export interface UpdatePartnerDTO {
  _id: string
  date?: string
  title?: string
  author?: string
  content?: string
  image?: string | File
  author_notes?: string
  tags?: string | string[]
}

export interface PartnerResponseDTO {
  pages: number
  partners: Partner[]
}
