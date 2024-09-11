import {
  Classified,
  UpdateClassifiedDTO,
  ClassifiedResonseDTO,
} from "./classified.types"
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
    const response = await axios.put(`/classified-post/${data.id}`, data)
    return response.data
  }

  static async delete(id: string): Promise<{ message: string }> {
    const response = await axios.delete(`/classified-post/${id}`)
    return response.data
  }
}
