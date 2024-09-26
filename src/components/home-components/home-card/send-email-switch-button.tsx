import "./cards-styles.css"

import { toast } from "react-toastify"
import { useEffect, useState } from "react"
import LoadingData from "@/components/global/loading-data"
import { useGetEmailStatus } from "@/lib/tanstack-query/send-email/query"
import { useUpdateCanSendEmail } from "@/lib/tanstack-query/send-email/mutation"
import { UpdateCanSendEmailRequestDTO } from "@/api/can-send-email/can-send-email.types"

const SendEmailSwitchButton = () => {
  const { data: emailData, isLoading } = useGetEmailStatus()
  const { mutateAsync, isPending } = useUpdateCanSendEmail()

  const [emailStatus, setEmailStatus] = useState(false)

  useEffect(() => {
    if (emailData) {
      setEmailStatus(emailData.canSendEmail)
    }
  }, [emailData])

  if (isLoading) return <LoadingData />

  async function updateStatus() {
    try {
      const data: UpdateCanSendEmailRequestDTO = {
        id: emailData!._id,
        value: emailStatus,
      }

      const response = await mutateAsync(data)
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex flex-col gap-2 items-center">
      <div className="flex items-center">
        <input
          id="check"
          type="checkbox"
          disabled={isPending}
          checked={emailStatus}
          className="size-6 switch-input"
          onChange={(e) => setEmailStatus(e.target.checked)}
        />
        <label htmlFor="check" className="switch-button"></label>
      </div>
      <button
        className="rounded-lg px-4 w-24 py-2 text-black border hover:bg-neutral-200 bg-white ease-in-out duration-200"
        onClick={updateStatus}
      >
        Salvar
      </button>
    </div>
  )
}

export default SendEmailSwitchButton
