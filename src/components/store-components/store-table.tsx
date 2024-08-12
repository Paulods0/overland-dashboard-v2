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

const StoreTable = () => {
  return (
    <Box className="h-[60vh] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead className="self-end">Preço</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>93fndu24ca1134z</TableCell>
              <TableCell>T-Shirt</TableCell>
              <TableCell>12,000.00AKZ</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Modal
                    title="Atualizar Dados"
                    description="Atualize os dados do artigo, como o nome, preço, imagem e a descrição."
                    trigger={<Button icon={Edit} />}
                  >
                    <EditProductForm />
                  </Modal>
                  <AlertModal
                    trigger={<Button icon={Trash} buttonType="danger" />}
                    title="Tens a certeza que pretendes eliminar este artigo?"
                    actionBtn={<Button label="Eliminar" buttonType="danger" />}
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
