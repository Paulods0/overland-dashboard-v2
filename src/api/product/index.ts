import {
  Product,
  UpdateProductDTO,
  CreateProductDTO,
  ProductResponseDTO,
} from "./product.types"
import { isAxiosError } from "axios"
import axios from "@/config/axios.config"

export class ProductAPI {
  static async createProduct(
    data: CreateProductDTO
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post("/product", data)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          throw new Error(error.response.data.message)
        } else {
          throw new Error(error.message)
        }
      } else {
        throw new Error("Ocorreu um erro. Tente mais tarde.")
      }
    }
  }

  static async getProducts(
    page: string,
    category: string,
    limit: string
  ): Promise<ProductResponseDTO> {
    const response = await axios.get(
      `/product?page=${page}&category=${category}&limit=${limit}`
    )
    return response.data
  }

  static async getSingleProduct(id: string): Promise<Product> {
    const response = await axios.get(`/product/${id}`)
    return response.data
  }

  static async updateProduct(
    data: UpdateProductDTO
  ): Promise<{ message: string }> {
    try {
      const response = await axios.put(`/product/${data.id}`, data)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          throw new Error(error.response.data.message)
        } else {
          throw new Error(error.message)
        }
      } else {
        throw new Error("Ocorreu um erro. Tente mais tarde.")
      }
    }
  }

  static async deleteProduct(id: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`/product/${id}`)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          throw new Error(error.response.data.message)
        } else {
          throw new Error(error.message)
        }
      } else {
        throw new Error("Ocorreu um erro. Tente mais tarde.")
      }
    }
  }
}
