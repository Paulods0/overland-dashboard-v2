import axios from "@/config/axios.config"
import {
  CreateSubscriberDTO,
  Subscriber,
  SubscriberResponseDTO,
  UpdateSubscriberDTO,
} from "./subscriber.types"

export class SubscriberAPI {
  static async createSubscriber(data: CreateSubscriberDTO): Promise<void> {
    try {
      await axios.post("/newsletter", data)
    } catch (error) {
      console.log(error)
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

  static async updateSubscriber(data: UpdateSubscriberDTO): Promise<void> {
    await axios.put(`/newsletter/${data.id}`, data)
  }

  static async deleteSubscriber(id: string): Promise<void> {
    await axios.delete(`/newsletter/${id}`)
  }
}
