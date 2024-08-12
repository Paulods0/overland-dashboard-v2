export type Product = {
  name: string
  category: string
  price: string
  image: string
  quantity: number
  description?: string
}

export interface CreateProductDTO {
  name: string
  category: string
  price: string
  image: string
  quantity: number
  description?: string
}

export interface ProductResponseDTO {
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
