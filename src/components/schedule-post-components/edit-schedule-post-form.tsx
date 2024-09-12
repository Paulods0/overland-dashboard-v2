import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Button from "../ui/button/button"
import { Input } from "../ui/input-field"
import { DialogClose } from "../ui/dialog"
import useIsLoading from "@/hooks/useIsLoading"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { deleteFromFirebase, uploadToFirebase } from "@/lib/firebase"
import { SchedulePost, UpdateScheduleDTO } from "@/api/schedule/schedule.types"
import { useUpdateSchedule } from "@/lib/tanstack-query/schedule/schedule-mutations"

type Props = {
  data: SchedulePost
}

const EditSchedulePostForm = ({ data }: Props) => {
  const { mutateAsync } = useUpdateSchedule()
  const { isLoading, toggleLoading } = useIsLoading()
  const [pdfFilePreview, setPdfFilePreview] = useState<File | null>(null)
  const [schedule, setSchedule] = useState<UpdateScheduleDTO>({
    id: data.id,
    file: data.file,
    title: data.title,
    author: data.author,
  })

  function handlefile(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setPdfFilePreview(e.target.files[0])
      setSchedule({ ...schedule, file: e.target.files[0] })
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)
    try {
      let currPdfDocument = schedule.file
      if (pdfFilePreview) {
        await deleteFromFirebase(schedule.file as string, "schedule-posts")
        currPdfDocument = await uploadToFirebase(
          pdfFilePreview,
          "schedule-posts"
        )
      }

      const data: UpdateScheduleDTO = { ...schedule, file: currPdfDocument }
      const response = await mutateAsync(data)
      toast.success(response.message)
      toggleLoading(false)
      console.log(data)
    } catch (error: any) {
      toast.error(error)
      console.log(data)
      toggleLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <Input.Root>
        <Input.Label title="Documento em PDF" />
        <Input.Field type="file" accept=".pdf" onChange={handlefile} />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Título" />
        <Input.Field
          type="text"
          value={schedule.title}
          onChange={(e) => setSchedule({ ...schedule, title: e.target.value })}
        />
      </Input.Root>

      <div className="flex items-center gap-2 self-end">
        <DialogClose asChild>
          <Button buttonType="cancel" label="Cancelar" />
        </DialogClose>

        <FormButton
          icon={Save}
          disabled={isLoading}
          className="bg-indigo-700 text-white lg:self-end"
          label={isLoading ? "Salvando..." : "Salvar alterações"}
        />
      </div>
    </form>
  )
}

export default EditSchedulePostForm
