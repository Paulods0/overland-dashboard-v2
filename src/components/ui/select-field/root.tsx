import { ReactNode } from "react"

type Props = {
  children: ReactNode
}

const Root = ({ children }: Props) => {
  return <div className="flex flex-col gap-2 w-full">
    {children}
    </div>
}

export default Root
