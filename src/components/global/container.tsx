import { twMerge } from "tailwind-merge"
import React, { HTMLAttributes } from "react"

type ContainerProps = {
  children: React.ReactNode
  className?: string
} & HTMLAttributes<HTMLDivElement>
const Container = ({ children, className, ...rest }: ContainerProps) => {
  return (
    <div
      {...rest}
      className={twMerge("lg:px-6 w-[90%] lg:w-[80vw] mx-auto", className)}
    >
      {children}
    </div>
  )
}

export default Container
