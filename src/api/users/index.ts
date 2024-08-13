import {
  CreateUserDTO,
  UpdateUserDTO,
  User,
  UserResponseDTO,
} from "./user.type"
import axios from "@/config/axios.config"

export class UserAPI {
  static async createUser(data: CreateUserDTO): Promise<void> {
    try {
      await axios.post("/auth", data)
    } catch (error) {
      console.error(error)
    }
  }

  static async getUsers(page: string): Promise<UserResponseDTO> {
    const response = await axios.get(`/auth?page=${page}`)
    console.log(response)
    return response.data
  }
  static async getSingleUser(id: string): Promise<User> {
    const response = await axios.get(`/auth/${id}`)
    return response.data
  }

  static async updateUser(data: UpdateUserDTO): Promise<void> {
    try {
      await axios.put(`/auth/${data.id}`, data)
    } catch (error) {
      console.error(error)
    }
  }

  static async deleteUser(id: string): Promise<void> {
    try {
      await axios.delete(`/auth/${id}`)
    } catch (error) {
      console.error(error)
    }
  }
}
