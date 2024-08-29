import { PartnerAPI } from "@/api/partner"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreatePartner = () => {
  return useMutation({
    mutationKey: [KEYS.CREATE_PARTNER],
    mutationFn: PartnerAPI.createPartner,
  })
}

export const useUpdatePartner = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.UPDATE_PARTNER],
    mutationFn: PartnerAPI.updatePartner,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: [KEYS.GET_PARTNERS, KEYS.GET_SINGLE_PARTNER],
      }),
  })
}

export const useDeletePartner = () => {
  return useMutation({
    mutationKey: [KEYS.DELETE_PARTNER],
    mutationFn: PartnerAPI.deletePartner,
  })
}
