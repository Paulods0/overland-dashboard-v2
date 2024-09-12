import { isAxiosError } from "axios"
import {
  CreateSubscriberDTO,
  Subscriber,
  SubscriberResponseDTO,
  UpdateSubscriberDTO,
} from "./subscriber.types"

import axios from "@/config/axios.config"

export class SubscriberAPI {
  static async createSubscriber(data: CreateSubscriberDTO): Promise<void> {
    try {
      const response = await axios.post("/newsletter/register", data)
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

  static async getSubscribers(page: string): Promise<SubscriberResponseDTO> {
    const response = await axios.get(`/newsletter?page=${page}`)
    return response.data
  }

  static async getSingleSubscriber(id: string): Promise<Subscriber> {
    const response = await axios.get(`/newsletter/${id}`)
    return response.data
  }

  static async updateSubscriber(
    data: UpdateSubscriberDTO
  ): Promise<{ message: string }> {
    try {
      const response = await axios.put(`/newsletter/${data.id}`, data)
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

  static async deleteSubscriber(id: string): Promise<void> {
    try {
      const response = await axios.delete(`/newsletter/${id}`)
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
