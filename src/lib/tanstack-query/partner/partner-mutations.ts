import { PartnerAPI } from "@/api/partner"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation } from "@tanstack/react-query"

export const useCreatePartner = () => {
  return useMutation({
    mutationKey: [KEYS.CREATE_PARTNER],
    mutationFn: PartnerAPI.createPartner,
  })
}

export const useUpdatePartner = () => {
  return useMutation({
    mutationKey: [KEYS.UPDATE_PARTNER],
    mutationFn: PartnerAPI.updatePartner,
  })
}

export const useDeletePartner = () => {
  return useMutation({
    mutationKey: [KEYS.DELETE_PARTNER],
    mutationFn: PartnerAPI.deletePartner,
  })
}
