import {
  User,
  CreateUserDTO,
  UpdateUserDTO,
  UserResponseDTO,
} from "./user.type"
import { isAxiosError } from "axios"
import axios from "@/config/axios.config"

export class UserAPI {
  static async createUser(data: CreateUserDTO): Promise<{ message: string }> {
    try {
      const response = await axios.post("/auth", data)
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

  static async getUsers(
    page?: string,
    limit?: string
  ): Promise<UserResponseDTO> {
    const response = await axios.get("/auth", {
      params: {
        page,
        limit,
      },
    })
    return response.data
  }

  static async getSingleUser(id: string): Promise<User> {
    const response = await axios.get("/auth/", {
      params: {
        id,
      },
    })
    return response.data
  }

  static async updateUser(data: UpdateUserDTO): Promise<{ message: string }> {
    try {
      const response = await axios.put(`/auth/${data.id}`, data)
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

  static async deleteUser(id: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`/auth/${id}`)
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
