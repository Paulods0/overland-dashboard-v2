import { toast } from "react-toastify"
import Button from "../ui/button/button"
import { Edit, Trash } from "lucide-react"
import EditUserForm from "./edit-user-form"
import { User } from "@/api/users/user.type"
import Modal from "@/components/global/modal"
import { deleteFromFirebase } from "@/lib/firebase"
import AlertModal from "@/components/global/alert-modal"
import { TableCell, TableRow } from "@/components/ui/table"
import { useDeleteUser } from "@/lib/tanstack-query/users/user-mutations"

type Props = {
  user: User
}

const UserTableRow = ({ user }: Props) => {
  const { mutateAsync, isPending } = useDeleteUser()

  async function handleDeleteUser(userData: User) {
    try {
      if (userData.image) {
        await deleteFromFirebase(userData.image, "profile")
      }
      await mutateAsync(userData._id)
      toast.success("Usuario deletado com sucesso")
    } catch (error) {
      console.error(error)
      toast.error("Erro ao remover usuário")
    }
  }

  return (
    <TableRow>
      <TableCell>
        <img
          src={user.image ? user.image : "/icons/user.png"}
          alt={user.firstname}
          className="size-8 rounded-full object-contain"
        />
      </TableCell>
      <TableCell>{user.firstname}</TableCell>
      <TableCell>{user.lastname}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role}</TableCell>
      <TableCell>
        <div className="flex items-center gap-2 ">
          {
            <Modal
              title="Atualizar os Dados"
              description="Atualize os dados do usuário, como o nome, sobreome, role, email e a imagem"
              trigger={<Button icon={Edit} />}
            >
              <EditUserForm user={user} />
            </Modal>
          }
          <AlertModal
            title="Tens a certeza que pretendes remover este usuário?"
            trigger={<Button icon={Trash} buttonType="danger" />}
            actionBtn={
              <Button
                buttonType="danger"
                disabled={isPending}
                onClick={() => handleDeleteUser(user)}
                label={isPending ? "Removendo" : "Remover"}
              />
            }
          />
        </div>
      </TableCell>
    </TableRow>
  )
}

export default UserTableRow
