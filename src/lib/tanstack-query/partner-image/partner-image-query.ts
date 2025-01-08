import { useQuery } from "@tanstack/react-query"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { PartnerImageAPI, PartnerImageResponseDTO } from "@/api/partner-image"

export function useGetSponsorsImages() {
  return useQuery<PartnerImageResponseDTO[]>({
    queryKey: [KEYS.GET_PARTNER_IMAGE],
    queryFn: PartnerImageAPI.getAll,
  })
}
