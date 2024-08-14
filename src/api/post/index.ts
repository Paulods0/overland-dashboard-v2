import axios from "@/config/axios.config"
import { CreatePostDTO, Post, UpdatePostDTO } from "./post.types"

export interface PostResponse {
  total: number
  pages: number
  posts: Post[]
}

export class PostAPI {
  public static async createPost(post: CreatePostDTO): Promise<void> {
    try {
      await axios.post("/post", post)
    } catch (error: any) {
      console.log(error)
    }
  }

  public static async getAllPosts(
    page?: string,
    limit?: string,
    category?: string,
  ): Promise<PostResponse> {
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

  public static async updatePost(data: UpdatePostDTO): Promise<void> {
    await axios.put(`/post/${data.id}`, data)
  }

  public static async deletePost(id: string): Promise<void> {
    await axios.delete(`/post/${id}`)
  }
}
