import { ClassifiedAPI } from "@/api/classified"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export function useUpdateClassified() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.UPDATE_CLASSIFIED],
    mutationFn: ClassifiedAPI.update,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_CLASSIFIEDS] }),
  })
}

export function useDeleteClassified() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationKey: [KEYS.DELETE_CLASSIFIED],
    mutationFn: ClassifiedAPI.delete,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_CLASSIFIEDS] }),
  })
}
