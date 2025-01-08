import { PartnerImageAPI } from "@/api/partner-image"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateParterImage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.CREATE_PARTNER_IMAGE],
    mutationFn: PartnerImageAPI.create,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_PARTNER_IMAGE] }),
  })
}

export const useUpdateParterImage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.UPDATE_PARTNER_IMAGE],
    mutationFn: PartnerImageAPI.update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_PARTNER_IMAGE] }),
  })
}
export const useDeleteParterImage = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.DELETE_PARTNER_IMAGE],
    mutationFn: PartnerImageAPI.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_PARTNER_IMAGE] }),
  })
}
