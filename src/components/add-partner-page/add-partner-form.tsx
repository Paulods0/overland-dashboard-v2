import { Save } from "lucide-react"
import Box from "../global/box"
import { Input } from "../ui/input-field"
import FormButton from "../ui/input-field/form-button"
import { Select } from "../ui/select-field"

const AddPartnerForm = () => {
  return (
    <Box className="flex flex-col">
      <form className="space-y-4 flex flex-col">
        <FormButton
          icon={Save}
          type="submit"
          label="Publicar"
          className="w-full bg-indigo-700 text-white border-none self-end"
        />
        <Input.Root>
          <Input.Label title="Título*" />
          <Input.Field type="text" />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Imagem principal*" />
          <Input.Field type="file" />
        </Input.Root>

        <Input.Root className="w-full">
          <Input.Label title="Data de criação" />
          <Input.Field type="date" />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Tags (opcional e separar por vírgula)" />
          <Input.Field type="text" />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Notas do autor (opcional)" />
          <Input.TextArea className="h-20" />
        </Input.Root>

        <Select.Root>
          <Select.Label label="Autor" />
          <Select.Container>
            <Select.Option label="User 1" />
            <Select.Option label="User 2" />
          </Select.Container>
        </Select.Root>
      </form>
    </Box>
  )
}

export default AddPartnerForm
