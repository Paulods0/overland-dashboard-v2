export type Product = {
  _id: string
  name: string
  category: string
  price: string
  image: string
  quantity: number
  description?: string
}

export interface CreateProductDTO {
  name: string
  price: string
  category: string
  quantity?: number
  description?: string
  image: string | File | null
}

export interface ProductResponseDTO {
  total: number
  pages: number
  products: Product[]
}

export interface UpdateProductDTO {
  id: string
  name?: string
  price?: string
  image?: string
  category?: string
  quantity?: number
  description?: string
}
