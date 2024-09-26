import { useQuery } from "@tanstack/react-query"
import { CanSendEmail } from "@/api/can-send-email"
import { KEYS } from "@/utils/tanstack-query.enuns"
import { SendEmailResponseDTO } from "@/api/can-send-email/can-send-email.types"

export const useGetEmailStatus = () => {
  return useQuery<SendEmailResponseDTO>({
    queryKey: [KEYS.GET_EMAIL_STATUS],
    queryFn: CanSendEmail.getStatus,
  })
}
