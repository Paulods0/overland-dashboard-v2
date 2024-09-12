import { isAxiosError } from "axios"
import axios from "@/config/axios.config"
import { CreateTipDTO, Tip, TipResponseDTO, UpdateTipDTO } from "./tip.types"

export class TipAPI {
  static async createTip(data: CreateTipDTO): Promise<void> {
    try {
      const response = await axios.post("/tip", data)
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

  static async getTips(page: string): Promise<TipResponseDTO> {
    const response = await axios.get(`/tip?page=${page}`)
    return response.data
  }

  static async getSingleTip(id: string): Promise<Tip> {
    const response = await axios.get(`/tip/${id}`)
    return response.data
  }

  static async updateTip(data: UpdateTipDTO): Promise<{ message: string }> {
    try {
      const response = await axios.put(`/tip/${data.id}`, data)
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

  static async deleteTip(id: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`/tip/${id}`)
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
