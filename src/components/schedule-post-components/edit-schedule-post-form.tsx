import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Button from "../ui/button/button"
import { Input } from "../ui/input-field"
import { DialogClose } from "../ui/dialog"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"

type EditScheduleProps = {
  title?: string
  document?: File | null | string
}

const EditSchedulePostForm = () => {
  const [schedule, setSchedule] = useState<EditScheduleProps>({
    title: "",
    document: "",
  })

  function handleDocument(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      setSchedule({ ...schedule, document: e.target.files[0] })
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data = { ...schedule }
    toast.success("Os dados foram atualizados com sucesso")
    console.log(data)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <Input.Root>
        <Input.Label title="Documento em PDF" />
        <Input.Field type="file" accept=".pdf" onChange={handleDocument} />
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
          label="Salvar alterações"
          icon={Save}
          className="bg-indigo-700 text-white lg:self-end"
        />
      </div>
    </form>
  )
}

export default EditSchedulePostForm
