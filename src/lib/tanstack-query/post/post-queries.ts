import { PostAPI } from "@/api/post"
import { useQuery } from "@tanstack/react-query"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { Post, PostResponseDTO } from "@/api/post/post.types"

export const useGetAllPosts = (
  page?: string,
  limit?: string,
  category?: string
) => {
  return useQuery<PostResponseDTO>({
    queryKey: [KEYS.GET_POSTS, page, category],
    queryFn: () => PostAPI.getAllPosts(page, limit, category),
  })
}

export const useGetSinglePost = (id: string) => {
  return useQuery<Post>({
    queryKey: [KEYS.GET_SINGLE_POST, id],
    queryFn: () => PostAPI.getSinglePost(id),
  })
}

export const useGetHighlightedPost = () => {
  return useQuery<Post>({
    queryKey: [KEYS.GET_HIGHLIGHTED_POST],
    queryFn: PostAPI.getHiglightedPost,
  })
}
