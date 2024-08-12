import React, { ButtonHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type ButtonTypes = "base" | "danger" | "transparent" | "cancel"

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
    cancel: "bg-neutral-600 text-white",
    transparent: "bg-transparent text-baseColor",
  }
  return (
    <button
      type="button"
      {...rest}
      className={twMerge(
        `px-3 border w-fit flex items-center justify-center gap-2 transition-all duration-300 text-sm ease-in-out rounded-lg h-10 ${
          buttonType && buttonType === "danger"
            ? `${button.danger}`
            : buttonType === "base"
            ? `${button.base}`
            : buttonType === "cancel"
            ? `${button.cancel}`
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
