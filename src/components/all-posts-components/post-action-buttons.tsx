import Button from "../ui/button/button"
import { Edit3, Trash2 } from "lucide-react"
import LinkButton from "../ui/button/link-button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog"

const PostActionButtons = () => {
  return (
    <>
      <div className="flex items-center justify-between gap-2 w-full">
        <p className="text-sm">Tiago Baptista</p>
        <div className="flex gap-2">
          <LinkButton
            href="/post/1"
            icon={Edit3}
            className="w-fit bg-white h-8 text-black"
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                icon={Trash2}
                className="bg-red-700 border-none text-white h-8"
              />
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-baseColor">
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tens a certeza que pretendes eliminar este post?
                </AlertDialogTitle>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="text-black bg-white">
                  Cancelar
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button label="Eliminar" className="bg-red-700 border-none" />
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </>
  )
}

export default PostActionButtons
