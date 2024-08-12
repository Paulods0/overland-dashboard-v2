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
      type="submit"
      className={twMerge(
        "px-4 w-fit disabled:bg-zinc-500/30 items-center bg-indigo-700 text-white justify-center flex gap-2 lg:w-fit hover:bg-indigo-600 duration-200 ease-in-out transition-all h-10 border border-neutral-600/70 rounded-lg",
        className
      )}
    >
      {label}
      {Icon && <Icon size={14} />}
    </button>
  )
}

export default FormButton
