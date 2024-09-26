import axios from "@/config/axios.config"
import {
  CreateScheduleDTO,
  SchedulePost,
  ScheduleResponseDTO,
  UpdateScheduleDTO,
} from "./schedule.types"
import { isAxiosError } from "axios"

export class SchedulePostAPI {
  static async createSchedule(
    data: CreateScheduleDTO
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post("/schedule-post", data)
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

  static async getSchedules(page: string): Promise<ScheduleResponseDTO> {
    const response = await axios.get(`/schedule-post?page=${page}`)
    return response.data
  }

  static async getSingleSchedule(id: string): Promise<SchedulePost> {
    const response = await axios.get(`/schedule-post/${id}`)
    return response.data
  }

  static async updateSchedule(
    data: UpdateScheduleDTO
  ): Promise<{ message: string }> {
    try {
      const response = await axios.put(`/schedule-post/${data.id}`, data)
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

  static async deleteSchedule(id: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`/schedule-post/${id}`)
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
