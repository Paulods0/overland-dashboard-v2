import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { usePreviewImage } from "@/hooks/usePreviewImage"
import { useCreateParterImage } from "@/lib/tanstack-query/partner-image/partner-image-mutation"
import { deleteFromFirebase, uploadToFirebase } from "@/lib/firebase"
import { useState } from "react"
import { toast } from "react-toastify"
import Loading from "../global/loading"

const AddSponsorImageButton = () => {
  const { mutateAsync } = useCreateParterImage()
  const [isLoading, setIsLoading] = useState(false)
  const { handlePartnerImageChange, image, previewImage } = usePreviewImage()

  const handleAddSponsorImg = async () => {
    setIsLoading(true)
    let imageURL: string | undefined = ""
    try {
      imageURL = await uploadToFirebase(image as File, "partners-image")
      const response = await mutateAsync({ image: imageURL! })
      toast.success(response.message)
    } catch (error: any) {
      if (error) {
        await deleteFromFirebase(imageURL!, "partners-image")
      }
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus />
          Adicionar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar nova imagem de um patrocinador.</DialogTitle>
        </DialogHeader>
        <form>
          {previewImage && (
            <img
              src={previewImage}
              alt="imagem de pré-visualização"
              className="w-[200px] h-[200px] object-contain mx-auto py-4"
            />
          )}
          <input
            type="file"
            accept="image/*"
            name="patrocinador-img"
            onChange={handlePartnerImageChange}
          />
        </form>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant={"destructive"}>Cancelar</Button>
          </DialogClose>
          <Button disabled={isLoading} onClick={handleAddSponsorImg}>
            {isLoading ? <Loading /> : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default AddSponsorImageButton
