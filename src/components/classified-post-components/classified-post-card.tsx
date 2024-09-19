import Box from "../global/box"
import Modal from "../global/modal"
import Button from "../ui/button/button"
import { Edit2, Eye } from "lucide-react"
import ClassifiedCarousel from "./classified-carousel"
import EditClassifiedForm from "./edit-classified-form"
import { Classified } from "@/api/classified/classified.types"
import RemoveClassifiedDialog from "./remove-classified-dialog"

type Props = {
  post: Classified
}

const ClassifiedPostCard = ({ post }: Props) => {
  const price = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "AKZ",
  }).format(post.price)

  const status =
    post.status === "inactive"
      ? "Inativo"
      : post.status === "suspended"
      ? "Suspenso"
      : "Ativo"

  const statusColor =
    post.status === "inactive"
      ? "bg-red-600"
      : post.status === "suspended"
      ? "bg-yellow-500"
      : "bg-green-600"

  return (
    <Box className="relative h-fit border rounded-lg p-4 w-full flex flex-col gap-2">
      <img
        src={post.mainImage}
        alt="image do post"
        className="w-full h-[15vh] rounded-lg object-cover"
      />
      <div className="flex flex-col gap-2">
        <h1 className="font-bold text-lg line-clamp-1">{post.title}</h1>

        <div className="flex items-start w-full">
          <ul className="w-full space-y-2">
            <li className="text-xs">Preço: {price}</li>
            <li className="text-xs">
              Tipo: {post.type === "sell" ? "à venda" : "quer comprar"}
            </li>
          </ul>
          <p className="text-xs flex space-x-2">
            Estado: <span className={`px-1 ${statusColor}`}>{status}</span>
          </p>
        </div>

        <div className="text-xs flex flex-col  border-y py-2">
          <h2 className="font-bold uppercase mb-2">Dados do anunciante</h2>
          <ul className="w-full space-y-2">
            <li>
              Nome:
              <span className="ml-1">{`${post.author.firstname} ${post.author.lastname}`}</span>
            </li>
            <li>
              Email:
              <span className="ml-1">{post.author.email}</span>
            </li>
            <li>
              Tel:
              <span className="ml-1">{post.author.phone}</span>
            </li>
          </ul>
        </div>

        <div className="flex items-center justify-between">
          <Modal
            title="Editar Classificado"
            description="Editar classificado."
            trigger={
              <Button icon={Edit2} buttonType="base" className="rounded-full" />
            }
          >
            <EditClassifiedForm post={post} />
          </Modal>

          <div className="flex items-center  gap-2">
            <Modal
              trigger={
                <Button
                  icon={Eye}
                  buttonType="transparent"
                  className="rounded-full"
                />
              }
              title="Outras imagens"
            >
              <ClassifiedCarousel post={post} />
            </Modal>

            <RemoveClassifiedDialog post={post} />
          </div>
        </div>
      </div>
    </Box>
  )
}

export default ClassifiedPostCard
