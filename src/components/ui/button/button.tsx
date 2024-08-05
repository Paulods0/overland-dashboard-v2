import React, { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  label?: string
  icon?: React.ElementType
  className?: string
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({ label, className, icon: Icon, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={twMerge(
        "px-3 border lg:w-fit w-full flex items-center justify-center gap-2 transition-all duration-300 text-sm ease-in-out rounded-lg h-10",
        className
      )}
    >
      {label && label}
      {Icon && <Icon size={14} />}
    </button>
  )
}

export default Button
