import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Box from "@/components/global/box"
import UserTableRow from "./user-table-row"
import { User } from "@/api/users/user.type"
import Loading from "../global/loading"

type Props = {
  users?: User[]
}

const UsersTable = ({ users }: Props) => {
  if (!users) return <Loading />
  console.log(users)

  return (
    <Box className="h-[60vh] overflow-y-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">ID</TableHead>
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
