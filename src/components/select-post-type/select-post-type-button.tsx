import { AnchorHTMLAttributes } from "react"
import { Link } from "react-router-dom"

type Props = {
  img: string
  href: string
  label: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

const SelectPostTypeButton = ({ img, href, label, ...rest }: Props) => {
  return (
    <Link
      to={href}
      {...rest}
      className="h-[15dvh] text-lg hover:bg-neutral-600/40 transition-all ease-in-out duration-300 font-semibold items-center p-4 w-full bg-transparent border border-neutral-700/60 justify-center lg:h-full rounded-lg flex flex-col gap-2"
    >
      <img src={img} alt="imagem" className="size-14 object-cover" />

      {label}
    </Link>
  )
}

export default SelectPostTypeButton
