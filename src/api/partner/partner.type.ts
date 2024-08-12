export type Partner = {}

export interface CreatePartnerDTO {
  image: string
  title: string
  author: string
  content: string
  date?: string
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
  posts: Partner[]
}
