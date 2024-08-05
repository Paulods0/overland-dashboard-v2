import React, { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type ButtonTypes = "base" | "danger" | "transparent"

type Props = {
  label?: string
  className?: string
  icon?: React.ElementType
  buttonType?: ButtonTypes
} & ButtonHTMLAttributes<HTMLButtonElement>

const Button = ({
  label,
  className,
  icon: Icon,
  buttonType = "transparent",
  ...rest
}: Props) => {
  const button = {
    base: "bg-white text-black",
    danger: "bg-red-700 text-white",
    transparent: "bg-transparent text-baseColor",
  }
  return (
    <button
      {...rest}
      className={twMerge(
        `px-3 border lg:w-fit w-full flex items-center justify-center gap-2 transition-all duration-300 text-sm ease-in-out rounded-lg h-10 ${
          buttonType && buttonType === "danger"
            ? `${button.danger}`
            : buttonType === "base"
            ? `${button.base}`
            : `${button.transparent}`
        }`,
        className
      )}
    >
      {label && label}
      {Icon && <Icon size={14} />}
    </button>
  )
}

export default Button
