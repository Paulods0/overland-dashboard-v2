import { PostAPI } from "@/api/post"
import { UpdatePostDTO } from "@/api/post/post.types"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreatePost = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.CREATE_POSTS],
    mutationFn: PostAPI.createPost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_POSTS] }),
  })
}

export const useUpdatePost = (data: UpdatePostDTO) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.UPDATE_POST],
    mutationFn: () => PostAPI.updatePost(data),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_POSTS] }),
  })
}

export const useDeletePost = (id: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.DELETE_POST],
    mutationFn: () => PostAPI.deletePost(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_POSTS] }),
  })
}
