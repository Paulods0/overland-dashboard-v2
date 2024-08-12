import Modal from "../global/modal"
import Box from "@/components/global/box"
import { Edit, Trash } from "lucide-react"
import AlertModal from "@/components/global/alert-modal"
import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table"
import Button from "../ui/button/button"
import EditSubForm from "./edit-sub-form"

const SubsTable = () => {
  return (
    <Box className="h-[60vh] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Sobrenome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nº telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>90kd20jf20fjc</TableCell>
              <TableCell>Paulo</TableCell>
              <TableCell>Luguenda</TableCell>
              <TableCell>pauloluguenda@gmail.com</TableCell>
              <TableCell>941685402</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Modal
                    title="Atualizar os Dados"
                    description="Atualize os dados de um inscrito para que ele possa receber corretamente as notícias sobre o nosso site regularmente"
                    trigger={<Button icon={Edit} />}
                  >
                    <EditSubForm />
                  </Modal>

                  <AlertModal
                    trigger={<Button icon={Trash} buttonType="danger" />}
                    actionBtn={<Button label="Remover" buttonType="base" />}
                    title="Tens a certeza que pretendes remover este inscrito?"
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

export default SubsTable
