import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogTrigger,
  AlertDialogDescription,
} from "../ui/alert-dialog"
import { Trash2 } from "lucide-react"
import Button from "../ui/button/button"
import { deleteFromFirebase } from "@/lib/firebase"
import { Classified } from "@/api/classified/classified.types"
import { useDeleteClassified } from "@/lib/tanstack-query/classified/classified-mutations"
import { toast } from "react-toastify"

type Props = {
  post: Classified
}

const RemoveClassifiedDialog = ({ post }: Props) => {
  const { mutateAsync, isPending } = useDeleteClassified()

  async function handleDeleteClassifiedPost() {
    try {
      await deleteFromFirebase(post.mainImage, "classified-posts")
      if (post.images) {
        post.images?.forEach(async (image) => {
          await deleteFromFirebase(image, "classified-posts")
        })
      }
      const response = await mutateAsync(post._id)
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error)
      console.log(error)
    }
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button icon={Trash2} buttonType="danger" className="rounded-full" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Tens a certeza que pretendes eliminar este post?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser revertida. Tem a certeza que pretende
            continuar?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button
              label="Eliminar"
              buttonType="danger"
              disabled={isPending}
              onClick={handleDeleteClassifiedPost}
            />
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default RemoveClassifiedDialog
