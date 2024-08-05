import React from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  children: React.ReactNode
  className?:string
}

const InputField = ({ children,className }: Props) => {
  return (
    <div className={twMerge("flex flex-col gap-1 items-start w-full", className)}>
      {children}
    </div>
  )
}

export default InputField
