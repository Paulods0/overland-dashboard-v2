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
import { toast } from "react-toastify"
import Button from "../ui/button/button"
import { Edit3, Trash2 } from "lucide-react"
import { Author } from "@/api/post/post.types"
import LinkButton from "../ui/button/link-button"
import { deleteFromFirebase } from "@/lib/firebase"
import { useDeletePost } from "@/lib/tanstack-query/post/post-mutations"

type PostActionButtonsProps = {
  postId: string
  author: Author
  mainImage: string
}

const PostActionButtons = ({
  postId,
  author,
  mainImage,
}: PostActionButtonsProps) => {
  const { isPending, mutateAsync } = useDeletePost()

  async function handleDeletePost() {
    try {
      await deleteFromFirebase(mainImage, "posts")
      const response = await mutateAsync(postId)
      toast.success(response.message)
    } catch (error: any) {
      console.log(error)
      toast.error(error)
    }
  }

  return (
    <>
      <div className="flex border-t pt-2 items-center justify-between gap-2 w-full">
        <div className="flex flex-col gap-1">
          <p className="text-xs font-bold">Autor</p>
          <p className="text-xs italic">{`${author?.firstname} ${author?.lastname}`}</p>
        </div>

        <div className="flex gap-2">
          <LinkButton
            icon={Edit3}
            href={`/post/${postId}`}
            className="w-fit bg-white text-black"
          />
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                icon={Trash2}
                buttonType="danger"
                className="border-none text-white rounded-full"
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
                  <Button
                    disabled={isPending}
                    onClick={handleDeletePost}
                    className="bg-red-700 border-none"
                    label={isPending ? "Eliminando..." : "Eliminar"}
                  />
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
