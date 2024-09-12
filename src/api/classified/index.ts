import {
  Classified,
  UpdateClassifiedDTO,
  ClassifiedResonseDTO,
} from "./classified.types"
import { isAxiosError } from "axios"
import axios from "@/config/axios.config"

export class ClassifiedAPI {
  static async getAll(): Promise<ClassifiedResonseDTO> {
    const response = await axios.get("/classified-post")
    return response.data
  }

  static async getOne(id: string): Promise<Classified> {
    const response = await axios.get(`/classified-post/${id}`)
    return response.data
  }

  static async update(data: UpdateClassifiedDTO): Promise<{ message: string }> {
    try {
      const response = await axios.put(`/classified-post/${data.id}`, data)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.error("Erro no servidor: " + error.response.data.message)
          throw new Error(error.response.data.message)
        } else {
          console.error("Erro na rede ou outro: " + error.message)
          throw new Error(error.message)
        }
      } else {
        console.error("Erro desconhecido: " + error)
        throw new Error("Ocorreu um erro. Tente mais tarde.")
      }
    }
  }

  static async delete(id: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`/classified-post/${id}`)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.error("Erro no servidor: " + error.response.data.message)
          throw new Error(error.response.data.message)
        } else {
          console.error("Erro na rede ou outro: " + error.message)
          throw new Error(error.message)
        }
      } else {
        console.error("Erro desconhecido: " + error)
        throw new Error("Ocorreu um erro. Tente mais tarde.")
      }
    }
  }
}
