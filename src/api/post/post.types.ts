export interface Post {
  _id: string
  date: string
  tag: string[]
  title: string
  views: number
  rating: number
  author: string
  content: string
  category: string
  mainImage: string
  latitude?: number
  longitude?: string
  highlighted: boolean
  author_notes?: string
  category_slug?: string
}

export interface CreatePostDTO {
  date: string
  title: string
  content: string
  category: string
  latitude: string
  longitude: string
  author_id: string
  mainImage: string
  highlighted: boolean
  author_notes?: string
  tags?: string | string[]
}

export interface UpdatePostDTO {
  id: string
  date?: string
  title?: string
  content?: string
  category?: string
  latitude?: string
  longitude?: string
  author_id?: string
  mainImage?: string
  highlighted?: boolean
  author_notes?: string
  tags?: string | string[]
}
