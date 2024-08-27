import { Post } from "@/api/post/post.types"
import { formatDate } from "@/utils/date-fns"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Button from "@/components/ui/button/button"

type Props = {
  posts: Post[]
}

const RecentPostTable = ({ posts }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Imagem</TableHead>
          <TableHead>Autor</TableHead>
          <TableHead>Em destaque</TableHead>
          <TableHead>Data de criação</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {posts.map((post, index) => (
          <TableRow key={index}>
            <TableCell>{post._id}</TableCell>
            <TableCell>
              <img
                src={post.mainImage}
                alt={post.title}
                className="size-10 object-cover rounded-full"
              />
            </TableCell>
            <TableCell>
              <div className="flex items-center gap-1">
                <span>{post.author.firstname}</span>
                <span>{post.author.lastname}</span>
              </div>
            </TableCell>
            <TableCell>{post.highlighted ? "Sim" : "Não"}</TableCell>
            <TableCell>{formatDate(post.date)}</TableCell>
            <TableCell>
              <Button
                label="..."
                className="rounded-full size-8 flex items-center justify-center"
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}

export default RecentPostTable
