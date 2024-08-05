import "./input-field-style.css"
import { twMerge } from "tailwind-merge"
import { ElementType, InputHTMLAttributes } from "react"


type Props = {
  handleClick?: () => void
  icon?: ElementType
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

const InputField = ({ handleClick, className, icon: Icon, ...rest }: Props) => {
  return (
    <div
      className={twMerge(
        "w-full flex items-center rounded-lg relative border border-neutral-600/70 p-0",
        className
      )}
    >
      <input
        {...rest}
        className="w-full h-full bg-transparent border-none outline-none py-2 px-4 date-icon"
      />
      {Icon && <Icon size={14} />}
    </div>
  )
}

export default InputField
