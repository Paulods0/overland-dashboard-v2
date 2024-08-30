import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { toast } from "react-toastify"
import Box from "@/components/global/box"
import { Edit, Trash } from "lucide-react"
import Modal from "@/components/global/modal"
import useIsLoading from "@/hooks/useIsLoading"
import EditProductForm from "./edit-product-form"
import Button from "@/components/ui/button/button"
import { deleteFromFirebase } from "@/lib/firebase"
import { Product } from "@/api/product/product.types"
import AlertModal from "@/components/global/alert-modal"
import { useDeleteProduct } from "@/lib/tanstack-query/product/product-mutation"

type Props = {
  products: Product[]
}

const StoreTable = ({ products }: Props) => {
  const { isLoading, toggleLoading } = useIsLoading()
  const { mutateAsync } = useDeleteProduct()

  async function handleDeleteProduct(id: string, image: string) {
    toggleLoading(true)
    try {
      await deleteFromFirebase(image, "products")
      await mutateAsync(id)
      toast.success("Removido com sucesso.")
    } catch (error) {
      toast.error("Erro ao remover. Tente novamente.")
      console.log(error)
    } finally {
      toggleLoading(false)
    }
  }

  return (
    <Box className="h-[60vh] overflow-y-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead className="self-end">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>
                <img
                  src={product.image}
                  alt={product.name}
                  className="size-12 rounded-lg object-contain"
                />
              </TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.category}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("pt-PT", {
                  currency: "AKZ",
                  style: "currency",
                }).format(Number(product.price))}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Modal
                    title="Atualizar Dados"
                    description="Atualize os dados do artigo, como o nome, preço, imagem e a descrição."
                    trigger={<Button icon={Edit} />}
                  >
                    <EditProductForm data={product} />
                  </Modal>
                  <AlertModal
                    trigger={<Button icon={Trash} buttonType="danger" />}
                    title="Tens a certeza que pretendes eliminar este artigo?"
                    actionBtn={
                      <Button
                        label="Eliminar"
                        buttonType="danger"
                        disabled={isLoading}
                        onClick={() =>
                          handleDeleteProduct(product._id, product.image)
                        }
                      />
                    }
                  />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default StoreTable
