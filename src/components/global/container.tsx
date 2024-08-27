import React, { HTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type ContainerProps = {
  children: React.ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>
const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div
      {...rest}
      className={twMerge("px-8 lg:px-6 w-full lg:w-[80vw] mx-auto", className)}
    >
      {children}
    </div>
  )
}

export default Container
