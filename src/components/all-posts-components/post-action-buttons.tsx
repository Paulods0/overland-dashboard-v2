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
import useIsLoading from "@/hooks/useIsLoading"
import LinkButton from "../ui/button/link-button"
import { deleteFromFirebase } from "@/lib/firebase"
import { useDeletePost } from "@/lib/tanstack-query/post/post-mutations"
import Loading from "../global/loading"

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
  const { mutate } = useDeletePost()
  const { isLoading, toggleLoading } = useIsLoading()

  if (isLoading) {
    return (
      <div className="fixed top-0 left-0 bg-black/30 w-full h-full">
        <Loading />
      </div>
    )
  }

  async function handleDeletePost() {
    toggleLoading(true)
    try {
      await deleteFromFirebase(mainImage, "posts")
      mutate(postId)
      toggleLoading(false)
      toast.success("Post eliminado com sucesso")
    } catch (error) {
      toast.error("Erro ao eliminar o post, tente novamente")
      toggleLoading(false)
      console.log(error)
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
                className="bg-red-700 border-none text-white"
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
                    disabled={isLoading}
                    onClick={handleDeletePost}
                    className="bg-red-700 border-none"
                    label={isLoading ? "Eliminando..." : "Eliminar"}
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
