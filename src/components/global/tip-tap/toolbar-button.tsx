import { ButtonHTMLAttributes, ElementType } from "react"

type Props = {
  icon: ElementType
  isActive: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>

const ToolbarButton = ({ isActive, icon: Icon, ...rest }: Props) => {
  return (
    <button
      {...rest}
      className={`${
        isActive
          ? "bg-indigo-700 text-white hover:bg-indigo-500 transition-all ease-in-out duration-200 p-2 rounded-lg border"
          : "p-2 border rounded-lg hover:bg-indigo-500 transition-all ease-in-out duration-200"
      }`}
    >
      {<Icon size={14} />}
    </button>
  )
}

export default ToolbarButton
