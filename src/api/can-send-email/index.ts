import {
  SendEmailResponseDTO,
  UpdateCanSendEmailRequestDTO,
} from "./can-send-email.types"
import { isAxiosError } from "axios"
import axios from "@/config/axios.config"

export class CanSendEmail {
  static async getStatus(): Promise<SendEmailResponseDTO> {
    try {
      const response = await axios.get("/mail/email-status")
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
        throw new Error("Ocorreu um erro, tente mais tarde.")
      }
    }
  }

  static async updateStatus(
    data: UpdateCanSendEmailRequestDTO
  ): Promise<{ message: string }> {
    try {
      const response = await axios.patch("/mail/email-status", data)
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
        throw new Error("Ocorreu um erro, tente mais tarde.")
      }
    }
  }
}
