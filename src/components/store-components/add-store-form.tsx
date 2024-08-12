import { Input } from "@/components/ui/input-field"
import { ChangeEvent, FormEvent, useState } from "react"
import { toast } from "react-toastify"
import FormButton from "../ui/input-field/form-button"
import { Save } from "lucide-react"
import { DialogClose } from "../ui/dialog"
import Button from "../ui/button/button"

export type ProductProps = {
  name: string
  image: string
  price: string
  description: string
}

const AddStoreForm = () => {
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
    if (
      !product.name ||
      !product.price ||
      !product.image ||
      !product.description
    ) {
      toast.error("Preencha todos os campos obrigatórios")
      return
    }
    const data: ProductProps = { ...product }
    toast.success("Artigo adicionado com sucesso")
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
          <Button label="Cancelar" buttonType="cancel" />
        </DialogClose>

        <FormButton icon={Save} label="Salvar" />
      </div>
    </form>
  )
}

export default AddStoreForm
