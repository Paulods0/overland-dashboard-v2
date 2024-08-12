import { PartnerAPI } from "@/api/partner"
import { useQuery } from "@tanstack/react-query"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { Partner, PartnerResponseDTO } from "@/api/partner/partner.type"

export const useGetPartners = (page: string) => {
  return useQuery<PartnerResponseDTO>({
    queryKey: [KEYS.GET_PARTNERS],
    queryFn: () => PartnerAPI.getPartners(page),
  })
}

export const useGetSinglePartner = (id: string) => {
  return useQuery<Partner>({
    queryKey: [KEYS.GET_SINGLE_PARTNER],
    queryFn: () => PartnerAPI.getSinglePartner(id),
  })
}
