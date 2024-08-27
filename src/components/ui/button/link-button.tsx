import { Link } from "react-router-dom"
import { AnchorHTMLAttributes, ElementType } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  label?: string
  icon?: ElementType
  href: string
  className?: string
} & AnchorHTMLAttributes<HTMLAnchorElement>

const LinkButton = ({ href, label, icon: Icon, className, ...rest }: Props) => {
  return (
    <Link
      to={href}
      {...rest}
      className={twMerge(
        "flex border border-neutral-600/60 items-center w-full lg:w-fit gap-2 justify-center h-10 transition-all duration-200 ease-in-out px-3 rounded-full",
        className
      )}
    >
      {label && label}
      {Icon && <Icon size={14} />}
    </Link>
  )
}

export default LinkButton
