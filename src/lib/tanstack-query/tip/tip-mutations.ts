import { TipAPI } from "@/api/tips"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateTip = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.CREATE_TIP],
    mutationFn: TipAPI.createTip,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_TIPS] }),
  })
}

export const useUpdateTip = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.UPDATE_TIP],
    mutationFn: TipAPI.updateTip,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_TIPS] }),
  })
}

export const useDeleteTip = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.DELETE_TIP],
    mutationFn: TipAPI.deleteTip,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_TIPS] }),
  })
}
