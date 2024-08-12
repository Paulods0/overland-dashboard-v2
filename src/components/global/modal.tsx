import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "../ui/dialog"
import { ReactNode } from "react"

type Props = {
  title: string
  description?: string
  children: ReactNode
  trigger: JSX.Element
  actionBtn?: JSX.Element
  cancelBtn?: boolean
}

const Modal = ({ trigger, children, title, description }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        {children}
      </DialogContent>
    </Dialog>
  )
}

export default Modal
