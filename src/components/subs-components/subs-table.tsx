import {
  Table,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  TableHead,
} from "@/components/ui/table"
import Modal from "../global/modal"
import { toast } from "react-toastify"
import Button from "../ui/button/button"
import Box from "@/components/global/box"
import EditSubForm from "./edit-sub-form"
import { Edit, Trash } from "lucide-react"
import useIsLoading from "@/hooks/useIsLoading"
import AlertModal from "@/components/global/alert-modal"
import { Subscriber } from "@/api/subscriber/subscriber.types"
import { useDeleteSub } from "@/lib/tanstack-query/subs/subs-mutation"

type Props = {
  subs: Subscriber[]
}

const SubsTable = ({ subs }: Props) => {
  const { isLoading, toggleLoading } = useIsLoading()
  const { mutateAsync } = useDeleteSub()

  async function handleDeleteSub(id: string) {
    try {
      await mutateAsync(id)
      toggleLoading(false)
      toast.success("Removido com sucesso")
    } catch (error) {
      toast.error("Erro ao remover, tente novamente")
      console.error(error)
    } finally {
      toggleLoading(true)
    }
  }

  return (
    <Box className="h-[60vh] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Nº telefone</TableHead>
            <TableHead>País</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {subs.map((sub, index) => (
            <TableRow key={index}>
              <TableCell>{sub.name}</TableCell>
              <TableCell>{sub.email}</TableCell>
              <TableCell>{sub.phone ? sub.phone : "Nenhum"}</TableCell>
              <TableCell>{sub.country}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Modal
                    title="Atualizar os Dados"
                    description="Atualize os dados de um inscrito para que ele possa receber corretamente as notícias sobre o nosso site regularmente"
                    trigger={<Button icon={Edit} />}
                  >
                    <EditSubForm subscriber={sub} />
                  </Modal>

                  <AlertModal
                    trigger={<Button icon={Trash} buttonType="danger" />}
                    actionBtn={
                      <Button
                        buttonType="base"
                        disabled={isLoading}
                        label={isLoading ? "Removendo..." : "Remover"}
                        onClick={() => handleDeleteSub(sub._id)}
                      />
                    }
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
