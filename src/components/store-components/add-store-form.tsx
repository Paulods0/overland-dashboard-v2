import { Input } from "@/components/ui/input-field"

const AddStoreForm = () => {
  return (
    <>
      <Input.Root>
        <Input.Label title="Imagem do artigo*" />
        <Input.Field type="file" />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Nome do artigo*" />
        <Input.Field type="text" />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Preço*" />
        <Input.Field type="number" />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Quantidade*" />
        <Input.Field type="number" />
      </Input.Root>
    </>
  )
}

export default AddStoreForm
