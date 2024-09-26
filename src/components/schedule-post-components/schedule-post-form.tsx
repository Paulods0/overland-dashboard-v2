import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import useIsLoading from "@/hooks/useIsLoading"
import { uploadToFirebase } from "@/lib/firebase"
import { Input } from "@/components/ui/input-field"
import { ChangeEvent, FormEvent, useState } from "react"
import FormButton from "@/components/ui/input-field/form-button"
import { CreateScheduleDTO } from "@/api/schedule/schedule.types"
import { useCreateSchedule } from "@/lib/tanstack-query/schedule/schedule-mutations"
import { useAuth } from "@/context/auth-context"
import LoadingData from "../global/loading-data"

type SchedulePostProps = {
  title: string
  document: File | null
}

const SchedulePostForm = () => {
  const { userId } = useAuth()
  const { mutateAsync } = useCreateSchedule()
  const { isLoading, toggleLoading } = useIsLoading()

  if (!userId) return <LoadingData />

  const [schedule, setSchedule] = useState<SchedulePostProps>({
    title: "",
    document: null,
  })

  function handleDocument(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setSchedule({ ...schedule, document: e.target.files[0] })
    }
  }

  async function handleSubmitForm(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)

    try {
      if (!schedule.title || !schedule.document) {
        toast.error("Preencha todos os dados")
        toggleLoading(false)
        return
      }

      const fileDownloadURL = await uploadToFirebase(
        schedule.document,
        "schedule-posts"
      )

      const data: CreateScheduleDTO = {
        ...schedule,
        file: fileDownloadURL!,
        author: userId!,
      }

      const response = await mutateAsync(data)
      toast.success(response.message)

      reseInputs()
    } catch (error: any) {
      reseInputs()
      toast.success(error)
    } finally {
      toggleLoading(false)
    }
  }

  function reseInputs() {
    setSchedule({
      title: "",
      document: null,
    })
  }

  return (
    <form
      onSubmit={handleSubmitForm}
      className="px-4 lg:px-8 space-y-4 flex flex-col"
    >
      <Input.Root>
        <Input.Label title="Título*" />
        <Input.Field
          type="text"
          value={schedule.title}
          onChange={(e) => setSchedule({ ...schedule, title: e.target.value })}
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Documento em PDF*" />
        <Input.Field type="file" accept=".pdf" onChange={handleDocument} />
      </Input.Root>

      <FormButton
        label="Salvar"
        disabled={isLoading}
        className="self-end"
        icon={isLoading ? Loading : Save}
      />
    </form>
  )
}

export default SchedulePostForm
