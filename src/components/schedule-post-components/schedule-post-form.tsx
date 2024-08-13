import { Save } from "lucide-react"
import { toast } from "react-toastify"
import { uploadToFirebase } from "@/lib/firebase"
import { Input } from "@/components/ui/input-field"
import { ChangeEvent, FormEvent, useState } from "react"
import FormButton from "@/components/ui/input-field/form-button"
import { CreateScheduleDTO } from "@/api/schedule/schedule.types"
import { AUTHOR_ID } from "../add-post-components/add-post-form"
import { useCreateSchedule } from "@/lib/tanstack-query/schedule/schedule-mutations"
import Loading from "../global/loading"
import useIsLoading from "@/hooks/useIsLoading"

type SchedulePostProps = {
  title: string
  document: File | null
}

const SchedulePostForm = () => {
  const { mutate } = useCreateSchedule()
  const { isLoading, toggleLoading } = useIsLoading()

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
        file: fileDownloadURL,
        author: AUTHOR_ID,
      }

      mutate(data)
      toggleLoading(false)
      toast.success("O documento foi enviado com sucesso")
      console.log(data)
      
      reseInputs()
    } catch (error) {
      reseInputs()
      toggleLoading(false)
      console.log(error)
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
