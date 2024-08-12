import { TipAPI } from "@/api/tips"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation } from "@tanstack/react-query"

export const useCreateTip = () => {
  return useMutation({
    mutationKey: [KEYS.CREATE_TIP],
    mutationFn: TipAPI.createTip,
  })
}

export const useUpdateTip = () => {
  return useMutation({
    mutationKey: [KEYS.UPDATE_TIP],
    mutationFn: TipAPI.updateTip,
  })
}

export const useDeleteTip = () => {
  return useMutation({
    mutationKey: [KEYS.DELETE_TIP],
    mutationFn: TipAPI.deleteTip,
  })
}
