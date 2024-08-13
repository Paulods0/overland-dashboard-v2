import { useQuery } from "@tanstack/react-query"
import { PostAPI, PostResponse } from "@/api/post"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { Post } from "@/api/post/post.types"

export const useGetAllPosts = (
  page: string = "1",
  category: string = "",
  limit: string = "20"
) => {
  return useQuery<PostResponse>({
    queryKey: [KEYS.GET_POSTS, page, category],
    queryFn: () => PostAPI.getAllPosts(page, category, limit),
  })
}

export const useSingleGetAllPost = (id: string) => {
  return useQuery<Post>({
    queryKey: [KEYS.GET_SINGLE_POST, id],
    queryFn: () => PostAPI.getSinglePost(id),
  })
}
