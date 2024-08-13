import axios from "@/config/axios.config"
import {
  CreatePartnerDTO,
  PartnerResponseDTO,
  UpdatePartnerDTO,
} from "./partner.type"

export class PartnerAPI {
  static async createPartner(data: CreatePartnerDTO) {
    try {
      await axios.post("/partner", data)
    } catch (error) {
      console.log(error)
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

  static async updatePartner(data: UpdatePartnerDTO) {
    await axios.put(`/partner/${data.id}`, data)
  }

  static async deletePartner(id: string) {
    await axios.delete(`/partner/${id}`)
  }
}
