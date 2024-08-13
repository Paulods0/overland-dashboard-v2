export type Partner = {
  date: string
  image: string
  title: string
  author: string
  content: string
}

export interface CreatePartnerDTO {
  date: string
  title: string
  author: string
  content: string
  category: string
  image: string | File
  author_notes?: string
  tags: string | string[]
}

export interface UpdatePartnerDTO {
  id: string
  image?: string
  title?: string
  author?: string
  content?: string
  date?: string
}

export interface PartnerResponseDTO {
  pages: number
  partners: Partner[]
}
