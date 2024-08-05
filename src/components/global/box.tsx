import { twMerge } from "tailwind-merge"

type Props = {
  children: React.ReactNode
  className?: string
}

const Box = ({ children, className }: Props) => {
  return (
    <div
      className={twMerge(
        "rounded-lg border border-neutral-600/60 w-auto p-4",
        className
      )}
    >
      {children}
    </div>
  )
}

export default Box
