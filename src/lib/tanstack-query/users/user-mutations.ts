import { UserAPI } from "@/api/users"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.CREATE_USER],
    mutationFn: UserAPI.createUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_USERS] }),
  })
}

export const useUpdateUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.UPDATED_USER],
    mutationFn: UserAPI.updateUser,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEYS.GET_USERS],
      }),
  })
}

export const useDeleteUser = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.DELETE_USER],
    mutationFn: UserAPI.deleteUser,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_USERS] }),
  })
}
