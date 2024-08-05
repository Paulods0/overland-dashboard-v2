import { OptionHTMLAttributes } from "react"
import { twMerge } from "tailwind-merge"

type Props = {
  label: string
  className?: string
} & OptionHTMLAttributes<HTMLOptionElement>

const Option = ({ label, className, ...rest }: Props) => {
  return (
    <option {...rest} className={twMerge("bg-baseColor", className)}>
      {label}
    </option>
  )
}

export default Option
