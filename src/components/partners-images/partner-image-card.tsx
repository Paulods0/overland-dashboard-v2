import {
  Dialog,
  DialogTitle,
  DialogClose,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogTitle,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogDescription,
} from "../ui/alert-dialog"
import { useState } from "react"
import { toast } from "react-toastify"
import Loading from "../global/loading"
import { Button } from "@/components/ui/button"
import { deleteFromFirebase, uploadToFirebase } from "@/lib/firebase"
import { usePreviewImage } from "@/hooks/usePreviewImage"
import {
  useDeleteParterImage,
  useUpdateParterImage,
} from "@/lib/tanstack-query/partner-image/partner-image-mutation"
import { isAxiosError } from "axios"

type Props = {
  data: {
    _id: string
    image: string
    createdAt: string
  }
}

const PartnerImageCard = ({ data }: Props) => {
  const { mutateAsync } = useUpdateParterImage()
  const { mutateAsync: mutateAsyncDelete, isPending } = useDeleteParterImage()
  const [isLoading, setIsLoading] = useState(false)
  const {
    handlePartnerImageChange,
    image: updatedImg,
    previewImage,
  } = usePreviewImage()

  const handleUpdateImage = async () => {
    setIsLoading(true)
    try {
      if (data.image) {
        await deleteFromFirebase(data.image, "partners-image")
      }
      const imageURL = await uploadToFirebase(
        updatedImg as File,
        "partners-image"
      )

      const response = await mutateAsync({ id: data._id, image: imageURL! })
      toast.success(response.message)
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async () => {
    try {
      await deleteFromFirebase(data.image, "partners-image")
      const response = await mutateAsyncDelete(data._id)
      toast.success(response.message)
    } catch (error) {
      toast.error("Erro ao remover")
    }
  }

  return (
    <div className="w-full lg:w-[350px] h-[250px] flex flex-col justify-between border border-neutral-800 p-4 rounded-xl">
      <div className="relative w-full h-[200px]">
        <img
          src={data.image}
          alt="placeholder da imagem de patrocinadores"
          className="absolute inset-0 w-full h-full object-contain"
        />
      </div>
      <section className="w-full py-2 flex items-center justify-between">
        <span className="font-semibold text-sm text-neutral-600 w-[160px] text-wrap">
          Criado à 22 de Novembro de 2024
        </span>
        <div className="flex gap-2 items-center justify-end">
          <Dialog>
            <DialogTrigger asChild>
              <Button>Editar</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Adicionar uma nova imagem para um patrocinador.
                </DialogTitle>
              </DialogHeader>

              <form className="space-y-8">
                <img
                  src={previewImage ?? data.image}
                  alt="Imagem do patrocinador"
                  className="h-[140px] w-full object-contain"
                />

                <input
                  type="file"
                  accept="image/*"
                  name="patrocinador-img"
                  onChange={handlePartnerImageChange}
                />
              </form>

              <DialogFooter>
                <Button disabled={isLoading} onClick={handleUpdateImage}>
                  {!isLoading ? "Salvar" : <Loading />}
                </Button>
                <DialogClose asChild>
                  <Button variant="destructive">Cancelar</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Remover</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>
                  Tens a certeza que pretendes remover esta imagem?
                </AlertDialogTitle>
                <AlertDialogDescription>
                  Esta ação é irreversível, uma vez concluída, não poderá ser
                  desfeita.
                </AlertDialogDescription>
              </AlertDialogHeader>

              <AlertDialogFooter>
                <AlertDialogCancel asChild>
                  <Button variant={"outline"}>Cancelar</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button onClick={handleDelete} disabled={isPending}>
                    {isPending ? "Removendo..." : "Remover"}
                  </Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </section>
    </div>
  )
}

export default PartnerImageCard
