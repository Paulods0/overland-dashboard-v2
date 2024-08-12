import Box from "@/components/global/box"
import Modal from "@/components/global/modal"
import AlertModal from "@/components/global/alert-modal"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Button from "../ui/button/button"
import { Edit, Trash } from "lucide-react"
import EditUserForm from "./edit-user-form"

const UsersTable = () => {
  return (
    <Box className="h-[60vh] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[300px]">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Phone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from({ length: 8 }).map((_, index) => (
            <TableRow key={index}>
              <TableCell>428fn98019n</TableCell>
              <TableCell>Paulo Luguenda</TableCell>
              <TableCell>pauloluguenda@gmail.com</TableCell>
              <TableCell>Admin</TableCell>
              <TableCell>941685402</TableCell>
              <TableCell>
                <div className="flex items-center gap-2 ">
                  {
                    <Modal
                      title="Atualizar os Dados"
                      description="Atualize os dados do usuário, como o nome, sobreome, role, email e a imagem"
                      trigger={<Button icon={Edit} />}
                    >
                      <EditUserForm />
                    </Modal>
                  }
                  <AlertModal
                    title="Tens a certeza que pretendes remover este usuário?"
                    trigger={<Button icon={Trash} buttonType="danger" />}
                    actionBtn={<Button label="Remover" buttonType="danger" />}
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

export default UsersTable
