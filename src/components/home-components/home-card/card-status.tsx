import { ElementType } from "react"
import { twMerge } from "tailwind-merge"
import { PostResponse } from "@/api/post"
import { Navigation } from "lucide-react"
import { UserResponseDTO } from "@/api/users/user.type"
import LinkButton from "@/components/ui/button/link-button"
import { ProductResponseDTO } from "@/api/product/product.types"

type Props = {
  link: string
  title: string
  color: string
  icon: ElementType
  className?: string
  data?: ProductResponseDTO | PostResponse | UserResponseDTO
}

const CardStatus = ({ link, title, data, icon: Icon, className }: Props) => {
  return (
    <div
      className={twMerge(
        `w-full h-52 text-baseColor bg-blackAndLight border rounded-lg items-center flex flex-col p-4 transition-all ease-in-out duration-200 hover:scale-[1.03]`,
        className
      )}
    >
      <div className="flex w-full items-start justify-between gap-2">
        <div className="flex flex-col">
          <h4 className="text-sm font-light capitalize">Total de {title}</h4>
          <div className="flex items-end gap-2">
            <span className="text-3xl">{data?.total}</span>
            <span className="italic">{title}</span>
          </div>
        </div>

        <LinkButton
          href={link}
          icon={Navigation}
          className="hover:bg-zinc-800 transition-all duration-200 ease-in-out w-fit"
        />
      </div>
      <div
        className={`h-full bg-blackAndLight w-full flex items-center justify-center rounded-xl`}
      >
        <Icon />
      </div>
    </div>
  )
}

export default CardStatus
