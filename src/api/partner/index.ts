import {
  CreatePartnerDTO,
  PartnerResponseDTO,
  UpdatePartnerDTO,
} from "./partner.type"
import { isAxiosError } from "axios"
import axios from "@/config/axios.config"

export class PartnerAPI {
  static async createPartner(
    data: CreatePartnerDTO
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post("/partner", data)
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
  static async getPartners(page: string): Promise<PartnerResponseDTO> {
    const response = await axios.get(`/partner?page=${page}`)
    console.log(response.data)
    return response.data
  }

  static async getSinglePartner(id: string) {
    const response = await axios.get(`/partner/${id}`)
    return response.data
  }

  static async updatePartner(
    data: UpdatePartnerDTO
  ): Promise<{ message: string }> {
    try {
      const response = await axios.put(`/partner/${data._id}`, data)
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

  static async deletePartner(id: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`/partner/${id}`)
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
