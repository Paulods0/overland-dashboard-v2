import { TipAPI } from "@/api/tips"
import { Tip, TipResponseDTO } from "@/api/tips/tip.types"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useQuery } from "@tanstack/react-query"

export const useGetTips = (page: string) => {
  return useQuery<TipResponseDTO>({
    queryKey: [KEYS.GET_TIPS, page],
    queryFn: () => TipAPI.getTips(page),
  })
}

export const useGetSingleTip = (id: string) => {
  return useQuery<Tip>({
    queryKey: [KEYS.GET_SINGLE_TIP, id],
    queryFn: () => TipAPI.getSingleTip(id),
  })
}
