import { Save } from "lucide-react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import Button from "../ui/button/button"
import { Input } from "../ui/input-field"
import { DialogClose } from "../ui/dialog"
import { Select } from "../ui/select-field"
import useIsLoading from "@/hooks/useIsLoading"
import { deleteFromFirebase } from "@/lib/firebase"
import { productCategories } from "./add-store-form"
import FormButton from "../ui/input-field/form-button"
import { ChangeEvent, FormEvent, useState } from "react"
import { Product, UpdateProductDTO } from "@/api/product/product.types"
import { useUpdateProduct } from "@/lib/tanstack-query/product/product-mutation"

type Props = {
  data: Product
}

const EditProductForm = ({ data }: Props) => {
  const { mutateAsync } = useUpdateProduct()
  const { isLoading, toggleLoading } = useIsLoading()

  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const [product, setProduct] = useState<UpdateProductDTO>({
    id: data._id,
    name: data.name,
    image: data.image,
    price: data.price,
    category: data.category,
    description: data.description,
  })

  function handleImage(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.files) {
      const image = e.target.files[0]
      const urlImage = URL.createObjectURL(image)
      setPreviewImage(urlImage)
      setProduct({ ...product, image: urlImage })
      return () => URL.revokeObjectURL(urlImage)
    }
  }

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    toggleLoading(true)
    try {
      let newImage: string = data.image

      if (previewImage) {
        await deleteFromFirebase(data.image, "products")
        newImage = product.image as string
      }

      const updatedData: UpdateProductDTO = {
        ...product,
        image: newImage,
      }
      const response = await mutateAsync(updatedData)
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error)
      console.log(error)
    } finally {
      toggleLoading(false)
    }
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

      <Select.Root>
        <Select.Label label="Categoria*" />
        <Select.Container
          defaultValue={data.category}
          onChange={(e) => setProduct({ ...product, category: e.target.value })}
        >
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
          disabled={isLoading}
          label="Salvar alterações"
          icon={isLoading ? Loading : Save}
          className="border-none w-fit bg-indigo-700 text-white"
        />
      </div>
    </form>
  )
}

export default EditProductForm
