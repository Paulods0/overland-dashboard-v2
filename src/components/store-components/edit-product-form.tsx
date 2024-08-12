import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Button from "../ui/button/button"
import { Input } from "../ui/input-field"
import { DialogClose } from "../ui/dialog"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"

type ProductProps = {
  name?: string
  image?: string
  price?: string
  description?: string
}

const EditProductForm = () => {
  const [product, setProduct] = useState<ProductProps>({
    name: "",
    price: "",
    image: "",
    description: "",
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setProduct({ ...product, image: urlImage })
    }
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    const data: ProductProps = { ...product }
    toast.success("Artigo atualizado com sucesso")
    console.log(data)
  }
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {product.image && (
        <img
          src={product.image}
          className="size-14 object-contain"
          alt={product.name}
        />
      )}
      <Input.Root>
        <Input.Label title="Imagem do artigo*" />
        <Input.Field type="file" onChange={handleImage} accept="image/*" />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Nome do artigo*" />
        <Input.Field
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Preço*" />
        <Input.Field
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
        />
      </Input.Root>

      <Input.Root>
        <Input.Label title="Descrição*" />
        <Input.TextArea
          value={product.description}
          onChange={(e) =>
            setProduct({ ...product, description: e.target.value })
          }
        />
      </Input.Root>
      <div className="flex items-center justify-end gap-2">
        <DialogClose asChild>
          <Button label="Cancelar" className="bg-neutral-600 text-white" />
        </DialogClose>

        <FormButton
          icon={Save}
          label="Salvar alterações"
          className="border-none w-fit bg-indigo-700 text-white"
        />
      </div>
    </form>
  )
}

export default EditProductForm
