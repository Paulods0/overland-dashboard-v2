import { ButtonHTMLAttributes, ElementType } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  label: string
  className?: string
  icon?: ElementType
} & ButtonHTMLAttributes<HTMLButtonElement>

const FormButton = ({ label, icon: Icon, className, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "px-4 w-full items-center justify-center flex gap-2 lg:w-fit hover:bg-neutral-600/40 duration-200 ease-in-out transition-all h-10 border border-neutral-600/70 rounded-lg",
        className
      )}
    >
      {label}
      {Icon && <Icon size={14} />}
    </button>
  )
}

export default FormButton
