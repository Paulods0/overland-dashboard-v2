import React, { SelectHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string
  children: React.ReactNode
} & SelectHTMLAttributes<HTMLSelectElement>

const Container = ({ className, children, ...rest }: Props) => {
  return (
    <select
      {...rest}
      className={twMerge(
        "border w-full bg-transparent text-start px-4 h-10 outline-none rounded-lg border-neutral-600/70",
        className
      )}
    >
      {children}
    </select>
  )
}

export default Container
