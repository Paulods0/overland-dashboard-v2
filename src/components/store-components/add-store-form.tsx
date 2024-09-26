import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import Button from "../ui/button/button"
import { DialogClose } from "../ui/dialog"
import { Select } from "../ui/select-field"
import useIsLoading from "@/hooks/useIsLoading"
import { uploadToFirebase } from "@/lib/firebase"
import { productCategories } from "@/utils/utils"
import { Input } from "@/components/ui/input-field"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { CreateProductDTO } from "@/api/product/product.types"
import { useCreateProduct } from "@/lib/tanstack-query/product/product-mutation"

const AddStoreForm = () => {
  const { mutateAsync } = useCreateProduct()
  const { isLoading, toggleLoading } = useIsLoading()
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  const [product, setProduct] = useState<CreateProductDTO>({
    name: "",
    price: "",
    image: "",
    category: "",
    description: "",
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setProduct({ ...product, image: image })
      setPreviewImage(urlImage)
    }
  }

  function resetInputs() {
    setProduct({
      name: "",
      image: "",
      price: "",
      category: "",
      description: "",
    })
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)

    try {
      if (
        !product.name ||
        !product.price ||
        !product.image ||
        !product.category
      ) {
        toast.error("Preencha todos os campos obrigatórios")
        return
      }
      const imageURL = await uploadToFirebase(product.image as File, "products")
      const data: CreateProductDTO = { ...product, image: imageURL }

      const response = await mutateAsync(data)
      toast.success(response.message)
      resetInputs()
    } catch (error: any) {
      toast.error(error)
      console.error("handleSubmit ~ error", error)
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2">
      {previewImage && (
        <img
          src={previewImage}
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

      <Select.Root>
        <Select.Label label="Categoria*" />
        <Select.Container
          defaultValue="escolher"
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        >
          <Select.Option
            disabled
            label={"Escolha uma categoria"}
            value={"escolher"}
          />
          {productCategories.map((category, index) => (
            <Select.Option
              key={index}
              label={category.name}
              value={category.value}
            />
          ))}
        </Select.Container>
      </Select.Root>

      <Input.Root>
        <Input.Label title="Descrição(opcional)" />
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

        <FormButton
          label="Salvar"
          disabled={isLoading}
          icon={isLoading ? Loading : Save}
        />
      </div>
    </form>
  )
}

export default AddStoreForm
