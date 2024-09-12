import {
  Post,
  UpdatePostDTO,
  CreatePostDTO,
  PostResponseDTO,
} from "./post.types"
import { isAxiosError } from "axios"
import axios from "@/config/axios.config"

export class PostAPI {
  public static async createPost(
    post: CreatePostDTO
  ): Promise<{ message: string }> {
    try {
      const response = await axios.post("/post", post)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.log("Erro no servidor:" + error.response.data.message)
          throw new Error(error.response.data.message)
        } else {
          console.log("Erro na rede ou outro:" + error.message)
          throw new Error(error.message)
        }
      } else {
        console.log("Erro desconhecido: " + error)
        throw new Error("Ocorreu um erro. Tente mais tarde.")
      }
    }
  }

  public static async getAllPosts(
    page?: string,
    limit?: string,
    category?: string
  ): Promise<PostResponseDTO> {
    const response = await axios.get(
      `/post?page=${page}&category=${category}&limit=${limit}`
    )
    console.log(response.data)
    return response.data
  }

  public static async getSinglePost(id: string): Promise<Post> {
    const response = await axios.get(`/post/${id}`)
    return response.data
  }

  public static async getHiglightedPost(): Promise<Post> {
    const response = await axios.get("/post/get/highlighted-post")
    return response.data
  }

  public static async updatePost(
    data: UpdatePostDTO
  ): Promise<{ message: string }> {
    try {
      const reposnse = await axios.put(`/post/${data.id}`, data)
      return reposnse.data
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

  public static async deletePost(id: string): Promise<{ message: string }> {
    try {
      const response = await axios.delete(`/post/${id}`)
      return response.data
    } catch (error) {
      if (isAxiosError(error)) {
        if (error.response) {
          console.error("Erro no servidor: " + error.response.data.message)
          throw new Error(error.response.data.message)
        } else {
          console.error("Erro na rede  ou outro: " + error.message)
          throw new Error(error.message)
        }
      } else {
        console.error("Erro desconhecido: " + error)
        throw new Error("Ocorreu um erro. Tente mais tarde.")
      }
    }
  }
}
