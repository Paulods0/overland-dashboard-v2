import { Save } from "lucide-react"
import { Input } from "../ui/input-field"
import FormButton from "../ui/input-field/form-button"

const EditSchedulePostForm = () => {
  return (
    <form className="flex flex-col gap-2 w-full">
      <Input.Root>
        <Input.Label title="Documento em PDF" />
        <Input.Field type="file" />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Título" />
        <Input.Field type="text" value="Título" />
      </Input.Root>

      <FormButton
        label="Salvar alterações"
        icon={Save}
        className="bg-indigo-700 text-white lg:self-end"
      />
    </form>
  )
}

export default EditSchedulePostForm
