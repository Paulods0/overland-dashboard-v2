import Box from "@/components/global/box"
import { Edit, Trash } from "lucide-react"
import Modal from "@/components/global/modal"
import Button from "@/components/ui/button/button"
import AlertModal from "@/components/global/alert-modal"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EditProductForm from "./edit-product-form"
import { Product } from "@/api/product/product.types"
import useIsLoading from "@/hooks/useIsLoading"
import { useDeleteProduct } from "@/lib/tanstack-query/product/product-mutation"
import { toast } from "react-toastify"
import { deleteFromFirebase } from "@/lib/firebase"

type Props = {
  products: Product[]
}

const StoreTable = ({ products }: Props) => {
  const { isLoading, toggleLoading } = useIsLoading()
  
  const { mutate } = useDeleteProduct()

  async function handleDeleteProduct(id: string, image: string) {
    toggleLoading(true)
    try {
      await deleteFromFirebase(image, "products")
      mutate(id)
      toggleLoading(false)
      toast.success("Artigo removido com sucesso")
    } catch (error) {
      toggleLoading(false)
      toast.error("Erro ao remover o artigo, tente novamente")
      console.log(error)
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
