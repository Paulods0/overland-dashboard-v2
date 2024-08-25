import axios from "@/config/axios.config"
import { CreateTipDTO, Tip, TipResponseDTO, UpdateTipDTO } from "./tip.types"

export class TipAPI {
  static async createTip(data: CreateTipDTO): Promise<void> {
    await axios.post("/tip", data)
  }

  static async getTips(page: string): Promise<TipResponseDTO> {
    const response = await axios.get(`/tip?page=${page}`)
    return response.data
  }

  static async getSingleTip(id: string): Promise<Tip> {
    const response = await axios.get(`/tip/${id}`)
    return response.data
  }

  static async updateTip(data: UpdateTipDTO): Promise<void> {
    await axios.put(`/tip/${data._id}`, data)
  }

  static async deleteTip(id: string): Promise<void> {
    await axios.delete(`/tip/${id}`)
  }
}
