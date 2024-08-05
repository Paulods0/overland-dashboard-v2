import { Save } from "lucide-react"
import { Input } from "@/components/ui/input-field"
import FormButton from "@/components/ui/input-field/form-button"

const SchedulePostForm = () => {
  return (
    <form className="px-4 lg:px-8 space-y-4 flex flex-col">
      <Input.Root>
        <Input.Label title="Documento em PDF*" />
        <Input.Field type="file" />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Título*" />
        <Input.Field type="text" />
      </Input.Root>

      <FormButton
        label="Salvar"
        className="bg-indigo-700 text-white self-end"
        icon={Save}
      />
    </form>
  )
}

export default SchedulePostForm
