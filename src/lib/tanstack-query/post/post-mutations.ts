import { PostAPI } from "@/api/post"
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

export const useUpdatePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.UPDATE_POST],
    mutationFn: PostAPI.updatePost,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEYS.GET_POSTS, KEYS.GET_SINGLE_POST],
      }),
  })
}

export const useDeletePost = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.DELETE_POST],
    mutationFn: PostAPI.deletePost,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_POSTS] }),
  })
}
