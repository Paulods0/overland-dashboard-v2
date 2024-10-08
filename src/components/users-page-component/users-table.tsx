import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Loading from "../global/loading"
import Box from "@/components/global/box"
import UserTableRow from "./user-table-row"
import { User } from "@/api/users/user.type"

type Props = {
  users?: User[]
}

const UsersTable = ({ users }: Props) => {
  if (!users) return <Loading />

  return (
    <Box className="h-[60vh] overflow-y-auto w-full">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Imagem</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Sobrenome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users?.map((user, index) => (
            <UserTableRow key={index} user={user} />
          ))}
        </TableBody>
      </Table>
    </Box>
  )
}

export default UsersTable
