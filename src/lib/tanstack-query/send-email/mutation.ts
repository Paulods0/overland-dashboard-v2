import { CanSendEmail } from "@/api/can-send-email"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateCanSendEmail = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: [KEYS.UPDATE_EMAIL_STATUS],
    mutationFn: CanSendEmail.updateStatus,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: [KEYS.GET_EMAIL_STATUS] }),
  })
}
