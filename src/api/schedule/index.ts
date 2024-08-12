import axios from "@/config/axios.config"
import {
  CreateScheduleDTO,
  SchedulePost,
  ScheduleResponseDTO,
  UpdateScheduleDTO,
} from "./schedule.types"

export class SchedulePostAPI {
  static async createSchedule(data: CreateScheduleDTO): Promise<void> {
    try {
      await axios.post("/schedule-post", data)
    } catch (error) {
      console.log(error)
    }
  }

  static async getSchedules(page: string): Promise<ScheduleResponseDTO> {
    const response = await axios.get(`/schedule-post?page=${page}`)
    console.log(response.data)
    return response.data
  }

  static async getSingleSchedule(id: string): Promise<SchedulePost> {
    const response = await axios.get(`/schedule-post/${id}`)
    return response.data
  }

  static async updateSchedule(data: UpdateScheduleDTO): Promise<void> {
    await axios.put(`/schedule-post/${data.id}`, data)
  }

  static async deleteSchedule(id: string): Promise<void> {
    await axios.delete(`/schedule-post/${id}`)
  }
}
