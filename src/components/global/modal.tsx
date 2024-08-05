import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogDescription,
} from "../ui/dialog"
import { ReactNode } from "react"
import Button from "../ui/button/button"

type Props = {
  title?: string
  description?: string
  children: ReactNode
  trigger: JSX.Element
  actionBtn?: JSX.Element
}

const Modal = ({ trigger, actionBtn, children, title, description }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {children}

        <DialogFooter>
          <DialogClose asChild>
            <Button
              label="Cancelar"
              className="self-end bg-neutral-600 text-white"
            />
          </DialogClose>
          {actionBtn && actionBtn}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default Modal
