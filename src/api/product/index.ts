import axios from "@/config/axios.config"
import {
  CreateProductDTO,
  Product,
  ProductResponseDTO,
  UpdateProductDTO,
} from "./product.types"

export class ProductAPI {
  static async createProduct(data: CreateProductDTO) {
    try {
      await axios.post("/product", data)
    } catch (error) {
      console.log(error)
    }
  }

  static async getProducts(page: string, category:string): Promise<ProductResponseDTO> {
    const response = await axios.get(`/product?page=${page}&category=${category}`)
    return response.data
  }

  static async getSingleProduct(id: string): Promise<Product> {
    const response = await axios.get(`/product/${id}`)
    return response.data
  }

  static async updateProduct(data: UpdateProductDTO): Promise<void> {
    await axios.put(`/product/${data.id}`, data)
  }

  static async deleteProduct(id: string): Promise<void> {
    await axios.delete(`/product/${id}`)
  }
}
