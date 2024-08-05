import { TextareaHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  className?: string
} & TextareaHTMLAttributes<HTMLTextAreaElement>

const TextArea = ({ className, ...rest }: Props) => {
  return (
    <textarea
      {...rest}
      className={twMerge(
        "w-full outline-none p-4 flex items-center rounded-lg relative border border-neutral-600/70 bg-transparent resize-none",
        className
      )}
    />
  )
}

export default TextArea
