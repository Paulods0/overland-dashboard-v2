import Box from "../../components/global/box"
import FormButton from "../ui/input-field/form-button"
import { Input } from "../../components/ui/input-field"
import { Select } from "../../components/ui/select-field"
import { Save } from "lucide-react"

const AddPostForm = () => {
  return (
    <Box className="flex flex-col">
      <form className="space-y-4 flex flex-col">
        <FormButton
          type="submit"
          label="Publicar"
          icon={Save}
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

        <div className="flex items-start gap-4">
          <Input.Root className="w-full">
            <Input.Label title="Data de criação" />
            <Input.Field type="date" />
          </Input.Root>

          <Input.Root>
            <Input.Label title="Destacar" />
            <Input.Field type="checkbox" className="size-8 border-none" />
          </Input.Root>
        </div>

        <Input.Root>
          <Input.Label title="Tags (opcional e separar por vírgula)" />
          <Input.Field type="text" />
        </Input.Root>

        <Input.Root>
          <Input.Label title="Latitude e Longitude" />
          <Input.Field type="number" />
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

        <Select.Root>
          <Select.Label label="Categoria" />
          <Select.Container>
            <Select.Option label="Passeios" />
            <Select.Option label="Reviews" />
            <Select.Option label="Histórias" />
            <Select.Option label="Jornal Overland" />
            <Select.Option label="Overland Explorer" />
          </Select.Container>
        </Select.Root>
      </form>
    </Box>
  )
}

export default AddPostForm
