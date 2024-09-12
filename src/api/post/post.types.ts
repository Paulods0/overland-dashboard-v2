export interface PostResponseDTO {
  total: number
  pages: number
  posts: Post[]
}

export type Author = {
  _id: string
  email: string
  image?: string
  lastname: string
  firstname: string
}
export interface Post {
  _id: string
  date: string
  tag: string[]
  title: string
  views: number
  rating: number
  author: Author
  content: string
  category: string
  mainImage: string
  latitude?: string
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
  latitude?: string
  longitude?: string
  author_id: string
  highlighted: boolean
  author_notes?: string
  tag?: string | string[]
  mainImage: string | File | null
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
  highlighted?: boolean
  author_notes?: string
  tag?: string | string[]
  mainImage?: string | File | null
}
