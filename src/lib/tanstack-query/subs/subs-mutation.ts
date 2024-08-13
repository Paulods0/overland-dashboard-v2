import { SubscriberAPI } from "@/api/subscriber"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useCreateSub = () => {
  const queryCliet = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.CREATE_SUB],
    mutationFn: SubscriberAPI.createSubscriber,
    onSuccess: () =>
      queryCliet.invalidateQueries({ queryKey: [KEYS.GET_SUBS] }),
  })
}

export const useUpdateSub = () => {
  const queryCliet = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.UPDATE_SUBS],
    mutationFn: SubscriberAPI.updateSubscriber,
    onSuccess: () =>
      queryCliet.invalidateQueries({ queryKey: [KEYS.GET_SUBS] }),
  })
}

export const useDeleteSub = () => {
  const queryCliet = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.DELETE_SUB],
    mutationFn: SubscriberAPI.deleteSubscriber,
    onSuccess: () =>
      queryCliet.invalidateQueries({ queryKey: [KEYS.GET_SUBS] }),
  })
}
