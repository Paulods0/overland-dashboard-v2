import { SubscriberAPI } from "@/api/subscriber"
import { useQuery } from "@tanstack/react-query"
import { KEYS } from "@/utils/tanstack-query.enuns"

export const useGetSubs = (page: string) => {
  return useQuery({
    queryKey: [KEYS.GET_SUBS, page],
    queryFn: () => SubscriberAPI.getSubscribers(page),
  })
}

export const useGetSingleSub = (id: string) => {
  return useQuery({
    queryKey: [KEYS.GET_SINGLE_SUB, id],
    queryFn: () => SubscriberAPI.getSingleSubscriber(id),
  })
}
