export type ClassifiedAuthor = {
  firstname: string
  lastname: string
  email: string
  phone: string
}

export type Classified = {
  _id: string
  type: string
  price: number
  title: string
  status: string
  content: string
  mainImage: string
  images?: string[]
  author: ClassifiedAuthor
}

export type ClassifiedResonseDTO = {
  total: number
  pages: number
  posts: Classified[]
}

export type UpdateClassifiedDTO = {
  id: string
  status: string
}
