import { ElementType } from "react"
import { PostResponse } from "@/api/post"
import { useNavigate } from "react-router-dom"
import { UserResponseDTO } from "@/api/users/user.type"
import LoadingData from "@/components/global/loading-data"
import { ProductResponseDTO } from "@/api/product/product.types"

type Props = {
  link: string
  title: string
  color: string
  icon: ElementType
  isLoading: boolean
  data?: ProductResponseDTO | PostResponse | UserResponseDTO
}

const CardStatus = ({
  link,
  icon: Icon,
  color,
  title,
  data,
  isLoading,
}: Props) => {
  const navigate = useNavigate()
  if (isLoading) return <LoadingData />

  function handleNavigate() {
    navigate(link)
  }

  return (
    <div
      onClick={handleNavigate}
      className={`w-full cursor-pointer h-52 ${color} rounded-lg flex flex-col p-4 transition-all ease-in-out duration-200 hover:scale-[0.99]`}
    >
      <h3 className="text-lg text-white tracking-wider py-1">
        Total de {title}
      </h3>
      <div className="w-full h-full flex bg-black/10 rounded-lg items-center justify-center">
        <span className="font-bold text-white text-3xl md:text-5xl italic flex items-center gap-2">
          <Icon className="font-normal" size={24} />
          {data?.total}
        </span>
      </div>
    </div>
  )
}

export default CardStatus
